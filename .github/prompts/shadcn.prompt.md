# Prompt: shadcn/ui v4 MCP - WebSnack

## **Contexto y Objetivo**

Prompt especializado para el uso del MCP de shadcn/ui v4 en el proyecto WebSnack, optimizado para integración con **Next.js 15 + Tailwind CSS v4 + TypeScript estricto** y producción de componentes listos para usar.

## **Alcance**

- Recuperación y adaptación de componentes shadcn/ui v4
- Integración con arquitectura Next.js 15 App Router
- Adaptación a sistema de diseño WebSnack
- Generación de artefactos reutilizables

---

## **REGLAS FUNDAMENTALES**

### **Estándares Técnicos**

- **Respuestas en español** - Mantener consistencia del proyecto
- **Respuestas concisas** orientadas a artefactos reutilizables
- **TypeScript estricto** - Evitar `any`, usar interfaces completas
- **Alias de imports** - Usar `@/...` en lugar de imports relativos largos

### **Sistema de Colores y Estilos**

- **No colores hardcodeados** - Usar variables CSS del tema: `rgb(var(--color-primary))`
- **Clases combinables** - Añadir `className?: string` y usar `cn()` helper
- **Tailwind CSS v4** - Utilizar utilidades más recientes

### **Integración con Next.js 15**

- **Server Components por defecto** - Solo 'use client' cuando sea necesario
- **App Router** - Estructura compatible con `src/app/`
- **Directivas de hidratación** - Para componentes interactivos cuando aplique

---

## **FLUJO DE TRABAJO MCP**

### **Secuencia Recomendada de Llamadas**

1. **`mcp_shadcn_list_components()`** - Listar y elegir componentes candidatos
2. **`mcp_shadcn_get_component_metadata(componentName)`** - Obtener props, variantes y notas
3. **`mcp_shadcn_get_component(componentName)`** - Obtener código fuente de referencia
4. **`mcp_shadcn_get_component_demo(componentName)`** - (Opcional) Ejemplos de uso
5. **Para bloques complejos**: `mcp_shadcn_get_block(blockName, includeComponents=true)`

### **Ejemplo de Implementación**

```typescript
// src/components/ui/button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

---

## **TRANSFORMACIÓN Y ADAPTACIÓN**

### **Reglas de Adaptación**

- **Mantener API pública** (props) compatible
- **Documentar cambios** si se modifica algo y justificar mejoras
- **Exportar interfaces** para props con valores por defecto
- **Validación de tipos** completa

### **Mejoras Obligatorias**

- **Accesibilidad**: Roles ARIA y estados focus visibles
- **Variables CSS**: Para colores y gradientes del tema WebSnack
- **Utilidades Tailwind v4**: Aprovechar nuevas funcionalidades

---

## **ENTREGABLES POR COMPONENTE**

### **Archivos Generados**

1. **Componente principal**: `src/components/ui/ComponentName.tsx`
2. **Ejemplo de uso**: `src/app/examples/component-demo/page.tsx`
3. **Test mínimo**: `src/__tests__/components/ComponentName.test.ts`
4. **Documentación**: Notas de integración y configuración

### **Ejemplo de Test**

```typescript
// src/__tests__/components/Button.test.ts
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("Button Component", () => {
  it("renders correctly", () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Test Button");
  });

  it("applies variant classes correctly", () => {
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-destructive");
  });
});
```

---

## **Flujo de Trabajo**

### **Proceso de Implementación**

1. **Identificar** componente necesario para WebSnack
2. **Recuperar** con MCPs de shadcn/ui v4
3. **Adaptar** a arquitectura Next.js 15 + TypeScript estricto
4. **Integrar** variables CSS del tema WebSnack
5. **Validar** con tests y ejemplos de uso

### **Criterios de Aceptación**

- ✅ **Type-check** - `pnpm check` debe pasar
- ✅ **Build** - `pnpm build` debe completar sin errores
- ✅ **Tests** - `pnpm test` debe ejecutar el test creado
- ✅ **Accesibilidad** - Cumplir estándares WCAG 2.1 AA
- ✅ **Integración** - Compatible con sistema de diseño WebSnack

---

**Nota**: Este prompt optimiza el uso de shadcn/ui v4 para crear componentes de alta calidad que se integren perfectamente con la arquitectura y estándares del proyecto WebSnack.

- Si las variantes/properties son ambiguas: genera 2-3 opciones y marca la recomendada.

Salida esperada del LLM

- Resumen breve de lo generado.
- Lista de archivos creados/editar con ruta y propósito.
- Fragmentos clave de código (no todo el archivo si es largo).
- Comandos de verificación en bloque para ejecutar localmente.

Notas finales

- Prioriza componentes pequeños y composables.
- No reformatees todo el repo; haz sólo los cambios necesarios.
- Si se requiere más contexto del proyecto, pide acceder a `src/config` o `src/styles/theme.css`.

-- Fin del prompt --
