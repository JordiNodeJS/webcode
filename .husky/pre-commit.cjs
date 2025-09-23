const { spawnSync } = require('child_process');

const res = spawnSync('pnpm', ['dlx', 'lint-staged'], { stdio: 'inherit' });
process.exit(res.status || 1);
