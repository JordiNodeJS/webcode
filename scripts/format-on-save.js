#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

// Obtener el archivo que se está guardando
const filePath = process.argv[2];

if (!filePath) {
  console.error('No file path provided');
  process.exit(1);
}

// Verificar si es un archivo TypeScript/JavaScript
const ext = path.extname(filePath);
if (!['.ts', '.tsx', '.js', '.jsx'].includes(ext)) {
  process.exit(0);
}

try {
  // Ejecutar Biome format
  execSync(`pnpm biome format --write "${filePath}"`, { 
    stdio: 'pipe',
    cwd: process.cwd()
  });
  console.log(`Formatted: ${filePath}`);
} catch (error) {
  // Silenciar errores para no interrumpir el flujo de trabajo
  console.error(`Format error for ${filePath}:`, error.message);
}

