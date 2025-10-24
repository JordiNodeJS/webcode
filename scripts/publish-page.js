/**
 * Script para cambiar el status de una página en Notion a "Published"
 * Uso: node scripts/publish-page.js <page_id>
 */

const { Client } = require("@notionhq/client");
const { readFileSync } = require("fs");

// Cargar variables de entorno desde .env.local
try {
  const envContent = readFileSync(".env.local", "utf8");
  const envLines = envContent.split("\n");

  for (const line of envLines) {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith("#")) {
      const [key, ...valueParts] = trimmedLine.split("=");
      const value = valueParts.join("=").replace(/^["']|["']$/g, "");
      if (key && value) {
        process.env[key.trim()] = value.trim();
      }
    }
  }
} catch (error) {
  console.error("Error al cargar .env.local:", error.message);
  process.exit(1);
}

const notion = new Client({
  auth: process.env.NOTION_API_KEY
});

// ID de la página "API Security Best Practices"
const PAGE_ID = process.argv[2] || "2898237e-a3b3-80e4-a998-c9da10626d6e";

async function publishPage() {
  console.log("\n📝 PUBLICANDO PÁGINA EN NOTION");
  console.log("==============================\n");

  try {
    console.log(`Page ID: ${PAGE_ID}\n`);

    // Primero verificar el estado actual
    console.log("🔍 Verificando estado actual...");
    const currentPage = await notion.pages.retrieve({ page_id: PAGE_ID });
    const currentStatus =
      currentPage.properties.Status?.select?.name || "Sin status";
    console.log(`   Status actual: "${currentStatus}"`);

    // Actualizar el status a "Published"
    console.log("\n📤 Actualizando status a 'Published'...");

    const response = await notion.pages.update({
      page_id: PAGE_ID,
      properties: {
        Status: {
          select: {
            name: "Published"
          }
        }
      }
    });

    const newStatus = response.properties.Status?.select?.name || "Error";

    console.log("\n✅ PÁGINA ACTUALIZADA EXITOSAMENTE!");
    console.log(
      `   Título: ${response.properties.Title?.title?.[0]?.plain_text || "Sin título"}`
    );
    console.log(`   Status anterior: "${currentStatus}"`);
    console.log(`   Status nuevo: "${newStatus}"`);
    console.log(`   URL: https://www.notion.so/${PAGE_ID.replace(/-/g, "")}`);

    console.log(
      "\n🎉 La página ahora está publicada y debería aparecer en el blog!"
    );
    console.log("   Refresca http://localhost:3000/blog para verla.\n");
  } catch (error) {
    console.error("\n❌ ERROR AL PUBLICAR PÁGINA:");
    console.error("   Código:", error.code);
    console.error("   Mensaje:", error.message);

    if (error.code === "object_not_found") {
      console.log("\n💡 SOLUCIÓN:");
      console.log("   1. Verifica que el Page ID sea correcto");
      console.log(
        "   2. Asegúrate de que la página esté compartida con la integración\n"
      );
    } else if (error.code === "validation_error") {
      console.log("\n💡 POSIBLE CAUSA:");
      console.log("   1. El campo 'Status' no existe en la página");
      console.log(
        "   2. El valor 'Published' no existe como opción en el campo Status"
      );
      console.log("   3. Verifica las opciones disponibles en Notion\n");
    }
  }
}

publishPage();
