import { cva } from "class-variance-authority";

/**
 * Container Variants
 *
 * Contenedores y secciones principales de la aplicación
 */
export const containerVariants = cva("w-full", {
  variants: {
    size: {
      sm: "max-w-3xl",
      md: "max-w-5xl",
      lg: "max-w-7xl",
      xl: "max-w-screen-xl",
      full: "max-w-full"
    },
    centered: {
      true: "mx-auto",
      false: ""
    },
    padding: {
      none: "",
      sm: "px-4",
      md: "px-4 sm:px-6",
      lg: "px-4 sm:px-6 lg:px-8"
    }
  },
  defaultVariants: {
    size: "lg",
    centered: true,
    padding: "lg"
  }
});

/**
 * Section Variants
 *
 * Secciones principales de las páginas
 */
export const sectionVariants = cva("w-full", {
  variants: {
    spacing: {
      none: "",
      sm: "py-8",
      md: "py-12",
      lg: "py-16 md:py-20",
      xl: "py-20 md:py-28"
    },
    background: {
      none: "",
      muted: "bg-muted/30",
      gradient: "bg-gradient-webcode"
    }
  },
  defaultVariants: {
    spacing: "lg",
    background: "none"
  }
});
