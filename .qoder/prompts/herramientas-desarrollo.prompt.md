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

## **3. HERRAMIENTAS DE RECURSOS Y ASSETS**

### **Favicon Generator**

**🔗 Herramienta**: [https://www.favicon-generator.org/](https://www.favicon-generator.org/)

**Propósito**: Generación completa de favicons y app icons para todas las plataformas

**Características**:

- **Generación automática** de todos los tamaños requeridos (16x16 hasta 310x310)
- **Soporte multiplataforma**: iOS, Android, Windows, navegadores web
- **Archivos generados**:
  - `favicon.ico` - Favicon básico para navegadores
  - Apple Touch Icons (7 tamaños diferentes)
  - Android Icons (6 tamaños diferentes)
  - Microsoft Tiles (4 tamaños diferentes)
  - `manifest.json` - Web App Manifest
  - `browserconfig.xml` - Configuración para Windows

**Integración en WEBCODE**:

- Todos los archivos se ubican en `/public/`
- Referencias configuradas en `src/app/layout.tsx`
- Manifest personalizado para PWA
- Meta tags optimizadas para SEO

**Uso recomendado**:

1. Subir logo en alta resolución (mínimo 260x260px)
2. Descargar el paquete completo
3. Copiar archivos a `/public/`
4. Actualizar referencias en layout si es necesario

---

## **4. SHADCN/UI MCP - Gestión de Componentes**

### **Integración con shadcn/ui**

- **Optimizar la creación de componentes** en proyectos Next.js y React
- **Máximo provecho del MCP** siguiendo las directrices en `shadcn.prompt.md`
- **Adaptación automática** a la estructura del proyecto

### **Referencia Cruzada**

Para uso detallado de shadcn/ui, consultar: `./shadcn.prompt.md`

---

## **5. FLUJO DE TRABAJO INTEGRADO**

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
