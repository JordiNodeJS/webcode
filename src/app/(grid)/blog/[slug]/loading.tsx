/**
 * Loading state para el detalle de un post del blog
 * Muestra skeleton mientras carga el contenido desde Notion
 */

import { PostDetailSkeleton } from "@/components/blog/BlogSkeletons";

export default function PostLoading() {
  return <PostDetailSkeleton />;
}
