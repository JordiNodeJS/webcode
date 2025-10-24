# **[Arte]** PLAYWRIGHT MCP - Verificación Visual Automatizada

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

### **[Completado]** **OBLIGATORIO**

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
  - **[Objetivos]** **Intención**: Por qué se ejecuta esta acción
  - **[Lista]** **Criterio de éxito**: Qué indica OK/FAIL
  - ⏱️ **Timeout apropiado**: Esperas realistas (5-10s)

### **[Error]** **PROHIBIDO**

- **[Error]** No ejecutar comandos de terminal o externos
- **[Error]** No asumir estados fuera de las herramientas MCP
- **[Error]** No usar selectores CSS frágiles o dependientes del estilo
- **[Error]** No hacer suposiciones sobre autenticación o datos
- **[Error]** No devolver informes en formato JSON (usar Markdown)

### **[Búsqueda]** **VALIDACIÓN DEL SERVIDOR**

Para confirmar que `localhost:3000` está activo:

1. Navegar a URL raíz: `mcp_playwright_browser_navigate`
2. Esperar elemento clave: `mcp_playwright_browser_wait_for`
3. Evaluar respuesta DOM: `mcp_playwright_browser_evaluate`

## **FLUJO DE TRABAJO ESTANDARIZADO**

### **FASE 1: PREPARACIÓN** **[Lanzamiento]**

```bash
# Orden de ejecución obligatorio:
1. mcp_playwright_browser_tabs      # Abrir nueva pestaña
2. mcp_playwright_browser_navigate  # Navegar a http://localhost:3000
3. mcp_playwright_browser_wait_for  # Esperar elemento principal (ej: "main", "[data-testid='app']")
```

**Criterios de validación inicial**:

- **[Completado]** Página carga sin errores 404/500
- **[Completado]** Elemento principal del layout visible
- **[Completado]** JavaScript habilitado y funcionando

### **FASE 2: DEFINICIÓN DEL ESCENARIO** **[Lista]**

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
- **[Documentación]** **Formulario contacto**: Validación + envío
- **[Móvil]** **Responsive design**: Mobile/Desktop views
- **[Diseño]** **Componentes UI**: Botones, cards, animaciones

### **FASE 3: EJECUCIÓN E INTERACCIÓN** **[Rendimiento]**

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

### **FASE 4: CAPTURA DE EVIDENCIAS** **[Fotografía]**

**Screenshots obligatorios**:

- **[Cámara]** **Estado inicial** de la página - Antes de cualquier interacción
- **[Cámara]** **Estados intermedios** en pasos críticos (formularios, navegación)
- **[Cámara]** **Estado final** después de completar el escenario
- **[Cámara]** **Estados de error** si ocurren fallos inesperados

**Nomenclatura simplificada de archivos**:

```
{escenario}-{momento}-{timestamp}.png

Ejemplos:
navegacion-servicios-inicial-20250929-143052.png
navegacion-servicios-final-20250929-143055.png
formulario-contacto-error-20250929-143125.png
responsive-mobile-20250929-143200.png
```

### **FASE 5: VALIDACIÓN Y ANÁLISIS** **[Búsqueda]**

**DOM Analysis obligatorio**:

```javascript
// Ejemplos de evaluaciones comunes:
document.title; // Título de página
document.querySelector("h1")?.textContent; // Heading principal
document.querySelectorAll(".error").length; // Errores visibles
window.getComputedStyle(el).display; // Visibilidad elementos
```

**Criterios de éxito**:

- **[Completado]** **Funcional**: La acción se completa sin errores de ejecución
- **[Completado]** **Visual**: Screenshots muestran el comportamiento esperado
- **[Completado]** **DOM**: Validaciones programáticas retornan valores correctos
- **[Completado]** **Performance**: Tiempos de respuesta dentro de límites aceptables
- **[Completado]** **Accesible**: Elementos interactivos son localizables y funcionales

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

### \***\*[Documentación]** Plantilla: Formulario de Contacto\*\*

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

### \***\*[Móvil]** Plantilla: Responsive Design\*\*

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

### **Estructura Markdown Obligatoria**

El informe final debe seguir esta estructura en Markdown:

```markdown
# 🧪 Informe de Verificación Visual - WEBCODE

\***\*[Calendario]** Fecha**: 2025-09-29 | \*\***[Tiempo]** Hora**: 14:30:52  
\***\*[Web]** Entorno**: http://localhost:3000  
\*\***[Móvil]** Viewport**: 1920x1080

---

## **[Lista]** Resumen Ejecutivo

\***\*[Objetivos]** Estado General**: OK | FAIL | WARNING  
\*\***[Completado]** Pasos Exitosos**: 8/8  
\***\*[Error]** Pasos Fallidos**: 0/8  
**⏱️ Tiempo Total\*\*: 3.2s

### Descripción

Navegación a página de servicios exitosa. Todos los elementos se cargan correctamente y la funcionalidad responde según esperado.

---

## **[Cine]** Escenario Ejecutado

\***\*[Documentación]** Nombre**: Validar navegación a página de servicios  
\*\***[Objetivos]** Objetivo**: Verificar que la navegación desde home a servicios funciona  
\***\*[Lanzamiento]** URL Inicial\*\*: http://localhost:3000/

---

## **[Análisis]** Pasos Ejecutados

### **[Completado]** Paso 1: Preparación (14:30:53)

- **Acción**: `mcp_playwright_browser_tabs`
- **Parámetros**: `{ action: "new" }`
- **Criterio**: Nueva pestaña activa disponible
- **Resultado**: OK **[Completado]**
- **Tiempo**: 245ms

### **[Completado]** Paso 2: Navegación Inicial (14:30:53)

- **Acción**: `mcp_playwright_browser_navigate`
- **Parámetros**: `{ url: "http://localhost:3000/" }`
- **Criterio**: Página carga correctamente
- **Resultado**: OK **[Completado]**
- **Tiempo**: 1,250ms

[... continuar con todos los pasos ...]

---

## **[Fotografía]** Evidencias Capturadas

### Screenshot 1: Estado Inicial

- \***\*[Carpeta]** Archivo\*\*: `inicio-estado-inicial-20250929-143052.png`
- \***\*[Tiempo]** Timestamp\*\*: 14:30:52
- \***\*[Documentación]** Descripción\*\*: Estado inicial de la página principal
- \***\*[Móvil]** Viewport\*\*: 1920x1080

### Screenshot 2: Estado Final

- \***\*[Carpeta]** Archivo\*\*: `servicios-estado-final-20250929-143055.png`
- \***\*[Tiempo]** Timestamp\*\*: 14:30:55
- \***\*[Documentación]** Descripción\*\*: Página de servicios cargada correctamente
- \***\*[Móvil]** Viewport\*\*: 1920x1080

---

## **[Búsqueda]** Validaciones DOM

### **[Completado]** Título de Página

- \***\*[Objetivos]** Expresión\*\*: `document.title`
- \***\*[Completado]** Esperado\*\*: "Servicios - WEBCODE"
- \***\*[Documentación]** Obtenido\*\*: "Servicios - WEBCODE"
- \***\*[Análisis]** Estado\*\*: OK

### **[Completado]** Heading Principal

- \***\*[Objetivos]** Expresión\*\*: `document.querySelector('h1')?.textContent`
- \***\*[Completado]** Esperado\*\*: "Servicios"
- \***\*[Documentación]** Obtenido\*\*: "Servicios"
- \***\*[Análisis]** Estado\*\*: OK

---

## **[Advertencia]** Problemas Identificados

- Sin problemas detectados **[Completado]**

---

## **[Idea]** Recomendaciones

1. \***\*[Completado]** Navegación funciona correctamente\*\* - Sin acciones requeridas
2. \***\*[Completado]** Tiempos de carga aceptables\*\* - Performance dentro de límites
3. \***\*[Idea]** Considerar loading states\*\* - Para mejorar UX durante navegación

---

## **[Crecimiento]** Métricas de Performance

- \***\*[Rendimiento]** Tiempo de Carga Inicial\*\*: 1.2s
- \***\*[Búsqueda]** Elementos Encontrados\*\*: 15
- \***\*[Error]** Errores de Consola\*\*: 0
- \***\*[Advertencia]** Warnings de Consola\*\*: 2

---

\***\*[Magia]** Informe generado automáticamente por Playwright MCP - WEBCODE v3.0\*\*
```

## **CRITERIOS DE ÉXITO Y FALLOS**

### **[Completado]** **CASO MARCADO COMO OK**

- **Todos los pasos críticos** pasan sus criterios de validación
- **Screenshots muestran** el comportamiento esperado
- **Validaciones DOM** retornan valores correctos
- **No hay errores** de JavaScript en consola (críticos)
- **Tiempo de respuesta** dentro de límites aceptables (<5s por paso)

### **[Error]** **CASO MARCADO COMO FAIL**

- **Timeout en selectores** - Elemento no encontrado en tiempo esperado
- **Errores de navegación** - 404, 500, problemas de red
- **Validaciones DOM fallan** - Valores obtenidos ≠ esperados
- **Errores JavaScript críticos** - Excepciones no manejadas
- **Screenshots muestran** estado incorrecto

### **[Advertencia]** **CASO MARCADO COMO WARNING**

- **Pasos principales OK** pero con issues menores
- **Warnings en consola** - No críticos pero deberían revisarse
- **Performance degradado** - Lento pero funcional
- **Accesibilidad mejorable** - Funciona pero no optimizado

## **MEJORES PRÁCTICAS WEBCODE**

### **[Objetivos]** **Selectores Robustos**

```javascript
// **[Completado]** PREFERIDO - Data attributes específicos
[data-testid="contact-form-submit"]
[data-component="hero-section"]
[data-page="services"]

// **[Completado]** ACEPTABLE - IDs semánticos
#main-navigation
#contact-form
#services-grid

// **[Completado]** TEXTO VISIBLE - Para navegación
button:has-text("Contactar")
a:has-text("Servicios")
h1:has-text("Bienvenido")

// **[Error]** EVITAR - Selectores frágiles
.btn-primary.large.rounded
div > div > span:nth-child(3)
[class*="bg-blue"]
```

### **[Móvil]** **Responsive Testing**

```javascript
// Viewports estándar WEBCODE
const VIEWPORTS = {
  mobile: { width: 375, height: 667 }, // iPhone SE
  tablet: { width: 768, height: 1024 }, // iPad
  desktop: { width: 1920, height: 1080 }, // Desktop HD
  wide: { width: 2560, height: 1440 } // Desktop 2K
};
```

### **[Rendimiento]** **Timeouts Inteligentes**

```javascript
// Timeouts recomendados por tipo de acción:
navigation: 10000ms    // Navegación entre páginas
interaction: 5000ms    // Clicks, fills, etc.
wait_for: 3000ms      // Espera de elementos
evaluation: 1000ms     // Evaluaciones DOM
screenshot: 2000ms     // Captura de pantalla
```

### **[Búsqueda]** **Validaciones Comunes WEBCODE**

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

### **[Fotografía]** **Gestión de Screenshots**

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

### **[Objetivos]** **Escenario: Validar Página de Servicios**

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
// Compilar toda la información en formato Markdown estándar
```

### **[Análisis]** **Informe Final Esperado**

```markdown
# 🧪 Informe de Verificación Visual - WEBCODE

\***\*[Calendario]** Fecha**: 2025-09-29 | \*\***[Tiempo]** Hora**: 14:30:52  
\***\*[Web]** Entorno**: http://localhost:3000  
\*\***[Móvil]** Viewport**: 1920x1080

---

## **[Lista]** Resumen Ejecutivo

\***\*[Objetivos]** Estado General**: OK **[Completado]**  
\*\***[Completado]** Pasos Exitosos**: 8/8  
\***\*[Error]** Pasos Fallidos**: 0/8  
**⏱️ Tiempo Total\*\*: 3.2s

### Descripción

Navegación a página de servicios exitosa. Todos los elementos se cargan correctamente y la funcionalidad responde según esperado.

---

## **[Cine]** Escenario Ejecutado

\***\*[Documentación]** Nombre**: Validar navegación a página de servicios  
\*\***[Objetivos]** Objetivo**: Verificar que la navegación desde home a servicios funciona  
\***\*[Lanzamiento]** URL Inicial\*\*: http://localhost:3000/

---

## **[Análisis]** Pasos Ejecutados

### **[Completado]** Paso 1: Preparación (14:30:53)

- **Acción**: `mcp_playwright_browser_tabs` → Nueva pestaña
- **Resultado**: OK **[Completado]** (245ms)

### **[Completado]** Paso 2: Navegación Inicial (14:30:53)

- **Acción**: `mcp_playwright_browser_navigate` → http://localhost:3000/
- **Resultado**: OK **[Completado]** (1,250ms)

### **[Completado]** Paso 3: Validación Header (14:30:54)

- **Acción**: `mcp_playwright_browser_wait_for` → [data-testid='header-nav']
- **Resultado**: OK **[Completado]** (180ms)

### **[Completado]** Paso 4: Screenshot Inicial (14:30:54)

- **Acción**: `mcp_playwright_browser_take_screenshot` → inicio-estado-inicial.png
- **Resultado**: OK **[Completado]** (320ms)

### **[Completado]** Paso 5: Click Servicios (14:30:54)

- **Acción**: `mcp_playwright_browser_click` → a:has-text('Servicios')
- **Resultado**: OK **[Completado]** (95ms)

### **[Completado]** Paso 6: Esperar Carga (14:30:55)

- **Acción**: `mcp_playwright_browser_wait_for` → h1:has-text('Servicios')
- **Resultado**: OK **[Completado]** (890ms)

### **[Completado]** Paso 7: Validación DOM (14:30:55)

- **Acción**: `mcp_playwright_browser_evaluate` → document.querySelector('h1')?.textContent
- **Resultado**: OK **[Completado]** (45ms) → "Servicios"

### **[Completado]** Paso 8: Screenshot Final (14:30:55)

- **Acción**: `mcp_playwright_browser_take_screenshot` → servicios-estado-final.png
- **Resultado**: OK **[Completado]** (280ms)

---

## **[Fotografía]** Evidencias Capturadas

### Screenshot 1: Estado Inicial **[Completado]**

- \***\*[Carpeta]** Archivo\*\*: `inicio-estado-inicial-20250929-143052.png`
- \***\*[Documentación]** Descripción\*\*: Estado inicial de la página principal

### Screenshot 2: Estado Final **[Completado]**

- \***\*[Carpeta]** Archivo\*\*: `servicios-estado-final-20250929-143055.png`
- \***\*[Documentación]** Descripción\*\*: Página de servicios cargada correctamente

---

## **[Búsqueda]** Validaciones DOM

### **[Completado]** Título de Página de Servicios

- \***\*[Objetivos]** Expresión\*\*: `document.querySelector('h1')?.textContent`
- \***\*[Completado]** Esperado\*\*: "Servicios"
- \***\*[Documentación]** Obtenido\*\*: "Servicios"
- \***\*[Análisis]** Estado\*\*: OK

---

## **[Idea]** Recomendaciones

1. \***\*[Completado]** Navegación funciona correctamente\*\* - Sin acciones requeridas
2. \***\*[Completado]** Tiempos de carga aceptables\*\* - Performance dentro de límites
3. \***\*[Idea]** Considerar loading states\*\* - Para mejorar UX durante navegación

---

\***\*[Magia]** Verificación completada exitosamente\*\*
```

## **INSTRUCCIONES FINALES**

### **[Lista]** **AL COMPLETAR LA EJECUCIÓN**

1. **Generar informe en Markdown** siguiendo la estructura especificada
2. **Usar emojis consistentes** para mejor legibilidad visual
3. **Incluir timestamps reales** en formato legible (YYYY-MM-DD HH:MM:SS)
4. **Documentar todos los screenshots** capturados con nombres descriptivos
5. **Proporcionar 3 recomendaciones** concretas y accionables
6. **Resaltar cualquier problema** encontrado con sección específica

### **[Objetivos]** **CRITERIO DE FINALIZACIÓN**

El test se considera **COMPLETADO** cuando:

- **[Completado]** **Informe Markdown** generado con estructura completa y emojis
- **[Completado]** **Mínimo 2 screenshots** capturados y documentados
- **[Completado]** **Al menos 1 validación DOM** ejecutada y reportada
- **[Completado]** **Todos los pasos** tienen resultado OK/FAIL claramente marcado
- **[Completado]** **Sección de recomendaciones** incluida con puntos accionables
- **[Completado]** **Métricas de performance** básicas reportadas

### **[Lanzamiento]** **MEJORAS DEL FORMATO MARKDOWN**

**Ventajas del nuevo formato**:

- **[Libro]** **Más legible** - Estructura visual clara con emojis y secciones
- **[Búsqueda]** **Fácil navegación** - Headers jerárquicos y tabla de contenidos implícita
- **[Análisis]** **Mejor organización** - Información agrupada lógicamente por categorías
- **[Objetivos]** **Accionable** - Recomendaciones concretas y próximos pasos claros
- **[Móvil]** **Compatible** - Se renderiza perfectamente en GitHub, VS Code y otros viewers
- **[Enlace]** **Enlazable** - Secciones pueden referenciarse directamente
- **[Lista]** **Copiable** - Fácil de copiar/pegar secciones específicas

### **[Idea]** **CONSEJOS PARA EL AGENTE**

**Al generar el informe**:

1. **[Diseño]** **Usa emojis consistentemente** - Cada tipo de acción/resultado tiene su emoji
2. **[Tiempo]** **Incluye tiempos reales** - No uses placeholders como {timestamp}
3. **[Documentación]** **Se específico en descripciones** - Evita términos genéricos
4. **[Objetivos]** **Marca claramente OK/FAIL** - Usa **[Completado]\*\***[Error]\*\* para resultados inmediatos
5. **[Fotografía]** **Documenta todos los screenshots** - Con nombres descriptivos reales
6. **[Pensamiento]** **Añade contexto** - Explica qué significa cada validación DOM

---

**Fin de instrucciones PLAYWRIGHT MCP - Versión 3.0 WEBCODE**
