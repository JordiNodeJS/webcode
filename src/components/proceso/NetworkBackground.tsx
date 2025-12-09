"use client";

import { useTheme } from "next-themes";
import { useId, useEffect, useState } from "react";
import { Particles } from "@/components/magicui/particles";

/**
 * NetworkBackground - Fondo animado de partículas con soporte para tema
 *
 * Usa colores del tema WebCode que contrastan bien en ambos modos:
 * - Dark: blanco (#ffffff) sobre fondo oscuro con blur suave (opacity 0.4)
 * - Light: aguamarina oscuro (#006b75) sobre fondo claro sin blur (opacity 0.7)
 *
 * El modo claro usa mayor opacidad y sin blur para asegurar visibilidad
 * contra los gradientes rosados y aguamarinas del fondo.
 *
 * Usa useId() de React 19 para IDs estables entre SSR y cliente.
 * El componente espera a que el tema se resuelva antes de renderizar
 * para evitar problemas de hidratación.
 *
 * @see https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
 */
export function NetworkBackground() {
  const { resolvedTheme } = useTheme();
  const id = useId();
  const [mounted, setMounted] = useState(false);

  // Esperar a que el componente se monte para evitar hydration mismatch
  // next-themes no puede resolver el tema hasta después del montaje
  // Usamos setTimeout para evitar setState síncrono en effect
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Durante SSR y antes de montar, mostrar placeholder
  if (!mounted) {
    return (
      <div
        className="absolute inset-0 opacity-40 blur-[1px]"
        aria-hidden="true"
      />
    );
  }

  // Colores del tema WebCode que contrastan en ambos modos
  // Dark: blanco sobre fondo oscuro con blur suave
  // Light: aguamarina oscuro (#006b75) que contrasta bien sobre el gradiente rosado/aguamarina
  const color = resolvedTheme === "dark" ? "#ffffff" : "#006b75";

  // En modo claro, usamos mayor opacidad y sin blur para mejor visibilidad
  // En modo oscuro, mantenemos el efecto blur suave original
  const particleClassName =
    resolvedTheme === "dark"
      ? "absolute inset-0 opacity-40 blur-[1px]"
      : "absolute inset-0 opacity-70";

  return (
    <Particles
      key={`${id}-${resolvedTheme}`}
      className={particleClassName}
      quantity={80}
      ease={80}
      color={color}
      refresh
    />
  );
}
