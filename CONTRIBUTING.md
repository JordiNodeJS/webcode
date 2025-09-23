# CONTRIBUTING

Gracias por contribuir a WEBCODE. Estas son las reglas y el flujo recomendado para commits, formateo y hooks pre-commit.

## Política de formateo

- Prettier es la fuente de verdad para formateo. La configuración está en `.prettierrc`.
- Biome se usa únicamente para linting (hemos desactivado su formateador en `biome.json`).

## Pre-commit hooks

Usamos Husky + lint-staged para ejecutar Prettier automáticamente sobre los archivos staged antes de cada commit.

Pasos para activar en local:

```bash
pnpm install
npx husky install
```

Confirmar que el hook está presente:

```bash
ls .husky
# deberías ver pre-commit
```

## Cómo formatear manualmente

- Formatear todo el repositorio con Prettier:

```bash
pnpm format
```

- Lint (solo Biome):

```bash
pnpm lint
```

## Nota sobre trailing commas

- El repositorio está configurado con `trailingComma: "none"` en `.prettierrc`. Prettier se encargará de aplicar esa regla.

## Preguntas

Si tienes dudas sobre el proceso, abre un issue o contacta al equipo.
