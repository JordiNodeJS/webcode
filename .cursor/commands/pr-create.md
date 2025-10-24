## Prompt: MCP — crear, revisar y mergear Pull Request (adaptado a gh CLI)

Propósito

- Este prompt especifica cómo un agente automatizado debe crear o actualizar una Pull Request usando la GitHub CLI (`gh`). Incluye búsquedas de contexto, validaciones locales, etiquetado/assignación, creación/actualización de la PR, verificación de checks y (opcional) merge y limpieza de ramas. Debe manejar idempotencia y errores.

Ámbito y supuestos

- Repositorio: usar el contexto del repo local.
- Herramienta principal para acciones GH: `gh` (GitHub CLI) — los ejemplos y comandos deben usar `gh`.
- Propietario del repo y assignee por defecto: `JordiNodeJS`.
- Branch destino por defecto: `main`.
- Branch origen: detectar la rama actual (ej. `feat/...` o `fix/...`). Si ya existe una PR desde esa rama, actualizarla en vez de crear una nueva.

Salida esperada

Al terminar, el agente debe devolver un MARKDOWN con estos campos:

- pr_number: número de la PR
- pr_url: URL de la PR
- branch: rama origen utilizada
- merge_commit: hash del commit de merge (si se hizo merge, si no null)
- deleted_remote_branch: true/false
- deleted_local_branch: true/false
- warnings: lista de advertencias no-blocking
- errors: lista de errores (vacío si none)

Comprobaciones locales (pre-PR)

Antes de crear/actualizar la PR, ejecutar las siguientes comprobaciones locales cuando sea posible:

- pnpm lint:fix # ESLint
- pnpm test # si existe script `test`
- pnpm build # o build del paquete afectado en monorepos

Si alguna comprobación falla, marcar la PR con un estado o etiqueta apropiada (`ci/failed` o `status/blocked`), comentar los errores y no proceder al merge automático.

Labels recomendadas

- labels sugeridas (si no existen, crear con `gh label create`):
  - type/feature (o `feature` si `type/feature` no existe)
  - area/<area> (por ejemplo `area/contact`)
  - status/ready-for-review
  - priority/medium
  - ci/required
  - auto-changelog

Estrategia de PR y contenido

- Título sugerido: `<type>(<scope>): <breve-descripción>` — p. ej. `feat(contact): añadir formulario y endpoint API`.
- Body: incluir siempre
  - Resumen corto (2–4 líneas)
  - Lista de cambios (bullets)
  - Referencias a archivos de contexto y decisiones (por ejemplo `.github/project/PROJECT-STATE.md`, `.github/prompts/...`) con enlaces
  - Pasos para validar localmente
  - Checklist de pre-merge (ESLint, tests, build, accessibility, performance)

Asignación y revisores

- Assignee por defecto: `JordiNodeJS`.
- Si hay `CODEOWNERS` o reviewers automáticos, añadirlos; si no, solicitar revisión a `JordiNodeJS`.

Flujo operativo (resumen de pasos que debe ejecutar el agente — abstracción de acciones)

1. Preparación
   - Detectar la rama actual (`git rev-parse --abbrev-ref HEAD`).
   - Leer archivos de contexto relevantes: `.github/project/PROJECT-STATE.md`, `.github/prompts/`, `docs/`, y cualquier otra referencia útil.

2. Validaciones locales
   - Ejecutar `pnpm lint:fix`, `pnpm test` (si existe) y `pnpm build`.
   - Recoger resultados; si hay fallos bloqueantes, añadir `ci/failed` y reportar errores en la PR.

3. Comprobar existencia de PR
   - Usar `gh pr list --head <branch>` para saber si ya existe una PR desde esta rama.

4. Crear o actualizar PR con `gh`
   - Si no existe: `gh pr create --title "..." --body-file <archivo.md> --base main --head <branch> --assignee JordiNodeJS`.
   - Si existe: `gh pr edit <pr-number> --title "..." --body-file <archivo.md>` para actualizar contenido.
   - **IMPORTANTE**: Usar `--body-file` en lugar de `--body` para evitar problemas de codificación UTF-8.

5. Etiquetas y assignación
   - Listar labels (`gh label list`). Crear las faltantes (`gh label create`) y asignarlas a la PR (`gh pr edit <pr> --add-label "..."`).
   - Asegurar `assignee` y solicitar `reviewer` mediante `gh pr edit` o `gh pr review`.

6. Comentario de contexto y checklist
   - Añadir un comentario en la PR con los extractos de contexto relevantes y el resultado de las comprobaciones locales.

7. Merge condicional (opcional)
   - Sólo intentar merge automático si:
     - Todas las comprobaciones automáticas pasan (CI green)
     - PR tiene `status/ready-for-review` y aprobaciones requeridas
   - Estrategia preferida: `squash and merge` (usar `gh pr merge <pr> --squash --delete-branch`).

8. Limpieza post-merge
   - Si mergeado, borrar rama remota: `git push origin --delete <branch>` (o `gh` flag `--delete-branch`).
   - Borrar rama local si procede: `git branch -D <branch>`.

9. Manejo de conflictos e idempotencia
   - Si existen conflictos, etiquetar `status/conflicts`, comentar pasos para resolver y no borrar la rama.
   - Todas las acciones deben ser re-ejecutables sin efectos duplicados (idempotencia).

Ejemplos de comandos (referencia rápida)

- Crear PR: gh pr create --title "feat(contact): ..." --body "..." --base main --head feat/contact --assignee JordiNodeJS
- Listar PRs de una rama: gh pr list --head feat/contact --json number,url,state,title
- Editar PR: gh pr edit 28 --add-label "area/contact"
- Comentar: gh pr comment 28 --body "..."
- Merge (squash): gh pr merge 28 --squash --delete-branch

Salida final requerida (ejemplo de formato)

El agente debe devolver un bloque MARKDOWN con:

- pr_number: 28
- pr_url: https://github.com/owner/repo/pull/28
- branch: feat/contact
- merge_commit: null
- deleted_remote_branch: false
- deleted_local_branch: false
- warnings: ["metadataBase not set"]
- errors: []

Notas y recomendaciones

- Priorizar la seguridad: no exponer secretos en comentarios ni en el body de la PR.
- Si faltan labels sugeridos, crearlos con nombres claros y descriptivos.
- Si no hay tests configurados, añadir una nota en la PR sugiriendo la creación de `pnpm test` y pruebas para la nueva funcionalidad.

Versión: 3.0 — optimizado basado en PR #66 y mejorado con flujo completo
Autor: agente automático (prompt maintainer)

---

# Registro de acción automática (ejemplo)

El agente puede anotar en este prompt una entrada de registro cuando realice acciones automáticas (creación/edición/merge de PRs). Ejemplo de entrada de registro que el agente añadirá tras ejecutar un merge automático:

```
Registro:
- pr_number: 28
- pr_url: https://github.com/JordiNodeJS/webcode/pull/28
- branch: feat/contact
- merge_commit: 6909e83d7c03178736d7c5ace98eff336ff64968
- deleted_remote_branch: true
- deleted_local_branch: true
- warnings: ["metadataBase not set"]
- errors: []
```

Este bloque es sólo un ejemplo que el agente actualizará dinámicamente según el resultado real de sus acciones.

---

## Comando Rápido: Crear PR con Etiquetas

**Uso**: Cuando el usuario diga "crea la pr y etiquétala" o similar, ejecutar automáticamente:

1. **Detectar rama actual**: `git rev-parse --abbrev-ref HEAD`
2. **Validaciones locales**: `pnpm lint:fix && pnpm build`
3. **Verificar PR existente**: `gh pr list --head <branch>`
4. **Crear archivo temporal** con el body de la PR (UTF-8)
5. **Crear/actualizar PR** usando `--body-file` para evitar problemas de codificación
6. **Añadir etiquetas automáticas** según tipo de rama
7. **Limpiar archivos temporales**
8. **Devolver resultado** en formato markdown

### ⚠️ Prevención de Problemas de Codificación

- **SIEMPRE usar `--body-file`** en lugar de `--body` para contenido con acentos
- **Crear archivo temporal** con codificación UTF-8
- **Limpiar archivos temporales** después de usar
- **Verificar codificación** antes de enviar

**Etiquetas automáticas por tipo de rama**:

- `feat/*` → `type/feature`, `status/ready-for-review`, `priority/medium`
- `fix/*` → `type/bugfix`, `status/ready-for-review`, `priority/medium`
- `refactor/*` → `type/refactor`, `status/ready-for-review`, `priority/medium`
- `docs/*` → `type/docs`, `status/ready-for-review`, `priority/low`

**Assignee por defecto**: `JordiNodeJS`
**Base branch**: `main`

**Mejoras implementadas basadas en PR #66:**

- Flujo optimizado con validaciones paralelas
- Manejo de errores de TypeScript en build
- Etiquetado automático estándar
- Limpieza automática de ramas
- Comandos de referencia simplificados
