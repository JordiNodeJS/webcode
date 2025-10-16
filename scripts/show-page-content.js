/**
 * Script para mostrar el contenido completo de las páginas de Notion
 * Incluye propiedades y bloques de contenido
 */

const { Client } = require("@notionhq/client");
const { NotionToMarkdown } = require("notion-to-md");
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

const n2m = new NotionToMarkdown({ notionClient: notion });
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

async function showPageContent() {
	console.log("\n📄 CONTENIDO COMPLETO DE PÁGINAS DE NOTION");
	console.log("==========================================\n");

	try {
		// Obtener todas las páginas
		const response = await notion.dataSources.query({
			data_source_id: DATABASE_ID,
			page_size: 100,
		});

		console.log(`Total de páginas: ${response.results.length}\n`);

		for (let i = 0; i < response.results.length; i++) {
			const page = response.results[i];
			const props = page.properties;

			console.log("\n" + "═".repeat(80));
			console.log(
				`📄 PÁGINA ${i + 1}: ${props.Title?.title?.[0]?.plain_text || "Sin título"}`,
			);
			console.log("═".repeat(80));

			console.log("\n📋 METADATOS:");
			console.log(`   ID: ${page.id}`);
			console.log(`   Creada: ${new Date(page.created_time).toLocaleString()}`);
			console.log(
				`   Última edición: ${new Date(page.last_edited_time).toLocaleString()}`,
			);
			console.log(`   URL: https://www.notion.so/${page.id.replace(/-/g, "")}`);

			console.log("\n📝 PROPIEDADES:");
			console.log(
				`   📌 Title: "${props.Title?.title?.[0]?.plain_text || ""}"`,
			);
			console.log(`   🏷️  Status: ${props.Status?.select?.name || "null"}`);
			console.log(
				`   🔗 Slug: "${props.Slug?.rich_text?.[0]?.plain_text || ""}"`,
			);
			console.log(
				`   📄 Description: "${props.Description?.rich_text?.[0]?.plain_text || ""}"`,
			);
			console.log(
				`   📅 PublishedDate: ${props.PublishedDate?.date?.start || "null"}`,
			);

			const tags =
				props.Tags?.multi_select?.map((t) => t.name).join(", ") || "ninguno";
			console.log(`   🏷️  Tags: [${tags}]`);

			const author =
				props.Author?.people?.[0]?.name ||
				props.Author?.people?.[0]?.id ||
				"sin autor";
			console.log(`   👤 Author: ${author}`);

			console.log(`   ⭐ Featured: ${props.Featured?.checkbox ? "Sí" : "No"}`);
			console.log(`   🖼️  CoverImageURL: ${props.CoverImageURL?.url || "null"}`);

			// Obtener bloques de contenido
			console.log("\n📑 CONTENIDO:");
			console.log("─".repeat(80));

			try {
				const mdblocks = await n2m.pageToMarkdown(page.id);
				const mdString = n2m.toMarkdownString(mdblocks);

				if (mdString.parent && mdString.parent.trim().length > 0) {
					// Mostrar primeros 500 caracteres
					const preview = mdString.parent.substring(0, 500);
					console.log(preview);

					if (mdString.parent.length > 500) {
						console.log(
							`\n... (${mdString.parent.length - 500} caracteres más)`,
						);
					}

					console.log(`\n📊 Estadísticas del contenido:`);
					console.log(
						`   Longitud total: ${mdString.parent.length} caracteres`,
					);
					console.log(`   Palabras: ${mdString.parent.split(/\s+/).length}`);
					console.log(`   Líneas: ${mdString.parent.split("\n").length}`);

					// Calcular tiempo de lectura
					const wordsPerMinute = 200;
					const wordCount = mdString.parent.split(/\s+/).length;
					const readTime = Math.ceil(wordCount / wordsPerMinute);
					console.log(`   Tiempo de lectura estimado: ${readTime} min`);
				} else {
					console.log("⚠️  Esta página no tiene contenido (bloques vacíos)");
				}
			} catch (error) {
				console.log(`❌ Error al obtener contenido: ${error.message}`);
			}

			console.log("\n");
		}

		// Resumen final
		console.log("\n" + "═".repeat(80));
		console.log("📊 RESUMEN GENERAL");
		console.log("═".repeat(80));

		const statusCount = {};
		const withContent = [];
		const withoutContent = [];

		for (const page of response.results) {
			const status = page.properties.Status?.select?.name || "Sin Status";
			statusCount[status] = (statusCount[status] || 0) + 1;

			try {
				const mdblocks = await n2m.pageToMarkdown(page.id);
				const mdString = n2m.toMarkdownString(mdblocks);
				if (mdString.parent && mdString.parent.trim().length > 0) {
					withContent.push(
						page.properties.Title?.title?.[0]?.plain_text || "Sin título",
					);
				} else {
					withoutContent.push(
						page.properties.Title?.title?.[0]?.plain_text || "Sin título",
					);
				}
			} catch (error) {
				withoutContent.push(
					page.properties.Title?.title?.[0]?.plain_text || "Sin título",
				);
			}
		}

		console.log("\n📈 Por Status:");
		for (const [status, count] of Object.entries(statusCount)) {
			const percentage = ((count / response.results.length) * 100).toFixed(1);
			console.log(`   ${status}: ${count} (${percentage}%)`);
		}

		console.log(`\n📝 Páginas con contenido: ${withContent.length}`);
		if (withContent.length > 0) {
			withContent.forEach((title) => console.log(`   ✅ ${title}`));
		}

		console.log(`\n⚠️  Páginas sin contenido: ${withoutContent.length}`);
		if (withoutContent.length > 0) {
			withoutContent.forEach((title) => console.log(`   ⚪ ${title}`));
		}

		console.log("\n" + "═".repeat(80) + "\n");
	} catch (error) {
		console.error("\n❌ ERROR:");
		console.error("   Código:", error.code);
		console.error("   Mensaje:", error.message);
		console.error("\n");
	}
}

showPageContent();
