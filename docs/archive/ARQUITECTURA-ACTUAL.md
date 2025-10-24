# 🏗️ Arquitectura Actual del Proyecto WEBCODE

> **Última actualización**: 15 Octubre 2025  
> **Versión**: 1.0.0  
> Documentación completa de la arquitectura, componentes, y estructura del proyecto

---

## 📋 Tabla de Contenidos

- [Resumen Ejecutivo](#resumen-ejecutivo)
- [Estructura de Directorios](#estructura-de-directorios)
- [Arquitectura de Componentes](#arquitectura-de-componentes)
- [Páginas y Rutas](#páginas-y-rutas)
- [Sistema de Diseño](#sistema-de-diseño)
- [Integracións Externas](#integraciones-externas)
- [Flujo de Datos](#flujo-de-datos)

---

## 🎯 Resumen Ejecutivo

WEBCODE es una aplicación Next.js 15 construida con arquitectura moderna de React 19, utilizando Server Components por defecto y Client Components solo cuando es necesario. El proyecto sigue principios de colocación cercana (colocation) y mantiene una separación clara entre componentes de UI, lógica de negocio, y features específicas.

### Características Clave

- **Next.js 15.5.2** con App Router
- **React 19.1.0** con Server Components
- **TypeScript estricto** para type-safety
- **Tailwind CSS 4.x** con sistema de diseño personalizado
- **Sistema WAS** (WebCode Animation System)
- **Lucide React** para iconografía
- **Notion API** como CMS para el blog

---

## 📁 Estructura de Directorios

```
webcode/
├── src/
│   ├── app/                          # App Router - Páginas y rutas
│   │   ├── (cookies)/                # Route group - Páginas legales
│   │   │   ├── cookies/
│   │   │   ├── politica-privacidad/
│   │   │   └── terms/
│   │   ├── about/                    # Página About
│   │   ├── api/                      # API Routes
│   │   │   ├── briefing/
│   │   │   ├── contact/
│   │   │   └── image-proxy/
│   │   ├── blog/                     # Blog con Notion CMS
│   │   │   ├── [slug]/
│   │   │   └── tag/[tag]/
│   │   ├── briefing/                 # Sistema de briefing
│   │   │   └── formulario/
│   │   ├── contacto/                 # Página de contacto
│   │   ├── faqs/                     # FAQs
│   │   ├── portfolio/                # Portfolio (en desarrollo)
│   │   ├── proceso/                  # Proceso de trabajo
│   │   ├── servicios/                # Servicios
│   │   ├── soluciones/               # Soluciones específicas
│   │   │   ├── consulting/
│   │   │   ├── e-commerce/
│   │   │   ├── landing-pages/
│   │   │   ├── reservas/
│   │   │   ├── seo/
│   │   │   └── web-development/
│   │   ├── globals.css               # Estilos globales y variables
│   │   ├── layout.tsx                # Layout raíz
│   │   └── page.tsx                  # Landing page principal
│   │
│   ├── components/                   # Componentes compartidos
│   │   ├── animations/               # Sistema WAS
│   │   │   ├── ws-fade-in.tsx
│   │   │   ├── ws-hover.tsx
│   │   │   ├── ws-image-reveal.tsx
│   │   │   └── ws-letter-reveal.tsx
│   │   ├── blog/                     # Componentes de blog
│   │   │   ├── BlogCategoriesCard.tsx
│   │   │   ├── BlogPostCard.tsx
│   │   │   ├── MarkdownRenderer.tsx
│   │   │   └── NotionImage.tsx
│   │   ├── briefing/                 # Componentes de briefing
│   │   │   ├── BriefingBenefits.tsx
│   │   │   ├── BriefingCategories.tsx
│   │   │   ├── BriefingForm.tsx
│   │   │   └── BriefingPhases.tsx
│   │   ├── faq/                      # Componentes FAQ
│   │   │   ├── FAQItem.tsx
│   │   │   └── MudanzasCard.tsx
│   │   ├── features/                 # Features complejas
│   │   │   └── contact/
│   │   │       └── ContactForm.tsx
│   │   ├── landing/                  # Componentes de landing
│   │   │   ├── hero/                 # Hero section
│   │   │   │   ├── Hero.CallToAction.tsx
│   │   │   │   ├── Hero.CloudLightningBackground.tsx
│   │   │   │   ├── Hero.Content.tsx
│   │   │   │   ├── Hero.HeaderNavigation.tsx
│   │   │   │   ├── Hero.ThemeToggle.tsx
│   │   │   │   ├── Hero.TrustIndicators.tsx
│   │   │   │   ├── Hero.ValuePropsGrid.tsx
│   │   │   │   ├── Hero.WavesBackground.tsx
│   │   │   │   └── HeroSection.tsx
│   │   │   ├── services/             # Services section
│   │   │   │   ├── Services.Card.tsx
│   │   │   │   ├── Services.Header.tsx
│   │   │   │   └── ServicesSection.tsx
│   │   │   ├── Footer.Section.tsx
│   │   │   └── AnimatedLogo.tsx
│   │   ├── layouts/                  # Layout components
│   │   │   └── SectionLayout.tsx
│   │   ├── magicui/                  # Magic UI components
│   │   │   ├── blur-fade.tsx
│   │   │   └── border-beam.tsx
│   │   ├── proceso/                  # Proceso components
│   │   │   ├── CommunicationChannels.tsx
│   │   │   ├── PhaseDetails.tsx
│   │   │   ├── PhaseTimeline.tsx
│   │   │   └── QualityGuarantees.tsx
│   │   ├── seo/                      # SEO components
│   │   │   ├── ArticleSchema.tsx
│   │   │   ├── BreadcrumbSchema.tsx
│   │   │   ├── FAQStructuredData.tsx
│   │   │   ├── PerformanceOptimizations.tsx
│   │   │   └── StructuredData.tsx
│   │   ├── soluciones/               # Soluciones components
│   │   │   ├── EyeFollowButton.tsx
│   │   │   └── SolucionCard.tsx
│   │   └── ui/                       # Base UI components (shadcn/ui)
│   │       ├── accordion.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       ├── select.tsx
│   │       └── ... (20+ componentes)
│   │
│   ├── contexts/                     # React Contexts
│   │   └── AnimationContext.tsx      # Context del Sistema WAS
│   │
│   ├── hooks/                        # Custom Hooks
│   │   ├── useAnimationContext.ts
│   │   ├── useInView.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useMediaQuery.ts
│   │   ├── useReducedMotion.ts
│   │   ├── useScrollPosition.ts
│   │   ├── useTheme.ts
│   │   └── ... (12 hooks totales)
│   │
│   ├── lib/                          # Utilidades y helpers
│   │   ├── notion/                   # Notion API integration
│   │   │   ├── client.ts
│   │   │   ├── queries.ts
│   │   │   └── types.ts
│   │   ├── utils.ts                  # Utilidades generales
│   │   ├── validators.ts             # Esquemas Zod
│   │   ├── email.ts                  # Email services
│   │   ├── seo-metadata.ts           # SEO helpers
│   │   └── web-vitals.ts             # Performance monitoring
│   │
│   └── types/                        # TypeScript Types
│       ├── index.ts
│       ├── blog.ts
│       └── notion.ts
│
├── docs/                             # Documentación completa
├── public/                           # Assets estáticos
│   ├── images/
│   ├── icons/
│   └── favicons/
├── scripts/                          # Scripts de utilidad
└── tests/                            # Tests
    ├── performance/
    └── playwright/
```

---

## 🧩 Arquitectura de Componentes

### Principios de Organización

1. **Colocación Cercana (Colocation)**: Componentes específicos de una página se colocan en carpetas cercanas a donde se usan
2. **Named Exports**: Todos los componentes reutilizables usan named exports para mejor tree-shaking
3. **Server Components First**: Por defecto todos son Server Components, `'use client'` solo cuando sea necesario
4. **Separación de Concerns**: UI, lógica de negocio, y datos están separados

### Jerarquía de Componentes

```
┌─────────────────────────────────────────┐
│            Layout (Root)                │
│  - HeaderNavigation                     │
│  - DefaultBackground                    │
│  - ThemeProvider                        │
│  - AnimationProvider                    │
└─────────────────────────────────────────┘
                  │
    ┌─────────────┴─────────────┐
    │                           │
┌───▼────┐                 ┌────▼─────┐
│  Page  │                 │  Footer  │
│  Main  │                 │          │
└───┬────┘                 └──────────┘
    │
    ├── HeroSection
    │   ├── Hero.Content
    │   ├── Hero.CallToAction
    │   ├── Hero.ValuePropsGrid
    │   ├── Hero.WavesBackground
    │   └── Hero.TrustIndicators
    │
    ├── ServicesSection
    │   ├── Services.Header
    │   └── Services.Card[]
    │
    └── ... otras secciones
```

### Tipos de Componentes

#### 1. Componentes de UI Base (src/components/ui/)

Componentes atómicos reutilizables basados en shadcn/ui:

- **Button**: Botones con variantes
- **Card**: Contenedores con estilos
- **Input**: Campos de entrada
- **Dialog**: Modales
- **Form**: Formularios con validación
- **Badge**: Etiquetas y tags
- **Accordion**: Contenido expandible

**Características**:

- Altamente reutilizables
- Basados en Radix UI
- Styled con Tailwind CSS
- Variantes con class-variance-authority
- Completamente accesibles

#### 2. Componentes de Features (src/components/features/)

Componentes con lógica de negocio específica:

- **ContactForm**: Formulario de contacto con validación Zod
- Más features en desarrollo

**Características**:

- Contienen lógica de negocio
- Integran múltiples componentes de UI
- Manejan estados complejos
- Validación y error handling

#### 3. Componentes de Landing (src/components/landing/)

Componentes específicos para la landing page:

- **Hero Section**: Primera impresión con CTAs
- **Services Section**: Grid de servicios
- **Footer**: Pie de página con enlaces

**Características**:

- Optimizados para conversión
- Animaciones del Sistema WAS
- Responsive design
- SEO optimizado

#### 4. Componentes de Animación (src/components/animations/)

Sistema WAS (WebCode Animation System):

- **ws-fade-in**: Fade in animado
- **ws-hover**: Efectos hover
- **ws-image-reveal**: Revelación de imágenes
- **ws-letter-reveal**: Animación de texto

**Características**:

- Performance optimizado
- Respeta prefers-reduced-motion
- Basado en Framer Motion
- Configurable y reutilizable

#### 5. Componentes SEO (src/components/seo/)

Componentes para optimización SEO:

- **StructuredData**: JSON-LD schemas
- **ArticleSchema**: Schema para artículos
- **BreadcrumbSchema**: Breadcrumbs
- **FAQStructuredData**: Schema FAQ

---

## 🗺️ Páginas y Rutas

### Rutas Públicas

| Ruta                   | Descripción            | Componente Principal               |
| ---------------------- | ---------------------- | ---------------------------------- |
| `/`                    | Landing page principal | `app/page.tsx`                     |
| `/about`               | Sobre nosotros         | `app/about/page.tsx`               |
| `/servicios`           | Servicios ofrecidos    | `app/servicios/page.tsx`           |
| `/proceso`             | Proceso de trabajo     | `app/proceso/page.tsx`             |
| `/soluciones`          | Hub de soluciones      | `app/soluciones/page.tsx`          |
| `/soluciones/[tipo]`   | Soluciones específicas | `app/soluciones/[tipo]/page.tsx`   |
| `/blog`                | Lista de posts         | `app/blog/page.tsx`                |
| `/blog/[slug]`         | Post individual        | `app/blog/[slug]/page.tsx`         |
| `/blog/tag/[tag]`      | Posts por tag          | `app/blog/tag/[tag]/page.tsx`      |
| `/briefing`            | Briefing principal     | `app/briefing/page.tsx`            |
| `/briefing/formulario` | Formulario briefing    | `app/briefing/formulario/page.tsx` |
| `/contacto`            | Contacto               | `app/contacto/page.tsx`            |
| `/faqs`                | Preguntas frecuentes   | `app/faqs/page.tsx`                |

### API Routes

| Endpoint                 | Método | Descripción                     |
| ------------------------ | ------ | ------------------------------- |
| `/api/contact`           | POST   | Envío de formulario de contacto |
| `/api/briefing`          | POST   | Envío de briefing               |
| `/api/briefing/download` | GET    | Descarga PDF de briefing        |

### Páginas Legales

- `/cookies` - Política de cookies
- `/politica-privacidad` - Política de privacidad
- `/terms` - Términos y condiciones

---

## 🎨 Sistema de Diseño

### Colores del Tema

Definidos en `src/app/globals.css`:

```css
:root {
  /* Primary - Rosa */
  --primary: oklch(0.57 0.2 328.5); /* #dc7cb3 */
  --primary-foreground: oklch(0.98 0 0);
  --primary-rgb: 220, 124, 179;

  /* Secondary - Aguamarina */
  --secondary: oklch(0.43 0.18 184.1); /* #82c8d2 */
  --secondary-foreground: oklch(0.12 0 0);
  --secondary-rgb: 130, 200, 210;

  /* Accent - Púrpura */
  --accent: oklch(0.57 0.2 328.5);

  /* Sombras 3D */
  --shadow-3d-sm: 3px 3px 0px 0px oklch(0.57 0.2 328.5 / 0.6);
  --shadow-3d-md: 3px 3px 0px 0px oklch(0.57 0.2 328.5 / 0.8);
  --shadow-3d-lg: 4px 4px 0px 0px oklch(0.57 0.2 328.5 / 0.8);
}
```

### Tipografía

- **Sans**: Geist Sans (por defecto)
- **Mono**: Geist Mono (código)
- **Display**: Para títulos grandes

### Espaciado Semántico

- **Texto**: `gap-3` / `p-3` (12px)
- **Elemento**: `gap-6` / `p-6` (24px)
- **Componente**: `gap-8` / `p-8` (32px)
- **Sección**: `gap-16` / `p-16` (64px)

### Animaciones

Sistema WAS con timing functions:

```javascript
const easing = {
  smooth: [0.25, 0.46, 0.45, 0.94],
  bounce: [0.68, -0.55, 0.265, 1.55],
  elastic: [0.175, 0.885, 0.32, 1.275]
};

const duration = {
  instant: 100,
  quick: 200,
  normal: 300,
  slow: 500
};
```

---

## 🔌 Integraciones Externas

### Notion API (Blog CMS)

**Ubicación**: `src/lib/notion/`

**Funcionalidad**:

- Fetch de posts desde Notion database
- Conversión de Notion blocks a Markdown
- Sistema de tags y categorías
- Búsqueda y filtrado
- ISR con revalidación de 1 hora

**Archivos**:

- `client.ts`: Cliente de Notion API
- `queries.ts`: Queries y transformaciones
- `types.ts`: Tipos TypeScript

### Resend (Email Service)

**Ubicación**: `src/lib/email.ts`

**Funcionalidad**:

- Envío de emails de contacto
- Templates personalizados
- Validación con Zod

---

## 🔄 Flujo de Datos

### Server Components (Por Defecto)

```
User Request → Next.js Server → React Server Component
                                        ↓
                              Fetch Data (Database/API)
                                        ↓
                              Render HTML → Send to Client
```

### Client Components (Cuando sea necesario)

```
User Interaction → Client Component → Update State
                                          ↓
                                    Re-render Component
```

### API Routes

```
Client Request → API Route → Business Logic → External Service
                                                    ↓
                                            Response → Client
```

### Blog con Notion

```
Request → Next.js → Notion API → Transform Data → Cache (ISR)
                                                        ↓
                                                Render Page → User
```

---

## 📊 Performance y Optimización

### Estrategias Implementadas

1. **Server Components**: Reducción de JavaScript del cliente
2. **ISR**: Incremental Static Regeneration para blog
3. **Image Optimization**: Next.js Image component
4. **Code Splitting**: Lazy loading de componentes pesados
5. **Bundle Analysis**: Monitoreo del tamaño del bundle
6. **Web Vitals**: Monitoreo de Core Web Vitals

### Métricas Actuales

- **Lighthouse Score**: 100/100
- **LCP**: < 1.5s
- **FID**: < 50ms
- **CLS**: < 0.05
- **Bundle Size**: ~85KB gzipped

---

## 🚀 Próximos Pasos

### En Desarrollo

1. Portfolio/Casos de Éxito
2. Sistema de newsletter
3. Optimización SEO avanzada
4. Tests E2E completos

### Planificado

1. Admin dashboard
2. Sistema de reservas
3. Área de cliente
4. Integración con sistemas de pago

---

## 📚 Referencias

- **[README.md](../README.md)** - Documentación principal
- **[00-ESTADO-ACTUAL.md](./00-ESTADO-ACTUAL.md)** - Estado del proyecto
- **[02-PLANIFICACION-stack-tecnologico.md](./02-PLANIFICACION-stack-tecnologico.md)** - Stack técnico
- **[03-DISENO-guia-estilos-base.md](./03-DISENO-guia-estilos-base.md)** - Guía de estilos
- **[CONTRIBUTING.md](../CONTRIBUTING.md)** - Guía de contribución

---

**Última actualización**: 15 Octubre 2025  
**Mantenedor**: WEBCODE Team
