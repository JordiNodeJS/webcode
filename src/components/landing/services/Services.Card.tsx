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
      className={`group relative overflow-hidden border-4 border-foreground/20 dark:border-foreground/30 bg-gradient-to-br from-background via-background/95 to-muted/30 dark:from-background dark:via-background/95 dark:to-muted/20 focus-within:ring-4 focus-within:ring-primary focus-within:ring-offset-4 shadow-[6px_6px_0px_0px_rgb(0_0_0_/_15%)] dark:shadow-[6px_6px_0px_0px_rgb(255_255_255_/_10%)] ${
        prefersReducedMotion
          ? "hover:shadow-[8px_8px_0px_0px_rgb(0_0_0_/_20%)] dark:hover:shadow-[8px_8px_0px_0px_rgb(255_255_255_/_15%)]"
          : "hover:shadow-[8px_8px_0px_0px_rgb(0_0_0_/_20%)] dark:hover:shadow-[8px_8px_0px_0px_rgb(255_255_255_/_15%)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
      }`}
      style={{
        animationDelay: prefersReducedMotion ? "0s" : `${delay}s`,
      }}
      data-testid={`service-card-${title.toLowerCase().replace(/\s+/g, "-")}`}
      role="article"
      aria-labelledby={`service-title-${id}`}
      aria-describedby={`service-description-${id}`}
    >
      {/* Brutalist accent border */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-secondary to-accent" />

      <CardHeader className="relative z-10 pb-6 pt-8">
        <div className="flex items-center gap-6 mb-6">
          <div
            className={`text-5xl p-4 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30 dark:from-primary/40 dark:via-secondary/30 dark:to-accent/40 rounded-xl border-2 border-primary/50 dark:border-primary/60 shadow-[3px_3px_0px_0px_rgb(255_102_128_/_30%)] ${
              prefersReducedMotion
                ? ""
                : "group-hover:scale-110 group-hover:shadow-[4px_4px_0px_0px_rgb(255_102_128_/_40%)] transition-all duration-300"
            }`}
          >
            {icon}
          </div>
          <div className="flex-1">
            <CardTitle
              className="text-2xl font-black text-foreground dark:text-foreground group-hover:text-primary transition-colors duration-300 mb-2"
              id={`service-title-${id}`}
            >
              {title}
            </CardTitle>
            <CardDescription className="text-sm font-bold text-secondary dark:text-secondary/90 uppercase tracking-widest mt-1 bg-secondary/10 dark:bg-secondary/20 px-3 py-1 rounded-md inline-block">
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
        <div className="space-y-4">
          {features
            .slice(0, isExpanded ? features.length : 2)
            .map((feature, index) => {
              const [title, description] = feature.split(" — ");
              return (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: Features ordenados por posición, key incluye título único
                  key={`${title}-${index}`}
                  className="group/feature bg-gradient-to-r from-muted/20 to-transparent dark:from-muted/30 dark:to-transparent p-4 rounded-lg border-l-4 border-primary/60"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-sm mt-1 flex-shrink-0 shadow-[2px_2px_0px_0px_rgb(255_102_128_/_30%)] group-hover/feature:scale-125 transition-transform duration-200" />
                    <div className="flex-1">
                      <p className="font-bold text-foreground dark:text-foreground leading-relaxed text-lg mb-2">
                        {title}
                      </p>
                      {description && (
                        <p className="text-muted-foreground dark:text-muted-foreground/95 leading-relaxed text-sm">
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
            className="text-primary dark:text-primary/95 hover:text-primary/80 dark:hover:text-primary/75 text-sm font-bold transition-all duration-200 flex items-center gap-2 bg-primary/10 dark:bg-primary/20 px-4 py-2 rounded-lg border border-primary/30 hover:border-primary/50"
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
        <div className="pt-6 border-t-2 border-accent/30 dark:border-accent/40">
          <p className="text-sm text-muted-foreground dark:text-muted-foreground/90 bg-accent/5 dark:bg-accent/10 p-4 rounded-lg border border-accent/20">
            <span className="font-bold text-accent dark:text-accent text-base block mb-1">
              🎯 PERFECTO PARA:
            </span>
            <span>{target}</span>
          </p>
        </div>
      </CardContent>

      <CardFooter className="relative z-10 pt-8 pb-8">
        <Button
          asChild
          className="w-full bg-gradient-to-r from-primary via-secondary to-accent text-white font-black text-lg py-4 px-6 rounded-lg border-2 border-primary/50 shadow-[4px_4px_0px_0px_rgb(255_102_128_/_30%)] hover:shadow-[6px_6px_0px_0px_rgb(255_102_128_/_40%)] hover:-translate-y-0.5 transition-all duration-300 hover:scale-[1.02]"
          size="lg"
        >
          <Link href={href}>{ctaText}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
