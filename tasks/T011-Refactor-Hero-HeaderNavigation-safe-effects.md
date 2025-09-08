# T011 - Revisar y refactorizar `Hero.HeaderNavigation.tsx` para efectos seguros SSR/CSR

Prioridad: Media
Estimación: 0.5-1 día

## Resumen

Revisar `Hero.HeaderNavigation.tsx` para eliminar accesos directos a `window` o `document` dentro de efectos no-isomórficos, asegurar limpieza de listeners y usar `useIsomorphicEffect` donde corresponda.

## Criterios de aceptación

- No existen accesos directos a `window`/`document` en el render server-side.
- Todos los listeners añadidos se limpian en el `return` del effect.
- `useIsomorphicEffect` se utiliza si el efecto necesita correr solo en cliente.

## Notas de implementación

- Revisar el archivo `src/components/landing/hero/Hero.HeaderNavigation.tsx` y reemplazar `useEffect` por `useIsomorphicEffect` si el efecto depende de APIs del navegador.
- Añadir pruebas manuales simples: navegar por la página, abrir/cerrar el menú y confirmar que no hay leaks.

## Archivos a tocar

- `src/components/landing/hero/Hero.HeaderNavigation.tsx`
- `src/hooks/use-isomorphic-effect.ts` (si no existe)

## Validación / QA

- Revisar la pestaña Memory en DevTools y confirmar que no quedan listeners activos tras navegación/acciones.
