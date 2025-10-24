/**
 * Página de posts filtrados por tag
 * Muestra todos los artículos con un tag específico
 */

import type { Metadata } from "next";
import Link from "next/link";
import { BlogCategoriesCard } from "@/components/blog/BlogCategoriesCard";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { getAllTags, getBlogPostsByTag } from "@/lib/notion";

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

// Generar metadata dinámicamente
export async function generateMetadata({
  params
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  return {
    title: `${decodedTag} | Blog WebCode`,
    description: `Artículos sobre ${decodedTag} en el blog de WebCode`
  };
}

// Generar rutas estáticas para los tags más comunes
export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.slice(0, 10).map((tag) => ({
    tag: encodeURIComponent(tag.name.toLowerCase())
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
          <div className="sticky top-24">
            <BlogCategoriesCard
              tags={allTags.filter(
                (t) => t.name.toLowerCase() !== decodedTag.toLowerCase()
              )}
              title="Otras categorías"
            />
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
              {posts.map((post, index) => (
                <BlogPostCard
                  key={post.id}
                  post={post}
                  priority={index === 0}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
