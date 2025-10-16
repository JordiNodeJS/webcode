import { cva } from "class-variance-authority";

/**
 * Text Variants
 *
 * Variantes para headings, paragraphs y textos especiales
 */
export const headingVariants = cva("font-bold leading-tight", {
  variants: {
    size: {
      h1: "text-4xl md:text-6xl lg:text-7xl",
      h2: "text-3xl md:text-5xl lg:text-6xl",
      h3: "text-2xl md:text-4xl lg:text-5xl",
      h4: "text-xl md:text-3xl lg:text-4xl",
      h5: "text-lg md:text-2xl lg:text-3xl",
      h6: "text-base md:text-xl lg:text-2xl"
    },
    gradient: {
      none: "text-foreground",
      webcode: "text-gradient-webcode",
      primary: [
        "bg-gradient-to-r from-primary to-secondary",
        "bg-clip-text text-transparent"
      ]
    }
  },
  defaultVariants: {
    size: "h2",
    gradient: "none"
  }
});

/**
 * Paragraph Variants
 */
export const paragraphVariants = cva("leading-relaxed", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base md:text-lg",
      lg: "text-lg md:text-xl lg:text-2xl",
      xl: "text-xl md:text-2xl lg:text-3xl"
    },
    color: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
      secondary: "text-secondary"
    },
    maxWidth: {
      none: "",
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      "2xl": "max-w-2xl",
      "3xl": "max-w-3xl",
      "4xl": "max-w-4xl"
    }
  },
  defaultVariants: {
    size: "md",
    color: "default",
    maxWidth: "none"
  }
});

/**
 * Gradient Text Variants
 *
 * Textos con gradientes específicos del sistema de diseño
 */
export const gradientTextVariants = cva(
  "bg-clip-text text-transparent inline-block",
  {
    variants: {
      gradient: {
        webcode: "text-gradient-webcode",
        primary: "bg-gradient-to-r from-primary to-primary-foreground",
        secondary: "bg-gradient-to-r from-secondary to-secondary-foreground",
        rainbow: "bg-gradient-to-r from-primary via-secondary to-accent"
      },
      bold: {
        true: "font-bold",
        false: ""
      }
    },
    defaultVariants: {
      gradient: "webcode",
      bold: false
    }
  }
);
