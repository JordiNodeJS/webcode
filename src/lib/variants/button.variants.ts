import { cva } from "class-variance-authority";

/**
 * Button Variants
 *
 * Variantes para botones y CTAs en toda la aplicación
 * Incluye estilos para botones neon, outline, ghost, etc.
 */
export const buttonVariants = cva(
	"inline-flex items-center justify-center font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
	{
		variants: {
			variant: {
				// Botón principal con gradiente
				primary: [
					"bg-gradient-to-r from-primary via-secondary to-primary",
					"text-white",
					"shadow-lg hover:shadow-xl",
					"hover:scale-105",
				],
				// Botón secundario outline
				secondary: [
					"border-2 border-secondary",
					"text-secondary",
					"hover:bg-secondary hover:text-secondary-foreground",
				],
				// Botón con efecto neon (requiere CSS module adicional)
				neon: [
					"relative",
					"border-2 border-primary",
					"text-primary",
					"hover:text-primary-foreground",
					"overflow-hidden",
				],
				// Botón outline simple
				outline: [
					"border-2 border-border",
					"text-foreground",
					"hover:bg-muted",
				],
				// Botón ghost (sin borde)
				ghost: [
					"text-foreground",
					"hover:bg-muted",
				],
				// Botón de enlace
				link: [
					"text-primary",
					"underline-offset-4",
					"hover:underline",
				],
			},
			size: {
				sm: "px-3 py-1.5 text-sm rounded-md",
				md: "px-6 py-3 text-base rounded-lg",
				lg: "px-8 py-4 text-lg rounded-xl",
				icon: "h-10 w-10 rounded-full",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "md",
		},
	},
);

/**
 * Icon Button Variants
 *
 * Botones circulares para iconos sociales, acciones, etc.
 */
export const iconButtonVariants = cva(
	"rounded-full transition-all duration-200 flex items-center justify-center group",
	{
		variants: {
			variant: {
				default: [
					"bg-muted text-muted-foreground",
					"hover:bg-primary hover:text-primary-foreground",
				],
				primary: [
					"bg-primary/10 text-primary",
					"hover:bg-primary hover:text-primary-foreground",
				],
				secondary: [
					"bg-secondary/10 text-secondary",
					"hover:bg-secondary hover:text-secondary-foreground",
				],
			},
			size: {
				sm: "w-8 h-8",
				md: "w-10 h-10",
				lg: "w-12 h-12",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "md",
		},
	},
);

