# Layout Patterns - Next.js 15 con Route Groups

## Resumen

Este proyecto usa **Layouts nativos de Next.js 15** con **Route Groups** para estandarizar la estructura de todas las páginas.

## Problema Resuelto

### Antes

- Código duplicado en cada página (`pt-24`, `container`, `max-w-*`)
- 25+ páginas con spacing manual
- Inconsistencias entre páginas
- Difícil de mantener

### Después

- Layouts automáticos con Route Groups
- 3 layouts base para toda la aplicación
- Cero repetición de código
- Fácil de mantener y escalar

## Arquitectura

### Route Groups

```
app/
├── (content)/     → Páginas de contenido simple
├── (hero)/        → Páginas con hero prominente
└── (grid)/        → Páginas de listados/grids
```

**Route Groups** (carpetas con paréntesis) organizan páginas sin afectar sus URLs:

- `app/(content)/about/page.tsx` → URL: `/about` ✅
- `app/(hero)/proceso/page.tsx` → URL: `/proceso` ✅
- `app/(grid)/blog/page.tsx` → URL: `/blog` ✅

### Layouts por Route Group

#### 1. ContentLayout - Contenido Simple

**Ubicación**: `src/components/layouts/ContentLayout.tsx`

```tsx
export function ContentLayout({ children }) {
  return (
    <article className="min-h-screen pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">{children}</div>
    </article>
  );
}
```

**Usado en**: `app/(content)/layout.tsx`

**Páginas**:

- `/about`
- `/contacto`
- `/servicios`

**Características**:

- HTML: `<article>` semántico
- Spacing: `pt-24` (96px para navbar)
- Max width: `max-w-4xl` (896px)
- Padding: `px-4` responsive

#### 2. HeroLayout - Marketing/Hero

**Ubicación**: `src/components/layouts/HeroLayout.tsx`

```tsx
export function HeroLayout({ children }) {
  return <div className="min-h-screen">{children}</div>;
}
```

**Usado en**: `app/(hero)/layout.tsx`

**Páginas**:

- `/soluciones` y todas sus subpáginas
- `/proceso`
- `/briefing`

**Características**:

- Wrapper mínimo
- Las páginas manejan su propio spacing y gradientes
- Flexibilidad máxima para heros personalizados

#### 3. GridLayout - Listados/Blog

**Ubicación**: `src/components/layouts/GridLayout.tsx`

```tsx
export function GridLayout({ children }) {
  return (
    <section className="min-h-screen pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
```

**Usado en**: `app/(grid)/layout.tsx`

**Páginas**:

- `/blog`
- `/faqs`
- `/portfolio`

**Características**:

- HTML: `<section>` semántico
- Spacing: `pt-24` (96px para navbar)
- Max width: `max-w-6xl` (1152px - más ancho para grids)
- Padding: `px-4` responsive

## HTML Semántico

### Estructura Completa

```html
<body>
  <div class="min-h-screen flex flex-col">
    <HeaderNavigation />

    <main class="flex-1">
      <!-- Layout automático según route group -->

      <!-- (content)/ → <article> -->
      <article class="min-h-screen pt-24 pb-20 px-4">
        <div class="container mx-auto max-w-4xl">
          <!-- Contenido de la página -->
        </div>
      </article>

      <!-- (grid)/ → <section> -->
      <section class="min-h-screen pt-24 pb-20 px-4">
        <div class="container mx-auto max-w-6xl">
          <!-- Contenido de la página -->
        </div>
      </section>

      <!-- (hero)/ → <div> (páginas controlan su HTML) -->
      <div class="min-h-screen">
        <section class="pt-24 pb-20 ...">
          <!-- Hero section -->
        </section>
      </div>
    </main>

    <FooterSection />
  </div>
</body>
```

### Elementos Semánticos

- `<main>`: Contenido principal (del layout raíz)
- `<article>`: Contenido independiente (about, contacto, etc.)
- `<section>`: Secciones temáticas (blog, faqs, heros)
- `<header>`: Encabezados de secciones
- `<nav>`: Navegación principal

## Spacing Estándar

### Navbar Spacing

**Problema**: Navbar fixed en `top-0` → contenido debe empezar debajo

**Solución**: `pt-24` (96px) en todos los layouts

```css
/* pt-24 = 6rem = 96px */
padding-top: 6rem;
```

### Bottom Spacing

**Content/Grid**: `pb-20` (80px) fijo
**Hero**: `pb-20 md:pb-32` (80px móvil, 128px desktop)

### Horizontal Spacing

**Todos**: `px-4` (16px) responsive

- Mobile: 16px padding
- Desktop: Mantenido por `container`

## Max Widths

### Por Tipo de Página

| Tipo    | Max Width   | Pixels | Uso                       |
| ------- | ----------- | ------ | ------------------------- |
| Content | `max-w-4xl` | 896px  | Páginas de contenido      |
| Grid    | `max-w-6xl` | 1152px | Listados, blog            |
| Hero    | `max-w-6xl` | 1152px | Heros (dentro de section) |

### Contenedor Responsivo

```tsx
<div className="container mx-auto max-w-4xl">
  {/* 
    - container: responsive padding horizontal
    - mx-auto: centrado
    - max-w-4xl: ancho máximo
  */}
</div>
```

## Crear Nuevas Páginas

### Página de Contenido Simple

```bash
# 1. Crear en (content)/
mkdir -p src/app/(content)/nueva-pagina
touch src/app/(content)/nueva-pagina/page.tsx
```

```tsx
// src/app/(content)/nueva-pagina/page.tsx
export const metadata = {
  title: "Nueva Página - WEBCODE",
  description: "Descripción de la nueva página"
};

export default function NuevaPagina() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-6">Nueva Página</h1>
      <p className="text-muted-foreground">Contenido de la página...</p>
    </>
  );
}
```

**✅ Layout aplicado automáticamente**: pt-24, max-w-4xl, `<article>`

### Página Hero

```bash
# 1. Crear en (hero)/
mkdir -p src/app/(hero)/nueva-hero
touch src/app/(hero)/nueva-hero/page.tsx
```

```tsx
// src/app/(hero)/nueva-hero/page.tsx
export default function NuevaHero() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative pt-24 pb-20 md:pb-32 overflow-hidden"
        style={{
          background: `linear-gradient(
            to right,
            rgb(var(--primary-rgb) / 0.03),
            rgb(var(--secondary-rgb) / 0.03)
          )`
        }}
      >
        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Hero Title</h1>
            <p className="text-xl">Hero description...</p>
          </div>
        </div>
      </section>

      {/* Secciones adicionales */}
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-4">
          {/* Contenido adicional */}
        </div>
      </section>
    </>
  );
}
```

**✅ Wrapper automático**: min-h-screen

### Página Grid/Listado

```bash
# 1. Crear en (grid)/
mkdir -p src/app/(grid)/nuevo-listado
touch src/app/(grid)/nuevo-listado/page.tsx
```

```tsx
// src/app/(grid)/nuevo-listado/page.tsx
export default function NuevoListado() {
  return (
    <>
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold">Listado de Items</h1>
        <p className="text-xl text-muted-foreground mt-4">
          Descripción del listado
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((item) => (
          <Card key={item.id}>{/* Contenido del card */}</Card>
        ))}
      </div>
    </>
  );
}
```

**✅ Layout aplicado automáticamente**: pt-24, max-w-6xl, `<section>`

## Ventajas del Sistema

### 1. DRY (Don't Repeat Yourself)

- ✅ Cero código duplicado
- ✅ Cambios centralizados
- ✅ 77% menos código

### 2. Consistencia

- ✅ Spacing uniforme (pt-24)
- ✅ Max widths estandarizados
- ✅ HTML semántico correcto

### 3. Developer Experience

- ✅ Cero imports necesarios
- ✅ Layouts automáticos
- ✅ Fácil de entender
- ✅ TypeScript completo

### 4. Next.js Native

- ✅ Usa el sistema de layouts nativo
- ✅ Compatible con Server Components
- ✅ SSR/SSG funciona perfectamente
- ✅ Route Groups no afectan URLs

### 5. Mantenibilidad

- ✅ Cambios en un solo lugar
- ✅ Fácil de extender
- ✅ Documentación clara
- ✅ Estructura predecible

## Mantenimiento

### Cambiar Spacing Global

```tsx
// src/components/layouts/ContentLayout.tsx
<article className="min-h-screen pt-28 pb-20 px-4"> {/* pt-24 → pt-28 */}
```

**Efecto**: Todas las páginas (content)/ se actualizan

### Cambiar Max Width

```tsx
// src/components/layouts/GridLayout.tsx
<div className="container mx-auto max-w-7xl"> {/* max-w-6xl → max-w-7xl */}
```

**Efecto**: Todas las páginas (grid)/ se actualizan

### Añadir Funcionalidad Común

```tsx
// src/components/layouts/ContentLayout.tsx
export function ContentLayout({ children }) {
  // Tracking, analytics, etc.
  useEffect(() => {
    trackPageView();
  }, []);

  return (
    <article className="min-h-screen pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">{children}</div>
    </article>
  );
}
```

**Efecto**: Todas las páginas del route group tienen la funcionalidad

## Troubleshooting

### Página no tiene spacing correcto

**Causa**: Página no está en un route group

**Solución**: Mover a `(content)/`, `(hero)/` o `(grid)/`

### HTML semántico incorrecto

**Causa**: Múltiples `<main>` o `<article>` anidados

**Solución**: Solo el layout raíz tiene `<main>`, los layouts de route groups usan `<article>` o `<section>`

### Layout no se aplica

**Causa**: Route group sin `layout.tsx`

**Solución**: Verificar que existe `app/(content)/layout.tsx`, etc.

## Referencias

- [Next.js Layouts Documentation](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts)
- [Next.js Route Groups](https://nextjs.org/docs/app/building-your-application/routing/route-groups)
- [HTML5 Semantic Elements](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantic_elements)

---

**Última actualización**: 2025-10-16  
**Versión**: 2.0.0 (Migrado a Next.js Layouts)
