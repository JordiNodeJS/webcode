---
name: pr-prompt
description: "Template para generar descripciones de Pull Request y el uso recomendado de la CLI de GitHub (`gh`)."
model: "Raptor mini (Preview)"
tools: ['edit', 'runNotebooks', 'search', 'new', 'runCommands', 'runTasks', 'Context7/*', 'github-mpc/*', 'usages', 'vscodeAPI', 'problems', 'changes', 'testFailure', 'openSimpleBrowser', 'fetch', 'githubRepo', 'extensions', 'todos', 'runSubagent']
argument-hint: "tags: pr, template, docs; version: 1.0.0"
---

# Pull Request Description Template
 

Generate a comprehensive pull request description for the changes made in this branch.

Utiliza el CLI de github copilot para generar el PR siguiendo las instrucciones. Para crear y publicar el pull request se utiliza la CLI oficial de GitHub (`gh`); incluye instrucciones para usar `gh` al subir el PR.

Al generar la descripción de la pull request, normaliza la codificación a UTF-8 y aplica un sanitizado/normalización de caracteres (por ejemplo, reemplazar o escapar caracteres especiales Unicode no deseados) para evitar que aparezcan "caracteres raros" en la descripción.

## Instructions

Analyze the code changes and create a detailed PR description that includes:

- When generating the pull request, create it without prompting the author: generate the PR description file (`pr_description.md`) and, if permitted, run the `gh pr create` command (for example using `--body-file` or `--fill`) automatically. Do not ask for additional confirmation before producing the PR or the description file.

- Before creating the PR, check whether the current branch is published and up to date on the remote. If the branch is not present remotely or has local commits that are not pushed, push the branch (for example `git push --set-upstream origin <branch>`). After ensuring the branch is published, create the PR using `gh pr create` with the generated `pr_description.md`. Once the PR has been created successfully, securely delete the temporary `pr_description.md` file. Do not prompt the author during these steps.

### 1. Title
- Create a concise, descriptive title summarizing the main change
- Use conventional commit format: `type: brief description`
- Types: feat, fix, docs, style, refactor, test, chore

### 2. Overview
- Provide a clear summary of what this PR accomplishes
- Explain the motivation behind the changes
- Link to any related issues or feature requests

### 3. Changes Made
List all significant changes with details:
- ✨ New features added
- 🐛 Bugs fixed
- ♻️ Code refactored
- 📝 Documentation updated
- 🎨 UI/UX improvements
- ⚡️ Performance improvements
- 🔒 Security enhancements

### 4. Technical Details
- Describe implementation approach
- Explain any architectural decisions
- Note any new dependencies added
- Highlight breaking changes (if any)

### 5. Testing
- Describe testing performed
- List test cases covered
- Include screenshots/recordings for UI changes
- Note any edge cases tested

### 6. Checklist
```markdown
- [ ] Code follows project coding standards
- [ ] Self-review of code completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated and passing
- [ ] Build succeeds locally
- [ ] Responsive design verified (if UI changes)
- [ ] Accessibility considerations addressed
```

### 7. Screenshots/Videos (if applicable)

Archivo de instrucciones del prompt:
# Plantilla de descripción de Pull Request

Genera una descripción completa de la pull request para los cambios realizados en esta rama.

Utiliza el CLI de GitHub Copilot para generar el PR siguiendo las instrucciones. Para crear y publicar la pull request se utiliza la CLI oficial de GitHub (`gh`); incluye instrucciones para usar `gh` al subir el PR.

Al generar la descripción de la pull request, normaliza la codificación a UTF-8 y aplica un proceso de sanitización/normalización de caracteres (por ejemplo, normalización Unicode NFKC y eliminación o escape de caracteres de control o símbolos no deseados) para evitar que aparezcan "caracteres raros" en la descripción.

## Instrucciones

Analiza los cambios de código y crea una descripción de PR detallada que incluya:

- Al generar la pull request, créala sin pedir confirmación al autor: genera el archivo de descripción `pr_description.md` y, si está permitido, ejecuta `gh pr create` (por ejemplo con `--body-file` o `--fill`) automáticamente. No preguntes al autor antes de generar la PR o el archivo de descripción.

- Antes de crear la PR, comprueba si la rama actual está publicada y actualizada en el remoto. Si la rama no existe en el remoto o tiene commits locales sin empujar, publica la rama (por ejemplo `git push --set-upstream origin <branch>`). Tras asegurarte de que la rama está publicada, crea la PR usando `gh pr create` con `pr_description.md`. Una vez la PR se haya creado con éxito, elimina de forma segura el archivo temporal `pr_description.md`. No preguntes al autor durante estos pasos.

### 1. Título
- Crea un título conciso y descriptivo que resuma el cambio principal
- Usa el formato de commit convencional: `type: breve descripción`
- Tipos: feat, fix, docs, style, refactor, test, chore

### 2. Resumen (Overview)
- Proporciona un resumen claro de lo que logra esta PR
- Explica la motivación detrás de los cambios
- Vincula cualquier issue o solicitud de característica relacionada

### 3. Cambios realizados
Enumera todos los cambios significativos con detalle:
- ✨ Funcionalidades nuevas añadidas
- 🐛 Errores corregidos
- ♻️ Refactorizaciones de código
- 📝 Documentación actualizada
- 🎨 Mejoras de UI/UX
- ⚡️ Mejoras de rendimiento
- 🔒 Mejoras de seguridad

### 4. Detalles técnicos
- Describe el enfoque de implementación
- Explica las decisiones arquitectónicas tomadas
- Indica nuevas dependencias añadidas (si las hay)
- Destaca cambios incompatibles o breaking changes (si los hay)

### 5. Pruebas
- Describe las pruebas realizadas
- Lista los casos de prueba cubiertos
- Incluye capturas de pantalla o grabaciones para cambios en la interfaz
- Indica cualquier caso límite probado

### 6. Checklist
```markdown
- [ ] El código sigue los estándares del proyecto
- [ ] Revisión propia del código completada
- [ ] Comentarios añadidos para lógica compleja
- [ ] Documentación actualizada
- [ ] No se generaron nuevas advertencias (warnings)
- [ ] Pruebas añadidas/actualizadas y pasando
- [ ] La compilación (build) se ejecuta correctamente localmente
- [ ] Diseño responsivo verificado (si hubo cambios en UI)
- [ ] Consideraciones de accesibilidad abordadas
```

### 7. Capturas/Grabaciones (si aplica)
- Comparativas Antes/Después
- Demostración de la nueva funcionalidad
- Estados de error
- Comportamiento responsivo

### 8. Notas de despliegue (Deployment)
- Variables de entorno necesarias
- Pasos de migración requeridos
- Cambios de configuración
- Dependencias a instalar

### 9. Puntos a revisar por el revisor
Destaca áreas específicas donde quieras la atención del revisor:
- Lógica compleja que necesita validación
- Consideraciones de rendimiento
- Implicaciones de seguridad
- Decisiones de UX

## Formato de ejemplo de salida

```markdown
## feat: Añadir generador de códigos QR con funcionalidad de descarga

### Resumen
Esta PR implementa un generador de códigos QR que permite a los usuarios introducir texto y generar códigos QR descargables. Resuelve la necesidad de crear códigos QR rápidamente sin herramientas externas.

### Cambios realizados
✨ **Nuevas funcionalidades**
- Añadido el componente cliente `QRGenerator` con vista previa en tiempo real
- Implementada la descarga del código QR en PNG
- Añadida validación de entrada y manejo de errores
- Diseño responsivo para móvil/escritorio

🎨 **Mejoras de UI**
- Interfaz limpia y moderna con Tailwind CSS
- Estados de carga durante la generación
- Feedback de éxito tras la descarga

### Detalles técnicos
- Usa la librería `qrcode` para la generación de QR
- Componente cliente para interactividad
- Renderizado basado en canvas para alta calidad
- Boundaries de error para fallos controlados

**Dependencias añadidas:**
- qrcode: ^1.5.3

### Pruebas
✅ Probado con varias longitudes de entrada (1-1000 caracteres)
✅ Verificada la función de descarga en diferentes navegadores
✅ Comprobado el diseño responsivo en móvil/tablet/escritorio
✅ Validados estados de error para entradas inválidas

### Capturas
[Incluir capturas relevantes]

### Notas de despliegue
No hay requisitos especiales de despliegue. Todas las dependencias están en `package.json`.

### Checklist
- [x] El código sigue los estándares del proyecto
- [x] Revisión propia del código completada
- [x] Comentarios añadidos para lógica compleja
- [x] Documentación actualizada
- [x] Pruebas pasando
- [x] La compilación se ejecuta correctamente localmente
- [x] Diseño responsivo verificado

### Puntos para el revisor
Por favor, presta atención a:
- El manejo de errores en la generación de QR
- La implementación de la descarga en distintos navegadores
- La accesibilidad de los controles del formulario
```

## Notas
- Sé específico y detallado
- Usa un lenguaje claro y profesional
- Incluye todo el contexto relevante
- Piensa desde la perspectiva del revisor
- Facilita la comprensión de qué cambió y por qué

### Ejemplo: comando `gh` para crear la Pull Request
Incluye un ejemplo de cómo crear la PR usando la CLI oficial de GitHub (`gh`). Puedes usar `--fill` para autocompletar desde el último commit/branch o pasar título y cuerpo explícitamente.

```bash
# Crear la PR usando --fill (autocompleta título y cuerpo si están disponibles):
gh pr create --fill

# Crear la PR pasando título y cuerpo desde variables o archivos:
gh pr create \
	--title "feat: Añadir generador de códigos QR con descarga" \
	--body "$(cat pr_description.md)" \
	--base main \
	--head feature/qr-generator

# Alternativa: crear la PR y abrir el editor para editar el body (útil para sanitizar antes):
gh pr create --title "feat: ..." --base main --head feature/branch --web
```
