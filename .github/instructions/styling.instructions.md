---
applyTo: "**/*.{css,scss,ts,tsx}"
---

# Instrucciones para Estilos y Diseño WebSnack

## Sistema de Diseño WebSnack

### Tailwind CSS v4

- Usar clases utilitarias directamente
- Evitar CSS personalizado a menos que sea absolutamente necesario
- Seguir principios mobile-first

### Paleta de Colores

```css
/* Colores principales WebSnack */
--primary: #3b82f6; /* Blue-500 */
--secondary: #64748b; /* Slate-500 */
--accent: #f59e0b; /* Amber-500 */
--success: #10b981; /* Emerald-500 */
--warning: #f59e0b; /* Amber-500 */
--error: #ef4444; /* Red-500 */
```

### Tipografía

- Font primaria: Inter (sistema)
- Font secundaria: JetBrains Mono (código)
- Escala tipográfica: text-sm, text-base, text-lg, text-xl, text-2xl...

### Espaciado Consistente

```tsx
// ✅ Usar escala de espaciado consistente
<div className="p-4 mb-6 gap-3">     // Pequeño
<div className="p-6 mb-8 gap-4">     // Medio
<div className="p-8 mb-12 gap-6">    // Grande
```

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

### Dark Mode

```tsx
// ✅ Soporte completo dark mode
<div className="
  bg-white dark:bg-gray-900
  text-gray-900 dark:text-white
  border-gray-200 dark:border-gray-700
">
```

### Componentes shadcn/ui

```tsx
// ✅ Usar componentes base y personalizarlos con clases
<Button
  variant="default"
  size="lg"
  className="w-full md:w-auto bg-primary hover:bg-primary/90"
>
  Contactar
</Button>
```

### Animaciones con Tailwind

```tsx
// ✅ Animaciones sutiles y profesionales
<div className="
  transition-all duration-300 ease-in-out
  hover:scale-105 hover:shadow-lg
  focus:ring-2 focus:ring-primary/20
">
```

### Estados Interactivos

```tsx
// ✅ Estados hover, focus, active consistentes
<button className="
  bg-primary text-white
  hover:bg-primary/90
  focus:ring-2 focus:ring-primary/20 focus:outline-none
  active:scale-95
  disabled:opacity-50 disabled:cursor-not-allowed
  transition-all duration-200
">
```

### Layouts Comunes

```tsx
// Container estándar WebSnack
<div className="container mx-auto px-4 py-8 max-w-7xl">

// Grid responsive estándar
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Flex layouts
<div className="flex flex-col md:flex-row items-center justify-between gap-4">
```
