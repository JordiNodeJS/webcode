## **1. CHROME DEVTOOLS - Debugging y Performance**

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
(await mcp_chrome) -
  devtool_performance_start_trace({
    reload: true,
    autoStop: true
  });

// Obtener insights de performance
const insights =
  (await mcp_chrome) -
  devtool_performance_analyze_insight({
    insightName: "LCPBreakdown"
  });
```

#### **B) Network Debugging**

```typescript
// Listar todos los requests
const requests =
  (await mcp_chrome) -
  devtool_list_network_requests({
    resourceTypes: ["fetch", "xhr", "document"]
  });

// Inspeccionar request específico
const request =
  (await mcp_chrome) -
  devtool_get_network_request({
    url: "https://api.webcode.es/services"
  });
```

#### **C) Emulación de Condiciones**

```typescript
// Emular CPU throttling (dispositivos móviles)
(await mcp_chrome) - devtool_emulate_cpu({ throttlingRate: 4 });

// Emular red lenta
(await mcp_chrome) - devtool_emulate_network({ throttlingOption: "Slow 3G" });
```

---

## **2. CONTEXT7 MCP - Mejora de Patrones y Documentación**

### **Objetivo**

Utilizar el MCP Context7 para:

- **Documentación actualizada** de librerías (Next.js, React, Tailwind, etc.)
- **Detección mejorada de patrones** en proyectos Next.js, React y Tailwind
- **Generación de código optimizada** basada en mejores prácticas
- **Análisis de contexto** para sugerencias más precisas

### **Flujo de Trabajo**

```typescript
// 1. Resolver librería
const libraryInfo =
  (await mcp_context7_resolve) -
  library -
  id({
    libraryName: "next.js"
  });

// 2. Obtener documentación específica
const docs =
  (await mcp_context7_get) -
  library -
  docs({
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
