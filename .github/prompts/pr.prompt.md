# Prompt para gestionar Pull Requests con GitHub CLI (gh)

## Objetivo
Gestionar Pull Requests en GitHub usando `gh`: crear, actualizar, etiquetar, asignar y mergear siguiendo las convenciones del proyecto WEBCODE.

## Variables
- `{{branch}}`: rama actual (ej: feat/ui/header-cta)
- `{{base}}`: rama objetivo (ej: main o develop)
- `{{type}}`: feat | fix | chore | docs | refactor | test
- `{{scope}}`: ámbito o módulo (ej: header, auth)
- `{{title}}`: título breve
- `{{body}}`: descripción de cambios
- `{{labels}}`: etiquetas separadas por comas (ej: type:feat,area:ui,p0)
- `{{reviewers}}`: reviewers separados por comas (ej: @alice,@bob)
- `{{assignees}}`: assignees separados por comas (opcional)

## Flujo: Crear o actualizar PR

1. **Verificar PR existente:**
   ```bash
   gh pr view --head {{branch}} --json number,url,state
   ```

2. **Si no existe, crear PR:**
   ```bash
   gh pr create \
     --base {{base}} \
     --head {{branch}} \
     --title "{{type}}({{scope}}): {{title}}" \
     --body "{{body}}" \
     --label "{{labels}}" \
     --reviewer "{{reviewers}}" \
     --assignee "{{assignees}}"
   ```

3. **Si existe, actualizar PR:**
   ```bash
   gh pr edit {{number}} \
     --title "{{type}}({{scope}}): {{title}}" \
     --body "{{body}}" \
     --add-label "{{labels}}" \
     --add-reviewer "{{reviewers}}" \
     --add-assignee "{{assignees}}"
   ```

## Plantilla de cuerpo de PR
```markdown
## Resumen
- Qué: Breve resumen de cambios (1–2 líneas)
- Por qué: Motivación y contexto

## Cambios principales
- Lista de cambios relevantes

## Cómo probar
1. `pnpm install && pnpm test && pnpm lint`
2. Pasos específicos para probar

## Issues relacionados
- Closes #issue (si aplica)

## Checklist
- [ ] pnpm lint (sin errores)
- [ ] pnpm test (todos pasan)
- [ ] Build OK (si aplica)
- [ ] Accesibilidad verificada
- [ ] Responsive & dark mode verificados
```

## Flujo: Mergear PR

**Solo mergear si:**
- La PR está aprobada
- Los checks pasan (lint, tests, build)
- La rama base está actualizada

**Pasos para mergear:**

1. **Verificar estado:**
   ```bash
   gh pr view {{number}} --json state,mergeable,reviews,statusCheckRollup
   ```

2. **Mergear por squash (recomendado):**
   ```bash
   gh pr merge {{number}} --squash --delete-branch
   ```

3. **O mergear por merge commit:**
   ```bash
   gh pr merge {{number}} --merge --delete-branch
   ```

4. **Verificar merge:**
   ```bash
   gh pr view {{number}} --json mergedAt,mergedBy
   ```

## Notas
- Usar Conventional Commits en títulos: `{{type}}({{scope}}): {{title}}`
- Etiquetas sugeridas: `type:{{type}}`, `area:{{scope}}`, `p0|p1|p2`
- Verificar checks antes de mergear: `gh pr checks {{number}}`
- Si la PR está en draft, convertir a ready: `gh pr ready {{number}}`
