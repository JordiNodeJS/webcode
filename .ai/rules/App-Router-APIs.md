---
trigger: glob
glob: ["src/app/**/*.tsx", "src/app/**/*.ts", "src/app/**/route.ts"]
---

# App Router y APIs WebSnack

## App Router Next.js 15

### Estructura de Rutas

- Usar App Router exclusivamente (directorio `src/app/`)
- Server Components por defecto en páginas
- Route handlers para endpoints API en `route.ts`

### Páginas y Layouts

- `layout.tsx` para layouts compartidos
- `page.tsx` para páginas de ruta
- `loading.tsx` para estados de carga
- `error.tsx` para manejo de errores
- `not-found.tsx` para páginas 404

## APIs Asíncronas (Next.js 15)

```tsx
// ✅ CORRECTO - APIs son Promises en Next.js 15
export default async function Page({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const search = await searchParams;

  // Fetch de datos del servidor
  const data = await fetch(`/api/items/${id}`, {
    cache: "force-cache" // Cache estático
  });

  return <div>...</div>;
}
```

## Route Handlers

```tsx
// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10)
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // Procesar contacto

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
```

## Optimización de Rendimiento

- Usar `next/image` para todas las imágenes
- Importaciones dinámicas para componentes pesados
- Caché apropiado para fetch de datos
- Lazy loading cuando sea apropiado

## SEO y Metadata

```tsx
// Metadata estática
export const metadata: Metadata = {
  title: "WebSnack - Servicios",
  description: "Servicios de desarrollo web profesional"
};

// Metadata dinámica
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const service = await getService(id);

  return {
    title: `${service.title} - WebSnack`,
    description: service.description
  };
}
```

## Patrones de Data Fetching

```tsx
// ✅ Server Component con cache
async function getServices() {
  const res = await fetch("/api/services", {
    cache: "force-cache"
  });
  return res.json();
}

// ✅ Revalidate con tiempo específico
async function getNews() {
  const res = await fetch("/api/news", {
    next: { revalidate: 3600 } // 1 hour
  });
  return res.json();
}

// ✅ No cache para datos dinámicos
async function getUserData(userId: string) {
  const res = await fetch(`/api/users/${userId}`, {
    cache: "no-store"
  });
  return res.json();
}
```

## Error Boundaries

```tsx
// src/app/error.tsx
"use client";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">¡Algo salió mal!</h2>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}
```

## Loading States

```tsx
// src/app/services/loading.tsx
export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
            <div className="bg-gray-200 h-4 rounded mb-2"></div>
            <div className="bg-gray-200 h-4 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Criterios de Aceptación

- App Router exclusivamente usado
- Server Components por defecto
- APIs asíncronas manejadas correctamente
- Metadata apropiada para SEO
- Error boundaries implementados
- Loading states para UX óptima
