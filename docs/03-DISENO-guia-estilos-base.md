# Guía de Estilos Base WebSnack

> Nota rápida: si eres autor/a de componentes UI, consulta la "Guía rápida de estilos" en `docs/components/UI-Styles-Quick-Guide.md` para reglas prácticas y ejemplos. Esta guía es un resumen accionable de esta documentación.

## 1. Principios de Diseño

### Filosofía

Basado en el stack tecnológico de Next.js 15 + React 19 + Tailwind CSS v4, nuestro sistema de diseño se fundamenta en:

- **Elegancia minimalista**: Cada elemento tiene un propósito específico
- **Sistema de Animaciones WebSnack (WAS)**: Transiciones profesionales con `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- **Paleta Rosa-Aguamarina**: Colores vibrantes con gradientes suaves
- **Efectos 3D**: Sombras y profundidad para elementos interactivos
- **Tipografía Display**: Poppins para títulos, Space Grotesk para UI
- **Tipografía expresiva**: Poppins, Space Grotesk y Lora como fuentes principales
- **Espaciado semántico**: Sistema basado en CSS custom properties para consistencia

### Valores Visuales

- **Consistencia**: Mismos patrones en toda la aplicación usando design tokens
- **Claridad**: Información jerarquizada con Tailwind CSS v4
- **Accesibilidad**: Diseño inclusivo WCAG 2.1 AA compatible con shadcn/ui
- **Performance**: Optimización visual sin sacrificar funcionalidad (Core Web Vitals)

## 2. Sistema de Color - Tema WebSnack

### Paleta Principal (Rosa/Aguamarina con efectos 3D)

```css
/* Light Mode - WebSnack Theme */
:root {
  --background: #ffffff;
  --foreground: #5b5b5b;
  --card: #ffffff;
  --card-foreground: #5b5b5b;
  --popover: #ffffff;
  --popover-foreground: #5b5b5b;
  --primary: #dc7cb3; /* Rosa principal WebSnack */
  --primary-foreground: #ffffff;
  --secondary: #bce3e5; /* Aguamarina WebSnack */
  --secondary-foreground: #333333;
  --muted: #f4fbfc;
  --muted-foreground: #7a7a7a;
  --accent: #fffcf7;
  --accent-foreground: #333333;
  --destructive: #fcb4b5;
  --destructive-foreground: #ffffff;
  --border: #dc7cb3;
  --input: #e4e4e4;
  --ring: #f0aacd;
  /* Sombras 3D personalizadas */
  --shadow-3d-sm: 3px 3px 0px 0px hsl(325.5319 58.0247% 68.2353% / 1);
  --shadow-3d-md:
    3px 3px 0px 0px hsl(325.5319 58.0247% 68.2353% / 1),
    3px 2px 4px -1px hsl(325.5319 58.0247% 68.2353% / 1);
  --shadow-3d-lg:
    3px 3px 0px 0px hsl(325.5319 58.0247% 68.2353% / 1),
    3px 4px 6px -1px hsl(325.5319 58.0247% 68.2353% / 1);
  --shadow-3d-xl:
    3px 3px 0px 0px hsl(325.5319 58.0247% 68.2353% / 1),
    3px 8px 10px -1px hsl(325.5319 58.0247% 68.2353% / 1);
}

/* Dark Mode - WebSnack Theme */
.dark {
  --background: #162b37;
  --foreground: #ffffff;
  --card: #223743;
  --card-foreground: #ffffff;
  --primary: #fffcf7;
  --primary-foreground: #162b37;
  --secondary: #f6dee4;
  --secondary-foreground: #162b37;
  --muted: #2b2f34;
  --muted-foreground: #f6dee4;
  --accent: #d9a8ba;
  --accent-foreground: #ffffff;
  /* Sombras 3D para dark mode */
  --shadow-3d-sm: 3px 3px 0px 0px hsl(206.8085 28.1437% 32.7451% / 1);
  --shadow-3d-md:
    3px 3px 0px 0px hsl(206.8085 28.1437% 32.7451% / 1),
    3px 2px 4px -1px hsl(206.8085 28.1437% 32.7451% / 1);
  --shadow-3d-lg:
    3px 3px 0px 0px hsl(206.8085 28.1437% 32.7451% / 1),
    3px 4px 6px -1px hsl(206.8085 28.1437% 32.7451% / 1);
}
```

### Uso de Colores en shadcn/ui

- **Primary**: CTAs principales, elementos de marca rosa
- **Secondary**: Elementos de apoyo en aguamarina
- **Accent**: Highlights y estados hover
- **Muted**: Textos secundarios y elementos disabled
- **Destructive**: Errores y alertas

## 3. Tipografía - Stack WebSnack

### Familias de Fuentes (Según Stack 2025)

```css
/* Definidas en variables CSS según stack tecnológico */
--font-sans: Poppins, sans-serif; /* Texto general y cuerpo */
--font-display: Space Grotesk, sans-serif; /* Títulos y elementos destacados */
--font-serif: Lora, serif; /* Textos largos y citas */
--font-mono: Fira Code, monospace; /* Código y elementos técnicos */
```

### Implementación con Tailwind CSS v4

```tsx
// Clase font-sans para texto general
<p className="font-sans text-base">Texto de cuerpo en Poppins</p>

// Clase font-display para títulos
<h1 className="font-display text-4xl font-bold">Título en Space Grotesk</h1>

// Clase font-serif para contenido largo
<article className="font-serif text-lg">Artículo en Lora</article>

// Clase font-mono para código
<code className="font-mono text-sm">const websnack = "awesome";</code>
```

### Escalas Tipográficas (Tailwind CSS v4)

```css
/* Heading Scale optimizada para WebSnack */
.text-8xl: 6rem (96px)    /* Hero titles principales */
.text-7xl: 4.5rem (72px)  /* Main titles de sección */
.text-6xl: 3.75rem (60px) /* Section titles */
.text-5xl: 3rem (48px)    /* Subsection titles */
.text-4xl: 2.25rem (36px) /* Card titles */
.text-3xl: 1.875rem (30px) /* Small titles */
.text-2xl: 1.5rem (24px)  /* Large text */
.text-xl: 1.25rem (20px)  /* Medium text */
.text-lg: 1.125rem (18px) /* Body large */
.text-base: 1rem (16px)   /* Body default */
.text-sm: 0.875rem (14px) /* Body small */
.text-xs: 0.75rem (12px)  /* Captions y notas */
```

### Letter Spacing (Optimizado para Poppins)

```css
/* Valores específicos para las fuentes WebSnack */
.tracking-tighter: -0.05em  /* Para Space Grotesk en títulos grandes */
.tracking-tight: -0.025em   /* Para subtítulos */
.tracking-normal: 0em       /* Texto normal en Poppins */
.tracking-wide: 0.025em     /* Labels y botones */
.tracking-wider: 0.05em     /* Títulos principales */
.tracking-widest: 0.1em     /* Elementos muy destacados */
```

## 4. Espaciado y Dimensiones - Tailwind CSS v4

### Sistema de Espaciado (Design Tokens)

```css
/* Base: 0.25rem (4px) - Sistema de Tailwind CSS v4 */
--spacing: 0.25rem;

/* Espaciado semántico WebSnack */
--spacing-text: 0.75rem; /* 12px - Entre líneas de texto */
--spacing-element: 1.5rem; /* 24px - Entre elementos relacionados */
--spacing-component: 2rem; /* 32px - Entre componentes */
--spacing-section: 4rem; /* 64px - Entre secciones principales */
```

### Clases de Espaciado Tailwind v4

```css
/* Padding/Margin estándar */
0: 0px     /* p-0, m-0 */
1: 4px     /* p-1, m-1 */
2: 8px     /* p-2, m-2 */
3: 12px    /* p-3, m-3 */
4: 16px    /* p-4, m-4 */
6: 24px    /* p-6, m-6 */
8: 32px    /* p-8, m-8 */
12: 48px   /* p-12, m-12 */
16: 64px   /* p-16, m-16 */
20: 80px   /* p-20, m-20 */
24: 96px   /* p-24, m-24 */
```

### Contenedores Responsive

```css
/* Container con max-width responsivo */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem; /* 16px base */
}

/* Breakpoints Tailwind CSS v4 */
@media (min-width: 640px) {
  /* sm: */
  .container {
    padding: 0 1.5rem;
  } /* 24px */
}

@media (min-width: 1024px) {
  /* lg: */
  .container {
    padding: 0 2rem;
  } /* 32px */
}

@media (min-width: 1280px) {
  /* xl: */
  .container {
    padding: 0 2.5rem;
  } /* 40px */
## Arquitectura de estilos del proyecto (estado actual · 2025-09-29)

Esta sección documenta cómo está organizado el CSS en el repositorio actualmente, qué roles cumplen los estilos globales vs. los estilos “locales” por componente y las mejores prácticas para mantener el sistema.

### Stack y punto único de estilo

- Tailwind CSS v4 vía PostCSS (`postcss.config.mjs` usa `@tailwindcss/postcss`).
- Import único de estilos globales en `src/app/layout.tsx`:
  - `import "./globals.css";`
- Hoja global principal: `src/app/globals.css`.
- No hay `tailwind.config.*` (Tailwind v4 no lo requiere por defecto).
- No hay `.module.css` ni SCSS en uso; el estilado se hace con utilidades Tailwind + utilidades globales.

### Qué contiene `src/app/globals.css`

- Mapeo de design tokens a Tailwind v4 con `@theme inline`.
- Variables de tema en `:root` y `.dark` (colores OKLCH, radios, paleta de charts, sidebar, ring, etc.).
- `@layer base` para estilos base: color de fondo, color de texto, overflow y outline/border.
- Utilidades de marca reutilizables (clases globales):
  - Tipografía y gradientes: `.text-gradient-webcode`, `.neon-cyan-title`, `.neon-cyan-card-title`.
  - Sombras 3D: `.shadow-3d-sm|md|lg|xl`.
  - Fondos: `.bg-gradient-webcode`.
  - Animaciones: `@keyframes wave-*` + `.animate-wave-slow|medium|fast`, `.waves-background`, `.animation-suspended`, `.reduce-motion`.
  - Efectos “neón” de marca: `.neon-theme`, `.neon-theme-soft`.
- Accesibilidad y rendimiento:
  - Reglas para `prefers-reduced-motion` y `prefers-contrast: more`.
  - Fallbacks para `background-clip: text`.

### Cómo aplican estilos los componentes

- Por defecto, los componentes usan utilidades Tailwind directamente en el JSX.
- Componentes UI (por ejemplo, `button`, `badge`, `card`) usan `class-variance-authority (cva)` y el helper `cn()` (`src/lib/utils.ts`) para variantes y composición de clases.
- Las utilidades globales de marca de `globals.css` se consumen en varios componentes cuando aportan consistencia visual:
  - `.text-gradient-webcode`: `src/components/landing/hero/Hero.Content.tsx`, `Hero.HeaderNavigation.tsx`.
  - `.neon-cyan-title`: `src/components/landing/services/Services.Header.tsx`.
  - `.neon-cyan-card-title`: `src/components/landing/services/Services.Card.tsx`.
  - `.shadow-3d-*`: tarjetas en `Hero.ValuePropsGrid*`, `PerformanceTestLab`, etc.
  - `.waves-background` + `.animate-wave-*`: `src/components/landing/hero/Hero.WavesBackground.tsx`.

### Decisión: estilos locales vs. utilidades globales

- Usa utilidades Tailwind “locales” (inline en el componente) por defecto: favorece la cercanía, reduce acoplamiento y es fácil de refactorizar.
- Eleva a “utilidad global” en `globals.css` solo cuando se cumpla al menos uno:
  - Es un patrón de marca transversal (gradientes, sombras 3D, efectos neon, animaciones de héroe).
  - Se usa en 3 o más lugares.
  - Apoya accesibilidad o rendimiento a nivel de aplicación.
- Considera CSS Modules únicamente si necesitas:
  - Selectores complejos no expresables de forma limpia con Tailwind.
  - Aislamiento fuerte para overrides de librerías externas.
  - Animaciones/estilos muy específicos y difíciles de mantener como utilities.

### Modo oscuro, accesibilidad y rendimiento

- Modo oscuro controlado por `ThemeProvider` (atributo `class`) y variables en `.dark`.
- No dupliques colores en componentes: usa los tokens (`var(--primary)`, etc.) ya mapeados a utilidades Tailwind.
- Mantén `prefers-reduced-motion` y suspensiones de animación (`.animation-suspended`) en secciones con coste.
- En móviles, evita sombras/blur pesados; condiciona por breakpoint (`md:`) o atributos `data-*`.

### Roadmap opcional (si crece `globals.css`)

Para mantener claridad sin cambiar el runtime, puedes dividir en archivos temáticos e importarlos desde `globals.css`:

- `tokens.css` — Design tokens y `:root`/`.dark`.
- `utilities.css` — Sombras, gradientes, neon, helpers de marca.
- `animations.css` — Keyframes y clases relacionadas con animación.

Esto preserva un único `import "./globals.css";` en el layout.

### Checklist rápida para PRs

- [ ] ¿Estoy usando utilidades Tailwind locales por defecto?
- [ ] ¿He reutilizado una utilidad global existente (gradiente/sombra/animación) antes de crear otra?
- [ ] ¿Los colores provienen de tokens/tema y no están hardcodeados?
- [ ] ¿Afecta a accesibilidad (contraste, reduced motion) y está contemplado?
- [ ] ¿El cambio aplica bien en light/dark sin hacks locales de color?

> Referencias relacionadas: `docs/04-DISENO-guia-estilos-extendida.md` (tokens y patrones), `docs/05-DISENO-sistema-animaciones-websnack.md` (WAS/animaciones), `docs/09-DESARROLLO-plan-consistencia.md` (consistencia y checklist de implementación).

}
```

## 5. Sombras 3D y Efectos - Tema WebSnack

### Sistema de Sombras 3D Personalizadas

```css
/* Sombras 3D con colores del tema WebSnack */
--shadow-3d-xs: 3px 3px 0px 0px hsl(325.5319 58.0247% 68.2353% / 0.5);
--shadow-3d-sm: 3px 3px 0px 0px hsl(325.5319 58.0247% 68.2353% / 1);
--shadow-3d-md:
  3px 3px 0px 0px hsl(325.5319 58.0247% 68.2353% / 1),
  3px 2px 4px -1px hsl(325.5319 58.0247% 68.2353% / 1);
--shadow-3d-lg:
  3px 3px 0px 0px hsl(325.5319 58.0247% 68.2353% / 1),
  3px 4px 6px -1px hsl(325.5319 58.0247% 68.2353% / 1);
--shadow-3d-xl:
  3px 3px 0px 0px hsl(325.5319 58.0247% 68.2353% / 1),
  3px 8px 10px -1px hsl(325.5319 58.0247% 68.2353% / 1);
```

### Border Radius (shadcn/ui Compatible)

```css
/* Radius system basado en --radius variable */
--radius: 0.4rem; /* Base radius WebSnack */
--radius-sm: calc(var(--radius) - 4px); /* 0.1rem */
--radius-md: calc(var(--radius) - 2px); /* 0.3rem */
--radius-lg: var(--radius); /* 0.4rem */
--radius-xl: calc(var(--radius) + 4px); /* 0.6rem */
```

### Aplicación en Componentes

```tsx
// Botón con sombra 3D
<Button className="shadow-3d-sm hover:shadow-3d-md transition-all">
  Botón WebSnack
</Button>

// Card con efectos
<Card className="shadow-3d-md rounded-lg border-primary/20">
  Contenido
</Card>
```

## 6. Sistema de Animaciones WebSnack (WAS) - Integración con Framer Motion

### Curvas de Animación WebSnack (Sistema Propio)

```css
/* Easing curves del Sistema WebSnack */
.ws-transition: cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Principal */
.ws-transition-quick: 0.2s cubic-bezier(0.4, 0, 0.2, 1); /* Interacciones rápidas */
.ws-transition-normal: 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Transiciones normales */
.ws-transition-smooth: 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Animaciones complejas */
.ws-transition-dramatic: 0.8s cubic-bezier(0.87, 0, 0.13, 1); /* Efectos dramáticos */
```

### Keyframes WebSnack Implementados

```css
/* Animaciones basadas en Sistema WebSnack */
@keyframes wsFadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes wsLetterReveal {
  0% {
    opacity: 0;
    transform: translateY(30px) rotateX(90deg);
  }
  100% {
    opacity: 1;
    transform: translateY(0) rotateX(0);
  }
}

@keyframes wsImagePop {
  0% {
    opacity: 0;
    transform: scale(0) rotate(180deg);
  }
  50% {
    transform: scale(1.1) rotate(90deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0);
  }
}

@keyframes wsSmoothGlow {
  0% {
    filter: brightness(1) blur(0);
  }
  50% {
    filter: brightness(1.1) blur(1px);
  }
  100% {
    filter: brightness(1) blur(0);
  }
}
```

### Implementación con Framer Motion

```tsx
// Configuración de easing para Framer Motion
const wsCurves = {
  primary: [0.25, 0.46, 0.45, 0.94],
  smooth: [0.4, 0, 0.2, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  dramatic: [0.87, 0, 0.13, 1]
};

// Transición WebSnack en componentes
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.3,
    ease: wsCurves.primary
  }}
>
  Contenido con animación WebSnack
</motion.div>;
```

## 7. Componentes Base - shadcn/ui + WebSnack Theme

### Botones (Button Component)

```tsx
// Botón primario con tema WebSnack
<Button
  variant="default"
  size="lg"
  className="bg-primary text-primary-foreground shadow-3d-sm hover:shadow-3d-md transition-all duration-300 tracking-wide"
>
  Acción Principal
</Button>

// Botón secundario
<Button
  variant="outline"
  size="default"
  className="border-primary text-primary shadow-3d-xs hover:shadow-3d-sm hover:bg-primary/10 tracking-wide"
>
  Acción Secundaria
</Button>

// Botón ghost con efecto Elva
<Button
  variant="ghost"
  size="sm"
  className="text-primary hover:text-primary/70 hover:bg-primary/5 elva-transition tracking-wide"
>
  Acción Suave
</Button>
```

### Cards (Card Component)

```tsx
<Card className="shadow-3d-md hover:shadow-3d-lg transition-all duration-300 border-primary/20 bg-card">
  <CardHeader className="pb-4">
    <CardTitle className="font-display tracking-wide text-xl text-primary">
      Título de la Card
    </CardTitle>
    <CardDescription className="text-muted-foreground tracking-wide font-sans">
      Descripción del contenido con Poppins
    </CardDescription>
  </CardHeader>
  <CardContent className="space-y-4 font-sans">
    <p className="text-card-foreground">Contenido de la tarjeta</p>
  </CardContent>
  <CardFooter>
    <Button className="w-full">Acción</Button>
  </CardFooter>
</Card>
```

### Input Fields (Input Component)

```tsx
<div className="space-y-2">
  <Label
    htmlFor="input"
    className="tracking-wide text-sm font-medium font-sans text-foreground"
  >
    Etiqueta del Campo
  </Label>
  <Input
    id="input"
    placeholder="Texto de ejemplo..."
    className="border-primary/30 focus:border-primary focus:ring-primary/20 shadow-3d-xs focus:shadow-3d-sm transition-all tracking-wide font-sans"
  />
  <p className="text-xs text-muted-foreground font-sans">
    Texto de ayuda opcional
  </p>
</div>
```

### Form Components

```tsx
// Formulario completo con tema WebSnack
<form className="space-y-6 p-6 bg-card rounded-lg shadow-3d-lg">
  <div className="space-y-4">
    <div>
      <Label className="font-sans font-medium tracking-wide">Nombre</Label>
      <Input
        placeholder="Tu nombre completo"
        className="mt-1 border-primary/30 focus:border-primary"
      />
    </div>

    <div>
      <Label className="font-sans font-medium tracking-wide">Email</Label>
      <Input
        type="email"
        placeholder="tu@email.com"
        className="mt-1 border-primary/30 focus:border-primary"
      />
    </div>

    <div>
      <Label className="font-sans font-medium tracking-wide">Mensaje</Label>
      <Textarea
        placeholder="Cuéntanos sobre tu proyecto..."
        className="mt-1 border-primary/30 focus:border-primary resize-none"
        rows={4}
      />
    </div>
  </div>

  <Button
    type="submit"
    className="w-full bg-primary hover:bg-primary/90 shadow-3d-md hover:shadow-3d-lg"
  >
    Enviar Mensaje
  </Button>
</form>
```

## 8. Patrones de Layout - Next.js 15 + Tailwind CSS v4

### Estructura de Página (App Router)

```tsx
// app/page.tsx - Landing page con Server Components
export default async function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative px-4 pt-20 pb-16 sm:px-6 lg:px-8 lg:pt-24 lg:pb-20">
        <div className="container mx-auto text-center">
          <h1 className="font-display tracking-wider mb-6 text-4xl font-bold text-primary md:text-5xl lg:text-6xl">
            WebSnack
          </h1>
          <p className="text-muted-foreground tracking-wide mx-auto max-w-2xl text-lg font-sans lg:text-xl">
            Transformamos ideas en experiencias digitales excepcionales
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="shadow-3d-md hover:shadow-3d-lg">
              Empezar Proyecto
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="shadow-3d-sm hover:shadow-3d-md"
            >
              Ver Portfolio
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="container mx-auto">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {/* Service cards */}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
```

### Navegación (Navigation Component)

```tsx
// components/navigation.tsx
export function Navigation() {
  return (
    <nav className="bg-background/80 fixed top-0 z-50 w-full border-b border-primary/20 backdrop-blur-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="font-display text-xl font-bold text-primary tracking-wide"
            >
              WebSnack
            </Link>
            <div className="hidden md:flex space-x-6">
              <NavLink href="/servicios">Servicios</NavLink>
              <NavLink href="/portfolio">Portfolio</NavLink>
              <NavLink href="/contacto">Contacto</NavLink>
            </div>
          </div>
          <Button className="shadow-3d-sm hover:shadow-3d-md">
            Empezar Proyecto
          </Button>
        </div>
      </div>
    </nav>
  );
}

function NavLink({
  href,
  children
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="font-sans text-sm font-medium text-foreground/80 hover:text-primary transition-colors tracking-wide"
    >
      {children}
    </Link>
  );
}
```

### Grid Layouts Responsive

```tsx
// Grid de servicios/productos
<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8">
  {services.map((service) => (
    <ServiceCard key={service.id} service={service} />
  ))}
</div>

// Grid de contenido con sidebar
<div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
  <div className="lg:col-span-3">
    {/* Contenido principal */}
  </div>
  <div className="lg:col-span-1">
    {/* Sidebar */}
  </div>
</div>

// Grid de testimonios
<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {testimonials.map((testimonial) => (
    <TestimonialCard key={testimonial.id} testimonial={testimonial} />
  ))}
</div>
```

## 9. Estados Interactivos - Microinteracciones WebSnack

### Hover Effects (Basados en Sistema WebSnack)

```css
/* Hover effects Sistema WebSnack */
.ws-hover:hover {
  opacity: 0.8; /* Profesional y sutil */
  transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.ws-lift:hover {
  transform: translateY(-4px); /* Lift sutil */
  box-shadow: var(--shadow-3d-lg);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.ws-scale:hover {
  transform: scale(1.02); /* Scale mínimo, muy sutil */
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.elva-glow:hover {
  filter: brightness(1.1) blur(0.5px);
  transition: filter 0.4s cubic-bezier(0.445, 0.05, 0.55, 0.95);
}
```

### Focus States (WCAG 2.1 AA Compliant)

```css
/* Focus visible para accesibilidad */
*:focus-visible {
  outline: 2px solid hsl(var(--primary));
  outline-offset: 2px;
  border-radius: calc(var(--radius) / 2);
}

/* Focus específico para inputs */
.input:focus-visible {
  border-color: hsl(var(--primary));
  box-shadow: 0 0 0 2px hsl(var(--primary) / 0.2);
}

/* Focus para botones */
.button:focus-visible {
  box-shadow:
    var(--shadow-3d-md),
    0 0 0 2px hsl(var(--primary) / 0.3);
}
```

### Microinteracciones en Componentes

```tsx
// Card con microinteracciones Elva
<Card className="elva-lift elva-scale cursor-pointer border-primary/20 hover:border-primary/40 transition-all duration-400">
  <CardContent>
    {/* Contenido */}
  </CardContent>
</Card>

// Botón con feedback táctil
<Button className="elva-lift shadow-3d-sm hover:shadow-3d-md active:shadow-3d-xs active:translate-y-[1px] transition-all duration-200">
  Click me
</Button>

// Link con línea animada (estilo Elva)
<a className="relative inline-block text-primary hover:text-primary/70 transition-colors duration-400">
  <span className="relative z-10">Enlace</span>
  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-current transition-all duration-500 hover:w-full"></span>
</a>
```

## 10. Responsive Design - Mobile First

### Breakpoints Tailwind CSS v4

```css
/* Mobile first approach */
/* Base: < 640px - Mobile */
sm: 640px   /* Tablet portrait */
md: 768px   /* Tablet landscape */
lg: 1024px  /* Desktop small */
xl: 1280px  /* Desktop large */
2xl: 1536px /* Desktop extra large */
```

### Principios Responsive WebSnack

```tsx
// Tipografía responsive
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display">
  Título Responsive
</h1>

// Espaciado responsive
<section className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
  Contenido
</section>

// Grid responsive
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {/* Items */}
</div>

// Navegación responsive
<nav className="px-4 py-3 sm:px-6 lg:px-8">
  <div className="flex items-center justify-between">
    <Logo />
    <div className="hidden md:flex space-x-6">
      {/* Desktop menu */}
    </div>
    <Button className="md:hidden" size="sm">
      {/* Mobile menu toggle */}
    </Button>
  </div>
</nav>
```

## 11. Accesibilidad - WCAG 2.1 AA

### Contraste de Colores

```css
/* Contrastes verificados para WCAG 2.1 AA */
/* Primary sobre Background: ratio 4.5:1+ */
.text-primary {
  color: #dc7cb3;
} /* Rosa sobre blanco */
.text-primary-foreground {
  color: #ffffff;
} /* Blanco sobre rosa */

/* Secondary sobre Background: ratio 4.5:1+ */
.text-secondary {
  color: #5a9ea0;
} /* Aguamarina oscurecida */
.text-muted-foreground {
  color: #7a7a7a;
} /* Gris con contraste suficiente */
```

### Semántica HTML5

```tsx
// Estructura semántica correcta
<main>
  <section aria-labelledby="hero-title">
    <h1 id="hero-title">Título Principal</h1>
  </section>

  <section aria-labelledby="services-title">
    <h2 id="services-title">Nuestros Servicios</h2>
    <div role="list">
      <div role="listitem">
        <article>Servicio 1</article>
      </div>
    </div>
  </section>
</main>

// Navegación accesible
<nav aria-label="Navegación principal">
  <ul>
    <li><a href="/servicios" aria-current="page">Servicios</a></li>
    <li><a href="/portfolio">Portfolio</a></li>
  </ul>
</nav>
```

## 12. Performance - Core Web Vitals

### Optimizaciones CSS

```css
/* GPU acceleration para animaciones */
.gpu-accelerated {
  will-change: transform, opacity;
  transform: translateZ(0);
}

/* Optimización de fonts */
.font-display {
  font-display: swap;
}
.font-sans {
  font-display: swap;
}
.font-serif {
  font-display: swap;
}

/* Critical CSS inlined */
/* Non-critical CSS lazy loaded */
```

### Optimizaciones de Componentes

```tsx
// Lazy loading de componentes pesados
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// Imágenes optimizadas con Next.js 15
import Image from 'next/image';

<Image
  src="/hero-image.jpg"
  alt="Descripción"
  width={800}
  height={600}
  priority // Para LCP optimization
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>

// Animaciones optimizadas
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.4 }}
  style={{ willChange: 'opacity' }} // Performance hint
>
  Contenido
</motion.div>
```

---

Esta guía de estilos base proporciona la fundación técnica completa para implementar el diseño WebSnack con Next.js 15, React 19, Tailwind CSS v4 y shadcn/ui, incluyendo las microanimaciones Elva auténticas para una experiencia de usuario premium.
