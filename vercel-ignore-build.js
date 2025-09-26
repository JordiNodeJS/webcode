#!/usr/bin/env node
/**
 * Root wrapper for Vercel Ignored Build Step.
 * Loads and runs `scripts/vercel-ignore-build.js` from the repository.
 */
const path = require('path');
const fs = require('fs');

const scriptPath = path.resolve(process.cwd(), 'scripts', 'vercel-ignore-build.js');

if (!fs.existsSync(scriptPath)) {
  console.error(`Required script not found at: ${scriptPath}`);
  console.error('Make sure scripts/vercel-ignore-build.js exists in the repository root.');
  process.exit(1);
}

try {
  // Use require to ensure any thrown errors bubble up to the Vercel logs
  require(scriptPath);
} catch (err) {
  console.error(`Failed to execute ${scriptPath}:`);
  console.error(err && err.stack ? err.stack : err);
  process.exit(1);
}
