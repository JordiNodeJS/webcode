import fs from "fs";
import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const url = "http://localhost:3000";
  console.log("Opening", url);
  await page.goto(url, { waitUntil: "networkidle" });

  // Wait for logo heading
  await page.waitForSelector(".footer-animated-logo .logo-text");
  const heading = await page.$(".footer-animated-logo .logo-text");

  if (!heading) {
    console.error("Logo heading not found");
    await browser.close();
    process.exit(2);
  }

  const computed = await page.evaluate((el) => {
    const style = window.getComputedStyle(el);
    return {
      color: style.color,
      textShadow: style.textShadow
    };
  }, heading);

  console.log("Computed style:", computed);

  // Screenshot just the footer area
  const footer = await page.$(".footer-animated-logo");
  if (footer) {
    const box = await footer.boundingBox();
    if (box) {
      const screenshotPath = "scripts/footer-logo-neon.png";
      await page.screenshot({
        path: screenshotPath,
        clip: {
          x: Math.max(0, box.x),
          y: Math.max(0, box.y),
          width: Math.min(box.width, 1200),
          height: Math.min(box.height, 1200)
        }
      });
      console.log("Saved screenshot to", screenshotPath);
    } else {
      await page.screenshot({
        path: "scripts/footer-logo-neon-full.png",
        fullPage: true
      });
      console.log(
        "Saved full-page screenshot to scripts/footer-logo-neon-full.png"
      );
    }
  } else {
    await page.screenshot({
      path: "scripts/footer-logo-neon-fallback.png",
      fullPage: true
    });
    console.log(
      "Saved fallback screenshot to scripts/footer-logo-neon-fallback.png"
    );
  }

  await browser.close();
})();
