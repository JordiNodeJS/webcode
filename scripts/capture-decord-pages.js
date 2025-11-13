const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const baseUrl = "https://ld-wt73.template-help.com/tf/decord_v1";

const pages = [
  { path: "/", name: "decord-home" },
  { path: "/about.html", name: "decord-about" },
  { path: "/team.html", name: "decord-team" },
  { path: "/team-member.html", name: "decord-team-member" },
  { path: "/gallery.html", name: "decord-gallery" },
  { path: "/grid-gallery.html", name: "decord-grid-gallery" },
  { path: "/grid-gallery-2.html", name: "decord-grid-gallery-2" },
  { path: "/masonry-gallery.html", name: "decord-masonry-gallery" },
  { path: "/masonry-gallery-2.html", name: "decord-masonry-gallery-2" },
  { path: "/single-gallery.html", name: "decord-single-gallery" },
  { path: "/events.html", name: "decord-events" },
  { path: "/single-event.html", name: "decord-single-event" },
  { path: "/news.html", name: "decord-news" },
  { path: "/single-post.html", name: "decord-single-post" },
  { path: "/testimonials.html", name: "decord-testimonials" },
  { path: "/contacts.html", name: "decord-contacts" }
];

const outDir = path.join(process.cwd(), "public", "images");
fs.mkdirSync(outDir, { recursive: true });

(async () => {
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });

  for (const pageInfo of pages) {
    const url = `${baseUrl}${pageInfo.path}`;
    console.log(`Visiting ${url}...`);
    
    try {
      console.log(`Navigating to ${url}...`);
      const response = await page.goto(url, { 
        waitUntil: "networkidle",
        timeout: 60000 
      });
      
      if (!response || !response.ok()) {
        console.warn(`Warning: Page ${url} returned status ${response?.status()}`);
      }
      
      // Wait a bit for any animations or lazy loading
      await page.waitForTimeout(5000);
      
      // Wait for main content to be visible
      try {
        await page.waitForSelector('body', { timeout: 10000 });
        // Wait for some content to be visible
        await page.waitForSelector('h1, h2, h3, .container, main', { timeout: 10000 }).catch(() => {
          console.warn(`Warning: No main content selector found for ${url}`);
        });
      } catch (e) {
        console.warn(`Warning: Could not find body selector for ${url}`);
      }
      
      // Take screenshot as PNG first
      const pngPath = path.join(outDir, `${pageInfo.name}.png`);
      const screenshot = await page.screenshot({ 
        path: pngPath, 
        fullPage: true,
        type: 'png'
      });
      
      // Verify screenshot was actually taken
      if (!fs.existsSync(pngPath)) {
        throw new Error(`Screenshot file was not created: ${pngPath}`);
      }
      
      const stats = fs.statSync(pngPath);
      if (stats.size < 1000) {
        throw new Error(`Screenshot file is too small (${stats.size} bytes), likely empty`);
      }
      
      console.log(`Saved PNG: ${pngPath} (${(stats.size / 1024).toFixed(2)} KB)`);
      
      // Convert to WebP with optimization
      const webpPath = path.join(outDir, `${pageInfo.name}.webp`);
      await sharp(pngPath)
        .webp({ quality: 85, effort: 6 })
        .toFile(webpPath);
      console.log(`Converted to WebP: ${webpPath}`);
      
      // Delete PNG to save space
      fs.unlinkSync(pngPath);
      console.log(`Deleted temporary PNG: ${pngPath}`);
      
    } catch (error) {
      console.error(`Error capturing ${url}:`, error.message);
    }
  }

  await browser.close();
  console.log("\n✅ All screenshots captured and converted to WebP!");
})();

