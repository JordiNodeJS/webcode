#!/usr/bin/env node
const { execSync } = require("child_process");

/**
 * Ignored build step for Vercel
 * - If current branch is in ALLOWED_DEPLOY_BRANCHES => run build:internal
 * - Otherwise exit 0 (Vercel will mark preview as Ignored)
 *
 * Env vars:
 * - ALLOWED_DEPLOY_BRANCHES (comma-separated, default: "main")
 * - VERCEL_GIT_COMMIT_REF, GITHUB_REF_NAME or GIT_BRANCH detected for branch name
 */

function getBranchName() {
  const raw =
    process.env.VERCEL_GIT_COMMIT_REF ||
    process.env.GITHUB_REF_NAME ||
    process.env.GIT_BRANCH ||
    process.env.GITHUB_REF ||
    "";
  return String(raw).replace(/^refs\/heads\//, "");
}

const branch = getBranchName();
const allowed = String(process.env.ALLOWED_DEPLOY_BRANCHES || "main")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

if (!branch) {
  console.log("No branch detected — running build by default.");
  execSync("pnpm build:internal", { stdio: "inherit" });
  process.exit(0);
}

if (!allowed.includes(branch)) {
  console.log(
    `Ignored build — branch "${branch}" not in allowed list [${allowed.join(
      ", "
    )}].`
  );
  process.exit(0);
}

console.log(`Branch "${branch}" allowed — running internal build.`);
execSync("pnpm build:internal", { stdio: "inherit" });
