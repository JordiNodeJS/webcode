/**
 * Página de detalle de un artículo del blog
 * Muestra el contenido completo del post desde Notion
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";
import { NotionImage } from "@/components/blog/NotionImage";
import {
  getAllPublishedSlugs,
  getBlogPostBySlug,
  getBlogPostsByTag,
} from "@/lib/notion";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Generar metadata dinámicamente
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Artículo no encontrado | WebCode",
    };
  }

  return {
    title: `${post.title} | Blog WebCode`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

// Generar rutas estáticas en build time
export async function generateStaticParams() {
  const slugs = await getAllPublishedSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Revalidar cada 1 hora
export const revalidate = 3600;

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Obtener posts relacionados basados en el primer tag
  const relatedPosts =
    post.tags.length > 0 ? await getBlogPostsByTag(post.tags[0].name, 3) : [];
  const filteredRelatedPosts = relatedPosts.filter((p) => p.id !== post.id);

  return (
    <article className="container mx-auto px-4 py-16">
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
        <span className="text-foreground">{post.title}</span>
      </nav>

      {/* Imagen de portada */}
      {post.coverImage && (
        <div className="mb-8 overflow-hidden rounded-lg">
          <NotionImage
            src={post.coverImage}
            alt={post.title}
            width={1200}
            height={630}
            className="w-full object-cover"
            priority
          />
        </div>
      )}

      {/* Título y metadata */}
      <header className="mb-12">
        <div className="mb-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag.id}
              href={`/blog/tag/${encodeURIComponent(tag.name.toLowerCase())}`}
              className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary hover:bg-primary/20"
            >
              {tag.name}
            </Link>
          ))}
        </div>

        <h1 className="mb-4 text-4xl font-bold md:text-5xl">{post.title}</h1>

        <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-medium text-foreground">{post.author}</span>
          </div>
          <span>•</span>
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
        </div>

        {post.excerpt && (
          <p className="mt-6 text-xl text-muted-foreground">{post.excerpt}</p>
        )}
      </header>

      {/* Contenido del artículo */}
      <MarkdownRenderer content={post.content ?? ""} />

      {/* Posts relacionados */}
      {filteredRelatedPosts.length > 0 && (
        <section className="mt-16 border-t pt-16">
          <h2 className="mb-8 text-3xl font-bold">Artículos relacionados</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredRelatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.id}
                href={`/blog/${relatedPost.slug}`}
                className="group rounded-lg border bg-card p-6 transition-shadow hover:shadow-lg"
              >
                {relatedPost.coverImage && (
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <NotionImage
                      src={relatedPost.coverImage}
                      alt={relatedPost.title}
                      width={400}
                      height={200}
                      className="h-32 w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                )}
                <h3 className="mb-2 text-lg font-semibold group-hover:underline">
                  {relatedPost.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {relatedPost.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Navegación */}
      <div className="mt-16 flex justify-center">
        <Link
          href="/blog"
          className="inline-flex items-center text-primary hover:underline"
        >
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <title>Flecha hacia la izquierda</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver al blog
        </Link>
      </div>
    </article>
  );
}
