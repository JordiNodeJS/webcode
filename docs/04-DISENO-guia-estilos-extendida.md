# Guía de Estilos Extendida WebCode - Sistema de Diseño Completo (WAS)

## **[Lista]** Índice

1. [Introducción](#introducción)
2. [Design Tokens WebCode](#design-tokens-webcode)
3. [Tipografía Next.js 15](#tipografía-nextjs-15)
4. [Sistema de Colores](#sistema-de-colores)
5. [Espaciado Semántico](#espaciado-semántico)
6. [Componentes shadcn/ui](#componentes-shadcnui)
7. [Sistema de Animaciones WebCode (WAS)](#sistema-de-animaciones-webcode-was)
8. [Patrones de Layout](#patrones-de-layout)
9. [Guías de Implementación](#guías-de-implementación)

---

## **[Objetivos]** Introducción

Esta guía establece el sistema de diseño completo para WebCode, implementado con \*\*Next.js 15 + React 19 + Tailwind CSS v4 + shadc## **[Magia]** Sistema de Animaciones WebCode (WAS)

### CSS Animations

Las animaciones WebCode proporcionan transiciones profesionales:

````css
.ws-transition {
  transition: all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.ws-bounce {
  animation: ws-bounce 1000ms cubic-bezier(0.23, 1, 0.32, 1);
}

.ws-slide-up {n **design tokens** centralizados y el **Sistema de Animaciones WebCode (WAS)** para crear una experiencia premium y cohesiva.

### Principios de Diseño WebCode

- **Consistencia**: Todos los elementos siguen el tema rosa/aguamarina con efectos 3D
- **Accesibilidad**: WCAG 2.1 AA compliance nativo con shadcn/ui
- **Performance**: Core Web Vitals optimizados con Next.js 15
- **Elegancia**: Sistema de Animaciones WebCode para sofisticación visual

### Stack Tecnológico Base

- **Framework**: Next.js 15 + App Router
- **React**: 19.0.0 con Server Components
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Animations**: Framer Motion + Magic UI
- **Fonts**: Poppins + Space Grotesk + Lora + Fira Code

---

## **[Diseño]** Design Tokens WebCode

### Archivo Principal

**Ubicación**: `app/globals.css`

Los design tokens están basados en el tema personalizado WebCode implementado desde el stack tecnológico:

```css
/* Tema WebCode - Rosa/Aguamarina con efectos 3D */
:root {
  /* Colores principales del tema */
  --background: #ffffff;
  --foreground: #5b5b5b;
  --primary: #dc7cb3; /* Rosa WebCode */
  --primary-foreground: #ffffff;
  --secondary: #bce3e5; /* Aguamarina WebCode */
  --secondary-foreground: #333333;
  --accent: #fffcf7; /* Crema suave */
  --muted: #f4fbfc; /* Azul muy claro */

  /* Tipografías del stack */
  --font-sans: Poppins, sans-serif;
  --font-display: Space Grotesk, sans-serif;
  --font-serif: Lora, serif;
  --font-mono: Fira Code, monospace;

  /* Espaciado semántico */
  --spacing-text: 0.75rem; /* 12px - Entre líneas */
  --spacing-element: 1.5rem; /* 24px - Entre elementos */
  --spacing-component: 2rem; /* 32px - Entre componentes */
  --spacing-section: 4rem; /* 64px - Entre secciones */

  /* Sombras 3D personalizadas */
  --shadow-3d-xs: 3px 3px 0px 0px hsl(325.5319 58.0247% 68.2353% / 0.5);
  --shadow-3d-sm: 3px 3px 0px 0px hsl(325.5319 58.0247% 68.2353% / 1);
  --shadow-3d-md: 3px 3px 0px 0px hsl(325.5319 58.0247% 68.2353% / 1), 3px 2px
      4px -1px hsl(325.5319 58.0247% 68.2353% / 1);
  --shadow-3d-lg: 3px 3px 0px 0px hsl(325.5319 58.0247% 68.2353% / 1), 3px 4px
      6px -1px hsl(325.5319 58.0247% 68.2353% / 1);

  /* Radius del sistema */
  --radius: 0.4rem;
}

/* Dark mode WebCode */
.dark {
  --background: #162b37;
  --foreground: #ffffff;
  --primary: #fffcf7;
  --primary-foreground: #162b37;
  --secondary: #f6dee4;
  --secondary-foreground: #162b37;
  --accent: #d9a8ba;
  --muted: #2b2f34;

  /* Sombras 3D para dark mode */
  --shadow-3d-sm: 3px 3px 0px 0px hsl(206.8085 28.1437% 32.7451% / 1);
  --shadow-3d-md: 3px 3px 0px 0px hsl(206.8085 28.1437% 32.7451% / 1), 3px 2px
      4px -1px hsl(206.8085 28.1437% 32.7451% / 1);
}
````

### Integración con Tailwind CSS v4

```css
/* Configuración @theme inline para Tailwind v4 */
@theme inline {
  --color-primary: var(--primary);
  --color-secondary: var(--secondary);
  --color-accent: var(--accent);
  --color-background: var(--background);
  --color-foreground: var(--foreground);

  --font-sans: var(--font-sans);
  --font-display: var(--font-display);
  --font-serif: var(--font-serif);
  --font-mono: var(--font-mono);

  --shadow-3d-xs: var(--shadow-3d-xs);
  --shadow-3d-sm: var(--shadow-3d-sm);
  --shadow-3d-md: var(--shadow-3d-md);
  --shadow-3d-lg: var(--shadow-3d-lg);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}
```

---

## ✍️ Tipografía Next.js 15

### Configuración de Fuentes

**Archivo**: `app/layout.tsx`

```tsx
import { Poppins, Space_Grotesk, Lora, Fira_Code } from "next/font/google";

// Fuente principal para texto de cuerpo
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap"
});

// Fuente para títulos y elementos destacados
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap"
});

// Fuente para contenido largo y citas
const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap"
});

// Fuente para código
const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap"
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${poppins.variable} ${spaceGrotesk.variable} ${lora.variable} ${firaCode.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
```

### Jerarquía Tipográfica

| Elemento          | Fuente        | Clase Tailwind         | Peso            | Tracking          | Uso                 |
| ----------------- | ------------- | ---------------------- | --------------- | ----------------- | ------------------- |
| **Hero Title**    | Space Grotesk | `text-6xl lg:text-7xl` | `font-bold`     | `tracking-wider`  | Títulos principales |
| **Section Title** | Space Grotesk | `text-4xl lg:text-5xl` | `font-bold`     | `tracking-wide`   | Títulos de sección  |
| **Card Title**    | Space Grotesk | `text-2xl lg:text-3xl` | `font-semibold` | `tracking-wide`   | Títulos de tarjetas |
| **Body Large**    | Poppins       | `text-lg lg:text-xl`   | `font-normal`   | `tracking-wide`   | Texto destacado     |
| **Body Default**  | Poppins       | `text-base`            | `font-normal`   | `tracking-wide`   | Texto general       |
| **Body Small**    | Poppins       | `text-sm`              | `font-normal`   | `tracking-wide`   | Texto secundario    |
| **Caption**       | Poppins       | `text-xs`              | `font-medium`   | `tracking-wide`   | Etiquetas y notas   |
| **Article**       | Lora          | `text-lg`              | `font-normal`   | `tracking-normal` | Contenido largo     |
| **Code**          | Fira Code     | `text-sm`              | `font-normal`   | `tracking-normal` | Código              |

### Implementación en Componentes

```tsx
// Título principal de landing
<h1 className="font-display text-6xl lg:text-7xl font-bold tracking-wider text-primary">
  WebCode
</h1>

// Subtítulo de sección
<h2 className="font-display text-4xl lg:text-5xl font-bold tracking-wide text-foreground">
  Nuestros Servicios
</h2>

// Texto de cuerpo
<p className="font-sans text-base lg:text-lg tracking-wide text-muted-foreground">
  Transformamos ideas en experiencias digitales excepcionales
</p>

// Código en documentación
<code className="font-mono text-sm bg-muted px-2 py-1 rounded">
  pnpm create next-app@latest
</code>
```

---

## **[Diseño]** Sistema de Colores

### Paleta WebCode Completa

#### Colores Principales

```css
/* Light Mode - Tema Rosa/Aguamarina */
--primary: #dc7cb3; /* Rosa principal WebCode */
--primary-foreground: #ffffff; /* Texto sobre rosa */
--secondary: #bce3e5; /* Aguamarina WebCode */
--secondary-foreground: #333333; /* Texto sobre aguamarina */
--accent: #fffcf7; /* Crema suave para acentos */
--accent-foreground: #333333; /* Texto sobre crema */
```

#### Colores de Estado (shadcn/ui Compatible)

```css
/* Estados y feedback */
--destructive: #fcb4b5; /* Rosa claro para errores */
--destructive-foreground: #ffffff; /* Texto sobre error */
--warning: #fef3c7; /* Amarillo suave para advertencias */
--warning-foreground: #92400e; /* Texto sobre advertencia */
--success: #d1fae5; /* Verde suave para éxito */
--success-foreground: #065f46; /* Texto sobre éxito */
--info: #dbeafe; /* Azul suave para información */
--info-foreground: #1e40af; /* Texto sobre información */
```

#### Colores de Superficie

```css
/* Backgrounds y superficies */
--background: #ffffff; /* Fondo principal */
--foreground: #5b5b5b; /* Texto principal */
--card: #ffffff; /* Fondo de tarjetas */
--card-foreground: #5b5b5b; /* Texto en tarjetas */
--muted: #f4fbfc; /* Elementos desactivados */
--muted-foreground: #7a7a7a; /* Texto desactivado */
--border: #dc7cb3; /* Bordes con color de marca */
--input: #e4e4e4; /* Fondo de inputs */
--ring: #f0aacd; /* Anillo de focus */
```

### Modo Oscuro Completo

```css
.dark {
  --background: #162b37; /* Azul oscuro principal */
  --foreground: #ffffff; /* Texto claro */
  --card: #223743; /* Tarjetas más claras */
  --card-foreground: #ffffff; /* Texto en tarjetas */
  --primary: #fffcf7; /* Crema como primario */
  --primary-foreground: #162b37; /* Azul sobre crema */
  --secondary: #f6dee4; /* Rosa suave como secundario */
  --secondary-foreground: #162b37; /* Azul sobre rosa */
  --accent: #d9a8ba; /* Rosa medio para acentos */
  --accent-foreground: #ffffff; /* Blanco sobre rosa */
  --muted: #2b2f34; /* Gris oscuro */
  --muted-foreground: #f6dee4; /* Rosa suave para texto muted */
  --border: #3c566b; /* Borde azul grisáceo */
  --input: #263d49; /* Input azul oscuro */
  --ring: #75c0c5; /* Anillo aguamarina */
}
```

### Uso Semántico en Componentes

```tsx
// Botón primario con colores de marca
<Button className="bg-primary text-primary-foreground hover:bg-primary/90">
  Acción Principal
</Button>

// Card con tema WebCode
<Card className="bg-card text-card-foreground border-primary/20">
  <CardHeader className="border-b border-border/50">
    <CardTitle className="text-primary">Título</CardTitle>
    <CardDescription className="text-muted-foreground">Descripción</CardDescription>
  </CardHeader>
</Card>

// Estados de feedback
<Alert className="border-success bg-success/10 text-success-foreground">
  <CheckCircle className="h-4 w-4 text-success" />
  <AlertTitle className="text-success">Éxito</AlertTitle>
  <AlertDescription>Operación completada correctamente</AlertDescription>
</Alert>

<Alert variant="destructive" className="border-destructive bg-destructive/10">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Ha ocurrido un problema</AlertDescription>
</Alert>
```

---

## **[Medición]** Espaciado Semántico

### Sistema Basado en Contexto

El espaciado en WebCode está organizado por contexto de uso para mantener consistencia:

| Token               | Valor CSS | Valor px | Clase Tailwind       | Contexto de Uso                         |
| ------------------- | --------- | -------- | -------------------- | --------------------------------------- |
| `spacing-text`      | `0.75rem` | `12px`   | `gap-3, space-y-3`   | Entre líneas de texto relacionadas      |
| `spacing-element`   | `1.5rem`  | `24px`   | `gap-6, space-y-6`   | Entre elementos dentro de un componente |
| `spacing-component` | `2rem`    | `32px`   | `gap-8, space-y-8`   | Entre componentes diferentes            |
| `spacing-section`   | `4rem`    | `64px`   | `gap-16, space-y-16` | Entre secciones principales             |

### Implementación con Custom Properties

```css
/* Variables de espaciado semántico */
:root {
  --spacing-text: 0.75rem; /* 12px */
  --spacing-element: 1.5rem; /* 24px */
  --spacing-component: 2rem; /* 32px */
  --spacing-section: 4rem; /* 64px */

  /* Espaciado específico para navegación */
  --spacing-nav-height: 4rem; /* 64px - Altura de navegación */
  --spacing-nav-offset: 6rem; /* 96px - Offset para contenido */
}
```

### Clases Utilitarias Personalizadas

```css
/* Padding semántico */
.px-text {
  padding-left: var(--spacing-text);
  padding-right: var(--spacing-text);
}
.py-text {
  padding-top: var(--spacing-text);
  padding-bottom: var(--spacing-text);
}
.px-element {
  padding-left: var(--spacing-element);
  padding-right: var(--spacing-element);
}
.py-element {
  padding-top: var(--spacing-element);
  padding-bottom: var(--spacing-element);
}
.px-component {
  padding-left: var(--spacing-component);
  padding-right: var(--spacing-component);
}
.py-component {
  padding-top: var(--spacing-component);
  padding-bottom: var(--spacing-component);
}
.px-section {
  padding-left: var(--spacing-section);
  padding-right: var(--spacing-section);
}
.py-section {
  padding-top: var(--spacing-section);
  padding-bottom: var(--spacing-section);
}

/* Margins semánticos */
.mt-text {
  margin-top: var(--spacing-text);
}
.mb-element {
  margin-bottom: var(--spacing-element);
}
.mt-component {
  margin-top: var(--spacing-component);
}
.mb-section {
  margin-bottom: var(--spacing-section);
}

/* Gaps semánticos */
.gap-text {
  gap: var(--spacing-text);
}
.gap-element {
  gap: var(--spacing-element);
}
.gap-component {
  gap: var(--spacing-component);
}
.gap-section {
  gap: var(--spacing-section);
}

/* Espaciado especial para navegación */
.pt-nav {
  padding-top: var(--spacing-nav-offset);
}
.top-nav {
  top: var(--spacing-nav-height);
}
```

### Responsive Spacing

```tsx
// Espaciado responsive basado en contexto
<section className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
  {/* Contenido de sección */}
</section>

// Grid con espaciado semántico
<div className="grid grid-cols-1 gap-element md:grid-cols-2 lg:grid-cols-3">
  {/* Items del grid */}
</div>

// Formulario con espaciado consistente
<form className="space-y-element p-component bg-card rounded-lg">
  <div className="space-y-text">
    <Label>Campo</Label>
    <Input />
  </div>
  <Button className="w-full">Enviar</Button>
</form>

// Layout con espaciado de navegación
<main className="pt-nav">
  <section className="py-section">
    <div className="container mx-auto px-element">
      {/* Contenido */}
    </div>
  </section>
</main>
```

---

## 🧩 Componentes shadcn/ui

### Instalación y Configuración

```bash
# Inicialización con tema WebCode
pnpm dlx shadcn@latest init

# Instalación del tema personalizado (Rosa/Aguamarina con efectos 3D)
pnpm dlx shadcn@latest add https://tweakcn.com/r/themes/cmex1abh7000c04l4h2avft17

# Componentes base WebCode
pnpm dlx shadcn@latest add button card input form label textarea select
pnpm dlx shadcn@latest add alert dialog sheet drawer popover tooltip
pnpm dlx shadcn@latest add table badge avatar accordion separator
```

### Button Component Extendido

```tsx
// Variantes de botón para WebCode
import { Button } from "@/components/ui/button"

// Botón primario con sombra 3D
<Button
  variant="default"
  size="lg"
  className="bg-primary text-primary-foreground shadow-3d-sm hover:shadow-3d-md transition-all duration-300 tracking-wide font-sans"
>
  Comenzar Proyecto
</Button>

// Botón secundario con borde de marca
<Button
  variant="outline"
  size="default"
  className="border-primary text-primary bg-transparent hover:bg-primary/10 shadow-3d-xs hover:shadow-3d-sm tracking-wide"
>
  Ver Portfolio
</Button>

// Botón ghost con Sistema WebCode
<Button
  variant="ghost"
  size="sm"
  className="text-primary hover:text-primary/70 hover:bg-primary/5 transition-all duration-400 tracking-wide"
>
  Más Información
</Button>

// Botón destructivo
<Button
  variant="destructive"
  className="bg-destructive text-destructive-foreground shadow-3d-sm hover:shadow-3d-md"
>
  Eliminar
</Button>
```

### Card Component Avanzado

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

// Card de servicio con microanimaciones
<Card className="group cursor-pointer transition-all duration-400 hover:scale-[1.02] hover:-translate-y-1 shadow-3d-md hover:shadow-3d-lg border-primary/20 hover:border-primary/40 bg-card">
  <CardHeader className="pb-4">
    <div className="flex items-center space-x-3">
      <div className="p-2 bg-primary/10 rounded-lg">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <CardTitle className="font-display text-xl tracking-wide text-primary group-hover:text-primary/80 transition-colors">
        Desarrollo Web
      </CardTitle>
    </div>
    <CardDescription className="font-sans text-muted-foreground tracking-wide mt-2">
      Creamos sitios web modernos y responsivos con las últimas tecnologías
    </CardDescription>
  </CardHeader>

  <CardContent className="space-y-4">
    <div className="space-y-2">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center space-x-2">
          <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
          <span className="font-sans text-sm text-card-foreground tracking-wide">
            {feature}
          </span>
        </div>
      ))}
    </div>
  </CardContent>

  <CardFooter className="pt-4 border-t border-border/50">
    <Button
      className="w-full shadow-3d-sm hover:shadow-3d-md"
      variant="outline"
    >
      Más Detalles
    </Button>
  </CardFooter>
</Card>;
```

### Form Components Completos

```tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

// Formulario de contacto WebCode
<form className="space-y-6 p-6 bg-card rounded-lg shadow-3d-lg border border-primary/20">
  <div className="space-y-4">
    {/* Campo de nombre */}
    <div className="space-y-2">
      <Label
        htmlFor="name"
        className="font-sans font-medium tracking-wide text-foreground"
      >
        Nombre completo
      </Label>
      <Input
        id="name"
        placeholder="Tu nombre..."
        className="border-primary/30 focus:border-primary focus:ring-primary/20 shadow-3d-xs focus:shadow-3d-sm transition-all font-sans tracking-wide"
      />
    </div>

    {/* Campo de email */}
    <div className="space-y-2">
      <Label
        htmlFor="email"
        className="font-sans font-medium tracking-wide text-foreground"
      >
        Email
      </Label>
      <Input
        id="email"
        type="email"
        placeholder="tu@email.com"
        className="border-primary/30 focus:border-primary focus:ring-primary/20 shadow-3d-xs focus:shadow-3d-sm transition-all font-sans tracking-wide"
      />
    </div>

    {/* Select de servicio */}
    <div className="space-y-2">
      <Label className="font-sans font-medium tracking-wide text-foreground">
        Tipo de proyecto
      </Label>
      <Select>
        <SelectTrigger className="border-primary/30 focus:border-primary focus:ring-primary/20 shadow-3d-xs focus:shadow-3d-sm">
          <SelectValue placeholder="Selecciona un servicio..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="landing">Landing Page</SelectItem>
          <SelectItem value="ecommerce">E-commerce</SelectItem>
          <SelectItem value="webapp">Aplicación Web</SelectItem>
          <SelectItem value="redesign">Rediseño</SelectItem>
        </SelectContent>
      </Select>
    </div>

    {/* Textarea de mensaje */}
    <div className="space-y-2">
      <Label
        htmlFor="message"
        className="font-sans font-medium tracking-wide text-foreground"
      >
        Mensaje
      </Label>
      <Textarea
        id="message"
        placeholder="Cuéntanos sobre tu proyecto..."
        rows={4}
        className="border-primary/30 focus:border-primary focus:ring-primary/20 shadow-3d-xs focus:shadow-3d-sm transition-all font-sans tracking-wide resize-none"
      />
    </div>
  </div>

  {/* Botón de envío */}
  <Button
    type="submit"
    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-3d-md hover:shadow-3d-lg transition-all duration-300 font-sans font-medium tracking-wide"
    size="lg"
  >
    Enviar Mensaje
  </Button>
</form>;
```

### Componentes de Feedback

```tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"

// Alert de éxito
<Alert className="border-success bg-success/10 text-success-foreground shadow-3d-sm">
  <CheckCircle className="h-4 w-4 text-success" />
  <AlertTitle className="font-sans font-medium tracking-wide text-success">
    ¡Mensaje enviado!
  </AlertTitle>
  <AlertDescription className="font-sans tracking-wide text-success/80">
    Te responderemos en las próximas 24 horas.
  </AlertDescription>
</Alert>

// Alert de error
<Alert variant="destructive" className="shadow-3d-sm">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle className="font-sans font-medium tracking-wide">
    Error al enviar
  </AlertTitle>
  <AlertDescription className="font-sans tracking-wide">
    Por favor, verifica tus datos e inténtalo de nuevo.
  </AlertDescription>
</Alert>

// Badges de tecnología
<div className="flex flex-wrap gap-2">
  <Badge
    variant="secondary"
    className="bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-3d-xs font-sans tracking-wide"
  >
    Next.js 15
  </Badge>
  <Badge
    variant="outline"
    className="border-primary text-primary hover:bg-primary/10 shadow-3d-xs font-sans tracking-wide"
  >
    React 19
  </Badge>
  <Badge
    className="bg-accent text-accent-foreground hover:bg-accent/80 shadow-3d-xs font-sans tracking-wide"
  >
    Tailwind CSS v4
  </Badge>
</div>
```

---

## **[Magia]** Animaciones Elva

### Curvas de Animación

Las animaciones Elva proporcionan transiciones sofisticadas:

```css
.elva-transition {
  transition: all 400ms cubic-bezier(0.23, 1, 0.32, 1);
}

.elva-bounce {
  animation: elva-bounce 1000ms cubic-bezier(0.23, 1, 0.32, 1);
}

.elva-slide-up {
  animation: elva-slide-up 600ms cubic-bezier(0.23, 1, 0.32, 1);
}
```

### Aplicación en Componentes

```tsx
// Hover effect en cards
<Card className="elva-transition hover:shadow-3d-md">

// Botones con feedback táctil
<Button className="elva-transition shadow-3d-sm hover:shadow-3d-md">

// Entradas con animación de focus
<Input className="elva-transition focus-visible:shadow-3d-sm">
```

---

## **[Regla]** Patrones de Layout

### Estructura de Página

```tsx
<main className="min-h-screen">
  <Navigation />

  {/* Hero Section */}
  <section className="px-element pt-nav pb-section">
    <div className="container mx-auto text-center">
      <h1 className="font-display letter-spacing-wider mb-text text-4xl font-bold">
        Título Principal
      </h1>
      <p className="text-muted-foreground letter-spacing-wide mx-auto max-w-2xl">
        Descripción de la sección
      </p>
    </div>
  </section>

  {/* Content Sections */}
  <section className="px-element pb-section">
    <div className="container mx-auto">
      <div className="gap-component grid grid-cols-1 lg:grid-cols-3">
        {/* Contenido */}
      </div>
    </div>
  </section>

  <Footer />
</main>
```

### Grid Layouts

```tsx
// Grid de servicios/productos
<div className="grid grid-cols-1 gap-text md:grid-cols-2 lg:grid-cols-3">

// Grid de contenido con sidebar
<div className="grid grid-cols-1 gap-component lg:grid-cols-3">
  <div className="lg:col-span-2">{/* Contenido principal */}</div>
  <div className="lg:col-span-1">{/* Sidebar */}</div>
</div>
```

### Responsive Design

```tsx
// Padding responsive
className = "px-element sm:px-component lg:px-section";

// Texto responsive
className = "text-base sm:text-lg lg:text-xl";

// Grid responsive
className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
```

---

## 🛠️ Guías de Implementación

### Checklist de Consistencia

#### **[Completado]** Tipografía

- [ ] Usar `font-display` para títulos
- [ ] Aplicar `letter-spacing-wide` en texto de cuerpo
- [ ] Usar `letter-spacing-wider` en títulos principales
- [ ] Incluir `text-muted-foreground` para texto secundario

#### **[Completado]** Espaciado

- [ ] Usar clases semánticas (`gap-text`, `px-element`, etc.)
- [ ] Aplicar `pt-nav` después de navegación fija
- [ ] Usar `space-y-text` para elementos de formulario
- [ ] Aplicar `mb-section` entre secciones principales

#### **[Completado]** Componentes

- [ ] Incluir `elva-transition` en elementos interactivos
- [ ] Usar sombras 3D (`shadow-3d-sm`, `shadow-3d-md`)
- [ ] Aplicar `rounded-button`, `rounded-input`, `rounded-card`
- [ ] Incluir estados hover con `hover:shadow-3d-md`

#### **[Completado]** Accesibilidad

- [ ] Contrastar colores adecuados
- [ ] Labels asociados a inputs
- [ ] Focus visible en elementos interactivos
- [ ] Texto alternativo en imágenes

### Naming Conventions

#### Clases CSS Personalizadas

```css
/* Prefijo del proyecto */
.webcode-*

/* Componentes específicos */
/* Componentes específicos */
/* Componentes específicos */
/* Componentes específicos */
.hero-*
.nav-*
.card-*

/* Estados */
.is-active
.is-loading
.is-visible;
```

#### Variables CSS

```css
/* Categoría-subcategoría-propiedad */
--color-primary-500
--spacing-component-lg
--shadow-3d-elevated
```

### Ejemplos de Implementación

#### Página Completa

```tsx
export default function ExamplePage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="px-element pt-nav pb-section">
        <div className="container mx-auto text-center">
          <h1 className="font-display letter-spacing-wider mb-text text-4xl font-bold md:text-5xl">
            Título de la Página
          </h1>
          <p className="text-muted-foreground letter-spacing-wide mx-auto max-w-2xl text-lg">
            Descripción clara y concisa del contenido de la página.
          </p>
        </div>
      </section>

      <section className="px-element pb-section">
        <div className="container mx-auto">
          <div className="gap-component grid grid-cols-1 lg:grid-cols-3">
            {data.map((item) => (
              <Card
                key={item.id}
                className="px-element py-component shadow-3d-sm hover:shadow-3d-md elva-transition"
              >
                <CardHeader>
                  <CardTitle className="font-display letter-spacing-wide">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground letter-spacing-wide">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="letter-spacing-wide w-full">
                    {item.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
```

---

## **[Recursos]** Recursos Adicionales

### Archivos de Referencia

- `src/styles/design-tokens.css` - Tokens centralizados
- `src/app/globals.css` - Estilos globales
- `docs/STYLE_GUIDE.md` - Guía de componentes detallada

### Herramientas de Desarrollo

- **Tailwind CSS v4** - Framework de utilidades
- **CSS Custom Properties** - Variables nativas
- **TypeScript** - Tipado de componentes

### Recursos de Diseño

- **Figma Tokens** - Sincronización con diseño
- **Accessibility Guidelines** - WCAG 2.1 AA
- **Performance Budget** - Optimización de carga

---

_Esta guía de estilos está en constante evolución. Para sugerencias o mejoras, consultar con el equipo de desarrollo._
