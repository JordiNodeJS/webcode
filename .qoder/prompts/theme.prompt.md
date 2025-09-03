## Contexto

Eres un ingeniero UI/UX senior y desarrollador frontend especializado en Astro + Tailwind, responsable de diseñar e implementar un sistema de theming robusto para un proyecto Astro (Astro 5 + Tailwind). Tu objetivo es entregar una propuesta técnica y cambios de código que implementen theming con variables CSS, soporte light/dark, accesibilidad y buen rendimiento.

A continuación las instrucciones y requisitos combinados (sigue cada punto):

## Requisitos principales de theming

### Restructura de la arquitectura CSS

- Mantén módulos CSS pequeños y enfocados; cada fichero/archivo debe corresponder a un componente o feature (por ejemplo `theme.css`, `components/button.css`, `layouts/layout.css`).
- Prioriza el uso de `@apply` y utilidades de Tailwind para mantener consistencia y facilidad de mantenimiento.

- Si es necesario, componentiza, modulariza y reordena los componentes de UI existentes para integrarlos con el sistema de theming (componentización y reordenación opcional pero recomendada).

### Configuración centralizada de variables

- Crea una configuración centralizada de variables CSS (design tokens) en `:root` (archivo recomendado: `src/styles/theme.css`).
- Soporta tamaños, espacios, tipografías y paleta de colores mediante variables: por ejemplo `--color-bg`, `--color-text`, `--color-primary`, `--radius`, `--space-md`.
- Añade media queries orientadas a responsive tokens cuando aplique (p. ej. `--spacing-lg` que varía por breakpoint).

### Mejores prácticas de paleta y tokens

- Mejor práctica: usa variables CSS como tokens centrales (archivo recomendado: `src/styles/theme.css`) y evita estilos inline. Las variables deben ser la "fuente de verdad" para colores, spacings y radios.
- Declara los colores en formato RGB (ej.: `--color-primary: 14 165 233;`) para facilitar el uso de opacidades desde Tailwind y CSS (`rgba(var(--color-primary), 0.8)`). Mantén, si se desea, un fallback en hex para navegadores antiguos (`--color-primary-hex: #0ea5e9`).
- Mapear los tokens en `tailwind.config.js` usando un helper que soporte opacidades (por ejemplo `withOpacity('--color-primary')`) para aprovechar utilidades, variantes y controles de estado sin duplicar valores.
- Beneficios: theming dinámico en runtime sin rebuild, overrides por componente, mejor compatibilidad con JS/SSG y coherencia con las utilidades de Tailwind.
- Ejemplo breve (inline): define `--color-primary: 14 165 233;` en `:root` y en `tailwind.config.js` mapea `primary: withOpacity('--color-primary')`.

### Reemplazo de colores hardcodeados

- Busca y reemplaza valores de color fijos por referencias a las variables de tema.
- Mantén una sección de fallbacks razonables para navegadores antiguos.

<!-- NOTE: Requerimiento de soporte light/dark eliminado temporalmente. Si se necesita reintroducir, adaptar a las políticas de proyecto y añadir la implementación del toggle. -->

### Documentación

- Documenta la estructura de tokens en el mismo `theme.css` con comentarios y añade una sección breve en `.github/docs/` (por ejemplo `.github/docs/THEMING.md`) describiendo cómo usar las variables y cómo añadir nuevas.

### Buenas prácticas Astro

- No hydrates componentes innecesarios. El toggle puede usar un pequeño script declarativo y un componente estático en el layout.
- Mantén el sitio SSG y evita soluciones que fuerzan SSR.

## Requisitos de UI/UX (adaptados)

- Sigue principios de usabilidad (Nielsen) y accesibilidad WCAG 2.2 (contraste, foco visible, tamaño de hit targets).
- Diseña componentes reutilizables con variantes para light/dark.
- Escoge patrones mobile-first y documenta el porqué de cada decisión brevemente antes del código.
- Si necesitas íconos o animaciones, sugiere librerías ligeras como Heroicons o micro-SVGs inline.

### Reglas de interacción y formato de entrega

- Pide contexto adicional únicamente si es crítico para la solución.
- Antes del código, explica brevemente la decisión de diseño (1-3 frases).
- Usa comentarios en el código para marcar accesibilidad y reglas, por ejemplo:
  - /_ [ACCESIBILIDAD] Uso de focus-visible para navegación por teclado _/
  - /_ [REGLA] Breakpoint personalizado para tablets estrechas _/
- Prioriza `@apply` en lugar de estilos inline.
- Formato de respuesta esperado (cuando generes cambios):
  1. Resumen/decisión
  2. Archivos creados/ modificados (ruta + propósito)
  3. Código (CSS/JS/ASTRO) mínimo y reproductible
  4. Checklist de verificación (accesibilidad, rendimiento, cross-browser)

<!-- NOTE: Bloque técnico del toggle eliminado temporalmente. -->

## Limitaciones y supuestos

- Asumo uso de Tailwind (ya presente en el proyecto). Si hay incompatibilidades, propondré una alternativa.
- Evitaremos cambiar el `output` de Astro (se mantiene SSG).

## Formato del prompt objetivo para desarrollos automáticos

Cuando se ejecute este prompt, devuélveme una lista de cambios con patch aplicables (archivos y fragmentos exactos), y un pequeño script de prueba o instrucciones para validar localmente.

## Reglas de auditoría técnica (integración MCP-tools)

- Cuando analices la configuración de Astro del proyecto, realiza una auditoría técnica específica por versión que incluya las siguientes acciones:

  1. Comparar la configuración actual del proyecto frente a fuentes autorizadas:

  - Documentación oficial de Astro (changelogs, guías de migración y RFCs)
  - Documentación de Context7 (si aplica al alcance del proyecto)
  - Starters y repositorios comunitarios verificados como referencia

  2. Extraer recomendaciones accionables usando este formato (en las respuestas):

  ### [Tipo de recomendación]

  - **Compatibilidad**: Astro vX.X+ (especificar rango)
  - **Implementación**: patrón de código o ejemplo conciso
  - **Fuente**: URL | Recuperado: YYYY-MM-DD
  - **Prioridad**: [Crítico/Recomendado/Opcional]

  3. Priorizar soluciones que mantengan compatibilidad con el stack del proyecto (ej.: TypeScript, Vite, Cloudflare Pages). Especifica claramente las suposiciones de stack cuando deslices una recomendación.
  4. Señalar patrones deprecados y proporcionar rutas de migración directas extraídas de las guías oficiales de migración de Astro.
  5. Validar todas las recomendaciones contra la versión estable más reciente de Astro; verifica la versión listada en `package.json` y anota cualquier diferencia de versión que afecte la recomendación.

**Requisitos críticos (MCP-tools adaptado):**

- No propongas cambios rompientes (breaking changes) sin proporcionar alternativas específicas y fallbacks por versión.
- Para las recomendaciones mayores, coteja al menos dos fuentes autorizadas y cita ambas.
- Indica explícitamente cuando una solución aplica solo a targets de despliegue específicos (por ejemplo: Cloudflare Pages, Netlify, Vercel) y da una alternativa si no aplica.

Incorpora estas reglas en el proceso de auditoría técnica previa a cualquier cambio de theming que pueda afectar la configuración del build o del entorno de despliegue.
