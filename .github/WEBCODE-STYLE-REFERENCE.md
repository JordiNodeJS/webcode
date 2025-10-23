# 🎨 Referencia Rápida de Estilos WebCode

## Sistema de Diseño WebCode (WAS - WebCode Animation System)

> **Documento de referencia para mantener consistencia visual en toda la web**  
> **Última actualización**: 2025-10-23 - Release Candidate 98%  
> **Stack**: Next.js 16.0.0 + React 19.2.0 + Tailwind v4 + Lucide React 0.542.0

---

## 🎯 Principios Fundamentales

1. **Paleta Rosa/Aguamarina** - Colores vibrantes con gradientes suaves
2. **Sombras 3D características** - Offset de 2-6px con color del tema
3. **Animaciones profesionales** - Timing y easing específicos WAS
4. **Tipografía expresiva** - Geist Sans, Space Grotesk, Lora, Fira Code
5. **Dark mode completo** - Variables automáticas para todos los temas

---

## 🎨 Colores del Tema (OKLCH)

### Modo Claro

```css
--primary: oklch(0.57 0.2 328.5)              /* #dc7cb3 - Rosa principal */
--secondary: oklch(0.43 0.18 184.1)           /* #bce3e5 - Aguamarina */
--primary-rgb: 220, 124, 179                  /* RGB para efectos */
--secondary-rgb: 130, 200, 210                /* RGB para efectos */
```

### Modo Oscuro

```css
--primary: oklch(0.84 0.16 328.5)             /* Rosa brillante */
--secondary: oklch(0.45 0.18 184.1)           /* Aguamarina oscuro */
--primary-rgb: 255, 170, 215                  /* RGB más brillante */
--secondary-rgb: 100, 180, 200                /* RGB más brillante */
```

### Uso en Componentes

```tsx
// ✅ Con Tailwind
<div className="bg-primary text-primary-foreground">

// ✅ Con CSS inline
<div style={{ color: 'rgb(var(--primary-rgb))' }}>

// ✅ Para gradientes
<div className="bg-gradient-webcode">
```

---

## 💎 Sistema de Sombras 3D

### Definiciones

```css
--shadow-3d-xs: 2px 2px 0px oklch(0.57 0.2 328.5 / 0.4)
--shadow-3d-sm: 3px 3px 0px oklch(0.57 0.2 328.5 / 0.6)
--shadow-3d-md: 3px 3px 0px + blur oklch(0.57 0.2 328.5 / 0.8)
--shadow-3d-lg: 4px 4px 0px + blur oklch(0.57 0.2 328.5 / 0.8)
--shadow-3d-xl: 6px 6px 0px + blur oklch(0.57 0.2 328.5 / 0.9)
```

### Aplicación

```tsx
// ✅ Con style inline
<div style={{ boxShadow: 'var(--shadow-3d-md)' }}>

// ✅ Con clase utilitaria
<div className="shadow-3d-md">

// ✅ En componentes Button/Card
<Button style={{ boxShadow: 'var(--shadow-3d-sm)' }}>
```

### Cuándo usar cada sombra

- **xs**: Bordes sutiles, elementos pequeños
- **sm**: Botones, inputs, elementos interactivos pequeños
- **md**: Cards, containers, elementos estándar (MÁS COMÚN)
- **lg**: Modales, destacados, elementos importantes
- **xl**: Hero sections, elementos principales de página

---

## ✍️ Tipografía

### Fuentes Definidas

```css
--font-sans: var(--font-geist-sans)    /* Texto general y cuerpo */
--font-display: Space Grotesk          /* Títulos y elementos destacados */
--font-serif: Lora                     /* Textos largos y citas */
--font-mono: var(--font-geist-mono)    /* Código y elementos técnicos */
```

### Uso en Tailwind

```tsx
<p className="font-sans">Texto general en Geist Sans</p>
<h1 className="font-display">Título en Space Grotesk</h1>
<article className="font-serif">Artículo en Lora</article>
<code className="font-mono">Código en Geist Mono</code>
```

### Escalas Recomendadas

```tsx
// Títulos principales
<h1 className="text-6xl md:text-7xl lg:text-8xl font-display">

// Títulos de sección
<h2 className="text-4xl md:text-5xl font-display">

// Títulos de card
<h3 className="text-2xl md:text-3xl font-display">

// Texto de cuerpo
<p className="text-base md:text-lg font-sans">
```

---

## 🎬 Sistema de Animaciones WAS

### Timing y Easing

```typescript
// Curvas de animación
const wsCurves = {
  primary: [0.25, 0.46, 0.45, 0.94],   // ⭐ Curva principal profesional
  smooth: [0.4, 0, 0.2, 1],             // Suave y natural
  bounce: [0.68, -0.55, 0.265, 1.55],   // Con rebote
  dramatic: [0.87, 0, 0.13, 1]          // Dramático
};

// Duraciones estándar
const timings = {
  instant: 0.1,    // 100ms - Cambios instantáneos
  quick: 0.2,      // 200ms - ⭐ Interacciones rápidas (hover)
  normal: 0.3,     // 300ms - ⭐ Estándar WebCode
  smooth: 0.5,     // 500ms - Transiciones suaves
  dramatic: 0.8,   // 800ms - Efectos dramáticos
  slow: 1.2        // 1200ms - Animaciones lentas
};
```

### Implementación

```tsx
// ✅ Con Tailwind
<div className="
  transition-all 
  duration-300 
  ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
">

// ✅ Con Framer Motion
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.3,
    ease: [0.25, 0.46, 0.45, 0.94]
  }}
>
```

---

## 🎭 Estados Hover Estándar

### Patrón WebCode

```tsx
<button className="
  bg-primary text-primary-foreground
  hover:opacity-80                    /* ⭐ Opacidad 0.8 estándar */
  hover:scale-102                     /* Escala sutil 1.02 */
  hover:-translate-y-1                /* Elevación sutil -4px */
  transition-all duration-200 
  ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
">
```

### Estados Completos

```tsx
<button className="
  /* Base */
  bg-primary text-primary-foreground
  
  /* Hover */
  hover:opacity-80
  hover:-translate-y-0.5
  
  /* Focus */
  focus:ring-2 focus:ring-ring focus:outline-none
  
  /* Active */
  active:scale-95
  
  /* Disabled */
  disabled:opacity-50 
  disabled:cursor-not-allowed
  
  /* Transition */
  transition-all duration-200
  ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
"
style={{ boxShadow: 'var(--shadow-3d-sm)' }}
>
```

---

## 🌟 Clases Especiales WebCode

### Títulos con Gradiente Neón

```tsx
// Título principal con efecto neón
<h1 className="neon-cyan-title">
  Título Principal WebCode
</h1>

// Título de tarjeta con gradiente
<h2 className="neon-cyan-card-title">
  Título de Card
</h2>
```

**Características:**
- Gradiente rosa → aguamarina automático
- Modo claro: gradiente suave
- Modo oscuro: efecto neón con text-shadow
- `-webkit-background-clip: text` para efecto transparente

### Fondos con Gradiente WebCode

```tsx
// Fondo con gradiente del tema
<div className="bg-gradient-webcode">
  {/* Se ajusta automáticamente claro/oscuro */}
</div>

// Texto con gradiente
<p className="text-gradient-webcode text-4xl font-bold">
  Texto con gradiente rosa-aguamarina
</p>
```

### Sombras 3D Directas

```tsx
<div className="shadow-3d-xs">Extra pequeño</div>
<div className="shadow-3d-sm">Pequeño</div>
<div className="shadow-3d-md">Mediano (estándar)</div>
<div className="shadow-3d-lg">Grande</div>
<div className="shadow-3d-xl">Extra grande</div>
```

---

## 📐 Espaciado Semántico

### Sistema WebCode

```tsx
/* Variables de espaciado */
--spacing-text: 0.75rem      /* 12px - gap-3, p-3 */
--spacing-element: 1.5rem    /* 24px - gap-6, p-6 */
--spacing-component: 2rem    /* 32px - gap-8, p-8 */
--spacing-section: 4rem      /* 64px - gap-16, p-16 */
```

### Aplicación

```tsx
// Espaciado entre textos
<div className="space-y-3">

// Espaciado entre elementos
<div className="space-y-6">

// Espaciado entre componentes
<div className="space-y-8">

// Espaciado entre secciones
<div className="space-y-16">
```

---

## 📱 Responsive Design

### Mobile-First Approach

```tsx
// ✅ Siempre mobile-first
<div className="
  grid 
  grid-cols-1           /* Móvil: 1 columna */
  md:grid-cols-2        /* Tablet: 2 columnas */
  lg:grid-cols-3        /* Desktop: 3 columnas */
  gap-6 md:gap-8        /* Espaciado responsive */
">
```

### Breakpoints Tailwind

```
sm: 640px    /* Móvil grande */
md: 768px    /* Tablet */
lg: 1024px   /* Desktop */
xl: 1280px   /* Desktop grande */
2xl: 1536px  /* Desktop extra grande */
```

---

## 🌓 Dark Mode

### Con Tailwind

```tsx
<div className="
  bg-background 
  text-foreground 
  border-border
">
  {/* Variables se ajustan automáticamente */}
</div>
```

### Con Variables CSS

```tsx
<div style={{
  backgroundColor: 'var(--background)',
  color: 'var(--foreground)',
  borderColor: 'var(--border)'
}}>
```

---

## 🧩 Patrones de Componentes

### Card Estándar WebCode

```tsx
<Card 
  className="border-primary" 
  style={{ boxShadow: 'var(--shadow-3d-md)' }}
>
  <CardHeader>
    <CardTitle className="neon-cyan-card-title">
      Título con Gradiente
    </CardTitle>
    <CardDescription>Descripción de la card</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="font-sans">Contenido de la tarjeta</p>
  </CardContent>
  <CardFooter>
    <Button 
      className="hover:opacity-80"
      style={{ boxShadow: 'var(--shadow-3d-sm)' }}
    >
      Acción
    </Button>
  </CardFooter>
</Card>
```

### Botón Estándar WebCode

```tsx
<Button
  variant="default"                    /* bg-primary automático */
  size="lg"
  className="
    hover:opacity-80 
    hover:-translate-y-0.5
    transition-all duration-200
  "
  style={{ boxShadow: 'var(--shadow-3d-sm)' }}
>
  Botón WebCode
</Button>
```

### Sección Hero

```tsx
<section className="bg-gradient-webcode min-h-screen flex items-center">
  <div className="container mx-auto px-4 py-16">
    <h1 className="
      neon-cyan-title 
      text-6xl md:text-7xl lg:text-8xl 
      font-display 
      mb-6
    ">
      WebCode
    </h1>
    <p className="
      text-lg md:text-xl 
      text-muted-foreground 
      font-sans 
      max-w-2xl
    ">
      Descripción del servicio
    </p>
  </div>
</section>
```

---

## ❌ Anti-Patrones (Evitar)

```tsx
// ❌ Colores hardcodeados
<div className="bg-blue-500 text-white">

// ✅ Colores del tema
<div className="bg-primary text-primary-foreground">

// ❌ Sombras genéricas
<div className="shadow-lg">

// ✅ Sombras 3D WebCode
<div style={{ boxShadow: 'var(--shadow-3d-lg)' }}>

// ❌ Transiciones sin timing específico
<div className="transition ease-in-out">

// ✅ Timing y easing WebCode
<div className="transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">

// ❌ Tipografías inconsistentes
<h1 style={{ fontFamily: 'Arial' }}>

// ✅ Tipografías del sistema
<h1 className="font-display">

// ❌ Espaciado aleatorio
<div className="mb-7 gap-5">

// ✅ Espaciado semántico
<div className="mb-6 gap-6">
```

---

## ✅ Checklist de Componente WebCode

Antes de considerar completo un componente, verifica:

- [ ] **Colores**: ¿Usa variables del tema (primary/secondary)?
- [ ] **Sombras**: ¿Implementa sombras 3D donde corresponde?
- [ ] **Tipografía**: ¿Usa font-display, font-sans, etc.?
- [ ] **Hover**: ¿Tiene hover:opacity-80 o efecto equivalente?
- [ ] **Animaciones**: ¿Usa timing WAS (duration-200/300) y easing correcto?
- [ ] **Responsive**: ¿Es mobile-first con breakpoints apropiados?
- [ ] **Dark Mode**: ¿Funciona correctamente en modo oscuro?
- [ ] **Espaciado**: ¿Usa valores semánticos (3, 6, 8, 16)?
- [ ] **Estados**: ¿Tiene hover/focus/active/disabled completos?
- [ ] **Accesibilidad**: ¿Tiene focus-ring, aria-labels si corresponde?

---

## 📚 Referencias Completas

### Documentación Principal

- **Guía de Estilos Base**: `docs/03-DISENO-guia-estilos-base.md`
- **Guía Extendida**: `docs/04-DISENO-guia-estilos-extendida.md`
- **Sistema WAS**: `docs/05-DISENO-sistema-animaciones-websnack.md`
- **Plan de Consistencia**: `docs/09-DESARROLLO-plan-consistencia.md`

### Archivos de Implementación

- **Estilos Globales**: `src/app/globals.css`
- **Theme Colors (JS)**: `src/lib/theme-colors.ts`
- **Tema de Código**: `src/styles/webcode-code-theme.css`

### Instrucciones

- **Styling**: `.github/instructions/styling.instructions.md`
- **Components**: `.github/instructions/components.instructions.md`
- **TypeScript**: `.github/instructions/typescript.instructions.md`

---

## 🎯 Resumen Ejecutivo

**Colores**: Rosa (#dc7cb3) + Aguamarina (#bce3e5)  
**Sombras**: 3D offset con color del tema  
**Animaciones**: cubic-bezier(0.25, 0.46, 0.45, 0.94) + 200-300ms  
**Tipografía**: Geist Sans (body) + Space Grotesk (titles)  
**Hover**: opacity-80 + translate-y-0.5 + scale-102  
**Espaciado**: 3, 6, 8, 16 (texto, elemento, componente, sección)

---

**Última actualización**: Octubre 2025  
**Versión del sistema**: WAS 1.0 (WebCode Animation System)  
**Estado**: ✅ Listo para producción - Performance 100/100
