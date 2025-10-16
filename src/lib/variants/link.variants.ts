<<<<<<< HEAD
import { cva } from "class-variance-authority";

/**
 * Link Variants
 *
 * Variantes para enlaces de navegación, footer, etc.
 */
export const linkVariants = cva("transition-colors duration-200", {
  variants: {
    variant: {
      // Link con hover primary
      default: ["text-muted-foreground", "hover:text-primary"],
      // Link con hover secondary
      secondary: ["text-muted-foreground", "hover:text-secondary"],
      // Link con hover foreground
      foreground: ["text-muted-foreground", "hover:text-foreground"],
      // Link ya en color primary
      primary: ["text-primary", "hover:text-primary/80"],
      // Link de navegación (header)
      nav: ["text-foreground/80", "hover:text-foreground", "font-medium"]
    },
    underline: {
      none: "",
      hover: "hover:underline underline-offset-4",
      always: "underline underline-offset-4"
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg"
    }
  },
  defaultVariants: {
    variant: "default",
    underline: "none",
    size: "md"
  }
});
=======
import { cva } from "class-variance-authority";

/**
 * Link Variants
 *
 * Variantes para enlaces de navegación, footer, etc.
 */
export const linkVariants = cva("transition-colors duration-200", {
	variants: {
		variant: {
			// Link con hover primary
			default: [
				"text-muted-foreground",
				"hover:text-primary",
			],
			// Link con hover secondary
			secondary: [
				"text-muted-foreground",
				"hover:text-secondary",
			],
			// Link con hover foreground
			foreground: [
				"text-muted-foreground",
				"hover:text-foreground",
			],
			// Link ya en color primary
			primary: [
				"text-primary",
				"hover:text-primary/80",
			],
			// Link de navegación (header)
			nav: [
				"text-foreground/80",
				"hover:text-foreground",
				"font-medium",
			],
		},
		underline: {
			none: "",
			hover: "hover:underline underline-offset-4",
			always: "underline underline-offset-4",
		},
		size: {
			sm: "text-sm",
			md: "text-base",
			lg: "text-lg",
		},
	},
	defaultVariants: {
		variant: "default",
		underline: "none",
		size: "md",
	},
});

>>>>>>> origin/main
