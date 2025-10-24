#!/usr/bin/env node
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const RESPONSIVE_WIDTHS = [480, 800, 1200];
const WEBP_QUALITY = 80;

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function processPng(filePath) {
  const dir = path.dirname(filePath);
  const name = path.basename(filePath, path.extname(filePath));

  console.log("Processing:", filePath);

  // 1) generate webp
  const webpOut = path.join(dir, `${name}.webp`);
  try {
    await sharp(filePath).webp({ quality: WEBP_QUALITY }).toFile(webpOut);
    console.log(" - Generated WebP:", webpOut);
  } catch (err) {
    console.error(" - WebP generation failed:", err.message);
  }

  // 2) re-encode PNG (optimize) using sharp
  const tmpPng = path.join(dir, `${name}.opt.png`);
  try {
    await sharp(filePath)
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(tmpPng);
    await fs.rename(tmpPng, filePath);
    console.log(" - Re-encoded PNG in place");
  } catch (err) {
    console.error(" - PNG re-encode failed:", err.message);
    if (await fileExists(tmpPng)) {
      try {
        await fs.unlink(tmpPng);
      } catch {}
    }
  }

  // 3) responsive variants (webp + png)
  for (const w of RESPONSIVE_WIDTHS) {
    const webpRes = path.join(dir, `${name}-${w}.webp`);
    const pngRes = path.join(dir, `${name}-${w}.png`);
    try {
      await sharp(filePath)
        .resize({ width: w })
        .png({ compressionLevel: 9 })
        .toFile(pngRes);
      await sharp(pngRes).webp({ quality: WEBP_QUALITY }).toFile(webpRes);
      console.log(` - Generated responsive ${w}px -> ${pngRes} + ${webpRes}`);
    } catch (err) {
      console.error(` - Responsive ${w}px generation failed:`, err.message);
    }
  }
}

(async function main() {
  const args = process.argv.slice(2);
  let targets = [];
  if (args.length) {
    targets = args;
  } else {
    // scan public/images for pngs
    const dir = path.join(process.cwd(), "public", "images");
    try {
      const files = await fs.readdir(dir);
      targets = files
        .filter((f) => f.toLowerCase().endsWith(".png"))
        .map((f) => path.join(dir, f));
    } catch (err) {
      console.error("Failed to read public/images:", err.message);
      process.exit(1);
    }
  }

  if (!targets.length) {
    console.error(
      "No target PNG files found. Usage: node scripts/optimize-images-node.mjs [file1.png ...]"
    );
    process.exit(1);
  }

  for (const t of targets) {
    try {
      await processPng(t);
    } catch (err) {
      console.error("Error processing", t, err.message);
    }
  }

  console.log("All done");
})();
