"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

/**
 * Botón para cambiar entre tema oscuro y claro
 *
 * Este componente utiliza el hook useTheme para manejar el estado del tema
 * y proporciona una interfaz visual para alternar entre modos.
 */
export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  // Evitar hidratación incorrecta
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="md:flex items-center justify-center"
        aria-label="Toggle theme"
        disabled
      >
        <Sun size={20} className="hidden dark:block" />
        <Moon size={20} className="block dark:hidden" />
      </Button>
    );
  }

  // Determinar si el tema actual es oscuro
  const isDark = theme === "dark" || 
    (theme === "system" && 
      typeof window !== 'undefined' && 
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <Button
      variant="ghost"
      size="sm"
      className="md:flex items-center justify-center"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun size={20} className="text-foreground" />
      ) : (
        <Moon size={20} className="text-foreground" />
      )}
    </Button>
  );
}