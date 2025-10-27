"use client";

import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
}

/**
 * Hook para detectar cuando un elemento está visible en el viewport
 * usando Intersection Observer API
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>({
  threshold = 0,
  rootMargin = "0px",
}: UseIntersectionObserverOptions = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
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
  }, [threshold, rootMargin]);

  return { ref, isIntersecting };
}
