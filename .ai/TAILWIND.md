# ⚙️ TailwindCSS v4 - Configuración Maestra WebSnack

> **Fuente de Verdad Única** para configuración TailwindCSS v4  
> **Resuelve**: Todos los conflictos de patrones TailwindCSS  
> **Estado**: ✅ IMPLEMENTADO

## 🚨 REGLAS FUNDAMENTALES

### **1. NO usar @apply con clases personalizadas**

```css
/* ❌ PROHIBIDO - Causa errores en TailwindCSS v4 */
.btn-custom {
  @apply bg-primary text-white; /* ERROR: clases custom no reconocidas */
}

/* ✅ CORRECTO - CSS directo + utilities de Tailwind */
.btn-brutalist {
  @apply inline-flex items-center justify-center font-bold transition-all;
  background: rgb(var(--color-primary));
  color: rgb(var(--color-background));
}
```

### **2. Variables CSS en formato RGB**

```css
/* ✅ CORRECTO - Formato compatible con opacidades */
:root {
  --color-primary: 255 102 128; /* SIN rgb() wrapper */
}

/* Uso con opacidades */
.element {
  background: rgb(var(--color-primary)); /* Sólido */
  color: rgb(var(--color-primary) / 0.5); /* 50% opacidad */
}
```

### **3. Helper withOpacity obligatorio**

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
```

## 📁 Configuración Completa

### **tailwind.config.js - VERSIÓN FINAL**

```javascript
// ✅ CONFIGURACIÓN MAESTRA - TailwindCSS v4 + WebSnack
function withOpacity(variable) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgb(var(${variable}) / ${opacityValue})`;
    }
    return `rgb(var(${variable}))`;
  };
}

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],

  theme: {
    extend: {
      // 🎨 COLORES WEBSNACK BRUTALISTAS
      colors: {
        // Primarios
        primary: withOpacity("--color-primary"),
        secondary: withOpacity("--color-secondary"),
        accent: withOpacity("--color-accent"),

        // Pasteles
        "pastel-blue": withOpacity("--color-pastel-blue"),
        "pastel-green": withOpacity("--color-pastel-green"),
        "pastel-yellow": withOpacity("--color-pastel-yellow"),
        "pastel-pink": withOpacity("--color-pastel-pink"),

        // Estados UI
        success: withOpacity("--color-success"),
        warning: withOpacity("--color-warning"),
        error: withOpacity("--color-error"),
        info: withOpacity("--color-info"),

        // Neutrales
        background: withOpacity("--color-background"),
        foreground: withOpacity("--color-foreground"),
        muted: withOpacity("--color-muted"),
        border: withOpacity("--color-border")
      },

      // 🎯 TIPOGRAFÍA BRUTALISTA
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Monaco", "monospace"],
        brutal: ["Inter", "Arial Black", "sans-serif"] // Para títulos brutales
      },

      // ⚡ ANIMACIONES
      animation: {
        "bounce-brutal": "bounce-brutal 1s ease-in-out infinite",
        shake: "shake 0.5s ease-in-out",
        "gradient-shift": "gradient-shift 3s ease infinite"
      },

      keyframes: {
        "bounce-brutal": {
          "0%, 100%": {
            transform: "translateY(0) rotate(-1deg)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)"
          },
          "50%": {
            transform: "translateY(-25%) rotate(1deg)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)"
          }
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-10px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(10px)" }
        },
        "gradient-shift": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" }
        }
      },

      // 🎨 SOMBRAS BRUTALISTAS
      boxShadow: {
        "brutal-sm": "3px 3px 0px rgb(var(--color-foreground))",
        brutal: "6px 6px 0px rgb(var(--color-foreground))",
        "brutal-lg": "9px 9px 0px rgb(var(--color-foreground))",
        "brutal-xl": "12px 12px 0px rgb(var(--color-foreground))",
        "brutal-primary": "6px 6px 0px rgb(var(--color-primary))",
        "brutal-accent": "6px 6px 0px rgb(var(--color-accent))"
      },

      // 🔲 BORDERS BRUTALISTAS
      borderWidth: {
        3: "3px",
        4: "4px",
        5: "5px"
      },

      // 📏 SPACING ADICIONAL
      spacing: {
        18: "4.5rem",
        88: "22rem"
      }
    }
  },

  plugins: [
    // Plugin personalizado para utilities brutalistas
    function ({ addUtilities }) {
      const newUtilities = {
        // Botones brutalistas
        ".btn-brutal": {
          "@apply inline-flex items-center justify-center font-bold uppercase tracking-wider transition-all duration-200 border-3 border-foreground":
            {},
          "box-shadow": "6px 6px 0px rgb(var(--color-foreground))",
          "&:hover": {
            transform: "translate(-3px, -3px)",
            "box-shadow": "9px 9px 0px rgb(var(--color-foreground))"
          },
          "&:active": {
            transform: "translate(0px, 0px)",
            "box-shadow": "3px 3px 0px rgb(var(--color-foreground))"
          }
        },

        // Cards brutalistas
        ".card-brutal": {
          "@apply border-4 border-foreground transition-all duration-200": {},
          "box-shadow": "8px 8px 0px rgb(var(--color-foreground))",
          "&:hover": {
            transform: "translate(-4px, -4px)",
            "box-shadow": "12px 12px 0px rgb(var(--color-foreground))"
          }
        },

        // Texto con efecto brutal
        ".text-brutal": {
          "@apply font-black text-4xl md:text-6xl leading-none": {},
          "text-shadow": "3px 3px 0px rgb(var(--color-foreground))"
        },

        // Gradientes de fondo
        ".bg-gradient-primary": {
          background:
            "linear-gradient(135deg, rgb(var(--color-primary)), rgb(var(--color-secondary)))",
          "background-size": "200% 200%"
        },

        ".bg-gradient-pastel": {
          background:
            "linear-gradient(135deg, rgb(var(--color-pastel-blue)), rgb(var(--color-pastel-pink)))",
          "background-size": "200% 200%"
        }
      };

      addUtilities(newUtilities);
    }
  ]
};
```

## 🎨 Estructura CSS Recomendada

### **src/styles/globals.css**

```css
/* ✅ ESTRUCTURA MAESTRA CSS */
@import "tailwindcss";

/* Variables de colores (desde MASTER-COLOR-SYSTEM.md) */
:root {
  --color-primary: 255 102 128;
  --color-secondary: 255 143 102;
  --color-accent: 147 51 234;
  /* ... resto de variables */
}

/* Dark mode */
[data-theme="dark"] {
  --color-background: 15 23 42;
  --color-foreground: 248 250 252;
  /* ... resto de dark mode */
}

/* Estilos base brutalistas */
body {
  @apply font-sans antialiased;
  background: rgb(var(--color-background));
  color: rgb(var(--color-foreground));
}

/* NO usar @apply con clases personalizadas aquí */
/* En su lugar, usar CSS directo + variables */
```

## 🛠️ Patrones de Componentes

### **Botón Brutalista Completo**

```tsx
// components/ui/brutal-button.tsx
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const brutalistButtonVariants = cva(
  "btn-brutal", // Utility class del plugin
  {
    variants: {
      variant: {
        primary: "bg-primary text-background",
        secondary: "bg-secondary text-background",
        accent: "bg-accent text-background",
        outline: "bg-background text-foreground"
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

interface BrutalistButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof brutalistButtonVariants> {}

export const BrutalistButton = React.forwardRef<
  HTMLButtonElement,
  BrutalistButtonProps
>(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      className={cn(brutalistButtonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
```

### **Card Brutalista**

```tsx
<div className="card-brutal bg-background p-6">
  <h3 className="text-brutal text-primary mb-4">¡Título Explosivo!</h3>
  <p className="text-foreground/80 text-lg">
    Contenido con personalidad brutal
  </p>
</div>
```

## ✅ Verificación de Implementación

### **Tests de Compilación**

```bash
# Verificar que TailwindCSS compila sin errores
pnpm build

# Verificar configuración
pnpm dlx tailwindcss --help

# Buscar usos incorrectos de @apply
grep -r "@apply.*btn-\|@apply.*card-" src/
```

### **Utilities Disponibles**

- `btn-brutal` - Botón base brutalista
- `card-brutal` - Card base brutalista
- `text-brutal` - Texto con efecto brutal
- `bg-gradient-primary` - Gradiente primario
- `bg-gradient-pastel` - Gradiente pastel
- `shadow-brutal-*` - Sombras brutalistas
- `border-3`, `border-4`, `border-5` - Bordes gruesos

## 🚫 Anti-patrones a Evitar

```css
/* ❌ NUNCA HACER ESTO */
.custom-button {
  @apply btn-brutal bg-primary; /* ERROR: btn-brutal es clase custom */
}

.my-card {
  @apply card-brutal p-4; /* ERROR: card-brutal es clase custom */
}

/* ✅ EN SU LUGAR */
.custom-button {
  @apply inline-flex items-center justify-center font-bold; /* Utilities básicas */
  background: rgb(var(--color-primary));
  /* CSS directo para lo personalizado */
}
```

---

> **🎯 Esta configuración resuelve TODOS los conflictos de TailwindCSS v4 identificados y establece el patrón único para WebSnack.**
