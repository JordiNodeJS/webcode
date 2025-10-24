import path from "path";
import process from "process";

// Load environment variables from .env.local if present
// Note: avoid relying on dotenv in this script to keep dependencies minimal
const clientPath = path.resolve(process.cwd(), "src/lib/notion/client");

(async () => {
  try {
    const fileUrl = (p) => new URL(`file://${p.replace(/\\/g, "/")}`);
    let mod;
    try {
      mod = await import(fileUrl(clientPath + ".js"));
    } catch (e) {
      // Try .ts file
      mod = await import(fileUrl(clientPath + ".ts"));
    }

    const notion = mod.notion;
    console.log("NOTION_API_KEY set:", !!process.env.NOTION_API_KEY);
    console.log("NOTION_DATABASE_ID set:", !!process.env.NOTION_DATABASE_ID);
    console.log("notion type:", typeof notion);
    if (notion) {
      console.log("notion keys:", Object.keys(notion));
      console.log("databases:", !!notion.databases);
      if (notion.databases) {
        console.log("databases keys:", Object.keys(notion.databases));
        console.log("databases.query type:", typeof notion.databases.query);
      }
    }
  } catch (err) {
    console.error("Error importing client module:", err);
    process.exitCode = 1;
  }
})();
