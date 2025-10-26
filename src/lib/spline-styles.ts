/**
 * 🎨 Spline Styles Presets System
 * 
 * Sistema unificado de estilos para componentes Spline con presets predefinidos
 * y opciones de personalización.
 * 
 * @see Tutorial: https://spline.webcode.es/guia-spline/personalizacion
 */

import type { CSSProperties } from "react";

// ============================================================================
// TIPOS DE CONFIGURACIÓN
// ============================================================================

export type SplineContainerPreset =
  | "FIXED_FULLSCREEN"
  | "FIXED_FULLSCREEN_INTERACTIVE"
  | "ABSOLUTE_FULLSCREEN"
  | "RELATIVE_FULLSCREEN"
  | "RELATIVE_BOUNDED";

export type SplinePositionPreset =
  | "CENTER"
  | "TOP_LEFT"
  | "TOP_RIGHT"
  | "BOTTOM_LEFT"
  | "BOTTOM_RIGHT"
  | "RESPONSIVE_RIGHT";

export type SplineSizePreset =
  | "SMALL"
  | "MEDIUM"
  | "LARGE"
  | "EXTRA_LARGE"
  | "FULL";

export type SplineScalePreset =
  | "SMALL"
  | "MEDIUM"
  | "LARGE"
  | "EXTRA_LARGE"
  | "RESPONSIVE";

export type SplinePreset =
  | "BACKGROUND"
  | "BACKGROUND_RESPONSIVE"
  | "BACKGROUND_RESPONSIVE_INTERACTIVE"
  | "HERO"
  | "SIDEBAR"
  | "MODAL";

// ============================================================================
// CONFIGURACIÓN DE CONTAINER
// ============================================================================

export const SPLINE_CONTAINER_STYLES: Record<
  SplineContainerPreset,
  CSSProperties
> = {
  /** Fullscreen fijo, NO interactivo (pointer-events: none) */
  FIXED_FULLSCREEN: {
    position: "fixed",
    inset: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    pointerEvents: "none" // No bloquea interacción con contenido
  },

  /** Fullscreen fijo, INTERACTIVO (pointer-events: auto) */
  FIXED_FULLSCREEN_INTERACTIVE: {
    position: "fixed",
    inset: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    pointerEvents: "auto" // Permite interacción con la escena 3D
  },

  /** Fullscreen absoluto */
  ABSOLUTE_FULLSCREEN: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden"
  },

  /** Fullscreen relativo */
  RELATIVE_FULLSCREEN: {
    position: "relative",
    width: "100%",
    height: "100vh",
    overflow: "hidden"
  },

  /** Contenedor relativo con límites */
  RELATIVE_BOUNDED: {
    position: "relative",
    width: "100%",
    maxWidth: "1200px",
    height: "auto",
    overflow: "hidden"
  }
};

// ============================================================================
// POSICIONAMIENTO
// ============================================================================

export const SPLINE_POSITION_STYLES: Record<
  SplinePositionPreset,
  CSSProperties
> = {
  CENTER: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },

  TOP_LEFT: {
    top: 0,
    left: 0
  },

  TOP_RIGHT: {
    top: 0,
    right: 0
  },

  BOTTOM_LEFT: {
    bottom: 0,
    left: 0
  },

  BOTTOM_RIGHT: {
    bottom: 0,
    right: 0
  },

  /** Desplazamiento responsive hacia la derecha (optimizado para landing pages) */
  RESPONSIVE_RIGHT: {
    top: "-30%",
    right: "clamp(-35%, -8vw, -38%)",
    transform: "translate(clamp(50px, 10vw, 200px), -50px)"
  }
};

// ============================================================================
// TAMAÑO
// ============================================================================

export const SPLINE_SIZE_STYLES: Record<SplineSizePreset, CSSProperties> = {
  SMALL: {
    width: "300px",
    height: "300px"
  },

  MEDIUM: {
    width: "600px",
    height: "600px"
  },

  LARGE: {
    width: "900px",
    height: "900px"
  },

  EXTRA_LARGE: {
    width: "150%",
    height: "150%"
  },

  FULL: {
    width: "100%",
    height: "100%"
  }
};

// ============================================================================
// ESCALA
// ============================================================================

export const SPLINE_SCALE_STYLES: Record<SplineScalePreset, CSSProperties> = {
  SMALL: {
    transform: "scale(0.8)"
  },

  MEDIUM: {
    transform: "scale(1)"
  },

  LARGE: {
    transform: "scale(1.2)"
  },

  EXTRA_LARGE: {
    transform: "scale(1.5)"
  },

  RESPONSIVE: {
    transform: "scale(clamp(0.8, 1.2, 1.5))"
  }
};

// ============================================================================
// PRESETS COMPLETOS
// ============================================================================

export interface SplineStyleConfig {
  container: SplineContainerPreset;
  position?: SplinePositionPreset;
  size?: SplineSizePreset;
  scale?: SplineScalePreset;
  customStyles?: CSSProperties;
}

export const SPLINE_PRESETS: Record<SplinePreset, SplineStyleConfig> = {
  /** Fondo de pantalla completa (NO interactivo) */
  BACKGROUND: {
    container: "FIXED_FULLSCREEN",
    position: "CENTER",
    size: "EXTRA_LARGE",
    scale: "LARGE"
  },

  /** Fondo responsive con desplazamiento hacia derecha (NO interactivo) */
  BACKGROUND_RESPONSIVE: {
    container: "FIXED_FULLSCREEN",
    position: "RESPONSIVE_RIGHT",
    size: "EXTRA_LARGE",
    scale: "LARGE"
  },

  /** Fondo responsive con desplazamiento hacia derecha (INTERACTIVO) */
  BACKGROUND_RESPONSIVE_INTERACTIVE: {
    container: "FIXED_FULLSCREEN_INTERACTIVE",
    position: "RESPONSIVE_RIGHT",
    size: "EXTRA_LARGE",
    scale: "LARGE"
  },

  /** Hero section centrado */
  HERO: {
    container: "RELATIVE_FULLSCREEN",
    position: "CENTER",
    size: "LARGE",
    scale: "MEDIUM"
  },

  /** Sidebar pequeño */
  SIDEBAR: {
    container: "RELATIVE_BOUNDED",
    position: "TOP_RIGHT",
    size: "SMALL",
    scale: "SMALL"
  },

  /** Modal centrado */
  MODAL: {
    container: "ABSOLUTE_FULLSCREEN",
    position: "CENTER",
    size: "MEDIUM",
    scale: "MEDIUM"
  }
};

// ============================================================================
// UTILIDADES
// ============================================================================

/**
 * Combina estilos de preset con overrides personalizados
 */
export function getSplineStyles(
  preset: SplinePreset,
  overrides?: Partial<SplineStyleConfig>
): CSSProperties {
  const config = { ...SPLINE_PRESETS[preset], ...overrides };

  const containerStyles = SPLINE_CONTAINER_STYLES[config.container];
  const positionStyles = config.position
    ? SPLINE_POSITION_STYLES[config.position]
    : {};
  const sizeStyles = config.size ? SPLINE_SIZE_STYLES[config.size] : {};
  const scaleStyles = config.scale ? SPLINE_SCALE_STYLES[config.scale] : {};

  return {
    ...containerStyles,
    ...positionStyles,
    ...sizeStyles,
    ...scaleStyles,
    ...config.customStyles
  };
}

/**
 * Genera clases de Tailwind para z-index según la arquitectura de capas
 */
export function getSplineZIndex(layer: "background" | "overlay" | "content"): string {
  const zIndexMap = {
    background: "z-0",
    overlay: "z-[1]",
    content: "z-10"
  };

  return zIndexMap[layer];
}
