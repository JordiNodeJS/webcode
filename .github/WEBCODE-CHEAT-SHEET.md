# 🎨 WebCode Style Cheat Sheet

> Guía ultra-rápida de consulta diaria

---

## 🎯 Colores

```tsx
// Primary (Rosa)
className="bg-primary text-primary-foreground"
className="border-primary"
className="text-primary"

// Secondary (Aguamarina)  
className="bg-secondary text-secondary-foreground"

// Backgrounds
className="bg-background text-foreground"
className="bg-muted text-muted-foreground"
```

---

## 💎 Sombras 3D

```tsx
// Botones
style={{ boxShadow: 'var(--shadow-3d-sm)' }}

// Cards, Containers
style={{ boxShadow: 'var(--shadow-3d-md)' }}

// Modales, Destacados
style={{ boxShadow: 'var(--shadow-3d-lg)' }}
```

---

## ✍️ Tipografía

```tsx
// Títulos
className="font-display text-5xl"

// Texto normal
className="font-sans text-base"

// Textos largos
className="font-serif text-lg"

// Código
className="font-mono text-sm"
```

---

## 🎬 Animaciones

```tsx
// Transición estándar (300ms)
className="transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"

// Hover rápido (200ms)
className="transition-all duration-200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"

// Hover estándar
className="hover:opacity-80 hover:-translate-y-0.5"
```

---

## 🌟 Clases Especiales

```tsx
// Título con gradiente neón
className="neon-cyan-title"

// Título de card con gradiente
className="neon-cyan-card-title"

// Fondo con gradiente
className="bg-gradient-webcode"

// Texto con gradiente
className="text-gradient-webcode"
```

---

## 📐 Espaciado

```tsx
// Texto (12px)
className="gap-3 p-3 space-y-3"

// Elemento (24px)
className="gap-6 p-6 space-y-6"

// Componente (32px)
className="gap-8 p-8 space-y-8"

// Sección (64px)
className="gap-16 p-16 space-y-16"
```

---

## 📱 Responsive

```tsx
// Mobile first
className="
  grid-cols-1 
  md:grid-cols-2 
  lg:grid-cols-3
"

// Texto responsive
className="text-base md:text-lg lg:text-xl"

// Padding responsive
className="px-4 py-8 md:py-12 lg:py-16"
```

---

## 🔘 Botón WebCode

```tsx
<Button
  className="
    hover:opacity-80 
    hover:-translate-y-0.5
    transition-all duration-200
  "
  style={{ boxShadow: 'var(--shadow-3d-sm)' }}
>
  Texto
</Button>
```

---

## 🃏 Card WebCode

```tsx
<Card 
  className="border-primary" 
  style={{ boxShadow: 'var(--shadow-3d-md)' }}
>
  <CardHeader>
    <CardTitle className="neon-cyan-card-title">
      Título
    </CardTitle>
  </CardHeader>
  <CardContent>Contenido</CardContent>
</Card>
```

---

## 🏠 Hero WebCode

```tsx
<section className="bg-gradient-webcode min-h-screen">
  <div className="container mx-auto px-4 py-16">
    <h1 className="
      neon-cyan-title 
      text-6xl md:text-7xl 
      font-display
    ">
      Título
    </h1>
  </div>
</section>
```

---

## ✅ Checklist Rápido

- [ ] ¿Usa colores del tema?
- [ ] ¿Tiene sombra 3D?
- [ ] ¿Usa tipografía correcta?
- [ ] ¿Tiene hover:opacity-80?
- [ ] ¿Usa timing WAS?
- [ ] ¿Es mobile-first?
- [ ] ¿Funciona en dark mode?
- [ ] ¿Espaciado semántico?

---

## 📚 Referencias

**Completa**: `.github/WEBCODE-STYLE-REFERENCE.md`  
**Ejemplos**: `.github/WEBCODE-STYLE-EXAMPLES.md`  
**Styling**: `.github/instructions/styling.instructions.md`  
**Components**: `.github/instructions/components.instructions.md`

---

**WAS v1.0** | Octubre 2025
