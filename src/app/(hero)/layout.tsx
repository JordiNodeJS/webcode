import type { ReactNode } from "react";
import { HeroLayout } from "@/components/layouts";

/**
 * Layout para el route group (hero)
 *
 * Páginas que usan este layout:
 * - /soluciones/*
 * - /proceso
 * - /briefing
 *
 * Aplica solo wrapper mínimo.
 * Las páginas manejan su propio spacing y gradientes.
 */
export default function HeroGroupLayout({ children }: { children: ReactNode }) {
  return <HeroLayout>{children}</HeroLayout>;
}
