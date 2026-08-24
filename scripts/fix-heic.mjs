/**
 * fix-heic.mjs
 * ─────────────────────────────────────────────────────────────────
 * For every product that was seeded, this script:
 *   1. Finds the original local HEIC/image files for that product
 *   2. Converts HEIC → JPEG in memory (heic-convert)
 *   3. Uploads the JPEG versions to Convex Storage
 *   4. Patches the product's images array with the new storage IDs
 *
 * Safe to re-run: if a product already has non-HEIC images (from a
 * previous run of this script) the grouping slug match will still
 * update it with fresh JPEG uploads.
 */

import fs from "fs";
import path from "path";
import heicConvert from "heic-convert";

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

async function getUploadUrl() {
  return convexMutation("seed:getUploadUrl", {});
}

async function uploadBuffer(buf, contentType) {
  const url = await getUploadUrl();
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": contentType },
    body: buf,
  });
  if (!r.ok) throw new Error(`Upload failed ${r.status}`);
  return (await r.json()).storageId;
}

// ─── Same grouping logic as seed-runner.mjs ──────────────────────
const imageExts = new Set([".heic", ".jpg", ".jpeg", ".png", ".webp"]);

const files = fs.readdirSync(seedDir).filter((f) => !f.startsWith("."));
const groups = {};

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  if (!imageExts.has(ext)) continue; // skip videos for grouping
  const match = file.match(/^IMG_(\d+)/i);
  if (match) {
    const num = parseInt(match[1], 10);
    let added = false;
    for (const key in groups) {
      if (Math.abs(num - parseInt(key, 10)) <= 4) {
        groups[key].push(file);
        added = true;
        break;
      }
    }
    if (!added) groups[num] = [file];
  }
}

const groupList = Object.entries(groups)
  .map(([key, imgs]) => ({ baseNum: parseInt(key, 10), images: imgs }))
  .filter((g) => g.images.length > 0)
  .sort((a, b) => a.baseNum - b.baseNum);

console.log(`\n📦 ${groupList.length} product groups to fix.\n`);

// ─── Convert & patch ─────────────────────────────────────────────
let fixed = 0;
let skipped = 0;
let errors = 0;

for (let i = 0; i < groupList.length; i++) {
  const g = groupList[i];
  const slug = `vintage-item-${g.baseNum}`;
  const label = `[${i + 1}/${groupList.length}]`;

  // Check the product exists in Convex
  let product;
  try {
    product = await convexQuery("seed:getBySlug", { slug });
  } catch (e) {
    process.stderr.write(`${label} ${slug}: query error – ${e.message}\n`);
    errors++;
    continue;
  }

  if (!product) {
    console.log(`${label} ${slug}: not found in DB, skipping`);
    skipped++;
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
      let uploadBuf;
      let contentType;

      if (ext === ".heic") {
        // Convert HEIC → JPEG
        const jpegBuffer = await heicConvert({
          buffer: rawBuf,
          format: "JPEG",
          quality: 0.88,
        });
        uploadBuf = Buffer.from(jpegBuffer);
        contentType = "image/jpeg";
      } else {
        uploadBuf = rawBuf;
        contentType = "image/jpeg";
      }

      const id = await uploadBuffer(uploadBuf, contentType);
      newStorageIds.push(id);
      process.stdout.write(" ✓");
    } catch (e) {
      process.stderr.write(`\n  ✗ ${imgName}: ${e.message}\n`);
      hadError = true;
    }
  }

  if (newStorageIds.length === 0) {
    process.stdout.write(" – no images uploaded, skipping patch\n");
    skipped++;
    continue;
  }

  // Patch the product
  try {
    await convexMutation("seed:patchImages", { slug, images: newStorageIds });
    process.stdout.write(hadError ? " (partial patch saved)\n" : " → patched ✅\n");
    fixed++;
  } catch (e) {
    process.stderr.write(`\n  ✗ patch failed: ${e.message}\n`);
    errors++;
  }
}

console.log(`\n🎉 Done!  fixed=${fixed}  skipped=${skipped}  errors=${errors}`);
