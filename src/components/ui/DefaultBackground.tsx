/**
 * DefaultBackground Component
 *
 * Componente que proporciona un fondo base elegante para toda la aplicación
 * usando la paleta de colores WebSnack (rosa-aguamarina) con gradientes suaves.
 * Se usa como respaldo cuando otros fondos no están activos.
 */
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function DefaultBackground() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Durante SSR, mostrar un fondo neutral
    return (
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-50 via-white to-cyan-50" />
    );
  }

  const isDark = resolvedTheme === "dark" || theme === "dark";

  if (isDark) {
    return (
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Patrón sutil de puntos para añadir textura */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]" />
        </div>
      </div>
    );
  }

  // Modo claro: gradiente WebSnack rosa-aguamarina
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-rose-50 via-white to-cyan-50">
      {/* Patrón sutil de ondas para mayor elegancia */}
      <div className="absolute inset-0 opacity-3">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="wave-pattern"
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
          <rect width="100%" height="100%" fill="url(#wave-pattern)" />
        </svg>
      </div>
    </div>
  );
}
