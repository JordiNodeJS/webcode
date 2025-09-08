# T010 - Añadir tests unitarios para hooks relacionados con scroll/visibilidad/efectos

Prioridad: Media
Estimación: 1 día

Resumen
-------
Escribir tests unitarios para los hooks `useOnScreen` (o `useScrollVisibility`) y `useIsomorphicEffect` para garantizar su comportamiento esperado y evitar regresiones.

Criterios de aceptación
-----------------------
- Tests cubren el caso feliz (elemento visible/invisible) y al menos un edge-case (desmontaje, múltiples observadores).
- Tests corren en CI/local con `pnpm vitest` y pasan sin errores.

Notas de implementación
----------------------
- Usar `vitest` y `@testing-library/react` (o `@testing-library/react-hooks`) para montar componentes de prueba.
- Mockear `IntersectionObserver` en el entorno de test para simular entradas.
- Testear `useIsomorphicEffect` garantizando que no lanza en entorno SSR; usar `@testing-library/react` con `act` para efectos.

Archivos a tocar / crear
-----------------------
- `test/hooks/use-on-screen.spec.tsx` (nuevo)
- `test/hooks/use-isomorphic-effect.spec.tsx` (nuevo)
- Ajustes en `package.json` para scripts de test si faltan (ej. `pnpm vitest`).

Validación / QA
---------------
- Ejecutar `pnpm vitest` y confirmar que los tests pasan.
