# Implementación de Datos Estructurados - Schema.org

## Problema Resuelto

Se han solucionado los errores de datos estructurados que aparecían en el reporte:
- **Falta el campo "hasMerchantReturnPolicy" (en "offers")**
- **Falta el campo "shippingDetails" (en "offers")**

## Componentes Implementados

### 1. StructuredData.tsx (Actualizado)
- ✅ Agregado soporte para tipos `Product` y `Offer`
- ✅ Incluye campos `hasMerchantReturnPolicy` y `shippingDetails`
- ✅ Configurado para España (ES) con políticas de devolución de 14 días

### 2. ServiceOfferSchema.tsx (Nuevo)
- ✅ Componente para servicios individuales con ofertas
- ✅ Incluye todos los campos requeridos por Schema.org
- ✅ Configuración específica para servicios digitales

### 3. MultipleOffersSchema.tsx (Nuevo)
- ✅ Componente para servicios con múltiples planes de precios
- ✅ Maneja arrays de ofertas con diferentes precios
- ✅ Ideal para páginas de servicios con varios planes

## Campos Implementados

### hasMerchantReturnPolicy
```json
{
  "@type": "MerchantReturnPolicy",
  "applicableCountry": "ES",
  "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
  "merchantReturnDays": 14,
  "returnMethod": "https://schema.org/ReturnByMail",
  "returnFees": "https://schema.org/FreeReturn"
}
```

### shippingDetails
```json
{
  "@type": "OfferShippingDetails",
  "shippingRate": {
    "@type": "MonetaryAmount",
    "value": "0",
    "currency": "EUR"
  },
  "deliveryTime": {
    "@type": "ShippingDeliveryTime",
    "handlingTime": {
      "@type": "QuantitativeValue",
      "minValue": 1,
      "maxValue": 3,
      "unitCode": "DAY"
    },
    "transitTime": {
      "@type": "QuantitativeValue",
      "minValue": 1,
      "maxValue": 2,
      "unitCode": "DAY"
    }
  },
  "shippingDestination": {
    "@type": "DefinedRegion",
    "addressCountry": "ES"
  }
}
```

## Uso de los Componentes

### Para un servicio individual:
```tsx
import { ServiceOfferSchema } from "@/components/seo/ServiceOfferSchema";

<ServiceOfferSchema
  service={{
    name: "Desarrollo Web Profesional",
    description: "Sitios web modernos y optimizados",
    price: "1500",
    category: "Desarrollo Web"
  }}
/>
```

### Para múltiples ofertas:
```tsx
import { MultipleOffersSchema } from "@/components/seo/MultipleOffersSchema";

<MultipleOffersSchema
  serviceName="Servicios de SEO"
  serviceDescription="Posicionamiento web profesional"
  offers={[
    {
      name: "SEO Básico",
      description: "Optimización básica",
      price: "600"
    },
    {
      name: "SEO Profesional",
      description: "Optimización avanzada",
      price: "1200"
    }
  ]}
/>
```

## Páginas Actualizadas

### ✅ src/app/(hero)/soluciones/seo/page.tsx
- Implementado `MultipleOffersSchema` con los 3 planes de SEO
- Incluye precios: €600, €1200, y personalizado

## Validación

Los esquemas implementados cumplen con:
- ✅ Schema.org Product/Offer specifications
- ✅ Google Rich Results requirements
- ✅ Campos requeridos: hasMerchantReturnPolicy, shippingDetails
- ✅ Configuración específica para España (ES)
- ✅ Políticas de devolución y envío apropiadas para servicios digitales

## Próximos Pasos

1. **Aplicar a otras páginas de servicios:**
   - `/soluciones/e-commerce`
   - `/soluciones/seo/local`
   - `/soluciones/seo/off-page`

2. **Validar con Google Rich Results Test:**
   - URL: https://search.google.com/test/rich-results
   - Verificar que no aparezcan más errores

3. **Monitorear en Search Console:**
   - Revisar mejoras en rich results
   - Verificar que los errores desaparezcan

## Beneficios SEO

- ✅ Mejor presentación en resultados de búsqueda
- ✅ Rich snippets con información de precios
- ✅ Mayor confianza del usuario con políticas claras
- ✅ Cumplimiento con estándares de Schema.org
- ✅ Mejor comprensión por parte de Google del contenido
