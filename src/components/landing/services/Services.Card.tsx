"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
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
  delay
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
      className={`group relative overflow-hidden border border-border/30 dark:border-border/20 bg-gradient-to-br from-white/95 via-white/90 to-slate-50/95 dark:from-slate-800/95 dark:via-slate-700/90 dark:to-slate-800/85 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 ${
        prefersReducedMotion
          ? "hover:shadow-lg"
          : "hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
      }`}
      style={{
        animationDelay: prefersReducedMotion ? "0s" : `${delay}s`
      }}
      data-testid={`service-card-${title.toLowerCase().replace(/\s+/g, "-")}`}
      role="article"
      aria-labelledby={`service-title-${id}`}
      aria-describedby={`service-description-${id}`}
    >
      {/* Glow effect on hover (kept but stronger tint for light mode when not hovered) */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/6 via-secondary/6 to-primary/6 dark:from-primary/8 dark:via-primary/12 dark:to-primary/8 opacity-6 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <CardHeader className="relative z-10 pb-4">
        <div className="flex items-center gap-4 mb-4">
          <div
            className={`text-4xl p-3 bg-primary/20 dark:bg-primary/20 rounded-2xl border border-primary/30 dark:border-primary/40 ${
              prefersReducedMotion
                ? ""
                : "group-hover:scale-110 transition-transform duration-300"
            }`}
          >
            {icon}
          </div>
          <div className="flex-1">
            <CardTitle
              className="neon-cyan-card-title text-foreground dark:text-foreground group-hover:text-primary transition-colors duration-300"
              id={`service-title-${id}`}
            >
              {title}
            </CardTitle>
            <CardDescription className="text-sm font-semibold text-primary dark:text-primary/95 uppercase tracking-wider mt-1">
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
                      <p className="font-semibold text-foreground dark:text-foreground leading-relaxed">
                        {title}
                      </p>
                      {description && (
                        <p className="text-muted-foreground dark:text-muted-foreground/95 leading-relaxed mt-1">
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
            className="text-primary dark:text-primary/95 hover:text-primary/80 dark:hover:text-primary/75 text-sm font-medium transition-colors duration-200 flex items-center gap-1"
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
        <div className="pt-4 border-t border-border/40 dark:border-border/30">
          <p className="text-xs text-muted-foreground dark:text-muted-foreground/90">
            <span className="font-semibold text-foreground dark:text-foreground">
              Perfecto para:
            </span>{" "}
            {target}
          </p>
        </div>
      </CardContent>

      <CardFooter className="relative z-10 pt-6">
        <Button
          className="w-full bg-gradient-to-r from-primary/70 via-secondary/60 to-primary/60 dark:bg-primary dark:hover:bg-primary/85 text-primary-foreground dark:text-primary-foreground font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 dark:hover:shadow-primary/20"
          size="lg"
        >
          {ctaText}
        </Button>
      </CardFooter>
    </Card>
  );
}
