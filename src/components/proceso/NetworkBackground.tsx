"use client";

import { useTheme } from "next-themes";
import { useId, useEffect, useState } from "react";
import { Particles } from "@/components/magicui/particles";

/**
 * NetworkBackground - Fondo animado de partículas con soporte para tema
 *
 * Usa colores del tema WebCode que contrastan bien en ambos modos:
 * - Dark: blanco (#ffffff) sobre fondo oscuro
 * - Light: rosa primary (#dc7cb3) sobre fondo claro con gradientes
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
  useEffect(() => {
    setMounted(true);
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
  // Dark: blanco sobre fondo oscuro
  // Light: rosa primary (#dc7cb3) que se ve bien sobre el gradiente rosado/aguamarina
  const color = resolvedTheme === "dark" ? "#ffffff" : "#dc7cb3";

  return (
    <Particles
      key={`${id}-${resolvedTheme}`}
      className="absolute inset-0 opacity-40 blur-[1px]"
      quantity={80}
      ease={80}
      color={color}
      refresh
    />
  );
}
