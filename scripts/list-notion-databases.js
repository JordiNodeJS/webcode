#!/usr/bin/env node

/**
 * Script para listar todas las bases de datos accesibles con tu integración
 * Esto te ayudará a encontrar el ID correcto de "WebCode Blog"
 */

const { readFileSync } = require('fs');
const { join } = require('path');
const { Client } = require('@notionhq/client');

// Cargar variables de entorno
try {
  const envPath = join(__dirname, '..', '.env.local');
  const envFile = readFileSync(envPath, 'utf8');
  
  envFile.split('\n').forEach(line => {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const [key, ...valueParts] = trimmedLine.split('=');
      const value = valueParts.join('=').trim();
      if (key && value) {
        process.env[key.trim()] = value;
      }
    }
  });
} catch (error) {
  console.error('Error cargando .env.local:', error.message);
  process.exit(1);
}

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function listDatabases() {
  log('\n🔍 Buscando todas las bases de datos accesibles...\n', 'cyan');

  if (!process.env.NOTION_API_KEY) {
    log('❌ NOTION_API_KEY no encontrada', 'yellow');
    process.exit(1);
  }

  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  });

  try {
    log('📊 Consultando Notion API...', 'blue');
    
    const response = await notion.search({
      filter: {
        property: 'object',
        value: 'data_source',
      },
      sort: {
        direction: 'descending',
        timestamp: 'last_edited_time',
      },
    });

    if (response.results.length === 0) {
      log('\n⚠️  No se encontraron bases de datos compartidas', 'yellow');
      log('   Asegúrate de haber compartido tu base de datos con la integración\n', 'yellow');
      return;
    }

    log(`\n✅ Se encontraron ${response.results.length} base(s) de datos:\n`, 'green');
    log('═'.repeat(80), 'blue');

    response.results.forEach((db, index) => {
      const title = db.title?.[0]?.plain_text || 'Sin título';
      const id = db.id;
      const lastEdited = new Date(db.last_edited_time).toLocaleString('es-ES');
      
      log(`\n📚 Base de datos ${index + 1}: ${title}`, 'cyan');
      log(`   ID: ${id}`, 'green');
      log(`   Última edición: ${lastEdited}`, 'blue');
      
      // Verificar si es la base de datos actual
      const currentId = process.env.NOTION_DATABASE_ID?.replace(/-/g, '');
      const thisId = id.replace(/-/g, '');
      
      if (currentId === thisId) {
        log('   ⭐ Esta es tu base de datos configurada actualmente', 'yellow');
      }
      
      // Mostrar si es "WebCode Blog"
      if (title.toLowerCase().includes('webcode') || title.toLowerCase().includes('blog')) {
        log('   🎯 Esta podría ser tu base de datos "WebCode Blog"', 'cyan');
      }

      log(`   Número de propiedades: ${Object.keys(db.properties || {}).length}`, 'blue');
    });

    log('\n═'.repeat(80), 'blue');
    log('\n💡 Para usar una base de datos:', 'cyan');
    log('   1. Copia el ID de la base de datos que quieres usar', 'cyan');
    log('   2. Actualiza NOTION_DATABASE_ID en .env.local', 'cyan');
    log('   3. Ejecuta: pnpm notion:verify\n', 'cyan');

  } catch (error) {
    log('\n❌ Error al buscar bases de datos:', 'yellow');
    log(`   Código: ${error.code}`, 'yellow');
    log(`   Mensaje: ${error.message}`, 'yellow');
    
    if (error.code === 'unauthorized') {
      log('\n💡 Tu API Key parece inválida', 'cyan');
      log('   Ve a https://www.notion.so/my-integrations y genera una nueva\n', 'cyan');
    }
  }
}

listDatabases().catch((error) => {
  console.error('\n❌ Error inesperado:', error);
  process.exit(1);
});
