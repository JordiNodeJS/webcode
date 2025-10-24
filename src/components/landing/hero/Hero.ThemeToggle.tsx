"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { Moon, Sun } from "@/lib/icons";

/**
 * Botón para cambiar entre tema oscuro y claro
 *
 * Este componente utiliza el hook useTheme para manejar el estado del tema
 * y proporciona una interfaz visual para alternar entre modos.
 * 
 * Usa clases CSS para mostrar/ocultar iconos según el tema, evitando
 * errores de hidratación al no depender de JavaScript para el renderizado inicial.
 */
export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      className="md:flex items-center justify-center hover:bg-accent transition-colors"
      onClick={() => {
        // Alternar entre light y dark
        const currentTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
        setTheme(currentTheme);
      }}
      aria-label="Toggle theme"
    >
      {/* Mostrar Sol en modo oscuro (para cambiar a claro) */}
      <Sun 
        size={20} 
        className="hidden dark:block" 
        aria-hidden="true" 
      />
      {/* Mostrar Luna en modo claro (para cambiar a oscuro) */}
      <Moon 
        size={20} 
        className="block dark:hidden" 
        aria-hidden="true" 
      />
    </Button>
  );
}
