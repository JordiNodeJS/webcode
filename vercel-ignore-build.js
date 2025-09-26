#!/usr/bin/env node
/**
 * Self-contained Ignored Build Step wrapper for Vercel.
 *
 * Behavior:
 * - If branch can't be detected -> run internal build
 * - If branch is in ALLOWED_DEPLOY_BRANCHES -> run internal build
 * - Otherwise exit 0 (Vercel will mark the preview as Ignored)
 *
 * Env vars expected:
 * - ALLOWED_DEPLOY_BRANCHES (comma-separated, default: "main")
 * - VERCEL_GIT_COMMIT_REF, GITHUB_REF_NAME, GIT_BRANCH, GITHUB_REF
 */

const { execSync } = require('child_process');

function getBranchName() {
  const raw =
    process.env.VERCEL_GIT_COMMIT_REF ||
    process.env.GITHUB_REF_NAME ||
    process.env.GIT_BRANCH ||
    process.env.GITHUB_REF ||
    '';
  return String(raw).replace(/^refs\/heads\//, '');
}

const branch = getBranchName();
const allowed = String(process.env.ALLOWED_DEPLOY_BRANCHES || 'main')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

if (!branch) {
  console.log('No branch detected — running build by default.');
  try {
    execSync('pnpm build:internal', { stdio: 'inherit' });
    process.exit(0);
  } catch (err) {
    console.error('Internal build failed:', err && err.stack ? err.stack : err);
    process.exit(1);
  }
}

if (!allowed.includes(branch)) {
  console.log(
    `Ignored build — branch "${branch}" not in allowed list [${allowed.join(', ')}].`
  );
  process.exit(0);
}

console.log(`Branch "${branch}" allowed — running internal build.`);
try {
  execSync('pnpm build:internal', { stdio: 'inherit' });
} catch (err) {
  console.error('Internal build failed:', err && err.stack ? err.stack : err);
  process.exit(1);
}
