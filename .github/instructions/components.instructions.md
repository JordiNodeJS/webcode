````instructions
---
applyTo: "src/components/**/*.{ts,tsx}"
---

# Instrucciones para Componentes WebCode

## 🎨 Sistema de Diseño WAS (WebCode Animation System)

**ANTES de crear cualquier componente, consulta:**
- **Referencia rápida**: `.github/WEBCODE-STYLE-REFERENCE.md`
- **Ejemplos visuales**: `.github/WEBCODE-STYLE-EXAMPLES.md`

### Colores del Tema WebCode

```tsx
// ✅ Usar colores del tema
<div className="bg-primary text-primary-foreground">
<div className="bg-secondary text-secondary-foreground">

// ✅ Con opacidad
<div className="bg-primary/10 border-primary/20">

// ✅ Variables CSS para efectos especiales
<div style={{ color: 'rgb(var(--primary-rgb))' }}>

// ❌ NUNCA colores hardcodeados
<div className="bg-blue-500">  // ❌
```

### Sombras 3D Características

```tsx
// ✅ Sombras 3D WebCode en componentes interactivos
<Card style={{ boxShadow: 'var(--shadow-3d-md)' }}>
<Button style={{ boxShadow: 'var(--shadow-3d-sm)' }}>

// Niveles: xs, sm, md (cards), lg, xl
```

### Tipografía del Sistema

```tsx
// ✅ Títulos: font-display (Space Grotesk)
<h1 className="font-display text-5xl font-bold">

// ✅ Texto: font-sans (Poppins)
<p className="font-sans text-base">

// ✅ Textos largos: font-serif (Lora)
<article className="font-serif text-lg">

// ✅ Código: font-mono (Fira Code)
<code className="font-mono text-sm">
```

### Animaciones WAS

```tsx
// ✅ Transición estándar WebCode
<div className="
  transition-all
  duration-300
  ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
">

// ✅ Hover estándar
<button className="
  hover:opacity-80
  hover:-translate-y-0.5
  transition-all duration-200
">
```

### Clases Especiales WebCode

```tsx
// ✅ Títulos con gradiente neón
<h1 className="neon-cyan-title">
<h2 className="neon-cyan-card-title">

// ✅ Fondos con gradiente
<div className="bg-gradient-webcode">

// ✅ Texto con gradiente
<p className="text-gradient-webcode">
```

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

### Patrones de Estilo WebCode

```tsx
// ✅ Aplicar colores del tema y sombras 3D
<div className="
  bg-primary text-primary-foreground
  border-primary
"
style={{ boxShadow: 'var(--shadow-3d-md)' }}
>

// ✅ Tailwind CSS mobile-first
<div className="
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
  gap-6 md:gap-8
">

// ✅ Soporte dark mode automático con variables
<div className="bg-background text-foreground border-border">

// ✅ Espaciado semántico WebCode
<div className="p-6 gap-6">  // Element spacing (24px)
<div className="p-8 gap-8">  // Component spacing (32px)
```

### Ejemplo de Componente Card WebCode

```tsx
// src/components/custom/service-card.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export function ServiceCard({ title, description, icon }: ServiceCardProps) {
  return (
    <Card
      className="
        border-primary/20
        hover:border-primary
        hover:-translate-y-2
        transition-all duration-300
      "
      style={{ boxShadow: 'var(--shadow-3d-md)' }}
    >
      <CardHeader>
        {icon && (
          <div className="
            w-12 h-12
            rounded-lg
            bg-gradient-webcode
            flex items-center justify-center
            mb-4
          ">
            {icon}
          </div>
        )}
        <CardTitle className="neon-cyan-card-title font-display">
          {title}
        </CardTitle>
        <CardDescription className="font-sans">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Contenido adicional */}
      </CardContent>
    </Card>
  );
}
```

### Ejemplo de Botón WebCode

```tsx
// src/components/custom/cta-button.tsx
import { Button } from "@/components/ui/button";
import type { ButtonProps } from "@/components/ui/button";

interface CTAButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export function CTAButton({ children, className, ...props }: CTAButtonProps) {
  return (
    <Button
      className={`
        hover:opacity-80
        hover:-translate-y-0.5
        transition-all duration-200
        ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
        ${className || ''}
      `}
      style={{ boxShadow: 'var(--shadow-3d-sm)' }}
      {...props}
    >
      {children}
    </Button>
  );
}
```

### Ejemplo de Estructura Completa:

### shadcn/ui Components

- **Nunca modificar** componentes en `src/components/ui/`
- **Crear personalizados** en `src/components/custom/`
- **Componer** componentes base para funcionalidad específica

### Patrones de Estilo

- Tailwind CSS clases directamente
- Diseño responsive mobile-first
- Soporte para modo oscuro con prefijo `dark:`

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
````
