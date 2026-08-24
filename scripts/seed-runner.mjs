import fs from "fs";
import path from "path";

const CONVEX_URL = "https://coordinated-corgi-699.convex.cloud";
const seedDir = "src/assets/SeedProductsImages";

// ─── Helper: call a Convex mutation via HTTP API ────────────────────────────
async function convexMutation(functionPath, args) {
  const res = await fetch(`${CONVEX_URL}/api/mutation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path: functionPath, args }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Convex mutation ${functionPath} failed (${res.status}): ${body}`);
  }
  const data = await res.json();
  // Convex HTTP API returns { value: ..., status: "success" }
  return data.value;
}

// ─── Group images by numeric proximity ─────────────────────────────────────
const files = fs.readdirSync(seedDir);
const groups = {};

for (const file of files) {
  if (file.startsWith(".")) continue;
  const ext = path.extname(file).toLowerCase();
  const match = file.match(/^IMG_(\d+)/i);

  if (match) {
    const num = parseInt(match[1], 10);
    let added = false;
    for (const key in groups) {
      if (Math.abs(num - parseInt(key, 10)) <= 4) {
        groups[key].files.push({ name: file, ext });
        added = true;
        break;
      }
    }
    if (!added) groups[num] = { baseNum: num, files: [{ name: file, ext }] };
  } else if (file.toLowerCase().includes("whatsapp")) {
    if (!groups["whatsapp"]) groups["whatsapp"] = { baseNum: 9999, files: [] };
    groups["whatsapp"].files.push({ name: file, ext });
  }
}

const imageExts  = new Set([".heic", ".jpg", ".jpeg", ".png", ".webp"]);
const videoExts  = new Set([".mov", ".mp4"]);

const groupList = Object.values(groups)
  .map(g => ({
    baseNum: g.baseNum,
    images: g.files.filter(f => imageExts.has(f.ext)).map(f => f.name),
    videos: g.files.filter(f => videoExts.has(f.ext)).map(f => f.name),
  }))
  .filter(g => g.images.length > 0);

console.log(`Found ${groupList.length} product groups from ${files.length} files.`);

// ─── Category mapping based on base number ranges ───────────────────────────
// We will auto-assign categories; admin can re-categorise in the dashboard.
function guessCategory(baseNum) {
  // Just use Headlights for all for now - admin can change later
  return "Headlights";
}

// ─── Upload a single file to Convex Storage ─────────────────────────────────
async function uploadFile(filePath, contentType) {
  // 1. Get a pre-signed upload URL
  const uploadUrl = await convexMutation("seed:getUploadUrl", {});

  // 2. PUT the file
  const buf = fs.readFileSync(filePath);
  const uploadRes = await fetch(uploadUrl, {
    method: "POST",
    headers: { "Content-Type": contentType },
    body: buf,
  });
  if (!uploadRes.ok) throw new Error(`Upload failed (${uploadRes.status}) for ${filePath}`);
  const { storageId } = await uploadRes.json();
  return storageId;
}

// ─── Main seeding loop (process all groups) ─────────────────────────────────
let processed = 0;
let skipped = 0;

for (let i = 0; i < groupList.length; i++) {
  const g = groupList[i];
  const label = `[${i + 1}/${groupList.length}]`;
  console.log(`\n${label} Group base=${g.baseNum}  imgs=${g.images.length}  vids=${g.videos.length}`);

  // ── Upload images ──────────────────────────────────────────────────────────
  const storageImageIds = [];
  for (const imgName of g.images) {
    const filePath = path.join(seedDir, imgName);
    try {
      const ct = imgName.toLowerCase().endsWith(".heic") ? "image/heic" : "image/jpeg";
      const id = await uploadFile(filePath, ct);
      storageImageIds.push(id);
      process.stdout.write(`  ✓ img ${imgName} → ${id}\n`);
    } catch (err) {
      process.stderr.write(`  ✗ img ${imgName}: ${err.message}\n`);
    }
  }

  if (storageImageIds.length === 0) {
    console.log(`  Skipping – no images uploaded.`);
    skipped++;
    continue;
  }

  // ── Upload first video ────────────────────────────────────────────────────
  let storageVideoId;
  if (g.videos.length > 0) {
    const vidName = g.videos[0];
    const filePath = path.join(seedDir, vidName);
    try {
      const ct = vidName.toLowerCase().endsWith(".mp4") ? "video/mp4" : "video/quicktime";
      storageVideoId = await uploadFile(filePath, ct);
      process.stdout.write(`  ✓ vid ${vidName} → ${storageVideoId}\n`);
    } catch (err) {
      process.stderr.write(`  ✗ vid ${vidName}: ${err.message}\n`);
    }
  }

  // ── Insert / update product ───────────────────────────────────────────────
  const name     = `Vintage Item ${g.baseNum}`;
  const slug     = `vintage-item-${g.baseNum}`;
  const category = guessCategory(g.baseNum);

  try {
    const id = await convexMutation("seed:insertProduct", {
      name,
      slug,
      description: `A unique vintage piece from the VintageCvunt archive. Item reference ${g.baseNum}.`,
      price: 15000,
      images: storageImageIds,
      category,
      tags: ["vintage", "archive"],
      sizes: [],
      colors: [],
      featured: false,
      inStock: true,
      stockCount: 100,
      video: storageVideoId,
    });
    console.log(`  ✓ product saved → ${id}`);
    processed++;
  } catch (err) {
    console.error(`  ✗ insert failed: ${err.message}`);
    skipped++;
  }
}

console.log(`\n✅ Done.  processed=${processed}  skipped=${skipped}`);
