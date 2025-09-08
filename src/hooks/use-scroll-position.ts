import { useState, useEffect } from "react";
import useIsomorphicEffect from "./use-isomorphic-effect";

interface ScrollPosition {
  x: number;
  y: number;
}

/**
 * Hook personalizado para obtener la posición actual del scroll de forma segura
 * tanto en entornos de servidor como de cliente.
 */
const useScrollPosition = (): ScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({ x: 0, y: 0 });

  useIsomorphicEffect(() => {
    // En entorno de servidor, retornamos la posición inicial
    if (typeof window === "undefined") {
      return;
    }

    const updatePosition = () => {
      setScrollPosition({ x: window.pageXOffset, y: window.pageYOffset });
    };

    // Establecer la posición inicial
    updatePosition();

    // Agregar event listener para actualizar la posición
    window.addEventListener("scroll", updatePosition, { passive: true });

    // Limpiar event listener al desmontar
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return scrollPosition;
};

export default useScrollPosition;