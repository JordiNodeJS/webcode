"use client";

/**
 * Componente de tarjeta para categorías del blog
 * Diseño moderno inspirado en las tarjetas de servicios
 */

import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

interface Tag {
  name: string;
  count: number;
}

interface BlogCategoriesCardProps {
  tags: Tag[];
  title?: string;
  delay?: number;
}

export function BlogCategoriesCard({
  tags,
  title = "Categorías",
  delay = 0
}: BlogCategoriesCardProps) {
  // Inicializar con función para evitar warning de React Compiler
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  // IDs estables para evitar problemas de hidratación
  const cardId = title.toLowerCase().replace(/\s+/g, "-");
  const titleId = `categories-title-${cardId}`;
  const descId = `categories-description-${cardId}`;

  // Listener para cambios en las preferencias
  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

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
      data-testid="blog-categories-card"
      role="complementary"
      aria-labelledby={titleId}
      aria-describedby={descId}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/6 via-secondary/6 to-primary/6 dark:from-primary/8 dark:via-primary/12 dark:to-primary/8 opacity-6 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <CardHeader className="relative z-10 pb-2 px-6 pt-6">
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`text-sm font-bold p-1.5 bg-primary/20 dark:bg-primary/20 rounded-lg border border-primary/30 dark:border-primary/40 ${
              prefersReducedMotion
                ? ""
                : "group-hover:scale-110 transition-transform duration-300"
            }`}
          >
            🏷️
          </div>
          <div className="flex-1">
            <CardTitle
              className="neon-cyan-card-title text-lg text-foreground dark:text-foreground group-hover:text-primary transition-colors duration-300"
              id={titleId}
            >
              {title}
            </CardTitle>
            <CardDescription className="text-xs font-semibold text-primary dark:text-primary/95 uppercase tracking-wider mt-0.5">
              FILTROS DEL BLOG
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 space-y-3 px-6 pb-6" id={descId}>
        {/* Tags list */}
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Link
                key={tag.name}
                href={`/blog/tag/${encodeURIComponent(tag.name.toLowerCase())}`}
                className="group/tag relative inline-flex items-center rounded-lg border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 hover:border-primary/40 transition-all duration-200 hover:scale-105"
              >
                <span className="font-semibold">{tag.name}</span>
                <span className="ml-1.5 text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded-md font-bold">
                  {tag.count}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Info adicional */}
        <div className="pt-3 border-t border-border/40 dark:border-border/30">
          <p className="text-xs text-muted-foreground dark:text-muted-foreground/90">
            <span className="font-semibold text-foreground dark:text-foreground">
              Total:
            </span>{" "}
            {tags.length} {tags.length === 1 ? "categoría" : "categorías"}{" "}
            disponibles
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
