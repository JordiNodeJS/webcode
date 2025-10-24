# Next.js Best Practices - WebCode

## **Contexto**

Guía consolidada de mejores prácticas para Next.js 15 App Router, estructura de proyecto y patrones de arquitectura en el proyecto WebCode.

---

## **1. APP ROUTER - FUNDAMENTOS**

### **Server Components por Defecto**

```tsx
// ✅ Server Component (por defecto, sin 'use client')
export default async function ProductsPage() {
  const products = await fetch("/api/products").then((res) => res.json());

  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}

// Solo usar 'use client' cuando sea necesario:
// - Hooks de React (useState, useEffect, etc.)
// - Event handlers (onClick, onChange, etc.)
// - Browser APIs (window, localStorage, etc.)
// - Librerías client-only (framer-motion, etc.)
```

### **APIs Asíncronas de Next.js 15**

```tsx
// Next.js 15: cookies, headers, params, searchParams son ahora Promises
import { cookies, headers } from "next/headers";

export default async function Page({
  params,
  searchParams
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ query: string }>;
}) {
  // ✅ Await params y searchParams
  const { slug } = await params;
  const { query } = await searchParams;

  // ✅ Await cookies y headers
  const cookieStore = await cookies();
  const headersList = await headers();

  return (
    <div>
      Slug: {slug}, Query: {query}
    </div>
  );
}
```

---

## **2. ESTRUCTURA DE PROYECTO**

### **Organización de Directorios**

```
src/
├── app/                        # App Router
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page
│   ├── components/            # Componentes página principal
│   ├── (marketing)/           # Route group público
│   │   ├── layout.tsx
│   │   ├── about/page.tsx
│   │   └── services/
│   │       ├── page.tsx
│   │       └── components/    # Colocación cercana
│   ├── (dashboard)/           # Route group privado
│   │   ├── layout.tsx
│   │   └── analytics/page.tsx
│   └── api/                   # Route handlers
│       └── services/route.ts
├── components/                 # Componentes compartidos
│   ├── ui/                    # shadcn/ui (NUNCA MODIFICAR)
│   └── features/              # Bloques funcionales reutilizables
├── lib/                       # Utilidades
├── hooks/                     # Custom hooks
├── types/                     # Tipos TypeScript
└── styles/                    # Estilos globales
```

### **Colocación Cercana (Colocation)**

**Principio**: Mantener código cerca de donde se usa.

```
# ✅ Componente específico de página
app/services/components/ServiceCard.tsx

# ✅ Componente reutilizable
src/components/features/shopping-cart/CartItem.tsx
```

**Cuándo usar cada approach:**

- **Colocación cercana** (`app/*/components/`): Componente solo se usa en esa página/ruta
- **Features** (`src/components/features/`): Componente se reutiliza en múltiples lugares

---

## **3. DATA FETCHING**

### **Patrones de Fetch en Server Components**

```tsx
// ✅ Fetch con caché (ISR - Incremental Static Regeneration)
const data = await fetch("/api/data", {
  cache: "force-cache",
  next: { revalidate: 3600 } // Revalidar cada hora
});

// ✅ Fetch sin caché (SSR - Server Side Rendering)
const dynamicData = await fetch("/api/dynamic", {
  cache: "no-store"
});

// ✅ Fetch paralelo para mejor performance
const [users, posts, stats] = await Promise.all([
  fetch("/api/users").then((r) => r.json()),
  fetch("/api/posts").then((r) => r.json()),
  fetch("/api/stats").then((r) => r.json())
]);
```

### **Streaming con Suspense**

```tsx
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <Header />

      {/* Contenido rápido se muestra inmediatamente */}
      <FastContent />

      {/* Contenido lento se muestra cuando esté listo */}
      <Suspense fallback={<LoadingSkeleton />}>
        <SlowContent />
      </Suspense>

      <Footer />
    </>
  );
}

async function SlowContent() {
  const data = await fetchSlowData();
  return <div>{data}</div>;
}
```

---

## **4. ROUTING**

### **Route Groups**

Organizar rutas sin afectar URLs:

```
app/(marketing)/about/page.tsx     → /about
app/(marketing)/services/page.tsx  → /services
app/(dashboard)/orders/page.tsx    → /orders
```

**Beneficios:**

- Layouts compartidos por grupo
- Organización lógica sin cambiar URLs
- Separación de áreas (público vs admin)

### **Parallel Routes**

```
app/
├── @modal/                    # Slot modal
│   └── (.)photo/[id]/page.tsx
├── @sidebar/                  # Slot sidebar
│   └── default.tsx
└── layout.tsx                 # Layout consume slots
```

```tsx
export default function Layout({
  children,
  modal,
  sidebar
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <>
      {sidebar}
      {children}
      {modal}
    </>
  );
}
```

### **Intercepting Routes**

```
app/
├── photo/[id]/page.tsx        # Página completa
└── (.)photo/[id]/page.tsx     # Modal interceptor
```

Útil para modals que muestran contenido de otra ruta.

---

## **5. LAYOUTS**

### **Layout Raíz (app/layout.tsx)**

```tsx
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "WebCode",
  description: "Desarrollo web Barcelona"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={poppins.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
```

### **Layouts de Sección**

```tsx
// app/(marketing)/layout.tsx
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export default function MarketingLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
```

---

## **6. ROUTE HANDLERS (API Routes)**

### **Estructura Básica**

```tsx
// app/api/services/route.ts
import { NextRequest, NextResponse } from "next/server";

// GET /api/services
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");

  const data = await fetchServices(query);

  return NextResponse.json(data);
}

// POST /api/services
export async function POST(request: NextRequest) {
  const body = await request.json();

  const result = await createService(body);

  return NextResponse.json(result, { status: 201 });
}
```

### **Rutas Dinámicas**

```tsx
// app/api/services/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // Next.js 15: await params

  const service = await fetchService(id);

  if (!service) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(service);
}
```

---

## **7. METADATA Y SEO**

### **Metadata Estática**

```tsx
// app/about/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Nosotros - WebCode",
  description: "Conoce al equipo de WebCode",
  openGraph: {
    title: "Sobre Nosotros",
    description: "Conoce al equipo",
    images: ["/og-about.jpg"]
  }
};

export default function AboutPage() {
  return <div>About</div>;
}
```

### **Metadata Dinámica**

```tsx
// app/blog/[slug]/page.tsx
export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPost(slug);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage]
    }
  };
}
```

---

## **8. ERROR HANDLING**

### **Error Boundaries**

```tsx
// app/error.tsx - Captura errores en producción
"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Algo salió mal</h2>
      <button onClick={reset}>Intentar de nuevo</button>
    </div>
  );
}
```

### **Not Found**

```tsx
// app/not-found.tsx
export default function NotFound() {
  return (
    <div>
      <h2>404 - Página no encontrada</h2>
      <a href="/">Volver al inicio</a>
    </div>
  );
}

// Trigger not-found desde página
import { notFound } from "next/navigation";

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await fetchItem(id);

  if (!item) {
    notFound(); // Renderiza not-found.tsx
  }

  return <div>{item.name}</div>;
}
```

---

## **9. LOADING STATES**

### **Loading UI**

```tsx
// app/dashboard/loading.tsx
export default function Loading() {
  return <LoadingSkeleton />;
}

// Se muestra automáticamente mientras page.tsx se carga
```

### **Streaming con Loading**

```tsx
// app/dashboard/page.tsx
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <>
      <h1>Dashboard</h1>

      {/* Muestra Loading mientras Posts se carga */}
      <Suspense fallback={<PostsSkeleton />}>
        <Posts />
      </Suspense>

      {/* Muestra Loading mientras Stats se carga */}
      <Suspense fallback={<StatsSkeleton />}>
        <Stats />
      </Suspense>
    </>
  );
}
```

---

## **10. MEJORES PRÁCTICAS**

### **✅ DO**

- Usar Server Components por defecto
- Await params, searchParams, cookies, headers en Next.js 15
- Implementar Suspense para contenido lento
- Usar Route Groups para organización
- Colocar componentes cerca de donde se usan
- Implementar error.tsx y loading.tsx
- Usar TypeScript estricto
- Implementar metadata para SEO

### **❌ DON'T**

- No usar 'use client' innecesariamente
- No fetch datos en Client Components
- No ignorar TypeScript errors
- No olvidar await en APIs asíncronas de Next.js 15
- No modificar componentes de shadcn/ui
- No hardcodear configuración (usar env variables)

---

## **11. PERFORMANCE**

### **Checklist de Optimización**

- [ ] Imágenes con next/image
- [ ] Fuentes optimizadas con next/font
- [ ] Code splitting con dynamic imports
- [ ] Suspense para lazy loading
- [ ] Metadata completo para SEO
- [ ] Error boundaries implementados
- [ ] Loading states apropiados
- [ ] Cache strategies configuradas

---

## **REFERENCIAS**

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
