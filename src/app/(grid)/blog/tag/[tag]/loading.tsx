/**
 * Loading state para páginas de tags del blog
 * Muestra skeletons mientras carga posts filtrados
 */

import { BlogPageSkeleton } from "@/components/blog/BlogSkeletons";

export default function TagPageLoading() {
  return <BlogPageSkeleton />;
}
