# CONTRIBUTING

Gracias por contribuir a WEBCODE. Estas son las reglas y el flujo recomendado para commits, formateo y hooks pre-commit.

## Política de formateo

- Prettier es la fuente de verdad para formateo. La configuración está en `.prettierrc`.
- Biome se usa únicamente para linting (hemos desactivado su formateador en `biome.json`).

## Pre-commit hooks

Este repositorio ha eliminado hooks automáticos (Husky). Para evitar conflictos y dependencia de hooks en CI, por favor ejecuta manualmente Prettier antes de commitear.

Pasos recomendados:

```bash
pnpm install
pnpm format      # ejecuta Prettier en todo el repo
pnpm lint        # ejecuta Biome para linting
git add -A
git commit -m "mensaje"
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
