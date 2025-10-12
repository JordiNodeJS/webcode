/**
 * Componente de tarjeta para artículos del blog
 * Reutilizable en diferentes vistas
 */

import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/notion";

interface BlogPostCardProps {
  post: BlogPost;
  priority?: boolean;
}

export function BlogPostCard({ post, priority = false }: BlogPostCardProps) {
  return (
    <article className="group rounded-lg border bg-card p-6 transition-shadow hover:shadow-lg">
      {post.coverImage && (
        <Link href={`/blog/${post.slug}`} className="block mb-4">
          <div className="overflow-hidden rounded-lg">
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

      <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
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

      <Link href={`/blog/${post.slug}`}>
        <h2 className="mb-3 text-2xl font-bold hover:underline">
          {post.title}
        </h2>
      </Link>

      <p className="mb-4 text-muted-foreground">{post.excerpt}</p>

      {post.tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag.id}
              href={`/blog/tag/${encodeURIComponent(tag.name.toLowerCase())}`}
              className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary hover:bg-primary/20"
            >
              {tag.name}
            </Link>
          ))}
        </div>
      )}

      <Link
        href={`/blog/${post.slug}`}
        className="inline-flex items-center text-primary hover:underline"
      >
        Leer artículo
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
    </article>
  );
}
