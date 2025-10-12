/**
 * Página principal del Blog
 * Lista todos los artículos publicados obtenidos desde Notion
 */

import type { Metadata } from "next";
import Link from "next/link";
import { getAllTags, getBlogPosts } from "@/lib/notion";
import { NotionImage } from "@/components/blog/NotionImage";

export const metadata: Metadata = {
  title: "Blog | WebCode - Desarrollo Web y Soluciones Digitales",
  description:
    "Artículos y tutoriales sobre desarrollo web, Next.js, React, TypeScript y las últimas tendencias en tecnología.",
  openGraph: {
    title: "Blog | WebCode",
    description:
      "Artículos sobre desarrollo web y soluciones digitales en Barcelona",
    type: "website",
  },
};

// Revalidar cada 1 hora
export const revalidate = 3600;

export default async function BlogPage() {
  const { posts } = await getBlogPosts(20);
  const tags = await getAllTags();

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-5xl font-bold">Blog de WebCode</h1>
        <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
          Artículos, tutoriales y recursos sobre desarrollo web, tecnología y
          soluciones digitales
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Sidebar con Tags */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 rounded-lg border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Categorías</h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag.name}
                  href={`/blog/tag/${encodeURIComponent(tag.name.toLowerCase())}`}
                  className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-sm hover:bg-accent"
                >
                  {tag.name}
                  <span className="ml-1.5 text-xs text-muted-foreground">
                    ({tag.count})
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* Lista de Posts */}
        <main className="lg:col-span-3">
          {posts.length === 0 ? (
            <div className="rounded-lg border bg-card p-12 text-center">
              <p className="text-lg text-muted-foreground">
                No hay artículos publicados aún. ¡Vuelve pronto!
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="group rounded-lg border bg-card p-6 transition-shadow hover:shadow-lg"
                >
                  {post.coverImage && (
                    <div className="mb-4 overflow-hidden rounded-lg">
                      <NotionImage
                        src={post.coverImage}
                        alt={post.title}
                        width={800}
                        height={400}
                        className="h-48 w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
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
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
