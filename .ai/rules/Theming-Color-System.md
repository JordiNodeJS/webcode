---
trigger: glob
glob: ["**/*.css", "**/*.scss", "src/styles/**/*.css", "tailwind.config.js"]
---

# Sistema de Theming y Colores WebSnack

## 🚨 REGLA CRÍTICA: Sistema de Theming Centralizado

### NUNCA usar colores hardcodeados
- ❌ **Prohibido**: `#264e70`, `rgb(38, 78, 112)`, `rgba(38, 78, 112, 0.5)`
- ❌ **Prohibido**: Estilos inline con colores
- ❌ **Prohibido**: Props de color en componentes sin mapear

### ✅ SIEMPRE usar sistema centralizado
- **Variables CSS**: `rgba(var(--color-primary), 0.8)` en `src/styles/theme.css`
- **Clases del sistema**: Utilidades de Tailwind CSS v4
- **Mapeo automático**: Variables CSS mapeadas en `tailwind.config.js`

## Arquitectura de Colores

```
src/styles/
├── theme.css           # ✅ Variables CSS (fuente de verdad)
├── components.css      # ✅ Gradientes con variables
└── global.css         # ⚠️ Utilidades Tailwind
```

## ✅ Paleta Oficial Unificada (RGB format)

> **⚠️ IMPORTANTE**: Este archivo ahora referencia el **[MASTER-COLOR-SYSTEM.md](../MASTER-COLOR-SYSTEM.md)** como fuente de verdad única.

```css
/* src/styles/theme.css - ACTUALIZADO */
:root {
  /* ✅ COLORES BRUTALISTAS WEBSNACK - UNIFICADOS */
  --color-primary: 255 102 128;     /* #ff6680 - Rosa brutalista principal */
  --color-secondary: 255 143 102;   /* #ff8f66 - Naranja complementario */
  --color-accent: 147 51 234;       /* #9333ea - Púrpura contraste */
  --color-pastel-blue: 147 197 253; /* #93c5fd - Azul pastel */
  --color-pastel-green: 134 239 172; /* #86efac - Verde pastel */
  
  /* Estados y feedback */
  --color-success: 16 185 129;     /* Emerald-500 */
  --color-warning: 245 158 11;     /* Amber-500 */
  --color-error: 239 68 68;        /* Red-500 */
  --color-info: 59 130 246;        /* Blue-500 */
  
  /* Neutrales */
  --color-background: 255 255 255; /* White */
  --color-foreground: 15 23 42;    /* Slate-900 */
  --color-muted: 241 245 249;      /* Slate-100 */
  --color-border: 226 232 240;     /* Slate-200 */
}

/* Dark mode */
[data-theme="dark"] {
  --color-background: 15 23 42;    /* Slate-900 */
  --color-foreground: 248 250 252; /* Slate-50 */
  --color-muted: 30 41 59;         /* Slate-800 */
  --color-border: 51 65 85;        /* Slate-600 */
}
```

## Implementación Correcta

```css
/* [CORRECTO] Color con opacidad */
.component {
  background: rgba(var(--color-primary), 0.2);
  color: rgb(var(--color-foreground));
}

/* [CORRECTO] Gradiente con variables */
.gradient-component {
  background: linear-gradient(
    to right,
    rgba(var(--color-secondary), 1),
    rgba(var(--color-accent), 0.8)
  );
}

/* [CORRECTO] Estados interactivos */
.interactive-component {
  background: rgb(var(--color-primary));
  transition: all 0.2s ease;
}

.interactive-component:hover {
  background: rgba(var(--color-primary), 0.9);
}

.interactive-component:focus {
  outline: 2px solid rgb(var(--color-primary));
  outline-offset: 2px;
}
```

## Configuración Tailwind CSS v4

```javascript
// tailwind.config.js
function withOpacity(variable) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variable}), ${opacityValue})`;
    }
    return `rgb(var(${variable}))`;
  };
}

export default {
  theme: {
    extend: {
      colors: {
        primary: withOpacity("--color-primary"),
        secondary: withOpacity("--color-secondary"),
        accent: withOpacity("--color-accent"),
        success: withOpacity("--color-success"),
        warning: withOpacity("--color-warning"),
        error: withOpacity("--color-error"),
        background: withOpacity("--color-background"),
        foreground: withOpacity("--color-foreground"),
        muted: withOpacity("--color-muted"),
        border: withOpacity("--color-border"),
      },
    },
  },
};
```

## Uso en Componentes

```tsx
// Componente con theming correcto
interface ComponentProps {
  variant?: 'primary' | 'secondary' | 'accent';
  className?: string;
}

export function ThemedComponent({ variant = 'primary', className }: ComponentProps) {
  return (
    <div
      className={cn(
        "px-4 py-2 rounded-lg transition-colors",
        {
          "bg-primary text-white hover:bg-primary/90": variant === 'primary',
          "bg-secondary text-white hover:bg-secondary/90": variant === 'secondary',
          "bg-accent text-white hover:bg-accent/90": variant === 'accent',
        },
        className
      )}
    >
      {/* content */}
    </div>
  );
}
```

## Dark Mode Implementation

```tsx
// Dark mode toggle
'use client';

import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg bg-muted hover:bg-border transition-colors"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
```

## Criterios de Aceptación
- Sistema de variables CSS implementado correctamente
- Dark mode funcional
- Colores hardcodeados eliminados
- Accesibilidad WCAG 2.1 AA cumplida
- Performance sin degradación
- Compatibilidad cross-browser verificada