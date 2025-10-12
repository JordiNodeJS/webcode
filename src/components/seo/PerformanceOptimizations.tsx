"use client";

import { useEffect } from "react";

interface PerformanceOptimizationsProps {
  enablePreload?: boolean;
  enableIntersectionObserver?: boolean;
}

export function PerformanceOptimizations({
  enablePreload = true,
  enableIntersectionObserver = true,
}: PerformanceOptimizationsProps) {
  useEffect(() => {
    if (!enableIntersectionObserver) return;

    // Optimizar imágenes con Intersection Observer
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute("data-src");
              imageObserver.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: "50px 0px",
        threshold: 0.01,
      },
    );

    // Observar todas las imágenes lazy
    const lazyImages = document.querySelectorAll("img[data-src]");
    lazyImages.forEach((img) => {
      imageObserver.observe(img);
    });

    // Preload de recursos críticos
    if (enablePreload) {
      const preloadResources = () => {
        // Preload de fuentes críticas
        const fontPreload = document.createElement("link");
        fontPreload.rel = "preload";
        fontPreload.href = "/_next/static/media/geist-latin.woff2";
        fontPreload.as = "font";
        fontPreload.type = "font/woff2";
        fontPreload.crossOrigin = "anonymous";
        document.head.appendChild(fontPreload);

        // Preload de imágenes críticas del blog
        const criticalImages = document.querySelectorAll("img[priority]");
        criticalImages.forEach((img) => {
          const link = document.createElement("link");
          link.rel = "preload";
          link.href = (img as HTMLImageElement).src;
          link.as = "image";
          document.head.appendChild(link);
        });
      };

      // Ejecutar preload después de que la página esté cargada
      if (document.readyState === "complete") {
        preloadResources();
      } else {
        window.addEventListener("load", preloadResources);
      }
    }

    return () => {
      imageObserver.disconnect();
    };
  }, [enablePreload, enableIntersectionObserver]);

  return null;
}
