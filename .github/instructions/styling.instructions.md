````instructions
---
applyTo: "**/*.{css,scss,ts,tsx}"
---

# Instrucciones para Estilos y Diseño WebCode

## Sistema de Diseño WebCode (WAS - WebCode Animation System)

### Tailwind CSS v4

- Usar clases utilitarias directamente
- Evitar CSS personalizado a menos que sea absolutamente necesario
- Seguir principios mobile-first
- Integrar con design tokens del tema WebCode

### Paleta de Colores WebCode (OKLCH)

```css
/* Colores principales WebCode - Tema Rosa/Aguamarina */
:root {
  /* Colores base */
  --background: oklch(1 0 0);                          /* #ffffff - Blanco */
  --foreground: oklch(0.356 0 0);                      /* #5b5b5b - Gris oscuro */

  /* Colores principales del tema */
  --primary: oklch(0.57 0.2 328.5);                    /* #dc7cb3 - Rosa principal WebCode */
  --primary-foreground: oklch(0.98 0 0);               /* #ffffff - Blanco sobre rosa */
  --primary-rgb: 220, 124, 179;                        /* RGB para efectos */

  --secondary: oklch(0.43 0.18 184.1);                 /* #bce3e5 - Aguamarina WebCode */
  --secondary-foreground: oklch(0.12 0 0);             /* #333333 - Oscuro sobre aguamarina */
  --secondary-rgb: 130, 200, 210;                      /* RGB para efectos */

  /* Gradientes específicos */
  --gradient-primary: oklch(0.96 0.04 328.5);          /* Rosa suave para gradientes */
  --gradient-secondary: oklch(0.96 0.04 184.1);        /* Aguamarina suave para gradientes */
  --gradient-muted: oklch(0.975 0.02 0);               /* Neutral claro */

  /* Colores de apoyo */
  --accent: oklch(0.57 0.2 328.5);                     /* Mismo que primary */
  --accent-foreground: oklch(0.98 0 0);                /* Blanco sobre accent */
  --muted: oklch(0.975 0.008 184.1);                   /* #f4fbfc - Azul muy claro */
  --muted-foreground: oklch(0.54 0 0);                 /* #7a7a7a - Gris medio */

  /* Estados y utilidades */
  --destructive: oklch(0.759 0.112 12.2);              /* #fcb4b5 - Rosa error */
  --border: oklch(0.45 0.1 328.5);                     /* Rosa para bordes */
  --input: oklch(0.94 0.015 0);                        /* #e4e4e4 - Gris claro */
  --ring: oklch(0.57 0.2 328.5);                       /* Rosa para focus ring */

  /* Sistema de radius */
  --radius: 0.625rem;                                  /* 10px - Radio base */
}

/* Dark Mode WebCode */
.dark {
  --background: oklch(0.094 0 0);                      /* #0f0f0f - Negro */
  --foreground: oklch(0.961 0 0);                      /* #f5f5f5 - Blanco */

  --primary: oklch(0.84 0.16 328.5);                   /* Rosa brillante modo oscuro */
  --primary-foreground: oklch(0.08 0 0);               /* Oscuro sobre rosa brillante */
  --primary-rgb: 255, 170, 215;                        /* RGB más brillante */

  --secondary: oklch(0.45 0.18 184.1);                 /* Aguamarina modo oscuro */
  --secondary-foreground: oklch(0.985 0 0);            /* Blanco sobre aguamarina */
  --secondary-rgb: 100, 180, 200;                      /* RGB más brillante */

  /* Gradientes modo oscuro */
  --gradient-primary: oklch(0.18 0.08 328.5);          /* Rosa oscuro perceptible */
  --gradient-secondary: oklch(0.18 0.08 184.1);        /* Aguamarina oscuro perceptible */
  --gradient-muted: oklch(0.14 0.02 0);                /* Neutral oscuro */
}
```

### Tipografía WebCode

- **Font Sans**: Poppins (texto general y cuerpo)
- **Font Display**: Space Grotesk (títulos y elementos destacados)
- **Font Serif**: Lora (textos largos y citas)
- **Font Mono**: Fira Code (código y elementos técnicos)
- Escala tipográfica: text-xs (12px) → text-8xl (96px)

### Sistema de Sombras 3D WebCode (WAS)

```css
/* Sombras 3D del Sistema WAS - Característica distintiva WebCode */
:root {
  --shadow-3d-xs: 2px 2px 0px 0px oklch(0.57 0.2 328.5 / 0.4);
  --shadow-3d-sm: 3px 3px 0px 0px oklch(0.57 0.2 328.5 / 0.6);
  --shadow-3d-md: 3px 3px 0px 0px oklch(0.57 0.2 328.5 / 0.8),
                  1px 1px 2px -1px oklch(0.57 0.2 328.5 / 0.4);
  --shadow-3d-lg: 4px 4px 0px 0px oklch(0.57 0.2 328.5 / 0.8),
                  2px 2px 4px -1px oklch(0.57 0.2 328.5 / 0.4);
  --shadow-3d-xl: 6px 6px 0px 0px oklch(0.57 0.2 328.5 / 0.9),
                  3px 3px 6px -1px oklch(0.57 0.2 328.5 / 0.5);
}

.dark {
  --shadow-3d-xs: 2px 2px 0px 0px oklch(0.84 0.16 328.5 / 0.4);
  --shadow-3d-sm: 3px 3px 0px 0px oklch(0.84 0.16 328.5 / 0.6);
  --shadow-3d-md: 3px 3px 0px 0px oklch(0.84 0.16 328.5 / 0.8),
                  1px 1px 2px -1px oklch(0.84 0.16 328.5 / 0.4);
  --shadow-3d-lg: 4px 4px 0px 0px oklch(0.84 0.16 328.5 / 0.8),
                  2px 2px 4px -1px oklch(0.84 0.16 328.5 / 0.4);
  --shadow-3d-xl: 6px 6px 0px 0px oklch(0.84 0.16 328.5 / 0.9),
                  3px 3px 6px -1px oklch(0.84 0.16 328.5 / 0.5);
}
```

```tsx
// ✅ Usar sombras 3D WebCode
<div style={{ boxShadow: 'var(--shadow-3d-md)' }} className="rounded-lg">
  // O con Tailwind utilities personalizadas
</div>
```

### Espaciado Consistente WebCode

```tsx
// ✅ Sistema de espaciado semántico WebCode
<div className="p-3 mb-3 gap-3">     // Text spacing (12px)
<div className="p-6 mb-6 gap-4">     // Element spacing (24px)
<div className="p-8 mb-8 gap-6">     // Component spacing (32px)
<div className="p-16 mb-16 gap-8">   // Section spacing (64px)

### Responsive Design

```tsx
// ✅ Mobile-first approach
<div className="
  grid grid-cols-1           // Móvil: 1 columna
  md:grid-cols-2            // Tablet: 2 columnas
  lg:grid-cols-3            // Desktop: 3 columnas
  gap-4 md:gap-6 lg:gap-8   // Espaciado responsive
">
```

### Sistema de Animaciones WAS (WebCode Animation System)

```tsx
// ✅ Transiciones profesionales con timing WebCode
const wsCurves = {
  primary: [0.25, 0.46, 0.45, 0.94],   // Curva principal profesional
  smooth: [0.4, 0, 0.2, 1],             // Suave y natural
  bounce: [0.68, -0.55, 0.265, 1.55],   // Con rebote
  dramatic: [0.87, 0, 0.13, 1]          // Dramático
};

const timings = {
  instant: 0.1,    // 100ms - Cambios instantáneos
  quick: 0.2,      // 200ms - Interacciones rápidas
  normal: 0.3,     // 300ms - Estándar WebCode
  smooth: 0.5,     // 500ms - Transiciones suaves
  dramatic: 0.8,   // 800ms - Efectos dramáticos
  slow: 1.2        // 1200ms - Animaciones lentas
};

// Clase CSS base
<div className="transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">

// Con Framer Motion
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.3,
    ease: [0.25, 0.46, 0.45, 0.94]
  }}
>
```

### Estados Hover WebCode

```tsx
// ✅ Hover states consistentes con el tema
<button className="
  bg-primary text-primary-foreground
  hover:opacity-80                           // Opacidad 0.8 estándar WebCode
  hover:scale-102                            // Escala sutil 1.02
  hover:-translate-y-1                       // Elevación sutil
  transition-all duration-200
  ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
">
```

### Dark Mode WebCode

```tsx
// ✅ Soporte completo dark mode con tema WebCode
<div className="
  bg-background dark:bg-background           // Usa variables del tema
  text-foreground dark:text-foreground
  border-border dark:border-border
">

// ✅ Con colores específicos del tema
<div className="
  bg-gradient-webcode                         // Gradiente automático claro/oscuro
  text-primary dark:text-primary              // Rosa que se ajusta automáticamente
  border-primary dark:border-primary
">
```

### Componentes shadcn/ui con Tema WebCode

```tsx
// ✅ Usar componentes base con tema WebCode aplicado
<Button
  variant="default"                          // Usa bg-primary del tema
  size="lg"
  className="
    w-full md:w-auto
    hover:opacity-80                         // Hover estándar WebCode
    transition-all duration-200
  "
>
  Contactar
</Button>

// ✅ Card con sombra 3D WebCode
<Card className="border-primary" style={{ boxShadow: 'var(--shadow-3d-md)' }}>
  <CardHeader>
    <CardTitle className="neon-cyan-card-title">Título con gradiente</CardTitle>
  </CardHeader>
  <CardContent>Contenido de la tarjeta</CardContent>
</Card>
```

### Clases Especiales WebCode

```tsx
// ✅ Títulos con efecto neón gradiente
<h1 className="neon-cyan-title">
  Título Principal WebCode
</h1>

<h2 className="neon-cyan-card-title">
  Título de Tarjeta
</h2>

// ✅ Fondos con gradiente WebCode
<div className="bg-gradient-webcode min-h-screen">
  {/* Gradiente automático claro/oscuro */}
</div>

// ✅ Texto con gradiente WebCode
<p className="text-gradient-webcode text-4xl font-bold">
  Texto con gradiente rosa-aguamarina
</p>

// ✅ Sombras 3D directas
<div className="shadow-3d-xs">Extra pequeño</div>
<div className="shadow-3d-sm">Pequeño</div>
<div className="shadow-3d-md">Mediano (estándar)</div>
<div className="shadow-3d-lg">Grande</div>
<div className="shadow-3d-xl">Extra grande</div>
```

### Estados Interactivos WebCode

```tsx
// ✅ Estados completos con estilo WebCode
<button className="
  bg-primary text-primary-foreground
  hover:opacity-80                           // Estándar WebCode
  hover:-translate-y-0.5                     // Elevación sutil
  focus:ring-2 focus:ring-ring focus:outline-none
  active:scale-95                            // Presión
  disabled:opacity-50 disabled:cursor-not-allowed
  transition-all duration-200
  ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
"
style={{ boxShadow: 'var(--shadow-3d-sm)' }}  // Sombra 3D
>
  Botón Interactivo
</button>
```

### Layouts Comunes

```tsx
### Layouts Comunes WebCode

```tsx
// Container estándar WebCode
<div className="container mx-auto px-4 py-8 max-w-7xl">

// Grid responsive con espaciado WebCode
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

// Flex layouts responsive
<div className="flex flex-col md:flex-row items-center justify-between gap-6">

// Sección completa con gradiente
<section className="bg-gradient-webcode py-16 md:py-24">
  <div className="container mx-auto px-4">
    <h2 className="neon-cyan-title mb-8">Sección WebCode</h2>
    {/* Contenido */}
  </div>
</section>
```

### Variables CSS Disponibles

```tsx
// ✅ Acceso directo a variables del tema
style={{
  color: 'rgb(var(--primary-rgb))',           // RGB del primary
  backgroundColor: 'var(--background)',       // Fondo del tema
  boxShadow: 'var(--shadow-3d-md)',          // Sombra 3D
  borderRadius: 'var(--radius)',              // Radio base
  fontFamily: 'var(--font-sans)',             // Tipografía Poppins
}}
```

## Patrones Anti-Pattern ❌

```tsx
// ❌ NO usar colores hardcodeados
<div className="bg-blue-500 text-white">

// ✅ SÍ usar colores del tema
<div className="bg-primary text-primary-foreground">

// ❌ NO usar sombras genéricas
<div className="shadow-lg">

// ✅ SÍ usar sombras 3D WebCode
<div style={{ boxShadow: 'var(--shadow-3d-lg)' }}>

// ❌ NO usar transiciones sin el timing WebCode
<div className="transition-all ease-in-out">

// ✅ SÍ usar timing y easing WebCode
<div className="transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">

// ❌ NO usar tipografías inconsistentes
<h1 style={{ fontFamily: 'Arial' }}>

// ✅ SÍ usar tipografías del sistema
<h1 className="font-display">  // Space Grotesk
```

## Checklist de Estilo WebCode ✓

- [ ] ¿Usa colores del tema WebCode (primary/secondary)?
- [ ] ¿Tiene sombras 3D del sistema WAS?
- [ ] ¿Usa tipografías correctas (Poppins/Space Grotesk/Lora)?
- [ ] ¿Implementa hover con opacity-80?
- [ ] ¿Usa timing y easing WebCode en animaciones?
- [ ] ¿Es responsive mobile-first?
- [ ] ¿Soporta dark mode correctamente?
- [ ] ¿Usa espaciado semántico (3, 6, 8, 16)?
- [ ] ¿Tiene estados interactivos completos (hover/focus/active)?
- [ ] ¿Usa clases especiales cuando corresponde (.neon-cyan-title, .bg-gradient-webcode)?

## Referencias

- **Guía de Estilos Base**: `docs/03-DISENO-guia-estilos-base.md`
- **Guía Extendida**: `docs/04-DISENO-guia-estilos-extendida.md`
- **Sistema WAS**: `docs/05-DISENO-sistema-animaciones-websnack.md`
- **Plan de Consistencia**: `docs/09-DESARROLLO-plan-consistencia.md`
- **Archivo de Estilos**: `src/app/globals.css`

````

```

```
