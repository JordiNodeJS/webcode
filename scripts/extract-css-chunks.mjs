import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';

function main() {
  const buildManifestPath = resolve('.next', 'build-manifest.json');
  const outPath = resolve('public', 'css-chunks.json');

  const allCss = new Set();

  if (existsSync(buildManifestPath)) {
    try {
      const manifestRaw = readFileSync(buildManifestPath, 'utf8');
      const manifest = JSON.parse(manifestRaw);
      const sources = [manifest.pages, manifest.ampFirstPages, manifest.lowPriorityFiles, manifest.app];
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
      if (Array.isArray(manifest.cssFiles)) {
        for (const f of manifest.cssFiles) {
          if (f.endsWith('.css')) allCss.add(f.startsWith('/') ? f : `/_next/${f}`);
        }
      }
    } catch (e) {
      // continue to directory scan fallback
    }
  }

  // Fallback: list from .next/static/chunks/*.css
  try {
    const chunksDir = resolve('.next', 'static', 'chunks');
    if (existsSync(chunksDir)) {
      const files = readdirSync(chunksDir);
      for (const f of files) {
        if (f.endsWith('.css')) {
          allCss.add(`/_next/static/chunks/${f}`);
        }
      }
    }
  } catch {}

  const list = Array.from(allCss);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, JSON.stringify({ css: list }, null, 2));
  console.log(`Wrote ${list.length} css entries -> ${outPath}`);
}

main();


