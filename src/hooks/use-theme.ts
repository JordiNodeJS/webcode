"use client";

import { useTheme as useNextTheme } from "next-themes";
import { useState } from "react";

/**
 * Hook personalizado para manejar el tema oscuro/claro
 *
 * Este hook utiliza next-themes para manejar la persistencia del tema
 * y sincroniza con las preferencias del sistema.
 */
export function useTheme() {
  const { theme, setTheme, systemTheme } = useNextTheme();
  
  // Inicializar mounted con función para hidratación correcta
  // En SSR será false, en cliente será true desde el inicio
  // No necesitamos useLayoutEffect ya que la inicialización lazy lo maneja
  const [mounted] = useState(() => {
    if (typeof window === "undefined") return false;
    return true;
  });

  // Actualizar el tema cuando cambia
  const toggleTheme = () => {
    // Determinar el tema actual real (considerando el tema del sistema)
    const currentTheme = theme === "system" ? systemTheme : theme;
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  // Solo renderizar el tema después de que el componente se monte
  // para evitar hidratación incorrecta
  return { theme, toggleTheme, mounted };
}
