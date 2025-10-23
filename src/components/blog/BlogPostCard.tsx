"use client";

/**
 * Componente de tarjeta para artículos del blog
 * Reutilizable en diferentes vistas
 * Diseño moderno inspirado en las tarjetas de servicios
 */

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import type { BlogPost } from "@/lib/notion";

interface BlogPostCardProps {
  post: BlogPost;
  priority?: boolean;
  delay?: number;
}

export function BlogPostCard({
  post,
  priority = false,
  delay = 0
}: BlogPostCardProps) {
  // Inicializar con función para evitar warning de React Compiler
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  // Listener para cambios en las preferencias
  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Generar icono basado en las primeras letras del título
  const generateIcon = (title: string) => {
    const words = title.split(" ");
    if (words.length >= 2) {
      return `${words[0][0]}${words[1][0]}`.toUpperCase();
    }
    return title.slice(0, 2).toUpperCase();
  };

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
      data-testid={`blog-card-${post.slug}`}
      role="article"
      aria-labelledby={`blog-title-${post.slug}`}
      aria-describedby={`blog-description-${post.slug}`}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/6 via-secondary/6 to-primary/6 dark:from-primary/8 dark:via-primary/12 dark:to-primary/8 opacity-6 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <CardHeader className="relative z-10 pb-4">
        <div className="flex items-center gap-4 mb-4">
          <div
            className={`text-2xl font-bold p-3 bg-primary/20 dark:bg-primary/20 rounded-2xl border border-primary/30 dark:border-primary/40 ${
              prefersReducedMotion
                ? ""
                : "group-hover:scale-110 transition-transform duration-300"
            }`}
          >
            {generateIcon(post.title)}
          </div>
          <div className="flex-1">
            <CardTitle
              className="neon-cyan-card-title text-foreground dark:text-foreground group-hover:text-primary transition-colors duration-300"
              id={`blog-title-${post.slug}`}
            >
              {post.title}
            </CardTitle>
            <CardDescription className="text-sm font-semibold text-primary dark:text-primary/95 uppercase tracking-wider mt-1">
              ARTÍCULO DEL BLOG
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent
        className="relative z-10 space-y-4"
        id={`blog-description-${post.slug}`}
      >
        {/* Imagen de portada */}
        {post.coverImage && (
          <Link href={`/blog/${post.slug}`} className="block mb-4">
            <div className="overflow-hidden rounded-xl border-2 border-border/40">
              <Image
                src={post.coverImage}
                alt={post.title}
                width={800}
                height={400}
                className="h-48 w-full object-cover object-center transition-transform group-hover:scale-105"
                priority={priority}
              />
            </div>
          </Link>
        )}

        {/* Metadatos */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground dark:text-muted-foreground/90">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric"
            })}
          </time>
          {post.readTime && (
            <>
              <span>•</span>
              <span>{post.readTime} min de lectura</span>
            </>
          )}
          <span>•</span>
          <span>{post.author}</span>
        </div>

        {/* Resumen del artículo */}
        <div className="space-y-3">
          <p className="text-muted-foreground dark:text-muted-foreground/95 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="pt-4 border-t border-border/40 dark:border-border/30">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/blog/tag/${encodeURIComponent(tag.name.toLowerCase())}`}
                  className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary hover:bg-primary/20 transition-colors duration-200 border border-primary/20"
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="relative z-10 pt-6">
        <Button
          asChild
          className="w-full bg-gradient-to-r from-primary/70 via-secondary/60 to-primary/60 dark:bg-primary dark:hover:bg-primary/85 text-primary-foreground dark:text-primary-foreground font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 dark:hover:shadow-primary/20"
          size="lg"
        >
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center justify-center"
          >
            Leer artículo completo
            <svg
              className="ml-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <title>Flecha hacia la derecha</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
