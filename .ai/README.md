# WebSnack AI - Reglas de Desarrollo

> **Sistema simplificado y unificado** para el desarrollo de WebSnack  
> **Estado**: ✅ IMPLEMENTADO Y OPTIMIZADO  
> **Última actualización**: 2025-01-21

---

## 📁 ESTRUCTURA SIMPLIFICADA

### **🎯 Archivos Maestros (Nivel Raíz)**

- **[CONFIG.md](./CONFIG.md)** - Configuración central del proyecto
- **[COLORS.md](./COLORS.md)** - Sistema de colores brutalistas unificado
- **[TAILWIND.md](./TAILWIND.md)** - Configuración TailwindCSS v4 definitiva

### **📋 Directorios Organizados**

#### **`/instructions` (3 archivos)**

Instrucciones técnicas específicas para desarrollo:

- **[app-router.instructions.md](./instructions/app-router.instructions.md)** - Patrones Next.js 15 App Router
- **[components.instructions.md](./instructions/components.instructions.md)** - Desarrollo de componentes
- **[typescript.instructions.md](./instructions/typescript.instructions.md)** - Patrones TypeScript estricto

#### **`/prompts` (5 archivos)**

Prompts especializados para LLMs:

- **[arquitectura.prompt.md](./prompts/arquitectura.prompt.md)** - Patrones de arquitectura
- **[herramientas-desarrollo.prompt.md](./prompts/herramientas-desarrollo.prompt.md)** - Herramientas de desarrollo
- **[mcp-tools-nextjs.prompt.md](./prompts/mcp-tools-nextjs.prompt.md)** - MCPs Next.js específicos
- **[shadcn.prompt.md](./prompts/shadcn.prompt.md)** - Componentes shadcn/ui
- **[ui-ux.prompt.md](./prompts/ui-ux.prompt.md)** - Diseño UI/UX brutalista

#### **`/rules` (6 archivos)**

Reglas específicas de desarrollo:

- **[App-Router-APIs.md](./rules/App-Router-APIs.md)** - APIs del App Router
- **[Form-Validation-Progressive.md](./rules/Form-Validation-Progressive.md)** - Validación progresiva
- **[Git-Squash-Tools.md](./rules/Git-Squash-Tools.md)** - Herramientas Git
- **[shadcn-Components.md](./rules/shadcn-Components.md)** - Estándares shadcn/ui
- **[Testing-Development-Tools.md](./rules/Testing-Development-Tools.md)** - Testing y herramientas
- **[UI-UX-Design.md](./rules/UI-UX-Design.md)** - Directrices de diseño

#### **`/support` (4 archivos)**

Archivos de soporte y mejores prácticas:

- **[anti-patterns-to-avoid.md](./support/anti-patterns-to-avoid.md)** - Anti-patrones prohibidos
- **[git-commit-standards.md](./support/git-commit-standards.md)** - Estándares de commits
- **[magicui-animations.md](./support/magicui-animations.md)** - Animaciones Magic UI
- **[performance-optimization.md](./support/performance-optimization.md)** - Optimización de rendimiento

---

## 🚀 **CÓMO USAR ESTE SISTEMA**

### **1. Para Desarrollo General**

1. **Leer**: [CONFIG.md](./CONFIG.md) - Configuración central
2. **Aplicar**: [COLORS.md](./COLORS.md) - Sistema de colores
3. **Configurar**: [TAILWIND.md](./TAILWIND.md) - TailwindCSS v4

### **2. Para Tareas Específicas**

- **Componentes** → `instructions/components.instructions.md`
- **APIs** → `rules/App-Router-APIs.md`
- **Formularios** → `rules/Form-Validation-Progressive.md`
- **Diseño** → `prompts/ui-ux.prompt.md`

### **3. Para LLMs/IA**

- **Consultar prompts** en `/prompts/` según la tarea
- **Referenciar archivos maestros** para contexto completo
- **Seguir reglas** específicas en `/rules/`

---

## ✨ **CARACTERÍSTICAS DEL SISTEMA**

### **🎨 Estilo Unificado: Brutalismo + Pasteles**

- **Colores**: Rosa `#ff6680`, Naranja `#ff8f66`, Púrpura `#9333ea`
- **Tipografía**: Font-weight bold, tracking wide
- **Elementos**: Bordes gruesos, sombras brutales, geometrías marcadas

### **⚙️ Stack Tecnológico**

- **Next.js**: 15.4.0 con App Router exclusivo
- **React**: 19.0.0 con TypeScript 5.7.2 estricto
- **TailwindCSS**: v4.1.12 con variables CSS
- **Componentes**: shadcn/ui + Magic UI
- **Package Manager**: pnpm exclusivo

### **📦 Gestión de Dependencias**

```bash
# Instalación base
pnpm add next@15.4.0 react@19.0.0 react-dom@19.0.0
pnpm add tailwindcss@4.1.12 typescript@5.7.2

# shadcn/ui y Magic UI
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add "https://magicui.design/r/sparkles-text.json"
```

---

## 🎯 **REGLAS FUNDAMENTALES**

### **✅ OBLIGATORIO**

- **Colores**: Usar variables CSS del sistema brutalista
- **Package Manager**: pnpm exclusivo (NUNCA npm/yarn)
- **TypeScript**: Modo estricto, sin tipos `any`
- **Componentes**: shadcn/ui en `src/components/ui/` (NUNCA MODIFICAR)
- **TailwindCSS**: Patrón v4 sin `@apply` en clases custom

### **❌ PROHIBIDO**

- **Colores hardcodeados**: `#264e70`, `#3B82F6`, etc.
- **npm/yarn**: Solo pnpm y pnpm dlx
- **@apply con clases custom**: Causa errores en TailwindCSS v4
- **Modificar shadcn/ui**: Crear custom en `src/components/custom/`
- **Tipos any**: TypeScript estricto obligatorio

---

## 📊 **BENEFICIOS DE LA SIMPLIFICACIÓN**

### **🎯 Estructura Simplificada**

- **De 50+ archivos** → **20 archivos esenciales**
- **Nomenclatura clara**: CONFIG, COLORS, TAILWIND
- **Cero redundancia**: Una sola fuente de verdad por tema
- **Navegación rápida**: Menos carpetas, más claridad

### **⚡ Desarrollo Más Rápido**

- **Menos confusión**: Reglas claras y únicas
- **Referencias directas**: Sin búsqueda en múltiples archivos
- **Sistema coherente**: Sin contradicciones
- **Fácil mantenimiento**: Actualizar un solo lugar

### **🧠 Mejor para LLMs**

- **Contexto concentrado**: Información esencial unificada
- **Prompts específicos**: Tareas claras y directas
- **Reglas consistentes**: Sin interpretaciones ambiguas
- **Menos tokens**: Contenido optimizado

---

## 🔄 **MANTENIMIENTO**

### **Para Actualizar el Sistema**

1. **Modificar archivos maestros**: CONFIG.md, COLORS.md, TAILWIND.md
2. **Actualizar instrucciones específicas** si es necesario
3. **Mantener coherencia** entre todos los archivos
4. **Documentar cambios** con fecha

### **Para Añadir Nuevas Reglas**

1. **Identificar categoría**: ¿Es config, color, tailwind, instrucción, regla o soporte?
2. **Actualizar archivo correspondiente** o crear uno específico
3. **Referenciar en este README** si es relevante
4. \*\*Mantener principio de simplicidad

---

<!-- DEPRECATION NOTICE: El estilo 'brutalista' fue retirado del proyecto. Las referencias a 'brutalismo' en este README están archivadas como referencia histórica y no deben seguirse en nuevas implementaciones. -->

> **🚀 Sistema WebSnack optimizado para desarrollo escalable, coherente y eficiente con estilo brutalista único.**
