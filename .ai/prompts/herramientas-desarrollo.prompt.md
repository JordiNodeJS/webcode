# Prompt: Herramientas de Desarrollo - WebSnack

## **Contexto y Objetivo**

Prompt especializado para el uso de herramientas de desarrollo y testing en el proyecto WebSnack utilizando MCPs (Model Context Protocols) para automatización y verificación de calidad.

## **Alcance**

- Testing automatizado con Playwright
- Integración con Context7 para mejora de patrones
- Gestión de componentes shadcn/ui
- Verificación visual de cambios

---

## **1. PLAYWRIGHT - Testing y Verificación Visual**

### **Flujo de Trabajo Estándar**

1. **Asume que el servidor de desarrollo está en marcha**
2. **Utiliza el MCP de Playwright** para verificar cambios implementados
3. **Toma screenshots** para validar el resultado visualmente
4. **Analiza la imagen tomada** para confirmar que refleja los cambios esperados
5. **Si no coincide**: ajusta el código y repite el proceso

### **Comandos Típicos**

```javascript
// Navegación y captura
await page.goto("http://localhost:3000/ruta-a-verificar");
await page.screenshot({ path: "verification.png", fullPage: true });

// Verificación de elementos específicos
await page.locator('[data-testid="componente"]').screenshot();
```

---

## **2. CONTEXT7 MCP - Mejora de Patrones**

### **Objetivo**

Utilizar el MCP Context7 para:

- **Detección mejorada de patrones** en proyectos Next.js, React y Tailwind
- **Generación de código optimizada** basada en mejores prácticas
- **Análisis de contexto** para sugerencias más precisas

### **Casos de Uso**

- Análisis de arquitectura de componentes
- Optimización de patrones de estado
- Mejores prácticas de performance
- Refactoring inteligente

---

## **3. SHADCN/UI MCP - Gestión de Componentes**

### **Integración con shadcn/ui**

- **Optimizar la creación de componentes** en proyectos Next.js y React
- **Máximo provecho del MCP** siguiendo las directrices en `shadcn.prompt.md`
- **Adaptación automática** a la estructura del proyecto

### **Referencia Cruzada**

Para uso detallado de shadcn/ui, consultar: `./shadcn.prompt.md`

---

## **Flujo de Trabajo Integrado**

### **Desarrollo → Testing → Verificación**

1. **Implementar** cambios en código
2. **Ejecutar** servidor de desarrollo
3. **Usar Playwright MCP** para testing automatizado
4. **Capturar screenshots** para verificación visual
5. **Usar Context7** para análisis de patrones y mejoras
6. **Aplicar shadcn/ui MCP** para componentes optimizados

### **Criterios de Aceptación**

- ✅ Servidor de desarrollo funcionando
- ✅ Screenshots reflejan cambios esperados
- ✅ Componentes siguen patrones establecidos
- ✅ Testing pasa sin errores

---

**Nota**: Este prompt consolida las herramientas de desarrollo para mantener un flujo de trabajo coherente y eficiente en el proyecto WebSnack.
