# WebSnack AI Development Rules

Este directorio contiene todas las reglas de codificación, instrucciones y directrices para el desarrollo de WebSnack, extraídas y consolidadas desde las carpetas `.github` y `.qoder`.

## 📁 Estructura del Directorio

### `/rules` - Reglas Específicas de Desarrollo
Contiene las reglas específicas y estándares de desarrollo del proyecto:

- **[App-Router-APIs.md](./rules/App-Router-APIs.md)** - Reglas para APIs del App Router de Next.js
- **[Form-Validation-Progressive.md](./rules/Form-Validation-Progressive.md)** - Sistema de validación progresiva de formularios
- **[Git-Squash-Tools.md](./rules/Git-Squash-Tools.md)** - Herramientas para gestión de commits con squash
- **[shadcn-Components.md](./rules/shadcn-Components.md)** - Estándares para componentes shadcn/ui
- **[Testing-Development-Tools.md](./rules/Testing-Development-Tools.md)** - Herramientas de testing y desarrollo
- **[Theming-Color-System.md](./rules/Theming-Color-System.md)** - Sistema de colores y tematización
- **[UI-UX-Design.md](./rules/UI-UX-Design.md)** - Directrices de diseño UI/UX
- **[WebSnack-Development-Standards.md](./rules/WebSnack-Development-Standards.md)** - Estándares generales de desarrollo

### `/instructions` - Instrucciones Técnicas
Instrucciones específicas para implementación técnica:

- **[app-router.instructions.md](./instructions/app-router.instructions.md)** - Instrucciones para App Router
- **[components.instructions.md](./instructions/components.instructions.md)** - Instrucciones para componentes
- **[styling.instructions.md](./instructions/styling.instructions.md)** - Instrucciones de estilizado
- **[typescript.instructions.md](./instructions/typescript.instructions.md)** - Instrucciones de TypeScript

### `/prompts` - Prompts para LLMs
Prompts especializados para diferentes aspectos del desarrollo:

- **[_template-estandar.md](./prompts/_template-estandar.md)** - Template estándar para prompts
- **[arquitectura.prompt.md](./prompts/arquitectura.prompt.md)** - Prompt de arquitectura
- **[herramientas-desarrollo.prompt.md](./prompts/herramientas-desarrollo.prompt.md)** - Prompt de herramientas
- **[layout.prompt.md](./prompts/layout.prompt.md)** - Prompt de layout
- **[llm.prompt.md](./prompts/llm.prompt.md)** - Prompt general para LLMs
- **[mcp-tools-nextjs.prompt.md](./prompts/mcp-tools-nextjs.prompt.md)** - Prompt MCP Tools Next.js
- **[politica-privacidad.prompt.md](./prompts/politica-privacidad.prompt.md)** - Prompt política de privacidad
- **[shadcn.prompt.md](./prompts/shadcn.prompt.md)** - Prompt shadcn/ui
- **[tailwind4-theming.prompt.md](./prompts/tailwind4-theming.prompt.md)** - Prompt TailwindCSS v4
- **[theme.prompt.md](./prompts/theme.prompt.md)** - Prompt de tematización
- **[ui-ux.prompt.md](./prompts/ui-ux.prompt.md)** - Prompt UI/UX

### `/docs` - Documentación de Reglas
Documentación técnica de sistemas:

- **[COLOR-SYSTEM-RULES.md](./docs/COLOR-SYSTEM-RULES.md)** - Reglas del sistema de colores
- **[THEMING.md](./docs/THEMING.md)** - Sistema de tematización

### `/support` - Archivos de Soporte
Archivos de apoyo y mejores prácticas:

- **[anti-patterns-to-avoid.md](./support/anti-patterns-to-avoid.md)** - Anti-patrones a evitar
- **[git-commit-standards.md](./support/git-commit-standards.md)** - Estándares de commits Git
- **[instructions.md](./support/instructions.md)** - Instrucciones generales
- **[magicui-animations.md](./support/magicui-animations.md)** - Animaciones Magic UI
- **[nextjs-app-router.md](./support/nextjs-app-router.md)** - Soporte App Router
- **[performance-optimization.md](./support/performance-optimization.md)** - Optimización de rendimiento
- **[pnpm-package-management.md](./support/pnpm-package-management.md)** - Gestión de paquetes pnpm
- **[project-structure.md](./support/project-structure.md)** - Estructura del proyecto
- **[shadcn-ui-components.md](./support/shadcn-ui-components.md)** - Componentes shadcn/ui
- **[tailwind-css-best-practices.md](./support/tailwind-css-best-practices.md)** - Mejores prácticas TailwindCSS
- **[typescript-best-practices.md](./support/typescript-best-practices.md)** - Mejores prácticas TypeScript
- **[websnack-unified-rules.md](./support/websnack-unified-rules.md)** - Reglas unificadas WebSnack

## 🎯 Reglas Principales

### Stack Tecnológico
- **Framework**: Next.js 15 con App Router
- **Estilizado**: TailwindCSS v4
- **Componentes**: shadcn/ui + Magic UI
- **Gestión**: pnpm como package manager
- **Validación**: Zod + React Hook Form
- **TypeScript**: Strict mode habilitado

### Estilo de Código
- Commits en inglés
- Uso de `pnpm` y `pnpm dlx` (NO usar npm)
- Estructura de archivos clara y organizada
- Componentes reutilizables y modulares

### Enfoque de Diseño
- **Estilo**: Brutalista con tonos pasteles
- **Colores**: Rosa #ff6680, Naranja #ff8f66
- **UI/UX**: Componentes Magic UI para animaciones
- **Responsive**: Mobile-first approach

## 📝 Uso

Para aplicar estas reglas:

1. **Consulta las reglas específicas** en `/rules` para el área que estés desarrollando
2. **Revisa las instrucciones** en `/instructions` para implementación técnica
3. **Utiliza los prompts** en `/prompts` para guiar el desarrollo con LLMs
4. **Sigue la documentación** en `/docs` para sistemas complejos
5. **Aplica las mejores prácticas** en `/support` para calidad de código

## 🚨 ANÁLISIS DE COHERENCIA

### ⚠️ **CONFLICTOS IDENTIFICADOS**

Se han detectado **incoherencias críticas** entre los archivos consolidados:

- **[COHERENCIA-ANALYSIS.md](./COHERENCIA-ANALYSIS.md)** - Análisis detallado de todos los conflictos encontrados
- **[UNIFIED-SOLUTIONS.md](./UNIFIED-SOLUTIONS.md)** - Soluciones propuestas para resolver las incoherencias

#### 🔥 **Conflictos Críticos Detectados:**

1. **Sistema de Colores**: 3 paletas diferentes (brutalista vs estándar)
2. **TailwindCSS v4**: Patrones incompatibles entre archivos
3. **Versiones**: Especificaciones inconsistentes
4. **Componentes**: Reglas contradictorias de organización
5. **Validación**: Diferentes enfoques para esquemas Zod

#### 🛠️ **Estado de Resolución:**
- 🚨 **Crítico**: Sistema de colores y TailwindCSS - Requiere acción inmediata
- ⚠️ **Medio**: Versiones y estructura de componentes
- 📝 **Bajo**: Patrones de validación

> **⚡ Acción Requerida**: Revisar y aprobar las soluciones unificadas antes de continuar el desarrollo.

## 🔄 Actualización

Este directorio es una extracción consolidada de:
- `.github/` (instrucciones, prompts, documentación, soporte)
- `.qoder/` (reglas específicas, instrucciones, prompts)

Para mantenerlo actualizado, sincroniza periódicamente con los directorios fuente y resuelve las incoherencias identificadas.
