/**
 * Script para buscar bases de datos en Notion por nombre
 * Basado en el enfoque de notion-cms: https://github.com/n6g7/notion-cms
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

const SEARCH_QUERY = process.env.NOTION_DATABASE_NAME || "WebCode Blog";

async function searchDatabase() {
  console.log("\n🔍 BÚSQUEDA DE BASE DE DATOS EN NOTION");
  console.log("=====================================\n");

  try {
    console.log(`Buscando bases de datos con el nombre: "${SEARCH_QUERY}"...`);

    // Buscar usando search API (en Notion API v5, databases son "data_source")
    const response = await notion.search({
      query: SEARCH_QUERY,
      filter: {
        value: "data_source",
        property: "object"
      },
      sort: {
        direction: "descending",
        timestamp: "last_edited_time"
      }
    });

    console.log(
      `\n✅ Búsqueda completada: ${response.results.length} resultado(s) encontrado(s)\n`
    );

    if (response.results.length === 0) {
      console.log("❌ No se encontraron bases de datos con ese nombre.\n");
      console.log("📋 POSIBLES CAUSAS:");
      console.log(
        "   1. La base de datos no está compartida con la integración"
      );
      console.log("   2. El nombre no coincide exactamente");
      console.log("   3. La integración no tiene permisos de lectura\n");
      console.log("💡 SOLUCIÓN:");
      console.log("   1. Abre la base de datos en Notion");
      console.log("   2. Click en '...' → 'Add connections'");
      console.log("   3. Selecciona tu integración");
      console.log("   4. Confirma y vuelve a ejecutar este script\n");
      return;
    }

    // Mostrar resultados
    for (const db of response.results) {
      console.log("📊 Base de Datos Encontrada:");
      console.log("   Título:", db.title?.[0]?.plain_text || "Sin título");
      console.log("   ID:", db.id);
      console.log("   ID sin guiones:", db.id.replace(/-/g, ""));
      console.log("   URL:", db.url);
      console.log(
        "   Última edición:",
        new Date(db.last_edited_time).toLocaleString()
      );

      if (db.description && db.description.length > 0) {
        console.log("   Descripción:", db.description[0].plain_text);
      }

      console.log("\n   📝 CONFIGURACIÓN PARA .env.local:");
      console.log(`   NOTION_DATABASE_ID=${db.id}\n`);
    }

    // Listar todas las bases de datos compartidas (data_source en API v5)
    console.log(
      "\n📁 TODAS LAS BASES DE DATOS COMPARTIDAS CON LA INTEGRACIÓN:"
    );
    const allDatabases = await notion.search({
      filter: {
        value: "data_source",
        property: "object"
      }
    });

    if (allDatabases.results.length === 0) {
      console.log(
        "   ⚠️ No hay bases de datos compartidas con esta integración\n"
      );
    } else {
      for (const db of allDatabases.results) {
        console.log(
          `   - ${db.title?.[0]?.plain_text || "Sin título"} (${db.id})`
        );
      }
      console.log("");
    }
  } catch (error) {
    console.error("\n❌ ERROR AL BUSCAR BASE DE DATOS:");
    console.error("   Código:", error.code);
    console.error("   Mensaje:", error.message);

    if (error.code === "unauthorized") {
      console.log("\n💡 SOLUCIÓN:");
      console.log("   1. Verifica que NOTION_API_KEY es correcta");
      console.log("   2. La clave debe empezar con 'secret_' o 'ntn_'");
      console.log(
        "   3. Genera una nueva clave en https://www.notion.so/my-integrations\n"
      );
    } else if (error.code === "object_not_found") {
      console.log("\n💡 SOLUCIÓN:");
      console.log("   1. Comparte la base de datos con la integración");
      console.log(
        "   2. En Notion: '...' → 'Add connections' → Selecciona tu integración\n"
      );
    }
  }
}

searchDatabase();
