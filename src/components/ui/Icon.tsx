"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type { IconType } from "react-icons";
import { cn } from "@/lib/utils";

const iconVariants = cva(
  "inline-flex items-center justify-center transition-colors",
  {
    variants: {
      size: {
        xs: "h-3 w-3",
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
        xl: "h-8 w-8",
        "2xl": "h-10 w-10",
        "3xl": "h-12 w-12"
      },
      variant: {
        default: "text-current",
        primary: "text-brutal-pink",
        secondary: "text-brutal-orange",
        accent: "text-brutal-purple",
        muted: "text-neutral-500 dark:text-neutral-400",
        destructive: "text-red-600 dark:text-red-400",
        success: "text-green-600 dark:text-green-400"
      }
    },
    defaultVariants: {
      size: "md",
      variant: "default"
    }
  }
);

interface IconProps extends VariantProps<typeof iconVariants> {
  icon: IconType;
  className?: string;
  "aria-label"?: string;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

/**
 * Componente Icon Wrapper para WebCode
 *
 * Sistema unificado para iconos de múltiples familias:
 * - Lucide (lucide-react): UI principal
 * - Heroicons (hi2): Características
 * - Phosphor (ph): Sectores creativos
 * - Font Awesome (fa6): Tecnologías
 * - Feather (fi): Estados
 *
 * @example
 * ```tsx
 * import { Icon } from '@/components/ui/Icon';
 * import { HiOutlineSparkles } from 'react-icons/hi2';
 *
 * <Icon icon={HiOutlineSparkles} size="lg" variant="primary" />
 * ```
 */
export function Icon({
  icon: IconComponent,
  size,
  variant,
  className,
  "aria-label": ariaLabel,
  onClick,
  onKeyDown
}: IconProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick();
    }
    onKeyDown?.(e);
  };

  return (
    <IconComponent
      className={cn(iconVariants({ size, variant }), className)}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
      onClick={onClick}
      onKeyDown={onClick ? handleKeyDown : onKeyDown}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    />
  );
}
