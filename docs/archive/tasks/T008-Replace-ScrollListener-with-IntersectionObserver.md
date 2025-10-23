# T008 - Reemplazar listener de scroll por IntersectionObserver en ValuePropsGrid

Prioridad: Alta
Estimación: 1-2 días

**ESTADO: COMPLETADO** **[Completado]**

## Resumen

Sustituir el uso de un listener global de `scroll` por una implementación basada en `IntersectionObserver` para controlar la aparición de las tarjetas de propuestas de valor (`Hero.ValuePropsGrid`). Esto reducirá la carga durante el scroll y evitará lecturas frecuentes del layout.

## Criterios de aceptación

- `Hero.ValuePropsGrid` deja de usar `window.addEventListener('scroll', ...)` y en su lugar usa un hook `useOnScreen` (o equivalente) basado en `IntersectionObserver`. **[Completado]**
- Se mantiene el placeholder con `min-height` para evitar layout shift. **[Completado]**
- La aparición de las tarjetas sigue comportándose igual (aparecen tras el umbral/visibilidad) y conserva la animación (respetando prefers-reduced-motion - ver T009). **[Completado]**
- No hay errores de hidratación en SSR/CSR y la aplicación pasa una comprobación manual de la ruta que contiene el Hero. **[Completado]**

## Notas de implementación

- Crear o reutilizar un hook `useOnScreen` en `src/hooks/` que exporte `{ ref, isIntersecting }`. **[Completado]**
- En `Hero.ValuePropsGrid.tsx` usar el hook en el contenedor que actúa como trigger. Mantener el DOM del placeholder y alternar `aria-hidden` según `isIntersecting`. **[Completado]**
- Si el componente necesita un umbral configurable, exponerlo como prop con valor por defecto (ej. `threshold = 0.1`). **[Completado]**
- Añadir comentarios y tipos TypeScript estrictos. **[Completado]**

## Archivos modificados

- `src/hooks/use-on-screen.tsx` (nuevo)
- `src/components/landing/hero/Hero.ValuePropsGrid.tsx` (modificado)

## Validación / QA

- Manual: abrir la página con Hero y confirmar que al cargar no se renderizan las tarjetas y que al hacer scroll aparecen. **[Completado]**
- Revisar DevTools: comprobar que no hay listeners de scroll activos adicionales y que IntersectionObserver está observando el elemento. **[Completado]**
