"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
  href: string;
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
  href,
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
      className={`group relative overflow-hidden border border-border/30 dark:border-border/20 bg-gradient-to-br from-slate-700/95 via-slate-600/90 to-slate-700/85 dark:from-slate-800/95 dark:via-slate-700/90 dark:to-slate-800/85 rounded-xl focus-within:ring-4 focus-within:ring-primary focus-within:ring-offset-4 ${
        prefersReducedMotion
          ? "hover:shadow-2xl"
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
      <div className="absolute inset-0 bg-gradient-to-r from-primary/6 via-secondary/6 to-primary/6 dark:from-primary/8 dark:via-primary/12 dark:to-primary/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <CardHeader className="relative z-10 pb-4 pt-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="text-5xl">{icon}</div>
          <div className="flex-1">
            <CardTitle
              className="text-3xl font-black text-white dark:text-white mb-1"
              id={`service-title-${id}`}
            >
              {title}
            </CardTitle>
            <CardDescription className="text-sm font-bold uppercase tracking-wider text-primary dark:text-primary">
              {subtitle}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent
        className="relative z-10 space-y-6"
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
                  className="flex items-start gap-2"
                >
                  <span className="text-primary font-bold text-lg mt-0.5">✓</span>
                  <div className="flex-1">
                    <p className="font-bold text-white dark:text-white leading-relaxed">
                      {title}
                    </p>
                    {description && (
                      <p className="text-slate-300 dark:text-slate-400 leading-relaxed text-sm mt-1">
                        {description}
                      </p>
                    )}
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
            className="text-primary dark:text-primary hover:text-primary/80 dark:hover:text-primary/80 text-sm font-bold transition-all duration-200 flex items-center gap-2 mt-2"
          >
            {isExpanded
              ? "Ver menos ↑"
              : `Ver más (${features.length - 2} características adicionales) ↓`}
          </button>
        )}

        {/* Target audience */}
        <div className="pt-6 mt-6 border-t border-slate-600/50 dark:border-slate-600/50">
          <p className="text-sm text-slate-400 dark:text-slate-400">
            <span className="font-bold text-white dark:text-white text-base block mb-2">
              Perfecto para:
            </span>
            <span className="text-slate-300 dark:text-slate-400">{target}</span>
          </p>
        </div>
      </CardContent>

      <CardFooter className="relative z-10 pt-6 pb-8">
        <Button
          asChild
          className="w-full bg-gradient-to-r from-primary/70 via-secondary/60 to-primary/50 text-white font-semibold text-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
          size="lg"
        >
          <Link href={href}>{ctaText}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
