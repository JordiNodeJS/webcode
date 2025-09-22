"use client";

import { useRouter } from "next/navigation";
import type React from "react";

interface Props {
  fallbackHref?: string;
  className?: string;
}

export function BackButton({ fallbackHref = "/", className = "" }: Props) {
  const router = useRouter();

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Navegación inmediata optimizada para performance
    if (typeof window !== "undefined" && window.history.length > 1) {
      // Usar router.back() para navegación instantánea
      router.back();
    } else {
      // Fallback optimizado con prefetch
      router.prefetch(fallbackHref);
      router.push(fallbackHref);
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      aria-label="Volver"
      className={`inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 ${className}`}
    >
      <span aria-hidden className="text-2xl">
        ←
      </span>
      <span>Volver</span>
    </button>
  );
}
