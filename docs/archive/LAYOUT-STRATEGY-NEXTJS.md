# Estrategia de Layouts con Next.js 15

## ✅ Decisión: Usar Layouts de Next.js en vez de PageWrapper

**Razón**: Next.js 15 tiene un sistema de layouts nativo y poderoso que es la solución correcta para este problema.

## Problema Actual

1. El layout raíz ya tiene `<main>` → Conflicto con PageWrapper
2. Código duplicado en páginas (`pt-24`, `container`, etc.)
3. Ya existe `SectionLayout` pero no se usa consistentemente
4. Algunos layouts existen pero están vacíos

## Solución: Sistema de Layouts en Next.js

### Estructura de Layouts Propuesta

```
app/
├── layout.tsx (raíz - NO TOCAR)
│   └── Incluye: Header, <main>, Footer
│
├── (content)/           [NUEVO Route Group]
│   ├── layout.tsx       → ContentLayout
│   ├── about/
│   ├── contacto/
│   └── servicios/
│
├── (hero)/              [NUEVO Route Group]
│   ├── layout.tsx       → HeroLayout  
│   ├── soluciones/
│   ├── proceso/
│   └── briefing/
│
├── (grid)/              [NUEVO Route Group]
│   ├── layout.tsx       → GridLayout
│   ├── blog/
│   ├── faqs/
│   └── portfolio/
│
└── page.tsx (homepage - caso especial)
```

### Ventajas de Esta Solución

✅ **Nativo de Next.js**: Usa el sistema de layouts como está diseñado
✅ **Route Groups**: Organiza páginas por tipo sin afectar URLs
✅ **Automático**: El spacing se aplica sin imports en cada página
✅ **Semántico**: HTML correcto con un solo `<main>` del layout raíz
✅ **DRY**: Cero repetición de código
✅ **Type-safe**: TypeScript nativo de Next.js
✅ **SSR Compatible**: Funciona perfectamente con Server Components

## Implementación

### 1. Layouts Base

#### `src/components/layouts/ContentLayout.tsx`

```tsx
import type { ReactNode } from "react";

interface ContentLayoutProps {
  children: ReactNode;
}

/**
 * Layout para páginas de contenido simple
 * HTML: <article> con max-w-4xl
 */
export function ContentLayout({ children }: ContentLayoutProps) {
  return (
    <article className="min-h-screen pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        {children}
      </div>
    </article>
  );
}
```

#### `src/components/layouts/HeroLayout.tsx`

```tsx
import type { ReactNode } from "react";

interface HeroLayoutProps {
  children: ReactNode;
}

/**
 * Layout para páginas hero (no aplica background aquí)
 * El background gradient se maneja en la página individual
 */
export function HeroLayout({ children }: HeroLayoutProps) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
```

#### `src/components/layouts/GridLayout.tsx`

```tsx
import type { ReactNode } from "react";

interface GridLayoutProps {
  children: ReactNode;
}

/**
 * Layout para páginas grid/listados
 * HTML: <section> con spacing estándar
 */
export function GridLayout({ children }: GridLayoutProps) {
  return (
    <section className="min-h-screen pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        {children}
      </div>
    </section>
  );
}
```

### 2. Route Groups y Layouts

#### `app/(content)/layout.tsx`

```tsx
import type { ReactNode } from "react";
import { ContentLayout } from "@/components/layouts/ContentLayout";

export default function ContentGroupLayout({ children }: { children: ReactNode }) {
  return <ContentLayout>{children}</ContentLayout>;
}
```

#### `app/(hero)/layout.tsx`

```tsx
import type { ReactNode } from "react";
import { HeroLayout } from "@/components/layouts/HeroLayout";

export default function HeroGroupLayout({ children }: { children: ReactNode }) {
  return <HeroLayout>{children}</HeroLayout>;
}
```

#### `app/(grid)/layout.tsx`

```tsx
import type { ReactNode } from "react";
import { GridLayout } from "@/components/layouts/GridLayout";

export default function GridGroupLayout({ children }: { children: ReactNode }) {
  return <GridLayout>{children}</GridLayout>;
}
```

### 3. Migración de Páginas

#### Antes (sin route groups)
```
app/
├── about/
│   ├── layout.tsx  ← Eliminar
│   └── page.tsx
├── contacto/
│   ├── layout.tsx  ← Eliminar  
│   └── page.tsx
```

#### Después (con route groups)
```
app/
├── (content)/
│   ├── layout.tsx  ← Un solo layout para todas
│   ├── about/
│   │   └── page.tsx
│   ├── contacto/
│   │   └── page.tsx
│   └── servicios/
│       └── page.tsx
```

### 4. Estructura de Página Simplificada

#### Antes (con código duplicado)
```tsx
export default function ContactoPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 pt-24 pb-12">
      <h1>Contacto</h1>
      {/* contenido */}
    </div>
  );
}
```

#### Después (solo contenido)
```tsx
// app/(content)/contacto/page.tsx
export default function ContactoPage() {
  return (
    <>
      <h1>Contacto</h1>
      {/* contenido */}
    </>
  );
}
```

El layout `(content)/layout.tsx` añade automáticamente el wrapper.

### 5. Páginas Hero con Gradientes

Para páginas hero que necesitan gradientes personalizados:

```tsx
// app/(hero)/soluciones/seo/page.tsx
export default function SeoPage() {
  return (
    <>
      {/* Hero Section con gradient */}
      <section 
        className="relative pt-24 pb-20 md:pb-32 overflow-hidden"
        style={{
          background: `linear-gradient(
            to_right,
            rgb(var(--accent-rgb)_/_0.03),
            rgb(var(--primary-rgb)_/_0.03)
          )`
        }}
      >
        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <div className="max-w-3xl">
            <h1>SEO & Marketing</h1>
          </div>
        </div>
      </section>
      
      {/* Secciones adicionales */}
      <section className="py-20">
        {/* contenido */}
      </section>
    </>
  );
}
```

El `(hero)/layout.tsx` solo añade el wrapper `min-h-screen`.

## Plan de Migración

### Fase 1: Crear Layouts Base

1. ✅ Actualizar `src/components/layouts/ContentLayout.tsx`
2. ✅ Crear `src/components/layouts/HeroLayout.tsx`
3. ✅ Crear `src/components/layouts/GridLayout.tsx`
4. ✅ Crear barrel export en `src/components/layouts/index.ts`

### Fase 2: Crear Route Groups

5. ✅ Crear `app/(content)/layout.tsx`
6. ✅ Crear `app/(hero)/layout.tsx`
7. ✅ Crear `app/(grid)/layout.tsx`

### Fase 3: Migrar Páginas

#### (content) - Páginas de Contenido

8. Mover `/about` → `/(content)/about`
9. Mover `/contacto` → `/(content)/contacto`
10. Mover `/servicios` → `/(content)/servicios`
11. Eliminar layouts individuales obsoletos

#### (hero) - Páginas Hero

12. Mover `/soluciones/*` → `/(hero)/soluciones/*`
13. Mover `/proceso` → `/(hero)/proceso`
14. Mover `/briefing` → `/(hero)/briefing`
15. Simplificar código de páginas (eliminar wrappers)

#### (grid) - Páginas Grid

16. Mover `/blog` → `/(grid)/blog`
17. Mover `/faqs` → `/(grid)/faqs`
18. Mover `/portfolio` → `/(grid)/portfolio`

### Fase 4: Limpieza

19. Eliminar `PageWrapper.tsx` (ya no necesario)
20. Eliminar `SectionLayout.tsx` antiguo
21. Actualizar documentación
22. Verificar todas las rutas con DevTools

## Comparación de Soluciones

### ❌ PageWrapper (componente custom)

**Problemas:**
- Conflicto con `<main>` del layout raíz
- Requiere import en cada página
- No aprovecha Next.js 15
- Props complejas (`as`, `sectionAs`, etc.)
- Más código que mantener

### ✅ Layouts de Next.js (nativo)

**Ventajas:**
- Sistema nativo de Next.js
- Route Groups organizan sin cambiar URLs
- Cero imports en páginas
- HTML semántico automático
- Menos código, más mantenible
- Compatible con Server Components
- Mejor DX (Developer Experience)

## Estructura HTML Final

### Con Layouts de Next.js

```html
<!-- layout.tsx (raíz) -->
<body>
  <div class="min-h-screen flex flex-col">
    <HeaderNavigation />
    <main class="flex-1">
      
      <!-- (content)/layout.tsx -->
      <article class="min-h-screen pt-24 pb-20 px-4">
        <div class="container mx-auto max-w-4xl">
          
          <!-- page.tsx -->
          <h1>Contenido de la Página</h1>
          <p>...</p>
          
        </div>
      </article>
      
    </main>
    <FooterSection />
  </div>
</body>
```

**Perfecto**: Un solo `<main>`, semántica correcta, spacing automático.

## Configuración de Variables CSS (Opcional)

Si quieres usar variables CSS en vez de clases fijas:

```css
/* globals.css */
:root {
  --header-height: 96px; /* pt-24 = 6rem = 96px */
  --content-max-width: 896px; /* max-w-4xl */
  --hero-max-width: 1152px; /* max-w-6xl */
}
```

```tsx
// ContentLayout.tsx
<article 
  className="min-h-screen pb-20 px-4"
  style={{ paddingTop: 'var(--header-height)' }}
>
```

Pero para este proyecto, usar Tailwind directamente es más simple.

## Testing

Después de migración:

```bash
# 1. Verificar que todas las rutas funcionan
pnpm run dev

# Probar:
# - /about (debe estar en (content))
# - /soluciones (debe estar en (hero))
# - /blog (debe estar en (grid))

# 2. Verificar HTML semántico
# DevTools → Elements
# Debe haber un solo <main>
# Elementos semánticos correctos (<article>, <section>)

# 3. Verificar spacing
# No debe haber overlap con navbar
# pt-24 aplicado automáticamente

# 4. Build production
pnpm run build
```

## Archivos a Eliminar

Después de la migración completa:

- ❌ `src/components/layout/PageWrapper.tsx`
- ❌ `src/components/layout/index.ts` 
- ❌ `src/components/layout/README.md`
- ❌ `src/components/layouts/SectionLayout.tsx` (obsoleto)
- ❌ `src/app/about/layout.tsx`
- ❌ `src/app/contacto/layout.tsx`
- ❌ `src/app/portfolio/layout.tsx`
- ❌ `src/app/soluciones/layout.tsx`

## Archivos a Crear

- ✅ `src/components/layouts/ContentLayout.tsx`
- ✅ `src/components/layouts/HeroLayout.tsx`
- ✅ `src/components/layouts/GridLayout.tsx`
- ✅ `src/components/layouts/index.ts` (barrel export)
- ✅ `app/(content)/layout.tsx`
- ✅ `app/(hero)/layout.tsx`
- ✅ `app/(grid)/layout.tsx`

## Ejemplo Completo: Migrar /contacto

### Paso 1: Mover archivos

```bash
# Antes
app/contacto/
├── layout.tsx
└── page.tsx

# Después  
app/(content)/contacto/
└── page.tsx
```

### Paso 2: Actualizar page.tsx

```tsx
// Antes
import { ContentPage } from "@/components/layout";

export default function ContactoPage() {
  return (
    <ContentPage containerClassName="pb-12">
      <h1>Contacto</h1>
      {/* contenido */}
    </ContentPage>
  );
}

// Después
export default function ContactoPage() {
  return (
    <>
      <h1>Contacto</h1>
      {/* contenido */}
    </>
  );
}
```

### Paso 3: Verificar

- URL sigue siendo `/contacto` ✅
- Spacing correcto (pt-24) ✅
- HTML semántico ✅
- Menos código ✅

## Conclusión

**DECISIÓN FINAL**: Usar Layouts de Next.js 15 con Route Groups

Esta es la solución correcta y nativa para Next.js. PageWrapper era una solución temporal que generaba conflictos con la arquitectura de Next.js.

---

**Próximo paso**: ¿Empezamos la migración a layouts de Next.js?

