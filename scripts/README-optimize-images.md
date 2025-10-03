# Image optimization script

This project includes `scripts/optimize-images.sh` to help optimize PNG images and generate WebP variants.

Requirements (recommended):

- cwebp (libwebp) - best for WebP conversion
- pngquant or zopflipng - best for PNG recompression
- ImageMagick (`magick`) - used for resizing and as fallback if other tools are missing

Basic usage:

```bash
# optimize all PNGs under public/images
./scripts/optimize-images.sh

# optimize specific files
./scripts/optimize-images.sh public/images/mudanzasandy-preview.png
```

The script will:

- Create a `.webp` alongside each `.png` (if `cwebp` or `magick` available)
- Try to recompress/strip the PNG via `pngquant`, `zopflipng` or ImageMagick
- Optionally generate responsive WebP/PNG sizes when ImageMagick is available

Run the script locally (CI or dev machine) and commit the generated optimized assets to the repo when satisfied.

## Node.js option (cross-platform)

If you prefer a Node-based workflow (no system binaries required once dependencies are installed), use the ESM script `scripts/optimize-images-node.mjs` which uses `sharp`.

1. Install `sharp` as a dev dependency (we use pnpm in this repo):

```bash
pnpm add -D sharp
```

2. Run the ESM script with Node (Git Bash accepts `node`):

```bash
# optimize the single preview file
node scripts/optimize-images-node.mjs public/images/mudanzasandy-preview.png

# or optimize all PNGs under public/images
node scripts/optimize-images-node.mjs
```

The script will generate `.webp` variants, re-encode PNGs with compression, and create responsive sizes (480/800/1200px) alongside the originals.

Notes:

- `sharp` requires a compatible Node.js release and will download prebuilt binaries during install. If installation fails, consult the Sharp installation docs for your platform.
- After running the script, review the generated files in `public/images/` and commit the ones you want to keep.
