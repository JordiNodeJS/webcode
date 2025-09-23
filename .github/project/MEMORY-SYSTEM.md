# 🧠 Sistema de Memoria WebSnack — Documentación Unificada

Este documento unifica la información y los flujos de los archivos
`.github/project/MEMORY-SYSTEM-SETUP.md` y
`.github/project/TUTORIAL-SISTEMA-MEMORIA.md` para mantener una única
fuente de verdad sobre el sistema de actualización de contexto del
proyecto (scripts, hooks, tareas y recomendaciones de uso).

Contenido principal

- ¿Qué es el sistema de memoria
- Componentes (scripts, hooks, tasks)
- Setup rápido
- Uso diario (terminal + CI + hooks)
- Comandos recomendados
- Troubleshooting
- Integración con CI / Husky

Resumen rápido

- Script principal de actualización: `.github/automation/scripts/update-context.sh`
- Ejecutar manualmente (terminal):

```bash
bash .github/automation/scripts/update-context.sh
```

- Ejecutar con pnpm (si añades script `update-context`):

```bash
pnpm run update-context
```

Por qué unificamos

- Evita duplicidad de información
- Mantiene flujos y rutas coherentes (mismos nombres de script)
- Facilita el mantenimiento y el onboarding

1. Componentes del sistema

- Archivos de estado:
  - `.github/PROJECT-STATE.md`
  - `.github/context/current-session.md`
  - `.github/context/technical-context.md`
  - `llms.txt`

- Scripts y hooks:
  - `.github/automation/scripts/update-context.sh` (script principal)
  - `.github/automation/hooks/pre-commit` (hook opcional)

- Herramientas integradas:
  - Biome (lint + format) — usar `pnpm biome check --write .`
  - Opcional: Husky para hooks

2. Setup inicial (rápido)

```bash
# Hacer el script ejecutable
chmod +x .github/automation/scripts/update-context.sh

# (Opcional) Copiar el pre-commit hook
cp .github/automation/hooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit

# Primera ejecución (terminal)
bash .github/automation/scripts/update-context.sh
```

3. Uso diario — comandos recomendados

- Ejecutar manualmente (terminal):

```bash
bash .github/automation/scripts/update-context.sh
```

- Usar pnpm si añadimos script en `package.json` (opcional):

```json
"scripts": {
  "update-context": "bash .github/automation/scripts/update-context.sh"
}
```

```bash
pnpm run update-context
```

- Biome (lint / fix / format):

```bash
# Verificación sin cambios (CI)
pnpm biome check .

# Verificación con correcciones automáticas (local)
pnpm biome check --write .

# Formateo
pnpm biome format --write .
```

4. Integración con GitHub Actions (ejemplo)

```yaml
# .github/workflows/update-context.yml
name: Update Project Context
on: [push]
jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: bash .github/automation/scripts/update-context.sh
      - uses: stefanzweifel/git-auto-commit-action@v4
        with:
          commit_message: "🔄 Auto-update project context"
```

5. Integración con Husky (opcional)

```bash
pnpm add -D husky
echo "bash .github/automation/scripts/update-context.sh" > .husky/pre-commit
```

6. Troubleshooting rápido

- Permission denied: `chmod +x .github/automation/scripts/update-context.sh`
- Git hook no ejecuta: copiar y dar permisos al hook como arriba
- Script no actualiza archivos: comprobar permisos de escritura y salida del script

7. Buenas prácticas

- Ejecutar antes de sesiones LLM importantes
- Mantener el script en `.github/automation/scripts/` para evitar rutas duplicadas
- Añadir un `pnpm` script `update-context` si se desea un alias corto

Contacto y mantenimiento

- Si quieres que amplíe este documento con ejemplos de output, o que
  añada el `pnpm` script a `package.json`, dime y lo actualizo.

---

Este documento reemplaza y unifica las versiones anteriores de la
documentación de memoria del proyecto. Para más información histórica,
consulta el historial Git de los archivos originales.
