/**
 * fix-images-to-webp.mjs
 * ─────────────────────────────────────────────────────────────────
 * This script converts all original product images in the seed folder
 * to highly optimized WEBP format using sharp, and uploads them to Convex.
 *
 * It uses the same robust grouping logic to match the existing slugs in the DB,
 * replacing the previous JPEGs/HEICs with their WEBP counterparts to vastly
 * improve loading performance on the frontend.
 */

import fs from "fs";
import path from "path";
import sharp from "sharp";

const CONVEX_URL = "https://coordinated-corgi-699.convex.cloud";
const seedDir = "src/assets/SeedProductsImages";

// ─── Convex HTTP helpers ─────────────────────────────────────────
async function convexQuery(fn, args) {
  const res = await fetch(`${CONVEX_URL}/api/query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path: fn, args }),
  });
  if (!res.ok) throw new Error(`Query ${fn} failed: ${await res.text()}`);
  return (await res.json()).value;
}

async function convexMutation(fn, args) {
  const res = await fetch(`${CONVEX_URL}/api/mutation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path: fn, args }),
  });
  if (!res.ok) throw new Error(`Mutation ${fn} failed: ${await res.text()}`);
  return (await res.json()).value;
}

async function uploadBuffer(buf, contentType) {
  const url = await convexMutation("seed:getUploadUrl", {});
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": contentType },
    body: buf,
  });
  if (!r.ok) throw new Error(`Upload failed ${r.status}`);
  return (await r.json()).storageId;
}

// ─── Grouping — IDENTICAL to seed-runner.mjs ─────────────────────
const imageExts = new Set([".heic", ".jpg", ".jpeg", ".png", ".webp"]);

const files = fs.readdirSync(seedDir).filter((f) => !f.startsWith("."));
const groups = {};

for (const file of files) {
  const match = file.match(/^IMG_(\d+)/i);

  if (match) {
    const num = parseInt(match[1], 10);
    let added = false;
    for (const key in groups) {
      if (Math.abs(num - parseInt(key, 10)) <= 4) {
        groups[key].allFiles.push(file);
        added = true;
        break;
      }
    }
    if (!added) groups[num] = { baseNum: num, allFiles: [file] };
  } else if (file.toLowerCase().includes("whatsapp")) {
    if (!groups["whatsapp"]) groups["whatsapp"] = { baseNum: 9999, allFiles: [] };
    groups["whatsapp"].allFiles.push(file);
  }
}

const groupList = Object.values(groups)
  .map((g) => ({
    baseNum: g.baseNum,
    images: g.allFiles.filter((f) => imageExts.has(path.extname(f).toLowerCase())),
  }))
  .filter((g) => g.images.length > 0)
  .sort((a, b) => a.baseNum - b.baseNum);

console.log(`\n📦 ${groupList.length} product groups to process to WebP.\n`);

// ─── Convert & patch ─────────────────────
let fixed = 0;
let notFound = 0;
let errors = 0;

async function run() {
  for (let i = 0; i < groupList.length; i++) {
    const g = groupList[i];
    const slug = `vintage-item-${g.baseNum}`;
    const label = `[${i + 1}/${groupList.length}]`;

    // Look up product
    let product;
    try {
      product = await convexQuery("seed:getBySlug", { slug });
    } catch (e) {
      process.stderr.write(`${label} ${slug}: query error – ${e.message}\n`);
      errors++;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      continue;
    }

    if (!product) {
      console.log(`${label} ${slug}: not in DB, skipping`);
      notFound++;
      continue;
    }

    process.stdout.write(`${label} ${slug} (${g.images.length} imgs)…`);

    const newStorageIds = [];
    let hadError = false;

    for (const imgName of g.images) {
      const filePath = path.join(seedDir, imgName);
      const ext = path.extname(imgName).toLowerCase();
      
      try {
        const rawBuf = fs.readFileSync(filePath);
        let sharpInput = rawBuf;

        // If it's a HEIC file, sharp's libheif might choke on security limits (iref boxes)
        // We bypass this by decoding it to JPEG in-memory first using heic-convert
        if (ext === ".heic") {
          const heicConvert = (await import("heic-convert")).default;
          sharpInput = await heicConvert({ buffer: rawBuf, format: "JPEG", quality: 0.88 });
        }
        
        // Convert the image buffer to WebP with good optimization
        const webpBuffer = await sharp(sharpInput)
          .webp({ quality: 75, effort: 4 })
          .toBuffer();

        const id = await uploadBuffer(webpBuffer, "image/webp");
        newStorageIds.push(id);
        process.stdout.write(" ✓");
      } catch (e) {
        process.stderr.write(`\n  ✗ ${imgName}: ${e.message}\n`);
        hadError = true;
      }
    }

    if (newStorageIds.length === 0) {
      process.stdout.write(" – nothing uploaded\n");
      errors++;
      continue;
    }

    try {
      await convexMutation("seed:patchImages", { slug, images: newStorageIds });
      process.stdout.write(hadError ? " (partial) patched ✅\n" : " → patched WEBP ✅\n");
      fixed++;
    } catch (e) {
      process.stderr.write(`\n  ✗ patch failed: ${e.message}\n`);
      errors++;
    }

    // Delay 500ms to avoid rate limits on Convex
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  console.log(`\n🎉 Done!  converted=${fixed}  not_found=${notFound}  errors=${errors}`);
}

run();
