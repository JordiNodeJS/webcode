# **[Documentación]** TAREA INDIVIDUAL - OPTIMIZAR CSS CRÍTICO

## **[Etiqueta]** METADATOS DE LA TAREA

**ID:** T014  
**Título:** Optimizar CSS Crítico - Inline y Defer  
**Fecha de creación:** 2025-01-04  
**Fecha de última actualización:** 2025-01-04  
**Estado:** pendiente  
**Progreso:** 0%  
**Prioridad:** **[Círculo Rojo]** Crítica  
**Estimación:** 2-3 horas  
**Asignado a:** Desarrollador

## **[Enlace]** DEPENDENCIAS

**Dependencias de entrada:** ninguna  
**Dependencias de salida:** T016, T020  
**Bloqueos identificados:** ninguno

## **[Lista]** DESCRIPCIÓN DETALLADA

El análisis de rendimiento identificó dos archivos CSS render-blocking que causan un delay de 116ms en el LCP:
- `b293efcda1e9eeca.css` (58ms)
- `2473c16c0c2f6b5f.css` (58ms)

**Contexto:** Los estilos CSS críticos deben estar inline en el `<head>` para evitar render-blocking, mientras que los estilos no críticos pueden cargarse de forma diferida.

**Objetivo:** Optimizar la carga de CSS para eliminar render-blocking y mejorar LCP en 116ms.

## **[Objetivos]** CRITERIOS DE ACEPTACIÓN

- [ ] CSS crítico inline en el head
- [ ] CSS no crítico cargado de forma diferida
- [ ] Eliminación de render-blocking CSS
- [ ] LCP mejora en al menos 100ms
- [ ] No se produce FOUC (Flash of Unstyled Content)
- [ ] Funcionalidad visual preservada

## **[Análisis]** SUBTAREAS

### T014.1: Identificar CSS crítico para inline

**Estado:** pendiente  
**Progreso:** 0%  
**Descripción:** Analizar archivos CSS y determinar qué estilos son críticos para above-the-fold

### T014.2: Implementar inline de CSS crítico

**Estado:** pendiente  
**Progreso:** 0%  
**Descripción:** Extraer CSS crítico e inlinarlo en el head del documento

### T014.3: Configurar defer de CSS no crítico

**Estado:** pendiente  
**Progreso:** 0%  
**Descripción:** Implementar carga diferida para CSS no crítico usando técnicas de defer

### T014.4: Optimizar orden de carga de estilos

**Estado:** pendiente  
**Progreso:** 0%  
**Descripción:** Asegurar que los estilos se cargan en el orden correcto

### T014.5: Testing de FOUC y rendimiento

**Estado:** pendiente  
**Progreso:** 0%  
**Descripción:** Verificar que no hay FOUC y que el rendimiento mejora

## 🛠️ RECURSOS Y HERRAMIENTAS

**Archivos afectados:**

- `src/app/layout.tsx`
- `src/app/globals.css`
- `next.config.js` (para configuración de CSS)
- Archivos CSS de componentes críticos

**Librerías/paquetes necesarios:**

- `next-optimized-css` (opcional)
- `critical` (para extraer CSS crítico)

**Documentación de referencia:**

- [Next.js - CSS optimization](https://nextjs.org/docs/advanced-features/customizing-postcss-config)
- [Web.dev - Eliminate render-blocking CSS](https://web.dev/render-blocking-resources/)
- [Critical CSS tools](https://github.com/addyosmani/critical)

## 🧪 TESTING Y VALIDACIÓN

**Casos de prueba:**

1. Verificar que no hay FOUC en carga inicial
2. Verificar que estilos críticos se aplican inmediatamente
3. Verificar que estilos no críticos se cargan correctamente
4. Ejecutar análisis de rendimiento con Chrome DevTools
5. Probar en diferentes velocidades de conexión

**Criterios de validación:**

- [ ] Funcionalidad preservada
- [ ] Rendimiento mejorado (LCP -100ms)
- [ ] No render-blocking CSS
- [ ] No FOUC
- [ ] Tests visuales pasando

## **[Documentación]** NOTAS Y OBSERVACIONES

- El CSS crítico debe incluir estilos para above-the-fold content
- Considerar usar herramientas automatizadas para extraer CSS crítico
- Debe asegurarse que Tailwind CSS se optimiza correctamente
- Verificar que los estilos de tema (dark/light) funcionan correctamente

## **[Recargar]** LOG DE CAMBIOS

**[2025-01-04 14:30]** Tarea creada basada en análisis de rendimiento
**[2025-01-04 14:30]** Definidos criterios de aceptación y subtareas

---

## **[Crecimiento]** MÉTRICAS DE PROGRESO

**Tiempo invertido:** 0 horas  
**Archivos modificados:** 0 archivos  
**Líneas de código:** 0 líneas añadidas/eliminadas  
**Bugs encontrados:** 0 bugs  
**Bugs resueltos:** 0 bugs

## **[Completado]** CHECKLIST DE FINALIZACIÓN

- [ ] Todas las subtareas completadas
- [ ] Criterios de aceptación cumplidos
- [ ] Testing realizado y exitoso
- [ ] Documentación actualizada
- [ ] Código revisado y aprobado
- [ ] Dependencias de salida desbloqueadas

