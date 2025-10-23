# Prompt: Herramientas de Desarrollo - WebCode

## **Contexto y Objetivo**

Prompt consolidado para herramientas de desarrollo, testing, debugging y automatización en el proyecto WebCode usando MCPs (Model Context Protocols) y herramientas modernas de desarrollo.

---

## **1. PLAYWRIGHT - Testing E2E y Verificación Visual**

### **Flujo de Trabajo Estándar**

1. **Asume que el servidor de desarrollo está en marcha**
2. **Utiliza el MCP de Playwright** para verificar cambios implementados
3. **Toma screenshots** para validar el resultado visualmente
4. **Analiza la imagen tomada** para confirmar que refleja los cambios esperados
5. **Si no coincide**: ajusta el código y repite el proceso

### **Comandos con Playwright MCP**

```typescript
// Navegar y tomar screenshot
await page.goto('http://localhost:3000/services');
await page.screenshot({ path: 'screenshots/services-page.png', fullPage: true });

// Testing de interacciones
await page.click('button[data-testid="cta-button"]');
await expect(page.locator('.modal')).toBeVisible();

// Testing de formularios
await page.fill('input[name="email"]', 'test@example.com');
await page.click('button[type="submit"]');
await expect(page.locator('.success-message')).toBeVisible();
```

### **Verificación de Accesibilidad**

```typescript
// Usar axe-core para auditoría de accesibilidad
const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
expect(accessibilityScanResults.violations).toEqual([]);
```

---

## **2. CHROME DEVTOOLS - Debugging y Performance**

### **Uso del MCP Chrome DevTools**

El MCP Chrome DevTools permite interactuar programáticamente con páginas web para:

- **Network monitoring**: Analizar requests, respuestas, tiempos de carga
- **Performance profiling**: CPU throttling, network throttling, Core Web Vitals
- **Console messages**: Capturar errores, warnings y logs
- **DOM inspection**: Tomar snapshots, interactuar con elementos

### **Casos de Uso Comunes**

#### **A) Performance Analysis**

```typescript
// Iniciar trace de performance
await mcp_chrome-devtool_performance_start_trace({
  reload: true,
  autoStop: true
});

// Obtener insights de performance
const insights = await mcp_chrome-devtool_performance_analyze_insight({
  insightName: "LCPBreakdown"
});
```

#### **B) Network Debugging**

```typescript
// Listar todos los requests
const requests = await mcp_chrome-devtool_list_network_requests({
  resourceTypes: ["fetch", "xhr", "document"]
});

// Inspeccionar request específico
const request = await mcp_chrome-devtool_get_network_request({
  url: "https://api.webcode.es/services"
});
```

#### **C) Emulación de Condiciones**

```typescript
// Emular CPU throttling (dispositivos móviles)
await mcp_chrome-devtool_emulate_cpu({ throttlingRate: 4 });

// Emular red lenta
await mcp_chrome-devtool_emulate_network({ throttlingOption: "Slow 3G" });
```

---

## **3. CONTEXT7 MCP - Mejora de Patrones y Documentación**

### **Objetivo**

Utilizar el MCP Context7 para:

- **Documentación actualizada** de librerías (Next.js, React, Tailwind, etc.)
- **Detección mejorada de patrones** en proyectos Next.js, React y Tailwind
- **Generación de código optimizada** basada en mejores prácticas
- **Análisis de contexto** para sugerencias más precisas

### **Flujo de Trabajo**

```typescript
// 1. Resolver librería
const libraryInfo = await mcp_context7_resolve-library-id({
  libraryName: "next.js"
});

// 2. Obtener documentación específica
const docs = await mcp_context7_get-library-docs({
  context7CompatibleLibraryID: "/vercel/next.js",
  topic: "app-router",
  tokens: 5000
});
```

### **Casos de Uso**

- **Análisis de arquitectura** de componentes
- **Optimización de patrones** de estado y data fetching
- **Mejores prácticas de performance** (RSC, streaming, etc.)
- **Refactoring inteligente** con patrones modernos
- **Validación de implementaciones** contra documentación oficial

---

## **4. SHADCN MCP - Gestión de Componentes**

### **Objetivo**

Automatizar la gestión de componentes shadcn/ui con el MCP shadcn:

- **Listar componentes disponibles**
- **Obtener código fuente** de componentes y bloques
- **Ver demos** de uso de componentes
- **Explorar blocks** (componentes complejos pre-construidos)

### **Comandos Principales**

```typescript
// Listar todos los componentes
const components = await mcp_shadcn_list_components();

// Obtener código de un componente
const buttonCode = await mcp_shadcn_get_component({
  componentName: "button"
});

// Ver demo de uso
const demo = await mcp_shadcn_get_component_demo({
  componentName: "accordion"
});

// Obtener un block complejo
const dashboard = await mcp_shadcn_get_block({
  blockName: "dashboard-01",
  includeComponents: true
});
```

---

## **5. MEJORES PRÁCTICAS**

### **Testing con Playwright**

- ✅ Usar **data-testid** para selectores estables
- ✅ Implementar **Page Object Pattern** para organización
- ✅ Configurar **retry logic** para tests flaky
- ✅ Capturar **screenshots** en caso de fallo
- ✅ Probar en **múltiples viewports** (mobile, tablet, desktop)

### **Debugging con DevTools**

- ✅ Monitorear **Core Web Vitals** (LCP, FID, CLS)
- ✅ Identificar **render-blocking resources**
- ✅ Analizar **bundle size** y código no utilizado
- ✅ Verificar **caché** y estrategias de caché
- ✅ Detectar **memory leaks** con heap snapshots

### **Uso de Context7**

- ✅ Consultar **antes de implementar** patrones complejos
- ✅ Validar **versiones de librerías** para compatibilidad
- ✅ Usar **topics específicos** para documentación relevante
- ✅ Comparar **múltiples enfoques** para elegir el mejor

### **Gestión de Componentes**

- ✅ Revisar **metadata** antes de instalar componentes
- ✅ Explorar **demos** para entender uso correcto
- ✅ Usar **blocks** como punto de partida para funcionalidades complejas
- ✅ Mantener **componentes UI** sin modificar (carpeta ui/)

---

## **6. TROUBLESHOOTING**

### **Playwright no conecta**

```bash
# Verificar que el servidor está corriendo
pnpm dev

# En otra terminal, ejecutar tests
pnpm test:e2e
```

### **DevTools MCP no responde**

```bash
# Verificar que Chrome está abierto
# Reiniciar el MCP server si es necesario
```

### **Context7 sin resultados**

- Verificar **nombre exacto** de la librería
- Probar con **topics más específicos**
- Revisar **límite de tokens** (aumentar si es necesario)

---

## **REFERENCIAS**

- [Playwright Documentation](https://playwright.dev)
- [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/)
- [Context7 MCP](https://github.com/modelcontextprotocol/servers)
- [shadcn/ui v4](https://ui.shadcn.com)
