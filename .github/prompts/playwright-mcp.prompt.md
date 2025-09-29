# PLAYWRIGHT MCP - Verificación Visual Automatizada

## **CONTEXTO DEL PROYECTO WEBCODE**

Este prompt está diseñado específicamente para el proyecto WEBCODE - una plataforma de desarrollo web y soluciones digitales que utiliza:

- **Next.js 15** con App Router
- **React 19** + **TypeScript**
- **Tailwind CSS v4** para estilos
- **shadcn/ui** para componentes
- **Server desarrollándose en**: `http://localhost:3000`

## **OBJETIVO PRINCIPAL**

Proporcionar una guía estructurada y precisa para validar visualmente funcionalidades de la aplicación WEBCODE utilizando **exclusivamente** las herramientas del MCP Playwright. El agente debe:

1. **Ejecutar pruebas visuales automatizadas** de componentes y páginas
2. **Capturar evidencias** (screenshots, análisis DOM)
3. **Generar informes detallados** con hallazgos y recomendaciones
4. **Validar cambios** implementados en tiempo real

## **REGLAS FUNDAMENTALES**

### ✅ **OBLIGATORIO**

- **Usar únicamente herramientas MCP Playwright** con prefijo `mcp_playwright_*`
- **Funciones principales disponibles**:
  - `mcp_playwright_browser_navigate` - Navegar a URLs
  - `mcp_playwright_browser_click` - Hacer clic en elementos
  - `mcp_playwright_browser_fill` - Rellenar formularios
  - `mcp_playwright_browser_wait_for` - Esperar elementos/estados
  - `mcp_playwright_browser_take_screenshot` - Capturas de pantalla
  - `mcp_playwright_browser_evaluate` - Ejecutar JavaScript
  - `mcp_playwright_browser_tabs` - Gestión de pestañas
- **Cada acción debe incluir**:
  - 🎯 **Intención**: Por qué se ejecuta esta acción
  - 📋 **Criterio de éxito**: Qué indica OK/FAIL
  - ⏱️ **Timeout apropiado**: Esperas realistas (5-10s)

### ❌ **PROHIBIDO**

- No ejecutar comandos de terminal o externos
- No asumir estados fuera de las herramientas MCP
- No usar selectores CSS frágiles o dependientes del estilo
- No hacer suposiciones sobre autenticación o datos

### 🔍 **VALIDACIÓN DEL SERVIDOR**

Para confirmar que `localhost:3000` está activo:

1. Navegar a URL raíz: `mcp_playwright_browser_navigate`
2. Esperar elemento clave: `mcp_playwright_browser_wait_for`
3. Evaluar respuesta DOM: `mcp_playwright_browser_evaluate`

## **FLUJO DE TRABAJO ESTANDARIZADO**

### **FASE 1: PREPARACIÓN** 🚀

```bash
# Orden de ejecución obligatorio:
1. mcp_playwright_browser_tabs      # Abrir nueva pestaña
2. mcp_playwright_browser_navigate  # Navegar a http://localhost:3000
3. mcp_playwright_browser_wait_for  # Esperar elemento principal (ej: "main", "[data-testid='app']")
```

**Criterios de validación inicial**:

- ✅ Página carga sin errores 404/500
- ✅ Elemento principal del layout visible
- ✅ JavaScript habilitado y funcionando

### **FASE 2: DEFINICIÓN DEL ESCENARIO** 📋

**Estructura obligatoria del escenario**:

```json
{
  "nombre": "string descriptivo",
  "objetivo": "qué se quiere validar",
  "precondiciones": ["estado inicial requerido"],
  "pasos": ["acción 1", "acción 2", "..."],
  "criterios_exito": ["condición 1", "condición 2"]
}
```

**Ejemplos de escenarios típicos WEBCODE**:

- 🏠 **Navegación principal**: Header → Servicios → Contacto
- 📝 **Formulario contacto**: Validación + envío
- 📱 **Responsive design**: Mobile/Desktop views
- 🎨 **Componentes UI**: Botones, cards, animaciones

### **FASE 3: EJECUCIÓN E INTERACCIÓN** ⚡

Por cada paso del escenario:

```typescript
// Patrón obligatorio:
1. Acción MCP → mcp_playwright_browser_[accion]
2. Espera → mcp_playwright_browser_wait_for
3. Verificación → mcp_playwright_browser_evaluate
4. Captura (si es paso crítico) → mcp_playwright_browser_take_screenshot
```

**Selectores recomendados** (orden de prioridad):

1. `[data-testid="nombre"]` ← **PREFERIDO**
2. `#id-elemento` ← Si existe ID semántico
3. `button:has-text("Texto")` ← Texto visible
4. `.clase-especifica` ← Como último recurso

### **FASE 4: CAPTURA DE EVIDENCIAS** 📸

**Screenshots obligatorios**:

- 📷 **Estado inicial** de la página
- 📷 **Estado final** después de interacciones
- 📷 **Estados de error** si ocurren fallos

**Nomenclatura de archivos**:

```
{escenario}-{paso}-{timestamp}.png

Ejemplos:
navegacion-header-servicios-20250929-143052.png
formulario-contacto-validation-20250929-143125.png
responsive-mobile-view-20250929-143200.png
```

### **FASE 5: VALIDACIÓN Y ANÁLISIS** 🔍

**DOM Analysis obligatorio**:

```javascript
// Ejemplos de evaluaciones comunes:
document.title; // Título de página
document.querySelector("h1")?.textContent; // Heading principal
document.querySelectorAll(".error").length; // Errores visibles
window.getComputedStyle(el).display; // Visibilidad elementos
```

**Criterios de éxito**:

- ✅ **Funcional**: La acción se completa sin errores
- ✅ **Visual**: El resultado es el esperado en screenshot
- ✅ **Accesible**: Elementos focusables y con texto alt
- ✅ **Responsive**: Funciona en diferentes viewports

## **PLANTILLAS DE ESCENARIOS WEBCODE**

### **🏠 Plantilla: Navegación Principal**

```json
{
  "nombre": "Verificar header y navegación principal",
  "url_inicial": "http://localhost:3000/",
  "objetivo": "Validar que la navegación funciona correctamente",
  "pasos": [
    {
      "orden": 1,
      "accion": "mcp_playwright_browser_navigate",
      "parametros": { "url": "http://localhost:3000/" },
      "criterio": "Header nav visible",
      "selector_espera": "[data-testid='header-nav']"
    },
    {
      "orden": 2,
      "accion": "mcp_playwright_browser_click",
      "parametros": { "selector": "a:has-text('Servicios')" },
      "criterio": "URL cambia a /services",
      "validacion": "window.location.pathname === '/services'"
    },
    {
      "orden": 3,
      "accion": "mcp_playwright_browser_wait_for",
      "parametros": { "selector": "h1:has-text('Servicios')" },
      "criterio": "H1 con título 'Servicios' visible"
    },
    {
      "orden": 4,
      "accion": "mcp_playwright_browser_take_screenshot",
      "parametros": { "filename": "navegacion-servicios-{timestamp}.png" },
      "criterio": "Screenshot capturado correctamente"
    }
  ]
}
```

### **📝 Plantilla: Formulario de Contacto**

```json
{
  "nombre": "Validar formulario de contacto",
  "url_inicial": "http://localhost:3000/contact",
  "objetivo": "Verificar validación y envío de formulario",
  "pasos": [
    {
      "orden": 1,
      "accion": "mcp_playwright_browser_fill",
      "parametros": {
        "selector": "[data-testid='name-input']",
        "value": "Juan Pérez"
      },
      "criterio": "Nombre se rellena correctamente"
    },
    {
      "orden": 2,
      "accion": "mcp_playwright_browser_fill",
      "parametros": {
        "selector": "[data-testid='email-input']",
        "value": "juan@example.com"
      },
      "criterio": "Email se rellena correctamente"
    },
    {
      "orden": 3,
      "accion": "mcp_playwright_browser_click",
      "parametros": { "selector": "[data-testid='submit-button']" },
      "criterio": "Botón envío clickeable"
    },
    {
      "orden": 4,
      "accion": "mcp_playwright_browser_wait_for",
      "parametros": { "selector": "[data-testid='success-message']" },
      "criterio": "Mensaje de éxito aparece"
    }
  ]
}
```

### **📱 Plantilla: Responsive Design**

```json
{
  "nombre": "Validar diseño responsive",
  "url_inicial": "http://localhost:3000/",
  "objetivo": "Verificar adaptación mobile/desktop",
  "pasos": [
    {
      "orden": 1,
      "accion": "mcp_playwright_browser_set_viewport",
      "parametros": { "width": 375, "height": 667 },
      "criterio": "Vista mobile configurada"
    },
    {
      "orden": 2,
      "accion": "mcp_playwright_browser_take_screenshot",
      "parametros": { "filename": "mobile-view-{timestamp}.png" },
      "criterio": "Screenshot mobile capturado"
    },
    {
      "orden": 3,
      "accion": "mcp_playwright_browser_set_viewport",
      "parametros": { "width": 1920, "height": 1080 },
      "criterio": "Vista desktop configurada"
    },
    {
      "orden": 4,
      "accion": "mcp_playwright_browser_take_screenshot",
      "parametros": { "filename": "desktop-view-{timestamp}.png" },
      "criterio": "Screenshot desktop capturado"
    }
  ]
}
```

## **FORMATO DE INFORME ESTANDARIZADO**

### **Estructura JSON Obligatoria**

```json
{
  "timestamp": "2025-09-29T14:30:52Z",
  "proyecto": "WEBCODE",
  "version": "1.0.0",
  "entorno": "http://localhost:3000",

  "resumen": {
    "estado_general": "OK | FAIL | WARNING",
    "pasos_exitosos": 4,
    "pasos_fallidos": 0,
    "tiempo_ejecucion": "2.3s",
    "descripcion": "Breve párrafo con estado general"
  },

  "escenario": {
    "nombre": "string descriptivo",
    "objetivo": "qué se validó",
    "url_inicial": "http://localhost:3000/ruta",
    "viewport": { "width": 1920, "height": 1080 }
  },

  "pasos_ejecutados": [
    {
      "orden": 1,
      "timestamp": "14:30:53",
      "accion_mcp": "mcp_playwright_browser_navigate",
      "parametros": { "url": "http://localhost:3000/" },
      "criterio": "Página carga correctamente",
      "resultado": "OK | FAIL",
      "tiempo_ms": 1250,
      "error": "mensaje si FAIL"
    }
  ],

  "evidencias": [
    {
      "tipo": "screenshot",
      "archivo": "navegacion-servicios-20250929-143052.png",
      "timestamp": "14:30:52",
      "descripcion": "Estado final después de navegación",
      "viewport": "1920x1080"
    }
  ],

  "validaciones_dom": [
    {
      "descripcion": "Verificar título de página",
      "expresion": "document.title",
      "esperado": "Servicios - WEBCODE",
      "obtenido": "Servicios - WEBCODE",
      "status": "OK | FAIL"
    }
  ],

  "problemas": [
    "Lista de problemas encontrados (si los hay)",
    "Errores de carga o funcionalidad"
  ],

  "recomendaciones": [
    "Lista de mejoras sugeridas",
    "Optimizaciones de rendimiento",
    "Correcciones de accesibilidad"
  ],

  "metricas": {
    "tiempo_carga_inicial": "1.2s",
    "elementos_encontrados": 15,
    "errores_consola": 0,
    "warnings_consola": 2
  }
}
```

## **CRITERIOS DE ÉXITO Y FALLOS**

### ✅ **CASO MARCADO COMO OK**

- **Todos los pasos críticos** pasan sus criterios de validación
- **Screenshots muestran** el comportamiento esperado
- **Validaciones DOM** retornan valores correctos
- **No hay errores** de JavaScript en consola (críticos)
- **Tiempo de respuesta** dentro de límites aceptables (<5s por paso)

### ❌ **CASO MARCADO COMO FAIL**

- **Timeout en selectores** - Elemento no encontrado en tiempo esperado
- **Errores de navegación** - 404, 500, problemas de red
- **Validaciones DOM fallan** - Valores obtenidos ≠ esperados
- **Errores JavaScript críticos** - Excepciones no manejadas
- **Screenshots muestran** estado incorrecto

### ⚠️ **CASO MARCADO COMO WARNING**

- **Pasos principales OK** pero con issues menores
- **Warnings en consola** - No críticos pero deberían revisarse
- **Performance degradado** - Lento pero funcional
- **Accesibilidad mejorable** - Funciona pero no optimizado

## **MEJORES PRÁCTICAS WEBCODE**

### 🎯 **Selectores Robustos**

```javascript
// ✅ PREFERIDO - Data attributes específicos
[data-testid="contact-form-submit"]
[data-component="hero-section"]
[data-page="services"]

// ✅ ACEPTABLE - IDs semánticos
#main-navigation
#contact-form
#services-grid

// ✅ TEXTO VISIBLE - Para navegación
button:has-text("Contactar")
a:has-text("Servicios")
h1:has-text("Bienvenido")

// ❌ EVITAR - Selectores frágiles
.btn-primary.large.rounded
div > div > span:nth-child(3)
[class*="bg-blue"]
```

### 📱 **Responsive Testing**

```javascript
// Viewports estándar WEBCODE
const VIEWPORTS = {
  mobile: { width: 375, height: 667 }, // iPhone SE
  tablet: { width: 768, height: 1024 }, // iPad
  desktop: { width: 1920, height: 1080 }, // Desktop HD
  wide: { width: 2560, height: 1440 } // Desktop 2K
};
```

### ⚡ **Timeouts Inteligentes**

```javascript
// Timeouts recomendados por tipo de acción:
navigation: 10000ms    // Navegación entre páginas
interaction: 5000ms    // Clicks, fills, etc.
wait_for: 3000ms      // Espera de elementos
evaluation: 1000ms     // Evaluaciones DOM
screenshot: 2000ms     // Captura de pantalla
```

### 🔍 **Validaciones Comunes WEBCODE**

```javascript
// Validaciones estándar que aplicar:
1. document.title                           // SEO - Título correcto
2. document.querySelector('h1')?.textContent // Heading principal
3. document.querySelectorAll('[alt=""]').length // Imágenes sin alt
4. document.querySelectorAll('.error').length   // Errores visibles
5. window.performance.timing.loadEventEnd      // Performance
6. document.querySelector('[data-testid]')     // Testability
```

### 🛠️ **Datos de Prueba**

```javascript
// Usar datos consistentes para testing:
const TEST_DATA = {
  usuario: {
    nombre: "Test User WEBCODE",
    email: "test@webcode-testing.local",
    telefono: "+34 600 123 456"
  },
  empresa: {
    nombre: "Test Company Barcelona",
    sector: "Tecnología",
    ubicacion: "Barcelona, España"
  }
};
```

### 📸 **Gestión de Screenshots**

```bash
# Organización por carpetas:
test-results/
├── screenshots/
│   ├── navegacion/
│   ├── formularios/
│   ├── responsive/
│   └── errores/
└── reports/
    ├── daily/
    └── by-feature/
```

## **EJEMPLO COMPLETO DE EJECUCIÓN**

### 🎯 **Escenario: Validar Página de Servicios**

```javascript
// PASO A PASO - Narrativa que el agente DEBE seguir:

// 1. PREPARACIÓN
await mcp_playwright_browser_tabs({ action: "new" });
// ↳ Intención: Abrir nueva pestaña limpia
// ↳ Criterio: Nueva pestaña activa disponible

// 2. NAVEGACIÓN INICIAL
await mcp_playwright_browser_navigate({ url: "http://localhost:3000/" });
// ↳ Intención: Cargar página principal de WEBCODE
// ↳ Criterio: Respuesta 200, página carga sin errores

// 3. VALIDACIÓN DE CARGA
await mcp_playwright_browser_wait_for({
  selector: "[data-testid='header-nav']",
  timeout: 5000
});
// ↳ Intención: Confirmar que el header principal está visible
// ↳ Criterio: Navegación principal renderizada correctamente

// 4. CAPTURA ESTADO INICIAL
await mcp_playwright_browser_take_screenshot({
  filename: "inicio-estado-inicial-{timestamp}.png"
});
// ↳ Intención: Documentar estado base antes de interacciones
// ↳ Criterio: Screenshot guardado exitosamente

// 5. NAVEGACIÓN A SERVICIOS
await mcp_playwright_browser_click({
  selector: "a:has-text('Servicios')"
});
// ↳ Intención: Navegar a la página de servicios
// ↳ Criterio: Click ejecutado, navegación iniciada

// 6. ESPERAR CARGA DE SERVICIOS
await mcp_playwright_browser_wait_for({
  selector: "h1:has-text('Servicios')",
  timeout: 5000
});
// ↳ Intención: Confirmar que página de servicios cargó
// ↳ Criterio: H1 con título "Servicios" visible

// 7. VALIDACIÓN DOM
const title = await mcp_playwright_browser_evaluate({
  expression: "document.querySelector('h1')?.textContent"
});
// ↳ Intención: Verificar programáticamente el título
// ↳ Criterio: title === "Servicios" o contiene "Servicios"

// 8. VALIDACIÓN URL
const currentUrl = await mcp_playwright_browser_evaluate({
  expression: "window.location.pathname"
});
// ↳ Intención: Confirmar URL correcta después de navegación
// ↳ Criterio: currentUrl.includes("/services")

// 9. CAPTURA ESTADO FINAL
await mcp_playwright_browser_take_screenshot({
  filename: "servicios-estado-final-{timestamp}.png"
});
// ↳ Intención: Documentar resultado final de la navegación
// ↳ Criterio: Screenshot con página de servicios completa

// 10. GENERAR INFORME
// Compilar toda la información en formato JSON estándar
```

### 📊 **Informe Final Esperado**

```json
{
  "timestamp": "2025-09-29T14:30:52Z",
  "proyecto": "WEBCODE",
  "entorno": "http://localhost:3000",
  "resumen": {
    "estado_general": "OK",
    "pasos_exitosos": 8,
    "pasos_fallidos": 0,
    "tiempo_ejecucion": "3.2s",
    "descripcion": "Navegación a página de servicios exitosa. Todos los elementos se cargan correctamente y la funcionalidad responde según esperado."
  },
  "escenario": {
    "nombre": "Validar navegación a página de servicios",
    "objetivo": "Verificar que la navegación desde home a servicios funciona",
    "url_inicial": "http://localhost:3000/"
  },
  "pasos_ejecutados": [...], // Todos los pasos detallados
  "evidencias": [
    {
      "tipo": "screenshot",
      "archivo": "inicio-estado-inicial-20250929-143052.png",
      "descripcion": "Estado inicial de la página principal"
    },
    {
      "tipo": "screenshot",
      "archivo": "servicios-estado-final-20250929-143055.png",
      "descripcion": "Página de servicios cargada correctamente"
    }
  ],
  "validaciones_dom": [
    {
      "descripcion": "Título de página de servicios",
      "expresion": "document.querySelector('h1')?.textContent",
      "esperado": "Servicios",
      "obtenido": "Servicios",
      "status": "OK"
    }
  ],
  "recomendaciones": [
    "✅ Navegación funciona correctamente",
    "✅ Tiempos de carga aceptables",
    "💡 Considerar añadir loading states para mejor UX"
  ]
}
```

## **INSTRUCCIONES FINALES**

### 📋 **AL COMPLETAR LA EJECUCIÓN**

1. **Retornar únicamente** el objeto JSON del informe (formato especificado)
2. **Añadir 3 recomendaciones** prioritarias en texto plano después del JSON
3. **Usar nombres exactos** de las claves del template
4. **Incluir timestamps** reales en formato ISO 8601
5. **Documentar cualquier desviación** del flujo esperado

### 🎯 **CRITERIO DE FINALIZACIÓN**

El test se considera **COMPLETADO** cuando:

- ✅ Informe JSON generado con estructura completa
- ✅ Al menos 2 screenshots capturados
- ✅ Mínimo 1 validación DOM ejecutada
- ✅ Todos los pasos tienen resultado OK/FAIL
- ✅ Recomendaciones incluidas

---

**Fin de instrucciones PLAYWRIGHT MCP - Versión 2.0 WEBCODE**
