# Layout Components

Componentes reutilizables para layouts de página que garantizan espaciado consistente y evitan overlap con el navbar.

## HTML Semántico

Todos los componentes PageWrapper usan **elementos HTML semánticos** por defecto:

- **`<main>`**: Elemento exterior que contiene el contenido principal de la página
- **`<article>`**: Para páginas de contenido (ContentPage)
- **`<section>`**: Para secciones hero y páginas grid (HeroSection, GridPage)

Esto mejora:
- ✅ **Accesibilidad**: Lectores de pantalla pueden navegar mejor
- ✅ **SEO**: Los motores de búsqueda entienden mejor la estructura
- ✅ **Semántica**: Código más limpio y mantenible

### Estructura HTML generada

```html
<!-- ContentPage -->
<main class="min-h-screen">
  <article class="pt-24 pb-20 px-4">
    <div class="container mx-auto max-w-4xl">
      <!-- Tu contenido -->
    </div>
  </article>
</main>

<!-- HeroSection -->
<main class="min-h-screen">
  <section class="pt-24 pb-20 md:pb-32" style="background: ...">
    <div class="container mx-auto max-w-6xl">
      <!-- Tu contenido -->
    </div>
  </section>
</main>

<!-- GridPage -->
<main class="min-h-screen">
  <section class="pt-24 pb-20 px-4">
    <div class="container mx-auto max-w-4xl">
      <!-- Tu contenido -->
    </div>
  </section>
</main>
```

### Personalizar elementos HTML

Todos los componentes aceptan las props `as` y `sectionAs` para customizar los elementos:

```tsx
// Usar <div> en vez de <main> (si la página ya tiene un <main>)
<ContentPage as="div" sectionAs="div">
  {/* contenido */}
</ContentPage>

// Usar <section> en vez de <article>
<ContentPage sectionAs="section">
  {/* contenido */}
</ContentPage>
```

## Componentes Disponibles

### ContentPage

Para páginas de contenido simple con ancho máximo restringido.

**HTML generado**: `<main>` → `<article>` → contenido

**Uso:**
```tsx
import { ContentPage } from "@/components/layout";

export default function MyPage() {
  return (
    <ContentPage>
      <h1>Título de la Página</h1>
      <p>Contenido...</p>
    </ContentPage>
  );
}
```

**Cuándo usar:**
- Páginas de contenido estático (About, Contact, etc.)
- Páginas con formularios
- Páginas con texto largo que necesitan buena legibilidad

**Características:**
- `max-width: max-w-4xl` (por defecto)
- `pt-24` (96px top padding)
- `pb-20` (80px bottom padding)

### HeroSection

Para secciones hero con backgrounds gradientes.

**Uso:**
```tsx
import { HeroSection } from "@/components/layout";

export default function MyPage() {
  const gradient = `linear-gradient(
    to_right,
    rgb(var(--primary-rgb)_/_0.03),
    rgb(var(--secondary-rgb)_/_0.03)
  )`;
  
  return (
    <HeroSection gradient={gradient}>
      <div className="max-w-3xl">
        <h1>Título Hero</h1>
        <p>Descripción...</p>
      </div>
    </HeroSection>
  );
}
```

**Cuándo usar:**
- Páginas de soluciones/servicios
- Landing pages
- Páginas con hero visual prominente

**Características:**
- `max-width: max-w-6xl` (por defecto)
- `pt-24` (96px top padding)
- `pb-20 md:pb-32` (responsive bottom padding)
- Soporte para gradientes CSS
- `overflow-hidden` automático

### GridPage

Para páginas con layouts de grid (blog, FAQs, galerías).

**Uso:**
```tsx
import { GridPage } from "@/components/layout";

export default function MyPage() {
  return (
    <GridPage maxWidth="max-w-6xl">
      <div className="text-center mb-16">
        <h1>Título</h1>
        <p>Descripción</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map(item => <Card key={item.id} {...item} />)}
      </div>
    </GridPage>
  );
}
```

**Cuándo usar:**
- Blog con lista de posts
- Página de FAQs
- Galerías de proyectos/portfolio
- Listados de productos/servicios

**Características:**
- `max-width: max-w-4xl` (por defecto, configurable)
- `pt-24` (96px top padding)
- `pb-20` (80px bottom padding)

### PageWrapper (Base)

Componente base configurable para casos especiales.

**Uso:**
```tsx
import { PageWrapper } from "@/components/layout";

export default function MyPage() {
  return (
    <PageWrapper
      variant="content"
      maxWidth="max-w-6xl"
      containerClassName="pb-32"
      overflow={true}
    >
      {/* contenido personalizado */}
    </PageWrapper>
  );
}
```

**Cuándo usar:**
- Cuando necesitas combinaciones únicas de props
- Páginas con layouts custom que no encajan en otros componentes
- Prototipado rápido antes de crear un componente especializado

## Props Comunes

Todos los componentes aceptan:

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `children` | `ReactNode` | requerido | Contenido de la página |
| `className` | `string` | undefined | Clases CSS para el wrapper exterior |
| `containerClassName` | `string` | undefined | Clases CSS para el contenedor |
| `maxWidth` | `'max-w-4xl' \| 'max-w-6xl' \| 'max-w-7xl'` | depende del variante | Ancho máximo del contenedor |

## Props Específicos de PageWrapper

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `variant` | `'hero' \| 'content' \| 'full-width' \| 'grid'` | `'content'` | Variante de layout |
| `gradient` | `string` | undefined | Background gradient CSS (solo hero) |
| `overflow` | `boolean` | false | Aplicar overflow-hidden |
| `relative` | `boolean` | true | Aplicar position-relative |

## Ejemplos de Uso

### Ejemplo 1: Página de Contacto Simple

```tsx
// src/app/contacto/page.tsx
import { ContentPage } from "@/components/layout";
import { ContactForm } from "@/components/features/contact/ContactForm";

export default function ContactoPage() {
  return (
    <ContentPage containerClassName="pb-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">Contacta con nosotros</h1>
        <p className="text-muted-foreground mt-3">
          Estamos aquí para ayudarte
        </p>
      </div>
      
      <ContactForm />
    </ContentPage>
  );
}
```

### Ejemplo 2: Página Hero con Gradient

```tsx
// src/app/soluciones/web-development/page.tsx
import { HeroSection } from "@/components/layout";
import { Button } from "@/components/ui/button";

export default function WebDevelopmentPage() {
  const gradient = `linear-gradient(
    to_right,
    rgb(var(--primary-rgb)_/_0.03),
    rgb(var(--secondary-rgb)_/_0.03)
  )`;
  
  return (
    <>
      <HeroSection gradient={gradient} maxWidth="max-w-6xl">
        <div className="max-w-3xl">
          <div className="inline-block mb-6 px-6 py-2 bg-primary/10 rounded-full">
            Desarrollo Web
          </div>
          
          <h1 className="text-5xl font-bold mb-6">
            Sitios Web Profesionales
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            Creamos experiencias digitales excepcionales
          </p>
          
          <div className="flex gap-4">
            <Button size="lg">Solicitar Presupuesto</Button>
            <Button size="lg" variant="outline">Ver Portfolio</Button>
          </div>
        </div>
      </HeroSection>
      
      {/* Resto de secciones fuera del HeroSection */}
      <section className="py-20">
        {/* contenido adicional */}
      </section>
    </>
  );
}
```

### Ejemplo 3: Página de Blog con Grid

```tsx
// src/app/blog/page.tsx
import { GridPage } from "@/components/layout";
import { BlogPostCard } from "@/components/blog/BlogPostCard";

export default function BlogPage({ posts }) {
  return (
    <GridPage maxWidth="max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">Blog</h1>
        <p className="text-xl text-muted-foreground">
          Artículos sobre desarrollo web y tecnología
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </GridPage>
  );
}
```

### Ejemplo 4: Layout Personalizado

```tsx
// Cuando necesitas algo único
import { PageWrapper } from "@/components/layout";

export default function CustomPage() {
  return (
    <PageWrapper
      variant="full-width"
      overflow={true}
      containerClassName="pb-0"
    >
      <div className="w-full h-screen flex items-center justify-center">
        {/* Contenido de altura completa */}
      </div>
    </PageWrapper>
  );
}
```

## Patrón de Migración

### Antes (código duplicado):
```tsx
export default function MyPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1>Título</h1>
        {/* contenido */}
      </div>
    </div>
  );
}
```

### Después (usando PageWrapper):
```tsx
import { ContentPage } from "@/components/layout";

export default function MyPage() {
  return (
    <ContentPage>
      <h1>Título</h1>
      {/* contenido */}
    </ContentPage>
  );
}
```

## Ventajas

✅ **Consistencia**: Spacing uniforme en todas las páginas
✅ **Mantenibilidad**: Cambios centralizados en un solo lugar
✅ **DRY**: No repetir código de layout
✅ **Type-safe**: Props con TypeScript
✅ **Flexible**: Fácil de extender y personalizar
✅ **Documentado**: Props claros y ejemplos de uso

## Testing

Todos los componentes garantizan:
- ✓ `pt-24` (96px) top padding para evitar overlap con navbar
- ✓ Responsive bottom padding
- ✓ Container widths apropiados
- ✓ Funcionamiento en light/dark mode

## Notas de Desarrollo

- Los componentes usan `cn()` de `@/lib/utils` para combinar clases
- Todos aplican `min-h-screen` automáticamente
- Los gradientes se aplican mediante inline styles para flexibilidad
- Compatible con Tailwind CSS v4

## Próximos Pasos

Para refactorizar páginas existentes:

1. Identificar el tipo de página (content, hero, grid)
2. Importar el componente apropiado
3. Envolver el contenido existente
4. Remover clases de spacing manual
5. Verificar con DevTools

