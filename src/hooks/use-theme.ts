"use client";

import { useTheme as useNextTheme } from "next-themes";

/**
 * Hook personalizado para manejar el tema oscuro/claro
 *
 * Este hook utiliza next-themes para manejar la persistencia del tema
 * y sincroniza con las preferencias del sistema.
 */
export function useTheme() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useNextTheme();

  // Actualizar el tema cuando cambia
  const toggleTheme = () => {
    // Determinar el tema actual real (considerando system)
    const currentTheme = theme === "system" ? systemTheme : theme;
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  // next-themes maneja la hidratación correctamente
  // resolvedTheme está disponible después del montaje
  const mounted = resolvedTheme !== undefined;

  return {
    theme,
    setTheme,
    resolvedTheme,
    toggleTheme,
    mounted
  };
}
