"use client";

import { useTheme as useNextTheme } from "next-themes";

/**
 * Hook personalizado para manejar el tema oscuro/claro
 *
 * Este hook utiliza next-themes para manejar la persistencia del tema
 * y sincroniza con las preferencias del sistema.
 */
export function useTheme() {
  const { theme, setTheme, resolvedTheme } = useNextTheme();

  // Actualizar el tema cuando cambia
  const toggleTheme = () => {
    // Usar resolvedTheme que ya maneja el tema del sistema
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  // next-themes ya maneja la hidratación correctamente
  // resolvedTheme es undefined durante SSR y se resuelve en el cliente
  return { 
    theme, 
    toggleTheme, 
    mounted: resolvedTheme !== undefined 
  };
}
