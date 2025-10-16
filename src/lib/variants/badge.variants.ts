import { cva } from "class-variance-authority";

/**
 * Badge Variants
 *
 * Badges para tecnologías, ubicación y etiquetas
 */
export const badgeVariants = cva(
  "inline-flex items-center rounded-full text-sm font-medium transition-all duration-200",
  {
    variants: {
      variant: {
        primary: [
          "px-4 py-2",
          "bg-primary/30 text-primary-foreground",
          "shadow-3d-sm ring-1 ring-primary/30"
        ],
        secondary: [
          "px-4 py-2",
          "bg-secondary/30 text-secondary-foreground",
          "shadow-3d-sm ring-1 ring-secondary/30"
        ],
        accent: [
          "px-4 py-2",
          "bg-accent/80 text-accent-foreground",
          "shadow-3d-sm ring-1 ring-accent/30"
        ],
        muted: ["px-3 py-2", "bg-muted text-muted-foreground"],
        outline: [
          "px-3 py-2",
          "border border-border",
          "bg-transparent text-foreground"
        ]
      },
      size: {
        sm: "text-xs px-2 py-1",
        md: "text-sm px-4 py-2",
        lg: "text-base px-6 py-3"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);
