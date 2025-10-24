/**
 * Componente de tarjeta para artículos del blog
 * Server Component - No requiere JavaScript en el cliente
 *
 * Las animaciones se manejan con CSS puro mediante la clase 'blog-card'
 * y respetan prefers-reduced-motion mediante media queries.
 */

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
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
import { CompactPostMetadata } from "./PostMetadata";
import { TagList } from "./TagList";

interface BlogPostCardProps {
  post: BlogPost;
  priority?: boolean;
}

export function BlogPostCard({ post, priority = false }: BlogPostCardProps) {
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
      className="blog-card group relative overflow-hidden border border-border/30 dark:border-border/20 bg-linear-to-br from-white/95 via-white/90 to-slate-50/95 dark:from-slate-800/95 dark:via-slate-700/90 dark:to-slate-800/85 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
      data-testid={`blog-card-${post.slug}`}
      role="article"
      aria-labelledby={`blog-title-${post.slug}`}
      aria-describedby={`blog-description-${post.slug}`}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-linear-to-r from-primary/6 via-secondary/6 to-primary/6 dark:from-primary/8 dark:via-primary/12 dark:to-primary/8 opacity-6 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <CardHeader className="relative z-10 pb-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="blog-card-icon text-2xl font-bold p-3 bg-primary/20 dark:bg-primary/20 rounded-2xl border border-primary/30 dark:border-primary/40">
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
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
              />
            </div>
          </Link>
        )}

        {/* Metadatos */}
        <CompactPostMetadata
          publishedDate={post.date}
          readTime={post.readTime}
          className="text-muted-foreground dark:text-muted-foreground/90"
        />

        {/* Resumen del artículo */}
        <div className="space-y-3">
          <p className="text-muted-foreground dark:text-muted-foreground/95 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="pt-4 border-t border-border/40 dark:border-border/30">
            <TagList tags={post.tags} size="sm" />
          </div>
        )}
      </CardContent>

      <CardFooter className="relative z-10 pt-6">
        <Button
          asChild
          className="w-full bg-linear-to-r from-primary/70 via-secondary/60 to-primary/60 dark:bg-primary dark:hover:bg-primary/85 text-primary-foreground dark:text-primary-foreground font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 dark:hover:shadow-primary/20"
          size="lg"
        >
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center justify-center gap-2"
          >
            Leer artículo completo
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
