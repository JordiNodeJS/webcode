"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ServiceCardProps {
  id: number;
  icon: string;
  title: string;
  subtitle: string;
  features: string[];
  target: string;
  ctaText: string;
  delay: number;
}

export function ServiceCard({
  id,
  icon,
  title,
  subtitle,
  features,
  target,
  ctaText,
  delay,
}: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Detectar preferencias de accesibilidad
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <Card
      className={`group relative overflow-hidden border-0 bg-gradient-to-br from-card via-card to-muted/20 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 ${
        prefersReducedMotion
          ? "hover:shadow-lg"
          : "hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
      }`}
      style={{
        animationDelay: prefersReducedMotion ? "0s" : `${delay}s`,
      }}
      data-testid={`service-card-${title.toLowerCase().replace(/\s+/g, "-")}`}
      role="article"
      aria-labelledby={`service-title-${id}`}
      aria-describedby={`service-description-${id}`}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <CardHeader className="relative z-10 pb-4">
        <div className="flex items-center gap-4 mb-4">
          <div
            className={`text-4xl p-3 bg-primary/10 rounded-2xl border border-primary/20 ${
              prefersReducedMotion
                ? ""
                : "group-hover:scale-110 transition-transform duration-300"
            }`}
          >
            {icon}
          </div>
          <div className="flex-1">
            <CardTitle
              className="neon-cyan-card-title text-foreground group-hover:text-primary transition-colors duration-300"
              id={`service-title-${id}`}
            >
              {title}
            </CardTitle>
            <CardDescription className="text-sm font-semibold text-primary uppercase tracking-wider mt-1">
              {subtitle}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent
        className="relative z-10 space-y-4"
        id={`service-description-${id}`}
      >
        {/* Features list - mostrar solo las primeras 2 si no está expandido */}
        <div className="space-y-3">
          {features
            .slice(0, isExpanded ? features.length : 2)
            .map((feature, index) => {
              const [title, description] = feature.split(" — ");
              return (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: Features ordenados por posición, key incluye título único
                  key={`${title}-${index}`}
                  className="group/feature"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0 group-hover/feature:scale-125 transition-transform duration-200" />
                    <div>
                      <p className="font-semibold text-foreground text-sm leading-relaxed">
                        {title}
                      </p>
                      {description && (
                        <p className="text-muted-foreground text-sm leading-relaxed mt-1">
                          {description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Ver más/menos button */}
        {features.length > 2 && (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-200 flex items-center gap-1"
          >
            {isExpanded
              ? "Ver menos"
              : `Ver más (${features.length - 2} características adicionales)`}
            <span
              className={`transform transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
            >
              ↓
            </span>
          </button>
        )}

        {/* Target audience */}
        <div className="pt-4 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">
              Perfecto para:
            </span>{" "}
            {target}
          </p>
        </div>
      </CardContent>

      <CardFooter className="relative z-10 pt-6">
        <Button
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
          size="lg"
        >
          {ctaText}
        </Button>
      </CardFooter>
    </Card>
  );
}
