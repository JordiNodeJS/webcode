"use client";

import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

/**
 * Hook para detectar cuando un elemento está visible en el viewport
 * usando Intersection Observer API
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>({
  threshold = 0,
  rootMargin = "0px",
  freezeOnceVisible = false,
}: UseIntersectionObserverOptions = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        
        if (!hasIntersected && isElementIntersecting) {
          setHasIntersected(true);
        }

        // Si freezeOnceVisible está activado, solo cambia el estado la primera vez
        if (freezeOnceVisible && hasIntersected) {
          return;
        }

        setIsIntersecting(isElementIntersecting);
      },
      {
        threshold,
        rootMargin,
      }
    );

    // empieza a observar el nodo DOM
    observer.observe(element);

    return () => {
      // deja de observar el nodo DOM
      // evitar memory leaks
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, freezeOnceVisible, hasIntersected]);

  return { ref, isIntersecting, hasIntersected };
}
