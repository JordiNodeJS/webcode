import type { ReactNode } from "react";

/**
 * SectionLayout
 * Pequeño layout reutilizable para secciones que necesitan compensar
 * la altura del header fijo sin tocar estilos globales.
 *
 * Estrategia:
 * - Aplicar padding-top inline usando la variable CSS `--header-height` definida en globals.css
 * - No aplicar containers internos: las páginas siguen usando su propio `container`.
 */
export function SectionLayout({ children }: { children: ReactNode }) {
  return (
    <div
      // Usamos padding-top inline para evitar tocar CSS global.
      style={{ paddingTop: "var(--header-height)" }}
      className="w-full"
    >
      {children}
    </div>
  );
}

export default SectionLayout;
