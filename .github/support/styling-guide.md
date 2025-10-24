# Styling Guide - WebCode

## **Contexto**

Guía consolidada de estilos, Tailwind CSS v4, sistema WebCode Animation System (WAS) y reglas unificadas de diseño para el proyecto WebCode.

---

## **1. TAILWIND CSS V4 - FUNDAMENTOS**

### **Utility-First Approach**

```tsx
// ✅ Usar clases utilitarias directamente
<div className="flex items-center gap-4 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
  <Avatar />
  <div className="flex-1">
    <h3 className="font-semibold text-lg">John Doe</h3>
    <p className="text-sm text-gray-600 dark:text-gray-400">Developer</p>
  </div>
</div>

// ❌ Evitar CSS personalizado cuando no sea necesario
<div className="custom-card"> {/* Con CSS externo */}
```

### **Responsive Design (Mobile-First)**

```tsx
// ✅ Mobile-first: de pequeño a grande
<div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">

// Breakpoints:
// sm: 640px  (tablet pequeña)
// md: 768px  (tablet)
// lg: 1024px (laptop)
// xl: 1280px (desktop)
// 2xl: 1536px (pantallas grandes)
```

### **Dark Mode**

```tsx
// ✅ Soporte dark mode con prefijo dark:
<div className="bg-white dark:bg-gray-900">
  <h1 className="text-gray-900 dark:text-gray-100">Título</h1>
  <p className="text-gray-600 dark:text-gray-400">Texto</p>
</div>
```

---

## **2. SISTEMA WEBCODE (WAS)**

### **Paleta de Colores**

```css
/* Variables en globals.css */
:root {
  --primary: oklch(0.57 0.2 328.5); /* #dc7cb3 - Rosa principal */
  --primary-rgb: 220 124 179;
  --secondary: oklch(0.43 0.18 184.1); /* #bce3e5 - Aguamarina */
  --secondary-rgb: 188 227 229;
}
```

**Uso en componentes:**

```tsx
// ✅ Clases Tailwind con tema
<Button className="bg-primary text-primary-foreground hover:bg-primary/90">
  Click me
</Button>

// ✅ Variables CSS para opacidad dinámica
<div style={{ backgroundColor: `rgba(var(--primary-rgb), 0.2)` }}>
  Fondo con opacidad
</div>
```

### **Sombras 3D Características**

```css
/* Variables CSS en globals.css */
--shadow-3d-xs: 1px 1px 0 rgba(var(--primary-rgb), 0.3);
--shadow-3d-sm: 2px 2px 0 rgba(var(--primary-rgb), 0.3);
--shadow-3d-md: 4px 4px 0 rgba(var(--primary-rgb), 0.3);
--shadow-3d-lg: 6px 6px 0 rgba(var(--primary-rgb), 0.3);
--shadow-3d-xl: 8px 8px 0 rgba(var(--primary-rgb), 0.3);
```

**Uso:**

```tsx
<Card style={{ boxShadow: "var(--shadow-3d-md)" }}>
  <CardContent>Contenido con sombra 3D</CardContent>
</Card>
```

### **Tipografía**

```css
/* Fuentes del sistema */
--font-sans: "Poppins", sans-serif; /* Texto general */
--font-display: "Space Grotesk", sans-serif; /* Títulos */
--font-serif: "Lora", serif; /* Textos largos */
--font-mono: "Fira Code", monospace; /* Código */
```

**Uso:**

```tsx
<h1 className="font-display text-4xl font-bold">Título Hero</h1>
<p className="font-sans text-base">Texto del cuerpo</p>
<code className="font-mono text-sm">const code = true;</code>
<article className="font-serif">Texto de artículo largo...</article>
```

### **Espaciado Semántico**

| Contexto   | Gap      | Padding | Tamaño (px) | Rem     |
| ---------- | -------- | ------- | ----------- | ------- |
| Texto      | `gap-3`  | `p-3`   | 12          | 0.75rem |
| Elemento   | `gap-6`  | `p-6`   | 24          | 1.5rem  |
| Componente | `gap-8`  | `p-8`   | 32          | 2rem    |
| Sección    | `gap-16` | `p-16`  | 64          | 4rem    |

### **Animaciones WAS**

#### **Easing Personalizado**

```css
--ease-webcode: cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

#### **Duraciones Estándar**

- `duration-100` (100ms) - Instant feedback
- `duration-200` (200ms) - Quick transitions (recomendado)
- `duration-300` (300ms) - Normal transitions
- `duration-500` (500ms) - Smooth animations

#### **Patrón de Hover**

```tsx
<Button
  className="
    hover:opacity-80 
    hover:translate-y-0.5
    transition-all duration-200
    ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
  "
>
  Hover me
</Button>
```

---

## **3. CLASES ESPECIALES WEBCODE**

### **Gradientes y Efectos**

```tsx
// Título con neón cyan
<h1 className="neon-cyan-title">
  Título Principal
</h1>

// Título de card con neón
<h2 className="neon-cyan-card-title">
  Card Title
</h2>

// Fondo con gradiente del tema
<div className="bg-gradient-webcode">
  Contenido
</div>

// Texto con gradiente
<p className="text-gradient-webcode">
  Texto con gradiente animado
</p>

// Sombra 3D directa
<Card className="shadow-3d-md">
  Contenido
</Card>
```

---

## **4. REGLAS DE COLORES**

### **🚨 NUNCA Hardcodear Colores**

```tsx
// ❌ Prohibido
<div className="bg-[#dc7cb3]">
<div style={{ color: '#dc7cb3' }}>

// ✅ Correcto
<div className="bg-primary">
<div className="text-primary">
```

### **Sistema de Theming Centralizado**

```
src/styles/
├── globals.css        # Variables CSS (fuente de verdad)
├── components.css     # Clases especiales WebCode
└── tailwind.config.ts # Configuración Tailwind
```

**Arquitectura:**

1. **Variables CSS** → Definen colores base
2. **Tailwind config** → Extiende con colores del tema
3. **Componentes** → Usan clases Tailwind o variables CSS

### **Paleta Oficial (Formato RGB)**

```css
--color-primary: 38 78 112; /* #264e70 - Azul corporativo */
--color-secondary: 103 145 134; /* #679186 - Verde complementario */
--color-accent: 249 180 171; /* #f9b4ab - Rosa coral CTA */
--color-highlight: 250 227 96; /* #fae360 - Amarillo destacados */
--color-neutral: 187 212 206; /* #bbd4ce - Verde neutro */
```

---

## **5. COMPONENTE PATTERNS**

### **Patrón de Card Estándar**

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function StandardCard() {
  return (
    <Card
      className="border-primary"
      style={{ boxShadow: "var(--shadow-3d-md)" }}
    >
      <CardHeader>
        <CardTitle className="neon-cyan-card-title font-display">
          Título con Estilo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-sans text-muted-foreground">
          Contenido de la tarjeta con tipografía correcta.
        </p>
      </CardContent>
      <CardFooter>
        <Button
          className="
            hover:opacity-80 
            transition-all duration-200
            ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
          "
          style={{ boxShadow: "var(--shadow-3d-sm)" }}
        >
          Acción
        </Button>
      </CardFooter>
    </Card>
  );
}
```

### **Composición con cn()**

```tsx
import { cn } from "@/lib/utils";

interface ButtonProps {
  variant?: "primary" | "secondary";
  className?: string;
}

export function CustomButton({ variant = "primary", className }: ButtonProps) {
  return (
    <button
      className={cn(
        // Estilos base
        "px-6 py-3 rounded-lg font-semibold transition-all duration-200",
        // Estilos por variante
        variant === "primary" &&
          "bg-primary text-primary-foreground hover:bg-primary/90",
        variant === "secondary" &&
          "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        // Estilos externos
        className
      )}
    >
      Click me
    </button>
  );
}
```

---

## **6. RESPONSIVE PATTERNS**

### **Grid Responsivo**

```tsx
<div
  className="
  grid 
  grid-cols-1 
  md:grid-cols-2 
  lg:grid-cols-3 
  xl:grid-cols-4
  gap-6
"
>
  {items.map((item) => (
    <Card key={item.id}>{item.name}</Card>
  ))}
</div>
```

### **Texto Responsivo**

```tsx
<h1 className="
  text-2xl
  md:text-4xl
  lg:text-6xl
  font-display
  font-bold
">
  Título Responsivo
</h1>

<p className="
  text-sm
  md:text-base
  lg:text-lg
">
  Texto responsivo
</p>
```

### **Espaciado Responsivo**

```tsx
<section
  className="
  px-4 md:px-8 lg:px-16
  py-8 md:py-12 lg:py-16
"
>
  Contenido con espaciado responsive
</section>
```

### **Layout Responsivo**

```tsx
// Stack en móvil, horizontal en desktop
<div
  className="
  flex 
  flex-col 
  md:flex-row 
  items-center 
  gap-6
"
>
  <div className="w-full md:w-1/2">Izquierda</div>
  <div className="w-full md:w-1/2">Derecha</div>
</div>
```

---

## **7. ACCESIBILIDAD**

### **Contraste de Colores**

```tsx
// ✅ Asegurar contraste mínimo 4.5:1 para texto normal
<p className="text-gray-900 dark:text-gray-100">
  Texto con buen contraste
</p>

// ✅ Contraste 3:1 para texto grande (>18px o bold >14px)
<h2 className="text-2xl text-gray-800 dark:text-gray-200">
  Título grande
</h2>
```

### **Focus Visible**

```tsx
<button
  className="
  focus:outline-none 
  focus:ring-2 
  focus:ring-primary 
  focus:ring-offset-2
"
>
  Botón accesible
</button>
```

### **Skip Links**

```tsx
<a
  href="#main-content"
  className="
    sr-only 
    focus:not-sr-only 
    focus:absolute 
    focus:top-4 
    focus:left-4 
    focus:z-50
  "
>
  Saltar al contenido principal
</a>
```

---

## **8. PERFORMANCE**

### **Evitar Clases Dinámicas**

```tsx
// ❌ Evitar: Tailwind no puede purgar dinámicas
<div className={`text-${color}-500`}>

// ✅ Mejor: Mapeo explícito
const colorMap = {
  red: 'text-red-500',
  blue: 'text-blue-500',
  green: 'text-green-500',
};

<div className={colorMap[color]}>
```

### **Purging CSS**

```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"]
  // Tailwind eliminará clases no usadas en producción
};
```

---

## **9. CHECKLIST DE ESTILO**

Cada componente debe cumplir:

- [ ] Usa colores del tema (primary/secondary/accent)
- [ ] Implementa sombras 3D donde corresponde
- [ ] Usa tipografías correctas (font-display/font-sans)
- [ ] Tiene hover:opacity-80 en elementos interactivos
- [ ] Usa timing WAS (duration-200) y easing correcto
- [ ] Es responsive mobile-first
- [ ] Soporta dark mode
- [ ] Usa espaciado semántico (3, 6, 8, 16)
- [ ] Cumple contraste WCAG 2.1 AA
- [ ] Tiene focus visible

---

## **10. ANTI-PATRONES**

### **❌ NO: Colores Hardcodeados**

```tsx
❌ <div className="bg-[#dc7cb3]">
✅ <div className="bg-primary">
```

### **❌ NO: Inline Styles Sin Variables**

```tsx
❌ <div style={{ color: '#dc7cb3' }}>
✅ <div className="text-primary">
```

### **❌ NO: Clases Genéricas**

```tsx
❌ <Button className="btn">
✅ <Button className="bg-primary hover:bg-primary/90">
```

### **❌ NO: Importante (!important)**

```tsx
❌ <div className="!text-red-500">
✅ Ajustar especificidad correctamente
```

---

## **11. TROUBLESHOOTING**

### **Estilos no se aplican**

```bash
# 1. Verificar que el archivo está en content de tailwind.config
# 2. Reiniciar servidor de desarrollo
pnpm dev

# 3. Limpiar caché de Next.js
rm -rf .next
pnpm dev
```

### **Dark mode no funciona**

```tsx
// Verificar que el html tiene el atributo correcto
<html lang="es" suppressHydrationWarning>
  <body>{children}</body>
</html>;

// Usar next-themes para toggle
import { ThemeProvider } from "next-themes";
```

### **Purge elimina clases necesarias**

```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  safelist: [
    "neon-cyan-title",
    "shadow-3d-md"
    // Clases que no se detectan automáticamente
  ]
};
```

---

## **REFERENCIAS**

- Tailwind CSS v4: https://tailwindcss.com
- WebCode Style Reference: `.github/WEBCODE-STYLE-REFERENCE.md`
- WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
