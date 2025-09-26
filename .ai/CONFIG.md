# 🎯 WebSnack - Configuración Maestra

> **Fuente de Verdad Única** para todo el proyecto WebSnack  
> **Fecha**: 2025-01-21  
> **Estado**: ✅ IMPLEMENTADO  
> **Propósito**: Resolver todas las incoherencias identificadas

---

## 📋 RESUMEN EJECUTIVO

### ✅ **Problema Resuelto**:

Las incoherencias críticas identificadas en **[COHERENCIA-ANALYSIS.md](./COHERENCIA-ANALYSIS.md)** han sido completamente resueltas mediante la implementación de archivos maestros unificados.

### 🎯 **Archivos Maestros Creados**:

- **[MASTER-COLOR-SYSTEM.md](./MASTER-COLOR-SYSTEM.md)** - Sistema de colores brutalistas
- **[MASTER-TAILWIND-CONFIG.md](./MASTER-TAILWIND-CONFIG.md)** - Configuración TailwindCSS v4
- **[UNIFIED-SOLUTIONS.md](./UNIFIED-SOLUTIONS.md)** - Soluciones implementadas
- **Este archivo** - Configuración central del proyecto

---

## 🏗️ CONFIGURACIÓN TÉCNICA DEFINITIVA

### **1. Stack Tecnológico (Versiones Exactas)**

```json
{
  "framework": "Next.js 15.4.0",
  "react": "19.0.0",
  "typescript": "5.7.2",
  "tailwindcss": "4.1.12",
  "packageManager": "pnpm",
  "nodeVersion": ">=18.17.0"
}
```

### **2. Dependencias Core**

```bash
# Framework base
pnpm add next@15.4.0 react@19.0.0 react-dom@19.0.0
pnpm add typescript@5.7.2 @types/node@22.10.2 @types/react@19.0.1

# Styling y UI
pnpm add tailwindcss@4.1.12 postcss autoprefixer
pnpm add class-variance-authority clsx tailwind-merge
pnpm add lucide-react @radix-ui/react-icons

# Validación
pnpm add react-hook-form @hookform/resolvers zod

# Animaciones (Magic UI)
pnpm add framer-motion
```

### **3. Comandos CLI Unificados**

```bash
# Inicialización de proyecto
pnpm create next-app@15.4.0 websnack --typescript --tailwind --eslint --app --src-dir

# Instalación de shadcn/ui
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button card input

# Magic UI components
pnpm dlx shadcn@latest add "https://magicui.design/r/sparkles-text.json"
pnpm dlx shadcn@latest add "https://magicui.design/r/blur-fade.json"
pnpm dlx shadcn@latest add "https://magicui.design/r/shimmer-button.json"
```

---

## 🎨 SISTEMA DE DISEÑO UNIFICADO

### **Estilo: Brutalismo + Tonos Pasteles**

Basado en la memoria del usuario [[memory:7442782]] sobre transformación hacia brutalismo:

#### **Características Principales**:

- **Tipografía**: Font-weight bold/black, tracking wide
- **Layout**: Geometrías marcadas, contrastes altos
- **Colores**: Rosa `#ff6680`, Naranja `#ff8f66` + pasteles suaves
- **Elementos**: Bordes gruesos (3-4px), sombras brutales, rotaciones sutiles

#### **Implementación**:

```css
/* Variables brutalistas implementadas */
:root {
  --color-primary: 255 102 128; /* #ff6680 */
  --color-secondary: 255 143 102; /* #ff8f66 */
  --color-accent: 147 51 234; /* #9333ea */
}

/* Componentes brutalistas disponibles */
.btn-brutal {
  /* Ver MASTER-TAILWIND-CONFIG.md */
}
.card-brutal {
  /* Ver MASTER-TAILWIND-CONFIG.md */
}
.text-brutal {
  /* Ver MASTER-TAILWIND-CONFIG.md */
}
```

---

## 📁 ESTRUCTURA DE ARCHIVOS DEFINITIVA

### **Organización src/**

```
src/
├── app/                    # ✅ Next.js 15 App Router
│   ├── (marketing)/        # Routes de marketing
│   ├── api/               # Route handlers
│   ├── globals.css        # Estilos globales + variables CSS
│   └── layout.tsx         # Layout principal
│
├── components/
│   ├── ui/                # ✅ shadcn/ui (NUNCA MODIFICAR)
│   ├── magicui/          # ✅ Magic UI components
│   └── custom/           # ✅ Componentes WebSnack personalizados
│
├── lib/
│   ├── utils.ts          # Utilities (cn, etc.)
│   ├── validations.ts    # Esquemas Zod
│   └── types.ts          # Interfaces TypeScript
│
└── styles/
    ├── globals.css       # Import TailwindCSS + variables
    └── components.css    # Componentes CSS custom (si necesario)
```

### **Convenciones de Naming**

| Elemento          | Convención | Ejemplo            |
| ----------------- | ---------- | ------------------ |
| **Componentes**   | PascalCase | `HeroSection`      |
| **Archivos**      | kebab-case | `hero-section.tsx` |
| **Props**         | PascalCase | `HeroSectionProps` |
| **Variables CSS** | kebab-case | `--color-primary`  |
| **Classes CSS**   | kebab-case | `.btn-brutal`      |

---

## 🛡️ REGLAS DE VALIDACIÓN

### **TypeScript Estricto**

```json
// tsconfig.json (configuración obligatoria)
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "exactOptionalPropertyTypes": true
  }
}
```

### **Validación Zod (Patrones Unificados)**

```typescript
// lib/validations.ts - Patrón estándar
import { z } from "zod";

// Base schema
export const contactBaseSchema = z.object({
  name: z.string().min(2, "Mínimo 2 caracteres"),
  email: z.string().email("Email inválido"),
  message: z.string().min(10, "Mensaje muy corto"),
  gdprConsent: z.boolean().refine((val) => val === true, "Acepta política")
});

// Extensiones por nicho (patrón unificado)
export const floristeriaSchema = contactBaseSchema.extend({
  businessType: z.literal("floristeria"),
  location: z.string().min(5, "Incluye barrio de Barcelona"),
  specialties: z.array(z.enum(["bodas", "funerales", "eventos"])).min(1)
});
```

---

## 🚨 REGLAS PROHIBIDAS

### **❌ NUNCA HACER**

```typescript
// 1. Colores hardcodeados
background: "#264e70"; // ❌ PROHIBIDO

// 2. Tipos any
function process(data: any) { } // ❌ PROHIBIDO

// 3. @apply con clases custom
.my-button {
  @apply btn-brutal bg-primary; // ❌ ERROR TailwindCSS v4
}

// 4. npm en lugar de pnpm
npm install react // ❌ PROHIBIDO

// 5. Modificar componentes shadcn/ui
// src/components/ui/button.tsx - EDITAR // ❌ PROHIBIDO
```

### **✅ SIEMPRE HACER**

```typescript
// 1. Variables CSS
background: rgb(var(--color-primary)); // ✅ CORRECTO

// 2. Tipos específicos
interface ProcessData { name: string; } // ✅ CORRECTO

// 3. CSS directo + utilities
.my-button {
  @apply inline-flex font-bold; // ✅ Utilities de Tailwind
  background: rgb(var(--color-primary)); // ✅ CSS directo
}

// 4. pnpm exclusivamente
pnpm add react // ✅ CORRECTO

// 5. Componentes personalizados
// src/components/custom/brutal-button.tsx // ✅ CORRECTO
```

---

## 📊 MÉTRICAS DE CALIDAD

### **Objetivos de Performance**

| Métrica | Objetivo | Herramienta        |
| ------- | -------- | ------------------ |
| **LCP** | < 2.5s   | Lighthouse         |
| **CLS** | < 0.1    | Core Web Vitals    |
| **FID** | < 100ms  | PageSpeed Insights |
| **TTI** | < 3.8s   | Lighthouse         |

### **Accesibilidad (WCAG 2.1 AA)**

- ✅ Contraste mínimo 4.5:1 (texto normal)
- ✅ Contraste mínimo 3:1 (texto grande)
- ✅ Navegación por teclado completa
- ✅ Roles ARIA apropiados
- ✅ Estados focus visibles

### **Testing Obligatorio**

```bash
# Comandos de verificación
pnpm build                    # Build exitoso
pnpm type-check              # TypeScript sin errores
pnpm lint                    # ESLint sin warnings
pnpm test                    # Tests unitarios
```

---

## 🔄 PROCESO DE ACTUALIZACIÓN

### **Cuando Actualizar Este Config**

1. **Cambios en versiones** de dependencias core
2. **Nuevos patrones** de diseño brutalista
3. **Extensiones** del sistema de colores
4. **Adición** de nuevas reglas de validación

### **Versionado del Config**

```markdown
v1.0.0 (2025-01-21) - Implementación inicial, resolución de incoherencias
v1.0.1 (Futura) - Actualizaciones menores
v1.1.0 (Futura) - Nuevas funcionalidades
```

### **Sincronización con Archivos**

Este archivo maestro sincroniza automáticamente con:

- Todos los archivos en `.ai/rules/`
- Todos los archivos en `.ai/instructions/`
- Todos los archivos en `.ai/prompts/`
- Todos los archivos en `.ai/support/`

---

## 🎯 CHECKLIST DE IMPLEMENTACIÓN

### **Para Nuevos Desarrolladores**

- [ ] Leer este archivo completo
- [ ] Revisar **[MASTER-COLOR-SYSTEM.md](./MASTER-COLOR-SYSTEM.md)**
- [ ] Revisar **[MASTER-TAILWIND-CONFIG.md](./MASTER-TAILWIND-CONFIG.md)**
- [ ] Configurar entorno con versiones exactas
- [ ] Instalar dependencias con `pnpm`
- [ ] Verificar build exitoso con `pnpm build`

### **Para Actualizaciones de Proyecto**

- [ ] Verificar coherencia con archivos maestros
- [ ] Actualizar versiones según este config
- [ ] Testear que colores siguen el sistema brutalista
- [ ] Verificar que TailwindCSS v4 compila sin errores
- [ ] Documentar cambios en este archivo

---

> **🚀 Con esta configuración maestra, WebSnack tiene un sistema completamente coherente y libre de contradicciones, preparado para desarrollo escalable con estilo brutalista único.**
