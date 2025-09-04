"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

/**
 * Hook personalizado para manejar el tema oscuro/claro
 * 
 * Este hook maneja la persistencia del tema en localStorage y sincroniza
 * con las preferencias del sistema cuando no hay una preferencia guardada.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  // Obtener el tema del sistema o del localStorage
  useEffect(() => {
    setMounted(true);
    
    // Verificar si hay un tema guardado en localStorage
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      // Si no hay tema guardado, usar el del sistema
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches 
        ? "dark" 
        : "light";
      setTheme(systemTheme);
      document.documentElement.classList.toggle("dark", systemTheme === "dark");
    }
  }, []);

  // Actualizar el tema cuando cambia
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Solo renderizar el tema después de que el componente se monte
  // para evitar hidratación incorrecta
  return { theme, toggleTheme, mounted };
}