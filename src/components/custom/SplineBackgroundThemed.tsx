"use client";

/**
 * 🎬 SplineBackgroundThemed - Theme-Aware Spline Scene Loader
 * 
 * Componente que carga automáticamente la escena Spline apropiada
 * según el tema actual (light/dark mode).
 * 
 * Compatible con Next.js 16 y React 19
 * 
 * @example
 * ```tsx
 * <SplineBackgroundThemed
 *   darkScene={SPLINE_SCENES.MAIN}
 *   lightScene={SPLINE_SCENES.LIGHT_MODE}
 *   preset="BACKGROUND_RESPONSIVE"
 *   container="FIXED_FULLSCREEN_INTERACTIVE"
 * />
 * ```
 */

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import type { ComponentProps, ComponentType } from "react";
import type { SplineScenePath } from "@/lib/spline-paths";

type SplineBackgroundProps = Omit<ComponentProps<typeof import("./SplineBackground").SplineBackground>, 'scene'>;
type SplineComponent = ComponentType<ComponentProps<typeof import("./SplineBackground").SplineBackground>>;

interface SplineBackgroundThemedProps extends SplineBackgroundProps {
  /** Escena a usar en dark mode */
  darkScene: SplineScenePath;
  /** Escena a usar en light mode */
  lightScene: SplineScenePath;
}

export function SplineBackgroundThemed({
  darkScene,
  lightScene,
  className,
  ...props
}: SplineBackgroundThemedProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [Component, setComponent] = useState<SplineComponent | null>(null);

  // Determinar escena según tema
  const currentScene = resolvedTheme === "light" ? lightScene : darkScene;
  const isLightMode = resolvedTheme === "light";

  // Evitar hidratación inconsistente
  useEffect(() => {
    setMounted(true);
  }, []);

  // Cargar componente SplineBackground dinámicamente
  useEffect(() => {
    import("./SplineBackground")
      .then((mod) => {
        setComponent(() => mod.SplineBackground);
      })
      .catch((error) => {
        console.warn("⚠️ Spline no disponible:", error);
      });
  }, []);

  if (!mounted || !Component) {
    return null;
  }

  return (
    <>
      {/* Capa 0: Escena Spline base (z-0) */}
      <Component scene={currentScene} {...props} className={className} />
      
      {/* Capa 1: Velo visible solo en modo claro (z-1) */}
      {isLightMode && (
        <div 
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex: 1,
            background: `
              linear-gradient(
                135deg,
                oklch(0.98 0.04 328.5 / 0.65) 0%,
                oklch(0.99 0.03 184.1 / 0.55) 50%,
                oklch(0.985 0.02 328.5 / 0.60) 100%
              )
            `,
            backdropFilter: "blur(2px) brightness(1.15) saturate(0.85)",
            WebkitBackdropFilter: "blur(2px) brightness(1.15) saturate(0.85)"
          }}
          aria-hidden="true"
        />
      )}
    </>
  );
}

export default SplineBackgroundThemed;
