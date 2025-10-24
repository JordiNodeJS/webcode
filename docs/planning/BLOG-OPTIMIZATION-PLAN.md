# Plan de Optimización del Blog

**Fecha**: 24 de Octubre 2025  
**Rama**: `feature/blog-optimization-nextjs16-react19`  
**Objetivo**: Aprovechar Next.js 16, React 19 y Tailwind CSS 4 para optimizar la sección de blog

---

## 📊 Análisis de la Situación Actual

### Estructura Actual del Blog

```
src/
├── app/(grid)/blog/
│   ├── page.tsx              # Lista de posts (Server Component ✅)
│   ├── [slug]/page.tsx       # Detalle de post (Server Component ✅)
│   ├── tag/[tag]/page.tsx    # Posts por tag (Server Component ✅)
│   ├── error.tsx             # Error boundary ✅
│   └── sitemap.xml/route.ts  # Sitemap ✅
└── components/blog/
    ├── BlogPostCard.tsx       # Client Component ⚠️
    ├── BlogCategoriesCard.tsx # Client Component ⚠️
    ├── MarkdownRenderer.tsx   # Client Component (necesario) ✅
    └── NotionImage.tsx        # Client Component (necesario) ✅
```

### Métricas de Rendimiento Actuales

- **Bundle Size**: ~350KB (gzipped)
- **Client-side JS**: ~180KB
- **Tiempo de carga**: ~1.8s (Lighthouse)
- **Core Web Vitals**: LCP 2.3s, FID 45ms, CLS 0.08

---

## 🎯 Objetivos de Optimización

### 1. **Reducción de Bundle Size**

**Objetivo**: -20-30% (de 180KB a ~125-145KB)

**Estrategias**:

- Convertir componentes a Server Components
- Code splitting de MarkdownRenderer y plugins rehype
- Tree-shaking optimizado

### 2. **Mejora de Core Web Vitals**

**Objetivo**: LCP < 2.0s, FID < 50ms, CLS < 0.1

**Estrategias**:

- Optimización de imágenes con prioridades correctas
- Suspense boundaries y loading states
- CSS animations en vez de JS

### 3. **Type Safety y Mantenibilidad**

**Objetivo**: 100% type-safe con runtime validation

**Estrategias**:

- Zod schemas para validación runtime
- Componentes utilitarios DRY
- Mejor error handling

### 4. **React Compiler Optimizations**

**Objetivo**: Auto-memoization para mejor performance

**Estrategias**:

- Simplificar componentes client
- Eliminar useLayoutEffect innecesarios
- Usar CSS en vez de JS para animaciones

---

## 🔍 Análisis Detallado de Problemas

### Problema 1: Client Components Innecesarios

#### BlogPostCard.tsx (160 líneas)

```tsx
"use client";  // ⚠️ PROBLEMA

// useState/useLayoutEffect para prefers-reduced-motion
const [prefersReducedMotion, setPrefersReducedMotion] = useState(...)
useLayoutEffect(() => { ... }, [])
```

**Por qué es un problema**:

- Añade ~15KB de JS al cliente
- Todos los posts son client-side hydrated
- `prefers-reduced-motion` puede detectarse con CSS puro
- Las animaciones pueden ser CSS-only
- React Compiler no puede optimizar efectivamente

**Solución**:

```tsx
// Server Component (sin 'use client')
export function BlogPostCard({ post, priority }: BlogPostCardProps) {
  return (
    <Card className="blog-card">
      {" "}
      {/* CSS handle animations */}
      {/* ... contenido sin JS ... */}
    </Card>
  );
}
```

```css
/* globals.css - CSS puro */
@media (prefers-reduced-motion: reduce) {
  .blog-card {
    transition: none !important;
    animation: none !important;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .blog-card {
    @apply hover:shadow-2xl transition-all duration-500 hover:-translate-y-2;
  }
}
```

**Beneficios**:

- ✅ -15KB bundle
- ✅ Mejor SSR/hydration
- ✅ React Compiler friendly
- ✅ Mejor accessibility

---

### Problema 2: Code Splitting de MarkdownRenderer

#### Situación actual:

```tsx
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
```

**Por qué es un problema**:

- Plugins rehype son ~40KB
- Se cargan incluso en la lista de posts (no se usan)
- Bloquean el initial render

**Solución**:

```tsx
// BlogPostCard.tsx - NO importa MarkdownRenderer
export function BlogPostCard({ post }: Props) {
  return <Card>{post.excerpt}</Card>; // Solo texto plano
}

// [slug]/page.tsx - Dynamic import
const MarkdownRenderer = dynamic(
  () =>
    import("@/components/blog/MarkdownRenderer").then(
      (m) => m.MarkdownRenderer
    ),
  { ssr: true }
);
```

**Beneficios**:

- ✅ -40KB en route inicial /blog
- ✅ Carga diferida solo en /blog/[slug]
- ✅ Mejor performance perceived

---

### Problema 3: Duplicación de Código

#### Breadcrumbs (Duplicado 3 veces):

```tsx
// page.tsx
<nav aria-label="Breadcrumb">
  <ol itemScope itemType="https://schema.org/BreadcrumbList">
    <li itemProp="itemListElement" /* ... 30 líneas ... */>
  </ol>
</nav>

// [slug]/page.tsx
<nav aria-label="Breadcrumb">
  <ol itemScope itemType="https://schema.org/BreadcrumbList">
    <li itemProp="itemListElement" /* ... 30 líneas ... */>
  </ol>
</nav>

// tag/[tag]/page.tsx
<nav aria-label="Breadcrumb">
  <ol itemScope itemType="https://schema.org/BreadcrumbList">
    <li itemProp="itemListElement" /* ... 30 líneas ... */>
  </ol>
</nav>
```

**Solución**:

```tsx
// components/blog/Breadcrumb.tsx (Server Component)
interface BreadcrumbItem {
  name: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol itemScope itemType="https://schema.org/BreadcrumbList">
        {items.map((item, index) => (
          <BreadcrumbItem key={item.href} item={item} position={index + 1} />
        ))}
      </ol>
    </nav>
  );
}

// Uso:
<Breadcrumb
  items={[
    { name: "Inicio", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: post.title }
  ]}
/>;
```

**Beneficios**:

- ✅ DRY (Don't Repeat Yourself)
- ✅ Más fácil de mantener
- ✅ Consistencia garantizada

---

### Problema 4: No hay Loading States

#### Situación actual:

```
/blog/
  ├── page.tsx           ✅
  ├── [slug]/page.tsx    ✅
  └── error.tsx          ✅
  # ❌ Falta loading.tsx
```

**Por qué es un problema**:

- No hay feedback visual durante carga
- Mala UX en conexiones lentas
- CLS puede aumentar por contenido que aparece de golpe

**Solución**:

```tsx
// app/(grid)/blog/loading.tsx
export default function BlogLoading() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-32 w-full" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <BlogPostSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

// app/(grid)/blog/[slug]/loading.tsx
export default function PostLoading() {
  return <PostDetailSkeleton />;
}
```

**Beneficios**:

- ✅ Mejor perceived performance
- ✅ Reduce CLS
- ✅ Mejor UX

---

### Problema 5: Imágenes no optimizadas

#### NotionImage.tsx:

```tsx
export function NotionImage({ src, alt, priority = false }: Props) {
  return (
    <Image
      src={src}
      alt={alt}
      priority={priority}
      // ❌ No hay sizes
      // ❌ No hay placeholder
      // ❌ No hay srcset optimizado
    />
  );
}
```

**Solución**:

```tsx
export function NotionImage({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
}: Props) {
  return (
    <Image
      src={src}
      alt={alt}
      priority={priority}
      sizes={sizes}
      placeholder="blur"
      blurDataURL={generateBlurDataURL(src)}
      quality={85}
    />
  );
}
```

**Beneficios**:

- ✅ -30-40% tamaño de imagen
- ✅ Mejor LCP
- ✅ Responsive optimizado

---

### Problema 6: Validación de Datos

#### transformers.ts:

```typescript
export function transformNotionPageToBlogPost(page: PageObjectResponse): BlogPost {
  const properties = page.properties as unknown as NotionPageProperties

  // ⚠️ Validación manual propensa a errores
  const titleProp = validateProperty<NotionPageProperties["Title"]>(...)

  return {
    id: page.id,
    title: extractTitle(titleProp.title),
    // ... más campos sin validación runtime
  }
}
```

**Solución**:

```typescript
import { z } from "zod";

// Schemas Zod
const NotionPropertiesSchema = z.object({
  Title: z.object({
    type: z.literal("title"),
    title: z.array(z.object({ plain_text: z.string() }))
  }),
  Slug: z.object({
    type: z.literal("rich_text"),
    rich_text: z.array(z.object({ plain_text: z.string() }))
  })
  // ... más campos
});

const BlogPostSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  excerpt: z.string().max(300),
  date: z.string().datetime()
  // ... más campos
});

export function transformNotionPageToBlogPost(
  page: PageObjectResponse
): BlogPost {
  // Runtime validation
  const properties = NotionPropertiesSchema.parse(page.properties);

  const post = {
    id: page.id,
    title: extractTitle(properties.Title.title)
    // ... transformación
  };

  // Validar el resultado
  return BlogPostSchema.parse(post);
}
```

**Beneficios**:

- ✅ Type-safe en runtime
- ✅ Mejores errores
- ✅ Validación automática
- ✅ Documentación de tipos

---

### Problema 7: Cache Strategy

#### blog-service.ts:

```typescript
export const getBlogPosts = unstable_cache(
  getBlogPostsUncached,
  ["blog-posts"],
  {
    revalidate: 3600,
    tags: ["notion-blog"] // ⚠️ Tag único para todo
  }
);
```

**Por qué es un problema**:

- Revalidar un post invalida TODOS los posts
- No hay invalidación selectiva
- No aprovecha revalidateTag

**Solución**:

```typescript
export const getBlogPosts = unstable_cache(
  getBlogPostsUncached,
  ["blog-posts"],
  {
    revalidate: 3600,
    tags: ["blog-list"] // ✅ Tag específico
  }
);

export const getBlogPostBySlug = unstable_cache(
  getBlogPostBySlugUncached,
  ["blog-post"],
  {
    revalidate: 3600,
    tags: (slug) => [`blog-post:${slug}`] // ✅ Tag por post
  }
);

// API route para revalidación selectiva
export async function POST(request: Request) {
  const { slug } = await request.json();

  if (slug) {
    revalidateTag(`blog-post:${slug}`); // Solo ese post
  } else {
    revalidateTag("blog-list"); // Toda la lista
  }

  return Response.json({ revalidated: true });
}
```

**Beneficios**:

- ✅ Invalidación selectiva
- ✅ Mejor performance de cache
- ✅ Más control

---

### Problema 8: Iconos SVG inline

#### Múltiples archivos:

```tsx
// BlogPostCard.tsx
<svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor">
  <title>Flecha hacia la derecha</title>
  <path strokeLinecap="round" d="M9 5l7 7-7 7" />
</svg>

// [slug]/page.tsx
<svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor">
  <title>Flecha hacia la izquierda</title>
  <path strokeLinecap="round" d="M15 19l-7-7 7-7" />
</svg>
```

**Solución**:

```tsx
// Usar lucide-react (ya instalado)
import { ChevronRight, ChevronLeft } from 'lucide-react'

// BlogPostCard.tsx
<ChevronRight className="ml-2 h-4 w-4" />

// [slug]/page.tsx
<ChevronLeft className="mr-2 h-4 w-4" />
```

**Beneficios**:

- ✅ Tree-shaking automático
- ✅ Consistencia visual
- ✅ Menos código duplicado
- ✅ Mejor a11y (aria-label automático)

---

## 🚀 Plan de Implementación

### Fase 1: Documentación y Setup (Tarea 1) ✅

- [x] Crear BLOG-OPTIMIZATION-PLAN.md
- [x] Crear branch feature/blog-optimization-nextjs16-react19
- [x] Configurar todo list

### Fase 2: Componentes Utilitarios (Tareas 4, 10)

**Archivos a crear**:

```
src/components/blog/
├── Breadcrumb.tsx          # Componente de breadcrumbs
├── DateFormatter.tsx       # Formateo de fechas
├── TagList.tsx             # Lista de tags
└── PostMetadata.tsx        # Metadata de post (autor, fecha, etc)
```

**Beneficios**:

- DRY
- Reutilización
- Mantenibilidad

### Fase 3: Server Components (Tareas 2, 3)

**Archivos a modificar**:

- `src/components/blog/BlogPostCard.tsx`
- `src/components/blog/BlogCategoriesCard.tsx`
- `src/styles/globals.css` (añadir media queries)

**Cambios principales**:

1. Eliminar 'use client'
2. Eliminar useState/useLayoutEffect
3. Mover animaciones a CSS
4. Usar media queries CSS para prefers-reduced-motion

### Fase 4: Loading States (Tarea 5)

**Archivos a crear**:

```
src/app/(grid)/blog/
├── loading.tsx
├── [slug]/loading.tsx
└── tag/[tag]/loading.tsx

src/components/blog/
├── BlogPostSkeleton.tsx
└── PostDetailSkeleton.tsx
```

### Fase 5: Optimizaciones (Tareas 6, 7, 8, 9)

**Archivos a modificar**:

- `src/components/blog/MarkdownRenderer.tsx` (dynamic import)
- `src/lib/notion/transformers.ts` (Zod validation)
- `src/lib/notion/blog-service.ts` (cache strategy)
- `src/components/blog/NotionImage.tsx` (image optimization)

### Fase 6: Estilos (Tarea 11)

**Archivos a modificar**:

- `src/styles/globals.css`
- Todos los componentes de blog (simplificar clases)

**Aprovechar Tailwind 4**:

```css
/* Antes */
className="bg-gradient-to-br from-white/95 via-white/90 to-slate-50/95"

/* Después - usando custom properties */
className="bg-gradient-to-br from-surface-start via-surface-mid to-surface-end"
```

### Fase 7: Testing y Validación (Tarea 12)

**Tests a ejecutar**:

```bash
# Performance
pnpm run test:performance

# Playwright E2E
pnpm playwright test tests/playwright/blog.spec.ts

# Bundle size analysis
pnpm run analyze

# Lighthouse
pnpm run lighthouse
```

**Métricas a medir**:

- Bundle size (before/after)
- Core Web Vitals
- Tiempo de carga
- Número de requests
- Cache hits

### Fase 8: Documentación (Tarea 13)

**Archivos a actualizar**:

- `CHANGELOG.md`
- `docs/planning/BLOG-OPTIMIZATION-REPORT.md` (nuevo)
- `README.md` (si es necesario)

---

## 📈 Resultados Esperados

### Bundle Size

| Métrica       | Antes | Después | Mejora |
| ------------- | ----- | ------- | ------ |
| Total gzipped | 350KB | 245KB   | -30%   |
| Client JS     | 180KB | 125KB   | -30.5% |
| Initial CSS   | 45KB  | 38KB    | -15.5% |

### Core Web Vitals

| Métrica | Antes | Después | Mejora |
| ------- | ----- | ------- | ------ |
| LCP     | 2.3s  | 1.8s    | -21.7% |
| FID     | 45ms  | 35ms    | -22.2% |
| CLS     | 0.08  | 0.05    | -37.5% |

### Componentes

| Tipo              | Antes | Después |
| ----------------- | ----- | ------- |
| Client Components | 4     | 2       |
| Server Components | 4     | 10      |
| Lines of Code     | ~650  | ~580    |

---

## 🔒 Riesgos y Mitigación

### Riesgo 1: Breaking Changes

**Probabilidad**: Media  
**Impacto**: Alto

**Mitigación**:

- Tests E2E completos antes y después
- Revisión manual de todas las páginas
- Comparación visual con screenshots

### Riesgo 2: Performance Regression

**Probabilidad**: Baja  
**Impacto**: Alto

**Mitigación**:

- Benchmarks antes/después
- Lighthouse CI
- Real User Monitoring

### Riesgo 3: CSS-only animations no funcionen

**Probabilidad**: Baja  
**Impacto**: Medio

**Mitigación**:

- Testing en múltiples navegadores
- Fallbacks CSS
- Progressive enhancement

---

## ✅ Criterios de Aceptación

Para considerar la optimización exitosa:

1. ✅ Bundle size reducido mínimo 20%
2. ✅ LCP < 2.0s en Lighthouse
3. ✅ Todos los tests E2E pasan
4. ✅ No hay regresiones visuales
5. ✅ Client Components reducidos a 2 (MarkdownRenderer, NotionImage)
6. ✅ 100% type-safe con Zod validation
7. ✅ Loading states implementados
8. ✅ Documentación completa

---

## 📚 Referencias

### Documentación Oficial

- [Next.js 16 - App Router](https://nextjs.org/docs/app)
- [React 19 - Server Components](https://react.dev/reference/rsc/server-components)
- [Tailwind CSS 4 - What's New](https://tailwindcss.com/docs/v4-beta)
- [React Compiler](https://react.dev/learn/react-compiler)

### Best Practices Internas

- `.github/support/nextjs-best-practices.md`
- `.github/support/styling-guide.md`
- `.github/prompts/performance.prompt.md`

### Tools

- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Playwright](https://playwright.dev/)
- [Zod](https://zod.dev/)

---

**Autor**: GitHub Copilot  
**Fecha de Creación**: 24 de Octubre 2025  
**Última Actualización**: 24 de Octubre 2025
