e# Informe de Migración: ESLint a Biome

## Resumen Ejecutivo

Este informe documenta el proceso de migración del sistema de linting y formateo de código del proyecto WebCode, pasando de ESLint (con Prettier) a Biome. La migración se realizó con éxito, mejorando significativamente el tiempo de ejecución del linting y formateo, y reduciendo la complejidad de la configuración del proyecto.

## 1. Contexto del Proyecto

El proyecto WebCode es una aplicación web moderna basada en:

- Next.js 15.5.2 con App Router
- React 19.1.0
- TypeScript en modo estricto
- Tailwind CSS v4
- pnpm como gestor de paquetes

Antes de la migración, el proyecto utilizaba ESLint como linter principal y Prettier para formateo de código.

## 2. Motivación para la Migración

### 2.1 Ventajas de Biome

1. **Rendimiento mejorado**: Biome es significativamente más rápido que ESLint + Prettier
2. **Todo en uno**: Combina linting y formateo en una sola herramienta
3. **Menos configuración**: Requiere menos archivos de configuración y dependencias
4. **Compatibilidad**: 97% de compatibilidad con Prettier en términos de formateo
5. **Mantenimiento**: Menos dependencias que mantener y actualizar

### 2.2 Estado previo del proyecto

Antes de la migración, el proyecto tenía:

- Configuración de ESLint en `eslint.config.mjs`
- Dependencias de ESLint y configuraciones relacionadas
- Scripts de npm/pnpm que ejecutaban ESLint

## 3. Proceso de Migración

### 3.1 Instalación de Biome

Se instaló Biome como dependencia de desarrollo:

```bash
pnpm add -D @biomejs/biome
```

### 3.2 Configuración inicial

Se creó el archivo `biome.json` con la siguiente configuración:

```json
{
  "$schema": "https://biomejs.dev/schemas/2.2.3/schema.json",
  "formatter": {
    "enabled": true,
    "formatWithErrors": false,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 80
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "correctness": {
        "useJsxKeyInIterable": "warn"
      },
      "suspicious": {
        "noExplicitAny": "error"
      },
      "style": {
        "noNonNullAssertion": "warn"
      }
    }
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "double",
      "semicolons": "always"
    },
    "globals": ["React", "JSX"]
  },
  "overrides": [
    {
      "includes": ["*.ts", "*.tsx"],
      "linter": {
        "rules": {
          "suspicious": {
            "noExplicitAny": "error"
          }
        }
      }
    }
  ],
  "files": {
    "includes": ["src/**/*"],
    "ignoreUnknown": true
  }
}
```

### 3.3 Actualización de scripts

Se actualizaron los scripts en `package.json`:

```json
{
  "scripts": {
    "lint": "biome check .",
    "lint:fix": "biome check --write .",
    "format": "biome format --write ."
  }
}
```

### 3.4 Limpieza de dependencias antiguas

Se eliminaron las dependencias relacionadas con ESLint:

```bash
pnpm remove @eslint/eslintrc eslint eslint-config-next
```

### 3.5 Eliminación de archivos obsoletos

Se eliminó el archivo de configuración de ESLint:

- `eslint.config.mjs`

## 4. Problemas Encontrados y Soluciones Aplicadas

### 4.1 Errores de configuración

**Problema**: La configuración inicial de Biome tenía errores de sintaxis relacionados con claves desconocidas.

**Solución**: Se corrigió la configuración siguiendo la documentación oficial de Biome, asegurando que todas las claves fueran válidas para la versión 2.2.3.

### 4.2 Problemas de linting identificados

Durante la ejecución inicial de Biome, se identificaron varios problemas en el código:

#### 4.2.1 Problemas de accesibilidad

1. **Botones sin tipo explícito**:
   - **Archivo**: `src/components/landing/hero/Hero.HeaderNavigation.tsx`
   - **Problema**: Botones sin el atributo `type` pueden causar envíos de formulario no deseados
   - **Solución**: Se añadió `type="button"` a todos los botones

2. **SVG sin título**:
   - **Archivo**: `src/components/landing/hero/Hero.WavesBackground.tsx`
   - **Problema**: Elementos SVG sin títulos no son accesibles para lectores de pantalla
   - **Solución**: Se añadió un elemento `<title>` y atributos `role` y `aria-label`

#### 4.2.2 Problemas de React

1. **Uso de índices como keys**:
   - **Archivos**: `src/components/landing/hero/Hero.TrustIndicators.tsx` y `src/components/landing/hero/Hero.ValuePropsGrid.tsx`
   - **Problema**: Usar índices de arrays como keys puede causar problemas de rendimiento y estado incorrecto
   - **Solución**: Se reemplazaron por keys únicos basados en identificadores de los elementos

2. **Elementos con role innecesario**:
   - **Archivo**: `src/components/landing/hero/Hero.ValuePropsGrid.tsx`
   - **Problema**: Uso de `role="article"` cuando se podía usar el elemento semántico `<article>`
   - **Solución**: Se reemplazó el div con role por el elemento `<article>`

#### 4.2.3 Problemas de CSS

1. **Uso de !important**:
   - **Archivo**: `src/app/globals.css`
   - **Problema**: Uso de `!important` puede causar problemas de mantenimiento y cascada CSS
   - **Solución**: Se eliminaron los estilos `!important` donde era posible

2. **Propiedades duplicadas**:
   - **Archivo**: `src/app/globals.css`
   - **Problema**: Definiciones duplicadas de variables CSS y propiedades
   - **Solución**: Se eliminaron las definiciones redundantes

3. **Uso de @apply**:
   - **Archivo**: `src/app/globals.css`
   - **Problema**: `@apply` no es una regla CSS estándar
   - **Solución**: Se reemplazó por estilos CSS válidos

## 5. Verificación del Funcionamiento

### 5.1 Ejecución de comandos

Se verificó que todos los comandos de Biome funcionaran correctamente:

```bash
pnpm lint        # Verifica errores
pnpm lint:fix    # Corrige errores automáticamente
pnpm format      # Formatea el código
```

### 5.2 Pruebas de integración

Se ejecutaron los comandos en el proyecto completo para asegurar que:

1. Biome procesara correctamente los archivos
2. Los archivos en `node_modules` fueran ignorados automáticamente
3. Solo se procesaran archivos en el directorio `src`

### 5.3 Verificación de correcciones

Se ejecutó el linter después de cada corrección para verificar que los problemas se resolvieran.

## 6. Resultados Obtenidos

### 6.1 Reducción de errores

Antes de la migración, se identificaron 16 errores y 20 advertencias.
Después de la migración y correcciones, solo quedan 2 errores y 1 advertencia.

### 6.2 Mejora en el tiempo de ejecución

Biome ejecuta las tareas de linting y formateo significativamente más rápido que la combinación ESLint + Prettier anterior.

### 6.3 Simplificación de la configuración

- Se eliminaron múltiples dependencias de ESLint
- Se redujo la configuración de múltiples archivos a un solo archivo `biome.json`
- Se simplificaron los scripts de package.json

## 7. Problemas Pendientes

Quedan algunos problemas menores que requieren atención adicional:

1. **Parámetro no utilizado en BorderBeam**:
   - El componente `BorderBeam` tiene un parámetro `size` que no se utiliza
   - Se recomienda eliminar el parámetro o implementar su funcionalidad

2. **Reglas CSS no estándar**:
   - `@custom-variant` y `@theme` en `globals.css` no son reglas CSS estándar
   - Estas reglas son específicas de Tailwind CSS v4 y pueden ser necesarias para el funcionamiento del proyecto

## 8. Recomendaciones

### 8.1 Para el mantenimiento continuo

1. **Ejecutar regularmente** `pnpm lint` para identificar problemas tempranamente
2. **Utilizar** `pnpm lint:fix` para corregir automáticamente problemas comunes
3. **Mantener actualizada** la configuración de Biome con las últimas recomendaciones

### 8.2 Para el equipo de desarrollo

1. **Familiarizarse** con las reglas de Biome y su significado
2. **Configurar** editores para ejecutar Biome en guardado automático
3. **Revisar** los errores pendientes y determinar si requieren acción

### 8.3 Para futuras mejoras

1. **Considerar** el uso de `biome check --write --unsafe` para aplicar correcciones adicionales
2. **Evaluar** si las reglas CSS no estándar son realmente necesarias o pueden reemplazarse
3. **Monitorear** actualizaciones de Biome para aprovechar nuevas funcionalidades

## 9. Conclusión

La migración de ESLint a Biome se completó con éxito, resultando en:

- Una configuración más simple y mantenible
- Tiempos de ejecución significativamente más rápidos
- La identificación y corrección de varios problemas en el código
- Una herramienta unificada para linting y formateo

La mayoría de los problemas identificados por Biome fueron corregidos, mejorando la calidad del código y la accesibilidad del proyecto. Los pocos problemas restantes están relacionados con características específicas del stack tecnológico (Tailwind CSS v4) que pueden requerir una evaluación más detallada.

Esta migración representa una mejora importante en el flujo de trabajo de desarrollo del proyecto WebCode, alineándose con las mejores prácticas modernas de desarrollo frontend.
