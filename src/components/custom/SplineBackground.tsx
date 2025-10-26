"use client";

/**
 * 🎬 SplineBackground Component
 * 
 * Componente reutilizable para integrar escenas 3D de Spline en Next.js 16.
 * Sigue las mejores prácticas del tutorial oficial de Spline.
 * 
 * @see Tutorial: https://spline.webcode.es/guia-spline
 * @see Implementación: https://spline.webcode.es/guia-spline/implementacion
 * @see Personalización: https://spline.webcode.es/guia-spline/personalizacion
 * @see Mejores Prácticas: https://spline.webcode.es/guia-spline/mejores-practicas
 * 
 * @example
 * // Uso básico con preset
 * <SplineBackground 
 *   scene={SPLINE_SCENES.KEYBOARD} 
 *   preset="BACKGROUND_RESPONSIVE" 
 * />
 * 
 * @example
 * // Personalización avanzada
 * <SplineBackground 
 *   scene={SPLINE_SCENES.MAIN}
 *   preset="BACKGROUND"
 *   container="FIXED_FULLSCREEN_INTERACTIVE"
 *   position="RESPONSIVE_RIGHT"
 *   customPosition={{ top: '-20%', right: '-30%' }}
 *   onLoad={() => console.log('Escena cargada')}
 * />
 */

import { useState, type CSSProperties } from "react";
import Spline from "@splinetool/react-spline";
import { cn } from "@/lib/utils";
import {
  SPLINE_PRESETS,
  SPLINE_CONTAINER_STYLES,
  SPLINE_POSITION_STYLES,
  SPLINE_SIZE_STYLES,
  SPLINE_SCALE_STYLES,
  getSplineZIndex,
  type SplinePreset,
  type SplineContainerPreset,
  type SplinePositionPreset,
  type SplineSizePreset,
  type SplineScalePreset
} from "@/lib/spline-styles";

// ============================================================================
// TYPES
// ============================================================================

export interface SplineBackgroundProps {
  /** URL de la escena .splinecode (usar SPLINE_SCENES de @/lib/spline-paths) */
  scene: string;

  /** Preset predefinido (BACKGROUND, BACKGROUND_RESPONSIVE, HERO, SIDEBAR, MODAL) */
  preset?: SplinePreset;

  /** Override de container (sobreescribe preset) */
  container?: SplineContainerPreset;

  /** Override de posición (sobreescribe preset) */
  position?: SplinePositionPreset;

  /** Override de tamaño (sobreescribe preset) */
  size?: SplineSizePreset;

  /** Override de escala (sobreescribe preset) */
  scale?: SplineScalePreset;

  /** Posición completamente personalizada (mayor prioridad) */
  customPosition?: CSSProperties;

  /** Estilos CSS adicionales */
  customStyles?: CSSProperties;

  /** Clases CSS adicionales */
  className?: string;

  /** Layer z-index ('background' | 'overlay' | 'content') */
  layer?: "background" | "overlay" | "content";

  /** Callback cuando la escena se carga */
  onLoad?: () => void;

  /** Callback cuando hay un error */
  onError?: (error: Error) => void;

  /** Mostrar loading state */
  showLoading?: boolean;

  /** Mensaje de loading personalizado */
  loadingMessage?: string;

  /** Mostrar error state */
  showError?: boolean;

  /** Reintentos automáticos en caso de error */
  maxRetries?: number;

  /** ARIA label para accesibilidad */
  ariaLabel?: string;
}

// ============================================================================
// COMPONENTE
// ============================================================================

export function SplineBackground({
  scene,
  preset = "BACKGROUND",
  container,
  position,
  size,
  scale,
  customPosition,
  customStyles,
  className,
  layer = "background",
  onLoad,
  onError,
  showLoading = true,
  loadingMessage = "Cargando experiencia 3D...",
  showError = true,
  maxRetries = 3,
  ariaLabel = "Escena 3D interactiva de fondo"
}: SplineBackgroundProps) {
  // ========================================================================
  // STATE
  // ========================================================================

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // ========================================================================
  // HANDLERS
  // ========================================================================

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.();
  };

  const handleError = () => {
    const error = new Error("Error al cargar la escena Spline");
    setHasError(true);
    setIsLoading(false);

    // Reintentar automáticamente
    if (retryCount < maxRetries) {
      setTimeout(() => {
        setRetryCount((prev) => prev + 1);
        setHasError(false);
        setIsLoading(true);
      }, 2000);
    }

    onError?.(error);
  };

  // ========================================================================
  // ESTILOS
  // ========================================================================

  // Obtener estilos del preset
  const presetConfig = SPLINE_PRESETS[preset];

  // Validación: Si el preset no existe, usar fallback
  if (!presetConfig) {
    console.error(`❌ Preset "${preset}" no encontrado en SPLINE_PRESETS.`, {
      preset,
      availablePresets: Object.keys(SPLINE_PRESETS)
    });
    // Fallback a BACKGROUND
    return null;
  }

  // Combinar estilos con overrides
  const containerStyles = container
    ? SPLINE_CONTAINER_STYLES[container]
    : SPLINE_CONTAINER_STYLES[presetConfig.container];

  const positionStyles = position
    ? SPLINE_POSITION_STYLES[position]
    : presetConfig.position
      ? SPLINE_POSITION_STYLES[presetConfig.position]
      : {};

  const sizeStyles = size
    ? SPLINE_SIZE_STYLES[size]
    : presetConfig.size
      ? SPLINE_SIZE_STYLES[presetConfig.size]
      : {};

  const scaleStyles = scale
    ? SPLINE_SCALE_STYLES[scale]
    : presetConfig.scale
      ? SPLINE_SCALE_STYLES[presetConfig.scale]
      : {};

  // Combinar todos los estilos (customPosition tiene mayor prioridad)
  const finalStyles: CSSProperties = {
    ...containerStyles,
    ...positionStyles,
    ...sizeStyles,
    ...scaleStyles,
    ...customStyles,
    ...customPosition
  };

  // Z-index según layer
  const zIndexClass = getSplineZIndex(layer);

  // ========================================================================
  // ERROR STATE - Reintentos agotados: degradación elegante
  // ========================================================================

  // Si falla después de reintentos, simplemente no renderizar nada
  // Esto permite que el fondo con gradiente original se vea
  if (hasError && retryCount >= maxRetries) {
    if (showError) {
      // Opcional: mostrar mensaje discreto en consola
      console.warn("⚠️ Spline scene failed to load after retries, falling back to gradient background");
    }
    // No renderizar nada - degradación elegante
    return null;
  }

  // ========================================================================
  // RENDER
  // ========================================================================

  return (
    <div
      className={cn(zIndexClass, className)}
      style={finalStyles}
      role="img"
      aria-label={ariaLabel}
    >
      {/* Loading State */}
      {isLoading && showLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 z-20">
          <div className="text-center">
            {/* Spinner */}
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
            
            {/* Loading Message */}
            <p className="text-muted-foreground text-sm">
              {loadingMessage}
              {retryCount > 0 && ` (Intento ${retryCount + 1}/${maxRetries + 1})`}
            </p>
          </div>
        </div>
      )}

      {/* Spline Scene */}
      <Spline
        scene={scene}
        onLoad={handleLoad}
        onError={handleError}
        style={{ width: "100%", height: "100%" }}
      />

      {/* Screen Reader Only - Accessibility */}
      <div className="sr-only">
        <p>
          Esta sección contiene una experiencia 3D interactiva creada con
          Spline.
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// EXPORTS
// ============================================================================

export default SplineBackground;
