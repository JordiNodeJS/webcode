import { type RefObject, useState } from "react";
import useIsomorphicEffect from "./use-isomorphic-effect";

interface AnimationControlOptions {
  onEnterViewport?: () => void;
  onExitViewport?: () => void;
  threshold?: number;
  rootMargin?: string;
}

/**
 * Hook personalizado para controlar animaciones basado en intersección con el viewport
 * Optimizado para performance y accesibilidad (prefers-reduced-motion)
 */
export function useAnimationControl(
  ref: RefObject<HTMLElement | null>,
  options: AnimationControlOptions = {},
) {
  const {
    onEnterViewport,
    onExitViewport,
    threshold = 0.1,
    rootMargin = "0px",
  } = options;

  const [isVisible, setIsVisible] = useState(false);

  useIsomorphicEffect(() => {
    // En entorno de servidor, retornamos valores por defecto
    if (typeof window === "undefined" || !ref.current) {
      return;
    }

    // Respetar preferencias de accesibilidad
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      // Si el usuario prefiere reducir el movimiento, no ejecutamos animaciones
      return;
    }

    // Verificar si IntersectionObserver está disponible
    if (!("IntersectionObserver" in window)) {
      // Fallback: hacer visible inmediatamente si no hay soporte
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        const nowVisible = entry.isIntersecting;

        setIsVisible(nowVisible);

        // Ejecutar callbacks cuando cambia la visibilidad
        if (!wasVisible && nowVisible && onEnterViewport) {
          onEnterViewport();
        } else if (wasVisible && !nowVisible && onExitViewport) {
          onExitViewport();
        }
      },
      {
        threshold,
        rootMargin,
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    // Limpiar observer al desmontar
    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, onEnterViewport, onExitViewport, isVisible]);

  return { isVisible };
}
