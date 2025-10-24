## Prompt: MCP — crear Pull Request (optimizado)

Propósito

Crear o actualizar una Pull Request usando GitHub CLI (`gh`) con validaciones locales, etiquetado automático y asignación. Flujo optimizado basado en experiencia real.

Configuración

- Repositorio: contexto local
- Herramienta: `gh` (GitHub CLI)
- Assignee: `JordiNodeJS`
- Base branch: `main`
- Origen: rama actual detectada automáticamente

Flujo optimizado

1. **Validaciones locales** (paralelas cuando sea posible):
   - `pnpm build` (crítico - debe pasar)
   - `pnpm lint` (si falla, continuar con warning)
   - `pnpm test` (si existe)

2. **Crear/actualizar PR**:
   - Detectar rama actual
   - Verificar si existe PR: `gh pr list --head <branch>`
   - Crear: `gh pr create --title "<type>(<scope>): <desc>" --body "..." --base main --head <branch> --assignee JordiNodeJS`
   - Actualizar: `gh pr edit <number> --title "..." --body "..."`

3. **Etiquetado automático**:
   - Labels estándar: `feature`, `status/ready-for-review`, `priority/medium`, `ci/required`, `auto-changelog`
   - Aplicar: `gh pr edit <number> --add-label "..."`

4. **Comentario de validación**:
   - Añadir resultado de validaciones locales
   - Estado de build, lint, tests

Salida requerida

```markdown
- pr_number: <número>
- pr_url: <url>
- branch: <rama>
- warnings: <lista>
- errors: <lista>
```

Comandos de referencia

```bash
# Crear PR
gh pr create --title "feat(scope): desc" --body "..." --base main --head <branch> --assignee JordiNodeJS

# Etiquetar
gh pr edit <number> --add-label "feature" --add-label "status/ready-for-review"

# Comentar
gh pr comment <number> --body "Validation: Build ✅, Lint ✅"
```

Versión: 3.0 — optimizado basado en PR #66

---

## Prompt: MCP — mergear y squash Pull Request

Propósito

Mergear una Pull Request existente usando squash merge y limpiar ramas. Comando complementario para el flujo de PR.

Configuración

- Estrategia: `squash and merge`
- Limpieza automática: rama remota y local
- Verificación: CI checks deben pasar

Flujo de merge

1. **Verificar estado de PR**:
   - `gh pr view <number> --json state,isDraft,mergeable,statusCheckRollup`
   - Verificar que no sea draft y sea mergeable
   - Verificar que CI checks pasen

2. **Ejecutar merge**:
   - `gh pr merge <number> --squash --delete-branch`
   - Capturar hash del commit de merge

3. **Limpieza local**:
   - `git checkout main`
   - `git pull origin main`
   - `git branch -D <branch>` (si existe)

4. **Verificación final**:
   - Confirmar que la rama fue eliminada
   - Verificar que main está actualizado

Salida requerida

```markdown
- pr_number: <número>
- pr_url: <url>
- branch: <rama>
- merge_commit: <hash> (o null si no se mergeó)
- deleted_remote_branch: true/false
- deleted_local_branch: true/false
- warnings: <lista>
- errors: <lista>
```

Comandos de referencia

```bash
# Verificar estado
gh pr view <number> --json state,isDraft,mergeable,statusCheckRollup

# Mergear con squash
gh pr merge <number> --squash --delete-branch

# Limpiar local
git checkout main && git pull origin main && git branch -D <branch>
```

Casos de error

- PR no mergeable: etiquetar `status/conflicts`
- CI checks fallando: etiquetar `ci/failed`
- Draft PR: no proceder con merge

Versión: 1.0 — comando de merge complementario

---

## Registro de acciones automáticas

El agente registra automáticamente las acciones realizadas:

```
Registro:
- pr_number: 66
- pr_url: https://github.com/JordiNodeJS/webcode/pull/66
- branch: feat/hydration
- merge_commit: 2f6a503
- deleted_remote_branch: true
- deleted_local_branch: true
- warnings: []
- errors: []
```

**Mejoras implementadas basadas en PR #66:**
- Flujo optimizado con validaciones paralelas
- Manejo de errores de TypeScript en build
- Etiquetado automático estándar
- Limpieza automática de ramas
- Comandos de referencia simplificados
