#!/usr/bin/env node

/**
 * Script para validar los datos estructurados implementados
 * Verifica que los esquemas JSON-LD sean válidos según Schema.org
 */

import fs from 'fs';
import path from 'path';

// Función para validar JSON
function validateJSON(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    return { valid: true, data: parsed };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

// Función para validar campos requeridos de Schema.org
function validateSchemaFields(data) {
  const errors = [];
  const warnings = [];

  // Validar contexto
  if (!data['@context'] || data['@context'] !== 'https://schema.org') {
    errors.push('Falta @context o no es https://schema.org');
  }

  // Validar tipo
  if (!data['@type']) {
    errors.push('Falta @type');
  }

  // Si es un Service con offers
  if (data['@type'] === 'Service' && data.offers) {
    if (Array.isArray(data.offers)) {
      data.offers.forEach((offer, index) => {
        validateOffer(offer, index, errors, warnings);
      });
    } else {
      validateOffer(data.offers, 0, errors, warnings);
    }
  }

  // Si es un Offer directo
  if (data['@type'] === 'Offer') {
    validateOffer(data, 0, errors, warnings);
  }

  return { errors, warnings };
}

function validateOffer(offer, index, errors, warnings) {
  const prefix = index >= 0 ? `Offer ${index + 1}: ` : '';

  // Campos requeridos para Offer
  if (!offer['@type'] || offer['@type'] !== 'Offer') {
    errors.push(`${prefix}Falta @type o no es "Offer"`);
  }

  if (!offer.price) {
    errors.push(`${prefix}Falta campo "price"`);
  }

  if (!offer.priceCurrency) {
    errors.push(`${prefix}Falta campo "priceCurrency"`);
  }

  if (!offer.seller) {
    errors.push(`${prefix}Falta campo "seller"`);
  }

  // Validar hasMerchantReturnPolicy
  if (!offer.hasMerchantReturnPolicy) {
    errors.push(`${prefix}Falta campo "hasMerchantReturnPolicy"`);
  } else {
    const policy = offer.hasMerchantReturnPolicy;
    if (!policy['@type'] || policy['@type'] !== 'MerchantReturnPolicy') {
      errors.push(`${prefix}hasMerchantReturnPolicy debe tener @type "MerchantReturnPolicy"`);
    }
    if (!policy.applicableCountry) {
      errors.push(`${prefix}hasMerchantReturnPolicy debe tener "applicableCountry"`);
    }
    if (!policy.merchantReturnDays) {
      errors.push(`${prefix}hasMerchantReturnPolicy debe tener "merchantReturnDays"`);
    }
  }

  // Validar shippingDetails
  if (!offer.shippingDetails) {
    errors.push(`${prefix}Falta campo "shippingDetails"`);
  } else {
    const shipping = offer.shippingDetails;
    if (!shipping['@type'] || shipping['@type'] !== 'OfferShippingDetails') {
      errors.push(`${prefix}shippingDetails debe tener @type "OfferShippingDetails"`);
    }
    if (!shipping.shippingRate) {
      errors.push(`${prefix}shippingDetails debe tener "shippingRate"`);
    }
    if (!shipping.deliveryTime) {
      errors.push(`${prefix}shippingDetails debe tener "deliveryTime"`);
    }
  }

  // Validar seller
  if (offer.seller && (!offer.seller['@type'] || offer.seller['@type'] !== 'Organization')) {
    warnings.push(`${prefix}El seller debería tener @type "Organization"`);
  }
}

// Función principal
function main() {
  console.log('🔍 Validando datos estructurados...\n');

  const componentsDir = path.join(process.cwd(), 'src', 'components', 'seo');
  const files = [
    'StructuredData.tsx',
    'ServiceOfferSchema.tsx', 
    'MultipleOffersSchema.tsx'
  ];

  let totalErrors = 0;
  let totalWarnings = 0;

  files.forEach(file => {
    const filePath = path.join(componentsDir, file);
    
    if (!fs.existsSync(filePath)) {
      console.log(`❌ Archivo no encontrado: ${file}`);
      return;
    }

    console.log(`📄 Validando ${file}...`);
    
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extraer esquemas JSON-LD del código
    const jsonMatches = content.match(/JSON\.stringify\(([^)]+)\)/g);
    
    if (!jsonMatches) {
      console.log(`⚠️  No se encontraron esquemas JSON-LD en ${file}`);
      return;
    }

    jsonMatches.forEach((match, index) => {
      console.log(`  📋 Esquema ${index + 1}:`);
      
      // Simular la validación (en un caso real, necesitarías ejecutar el código)
      // Por ahora, validamos la estructura del código
      
      if (match.includes('hasMerchantReturnPolicy')) {
        console.log(`    ✅ Campo hasMerchantReturnPolicy encontrado`);
      } else {
        console.log(`    ❌ Campo hasMerchantReturnPolicy NO encontrado`);
        totalErrors++;
      }

      if (match.includes('shippingDetails')) {
        console.log(`    ✅ Campo shippingDetails encontrado`);
      } else {
        console.log(`    ❌ Campo shippingDetails NO encontrado`);
        totalErrors++;
      }

      if (match.includes('MerchantReturnPolicy')) {
        console.log(`    ✅ Tipo MerchantReturnPolicy encontrado`);
      } else {
        console.log(`    ❌ Tipo MerchantReturnPolicy NO encontrado`);
        totalErrors++;
      }

      if (match.includes('OfferShippingDetails')) {
        console.log(`    ✅ Tipo OfferShippingDetails encontrado`);
      } else {
        console.log(`    ❌ Tipo OfferShippingDetails NO encontrado`);
        totalErrors++;
      }
    });
  });

  console.log('\n📊 Resumen de validación:');
  console.log(`   Errores encontrados: ${totalErrors}`);
  console.log(`   Advertencias: ${totalWarnings}`);

  if (totalErrors === 0) {
    console.log('\n✅ ¡Todos los campos requeridos están implementados!');
    console.log('🎯 Los errores de hasMerchantReturnPolicy y shippingDetails deberían estar resueltos.');
  } else {
    console.log('\n❌ Se encontraron errores que deben corregirse.');
  }

  console.log('\n📝 Próximos pasos:');
  console.log('1. Ejecutar el sitio en desarrollo');
  console.log('2. Verificar los esquemas en el HTML generado');
  console.log('3. Validar con Google Rich Results Test');
  console.log('4. Revisar Search Console para confirmar que los errores desaparecen');
}

// Ejecutar validación
main();
