# 📐 Ejemplos Visuales de Componentes WebCode

> Guía de implementación práctica con ejemplos reales del sistema de diseño WebCode

---

## 🎯 Componentes Principales

### 1. Botones

#### Botón Primary Estándar

```tsx
import { Button } from "@/components/ui/button";

<Button
  variant="default"
  size="lg"
  className="
    hover:opacity-80 
    hover:-translate-y-0.5
    transition-all duration-200
    ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
  "
  style={{ boxShadow: 'var(--shadow-3d-sm)' }}
>
  Solicitar Presupuesto
</Button>
```

**Características:**
- Color: `bg-primary` (rosa #dc7cb3)
- Sombra: `shadow-3d-sm`
- Hover: opacidad 0.8 + elevación -2px
- Transición: 200ms con easing WAS

#### Botón Secondary

```tsx
<Button
  variant="outline"
  className="
    border-primary 
    text-primary 
    hover:bg-primary/10
    hover:opacity-80
    transition-all duration-200
  "
  style={{ boxShadow: 'var(--shadow-3d-xs)' }}
>
  Ver Más
</Button>
```

#### Botón Ghost (navegación)

```tsx
<Button
  variant="ghost"
  className="
    text-muted-foreground 
    hover:text-foreground
    hover:bg-accent/50
    transition-all duration-200
  "
>
  Sobre Nosotros
</Button>
```

---

### 2. Cards

#### Card de Servicio con Sombra 3D

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

<Card 
  className="
    border-primary/20 
    hover:border-primary
    transition-all duration-300
  " 
  style={{ boxShadow: 'var(--shadow-3d-md)' }}
>
  <CardHeader>
    <CardTitle className="
      neon-cyan-card-title 
      text-2xl 
      font-display 
      mb-2
    ">
      Desarrollo Web
    </CardTitle>
    <CardDescription className="font-sans">
      Sitios web profesionales y aplicaciones modernas
    </CardDescription>
  </CardHeader>
  
  <CardContent>
    <ul className="space-y-3 text-muted-foreground font-sans">
      <li className="flex items-center gap-2">
        <Check className="w-5 h-5 text-primary" />
        Diseño responsive
      </li>
      <li className="flex items-center gap-2">
        <Check className="w-5 h-5 text-primary" />
        Optimización SEO
      </li>
      <li className="flex items-center gap-2">
        <Check className="w-5 h-5 text-primary" />
        Performance garantizada
      </li>
    </ul>
  </CardContent>
  
  <CardFooter>
    <Button 
      className="w-full hover:opacity-80"
      style={{ boxShadow: 'var(--shadow-3d-sm)' }}
    >
      Comenzar Proyecto
    </Button>
  </CardFooter>
</Card>
```

#### Card Testimonial

```tsx
<Card 
  className="border-l-4 border-l-primary bg-gradient-to-br from-background to-muted/20"
  style={{ boxShadow: 'var(--shadow-3d-lg)' }}
>
  <CardContent className="pt-6">
    <blockquote className="font-serif text-lg italic mb-4">
      "WebCode transformó nuestra presencia digital. El equipo es profesional y los resultados superaron nuestras expectativas."
    </blockquote>
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-gradient-webcode" />
      <div>
        <p className="font-display font-semibold">María García</p>
        <p className="text-sm text-muted-foreground">CEO, Floristería Rosa</p>
      </div>
    </div>
  </CardContent>
</Card>
```

---

### 3. Secciones Hero

#### Hero Principal Landing

```tsx
<section className="
  bg-gradient-webcode 
  min-h-screen 
  flex items-center 
  relative overflow-hidden
">
  <div className="container mx-auto px-4 py-16 relative z-10">
    <div className="max-w-4xl">
      <h1 className="
        neon-cyan-title 
        text-6xl md:text-7xl lg:text-8xl 
        font-display 
        font-bold 
        mb-6 
        leading-tight
      ">
        Desarrollamos tu Presencia Digital
      </h1>
      
      <p className="
        text-xl md:text-2xl 
        text-muted-foreground 
        font-sans 
        mb-8 
        max-w-2xl
      ">
        Soluciones web profesionales para freelancers, PYMEs y startups en Barcelona
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          size="lg"
          className="
            text-lg
            hover:opacity-80 
            hover:-translate-y-1
            transition-all duration-200
          "
          style={{ boxShadow: 'var(--shadow-3d-md)' }}
        >
          Solicitar Presupuesto Gratis
        </Button>
        
        <Button 
          size="lg"
          variant="outline"
          className="
            text-lg
            border-primary 
            hover:bg-primary/10
            transition-all duration-200
          "
        >
          Ver Proyectos
        </Button>
      </div>
    </div>
  </div>
  
  {/* Background decorativo */}
  <div className="absolute inset-0 opacity-20">
    {/* Animaciones de fondo */}
  </div>
</section>
```

#### Hero de Página Interior

```tsx
<section className="
  bg-gradient-webcode 
  py-16 md:py-24 
  border-b border-border
">
  <div className="container mx-auto px-4">
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="
        neon-cyan-title 
        text-5xl md:text-6xl 
        font-display 
        font-bold 
        mb-6
      ">
        Nuestros Servicios
      </h1>
      
      <p className="
        text-lg md:text-xl 
        text-muted-foreground 
        font-sans
      ">
        Soluciones digitales completas adaptadas a las necesidades de tu negocio
      </p>
    </div>
  </div>
</section>
```

---

### 4. Navegación

#### Header con Logo Animado

```tsx
<header className="
  sticky top-0 z-50 
  bg-background/95 backdrop-blur 
  border-b border-border
  transition-all duration-300
">
  <nav className="container mx-auto px-4 py-4">
    <div className="flex items-center justify-between">
      {/* Logo */}
      <a 
        href="/" 
        className="
          flex items-center gap-2 
          hover:opacity-80 
          transition-opacity duration-200
        "
      >
        <div className="w-10 h-10 bg-gradient-webcode rounded-lg" />
        <span className="
          text-2xl 
          font-display 
          font-bold 
          text-gradient-webcode
        ">
          WebCode
        </span>
      </a>
      
      {/* Navegación Desktop */}
      <ul className="hidden md:flex items-center gap-8">
        <li>
          <a 
            href="/servicios" 
            className="
              text-muted-foreground 
              hover:text-foreground
              transition-colors duration-200
              font-sans
            "
          >
            Servicios
          </a>
        </li>
        <li>
          <a 
            href="/proyectos" 
            className="
              text-muted-foreground 
              hover:text-foreground
              transition-colors duration-200
              font-sans
            "
          >
            Proyectos
          </a>
        </li>
        <li>
          <Button 
            className="
              hover:opacity-80 
              transition-all duration-200
            "
            style={{ boxShadow: 'var(--shadow-3d-sm)' }}
          >
            Contactar
          </Button>
        </li>
      </ul>
      
      {/* Menú Mobile */}
      <Button 
        variant="ghost" 
        size="icon"
        className="md:hidden"
      >
        <Menu className="w-6 h-6" />
      </Button>
    </div>
  </nav>
</header>
```

---

### 5. Formularios

#### Formulario de Contacto

```tsx
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

<Card 
  className="max-w-xl mx-auto border-primary/20"
  style={{ boxShadow: 'var(--shadow-3d-lg)' }}
>
  <CardHeader>
    <CardTitle className="neon-cyan-card-title font-display text-3xl">
      Solicita tu Presupuesto
    </CardTitle>
    <CardDescription className="font-sans">
      Completa el formulario y te respondemos en menos de 24 horas
    </CardDescription>
  </CardHeader>
  
  <CardContent>
    <form className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="font-sans font-medium">
          Nombre completo
        </Label>
        <Input 
          id="name"
          placeholder="Juan Pérez"
          className="
            border-border 
            focus:border-primary 
            focus:ring-2 
            focus:ring-ring
            transition-all duration-200
          "
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email" className="font-sans font-medium">
          Email
        </Label>
        <Input 
          id="email"
          type="email"
          placeholder="juan@ejemplo.com"
          className="
            border-border 
            focus:border-primary 
            focus:ring-2 
            focus:ring-ring
            transition-all duration-200
          "
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="message" className="font-sans font-medium">
          Cuéntanos sobre tu proyecto
        </Label>
        <Textarea 
          id="message"
          placeholder="Necesito un sitio web para..."
          rows={5}
          className="
            border-border 
            focus:border-primary 
            focus:ring-2 
            focus:ring-ring
            transition-all duration-200
            resize-none
          "
        />
      </div>
      
      <Button 
        type="submit"
        size="lg"
        className="
          w-full
          hover:opacity-80 
          hover:-translate-y-0.5
          transition-all duration-200
        "
        style={{ boxShadow: 'var(--shadow-3d-sm)' }}
      >
        Enviar Solicitud
      </Button>
    </form>
  </CardContent>
</Card>
```

---

### 6. Grid de Servicios

```tsx
<section className="py-16 md:py-24">
  <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="
        neon-cyan-title 
        text-4xl md:text-5xl 
        font-display 
        mb-4
      ">
        Nuestros Servicios
      </h2>
      <p className="
        text-lg 
        text-muted-foreground 
        font-sans 
        max-w-2xl 
        mx-auto
      ">
        Soluciones digitales completas para hacer crecer tu negocio
      </p>
    </div>
    
    <div className="
      grid 
      grid-cols-1 
      md:grid-cols-2 
      lg:grid-cols-3 
      gap-8
    ">
      {services.map((service, index) => (
        <Card 
          key={index}
          className="
            border-primary/20 
            hover:border-primary
            hover:-translate-y-2
            transition-all duration-300
          " 
          style={{ boxShadow: 'var(--shadow-3d-md)' }}
        >
          <CardHeader>
            <div className="
              w-12 h-12 
              rounded-lg 
              bg-gradient-webcode 
              flex items-center justify-center 
              mb-4
            ">
              <service.icon className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="neon-cyan-card-title font-display">
              {service.title}
            </CardTitle>
            <CardDescription className="font-sans">
              {service.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {service.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary mt-0.5" />
                  <span className="text-muted-foreground font-sans">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              variant="ghost" 
              className="
                w-full 
                hover:bg-primary/10
                hover:text-primary
                transition-all duration-200
              "
            >
              Más información →
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  </div>
</section>
```

---

### 7. Footer

```tsx
<footer className="
  bg-gradient-to-b 
  from-background 
  to-muted/20 
  border-t border-border 
  py-12 md:py-16
">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
      {/* Logo y descripción */}
      <div className="md:col-span-2">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 bg-gradient-webcode rounded-lg" />
          <span className="
            text-2xl 
            font-display 
            font-bold 
            text-gradient-webcode
          ">
            WebCode
          </span>
        </div>
        <p className="
          text-muted-foreground 
          font-sans 
          max-w-md 
          mb-4
        ">
          Soluciones web profesionales para freelancers y pequeñas empresas en Barcelona
        </p>
      </div>
      
      {/* Links */}
      <div>
        <h3 className="
          font-display 
          font-semibold 
          mb-4 
          text-foreground
        ">
          Servicios
        </h3>
        <ul className="space-y-2">
          <li>
            <a 
              href="/servicios/web"
              className="
                text-muted-foreground 
                hover:text-primary
                transition-colors duration-200
                font-sans
              "
            >
              Desarrollo Web
            </a>
          </li>
          {/* Más links */}
        </ul>
      </div>
      
      <div>
        <h3 className="
          font-display 
          font-semibold 
          mb-4 
          text-foreground
        ">
          Empresa
        </h3>
        <ul className="space-y-2">
          <li>
            <a 
              href="/sobre-nosotros"
              className="
                text-muted-foreground 
                hover:text-primary
                transition-colors duration-200
                font-sans
              "
            >
              Sobre Nosotros
            </a>
          </li>
          {/* Más links */}
        </ul>
      </div>
    </div>
    
    {/* Copyright */}
    <div className="
      border-t border-border 
      pt-8 
      flex flex-col md:flex-row 
      justify-between 
      items-center 
      gap-4
    ">
      <p className="text-sm text-muted-foreground font-sans">
        © 2025 WebCode. Todos los derechos reservados.
      </p>
      <div className="flex gap-6">
        <a 
          href="/privacidad"
          className="
            text-sm 
            text-muted-foreground 
            hover:text-primary
            transition-colors duration-200
          "
        >
          Privacidad
        </a>
        <a 
          href="/terminos"
          className="
            text-sm 
            text-muted-foreground 
            hover:text-primary
            transition-colors duration-200
          "
        >
          Términos
        </a>
      </div>
    </div>
  </div>
</footer>
```

---

## 🎨 Utilidades de Estilo Rápido

### Contenedores Estándar

```tsx
// Container principal con padding responsive
<div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">

// Container estrecho (contenido de texto)
<div className="container mx-auto px-4 max-w-4xl">

// Container ancho (full-width con límite)
<div className="container mx-auto px-4 max-w-7xl">
```

### Espaciado Vertical entre Secciones

```tsx
// Espaciado pequeño
<section className="py-8 md:py-12">

// Espaciado medio (estándar)
<section className="py-12 md:py-16 lg:py-20">

// Espaciado grande
<section className="py-16 md:py-24 lg:py-32">
```

### Grids Responsive Comunes

```tsx
// 2 columnas en tablet, 3 en desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

// 1 columna móvil, 2 desktop
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

// 4 columnas en desktop grande
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
```

### Flex Layouts Comunes

```tsx
// Header/nav con espacio entre elementos
<div className="flex items-center justify-between gap-4">

// Stack vertical con gap
<div className="flex flex-col gap-6">

// Responsive: columna en móvil, fila en desktop
<div className="flex flex-col md:flex-row items-center gap-6">
```

---

## 📚 Referencias

- **Referencia Rápida Completa**: `.github/WEBCODE-STYLE-REFERENCE.md`
- **Guía de Estilos Base**: `docs/03-DISENO-guia-estilos-base.md`
- **Instrucciones de Styling**: `.github/instructions/styling.instructions.md`
- **Sistema WAS**: `docs/05-DISENO-sistema-animaciones-websnack.md`

---

**Última actualización**: Octubre 2025
