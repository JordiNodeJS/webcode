/**
 * Loading state para la página principal del blog
 * Muestra skeletons mientras carga la data desde Notion
 */

import { BlogPageSkeleton } from "@/components/blog/BlogSkeletons";

export default function BlogLoading() {
  return <BlogPageSkeleton />;
}
