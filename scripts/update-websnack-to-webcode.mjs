#!/usr/bin/env node

/**
 * Script de Actualización WebCode → WebCode
 *
 * Actualiza todas las referencias de WebCode a WebCode en el proyecto
 * para reflejar el nuevo nombre de marca
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

// Patrones de reemplazo
const REPLACEMENTS = [
	// Referencias directas
	{ from: /WebCode/g, to: "WebCode" },
	{ from: /webcode/g, to: "webcode" },
	{ from: /WEBCODE/g, to: "WEBCODE" },

	// En comentarios y documentación
	{ from: /proyecto WebCode/g, to: "proyecto WebCode" },
	{ from: /sistema de diseño WebCode/g, to: "sistema de diseño WebCode" },
	{
		from: /identidad de marca de WebCode/g,
		to: "identidad de marca de WebCode",
	},

	// En nombres de archivos y componentes
	{ from: /WebCodeLogo/g, to: "WebCodeLogo" },
	{ from: /WebCodeDev/g, to: "WebCodeDev" },
	{ from: /WEBCODE_ICONS/g, to: "WEBCODE_ICONS" },
	{ from: /WebCodeIconProps/g, to: "WebCodeIconProps" },
	{ from: /WebCodeIconName/g, to: "WebCodeIconName" },

	// En paths y URLs
	{ from: /webcode-icons/g, to: "webcode-icons" },
];

// Directorios a procesar
const DIRECTORIES_TO_PROCESS = ["src", "docs", "scripts", ".github"];

// Extensiones de archivo a procesar
const FILE_EXTENSIONS = [".ts", ".tsx", ".js", ".jsx", ".md", ".json", ".mjs"];

function updateFileContent(filePath) {
	try {
		const content = fs.readFileSync(filePath, "utf8");
		let newContent = content;
		let hasChanges = false;

		// Aplicar todas las sustituciones
		REPLACEMENTS.forEach(({ from, to }) => {
			const beforeReplace = newContent;
			newContent = newContent.replace(from, to);
			if (beforeReplace !== newContent) {
				hasChanges = true;
			}
		});

		if (hasChanges) {
			fs.writeFileSync(filePath, newContent, "utf8");
			console.log(`✅ Actualizado: ${path.relative(projectRoot, filePath)}`);
			return true;
		}

		return false;
	} catch (error) {
		console.error(`❌ Error actualizando ${filePath}:`, error.message);
		return false;
	}
}

function processDirectory(dirPath) {
	const items = fs.readdirSync(dirPath);
	let processedCount = 0;

	items.forEach((item) => {
		const fullPath = path.join(dirPath, item);
		const stat = fs.statSync(fullPath);

		if (stat.isDirectory()) {
			processedCount += processDirectory(fullPath);
		} else if (
			stat.isFile() &&
			FILE_EXTENSIONS.some((ext) => item.endsWith(ext))
		) {
			if (updateFileContent(fullPath)) {
				processedCount++;
			}
		}
	});

	return processedCount;
}

function main() {
	console.log("🚀 Actualizando referencias WebCode → WebCode...\n");

	let totalProcessed = 0;

	DIRECTORIES_TO_PROCESS.forEach((dir) => {
		const dirPath = path.join(projectRoot, dir);

		if (fs.existsSync(dirPath)) {
			console.log(`📁 Procesando directorio: ${dir}`);
			const count = processDirectory(dirPath);
			totalProcessed += count;
			console.log(`   Actualizados: ${count} archivos\n`);
		} else {
			console.log(`⚠️  Directorio no encontrado: ${dir}\n`);
		}
	});

	console.log(`🎉 Actualización completada!`);
	console.log(`📊 Total de archivos actualizados: ${totalProcessed}`);
	console.log(
		`\n💡 Todas las referencias han sido actualizadas de WebCode a WebCode`,
	);
	console.log(`   El proyecto ahora refleja la nueva identidad de marca.`);
}

main();
