# Reversión de Migración: Biome a ESLint

## Resumen Ejecutivo

Este documento registra la reversión de la migración de Biome v2.2.3 a ESLint, restaurando la configuración de linting anterior del proyecto WebCode. La reversión se realizó debido a problemas de compatibilidad y funcionamiento de Biome en el proyecto.

## Fecha de Reversión

**Fecha**: 13 de octubre de 2025

## Razón de la Reversión

Biome estaba dando problemas en el proyecto, por lo que se decidió restaurar la configuración anterior de ESLint que ya había sido probada y funcionaba correctamente.

## Proceso de Reversión

### 1. Reinstalación de Dependencias de ESLint

Se reinstalaron las dependencias de ESLint que habían sido eliminadas:

```bash
pnpm add -D eslint eslint-config-next @eslint/eslintrc
```

**Dependencias instaladas**:

- `eslint` - Linter principal
- `eslint-config-next` - Configuración oficial de Next.js
- `@eslint/eslintrc` - Utilidad para compatibilidad con configuraciones legacy

### 2. Restauración del Archivo de Configuración

Se creó el archivo `eslint.config.mjs` con la configuración estándar del proyecto:

```javascript
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Reglas personalizadas del proyecto
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_"
        }
      ],
      "react/no-unescaped-entities": "warn",
      "react-hooks/exhaustive-deps": "warn"
    }
  }
];

export default eslintConfig;
```

### 3. Actualización de Scripts en package.json

Se restauraron los scripts originales de ESLint:

**Antes (Biome)**:

```json
{
  "scripts": {
    "lint": "pnpm dlx @biomejs/biome check .",
    "lint:fix": "pnpm dlx @biomejs/biome check --write .",
    "format": "pnpm dlx prettier --write .",
    "format:biome": "pnpm dlx @biomejs/biome format ./src --write",
    "format:current": "pnpm dlx @biomejs/biome format --write"
  }
}
```

**Después (ESLint)**:

```json
{
  "scripts": {
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "pnpm dlx prettier --write ."
  }
}
```

### 4. Actualización de lint-staged

Se actualizó la configuración de `lint-staged` para usar ESLint:

**Antes (Biome)**:

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx,json}": ["pnpm dlx @biomejs/biome check --write"],
    "*.{css,scss,md,html,mdx,svg}": ["pnpm dlx prettier --write"]
  }
}
```

**Después (ESLint)**:

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix"],
    "*.{json,css,scss,md,html,mdx,svg}": ["pnpm dlx prettier --write"]
  }
}
```

### 5. Creación de .eslintignore

Se creó el archivo `.eslintignore` para mejorar el rendimiento y evitar linting innecesario:

```
# Dependencies
node_modules/
.pnpm-store/

# Build outputs
.next/
out/
dist/
build/

# Cache
.turbo/
.eslintcache

# Testing
coverage/
.nyc_output/

# Misc
*.log
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env*.local
.env

# Vercel
.vercel

# Public static files
public/

# Generated files
*.tsbuildinfo
next-env.d.ts
```

### 6. Eliminación de Biome

Se eliminaron todas las referencias y archivos de Biome:

```bash
# Desinstalar dependencia
pnpm remove @biomejs/biome

# Eliminar archivo de configuración
rm biome.json
```

### 7. Actualización de Documentación

Se actualizó el archivo `.github/copilot-instructions.md` para reflejar que el proyecto usa ESLint nuevamente:

**Cambios realizados**:

- Sección "Herramientas de Desarrollo": Se reemplazó "Biome v2.2.3" por "ESLint con eslint-config-next"
- Sección "Estándares de Calidad": Se reemplazaron referencias a Biome por ESLint
- Sección "Testing y Calidad": Se actualizó "Biome v2.2.3 configurado" a "ESLint + Prettier configurado"
- Se eliminaron referencias a archivos de instrucciones de Biome que ya no existen

## Estado Actual

### Herramientas de Linting y Formateo

**Linting**: ESLint con configuración de Next.js

- Archivo de configuración: `eslint.config.mjs`
- Comando: `pnpm lint`
- Comando de auto-corrección: `pnpm lint:fix`

**Formateo**: Prettier

- Comando: `pnpm format`
- Se ejecuta automáticamente en pre-commit hooks

### Reglas Principales de ESLint

1. **`@typescript-eslint/no-explicit-any`**: Error - Prohibido tipo `any`
2. **`@typescript-eslint/no-unused-vars`**: Warning - Variables/parámetros no utilizados (ignorando `_` prefix)
3. **`react/no-unescaped-entities`**: Warning - Entidades HTML sin escapar
4. **`react-hooks/exhaustive-deps`**: Warning - Dependencies array de hooks

### Archivos Creados/Restaurados

- ✅ `eslint.config.mjs` - Configuración de ESLint
- ✅ `.eslintignore` - Archivos/carpetas ignorados por ESLint

### Archivos Eliminados

- ❌ `biome.json` - Configuración de Biome
- ❌ Dependencia `@biomejs/biome` del proyecto

## Verificación del Funcionamiento

Para verificar que ESLint funciona correctamente:

```bash
# Ejecutar linting
pnpm lint

# Ejecutar linting con auto-corrección
pnpm lint:fix

# Ejecutar formateo
pnpm format
```

## Lecciones Aprendidas

1. **Madurez de la herramienta**: Aunque Biome es más rápido, ESLint tiene mejor compatibilidad con el ecosistema de Next.js 15
2. **Ecosistema establecido**: ESLint tiene mejor soporte de la comunidad y más recursos de resolución de problemas
3. **Integración con Next.js**: `next lint` proporciona una experiencia integrada y optimizada
4. **Estabilidad sobre velocidad**: Es preferible tener un linter estable que funcione correctamente aunque sea más lento

## Recomendaciones Futuras

1. **Mantener ESLint actualizado**: Ejecutar regularmente `pnpm update eslint eslint-config-next`
2. **Revisar nuevas reglas**: Estar al día con las actualizaciones de eslint-config-next
3. **Configurar editor**: Instalar extensión de ESLint en VS Code para linting en tiempo real
4. **Evaluar Biome en el futuro**: Considerar Biome nuevamente cuando tenga mejor compatibilidad con Next.js 15

## Conclusión

La reversión de Biome a ESLint se completó exitosamente, restaurando la configuración de linting que ya había sido probada en el proyecto. Esto asegura la estabilidad del proceso de desarrollo y elimina los problemas que estaban surgiendo con Biome.

El proyecto ahora usa:

- **ESLint** como linter principal con configuración de Next.js
- **Prettier** para formateo de código
- **lint-staged** para validación pre-commit

Esta configuración es estable, bien soportada y completamente compatible con Next.js 15 y el stack tecnológico del proyecto WebCode.

---

**Nota**: Para más información sobre la migración original de ESLint a Biome, consultar el documento `14-DESARROLLO-migracion-eslint-biome.md`.
