import { useCallback, useEffect, useRef, useState } from "react";

interface ScrollVisibilityOptions {
  /** Umbral de scroll donde la flecha debe desaparecer completamente (0-1) */
  fadeOutThreshold?: number;
  /** Umbral de scroll donde comienza a desaparecer (0-1) */
  fadeStartThreshold?: number;
  /** Duración de la transición en ms */
  transitionDuration?: number;
  /** Si debe usar prefers-reduced-motion */
  respectReducedMotion?: boolean;
}

interface ScrollVisibilityInternalState {
  /** Opacidad calculada basada en el scroll (0-1) */
  opacity: number;
  /** Si el elemento está visible en el viewport */
  isInViewport: boolean;
  /** Progreso del scroll (0-1) */
  scrollProgress: number;
  /** Si las animaciones están reducidas */
  isReducedMotion: boolean;
}

interface ScrollVisibilityState extends ScrollVisibilityInternalState {
  /** Función ref para conectar el elemento observado */
  setElementRef: (element: HTMLElement | null) => void;
}

/**
 * Hook optimizado para manejar la visibilidad de elementos basada en scroll
 *
 * Características de performance:
 * - Usa Intersection Observer para detectar viewport
 * - Usa RAF (requestAnimationFrame) para scroll suave
 * - Respeta prefers-reduced-motion
 * - Calcula opacidad con CSS custom properties
 * - Evita re-renders innecesarios con useCallback
 */
export function useReversibleScrollVisibility(
  options: ScrollVisibilityOptions = {},
): ScrollVisibilityState {
  const {
    fadeOutThreshold = 0.5, // Desaparece completamente a mitad del scroll
    fadeStartThreshold = 0.2, // Comienza a desaparecer al 20% del scroll
    respectReducedMotion = true,
  } = options;

  const [state, setState] = useState<ScrollVisibilityInternalState>({
    opacity: 0,
    isInViewport: false,
    scrollProgress: 0,
    isReducedMotion: false,
  });

  const elementRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const isObservingRef = useRef(false);

  // Detectar prefers-reduced-motion
  useEffect(() => {
    if (!respectReducedMotion) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setState((prev) => ({ ...prev, isReducedMotion: mediaQuery.matches }));

    const handleChange = (e: MediaQueryListEvent) => {
      setState((prev) => ({ ...prev, isReducedMotion: e.matches }));
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [respectReducedMotion]);

  // Calcular opacidad basada en progreso de scroll
  const calculateOpacity = useCallback(
    (scrollProgress: number): number => {
      if (scrollProgress <= fadeStartThreshold) {
        return 1; // Completamente visible
      }

      if (scrollProgress >= fadeOutThreshold) {
        return 0; // Completamente invisible
      }

      // Interpolación linear entre fadeStartThreshold y fadeOutThreshold
      const range = fadeOutThreshold - fadeStartThreshold;
      const progress = (scrollProgress - fadeStartThreshold) / range;

      // Usar easing suave (ease-out cubic)
      const eased = 1 - progress ** 3;

      return Math.max(0, Math.min(1, eased));
    },
    [fadeStartThreshold, fadeOutThreshold],
  );

  // Handler de scroll optimizado con RAF
  const handleScroll = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Calcular progreso de scroll (0-1)
      const maxScroll = documentHeight - windowHeight;
      const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;

      const newOpacity = calculateOpacity(scrollProgress);

      setState((prev) => ({
        ...prev,
        scrollProgress,
        opacity: newOpacity,
      }));
    });
  }, [calculateOpacity]);

  // Intersection Observer para detectar cuando está en viewport
  useEffect(() => {
    const element = elementRef.current;
    if (!element || isObservingRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const isInViewport = entry.isIntersecting;

        setState((prev) => ({ ...prev, isInViewport }));

        if (isInViewport) {
          // Agregar scroll listener cuando entra al viewport
          window.addEventListener("scroll", handleScroll, { passive: true });
          handleScroll(); // Calcular estado inicial
        } else {
          // Remover scroll listener cuando sale del viewport
          window.removeEventListener("scroll", handleScroll);
          if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
          }
        }
      },
      {
        threshold: 0.1, // Detectar cuando al menos 10% esté visible
        rootMargin: "20px", // Agregar margen para detección temprana
      },
    );

    observer.observe(element);
    isObservingRef.current = true;

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      isObservingRef.current = false;
    };
  }, [handleScroll]);

  // Ref function para conectar el elemento
  const setElementRef = useCallback((element: HTMLElement | null) => {
    elementRef.current = element;
  }, []);

  return {
    ...state,
    setElementRef,
  };
}
