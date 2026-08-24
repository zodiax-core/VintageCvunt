/**
 * fix-heic-v2.mjs
 * ─────────────────────────────────────────────────────────────────
 * Same as fix-heic.mjs but uses the EXACT same grouping as
 * seed-runner.mjs (includes video files in the grouping pass so
 * base numbers match the slugs already in the DB).
 *
 * Only patches products whose updatedAt is OLDER than the v1 fix
 * run (i.e., still have HEIC images). Already-fixed products are
 * skipped automatically.
 */

import fs from "fs";
import path from "path";
import heicConvert from "heic-convert";

const CONVEX_URL = "https://coordinated-corgi-699.convex.cloud";
const seedDir = "src/assets/SeedProductsImages";

// Anything patched AFTER this timestamp was already fixed by v1.
// Set to just before the v1 fix started (~19:26 PKT = 14:26 UTC).
const V1_FIX_TIMESTAMP = new Date("2026-08-24T14:25:00.000Z").getTime();

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
// (includes ALL files, including videos, in the proximity pass)
const imageExts = new Set([".heic", ".jpg", ".jpeg", ".png", ".webp"]);
const videoExts = new Set([".mov", ".mp4"]);

const files = fs.readdirSync(seedDir).filter((f) => !f.startsWith("."));
const groups = {};

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
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

console.log(`\n📦 ${groupList.length} product groups (seed-runner grouping).\n`);

// ─── Convert & patch (only unfixed products) ─────────────────────
let fixed = 0;
let alreadyDone = 0;
let notFound = 0;
let errors = 0;

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
    continue;
  }

  if (!product) {
    console.log(`${label} ${slug}: not in DB, skipping`);
    notFound++;
    continue;
  }

  // Skip if already patched by v1 fix
  if (product.updatedAt >= V1_FIX_TIMESTAMP) {
    console.log(`${label} ${slug}: already fixed ✓ (skip)`);
    alreadyDone++;
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
      let uploadBuf, contentType;

      if (ext === ".heic") {
        const jpegBuffer = await heicConvert({ buffer: rawBuf, format: "JPEG", quality: 0.88 });
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
    process.stdout.write(" – nothing uploaded\n");
    errors++;
    continue;
  }

  try {
    await convexMutation("seed:patchImages", { slug, images: newStorageIds });
    process.stdout.write(hadError ? " (partial) patched ✅\n" : " → patched ✅\n");
    fixed++;
  } catch (e) {
    process.stderr.write(`\n  ✗ patch failed: ${e.message}\n`);
    errors++;
  }

  // Sleep 1s to avoid rate limiting
  await new Promise((resolve) => setTimeout(resolve, 1000));
}

console.log(`\n🎉 Done!  fixed=${fixed}  already_done=${alreadyDone}  not_found=${notFound}  errors=${errors}`);
