import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.resolve(__dirname, "../src/assets");

const images = [
  { name: "butterfly-img.png", sizes: [400, 800, 1200, 2000] },
  { name: "sculpture.png", sizes: [400, 800, 1200, 2000] },
  { name: "logo.png", sizes: [400, 800, 1200, 2000] },
  { name: "editorial-1.jpg", sizes: [400, 800, 1200] },
  { name: "editorial-2.jpg", sizes: [400, 800, 1200] },
  { name: "product-ring.jpg", sizes: [400, 800] },
  { name: "product-jacket.jpg", sizes: [400, 800] },
  { name: "product-chain.jpg", sizes: [400, 800] },
  { name: "product-boots.jpg", sizes: [400, 800] },
];

async function optimize() {
  for (const img of images) {
    const inputPath = path.join(assetsDir, img.name);
    if (!fs.existsSync(inputPath)) {
      console.warn(`Skipping ${img.name} — not found`);
      continue;
    }

    const ext = path.extname(img.name).toLowerCase();
    const baseName = path.basename(img.name, ext);

    // Generate WebP at each size
    for (const size of img.sizes) {
      const webpName = `${baseName}-${size}w.webp`;
      const webpPath = path.join(assetsDir, webpName);

      if (fs.existsSync(webpPath)) {
        console.log(`  Already exists: ${webpName}`);
        continue;
      }

      const pipeline = sharp(inputPath)
        .resize({ width: size, withoutEnlargement: true })
        .webp({ quality: 80, effort: 6 });

      await pipeline.toFile(webpPath);
      const stats = fs.statSync(webpPath);
      console.log(`  Created ${webpName} (${(stats.size / 1024).toFixed(1)} KB)`);
    }

    // Also convert originals to WebP (full size) for browsers that don't support srcset
    const fullWebpName = `${baseName}.webp`;
    const fullWebpPath = path.join(assetsDir, fullWebpName);
    if (!fs.existsSync(fullWebpPath)) {
      await sharp(inputPath)
        .webp({ quality: 82, effort: 6 })
        .toFile(fullWebpPath);
      const origStats = fs.statSync(inputPath);
      const webpStats = fs.statSync(fullWebpPath);
      console.log(`  Created ${fullWebpName} (${(webpStats.size / 1024).toFixed(1)} KB, was ${(origStats.size / 1024).toFixed(1)} KB)`);
    }
  }
  console.log("\nDone! All images optimized.");
}

optimize().catch(console.error);
