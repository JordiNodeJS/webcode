/**
 * Skeleton components para estados de carga del blog
 * Mejora la perceived performance y reduce CLS
 */

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Skeleton para una tarjeta de post individual
 */
export function BlogPostSkeleton() {
  return (
    <Card className="blog-card overflow-hidden border border-border/30">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4 mb-4">
          {/* Icon skeleton */}
          <Skeleton className="h-14 w-14 rounded-2xl" />

          <div className="flex-1 space-y-2">
            {/* Title skeleton */}
            <Skeleton className="h-6 w-3/4" />
            {/* Subtitle skeleton */}
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Image skeleton */}
        <Skeleton className="h-48 w-full rounded-xl" />

        {/* Metadata skeleton */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Excerpt skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Tags skeleton */}
        <div className="pt-4 border-t border-border/40">
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-6">
        {/* Button skeleton */}
        <Skeleton className="h-12 w-full rounded-xl" />
      </CardFooter>
    </Card>
  );
}

/**
 * Skeleton para el sidebar de categorías
 */
export function BlogCategoriesSkeleton() {
  return (
    <Card className="blog-card overflow-hidden border border-border/30">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3 mb-3">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="space-y-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-full rounded-lg" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Skeleton para la página completa del blog
 */
export function BlogPageSkeleton() {
  return (
    <>
      {/* Hero Section Skeleton */}
      <div className="mb-16 text-center">
        <Skeleton className="h-12 w-64 mx-auto mb-4" />
        <Skeleton className="h-6 w-96 mx-auto" />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Sidebar Skeleton */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <BlogCategoriesSkeleton />
          </div>
        </aside>

        {/* Posts List Skeleton */}
        <div className="lg:col-span-3">
          <div className="space-y-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <BlogPostSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * Skeleton para el detalle de un post
 */
export function PostDetailSkeleton() {
  return (
    <article className="container mx-auto px-4 py-16">
      {/* Breadcrumb Skeleton */}
      <div className="mb-8 flex items-center space-x-2">
        <Skeleton className="h-4 w-12" />
        <span className="text-muted-foreground">/</span>
        <Skeleton className="h-4 w-16" />
        <span className="text-muted-foreground">/</span>
        <Skeleton className="h-4 w-32" />
      </div>

      {/* Cover Image Skeleton */}
      <Skeleton className="mb-8 h-64 w-full rounded-lg" />

      {/* Header Skeleton */}
      <header className="mb-12">
        {/* Tags Skeleton */}
        <div className="mb-4 flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>

        {/* Title Skeleton */}
        <Skeleton className="mb-4 h-12 w-full" />
        <Skeleton className="mb-4 h-12 w-3/4" />

        {/* Metadata Skeleton */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-28" />
        </div>

        {/* Excerpt Skeleton */}
        <div className="mt-6 space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-5/6" />
        </div>
      </header>

      {/* Content Skeleton */}
      <div className="space-y-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        ))}
      </div>

      {/* Related Posts Skeleton */}
      <section className="mt-16 border-t pt-16">
        <Skeleton className="mb-8 h-8 w-48" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-4 rounded-lg border p-6">
              <Skeleton className="h-32 w-full rounded-lg" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </section>

      {/* Back to Blog Skeleton */}
      <div className="mt-16 flex justify-center">
        <Skeleton className="h-6 w-32" />
      </div>
    </article>
  );
}
