# Rule: Componentes shadcn/ui WebSnack

## **Aplica a**: `src/components/**/*.{ts,tsx}`

### **Estándares Técnicos**
- TypeScript estricto - Evitar `any`, usar interfaces completas
- Alias de imports - Usar `@/...` en lugar de imports relativos largos
- No colores hardcodeados - Usar variables CSS del tema
- Clases combinables - Añadir `className?: string` y usar `cn()` helper

### **Integración con Next.js 15**
- Server Components por defecto - Solo 'use client' cuando sea necesario
- App Router - Estructura compatible con `src/app/`
- Directivas de hidratación para componentes interactivos

### **Reglas de Adaptación**
- Mantener API pública (props) compatible
- Documentar cambios si se modifica algo
- Exportar interfaces para props con valores por defecto
- Validación de tipos completa

### **Mejoras Obligatorias**
- Accesibilidad: Roles ARIA y estados focus visibles
- Variables CSS: Para colores y gradientes del tema WebSnack
- Utilidades Tailwind v4: Aprovechar nuevas funcionalidades

### **Ejemplo de Componente**

```typescript
// src/components/ui/button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
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

### **Testing Obligatorio**

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

### **Criterios de Aceptación**
- Type-check: `pnpm check` debe pasar
- Build: `pnpm build` debe completar sin errores
- Tests: `pnpm test` debe ejecutar el test creado
- Accesibilidad: Cumplir estándares WCAG 2.1 AA
- Integración: Compatible con sistema de diseño WebSnack