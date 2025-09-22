const { chromium } = require("playwright");
const fs = require("fs");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1280, height: 900 },
  });

  const urls = [
    { path: "/cookies", name: "cookies" },
    { path: "/politica-privacidad", name: "politica-privacidad" },
    { path: "/privacy", name: "privacy" },
  ];

  const outDir = "test-results/screenshots/playwright";
  fs.mkdirSync(outDir, { recursive: true });

  for (const u of urls) {
    const url = `http://localhost:3000${u.path}`;
    console.log("Visiting", url);
    await page.goto(url, { waitUntil: "networkidle" });
    // Wait a bit for any client hydration
    await page.waitForTimeout(500);
    const path = `${outDir}/${u.name}.png`;
    await page.screenshot({ path, fullPage: true });
    console.log("Saved", path);
  }

  await browser.close();
})();
