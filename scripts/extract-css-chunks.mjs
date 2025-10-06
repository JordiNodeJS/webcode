import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

function main() {
  const buildManifestPath = resolve('.next', 'build-manifest.json');
  const outPath = resolve('public', 'css-chunks.json');

  const manifestRaw = readFileSync(buildManifestPath, 'utf8');
  const manifest = JSON.parse(manifestRaw);

  const allCss = new Set();

  // Aggregate CSS files from pages and app
  const sources = [manifest.pages, manifest.ampFirstPages, manifest.lowPriorityFiles];
  for (const src of sources) {
    if (!src) continue;
    for (const key of Object.keys(src)) {
      const files = src[key];
      if (!Array.isArray(files)) continue;
      for (const f of files) {
        if (typeof f === 'string' && f.endsWith('.css')) {
          allCss.add(f.startsWith('/') ? f : `/_next/${f}`);
        }
      }
    }
  }

  // Also scan top-level cssFiles if present
  if (Array.isArray(manifest.cssFiles)) {
    for (const f of manifest.cssFiles) {
      if (f.endsWith('.css')) allCss.add(f.startsWith('/') ? f : `/_next/${f}`);
    }
  }

  const list = Array.from(allCss);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, JSON.stringify({ css: list }, null, 2));
  console.log(`Wrote ${list.length} css entries -> ${outPath}`);
}

main();


