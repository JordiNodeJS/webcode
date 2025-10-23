# Prompt: UI/UX y Styling - WebCode

## **Contexto y Objetivo**

Prompt consolidado para diseño UI/UX, sistema de estilos WebCode Animation System (WAS), componentes shadcn/ui, y Tailwind CSS v4.

---

## **1. SISTEMA DE ESTILOS WEBCODE (WAS)**

### **Paleta de Colores Principal**

```css
/* Variables RGB en globals.css */
--primary: oklch(0.57 0.2 328.5);      /* #dc7cb3 - Rosa principal */
--primary-rgb: 220 124 179;
--secondary: oklch(0.43 0.18 184.1);   /* #bce3e5 - Aguamarina */
--secondary-rgb: 188 227 229;
```

### **Sombras 3D Características**

Sistema de 5 niveles con offset y color del tema:

```css
/* Variables CSS */
--shadow-3d-xs: 1px 1px 0 rgba(var(--primary-rgb), 0.3);
--shadow-3d-sm: 2px 2px 0 rgba(var(--primary-rgb), 0.3);
--shadow-3d-md: 4px 4px 0 rgba(var(--primary-rgb), 0.3);
--shadow-3d-lg: 6px 6px 0 rgba(var(--primary-rgb), 0.3);
--shadow-3d-xl: 8px 8px 0 rgba(var(--primary-rgb), 0.3);
```

**Uso en componentes:**

```tsx
<Card style={{ boxShadow: 'var(--shadow-3d-md)' }}>
  <CardContent>...</CardContent>
</Card>
```

### **Animaciones WAS**

#### **Easing Personalizado**

```css
/* cubic-bezier optimizado */
--ease-webcode: cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

#### **Duraciones Estándar**

- `duration-100` (100ms) - Instant feedback
- `duration-200` (200ms) - Quick transitions
- `duration-300` (300ms) - Normal transitions
- `duration-500` (500ms) - Smooth animations

#### **Patrón de Hover Estándar**

```tsx
<Button 
  className="
    hover:opacity-80 
    hover:translate-y-0.5
    transition-all duration-200
    ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
  "
>
  Click me
</Button>
```

### **Tipografía del Sistema**

```css
/* Fuentes Google Fonts */
--font-sans: 'Poppins', sans-serif;        /* Texto general */
--font-display: 'Space Grotesk', sans-serif; /* Títulos */
--font-serif: 'Lora', serif;               /* Textos largos */
--font-mono: 'Fira Code', monospace;       /* Código */
```

**Uso en componentes:**

```tsx
<h1 className="font-display text-4xl">Título Principal</h1>
<p className="font-sans text-base">Texto del cuerpo</p>
<code className="font-mono text-sm">const code = true;</code>
```

### **Espaciado Semántico**

| Contexto | Gap | Padding | Tamaño (px) |
|----------|-----|---------|-------------|
| Texto | `gap-3` | `p-3` | 12 |
| Elemento | `gap-6` | `p-6` | 24 |
| Componente | `gap-8` | `p-8` | 32 |
| Sección | `gap-16` | `p-16` | 64 |

---

## **2. CLASES ESPECIALES WEBCODE**

### **Títulos con Gradiente Neón**

```tsx
// Título principal con neón cyan
<h1 className="neon-cyan-title">
  Título Hero Section
</h1>

// Título de card con neón
<h2 className="neon-cyan-card-title">
  Título de Tarjeta
</h2>
```

### **Fondos con Gradiente**

```tsx
// Gradiente del tema (rosa/aguamarina)
<div className="bg-gradient-webcode">
  Contenido
</div>

// Texto con gradiente
<p className="text-gradient-webcode">
  Texto con gradiente animado
</p>
```

### **Sombras 3D Directas**

```tsx
<Card className="shadow-3d-md">
  <CardContent>...</CardContent>
</Card>
```

---

## **3. COMPONENTES SHADCN/UI**

### **Principios Fundamentales**

- ✅ Componentes en `src/components/ui/` - **NUNCA MODIFICAR**
- ✅ Customización mediante **props** y **className**
- ✅ Composición sobre herencia
- ✅ Variantes con **class-variance-authority (CVA)**

### **Patrón de Componente Estándar**

```tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function ServiceCard({ title, description }: ServiceCardProps) {
  return (
    <Card 
      className="border-primary" 
      style={{ boxShadow: 'var(--shadow-3d-md)' }}
    >
      <CardHeader>
        <CardTitle className="neon-cyan-card-title font-display">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-sans text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Button 
          className="
            hover:opacity-80 
            transition-all duration-200
            ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
          "
          style={{ boxShadow: 'var(--shadow-3d-sm)' }}
        >
          Ver más
        </Button>
      </CardFooter>
    </Card>
  );
}
```

### **Componentes Disponibles**

- **Layouts**: Card, Separator, Aspect Ratio
- **Forms**: Input, Textarea, Select, Checkbox, Radio, Switch
- **Feedback**: Alert, Toast, Dialog, Sheet
- **Navigation**: Tabs, Dropdown Menu, Navigation Menu
- **Data Display**: Table, Badge, Avatar
- **Overlays**: Tooltip, Popover, Hover Card

---

## **4. TAILWIND CSS V4 - MEJORES PRÁCTICAS**

### **Mobile-First Design**

```tsx
// ✅ Correcto: de móvil a escritorio
<div className="w-full md:w-1/2 lg:w-1/3">

// ❌ Incorrecto: al revés
<div className="lg:w-1/3 md:w-1/2 w-full">
```

### **Breakpoints Estándar**

- `sm:` - 640px (tablet pequeña)
- `md:` - 768px (tablet)
- `lg:` - 1024px (laptop)
- `xl:` - 1280px (desktop)
- `2xl:` - 1536px (pantallas grandes)

### **Dark Mode**

```tsx
// Usar prefijo dark:
<div className="bg-white dark:bg-gray-900">
  <h1 className="text-gray-900 dark:text-gray-100">Título</h1>
</div>
```

### **Estados Interactivos**

```tsx
// Hover, Focus, Active
<Button className="
  bg-primary 
  hover:bg-primary/90 
  focus:ring-2 focus:ring-primary 
  active:scale-95
  transition-all duration-200
">
  Click me
</Button>
```

### **Composición de Clases con cn()**

```tsx
import { cn } from '@/lib/utils';

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  className // prop externa
)}>
```

---

## **5. MAGIC UI - COMPONENTES ANIMADOS**

### **Componentes Disponibles**

- **Animaciones de entrada**: FadeIn, SlideIn, ScaleIn
- **Efectos de fondo**: Particles, Waves, Gradient
- **Elementos interactivos**: AnimatedButton, HoverCard
- **Texto**: TypewriterEffect, ShimmerText

### **Ejemplo de Uso**

```tsx
import { FadeIn } from '@/components/magicui/fade-in';
import { Particles } from '@/components/magicui/particles';

export function HeroSection() {
  return (
    <div className="relative">
      <Particles className="absolute inset-0" />
      <FadeIn delay={0.2}>
        <h1 className="neon-cyan-title">Bienvenido</h1>
      </FadeIn>
    </div>
  );
}
```

---

## **6. CHECKLIST DE ESTILO OBLIGATORIO**

Cada componente debe cumplir:

- [ ] Usa colores del tema (primary/secondary)
- [ ] Implementa sombras 3D donde corresponde
- [ ] Usa tipografías correctas (font-display/font-sans)
- [ ] Tiene hover:opacity-80 en elementos interactivos
- [ ] Usa timing WAS (duration-200/300) y easing correcto
- [ ] Es responsive mobile-first
- [ ] Soporta dark mode
- [ ] Usa espaciado semántico (3, 6, 8, 16)

---

## **7. ANTI-PATRONES A EVITAR**

### **❌ NO: Colores Hardcodeados**

```tsx
// ❌ Incorrecto
<div className="bg-[#dc7cb3]">

// ✅ Correcto
<div className="bg-primary">
```

### **❌ NO: CSS Inline Sin Variables**

```tsx
// ❌ Incorrecto
<div style={{ color: '#dc7cb3' }}>

// ✅ Correcto
<div className="text-primary">
```

### **❌ NO: Animaciones Sin Easing**

```tsx
// ❌ Incorrecto
<Button className="transition-all duration-200">

// ✅ Correcto
<Button className="transition-all duration-200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
```

### **❌ NO: Modificar Componentes UI**

```tsx
// ❌ NUNCA modificar src/components/ui/button.tsx

// ✅ Crear wrapper personalizado
export function CustomButton(props: ButtonProps) {
  return (
    <Button {...props} className={cn("custom-classes", props.className)} />
  );
}
```

---

## **8. RESPONSIVE DESIGN PATTERNS**

### **Grid Responsivo**

```tsx
<div className="
  grid 
  grid-cols-1 
  md:grid-cols-2 
  lg:grid-cols-3 
  gap-6
">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

### **Texto Responsivo**

```tsx
<h1 className="
  text-2xl md:text-4xl lg:text-6xl 
  font-display
">
  Título Responsivo
</h1>
```

### **Espaciado Responsivo**

```tsx
<section className="
  px-4 md:px-8 lg:px-16
  py-8 md:py-12 lg:py-16
">
  Contenido
</section>
```

---

## **9. ACCESIBILIDAD (WCAG 2.1 AA)**

### **Contraste de Colores**

- ✅ Ratio mínimo **4.5:1** para texto normal
- ✅ Ratio mínimo **3:1** para texto grande (>18px)
- ✅ Usar herramientas: Contrast Checker, axe DevTools

### **Navegación por Teclado**

```tsx
<Button
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  Accesible
</Button>
```

### **ARIA Labels**

```tsx
<button aria-label="Cerrar modal">
  <X className="h-4 w-4" />
</button>

<nav aria-label="Navegación principal">
  {/* contenido */}
</nav>
```

### **Focus Visible**

```tsx
<Button className="
  focus:outline-none 
  focus:ring-2 
  focus:ring-primary 
  focus:ring-offset-2
">
  Con Focus
</Button>
```

---

## **10. PERFORMANCE**

### **Optimización de Imágenes**

```tsx
import Image from 'next/image';

<Image
  src="/hero-image.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority // Para above-the-fold
  placeholder="blur"
/>
```

### **Lazy Loading**

```tsx
import dynamic from 'next/dynamic';

// Componente pesado con lazy loading
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false // Si no se necesita SSR
});
```

### **CSS-in-JS Mínimo**

- ✅ Preferir **Tailwind** sobre styled-components
- ✅ Usar **CSS variables** para temas
- ✅ Evitar **inline styles** complejos

---

## **REFERENCIAS**

- WebCode Style Reference: `.github/WEBCODE-STYLE-REFERENCE.md`
- shadcn/ui Documentation: https://ui.shadcn.com
- Tailwind CSS v4: https://tailwindcss.com
- WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
