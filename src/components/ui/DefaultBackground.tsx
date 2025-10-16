/**
 * DefaultBackground Component
 *
 * Componente que proporciona un fondo base elegante para toda la aplicación
 * usando la paleta de colores WebCode (rosa-aguamarina) con gradientes suaves.
 * Se usa como respaldo cuando otros fondos no están activos.
 *
 * Optimizado para prevenir FOUC (Flash of Unstyled Content) en modo oscuro:
 * - Usa suppressHydrationWarning para evitar errores de hidratación
 * - Renderiza ambos fondos y usa CSS para mostrar el correcto
 * - No espera a que el componente se monte para decidir el tema
 */
"use client";

import { useId } from "react";

export function DefaultBackground() {
  const reactId = useId();

  return (
    <>
      {/* Fondo para modo claro - se oculta automáticamente con dark: */}
      <div
        className="fixed inset-0 -z-10 bg-gradient-to-br from-rose-50 via-white to-cyan-50 dark:hidden"
        suppressHydrationWarning
      >
        {/* Patrón sutil de ondas para mayor elegancia */}
        <div className="absolute inset-0 opacity-3">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            role="img"
            aria-labelledby={`webcode-background-title-light-${reactId}`}
          >
            <title id={`webcode-background-title-light-${reactId}`}>
              Patrón de ondas decorativas
            </title>
            <defs>
              <pattern
                id={`wave-pattern-light-${reactId}`}
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0,10 Q5,5 10,10 T20,10 V20 H0 Z"
                  fill="currentColor"
                  className="text-rose-200"
                />
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill={`url(#wave-pattern-light-${reactId})`}
            />
          </svg>
        </div>
      </div>

      {/* Fondo para modo oscuro - se oculta automáticamente sin dark: */}
      <div
        className="hidden dark:block fixed inset-0 -z-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
        suppressHydrationWarning
      >
        {/* Patrón sutil de puntos para añadir textura */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]" />
        </div>
      </div>
    </>
  );
}
