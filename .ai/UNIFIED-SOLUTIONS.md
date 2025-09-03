# 🛠️ Soluciones Unificadas - WebSnack Coding Rules

> **Basado en**: Análisis de incoherencias del 2025-01-21  
> **Propósito**: Resolver conflictos críticos con reglas definitivas  
> **Estado**: 🚧 PROPUESTA - Requiere aprobación

## 🎯 SISTEMA UNIFICADO PROPUESTO

### 1. 🎨 **Sistema de Colores Maestro**

Basado en la memoria del usuario sobre "**brutalismo con tonos pasteles**" y colores específicos mencionados:

```css
/* 🎨 WEBSNACK UNIFIED COLOR SYSTEM */
:root {
  /* Colores principales (Brutalismo + Pasteles) */
  --color-primary: 255 102 128;     /* #ff6680 - Rosa brutalista suave */
  --color-secondary: 255 143 102;   /* #ff8f66 - Naranja complementario */
  --color-accent: 147 51 234;       /* #9333ea - Púrpura contraste */
  
  /* Pasteles de soporte */
  --color-pastel-blue: 147 197 253; /* #93c5fd - Azul pastel */
  --color-pastel-green: 134 239 172; /* #86efac - Verde pastel */
  --color-pastel-yellow: 254 240 138; /* #fef08a - Amarillo pastel */
  
  /* Estados de UI */
  --color-success: 34 197 94;       /* #22c55e - Verde éxito */
  --color-warning: 245 158 11;      /* #f59e0b - Ámbar advertencia */
  --color-error: 239 68 68;         /* #ef4444 - Rojo error */
  --color-info: 59 130 246;         /* #3b82f6 - Azul información */
  
  /* Neutrales (tonos suaves para brutalismo) */
  --color-background: 255 255 255;  /* #ffffff - Blanco */
  --color-foreground: 15 23 42;     /* #0f172a - Gris muy oscuro */
  --color-muted: 248 250 252;       /* #f8fafc - Gris muy claro */
  --color-border: 226 232 240;      /* #e2e8f0 - Gris claro */
  
  /* Gradientes brutalistas */
  --gradient-primary: linear-gradient(135deg, rgb(var(--color-primary)), rgb(var(--color-secondary)));
  --gradient-accent: linear-gradient(135deg, rgb(var(--color-accent)), rgb(var(--color-pastel-blue)));
}

/* Dark mode adaptation */
[data-theme="dark"] {
  --color-background: 15 23 42;     /* #0f172a - Gris muy oscuro */
  --color-foreground: 248 250 252;  /* #f8fafc - Gris muy claro */
  --color-muted: 30 41 59;          /* #1e293b - Gris oscuro */
  --color-border: 51 65 85;         /* #334155 - Gris medio */
}
```

### 2. ⚙️ **TailwindCSS v4 Standards Definitivos**

```javascript
// tailwind.config.js - VERSIÓN UNIFICADA
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
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Colores WebSnack unificados
        primary: withOpacity("--color-primary"),
        secondary: withOpacity("--color-secondary"),
        accent: withOpacity("--color-accent"),
        
        // Pasteles
        'pastel-blue': withOpacity("--color-pastel-blue"),
        'pastel-green': withOpacity("--color-pastel-green"),
        'pastel-yellow': withOpacity("--color-pastel-yellow"),
        
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

### 3. 📁 **Estructura de Componentes Definitiva**

```
src/
├── components/
│   ├── ui/                  # ✅ shadcn/ui components (NUNCA MODIFICAR)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── magicui/            # ✅ Magic UI components
│   │   ├── sparkles-text.tsx
│   │   ├── blur-fade.tsx
│   │   └── ...
│   └── custom/             # ✅ Componentes personalizados WebSnack
│       ├── hero-section.tsx
│       ├── service-card.tsx
│       └── ...
```

**Reglas de Naming:**
- **Componentes**: `PascalCase` → `HeroSection`
- **Archivos**: `kebab-case` → `hero-section.tsx`
- **Props Interfaces**: `PascalCase` → `HeroSectionProps`

### 4. 📦 **Versiones Exactas Definitivas**

```json
{
  "dependencies": {
    "next": "15.4.0",
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "typescript": "5.7.2"
  },
  "devDependencies": {
    "tailwindcss": "4.1.12",
    "@types/node": "22.10.2",
    "@types/react": "19.0.1",
    "@types/react-dom": "19.0.1"
  }
}
```

---

## 🔧 PATRONES DE IMPLEMENTACIÓN

### **Componente Unificado Ejemplo**

```tsx
// src/components/custom/brutalist-button.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const brutalistButtonVariants = cva(
  // ✅ Base classes - TailwindCSS v4 compatible
  "inline-flex items-center justify-center font-bold uppercase tracking-wider transition-all duration-200 border-2 shadow-[4px_4px_0px_0px_rgb(var(--color-foreground))] hover:shadow-[2px_2px_0px_0px_rgb(var(--color-foreground))] hover:translate-x-[2px] hover:translate-y-[2px] focus:outline-none focus:ring-4",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white border-foreground focus:ring-primary/30",
        secondary: "bg-secondary text-white border-foreground focus:ring-secondary/30",
        accent: "bg-accent text-white border-foreground focus:ring-accent/30",
        outline: "bg-background text-foreground border-foreground focus:ring-foreground/30",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface BrutalistButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof brutalistButtonVariants> {
  asChild?: boolean;
}

export const BrutalistButton = React.forwardRef<HTMLButtonElement, BrutalistButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(brutalistButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

BrutalistButton.displayName = "BrutalistButton";
```

### **Patrón CSS Unificado**

```css
/* src/styles/globals.css - UNIFIED APPROACH */
@import "tailwindcss";

/* ✅ CORRECTO: Variables CSS directas, NO @apply con clases custom */
.brutalist-card {
  /* Tailwind utilities que funcionan */
  @apply p-6 rounded-none transition-transform duration-200;
  
  /* CSS directo para theming */
  background: rgb(var(--color-background));
  border: 3px solid rgb(var(--color-foreground));
  box-shadow: 8px 8px 0px rgb(var(--color-primary));
  
  /* Estados con variables CSS */
  &:hover {
    transform: translate(-4px, -4px);
    box-shadow: 12px 12px 0px rgb(var(--color-primary));
  }
}

/* ✅ CORRECTO: Gradientes brutalistas */
.brutalist-gradient {
  background: var(--gradient-primary);
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

---

## 📋 CHECKLIST DE IMPLEMENTACIÓN

### **Fase 1: Resolución Crítica**
- [ ] Implementar sistema de colores unificado
- [ ] Actualizar `tailwind.config.js` con patrón único
- [ ] Crear componentes base con estilo brutalista
- [ ] Testear compilación sin errores

### **Fase 2: Actualización de Archivos**
- [ ] Actualizar `.ai/rules/Theming-Color-System.md`
- [ ] Consolidar `.ai/docs/COLOR-SYSTEM-RULES.md`
- [ ] Revisar `.ai/instructions/styling.instructions.md`
- [ ] Unificar `.ai/prompts/tailwind4-theming.prompt.md`

### **Fase 3: Validación**
- [ ] Verificar que no hay referencias a colores antiguos
- [ ] Testear dark mode con nuevos colores
- [ ] Validar accesibilidad (contraste WCAG 2.1 AA)
- [ ] Documenter cambios en changelog

---

## 🚀 COMANDOS DE VERIFICACIÓN

```bash
# Verificar compilación
pnpm build

# Verificar tipos
pnpm type-check

# Buscar referencias a colores antiguos
grep -r "#264e70\|#3B82F6\|#679186" src/
grep -r "--primary\|--secondary" src/ | grep -v "color-primary\|color-secondary"

# Verificar configuración de Tailwind
pnpm dlx tailwindcss --help
```

---

## ⚡ MIGRACIÓN GRADUAL

### **Estrategia de Transición**
1. **Crear nuevas variables** sin romper las existentes
2. **Actualizar componentes uno por uno** con nuevos colores
3. **Testear cada cambio** antes de continuar
4. **Remover variables obsoletas** al final

### **Ejemplo de Migración**
```css
/* ANTES */
.old-component {
  background: #264e70; /* ❌ Hardcoded */
}

/* DURANTE LA MIGRACIÓN */
.old-component {
  background: rgb(var(--color-primary-old, 38 78 112)); /* 🔄 Fallback */
}

/* DESPUÉS */
.new-component {
  background: rgb(var(--color-primary)); /* ✅ Nuevo sistema */
}
```

---

> **Nota**: Esta propuesta resuelve todos los conflictos identificados manteniendo compatibilidad con el estilo brutalista mencionado en la memoria del proyecto [[memory:7442782]].

**Próximo paso**: Revisar y aprobar estas soluciones antes de implementar los cambios.
