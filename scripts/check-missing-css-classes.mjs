#!/usr/bin/env node

/**
 * Script para verificar clases CSS faltantes
 * 
 * Busca clases CSS que se usan en componentes pero no están definidas
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Directorios a revisar
const DIRECTORIES_TO_CHECK = ['src/components'];

// Extensiones de archivo a revisar
const FILE_EXTENSIONS = ['.tsx', '.ts'];

// Clases CSS que se usan pero pueden no estar definidas
const POTENTIALLY_MISSING_CLASSES = [
  'footer-verdoso-overlay',
  'cloud-lightning-background',
  'bg-gradient-webcode',
  'neon-theme-soft'
];

function extractCSSClasses(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const usedClasses = new Set();
    
    // Buscar clases CSS en className
    const classNameMatches = content.match(/className\s*=\s*[`"'][^`"']*[`"']/g) || [];
    classNameMatches.forEach(match => {
      // Extraer el contenido entre las comillas
      const classContent = match.match(/[`"']([^`"']*)[`"']/)?.[1] || '';
      if (classContent) {
        // Dividir por espacios y añadir cada clase
        classContent.split(/\s+/).forEach(cls => {
          if (cls.trim()) {
            usedClasses.add(cls.trim());
          }
        });
      }
    });
    
    return Array.from(usedClasses);
  } catch (error) {
    console.error(`Error leyendo ${filePath}:`, error.message);
    return [];
  }
}

function checkCSSFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const definedClasses = new Set();
    
    // Buscar definiciones de clases CSS
    const classMatches = content.match(/\.[a-zA-Z][a-zA-Z0-9_-]*\s*\{/g) || [];
    classMatches.forEach(match => {
      const className = match.slice(1, -2); // Remover . y {
      definedClasses.add(className);
    });
    
    return Array.from(definedClasses);
  } catch (error) {
    console.error(`Error leyendo CSS ${filePath}:`, error.message);
    return [];
  }
}

function processDirectory(dirPath) {
  const items = fs.readdirSync(dirPath);
  let allUsedClasses = new Set();
  let allDefinedClasses = new Set();
  
  items.forEach(item => {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      const { usedClasses, definedClasses } = processDirectory(fullPath);
      usedClasses.forEach(cls => allUsedClasses.add(cls));
      definedClasses.forEach(cls => allDefinedClasses.add(cls));
    } else if (stat.isFile()) {
      const ext = path.extname(item);
      
      if (FILE_EXTENSIONS.includes(ext)) {
        const usedClasses = extractCSSClasses(fullPath);
        usedClasses.forEach(cls => allUsedClasses.add(cls));
      } else if (ext === '.css') {
        const definedClasses = checkCSSFile(fullPath);
        definedClasses.forEach(cls => allDefinedClasses.add(cls));
      }
    }
  });
  
  return { 
    usedClasses: Array.from(allUsedClasses), 
    definedClasses: Array.from(allDefinedClasses) 
  };
}

function main() {
  console.log('🔍 Verificando clases CSS faltantes...\n');
  
  let totalUsedClasses = new Set();
  let totalDefinedClasses = new Set();
  
  DIRECTORIES_TO_CHECK.forEach(dir => {
    const dirPath = path.join(projectRoot, dir);
    
    if (fs.existsSync(dirPath)) {
      console.log(`📁 Verificando directorio: ${dir}`);
      const { usedClasses, definedClasses } = processDirectory(dirPath);
      
      usedClasses.forEach(cls => totalUsedClasses.add(cls));
      definedClasses.forEach(cls => totalDefinedClasses.add(cls));
      
      console.log(`   Clases usadas: ${usedClasses.length}`);
      console.log(`   Clases definidas: ${definedClasses.length}\n`);
    } else {
      console.log(`⚠️  Directorio no encontrado: ${dir}\n`);
    }
  });
  
  // Verificar clases potencialmente faltantes
  console.log('🔍 Verificando clases específicas:\n');
  
  POTENTIALLY_MISSING_CLASSES.forEach(className => {
    const isUsed = totalUsedClasses.has(className);
    const isDefined = totalDefinedClasses.has(className);
    
    if (isUsed && !isDefined) {
      console.log(`❌ CLASE FALTANTE: ${className} - Se usa pero no está definida`);
    } else if (isUsed && isDefined) {
      console.log(`✅ ${className} - Correctamente definida`);
    } else if (!isUsed) {
      console.log(`ℹ️  ${className} - No se usa actualmente`);
    }
  });
  
  console.log(`\n📊 Resumen:`);
  console.log(`   Total clases usadas: ${totalUsedClasses.size}`);
  console.log(`   Total clases definidas: ${totalDefinedClasses.size}`);
  
  // Buscar clases usadas pero no definidas
  const missingClasses = Array.from(totalUsedClasses).filter(cls => 
    !totalDefinedClasses.has(cls) && 
    !cls.startsWith('text-') && 
    !cls.startsWith('bg-') && 
    !cls.startsWith('border-') && 
    !cls.startsWith('p-') && 
    !cls.startsWith('m-') && 
    !cls.startsWith('w-') && 
    !cls.startsWith('h-') && 
    !cls.startsWith('flex') && 
    !cls.startsWith('grid') && 
    !cls.startsWith('items-') && 
    !cls.startsWith('justify-') && 
    !cls.startsWith('space-') && 
    !cls.startsWith('gap-') && 
    !cls.startsWith('rounded-') && 
    !cls.startsWith('shadow-') && 
    !cls.startsWith('transition-') && 
    !cls.startsWith('duration-') && 
    !cls.startsWith('ease-') && 
    !cls.startsWith('hover:') && 
    !cls.startsWith('dark:') && 
    !cls.startsWith('md:') && 
    !cls.startsWith('lg:') && 
    !cls.startsWith('xl:') && 
    !cls.startsWith('2xl:') && 
    !cls.startsWith('sm:') && 
    !cls.includes('/') && 
    !cls.includes('(') && 
    !cls.includes(')') && 
    !cls.includes('[') && 
    !cls.includes(']') && 
    !cls.includes('{') && 
    !cls.includes('}') && 
    cls.length > 2
  );
  
  if (missingClasses.length > 0) {
    console.log(`\n⚠️  Posibles clases faltantes:`);
    missingClasses.forEach(cls => console.log(`   - ${cls}`));
  } else {
    console.log(`\n✅ No se encontraron clases CSS faltantes obvias`);
  }
}

main();
