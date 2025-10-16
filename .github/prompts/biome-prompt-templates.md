# Plantillas de prompt para generar código compatible con el estilo del repositorio (ESLint + Prettier)

Este archivo contiene plantillas y un checklist "preflight" para que cualquier prompt dirigido a la AI genere código que pase las reglas de linting/formatting del proyecto (ESLint + Prettier). Pega la plantilla y rellena las secciones entre `{{ }}`.

---

## Cómo usar

1. Copia la plantilla que más se adapte a tu necesidad.
2. Rellena los campos `{{DESCRIPTION}}`, `{{FILES}}`, `{{CONSTRAINTS}}` y `{{TESTS}}`.
3. Si quieres, añade ejemplos de input/output o tests mínimos.
4. Ejecuta `pnpm lint --fix` y `pnpm format` después de aplicar los cambios y corrige lo que ESLint/Prettier reporte.

---

## Reglas clave (siempre incluir en el prompt)

- Prohibido usar `any` — todos los tipos deben ser explícitos o genéricos.
- Todas las listas/iteraciones en JSX deben incluir `key` único.
- Usar `export function ComponentName` para componentes reutilizables (named exports).
- `export default` solo para `page.tsx` y `layout.tsx` según App Router.
- Tipar handlers eventuales: `React.MouseEvent<HTMLButtonElement>` etc.
- Evitar `!` non-null assertions; validar explícitamente.
- Asegurar que Biome (v2.2.3) pase: `pnpm biome check .` y preferir `pnpm biome check --write .`.

---

## Plantilla: "Crear o modificar componente React (TSX)"

Usa esto para pedir que la AI genere o modifique un componente.

Prompt base:

"Crea o modifica el/los archivo(s) {{FILES}} con la siguiente funcionalidad: {{DESCRIPTION}}.

Requisitos concretos:

- Stack: Next.js 15 App Router, React 19, TypeScript (strict), Tailwind CSS.
- Export: `export function {{ComponentName}}(...) {}` (named export).
- Props: define una interface `{{ComponentName}}Props` con tipos correctos.
- No usar `any`.
- Añadir `key` para cualquier lista.
- Accesibilidad: `aria-*` correcto, `role` semántico cuando aplique.
- Tests: agregar un test básico con React Testing Library (opcional, ver sección TESTS).

Constraints (concrete):
{{CONSTRAINTS}}

Pruebas mínimas/local:
{{TESTS}}

Al generar el código, ejecuta mentalmente el siguiente preflight checklist y devuélveme solo los archivos modificados o nuevos (no expliques el checklist):

- TypeScript no usa `any`.
- JSX iterables tienen `key`.
- Named exports para componentes reutilizables.
- Event handlers tipados.
  -- `pnpm lint --fix` y `pnpm format` deben pasar sin errores.

"

---

## Plantilla: "Refactor / Fix lint warnings"

Prompt base:

"Aplica las correcciones necesarias en {{FILES}} para que `pnpm lint --fix` y `pnpm format` pasen sin errores. Mantén el comportamiento existente y sólo realiza cambios seguros. Describe brevemente los cambios en un comentario al inicio de cada archivo modificado.

Requerimientos:

- No introducir `any`.
- Si encuentras `dangerouslySetInnerHTML`, extrae el script a `public/` y reemplaza por `<script src="/..." />` salvo que sea insalvable.
- Añade dependencias completas en hooks (`useEffect`, `useCallback`) o documenta el motivo si decides omitir alguna.
- Evita cambios de comportamiento (no eliminar funcionalidad existente sin explicar).

Preflight checklist (mental):

- Ejecutar `pnpm lint --fix` y `pnpm format`.
- Verificar que los tests unitarios (si existen) pasen.

"

---

## Plantilla: "Generar tests mínimos"

Prompt base:

"Crea tests con Jest + React Testing Library para `{{FILES}}`. Incluye al menos:

- Un test 'renders without crashing'.
- Un test que compruebe el estado activo de la navegación cuando se hace click en un enlace.
- Mockea `next/navigation` cuando aplique.

Asegúrate que los tests respeten la configuración TypeScript del proyecto y que no usen `any`.

"

---

## Checklist "preflight" que la AI debe verificar antes de devolver archivos

- [ ] No `any` en el código generado.
- [ ] Todas las iteraciones JSX tienen `key`.
- [ ] Named exports en componentes reutilizables.
- [ ] Event handlers tipados con React types.
- [ ] No `dangerouslySetInnerHTML` sin justificación (si se usa, mover a public/ y documentar).
      -- [ ] `pnpm lint --fix` y `pnpm format` deben pasar localmente.

---

## Ejemplo de prompt ya rellenado (HeaderNavigation active link)

"Crea/actualiza `src/components/landing/hero/Hero.HeaderNavigation.tsx` para añadir un indicador visual del enlace activo. Debe:

- Resaltar enlaces de hash (`#servicios`) cuando la sección esté visible (IntersectionObserver).
- Resaltar enlaces de página (`/contacto`) cuando coincidan con `usePathname()`.
- Evitar `any`, usar named export `export function HeaderNavigation()`.
- Añadir `aria-current` al enlace activo.
- Mantener compatibilidad móvil (Sheet) y cerrar el menu al seleccionar un enlace.

Constraints:

- No cambiar el comportamiento del logo ni del ThemeToggle.
- Mantener el uso de Tailwind y WSFadeIn.

Tests:

- Agregar test que simule click en '#servicios' y verifique `aria-current`.

"

---

## Consejos operativos

-- Siempre ejecutar `pnpm lint --fix` y `pnpm format` después de aplicar cambios y corregir lo que ESLint/Prettier reporte.

- Si Biome sugiere reordenar imports o formateo, aplicar `pnpm biome check --write .` para que lo haga automáticamente.
- Para cambios que toquen seguridad (XSS, dangerouslySetInnerHTML), priorizar extraer a `public/` y usar `<script src="/..." />`.

---

## ¿Quieres que integre estas plantillas en un workflow de PR automático?

Puedo:

- Añadir un template de PR que incluya la checklist Biome.
- Añadir GitHub Action que ejecute `pnpm biome check .` en cada PR y comente resultados.

Dime si quieres que lo haga y lo añado en la próxima iteración.
