import { cva } from "class-variance-authority";

/**
 * Service Card Variants
 *
 * Variantes para las tarjetas de servicio en la sección "Soluciones Simples"
 * Proporciona estilos base y variantes reutilizables con type-safety
 */
export const serviceCardVariants = cva(
  // Base: común a todas las variantes
  "group relative overflow-hidden rounded-xl border transition-all duration-500",
  {
    variants: {
      theme: {
        default: [
          "border-border/30 dark:border-border/20",
          "bg-gradient-to-br from-white/95 via-white/90 to-slate-50/95",
          "dark:from-slate-800/95 dark:via-slate-700/90 dark:to-slate-800/85"
        ],
        glass: [
          "border-border/20 dark:border-border/10",
          "bg-white/80 dark:bg-slate-900/80",
          "backdrop-blur-xl"
        ],
        premium: [
          "border-primary/50 dark:border-primary/30",
          "bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5",
          "dark:from-primary/10 dark:via-secondary/10 dark:to-primary/10"
        ]
      },
      interactive: {
        true: "hover:shadow-2xl hover:-translate-y-2 focus-within:ring-4 focus-within:ring-primary focus-within:ring-offset-4",
        false: "hover:shadow-lg"
      }
    },
    defaultVariants: {
      theme: "default",
      interactive: true
    }
  }
);

/**
 * Service Card Glow Effect Variants
 *
 * Efecto de brillo que aparece al hacer hover sobre las tarjetas de servicio
 */
export const serviceCardGlowVariants = cva(
  "absolute inset-0 pointer-events-none transition-opacity duration-500",
  {
    variants: {
      theme: {
        default: [
          "bg-gradient-to-r from-primary/6 via-secondary/6 to-primary/6",
          "dark:from-primary/8 dark:via-primary/12 dark:to-primary/8"
        ],
        premium: [
          "bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10",
          "dark:from-primary/15 dark:via-secondary/15 dark:to-accent/15"
        ],
        subtle: [
          "bg-gradient-to-r from-primary/3 via-secondary/3 to-primary/3",
          "dark:from-primary/5 dark:via-primary/8 dark:to-primary/5"
        ]
      },
      visible: {
        true: "opacity-100",
        false: "opacity-0 group-hover:opacity-100"
      }
    },
    defaultVariants: {
      theme: "default",
      visible: false
    }
  }
);
