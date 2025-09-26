# 📝 TAREA T003: Refactorizar use-theme.ts

## 🏷️ METADATOS DE LA TAREA

**ID:** T003  
**Título:** Refactorizar use-theme.ts - Implementar next-themes  
**Fecha de creación:** 2025-01-03  
**Fecha de última actualización:** 2025-01-03  
**Estado:** pendiente  
**Progreso:** 0%  
**Prioridad:** 🟡 Media  
**Estimación:** 3-5 horas  
**Asignado a:** Desarrollador

## 🔗 DEPENDENCIAS

**Dependencias de entrada:** ninguna  
**Dependencias de salida:** ninguna  
**Bloqueos identificados:** ninguno

## 📋 DESCRIPCIÓN DETALLADA

El hook `use-theme.ts` actualmente implementa manualmente la gestión de temas con:

- Manipulación directa de `document.documentElement.classList`
- Acceso directo a `localStorage`
- Acceso directo a `window.matchMedia`
- Lógica personalizada para detectar preferencias del sistema

**Objetivo:** Reemplazar la implementación manual con la librería `next-themes` que proporciona una solución más robusta, optimizada y mantenida por la comunidad.

## 🎯 CRITERIOS DE ACEPTACIÓN

- [ ] Instalación y configuración de `next-themes`
- [ ] Eliminación de manipulación directa del DOM
- [ ] Refactorización del hook `use-theme`
- [ ] Actualización del componente `ThemeToggle`
- [ ] Mantenimiento de funcionalidad existente
- [ ] Mejora del rendimiento y compatibilidad
- [ ] Persistencia de tema funcionando correctamente

## 📊 SUBTAREAS

### T003.1: Instalar y configurar next-themes

**Estado:** pendiente  
**Progreso:** 0%  
**Descripción:** Instalar next-themes y configurar el ThemeProvider en el layout

### T003.2: Refactorizar hook use-theme

**Estado:** pendiente  
**Progreso:** 0%  
**Descripción:** Reemplazar implementación manual con next-themes

### T003.3: Actualizar ThemeToggle component

**Estado:** pendiente  
**Progreso:** 0%  
**Descripción:** Adaptar ThemeToggle para usar el nuevo hook

### T003.4: Testing de persistencia de tema

**Estado:** pendiente  
**Progreso:** 0%  
**Descripción:** Validar que el tema se persiste correctamente entre sesiones

## 🛠️ RECURSOS Y HERRAMIENTAS

**Archivos afectados:**

- `src/hooks/use-theme.ts`
- `src/components/landing/hero/Hero.ThemeToggle.tsx`
- `src/app/layout.tsx`

**Librerías/paquetes necesarios:**

- `next-themes@^0.2.1`

**Documentación de referencia:**

- [next-themes GitHub](https://github.com/pacocoursey/next-themes)
- [next-themes Documentation](https://github.com/pacocoursey/next-themes#readme)

## 🧪 TESTING Y VALIDACIÓN

**Casos de prueba:**

1. Toggle entre tema claro y oscuro funciona
2. Tema se persiste en localStorage
3. Tema respeta preferencias del sistema
4. No hay flash de contenido incorrecto (FOUC)
5. Funciona correctamente en SSR

**Criterios de validación:**

- [ ] Funcionalidad preservada al 100%
- [ ] Sin manipulación directa del DOM
- [ ] Mejor rendimiento
- [ ] Código más simple y mantenible
- [ ] Tests pasando

## 📝 NOTAS Y OBSERVACIONES

- next-themes maneja automáticamente el FOUC (Flash of Unstyled Content)
- Proporciona mejor soporte para SSR
- Maneja automáticamente las preferencias del sistema
- Es la solución estándar para temas en Next.js

## 🔄 LOG DE CAMBIOS

**[2025-01-03 10:30]** Tarea creada - Análisis inicial completado

---

## 📈 MÉTRICAS DE PROGRESO

**Tiempo invertido:** 0 horas  
**Archivos modificados:** 0 archivos  
**Líneas de código:** 0 líneas modificadas  
**Bugs encontrados:** 0 bugs  
**Bugs resueltos:** 0 bugs

## ✅ CHECKLIST DE FINALIZACIÓN

- [ ] Todas las subtareas completadas
- [ ] Criterios de aceptación cumplidos
- [ ] Testing realizado y exitoso
- [ ] Documentación actualizada
- [ ] Código revisado y aprobado
- [ ] Dependencias de salida desbloqueadas
