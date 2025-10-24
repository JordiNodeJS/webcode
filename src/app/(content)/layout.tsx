import type { ReactNode } from "react";
import { ContentLayout } from "@/components/layouts";

/**
 * Layout para el route group (content)
 *
 * Páginas que usan este layout:
 * - /about
 * - /contacto
 * - /servicios
 *
 * Aplica automáticamente:
 * - <article> semántico
 * - pt-24 (spacing para navbar)
 * - max-w-4xl
 */
export default function ContentGroupLayout({
  children
}: {
  children: ReactNode;
}) {
  return <ContentLayout>{children}</ContentLayout>;
}
