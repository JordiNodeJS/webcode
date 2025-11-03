# WEBCODE Prompts & Guidelines

> **Última actualización**: 2025-10-23  
> **Estado del Proyecto**: Release Candidate 98%  
> **Stack**: Next.js 15.5.2 + React 19.1.0 + Tailwind v4

## 📋 **Descripción**

Este directorio contiene prompts consolidados y guías de desarrollo para mantener la consistencia y calidad del proyecto WEBCODE. Los prompts han sido reorganizados y consolidados para eliminar redundancias y mejorar la usabilidad.

## 🎯 **Prompts Consolidados (Octubre 2025)**

### **1. [`desarrollo.prompt.md`](./desarrollo.prompt.md)** 🛠️

**Herramientas de Desarrollo y Testing**

Consolidación de: `herramientas-desarrollo`, `devtools`, `playwright-mcp`, `mcp-tools-nextjs`

**Contenido**:

- **Playwright MCP**: Testing E2E, screenshots, accesibilidad
- **Chrome DevTools MCP**: Performance profiling, network debugging, emulación
- **Context7 MCP**: Documentación actualizada de librerías
- **shadcn MCP**: Gestión automatizada de componentes
- **Mejores prácticas** y troubleshooting

**Cuándo usar**: Testing, debugging, análisis de performance, gestión de componentes

---

### **2. [`arquitectura-estructura.prompt.md`](./arquitectura-estructura.prompt.md)** 🏗️

**Arquitectura y Estructura de Código**

Consolidación de: `arquitectura`, `layout`

**Contenido**:

- **Next.js 15 App Router**: Principios fundamentales, Server Components
- **Layouts jerárquicos**: Root, sección, funcionalidad
- **Patrones de componentes**: Naming conventions, colocación cercana vs features
- **Route Groups**: Organización sin afectar URLs
- **Diagramas Mermaid**: Flujo de componentes y datos

**Cuándo usar**: Estructurar aplicación, organizar componentes, diseñar arquitectura

---

### **3. [`ui-styling.prompt.md`](./ui-styling.prompt.md)** 🎨

**UI/UX y Sistema de Estilos**

Consolidación de: `ui-ux`, `shadcn`, `theme`, `tailwind4-theming`

**Contenido**:

- **Sistema WebCode (WAS)**: Paleta de colores, sombras 3D, animaciones, tipografía
- **Componentes shadcn/ui**: Patrones de uso, variantes CVA
- **Tailwind CSS v4**: Mobile-first, dark mode, responsive design
- **Magic UI**: Componentes animados
- **Checklist de estilo** y accesibilidad WCAG 2.1 AA

**Cuándo usar**: Diseñar UI, aplicar estilos, crear componentes visuales

---

### **4. [`git-workflow.prompt.md`](./git-workflow.prompt.md)** 🔀

**Git Workflow y Pull Requests**

Consolidación de: `pr.prompts`, `copilot-pr-create-pr`, `pr-github-cli`

**Contenido**:

- **Conventional Commits**: Formato, tipos, scopes
- **Branching strategy**: Feature branches, workflow típico
- **Pull Requests**: GitHub CLI, templates, review checklist
- **Git hooks**: Husky, lint-staged, commitlint
- **Resolución de conflictos** y mejores prácticas

**Cuándo usar**: Commits, PRs, gestión de ramas, automatización Git

---

### **5. [`performance.prompt.md`](./performance.prompt.md)** ⚡

**Performance y Optimización**

Consolidación de: `performance-optimization`, `performance-animations-guidelines`

**Contenido**:

- **Core Web Vitals**: LCP, FID, CLS, métricas objetivo
- **Optimización de imágenes**: Next.js Image, formatos modernos, lazy loading
- **Optimización de JS**: Code splitting, tree shaking, bundle analysis
- **Animaciones performantes**: GPU-accelerated properties, will-change, reducción de movimiento
- **Caching strategies**: ISR, SSR, React Query
- **Monitoring**: Lighthouse CI, Web Vitals tracking, Chrome DevTools MCP

**Cuándo usar**: Optimizar rendimiento, mejorar Core Web Vitals, debugging de performance

---

### **6. [`next16-migration-verification.prompt.md`](./next16-migration-verification.prompt.md)** 🔄

**Verificación de Migración Next.js 15 → 16**

**Contenido**:

- **Checklist completa**: Versiones, configuración, APIs asíncronas
- **Breaking changes**: params/searchParams Promises, cookies/headers async, middleware → proxy
- **Turbopack**: Verificación como bundler predeterminado
- **Cache Components**: Revalidación, updateTag, refresh
- **Parallel Routes**: Requisito de default.tsx
- **Testing funcional**: Rutas dinámicas, Server Actions, imágenes
- **Performance**: Comparación con v15, Core Web Vitals
- **Troubleshooting**: Errores comunes y soluciones

**Cuándo usar**: Verificar migración completa a Next.js 16, validar breaking changes

---

## 📌 **Prompts Especializados**

Estos prompts se mantienen separados por su especificidad:

### [`llm.prompt.md`](./llm.prompt.md) 🤖

**Generación de archivos llms.txt**

Para crear documentación optimizada para LLMs según el estándar llmstxt.

### [`component-naming-convention.prompt.md`](./component-naming-convention.prompt.md) 📝

**Convención de Nombres de Componentes**

Sistema jerárquico: `[NombreSección].[Subsección].[Componente].tsx`

### [`hero-naming-convention.prompt.md`](./hero-naming-convention.prompt.md) 🎯

**Convención de Nombres para Hero Section**

Patrones específicos para componentes de Hero Section.

---

## 🎯 **Guía de Uso**

### **Para Desarrolladores**

1. **Antes de empezar una tarea**: Revisar prompt(s) relevante(s)
2. **Durante el desarrollo**: Seguir guidelines y patrones del prompt
3. **Antes de commit**: Verificar checklist de calidad
4. **Code review**: Usar checklist del prompt para validación

### **Para Code Reviews**

- ✅ Verificar adherencia a prompts relevantes
- ✅ Usar checklists para validación sistemática
- ✅ Comprobar métricas de performance cuando aplique
- ✅ Validar convenciones de naming

---

## 📊 **Beneficios de la Consolidación**

| Antes                | Después               | Mejora |
| -------------------- | --------------------- | ------ |
| 24 archivos          | 8 archivos            | -67%   |
| Contenido redundante | Contenido único       | 100%   |
| Difícil navegación   | Índice claro          | ✅     |
| Desactualizados      | Actualizados Oct 2025 | ✅     |

---

## 🔄 **Mantenimiento**

### **Actualizar Prompts Existentes**

Cuando se descubra un nuevo patrón o optimización:

1. Identificar prompt relevante
2. Añadir sección con ejemplo de código
3. Incluir métricas before/after si aplica
4. Actualizar este README
5. Commit: `docs(prompts): update [nombre-prompt] with [mejora]`

### **Crear Nuevos Prompts**

Solo crear nuevo prompt si:

- ✅ No encaja en ningún prompt existente
- ✅ Tiene suficiente contenido único (>200 líneas)
- ✅ Cubre un área completamente nueva

**Template**:

```markdown
# Prompt: [Título Descriptivo] - WebCode

## Contexto y Objetivo

[Explicación del propósito y alcance]

## [Sección Principal]

[Contenido estructurado con subsecciones]

## Mejores Prácticas

[Checklist de calidad]

## Troubleshooting

[Problemas comunes y soluciones]

## Referencias

[Links a documentación oficial]
```

---

## 📚 **Referencias Relacionadas**

- **Copilot Instructions**: `../.github/copilot-instructions.md`
- **Style Reference**: `../.github/WEBCODE-STYLE-REFERENCE.md`
- **Instructions**: `../.github/instructions/`
- **Support Docs**: `../.github/support/`

---

## 📝 **Historial de Cambios**

### **Octubre 2025** - Gran Reorganización

- ✅ Consolidación de 24 → 8 archivos prompts
- ✅ Eliminación de contenido redundante
- ✅ Estructura temática clara
- ✅ Mejora de navegación y búsqueda
- ✅ Actualización de contenido a Next.js 15 + React 19

### **Archivos Consolidados (Eliminados)**

- `herramientas-desarrollo`, `devtools`, `playwright-mcp`, `mcp-tools-nextjs` → `desarrollo.prompt.md`
- `arquitectura`, `layout` → `arquitectura-estructura.prompt.md`
- `ui-ux`, `shadcn`, `theme`, `tailwind4-theming` → `ui-styling.prompt.md`
- `pr.prompts`, `copilot-pr-create-pr`, `pr-github-cli` → `git-workflow.prompt.md`
- `performance-optimization`, `performance-animations-guidelines` → `performance.prompt.md`

### **Archivos Eliminados (Obsoletos)**

- `migracion-react-icons.prompt.md` - Migración completada
- `create-proceso-page.prompt.md` - Página ya implementada
- `mismatch.prompt.md` - Problema específico ya resuelto
- `politica-privacidad.prompt.md` - Contenido movido a docs

---

**Última revisión**: 2025-10-23  
**Mantenedor**: Equipo WebCode

## **[Documentación]** Historial de Prompts

| Fecha      | Prompt                                        | Descripción                              |
| ---------- | --------------------------------------------- | ---------------------------------------- |
| 2025-10-03 | `performance-animations-guidelines.prompt.md` | Guía de optimización basada en caso real |
| 2025-10-03 | `create-proceso-page.prompt.md`               | Template para página de Proceso          |

## **[Lanzamiento]** Próximos Prompts Planeados

Ideas para futuros prompts:

- [ ] Component architecture guidelines
- [ ] SEO optimization checklist
- [ ] Accessibility (a11y) standards
- [ ] Testing best practices
- [ ] API integration patterns
- [ ] Form validation standards
- [ ] Error handling guidelines

## **[Idea]** Contribuir

Para añadir un nuevo prompt:

1. Crear archivo `.prompt.md` en este directorio
2. Seguir el template sugerido
3. Añadir entrada en este README
4. Commit con mensaje descriptivo

---

**Proyecto**: WEBCODE  
**Última actualización**: 3 de Octubre de 2025  
**Mantenido por**: Equipo WEBCODE
