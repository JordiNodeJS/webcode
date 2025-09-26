---
applyTo: "src/app/**/*.{ts,tsx}"
---

# Instrucciones para App Router y APIs WebSnack

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

### APIs Asíncronas (Next.js 15)

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

### Route Handlers

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

### Optimización de Rendimiento

- Usar `next/image` para todas las imágenes
- Importaciones dinámicas para componentes pesados
- Caché apropiado para fetch de datos
- Lazy loading cuando sea apropiado

### SEO y Metadata

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
