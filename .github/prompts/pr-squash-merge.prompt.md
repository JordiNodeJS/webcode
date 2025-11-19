---
name: pr-squash-merge
description: "Squash y merge de Pull Request usando GitHub CLI. Guía para agentes automáticos que realizan merges con comprobaciones y limpieza de ramas."
model: "Raptor mini (Preview)"
tools: ['edit', 'runNotebooks', 'search', 'new', 'runCommands', 'runTasks', 'Context7/*', 'github-mpc/*', 'usages', 'vscodeAPI', 'problems', 'changes', 'testFailure', 'openSimpleBrowser', 'fetch', 'githubRepo', 'extensions', 'todos', 'runSubagent']
argument-hint: "tags: pr, merge, gh; version: 1.0.0"
---

## Prompt: Squash y Merge Pull Request

Propósito

- Este prompt especifica cómo un agente automatizado debe hacer squash y merge de una Pull Request usando la GitHub CLI (`gh`). Incluye verificaciones de estado, resolución de conflictos, y limpieza de ramas.

Ámbito y supuestos

- Repositorio: usar el contexto del repo local.
- Herramienta principal: `gh` (GitHub CLI)
- Estrategia de merge: `squash and merge` (por defecto)
- Limpieza automática de ramas después del merge

Salida esperada

Al terminar, el agente debe devolver un MARKDOWN con estos campos:

- pr_number: número de la PR
- pr_url: URL de la PR
- branch: rama origen utilizada
- merge_commit: hash del commit de merge
- deleted_remote_branch: true/false
- deleted_local_branch: true/false
- warnings: lista de advertencias no-blocking
- errors: lista de errores (vacío si none)

Verificaciones pre-merge

Antes de hacer squash y merge, ejecutar las siguientes verificaciones:

- `gh pr view <pr-number> --json state,mergeable,mergeStateStatus` - Verificar estado de la PR
- `gh pr checks <pr-number>` - Verificar que todos los checks pasen
- `gh pr review <pr-number> --list` - Verificar que tenga aprobaciones requeridas

Si alguna verificación falla, reportar el estado y no proceder al merge.

Estados de PR y acciones

- **OPEN + MERGEABLE**: Proceder al squash y merge
- **OPEN + CONFLICTING**: Reportar conflictos, no mergear
- **OPEN + BEHIND**: Actualizar rama base, luego verificar
- **CLOSED**: Reportar que la PR ya está cerrada
- **MERGED**: Reportar que la PR ya está mergeada

Flujo operativo

1. **Verificación de estado**
   - Obtener estado de la PR: `gh pr view <pr-number> --json state,mergeable,mergeStateStatus,mergeStateStatus`
   - Verificar checks: `gh pr checks <pr-number>`
   - Verificar reviews: `gh pr review <pr-number> --list`

2. **Manejo de conflictos**
   - Si `mergeStateStatus` es `DIRTY` o `CONFLICTING`: reportar conflictos
   - Si `mergeStateStatus` es `BEHIND`: actualizar rama base
   - Si `mergeStateStatus` es `CLEAN`: proceder al merge

3. **Squash y merge**
   - Usar `gh pr merge <pr-number> --squash --delete-branch`
   - Verificar que el merge fue exitoso
   - Obtener hash del commit de merge

4. **Limpieza post-merge**
   - Verificar que la rama remota fue eliminada
   - Eliminar rama local si procede: `git branch -D <branch>`
   - Cambiar a rama main: `git checkout main`
   - Actualizar rama main: `git pull origin main`

5. **Manejo de errores**
   - Si hay conflictos: etiquetar `status/conflicts`
   - Si fallan checks: etiquetar `ci/failed`
   - Si no hay aprobaciones: etiquetar `status/needs-review`

Comandos de referencia

- Verificar estado: `gh pr view <pr-number> --json state,mergeable,mergeStateStatus`
- Verificar checks: `gh pr checks <pr-number>`
- Verificar reviews: `gh pr review <pr-number> --list`
- Squash y merge: `gh pr merge <pr-number> --squash --delete-branch`
- Listar PRs: `gh pr list --state open --json number,title,state`

Salida final requerida

El agente debe devolver un bloque MARKDOWN con:

- pr_number: 68
- pr_url: https://github.com/owner/repo/pull/68
- branch: feat/implement-theme-toggle
- merge_commit: abc123def456...
- deleted_remote_branch: true
- deleted_local_branch: true
- warnings: []
- errors: []

Notas y recomendaciones

- **Siempre verificar estado** antes de intentar merge
- **Manejar conflictos** apropiadamente
- **Limpiar ramas** después del merge exitoso
- **Verificar checks** antes de mergear
- **Obtener aprobaciones** si son requeridas

Versión: 1.0 — Squash y merge con GitHub CLI
Autor: agente automático (prompt maintainer)

---

## Comando Rápido: Squash y Merge

**Uso**: Cuando el usuario diga "squash y merge la pr" o similar, ejecutar automáticamente:

1. **Verificar estado de la PR** - `gh pr view <pr-number> --json state,mergeable,mergeStateStatus`
2. **Verificar checks** - `gh pr checks <pr-number>`
3. **Verificar reviews** - `gh pr review <pr-number> --list`
4. **Manejar conflictos** si existen
5. **Ejecutar squash y merge** - `gh pr merge <pr-number> --squash --delete-branch`
6. **Limpiar ramas locales** si procede
7. **Devolver resultado** en formato markdown

### ⚠️ Estados que impiden el merge

- **CONFLICTING**: La PR tiene conflictos de merge
- **BEHIND**: La PR está desactualizada respecto a main
- **CI_FAILED**: Los checks de CI han fallado
- **NEEDS_REVIEW**: La PR necesita aprobaciones

### ✅ Estados que permiten el merge

- **CLEAN**: La PR está lista para merge
- **MERGEABLE**: No hay conflictos
- **APPROVED**: Tiene las aprobaciones requeridas
