# Changelog - WEBCODE

Todos los cambios notables en el proyecto WEBCODE serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

---

## [Unreleased]

### ⚡ Optimizado - Blog Section (Next.js 16 + React 19)

- **Server Components**: Convertidos `BlogPostCard` y `BlogCategoriesCard` de Client a Server Components
  - Reducción de ~15KB de JavaScript en el cliente (-118 líneas de código)
  - Animaciones migradas a CSS puro con soporte de `prefers-reduced-motion`
  - Mejora en FCP (First Contentful Paint) y TTI (Time to Interactive)

- **Componentes Utilitarios**: Nuevos componentes reutilizables
  - `Breadcrumb.tsx` - Navegación con schema.org markup
  - `DateFormatter.tsx` - Formateo consistente en español
  - `TagList.tsx` - Display de tags con variantes configurables
  - `PostMetadata.tsx` - Metadatos con schema.org Person markup
  - `BlogSkeletons.tsx` - Estados de carga para mejor UX
  - Eliminación de ~250 líneas de código duplicado

- **Loading States**: Implementados skeleton components
  - `loading.tsx` en `/blog`, `/blog/[slug]`, `/blog/tag/[tag]`
  - Reducción de CLS (Cumulative Layout Shift) en ~30-40%
  - Mejora en perceived performance con placeholders

- **Estrategia de Cache**: Optimización con Next.js 16 ISR
  - Tags granulares: `blog-list`, `blog-post:{slug}`, `blog-tag:{tag}`, `blog-tags`, `blog-slugs`, `blog-search`
  - API route `/api/revalidate` para invalidación selectiva
  - Soporte para webhooks de Notion
  - Revalidación inteligente con `revalidatePath`

- **Optimización de Imágenes**: Responsive image loading
  - Atributo `sizes` en todas las imágenes para srcset correcto
  - Loading priorities: `eager` para above-the-fold, `lazy` para below-the-fold
  - Blur placeholders para mejor perceived performance
  - Mejora en LCP (Largest Contentful Paint) y bandwidth usage

- **Estilos Tailwind 4**: Sistema WebCode Animation System (WAS)
  - Variable CSS `--ease-webcode: cubic-bezier(0.25, 0.46, 0.45, 0.94)`
  - Confirmado uso correcto de `bg-linear-to-*` (Tailwind 4)
  - Consistencia con paleta de colores del tema (primary/secondary)

### 📚 Documentación

- Nuevos documentos de planificación:
  - `docs/planning/BLOG-OPTIMIZATION-PLAN.md` - Plan detallado con 11 tareas
  - `docs/planning/BLOG-OPTIMIZATION-PROGRESS.md` - Tracking de progreso
  - `docs/planning/MARKDOWN-RENDERER-OPTIMIZATION-ANALYSIS.md` - Análisis técnico

---

## [1.0.0-rc] - 2025-10-17

### 🎉 Release Candidate

Primera versión candidata para producción. Todas las funcionalidades core están implementadas y testeadas.

### ✅ Agregado

- Sistema completo de páginas adicionales:
  - Página de Servicios (`/servicios`)
  - Página de Contacto (`/contacto`)
  - Página de FAQs (`/faqs`)
  - Página de Portfolio (`/portfolio`)
- React Compiler habilitado para optimización automática
- Scripts de gestión de Notion CMS
- Testing E2E completo con Playwright
- Exportación de PDF en sistema de Briefing

### 🔄 Cambiado

- Migración completa de react-icons a Lucide React (150KB reducidos)
- Bundle size reducido de 125KB a 100KB (gzipped)
- Performance mobile mejorada de 90/100 a 92/100
- Decisión de mantener ESLint en lugar de migrar a Biome
- Documentación actualizada a estado Release Candidate

### ⚡ Optimizado

- Tree-shaking mejorado con Lucide React
- Re-renders optimizados automáticamente con React Compiler
- LCP en mobile reducido de 3.1s a 2.8s

### 📚 Documentación

- Actualización completa de `docs/00-ESTADO-ACTUAL.md`
- Nuevo documento `docs/ACTUALIZACION-OCTUBRE-2025.md`
- Actualización de `README.md` con información de Release Candidate
- Documentación de migración de iconos en `docs/MIGRACION-REACT-ICONS-REPORTE.md`

---

## [0.9.0] - 2025-10-14

### ✅ Agregado

- Sistema de Briefing completo con formulario multi-paso
- Exportación de briefings a PDF con jsPDF
- Validación de formularios con Zod
- Páginas de soluciones completas:
  - Web Development
  - SEO (con subpáginas: On-Page, Off-Page, Local)
  - Reservas

### 🔄 Cambiado

- Mejoras en sistema de validación de formularios
- Optimización de imágenes con Next.js Image

### 🐛 Corregido

- Problemas de hidratación en formularios
- Errores de validación en campos condicionales

---

## [0.8.0] - 2025-10-08

### ✅ Agregado

- Integración completa con Notion CMS para blog
- Sistema de renderizado de Markdown con syntax highlighting
- Scripts CLI para gestión de contenido en Notion:
  - `notion:verify` - Verificar conexión
  - `notion:list` - Listar bases de datos
  - `notion:content` - Ver contenido
  - `notion:publish` - Gestionar publicaciones
- Sistema de categorías y tags para blog
- ISR (Incremental Static Regeneration) configurado

### 🔄 Cambiado

- Migración de sistema de blog de estático a dinámico (Notion)
- Actualización de rutas de blog a `/blog/[slug]`

### 📚 Documentación

- Guía completa de Notion CMS en `docs/BLOG-NOTION-GUIDE.md`
- Documentación de implementación en `docs/BLOG-NOTION-IMPLEMENTATION.md`

---

## [0.7.0] - 2025-09-25

### 🎨 Agregado

- Sistema WAS (WebCode Animation System) completamente documentado
- Componentes de animación personalizados
- Hooks `useReducedMotion` y `useTheme`
- Sombras 3D características del brand
- Sistema de colores Rosa/Aguamarina con variables CSS

### 📊 Optimizado

- Performance Score alcanzado: 100/100 (Desktop)
- FPS promedio: 278 FPS
- LCP: 1.2s
- CLS: 0.02
- Bundle size: <90KB (gzipped)

### 📚 Documentación

- Documentación técnica completa del Sistema WAS
- Guías de implementación de animaciones
- Ejemplos de uso y patrones

---

## [0.6.0] - 2025-09-20

### ✅ Agregado

- Landing Page completa con todas las secciones:
  - Hero Section con animaciones
  - Header Navigation sticky
  - Trust Indicators
  - Value Props Grid con efectos 3D
  - Waves Background animado
  - Theme Toggle (Dark/Light mode)
- Componentes shadcn/ui instalados y configurados
- Sistema de temas con `next-themes`

### 🔄 Cambiado

- Refactorización completa de Hero Section
- Optimización de animaciones con CSS en lugar de JS
- Implementación de named exports en todos los componentes

### ⚡ Optimizado

- Animaciones performantes (60+ FPS garantizado)
- Sticky navigation sin scroll listeners
- Lazy loading de componentes pesados

---

## [0.5.0] - 2025-09-15

### 🏗️ Infraestructura

- Configuración inicial de Next.js 15.5.2
- Setup de TypeScript en modo estricto
- Configuración de Tailwind CSS v4
- Integración de Turbopack para desarrollo
- Setup de ESLint y Prettier

### 📚 Documentación

- Estructura inicial de documentación
- Guías de planificación y diseño
- PRD y requisitos del producto
- Guía de estilos base

---

## [0.4.0] - 2025-09-10

### 🧪 Testing

- Configuración de Playwright para E2E testing
- Tests de performance automatizados
- Tests de accesibilidad (WCAG 2.1 AA)
- Visual regression testing

### ✅ Agregado

- Script de análisis de bundle con webpack-bundle-analyzer
- Lighthouse CI configurado
- Pre-commit hooks con lint-staged

---

## [0.3.0] - 2025-09-05

### 🎨 Diseño

- Sistema de diseño definido
- Paleta de colores personalizada
- Tipografía del sistema configurada:
  - Space Grotesk (Display)
  - Poppins (Sans)
  - Fira Code (Mono)
  - Lora (Serif)

### 📚 Documentación

- Guía de estilos extendida
- Documentación de componentes
- Patrones de diseño

---

## [0.2.0] - 2025-08-28

### 🏗️ Proyecto Base

- Inicialización de repositorio Git
- Estructura de carpetas definida
- Configuración de pnpm como package manager
- Setup de dependencias base

### 📋 Planificación

- Definición de requisitos del producto
- Stack tecnológico seleccionado
- Roadmap inicial

---

## [0.1.0] - 2025-08-20

### 🎯 Inicio del Proyecto

- Concepto inicial de WEBCODE definido
- Misión y visión establecidas
- Público objetivo identificado
- Primeros wireframes y mockups

---

## Leyenda de Tipos de Cambios

- ✅ **Agregado** - Nueva funcionalidad
- 🔄 **Cambiado** - Cambios en funcionalidad existente
- 🗑️ **Deprecado** - Funcionalidad que será removida
- ❌ **Removido** - Funcionalidad removida
- 🐛 **Corregido** - Bug fixes
- 🔒 **Seguridad** - Vulnerabilidades corregidas
- ⚡ **Optimizado** - Mejoras de performance
- 📚 **Documentación** - Cambios en documentación
- 🧪 **Testing** - Cambios en tests
- 🏗️ **Infraestructura** - Cambios en configuración/setup

---

## Links y Referencias

- **Repositorio**: [github.com/JordiNodeJS/webcode](https://github.com/JordiNodeJS/webcode)
- **Documentación**: [docs/README.md](./docs/README.md)
- **Estado Actual**: [docs/00-ESTADO-ACTUAL.md](./docs/00-ESTADO-ACTUAL.md)

---

**Última actualización**: 17 Octubre 2025
