/**
 * Script para listar el contenido de la base de datos de Notion
 * Muestra todas las páginas con sus propiedades completas
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
	auth: process.env.NOTION_API_KEY,
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID;

async function listDatabaseContent() {
	console.log("\n📊 CONTENIDO DE LA BASE DE DATOS NOTION");
	console.log("=======================================\n");

	try {
		console.log(`Database ID: ${DATABASE_ID}\n`);

		// Consultar todos los elementos (usando dataSources en API v5)
		const response = await notion.dataSources.query({
			data_source_id: DATABASE_ID,
			page_size: 100,
		});

		console.log(`Total de páginas: ${response.results.length}\n`);

		if (response.results.length === 0) {
			console.log("❌ No hay páginas en la base de datos.\n");
			return;
		}

		// Mostrar detalles de cada página
		for (let i = 0; i < response.results.length; i++) {
			const page = response.results[i];
			console.log(`\n━━━ PÁGINA ${i + 1} ━━━`);
			console.log(`ID: ${page.id}`);
			console.log(`Creada: ${page.created_time}`);
			console.log(`Última edición: ${page.last_edited_time}`);

			console.log("\n📝 PROPIEDADES:");

			const props = page.properties;

			// Title
			if (props.Title && props.Title.title) {
				const title = props.Title.title.map((t) => t.plain_text).join("");
				console.log(`  Title: "${title}"`);
			}

			// Status
			if (props.Status) {
				console.log(
					`  Status: ${props.Status.select ? props.Status.select.name : "null"}`,
				);
			}

			// Slug
			if (props.Slug && props.Slug.rich_text) {
				const slug = props.Slug.rich_text.map((t) => t.plain_text).join("");
				console.log(`  Slug: "${slug}"`);
			}

			// Description
			if (props.Description && props.Description.rich_text) {
				const desc = props.Description.rich_text
					.map((t) => t.plain_text)
					.join("");
				console.log(`  Description: "${desc}"`);
			}

			// PublishedDate
			if (props.PublishedDate && props.PublishedDate.date) {
				console.log(`  PublishedDate: ${props.PublishedDate.date.start}`);
			}

			// Tags
			if (props.Tags && props.Tags.multi_select) {
				const tags = props.Tags.multi_select.map((t) => t.name).join(", ");
				console.log(`  Tags: [${tags}]`);
			}

			// Author
			if (props.Author && props.Author.people) {
				const authors = props.Author.people
					.map((p) => p.name || p.id)
					.join(", ");
				console.log(`  Author: ${authors}`);
			}

			// Featured
			if (props.Featured) {
				console.log(`  Featured: ${props.Featured.checkbox}`);
			}

			// CoverImageURL
			if (props.CoverImageURL) {
				console.log(`  CoverImageURL: ${props.CoverImageURL.url || "null"}`);
			}
		}

		console.log("\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
		console.log("📋 RESUMEN:");

		const statusCount = {};
		response.results.forEach((page) => {
			const status = page.properties.Status?.select?.name || "Sin Status";
			statusCount[status] = (statusCount[status] || 0) + 1;
		});

		console.log("\nPáginas por Status:");
		for (const [status, count] of Object.entries(statusCount)) {
			console.log(`  ${status}: ${count}`);
		}

		console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
	} catch (error) {
		console.error("\n❌ ERROR AL LISTAR CONTENIDO:");
		console.error("   Código:", error.code);
		console.error("   Mensaje:", error.message);
		console.error("\n");
	}
}

listDatabaseContent();
