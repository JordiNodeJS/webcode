/**
 * Sistema de colores del tema WebCode
 *
 * Col    gradients: {
      hero: {
        from: "rgb(255, 252, 247)", // #fffcf7 - Crema suave
        via: "rgb(244, 251, 252)", // #f4fbfc - Azul muy claro
        to: "rgb(236, 254, 255)", // cyan-50 equivalent
      },
    },traídos del sistema de variables CSS del proyecto
 * para ser utilizados en componentes JavaScript/Canvas que no pueden
 * acceder directamente a las variables CSS.
 */

export interface ThemeColors {
	background: {
		primary: string;
		secondary: string;
		tertiary: string;
	};
	foreground: {
		primary: string;
		secondary: string;
		muted: string;
	};
	accent: {
		primary: string;
		secondary: string;
		border: string;
	};
	gradients: {
		hero: {
			from: string;
			via: string;
			to: string;
		};
	};
}

export const THEME_COLORS = {
	light: {
		background: {
			// Basado en indigo-50, white, cyan-50
			primary: "rgb(238, 242, 255)", // indigo-50 equivalent
			secondary: "rgb(255, 255, 255)", // white
			tertiary: "rgb(236, 254, 255)", // cyan-50 equivalent
		},
		foreground: {
			primary: "rgb(15, 23, 42)", // slate-900
			secondary: "rgb(51, 65, 85)", // slate-700
			muted: "rgb(100, 116, 139)", // slate-500
		},
		accent: {
			// Colores del tema WebCode: rosa principal y aguamarina
			primary: "rgb(220, 124, 179)", // #dc7cb3 - Rosa WebCode
			secondary: "rgb(188, 227, 229)", // #bce3e5 - Aguamarina WebCode
			border: "rgb(203, 213, 225)", // slate-300
		},
		gradients: {
			hero: {
				from: "rgb(238, 242, 255)", // indigo-50
				via: "rgb(255, 255, 255)", // white
				to: "rgb(236, 254, 255)", // cyan-50
			},
		},
	},
	dark: {
		background: {
			// Basado en gray-900 variants
			primary: "rgb(17, 24, 39)", // gray-900
			secondary: "rgb(31, 41, 55)", // gray-800
			tertiary: "rgb(55, 65, 81)", // gray-700
		},
		foreground: {
			primary: "rgb(248, 250, 252)", // slate-50
			secondary: "rgb(226, 232, 240)", // slate-200
			muted: "rgb(148, 163, 184)", // slate-400
		},
		accent: {
			// Colores WebCode para modo oscuro - tonos más sutiles pero manteniendo la paleta
			primary: "rgb(240, 171, 252)", // Rosa más claro para modo oscuro
			secondary: "rgb(165, 243, 252)", // Aguamarina más claro para modo oscuro
			border: "rgb(75, 85, 99)", // gray-600
		},
		gradients: {
			hero: {
				from: "rgb(17, 24, 39)", // gray-900
				via: "rgb(17, 24, 39)", // gray-900
				to: "rgb(17, 24, 39)", // gray-900
			},
		},
	},
} as const satisfies Record<"light" | "dark", ThemeColors>;

/**
 * Obtiene los colores del tema actual
 */
export function getThemeColors(theme: "light" | "dark" = "light"): ThemeColors {
	return THEME_COLORS[theme];
}

/**
 * Convierte un color RGB a valores r, g, b separados
 */
export function parseRgbColor(rgbString: string): {
	r: number;
	g: number;
	b: number;
} {
	const match = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
	if (!match) {
		throw new Error(`Invalid RGB color: ${rgbString}`);
	}
	return {
		r: parseInt(match[1], 10),
		g: parseInt(match[2], 10),
		b: parseInt(match[3], 10),
	};
}

/**
 * Crea un color rgba a partir de rgb y opacity
 */
export function createRgbaColor(rgbString: string, opacity: number): string {
	const { r, g, b } = parseRgbColor(rgbString);
	return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
