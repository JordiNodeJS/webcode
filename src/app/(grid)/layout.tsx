import type { ReactNode } from "react";
import { GridLayout } from "@/components/layouts";

/**
 * Layout para el route group (grid)
 *
 * Páginas que usan este layout:
 * - /blog
 * - /faqs
 * - /portfolio
 *
 * Aplica automáticamente:
 * - <section> semántico
 * - pt-24 (spacing para navbar)
 * - max-w-6xl (más ancho para grids)
 */
export default function GridGroupLayout({ children }: { children: ReactNode }) {
  return <GridLayout>{children}</GridLayout>;
}
