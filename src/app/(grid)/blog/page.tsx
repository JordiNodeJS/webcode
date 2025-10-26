/**
 * Página principal del Blog
 * Lista todos los artículos publicados obtenidos desde Notion
 */

import type { Metadata } from "next";
import Link from "next/link";
import { BlogCategoriesCard } from "@/components/blog/BlogCategoriesCard";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { getAllTags, getBlogPosts } from "@/lib/notion";

export const metadata: Metadata = {
  title: "Blog | WebCode - Desarrollo Web y Soluciones Digitales",
  description:
    "Artículos y tutoriales sobre desarrollo web, Next.js, React, TypeScript y las últimas tendencias en tecnología.",
  keywords: [
    "blog desarrollo web",
    "tutoriales programación",
    "Next.js tutoriales",
    "React Barcelona",
    "TypeScript desarrollo",
    "desarrollo web Barcelona",
    "tecnología web",
    "programación web"
  ],
  authors: [{ name: "WEBCODE Team" }],
  creator: "WEBCODE",
  publisher: "WEBCODE",
  category: "Technology",
  alternates: {
    canonical: "https://webcode.es/blog"
  },
  openGraph: {
    title: "Blog | WebCode",
    description:
      "Artículos sobre desarrollo web y soluciones digitales en Barcelona",
    type: "website",
    url: "https://webcode.es/blog",
    siteName: "WEBCODE"
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | WebCode",
    description:
      "Artículos sobre desarrollo web y soluciones digitales en Barcelona",
    creator: "@webcode_es",
    site: "@webcode_es"
  }
};

// Revalidar cada 1 hora
export const revalidate = 3600;

export default async function BlogPage() {
  const { posts } = await getBlogPosts(20);
  const tags = await getAllTags();

  return (
    <>
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-5xl font-bold">Blog de WebCode</h1>
        <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
          Artículos, tutoriales y recursos sobre desarrollo web, tecnología y
          soluciones digitales
        </p>
      </div>

      {/* Tutoriales Section */}
      <div className="mb-16 rounded-lg border bg-linear-to-r from-primary/5 to-secondary/5 p-8 dark:from-primary/10 dark:to-secondary/10">
        <h2 className="mb-4 text-2xl font-bold">📚 Tutoriales Destacados</h2>
        <p className="mb-4 text-muted-foreground">
          Guías prácticas para integrar tecnologías modernas en tus proyectos.
        </p>
        <div className="space-y-3">
          <Link
            href="https://spline.webcode.es"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-lg border bg-card p-4 transition-all hover:border-primary hover:shadow-md"
          >
            <span className="text-2xl">🎨</span>
            <div>
              <h3 className="font-semibold group-hover:text-primary transition-colors">
                Guía Spline: Integra Experiencias 3D en Next.js
              </h3>
              <p className="text-sm text-muted-foreground">
                Aprende a integrar escenas interactivas 3D con Spline en tus
                proyectos Next.js
              </p>
            </div>
            <span className="ml-auto text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              →
            </span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Sidebar con Tags */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <BlogCategoriesCard tags={tags} />
          </div>
        </aside>

        {/* Lista de Posts */}
        <div className="lg:col-span-3">
          {posts.length === 0 ? (
            <div className="rounded-lg border bg-card p-12 text-center">
              <p className="text-lg text-muted-foreground">
                No hay artículos publicados aún. ¡Vuelve pronto!
              </p>
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
        </div>
      </div>
    </>
  );
}
