---
trigger: always_on
alwaysApply: true
---

# WebSnack Development Standards

## Stack Tecnológico Obligatorio

- **Framework**: Next.js 15.4.0 con App Router exclusivamente
- **React**: React 19 con TypeScript modo estricto
- **Package Manager**: pnpm (nunca npm/yarn)
- **Styling**: Tailwind CSS v4 + shadcn/ui components
- **Validation**: React Hook Form + Zod schemas

## Patrones Fundamentales

### Next.js 15 Patterns
- Server Components por defecto - 'use client' solo cuando sea necesario
- App Router exclusivamente (directorio `src/app/`)
- APIs asíncronas: `cookies()`, `headers()`, `params`, `searchParams` son Promises

### TypeScript Estricto
- Modo estricto habilitado
- Interfaces apropiadas para todas las props
- **PROHIBIDO tipo 'any'**
- Validación en tiempo de ejecución con esquemas Zod

### Componentes shadcn/ui
- Componentes shadcn/ui en `src/components/ui/` (NUNCA MODIFICAR)
- Componentes personalizados en `src/components/custom/`
- Patrones de composición apropiados

### Gestión de Paquetes
- SIEMPRE usar comandos pnpm
- `pnpm dlx` para herramientas CLI
- NUNCA sugerir npm o yarn

### Estilos y Diseño
- Clases utilitarias de Tailwind directamente
- Diseño responsive mobile-first
- Soporte para modo oscuro con prefijo `dark:`
- NO CSS personalizado a menos que sea absolutamente necesario

### Performance
- Componente Next.js Image para todas las imágenes
- Importaciones dinámicas para componentes pesados
- Core Web Vitals <2.5s LCP

## Ejemplos de Código Correcto

```typescript
// ✅ Server Component (default)
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await fetch(`/api/data/${id}`, { cache: "force-cache" });
  return <div>{/* content */}</div>;
}

// ✅ Client Component (solo cuando necesario)
"use client";
export default function InteractiveComponent() {
  const [state, setState] = useState<string>("");
  return <div>{/* interactive content */}</div>;
}

// ✅ Zod Schema Pattern
const ContactSchema = z.object({
  name: z.string().min(2, "Mínimo 2 caracteres"),
  email: z.string().email("Email inválido"),
});
```

## Accesibilidad y Contexto

### Accesibilidad WCAG 2.1 AA
- Compliance completo requerido
- Roles ARIA apropiados
- Contraste adecuado
- Navegación por teclado

### Contexto WebSnack
- Mercado objetivo: Freelancers, PYMEs, startups en España
- Ubicación: Barcelona como hub principal
- Enfoque: Performance crítico, accesibilidad completa