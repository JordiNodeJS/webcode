import { useState } from "react";
import useIsomorphicEffect from "./use-isomorphic-effect";

interface ScrollPosition {
  x: number;
  y: number;
}

/**
 * Hook personalizado para obtener la posición actual del scroll
 *
 * @returns Un objeto con las coordenadas x e y del scroll
 */
const useScrollPosition = (): ScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0
  });

  useIsomorphicEffect(() => {
    // En entorno de servidor, retornamos valores por defecto
    if (typeof window === "undefined") {
      return;
    }

    let throttleTimeout: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      // Implementar throttling para evitar llamadas excesivas
      if (throttleTimeout === null) {
        throttleTimeout = setTimeout(() => {
          setScrollPosition({
            x: window.scrollX || window.pageXOffset,
            y: window.scrollY || window.pageYOffset
          });
          throttleTimeout = null;
        }, 100); // Actualizar cada 100ms como máximo
      }
    };

    // Agregar event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Establecer posición inicial
    handleScroll();

    // Limpiar event listener al desmontar
    return () => {
      if (throttleTimeout) {
        clearTimeout(throttleTimeout);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollPosition;
};

export default useScrollPosition;
