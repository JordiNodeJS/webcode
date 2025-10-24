# Comparación: PageWrapper vs Next.js Layouts

## El Problema Original

**Todas las páginas tienen código duplicado para spacing del navbar:**

```tsx
// Se repite en 25+ páginas
<div className="pt-24 pb-20 px-4">
  <div className="container mx-auto max-w-4xl">{/* contenido */}</div>
</div>
```

## Solución 1: PageWrapper Component ❌

### Implementación

```tsx
// src/components/layout/PageWrapper.tsx
export function ContentPage({ children }) {
  return (
    <main className="min-h-screen">
      <article className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">{children}</div>
      </article>
    </main>
  );
}

// app/contacto/page.tsx
import { ContentPage } from "@/components/layout";

export default function ContactoPage() {
  return (
    <ContentPage>
      <h1>Contacto</h1>
    </ContentPage>
  );
}
```

### Problemas

#### ❌ Conflicto de `<main>` Tags

```html
<!-- HTML generado (INCORRECTO) -->
<body>
  <div>
    <HeaderNavigation />
    <main class="flex-1">
      <!-- De layout.tsx -->
      <main class="min-h-screen">
        <!-- De PageWrapper ❌ DUPLICADO -->
        <article class="pt-24">
          <h1>Contacto</h1>
        </article>
      </main>
    </main>
    <FooterSection />
  </div>
</body>
```

**Problema**: Dos `<main>` anidados → HTML inválido

#### ❌ Requiere Import en Cada Página

```tsx
// Cada página necesita:
import { ContentPage } from "@/components/layout";
```

Si olvidas el import → spacing incorrecto.

#### ❌ Props Confusas

```tsx
<ContentPage
  as="div" // Para evitar <main> duplicado
  sectionAs="article" // ¿Qué elemento usar?
  maxWidth="max-w-4xl"
  containerClassName="..."
/>
```

Demasiada complejidad para algo simple.

#### ❌ No Aprovecha Next.js

Esta solución lucha contra el sistema de layouts de Next.js en vez de usarlo.

## Solución 2: Next.js Layouts ✅

### Implementación

```tsx
// app/(content)/layout.tsx
import { ContentLayout } from "@/components/layouts/ContentLayout";

export default function ContentGroupLayout({ children }) {
  return <ContentLayout>{children}</ContentLayout>;
}

// components/layouts/ContentLayout.tsx
export function ContentLayout({ children }) {
  return (
    <article className="min-h-screen pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">{children}</div>
    </article>
  );
}

// app/(content)/contacto/page.tsx
export default function ContactoPage() {
  return (
    <>
      <h1>Contacto</h1>
    </>
  );
}
```

### Ventajas

#### ✅ HTML Semántico Correcto

```html
<!-- HTML generado (CORRECTO) -->
<body>
  <div>
    <HeaderNavigation />
    <main class="flex-1">
      <!-- De layout.tsx raíz -->
      <article class="pt-24">
        <!-- De (content)/layout.tsx -->
        <h1>Contacto</h1>
      </article>
    </main>
    <FooterSection />
  </div>
</body>
```

**Perfecto**: Un solo `<main>`, semántica correcta.

#### ✅ Cero Imports

```tsx
// app/(content)/contacto/page.tsx
export default function ContactoPage() {
  return <h1>Contacto</h1>;
}
```

El layout se aplica automáticamente por estar en `(content)/`.

#### ✅ Route Groups No Afectan URLs

```
Estructura:                    URLs:
app/
├── (content)/
│   ├── about/        →       /about
│   └── contacto/     →       /contacto
├── (hero)/
│   └── soluciones/   →       /soluciones
└── (grid)/
    └── blog/         →       /blog
```

Los paréntesis `()` se ignoran en las URLs.

#### ✅ Sistema Nativo de Next.js

```tsx
// Next.js aplica layouts automáticamente:
// layout.tsx (raíz)
//   └── (content)/layout.tsx
//       └── contacto/page.tsx
```

Usa el sistema como está diseñado.

#### ✅ Simple y Mantenible

```tsx
// Para cambiar el spacing de TODAS las páginas content:
// Solo editar un archivo:
// app/(content)/layout.tsx
```

## Comparación Lado a Lado

### Crear Nueva Página

#### Con PageWrapper ❌

```tsx
// app/nueva-pagina/page.tsx
import { ContentPage } from "@/components/layout";
import { generateSEOMetadata } from "@/lib/seo-metadata";

export const metadata = generateSEOMetadata({
  title: "Nueva Página",
  description: "..."
});

export default function NuevaPagina() {
  return (
    <ContentPage as="div" maxWidth="max-w-4xl">
      <h1>Nueva Página</h1>
      <p>Contenido...</p>
    </ContentPage>
  );
}
```

**Pasos**: 4 (crear folder, crear page.tsx, importar componente, configurar props)

#### Con Next.js Layouts ✅

```tsx
// app/(content)/nueva-pagina/page.tsx
import { generateSEOMetadata } from "@/lib/seo-metadata";

export const metadata = generateSEOMetadata({
  title: "Nueva Página",
  description: "..."
});

export default function NuevaPagina() {
  return (
    <>
      <h1>Nueva Página</h1>
      <p>Contenido...</p>
    </>
  );
}
```

**Pasos**: 2 (crear folder dentro de `(content)/`, crear page.tsx)

### Cambiar Max Width de Todas las Páginas

#### Con PageWrapper ❌

```tsx
// Opción 1: Cambiar default prop (afecta a todas)
// PageWrapper.tsx
export function ContentPage({
  maxWidth = "max-w-5xl" // Cambiar aquí
}) { ... }

// Opción 2: Cambiar individualmente (25+ archivos)
<ContentPage maxWidth="max-w-5xl" />
```

#### Con Next.js Layouts ✅

```tsx
// Editar UN solo archivo:
// components/layouts/ContentLayout.tsx
export function ContentLayout({ children }) {
  return (
    <article className="...">
      <div className="container mx-auto max-w-5xl">
        {" "}
        {/* Cambiar aquí */}
        {children}
      </div>
    </article>
  );
}
```

### TypeScript y Autocompletado

#### Con PageWrapper ❌

```tsx
<ContentPage
  as="div" // string
  sectionAs="article" // string
  maxWidth="max-w-4xl" // string (sin validación)
  overflow={true} // boolean
  gradient="..." // string
  relative={true} // boolean
  className="..." // string
/>
```

Muchas props → fácil equivocarse.

#### Con Next.js Layouts ✅

```tsx
// Solo children, resto es automático
{
  children;
}
```

Cero configuración → cero errores.

## Código Total

### PageWrapper Approach ❌

```
Archivos creados:
- src/components/layout/PageWrapper.tsx (276 líneas)
- src/components/layout/index.ts
- src/components/layout/README.md (435 líneas)
- docs/LAYOUT-PATTERNS.md

Modificaciones en páginas:
- 25 páginas × import statement
- 25 páginas × wrapper component
- Props personalizadas en algunas

Total: ~1000 líneas de código + documentación
```

### Next.js Layouts ✅

```
Archivos creados:
- src/components/layouts/ContentLayout.tsx (20 líneas)
- src/components/layouts/HeroLayout.tsx (15 líneas)
- src/components/layouts/GridLayout.tsx (20 líneas)
- src/components/layouts/index.ts (3 líneas)
- app/(content)/layout.tsx (6 líneas)
- app/(hero)/layout.tsx (6 líneas)
- app/(grid)/layout.tsx (6 líneas)

Modificaciones en páginas:
- Mover archivos a route groups
- Eliminar wrappers duplicados

Total: ~80 líneas de código
```

**Reducción**: 92% menos código

## Testing y Debugging

### Con PageWrapper ❌

```tsx
// ¿Por qué no funciona el spacing?
// Posibles causas:
// 1. Olvidaste importar PageWrapper
// 2. Props incorrectas (as="main" causa conflicto)
// 3. className override
// 4. containerClassName override
// 5. Variant incorrecto
```

### Con Next.js Layouts ✅

```tsx
// ¿Por qué no funciona el spacing?
// Causa única:
// - Página no está en el route group correcto
//   Solución: mover a (content)/
```

## Escalabilidad

### PageWrapper ❌

```tsx
// Para añadir un nuevo tipo de layout:
// 1. Añadir variant al enum
// 2. Añadir lógica en PageWrapper
// 3. Crear helper component (ContentPage, etc.)
// 4. Actualizar documentación
// 5. Actualizar props type
```

### Next.js Layouts ✅

```tsx
// Para añadir un nuevo tipo de layout:
// 1. Crear nuevo layout component
// 2. Crear nuevo route group con layout.tsx
// 3. Done
```

## Server Components y Performance

### PageWrapper ❌

```tsx
// PageWrapper es un client component si usa hooks
"use client";

export function PageWrapper({ children }) {
  // Si necesitas interactividad, todo se vuelve cliente
}
```

### Next.js Layouts ✅

```tsx
// Layouts pueden ser server components
export default function ContentGroupLayout({ children }) {
  return <ContentLayout>{children}</ContentLayout>;
}

// Solo las páginas que necesitan interactividad son "use client"
```

Mejor performance con Server Components.

## Resumen de Decisión

| Aspecto                   | PageWrapper           | Next.js Layouts      |
| ------------------------- | --------------------- | -------------------- |
| HTML Semántico            | ❌ Conflicto `<main>` | ✅ Correcto          |
| Código                    | ❌ 1000+ líneas       | ✅ ~80 líneas        |
| Mantenibilidad            | ❌ Baja               | ✅ Alta              |
| DX (Developer Experience) | ❌ Props complejas    | ✅ Automático        |
| Next.js Native            | ❌ Lucha contra       | ✅ Usa el sistema    |
| Escalabilidad             | ❌ Compleja           | ✅ Simple            |
| Performance               | ❌ Client components  | ✅ Server components |
| TypeScript                | ❌ Muchas props       | ✅ Mínimo            |
| Testing                   | ❌ Múltiples causas   | ✅ Una causa         |
| Imports                   | ❌ En cada página     | ✅ Cero imports      |

## Conclusión

### ❌ PageWrapper: Solución Incorrecta

- Añade complejidad innecesaria
- Lucha contra Next.js
- HTML inválido (dos `<main>`)
- Mucho código para mantener
- Props confusas

### ✅ Next.js Layouts: Solución Correcta

- Simple y elegante
- Usa Next.js como está diseñado
- HTML semántico perfecto
- Mínimo código
- Developer experience excelente

## Decisión Final

**USAR NEXT.JS LAYOUTS CON ROUTE GROUPS**

Esta es la forma idiomática y correcta de resolver el problema en Next.js 15.

---

**Siguiente paso**: Implementar la migración a layouts de Next.js
