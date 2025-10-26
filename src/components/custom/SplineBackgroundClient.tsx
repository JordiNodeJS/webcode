"use client";

/**
 * 🎬 SplineBackground Client Wrapper
 * 
 * Wrapper de Client Component para usar SplineBackground con dynamic import
 * Compatible con Next.js 16 Server Components
 * 
 * Graceful degradation: Si Spline falla al cargar, retorna null para que
 * el fondo con gradiente original se muestre sin problemas.
 */

import { useEffect, useState } from "react";
import type { ComponentProps, ComponentType } from "react";

type SplineBackgroundProps = ComponentProps<typeof import("./SplineBackground").SplineBackground>;
type SplineComponent = ComponentType<SplineBackgroundProps>;

// Cache del componente cargado
let SplineBackgroundInner: SplineComponent | null = null;
let loadFailed = false;

export function SplineBackgroundClient(props: SplineBackgroundProps) {
  const [Component, setComponent] = useState<SplineComponent | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Si ya falló antes, no intentar de nuevo
    if (loadFailed) {
      setHasError(true);
      return;
    }

    // Cargar el componente solo en el cliente
    if (!SplineBackgroundInner) {
      import("./SplineBackground")
        .then((mod) => {
          SplineBackgroundInner = mod.SplineBackground;
          setComponent(() => mod.SplineBackground);
        })
        .catch((error) => {
          console.warn("⚠️ Spline no disponible, usando fondo de respaldo:", error.message || error);
          loadFailed = true;
          setHasError(true);
        });
    } else {
      setComponent(() => SplineBackgroundInner);
    }
  }, []);

  // Si hay error o no está cargado, no renderizar (permite ver fondo original)
  if (hasError || !Component) {
    return null;
  }

  return <Component {...props} />;
}

export default SplineBackgroundClient;
