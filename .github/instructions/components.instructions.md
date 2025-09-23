---
applyTo: "src/components/**/*.{ts,tsx}"
---

# Instrucciones para Componentes WebSnack

## Patrones de Componentes

### Server Components (por defecto)

- Usar Server Components por defecto para mejor rendimiento
- Aplicar 'use client' solo cuando sea estrictamente necesario (interactividad, hooks)
- Fetch de datos directamente en Server Components

### Componentes shadcn/ui

- Nunca modificar componentes en `src/components/ui/`
- Crear componentes personalizados en `src/components/custom/`
- Componer componentes base de shadcn/ui para funcionalidad específica

### Convenciones de Naming

- PascalCase para nombres de componentes
- kebab-case para archivos de componentes
- Usar nombres descriptivos que reflejen la función

### Props y TypeScript

- Interfaces explícitas para todas las props
- Prohibido usar tipo 'any'
- Validación con Zod cuando sea apropiado

### Patrones de Estilo

- Tailwind CSS clases directamente
- Diseño responsive mobile-first
- Soporte para modo oscuro con prefijo `dark:`

### Ejemplo de Estructura:

### Patrones de Exportación

#### **Named Exports para Componentes Reutilizables**

- Usar `export function` para todos los componentes reutilizables
- Mejor tree-shaking y optimización del bundle
- IntelliSense mejorado y debugging más claro

#### **Default Exports Solo para Páginas Next.js**

- Usar `export default` únicamente en `page.tsx` y `layout.tsx`
- Requerido por el App Router de Next.js 15

```tsx
// src/components/custom/hero-section.tsx
interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText?: string;
}

export function HeroSection({ title, subtitle, ctaText }: HeroSectionProps) {
  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4 dark:text-white">{title}</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        {subtitle}
      </p>
      {ctaText && (
        <Button size="lg" className="bg-primary hover:bg-primary/90">
          {ctaText}
        </Button>
      )}
    </section>
  );
}
```
