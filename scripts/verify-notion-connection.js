#!/usr/bin/env node

/**
 * Script de Verificación de Conexión con Notion
 * Prueba la conexión con la base de datos de Notion "WebCode Blog"
 */

const { readFileSync } = require("fs");
const { join } = require("path");
const { Client } = require("@notionhq/client");

// Cargar variables de entorno desde .env.local
try {
	const envPath = join(__dirname, "..", ".env.local");
	const envFile = readFileSync(envPath, "utf8");

	envFile.split("\n").forEach((line) => {
		const trimmedLine = line.trim();
		if (trimmedLine && !trimmedLine.startsWith("#")) {
			const [key, ...valueParts] = trimmedLine.split("=");
			const value = valueParts.join("=").trim();
			if (key && value) {
				process.env[key.trim()] = value;
			}
		}
	});
} catch (error) {
	// Si no existe .env.local, continuar con las variables de entorno del sistema
}

// Colores para la terminal
const colors = {
	reset: "\x1b[0m",
	red: "\x1b[31m",
	green: "\x1b[32m",
	yellow: "\x1b[33m",
	blue: "\x1b[34m",
	cyan: "\x1b[36m",
};

function log(message, color = "reset") {
	console.log(`${colors[color]}${message}${colors.reset}`);
}

async function verifyNotionConnection() {
	log("\n🔍 Iniciando verificación de conexión con Notion...\n", "cyan");

	// Paso 1: Verificar variables de entorno
	log("📋 Paso 1: Verificando variables de entorno", "blue");

	if (!process.env.NOTION_API_KEY) {
		log("❌ ERROR: NOTION_API_KEY no está configurada", "red");
		log("   Solución: Agrega NOTION_API_KEY a tu archivo .env.local", "yellow");
		process.exit(1);
	}
	log("   ✅ NOTION_API_KEY encontrada", "green");

	if (!process.env.NOTION_DATABASE_ID) {
		log("❌ ERROR: NOTION_DATABASE_ID no está configurada", "red");
		log(
			"   Solución: Agrega NOTION_DATABASE_ID a tu archivo .env.local",
			"yellow",
		);
		process.exit(1);
	}
	log("   ✅ NOTION_DATABASE_ID encontrada", "green");

	const apiKeyPrefix = process.env.NOTION_API_KEY.substring(0, 7);
	if (!apiKeyPrefix.startsWith("secret_")) {
		log('⚠️  ADVERTENCIA: El API Key no empieza con "secret_"', "yellow");
	}

	const databaseId = process.env.NOTION_DATABASE_ID;
	log(`   📊 Database ID: ${databaseId}`, "cyan");

	// Paso 2: Crear cliente de Notion
	log("\n🔌 Paso 2: Inicializando cliente de Notion", "blue");

	const notion = new Client({
		auth: process.env.NOTION_API_KEY,
	});
	log("   ✅ Cliente inicializado", "green");

	// Paso 3: Probar conexión con la base de datos
	log("\n🌐 Paso 3: Probando conexión con la base de datos", "blue");

	try {
		const response = await notion.dataSources.query({
			data_source_id: databaseId,
			page_size: 10,
		});

		log("   ✅ Conexión exitosa!", "green");
		log(
			`   📄 Total de páginas encontradas: ${response.results.length}`,
			"cyan",
		);

		if (response.results.length === 0) {
			log("\n⚠️  La base de datos está vacía", "yellow");
			log(
				'   Solución: Añade algunos posts a tu base de datos "WebCode Blog"',
				"yellow",
			);
			return;
		}

		// Paso 4: Analizar estructura de los posts
		log("\n📊 Paso 4: Analizando estructura de los posts", "blue");

		const firstPage = response.results[0];
		log(`   ✅ Primera página ID: ${firstPage.id}`, "green");
		log(`   📅 Creada: ${firstPage.created_time}`, "cyan");
		log(`   📝 Última actualización: ${firstPage.last_edited_time}`, "cyan");

		// Verificar propiedades requeridas
		log("\n🔍 Paso 5: Verificando propiedades requeridas", "blue");

		const properties = firstPage.properties;
		const requiredProps = ["title", "published", "date", "slug"];
		const missingProps = [];

		for (const prop of requiredProps) {
			if (properties[prop]) {
				log(`   ✅ ${prop}: encontrada`, "green");
			} else {
				log(`   ❌ ${prop}: NO encontrada`, "red");
				missingProps.push(prop);
			}
		}

		if (missingProps.length > 0) {
			log("\n⚠️  ADVERTENCIA: Faltan propiedades requeridas", "yellow");
			log(`   Propiedades faltantes: ${missingProps.join(", ")}`, "yellow");
			log("   El blog podría no funcionar correctamente", "yellow");
		}

		// Paso 6: Mostrar propiedades disponibles
		log("\n📋 Paso 6: Propiedades disponibles en la base de datos", "blue");

		const propNames = Object.keys(properties);
		propNames.forEach((name) => {
			const prop = properties[name];
			log(`   • ${name} (${prop.type})`, "cyan");
		});

		// Paso 7: Contar posts publicados
		log("\n📊 Paso 7: Contando posts publicados", "blue");

		const publishedResponse = await notion.dataSources.query({
			data_source_id: databaseId,
			filter: {
				property: "published",
				checkbox: {
					equals: true,
				},
			},
		});

		log(`   📝 Posts publicados: ${publishedResponse.results.length}`, "green");
		log(`   📝 Posts totales: ${response.results.length}`, "cyan");
		log(
			`   📝 Posts en borrador: ${response.results.length - publishedResponse.results.length}`,
			"yellow",
		);

		// Resumen final
		log("\n✨ RESUMEN DE VERIFICACIÓN", "green");
		log("═".repeat(50), "green");
		log("✅ Conexión con Notion: EXITOSA", "green");
		log(`✅ Base de datos accesible: SÍ`, "green");
		log(`✅ Posts encontrados: ${response.results.length}`, "green");
		log(`✅ Posts publicados: ${publishedResponse.results.length}`, "green");

		if (missingProps.length === 0) {
			log("✅ Estructura de datos: CORRECTA", "green");
		} else {
			log("⚠️  Estructura de datos: INCOMPLETA", "yellow");
		}

		log("\n🎉 Tu blog está listo para funcionar!", "green");
		log('   Ejecuta "pnpm dev" y visita http://localhost:3000/blog\n', "cyan");
	} catch (error) {
		log("   ❌ Error de conexión", "red");
		log(`\n📝 Detalles del error:`, "yellow");
		log(`   Código: ${error.code}`, "red");
		log(`   Mensaje: ${error.message}`, "red");

		if (error.code === "object_not_found") {
			log("\n💡 SOLUCIÓN:", "yellow");
			log(
				"   La base de datos NO está compartida con tu integración.",
				"yellow",
			);
			log("   \n   Pasos para solucionar:", "cyan");
			log('   1. Abre tu base de datos "WebCode Blog" en Notion', "cyan");
			log(
				"   2. Click en los tres puntos (...) en la esquina superior derecha",
				"cyan",
			);
			log('   3. Selecciona "Add connections" o "Conectar a"', "cyan");
			log("   4. Busca y añade tu integración de Notion", "cyan");
			log("   5. Confirma los permisos de lectura", "cyan");
			log("   6. Ejecuta este script nuevamente\n", "cyan");

			log(
				"   📚 Guía completa: docs/NOTION-INTEGRATION-SETUP-GUIDE.md\n",
				"blue",
			);
		} else if (error.code === "unauthorized") {
			log("\n💡 SOLUCIÓN:", "yellow");
			log("   El API Key es inválido o ha expirado.", "yellow");
			log("   \n   Pasos para solucionar:", "cyan");
			log("   1. Ve a https://www.notion.so/my-integrations", "cyan");
			log("   2. Selecciona tu integración", "cyan");
			log('   3. Regenera el "Internal Integration Token"', "cyan");
			log("   4. Actualiza NOTION_API_KEY en .env.local", "cyan");
			log("   5. Ejecuta este script nuevamente\n", "cyan");
		} else {
			log("\n💡 AYUDA:", "yellow");
			log("   Consulta la documentación completa en:", "cyan");
			log("   docs/NOTION-INTEGRATION-SETUP-GUIDE.md\n", "cyan");
		}

		process.exit(1);
	}
}

// Ejecutar verificación
verifyNotionConnection().catch((error) => {
	log("\n❌ Error inesperado:", "red");
	console.error(error);
	process.exit(1);
});
