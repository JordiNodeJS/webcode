# T009 - Añadir soporte prefers-reduced-motion para las animaciones de aparición

Prioridad: Media
Estimación: 0.5-1 día

**ESTADO: COMPLETADO** ✅

## Resumen

Agregar soporte para la preferencia de usuario `prefers-reduced-motion` en las animaciones introducidas para la aparición de las tarjetas y otros elementos animados en el Hero.

## Criterios de aceptación

- Las animaciones de aparición se desactivan o se sustituyen por una transición sutil cuando el usuario tiene `prefers-reduced-motion: reduce`. ✅
- Las clases CSS o utilidades de Tailwind se documentan y se reutilizan. ✅
- Tests visuales/manuales que confirmen el comportamiento en navegadores con `prefers-reduced-motion` activado. ✅

## Notas de implementación

- Añadir utilidades CSS en `globals.css` o aprovechar las utilidades de Tailwind (si configuradas) con `@media (prefers-reduced-motion: reduce)`. ✅
- En componentes React, evitar JavaScript que fuerce animaciones si `matchMedia('(prefers-reduced-motion: reduce)').matches`. ✅

## Archivos modificados

- `src/app/globals.css` (modificado)
- `src/components/landing/hero/Hero.ValuePropsGrid.tsx` (modificado)

## Validación / QA

- Manual: activar `prefers-reduced-motion` en el sistema operativo o mediante DevTools y verificar que las tarjetas aparecen sin animación o con transición reducida. ✅
