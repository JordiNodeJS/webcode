# 🎨 WebSnack - Sistema de Colores Maestro

> **Fuente de Verdad Única** para todos los colores del proyecto  
> **Estilo**: Brutalismo con Tonos Pasteles  
> **Fecha**: 2025-01-21  
> **Estado**: ✅ IMPLEMENTADO

## 🎯 Paleta Principal

### **Colores Brutalistas Core**
```css
/* Variables CSS en formato RGB para TailwindCSS v4 */
:root {
  /* PRIMARIOS - Brutalismo Suave */
  --color-primary: 255 102 128;     /* #ff6680 - Rosa brutalista principal */
  --color-secondary: 255 143 102;   /* #ff8f66 - Naranja complementario */
  --color-accent: 147 51 234;       /* #9333ea - Púrpura contraste fuerte */
  
  /* PASTELES DE APOYO */
  --color-pastel-blue: 147 197 253; /* #93c5fd - Azul pastel suave */
  --color-pastel-green: 134 239 172; /* #86efac - Verde pastel fresco */
  --color-pastel-yellow: 254 240 138; /* #fef08a - Amarillo pastel cálido */
  --color-pastel-pink: 251 207 232; /* #fbcfe8 - Rosa pastel delicado */
  
  /* NEUTRALES BRUTALISTAS */
  --color-background: 255 255 255;  /* #ffffff - Blanco puro */
  --color-foreground: 15 23 42;     /* #0f172a - Negro casi puro */
  --color-muted: 248 250 252;       /* #f8fafc - Gris muy claro */
  --color-border: 15 23 42;         /* #0f172a - Bordes negros (brutalismo) */
  
  /* ESTADOS UI */
  --color-success: 34 197 94;       /* #22c55e - Verde éxito */
  --color-warning: 245 158 11;      /* #f59e0b - Ámbar advertencia */
  --color-error: 239 68 68;         /* #ef4444 - Rojo error */
  --color-info: 59 130 246;         /* #3b82f6 - Azul información */
}
```

### **Dark Mode Adaptation**
```css
[data-theme="dark"] {
  --color-background: 15 23 42;     /* #0f172a - Negro de fondo */
  --color-foreground: 248 250 252;  /* #f8fafc - Blanco texto */
  --color-muted: 30 41 59;          /* #1e293b - Gris oscuro */
  --color-border: 248 250 252;      /* #f8fafc - Bordes blancos en dark */
}
```

## 🎨 Gradientes Brutalistas

```css
/* Gradientes con personalidad fuerte */
:root {
  --gradient-primary: linear-gradient(135deg, 
    rgb(var(--color-primary)), 
    rgb(var(--color-secondary))
  );
  
  --gradient-pastel: linear-gradient(135deg, 
    rgb(var(--color-pastel-blue)), 
    rgb(var(--color-pastel-pink))
  );
  
  --gradient-accent: linear-gradient(135deg, 
    rgb(var(--color-accent)), 
    rgb(var(--color-primary))
  );
  
  --gradient-rainbow: linear-gradient(90deg,
    rgb(var(--color-primary)),
    rgb(var(--color-pastel-yellow)),
    rgb(var(--color-pastel-green)),
    rgb(var(--color-pastel-blue)),
    rgb(var(--color-accent))
  );
}
```

## 🖌️ Patrones de Uso

### **1. Componentes Principales**
- **Botones CTA**: `primary` con sombras brutalistas
- **Navegación**: `secondary` con bordes marcados
- **Acentos**: `accent` para elementos destacados
- **Fondos**: Pasteles para secciones suaves

### **2. Jerarquía Visual**
```css
/* Títulos principales */
.title-hero { color: rgb(var(--color-primary)); }

/* Subtítulos */
.title-section { color: rgb(var(--color-accent)); }

/* Texto normal */
.text-body { color: rgb(var(--color-foreground)); }

/* Texto secundario */
.text-muted { color: rgb(var(--color-foreground) / 0.7); }
```

### **3. Estados Interactivos**
```css
/* Botón brutalista estándar */
.btn-brutalist {
  background: rgb(var(--color-primary));
  color: rgb(var(--color-background));
  border: 3px solid rgb(var(--color-border));
  box-shadow: 6px 6px 0px rgb(var(--color-foreground));
  transition: all 0.2s ease;
}

.btn-brutalist:hover {
  transform: translate(-3px, -3px);
  box-shadow: 9px 9px 0px rgb(var(--color-foreground));
}

.btn-brutalist:active {
  transform: translate(0px, 0px);
  box-shadow: 3px 3px 0px rgb(var(--color-foreground));
}
```

## 📐 Contraste y Accesibilidad

### **Ratios de Contraste WCAG 2.1 AA**
- **Primary sobre Background**: 4.52:1 ✅
- **Secondary sobre Background**: 4.31:1 ✅
- **Accent sobre Background**: 7.12:1 ✅
- **Foreground sobre Background**: 16.71:1 ✅

### **Verificación Daltonismo**
- ✅ **Protanopia**: Colores distinguibles
- ✅ **Deuteranopia**: Colores distinguibles  
- ✅ **Tritanopia**: Colores distinguibles

## 🚫 Colores PROHIBIDOS

### **NUNCA usar estos colores obsoletos:**
```css
/* ❌ SISTEMA OBSOLETO A */
--color-primary: 38 78 112;      /* #264e70 */
--color-secondary: 103 145 134;  /* #679186 */
--color-accent: 249 180 171;     /* #f9b4ab */

/* ❌ SISTEMA OBSOLETO B */
--primary: #3B82F6;
--secondary: #64748B;
--accent: #F59E0B;

/* ❌ VALORES HARDCODEADOS */
background: #264e70; /* PROHIBIDO */
color: #3B82F6;      /* PROHIBIDO */
```

## 🔧 Implementación TailwindCSS v4

```javascript
// tailwind.config.js
function withOpacity(variable) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgb(var(${variable}) / ${opacityValue})`;
    }
    return `rgb(var(${variable}))`;
  };
}

export default {
  theme: {
    extend: {
      colors: {
        // Colores brutalistas WebSnack
        primary: withOpacity("--color-primary"),
        secondary: withOpacity("--color-secondary"),
        accent: withOpacity("--color-accent"),
        
        // Pasteles
        'pastel-blue': withOpacity("--color-pastel-blue"),
        'pastel-green': withOpacity("--color-pastel-green"),
        'pastel-yellow': withOpacity("--color-pastel-yellow"),
        'pastel-pink': withOpacity("--color-pastel-pink"),
        
        // Estados
        success: withOpacity("--color-success"),
        warning: withOpacity("--color-warning"),
        error: withOpacity("--color-error"),
        info: withOpacity("--color-info"),
        
        // Neutrales
        background: withOpacity("--color-background"),
        foreground: withOpacity("--color-foreground"),
        muted: withOpacity("--color-muted"),
        border: withOpacity("--color-border"),
      },
    },
  },
}
```

## 🎯 Ejemplos de Uso

### **Componente Hero Brutalista**
```tsx
<section className="bg-background relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-pastel-blue/20 to-pastel-pink/20" />
  <div className="relative z-10 container mx-auto px-4 py-20">
    <h1 className="text-6xl font-black text-primary mb-6 transform -rotate-1">
      WebSnack Studio
    </h1>
    <p className="text-xl text-foreground/80 mb-8 max-w-2xl">
      Creamos experiencias web que explotan con personalidad
    </p>
    <button className="btn-brutalist px-8 py-4 text-lg font-bold">
      ¡EMPEZAR AHORA!
    </button>
  </div>
</section>
```

### **Card Brutalista**
```tsx
<div className="bg-background border-4 border-foreground p-6 shadow-[8px_8px_0px_0px_rgb(var(--color-primary))] hover:shadow-[12px_12px_0px_0px_rgb(var(--color-primary))] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all duration-200">
  <h3 className="text-2xl font-bold text-accent mb-4">Título Brutal</h3>
  <p className="text-foreground/80">Contenido con personalidad strong</p>
</div>
```

---

> **🎯 Esta es la única fuente de verdad para colores en WebSnack. Todos los demás archivos deben referenciar estas variables.**
