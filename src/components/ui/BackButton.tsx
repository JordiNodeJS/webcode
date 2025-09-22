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
    
    // Intentar usar view transitions si están disponibles
    if (typeof document !== "undefined") {
      const doc = document as unknown as {
        startViewTransition?: (cb: () => void) => void;
      };

      if (typeof doc.startViewTransition === "function") {
        try {
          doc.startViewTransition(() => {
            if (typeof window !== "undefined" && window.history.length > 1) {
              router.back();
            } else {
              router.push(fallbackHref);
            }
          });
          return;
        } catch (_err) {
          // Si falla la transición, continuar con navegación normal
        }
      }
    }
    
    // Navegación normal si las transiciones no están disponibles
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button
      onClick={handleBack}
      aria-label="Volver"
      className={`inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary ${className}`}
    >
      <span aria-hidden className="text-2xl">
        ←
      </span>
      <span className="sr-only">Volver</span>
    </button>
  );
}