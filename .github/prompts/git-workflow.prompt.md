# Prompt: Git Workflow y Pull Requests - WebCode

## **Contexto y Objetivo**

Prompt consolidado para flujo de trabajo Git, convenciones de commits, creación de Pull Requests y mejores prácticas de control de versiones en el proyecto WebCode.

---

## **1. CONVENCIONES DE COMMITS**

### **Formato Estándar (Conventional Commits)**

```
<tipo>(<scope>): <descripción>

[cuerpo opcional]

[footer opcional]
```

### **Tipos de Commit**

- **feat**: Nueva funcionalidad
- **fix**: Corrección de bug
- **docs**: Cambios en documentación
- **style**: Cambios de formato (no afectan el código)
- **refactor**: Refactorización de código
- **perf**: Mejoras de rendimiento
- **test**: Añadir o modificar tests
- **build**: Cambios en build system o dependencias
- **ci**: Cambios en CI/CD
- **chore**: Tareas de mantenimiento

### **Ejemplos**

```bash
# Nueva funcionalidad
feat(blog): add Notion integration for posts

# Corrección de bug
fix(hero): correct responsive layout on mobile

# Documentación
docs(readme): update installation instructions

# Refactorización
refactor(components): extract Hero sections into separate files

# Performance
perf(images): optimize image loading with next/image

# Testing
test(e2e): add Playwright tests for contact form
```

### **Scopes Comunes en WebCode**

- `hero`, `blog`, `services`, `briefing`
- `ui`, `components`, `layouts`
- `api`, `lib`, `hooks`
- `styles`, `animations`
- `docs`, `config`, `deps`

---

## **2. FLUJO DE TRABAJO GIT**

### **A) Branching Strategy**

```
main (producción)
  ├── feat/nombre-feature (nuevas funcionalidades)
  ├── fix/nombre-bug (correcciones)
  ├── docs/nombre-doc (documentación)
  └── refactor/nombre-refactor (refactorizaciones)
```

### **B) Workflow Típico**

```bash
# 1. Crear nueva rama desde main
git checkout main
git pull origin main
git checkout -b feat/add-portfolio-page

# 2. Hacer cambios y commits
git add .
git commit -m "feat(portfolio): add portfolio page with project grid"

# 3. Push a remoto
git push origin feat/add-portfolio-page

# 4. Crear Pull Request (ver sección 3)

# 5. Después de merge, actualizar main local
git checkout main
git pull origin main
git branch -d feat/add-portfolio-page
```

### **C) Comandos Útiles**

```bash
# Ver estado actual
git status

# Ver historial de commits
git log --oneline --graph --all

# Ver cambios sin staged
git diff

# Ver cambios staged
git diff --staged

# Deshacer último commit (mantener cambios)
git reset --soft HEAD~1

# Deshacer cambios en archivo específico
git checkout -- <archivo>

# Actualizar rama con cambios de main
git checkout feat/mi-feature
git rebase main
```

---

## **3. CREAR PULL REQUESTS**

### **A) Usando GitHub CLI (Recomendado)**

```bash
# Instalar GitHub CLI
# Windows: winget install GitHub.cli
# Mac: brew install gh

# Autenticar (solo primera vez)
gh auth login

# Crear PR desde rama actual
gh pr create \
  --title "feat(blog): add Notion CMS integration" \
  --body "Integración completa con Notion para gestión de posts del blog" \
  --base main

# Crear PR con template
gh pr create --fill

# Ver PRs abiertos
gh pr list

# Ver detalles de un PR
gh pr view 42

# Mergear PR
gh pr merge 42 --squash
```

### **B) Template de PR**

```markdown
## 📋 Descripción

Breve descripción de los cambios realizados.

## 🎯 Tipo de Cambio

- [ ] ✨ Nueva funcionalidad (feat)
- [ ] 🐛 Corrección de bug (fix)
- [ ] 📝 Documentación (docs)
- [ ] 💎 Refactorización (refactor)
- [ ] ⚡ Performance (perf)
- [ ] 🧪 Tests (test)

## 🔍 Checklist

- [ ] El código sigue los estándares del proyecto
- [ ] Los cambios pasan todos los tests
- [ ] Se ha actualizado la documentación si es necesario
- [ ] Los commits siguen el formato Conventional Commits
- [ ] Se ha probado en diferentes navegadores/dispositivos

## 📸 Screenshots (si aplica)

Capturas de pantalla de los cambios visuales.

## 🔗 Issues Relacionados

Closes #123
Refs #456
```

### **C) Usando Copilot para PRs**

```bash
# Copilot puede generar descripciones de PR automáticamente
# basándose en los commits de la rama

# 1. Asegurarse de que los commits están bien escritos
# 2. Usar el comando de Copilot en VS Code:
#    Cmd/Ctrl + Shift + P → "GitHub Copilot: Generate PR Description"
```

---

## **4. REVIEW DE CÓDIGO**

### **Checklist de Reviewer**

- [ ] **Funcionalidad**: ¿Los cambios funcionan como se esperaba?
- [ ] **Código limpio**: ¿El código es legible y mantenible?
- [ ] **Performance**: ¿No hay regresiones de rendimiento?
- [ ] **Tests**: ¿Hay tests adecuados?
- [ ] **Documentación**: ¿Está actualizada?
- [ ] **Seguridad**: ¿No introduce vulnerabilidades?
- [ ] **Accesibilidad**: ¿Cumple WCAG 2.1 AA?

### **Comentarios de Review**

```markdown
# Sugerencia (opcional)
**Suggestion**: Podríamos extraer esta lógica a un hook personalizado.

# Bloqueo (debe corregirse)
**Blocker**: Este cambio rompe la funcionalidad en móviles.

# Pregunta (aclaración)
**Question**: ¿Por qué elegimos este approach en lugar de X?

# Nitpick (menor)
**Nit**: Typo en el comentario, línea 42.

# Aprobación con comentarios
**LGTM** (Looks Good To Me) 👍 
Solo un par de nits menores.
```

---

## **5. HOOKS DE GIT (AUTOMATIZACIÓN)**

### **Pre-commit Hook (Husky + lint-staged)**

```bash
# Instalar Husky
pnpm add -D husky lint-staged

# Configurar en package.json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  }
}

# Inicializar Husky
pnpm exec husky init

# Crear pre-commit hook
echo "npx lint-staged" > .husky/pre-commit
```

### **Commit-msg Hook (Validar formato)**

```bash
# Instalar commitlint
pnpm add -D @commitlint/cli @commitlint/config-conventional

# Crear commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', [
      'hero', 'blog', 'services', 'briefing',
      'ui', 'components', 'layouts',
      'api', 'lib', 'hooks',
      'styles', 'animations',
      'docs', 'config', 'deps'
    ]]
  }
};

# Crear commit-msg hook
echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg
```

---

## **6. ESTRATEGIAS DE MERGE**

### **Merge Commit**

```bash
git merge feat/mi-feature
# Mantiene historial completo con commit de merge
```

**Pros**: Historial completo, fácil revertir feature completa
**Cons**: Historial puede ser confuso con muchas ramas

### **Squash and Merge** (Recomendado para WebCode)

```bash
gh pr merge 42 --squash
# Combina todos los commits en uno solo
```

**Pros**: Historial limpio, un commit por feature
**Cons**: Pierde historial detallado de desarrollo

### **Rebase and Merge**

```bash
git rebase main
git checkout main
git merge feat/mi-feature --ff-only
```

**Pros**: Historial lineal y limpio
**Cons**: Reescribe historia, puede ser complejo con conflictos

---

## **7. RESOLUCIÓN DE CONFLICTOS**

### **Workflow de Conflictos**

```bash
# 1. Actualizar main
git checkout main
git pull origin main

# 2. Rebase tu rama
git checkout feat/mi-feature
git rebase main

# 3. Resolver conflictos manualmente
# Editar archivos marcados con <<<<<<<, =======, >>>>>>>

# 4. Marcar como resueltos
git add <archivos-resueltos>
git rebase --continue

# 5. Push forzado (reescribe historia)
git push origin feat/mi-feature --force-with-lease
```

### **Herramientas de Merge**

```bash
# Usar VS Code como merge tool
git config --global merge.tool vscode
git config --global mergetool.vscode.cmd 'code --wait $MERGED'

# Usar merge tool
git mergetool
```

---

## **8. MEJORES PRÁCTICAS**

### **Commits**

- ✅ **Commits pequeños y atómicos** - Un cambio lógico por commit
- ✅ **Mensajes descriptivos** - Explicar el "por qué", no el "qué"
- ✅ **Formato consistente** - Seguir Conventional Commits
- ✅ **Evitar commits de "WIP"** - Usar stash o ramas temporales

### **Ramas**

- ✅ **Nombres descriptivos** - `feat/add-portfolio-page`
- ✅ **Vida corta** - Mergear rápido, evitar ramas de larga duración
- ✅ **Actualizar frecuentemente** - Rebase con main regularmente
- ✅ **Limpiar ramas mergeadas** - Eliminar después de merge

### **Pull Requests**

- ✅ **PRs pequeños** - Más fáciles de revisar (< 400 líneas)
- ✅ **Descripción clara** - Contexto, motivación, cambios
- ✅ **Screenshots** - Para cambios visuales
- ✅ **Tests pasando** - CI verde antes de mergear

---

## **9. TROUBLESHOOTING**

### **Error: merge conflict**

```bash
# Abortar merge/rebase
git merge --abort
# o
git rebase --abort

# Resolver manualmente y continuar
git add <archivos>
git rebase --continue
```

### **Error: push rejected (historia divergente)**

```bash
# Si tu rama está desactualizada
git pull --rebase origin feat/mi-feature

# Si necesitas reescribir historia (con cuidado)
git push origin feat/mi-feature --force-with-lease
```

### **Error: accidental commit en main**

```bash
# Crear rama con los cambios
git branch feat/accidental-changes

# Volver main al estado remoto
git reset --hard origin/main

# Cambiar a la nueva rama
git checkout feat/accidental-changes
```

---

## **10. RECURSOS Y COMANDOS ÚTILES**

### **Alias de Git Recomendados**

```bash
# Añadir a ~/.gitconfig
[alias]
  st = status
  co = checkout
  br = branch
  ci = commit
  lg = log --oneline --graph --all --decorate
  unstage = reset HEAD --
  last = log -1 HEAD
  amend = commit --amend --no-edit
```

### **GitHub CLI Shortcuts**

```bash
# Ver PRs
gh pr list

# Crear PR rápido
gh pr create --fill

# Checkout a PR
gh pr checkout 42

# Ver diff de PR
gh pr diff 42
```

---

## **REFERENCIAS**

- Conventional Commits: https://www.conventionalcommits.org
- Git Documentation: https://git-scm.com/doc
- GitHub CLI: https://cli.github.com
- Git Best Practices: https://git-scm.com/book/en/v2
