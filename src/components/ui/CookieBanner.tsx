"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { X, Cookie } from "lucide-react";
import { cn } from "@/lib/utils";

interface CookieBannerProps {
  className?: string;
}

export function CookieBanner({ className }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar si el usuario ya aceptó las cookies
  useEffect(() => {
    const checkCookieConsent = () => {
      try {
        const hasConsent = localStorage.getItem("webcode-cookie-consent");
        if (!hasConsent) {
          // Mostrar el banner con un pequeño delay para mejor UX
          setTimeout(() => {
            setIsVisible(true);
            setIsLoading(false);
          }, 1000);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        // Si localStorage no está disponible, mostrar el banner por defecto
        setIsVisible(true);
        setIsLoading(false);
      }
    };

    checkCookieConsent();
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem("webcode-cookie-consent", "accepted");
      localStorage.setItem(
        "webcode-cookie-consent-date",
        new Date().toISOString()
      );
    } catch (error) {
      console.warn("No se pudo guardar la preferencia de cookies:", error);
    }
    setIsVisible(false);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    // Solo guarda que fue cerrado temporalmente, no que fue aceptado
    try {
      sessionStorage.setItem("webcode-cookie-banner-dismissed", "true");
    } catch (error) {
      // Si sessionStorage no está disponible, continuamos sin problema
    }
  };

  // No renderizar nada mientras carga o si no debe ser visible
  if (isLoading || !isVisible) {
    return null;
  }

  return (
    <div
      className={cn(
        // Posicionamiento fijo en la parte inferior
        "fixed bottom-0 left-0 right-0 z-50",
        // Animación de entrada suave
        "animate-in slide-in-from-bottom-full duration-500",
        // Fondo con blur y transparencia
        "backdrop-blur-md",
        className
      )}
      role="banner"
      aria-label="Banner de cookies"
    >
      <div
        className={cn(
          // Fondo siguiendo el sistema de colores del tema - semitransparente
          "bg-background/80 border-t border-border/50",
          // Sombra sutil para elevación
          "shadow-lg"
        )}
      >
        <div className="container mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center justify-between gap-4 md:gap-6">
            {/* Icono y contenido principal */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex-shrink-0">
                <Cookie className="size-5 text-primary" aria-hidden="true" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground/90 leading-relaxed">
                  Utilizamos cookies para mejorar tu experiencia en nuestro
                  sitio web. Al continuar navegando, aceptas nuestra{" "}
                  <Link
                    href="/politica-privacidad"
                    className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
                  >
                    política de privacidad
                  </Link>{" "}
                  y el uso de cookies.
                </p>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                onClick={handleAccept}
                size="sm"
                className="text-xs font-medium whitespace-nowrap"
              >
                Aceptar cookies
              </Button>

              <Button
                onClick={handleDismiss}
                variant="ghost"
                size="icon"
                className="size-8 text-muted-foreground hover:text-foreground"
                aria-label="Cerrar banner de cookies"
              >
                <X className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
