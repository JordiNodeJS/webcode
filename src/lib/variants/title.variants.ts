<<<<<<< HEAD
import { cva } from "class-variance-authority";

/**
 * Neon Title Variants
 *
 * Títulos con efecto de gradiente neón usando los colores del sistema de diseño
 * Reemplazo type-safe de la clase CSS .neon-cyan-title
 *
 * Características:
 * - Gradientes usando oklch para mejor interpolación de colores
 * - Soporte completo para modo claro/oscuro
 * - Variantes de tamaño responsive
 * - Text clipping para efecto de gradiente en texto
 */
export const neonTitleVariants = cva(
  // Base: estilos comunes a todos los títulos neón
  [
    "relative inline-block text-center font-bold leading-tight",
    "bg-clip-text text-transparent",
    // Mejoras de renderizado para evitar recortes
    "text-rendering-optimizeLegibility",
    "-webkit-font-smoothing-antialiased",
    "-moz-osx-font-smoothing-grayscale"
  ],
  {
    variants: {
      size: {
        small: "text-3xl md:text-4xl",
        default: "text-4xl md:text-5xl lg:text-6xl",
        large: "text-5xl md:text-6xl lg:text-7xl"
      },
      gradient: {
        // Gradiente principal: Rosa → Aguamarina
        primary: [
          // Modo claro: colores suaves del tema
          "bg-gradient-to-r from-[oklch(0.703_0.135_328.5)] to-[oklch(0.873_0.058_184.1)]",
          // Modo oscuro: colores brillantes con efecto neón
          "dark:from-[oklch(0.84_0.16_328.5)] dark:to-[oklch(0.75_0.18_184.1)]"
        ],
        // Gradiente inverso: Aguamarina → Rosa
        secondary: [
          "bg-gradient-to-r from-[oklch(0.873_0.058_184.1)] to-[oklch(0.703_0.135_328.5)]",
          "dark:from-[oklch(0.75_0.18_184.1)] dark:to-[oklch(0.84_0.16_328.5)]"
        ],
        // Gradiente diagonal para mayor impacto visual
        diagonal: [
          "bg-gradient-to-br from-[oklch(0.703_0.135_328.5)] via-[oklch(0.873_0.058_184.1)] to-[oklch(0.703_0.135_328.5)]",
          "dark:from-[oklch(0.84_0.16_328.5)] dark:via-[oklch(0.75_0.18_184.1)] dark:to-[oklch(0.84_0.16_328.5)]"
        ]
      },
      glow: {
        // Sin brillo adicional (solo gradiente)
        none: "",
        // Brillo suave en modo oscuro
        soft: "dark:drop-shadow-[0_0_8px_rgba(11,244,243,0.3)]",
        // Brillo intenso en modo oscuro
        strong:
          "dark:drop-shadow-[0_0_12px_rgba(11,244,243,0.5)] dark:drop-shadow-[0_0_20px_rgba(11,244,243,0.2)]"
      }
    },
    defaultVariants: {
      size: "default",
      gradient: "primary",
      glow: "none"
    }
  }
);
=======
import { cva } from "class-variance-authority";

/**
 * Neon Title Variants
 *
 * Títulos con efecto de gradiente neón usando los colores del sistema de diseño
 * Reemplazo type-safe de la clase CSS .neon-cyan-title
 *
 * Características:
 * - Gradientes usando oklch para mejor interpolación de colores
 * - Soporte completo para modo claro/oscuro
 * - Variantes de tamaño responsive
 * - Text clipping para efecto de gradiente en texto
 */
export const neonTitleVariants = cva(
	// Base: estilos comunes a todos los títulos neón
	[
		"relative inline-block text-center font-bold leading-tight",
		"bg-clip-text text-transparent",
		// Mejoras de renderizado para evitar recortes
		"text-rendering-optimizeLegibility",
		"-webkit-font-smoothing-antialiased",
		"-moz-osx-font-smoothing-grayscale",
	],
	{
		variants: {
			size: {
				small: "text-3xl md:text-4xl",
				default: "text-4xl md:text-5xl lg:text-6xl",
				large: "text-5xl md:text-6xl lg:text-7xl",
			},
			gradient: {
				// Gradiente principal: Rosa → Aguamarina
				primary: [
					// Modo claro: colores suaves del tema
					"bg-gradient-to-r from-[oklch(0.703_0.135_328.5)] to-[oklch(0.873_0.058_184.1)]",
					// Modo oscuro: colores brillantes con efecto neón
					"dark:from-[oklch(0.84_0.16_328.5)] dark:to-[oklch(0.75_0.18_184.1)]",
				],
				// Gradiente inverso: Aguamarina → Rosa
				secondary: [
					"bg-gradient-to-r from-[oklch(0.873_0.058_184.1)] to-[oklch(0.703_0.135_328.5)]",
					"dark:from-[oklch(0.75_0.18_184.1)] dark:to-[oklch(0.84_0.16_328.5)]",
				],
				// Gradiente diagonal para mayor impacto visual
				diagonal: [
					"bg-gradient-to-br from-[oklch(0.703_0.135_328.5)] via-[oklch(0.873_0.058_184.1)] to-[oklch(0.703_0.135_328.5)]",
					"dark:from-[oklch(0.84_0.16_328.5)] dark:via-[oklch(0.75_0.18_184.1)] dark:to-[oklch(0.84_0.16_328.5)]",
				],
			},
			glow: {
				// Sin brillo adicional (solo gradiente)
				none: "",
				// Brillo suave en modo oscuro
				soft: "dark:drop-shadow-[0_0_8px_rgba(11,244,243,0.3)]",
				// Brillo intenso en modo oscuro
				strong: "dark:drop-shadow-[0_0_12px_rgba(11,244,243,0.5)] dark:drop-shadow-[0_0_20px_rgba(11,244,243,0.2)]",
			},
		},
		defaultVariants: {
			size: "default",
			gradient: "primary",
			glow: "none",
		},
	},
);

>>>>>>> origin/main
