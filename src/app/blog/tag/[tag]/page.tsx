/**
 * Página de posts filtrados por tag
 * Muestra todos los artículos con un tag específico
 */

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllTags, getBlogPostsByTag } from "@/lib/notion";

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

// Generar metadata dinámicamente
export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  return {
    title: `${decodedTag} | Blog WebCode`,
    description: `Artículos sobre ${decodedTag} en el blog de WebCode`,
  };
}

// Generar rutas estáticas para los tags más comunes
export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.slice(0, 10).map((tag) => ({
    tag: encodeURIComponent(tag.name.toLowerCase()),
  }));
}

// Revalidar cada 1 hora
export const revalidate = 3600;

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  const posts = await getBlogPostsByTag(decodedTag);
  const allTags = await getAllTags();

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          Inicio
        </Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-primary">
          Blog
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{decodedTag}</span>
      </nav>

      {/* Header */}
      <header className="mb-12">
        <h1 className="mb-4 text-4xl font-bold">
          Artículos sobre {decodedTag}
        </h1>
        <p className="text-lg text-muted-foreground">
          {posts.length} {posts.length === 1 ? "artículo" : "artículos"}{" "}
          encontrados
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Sidebar con otros Tags */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 rounded-lg border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Otras categorías</h2>
            <div className="flex flex-wrap gap-2">
              {allTags
                .filter(
                  (t) => t.name.toLowerCase() !== decodedTag.toLowerCase(),
                )
                .map((tag) => (
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
              <p className="mb-4 text-lg text-muted-foreground">
                No hay artículos con este tag aún.
              </p>
              <Link href="/blog" className="text-primary hover:underline">
                Ver todos los artículos
              </Link>
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
                      <Image
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
