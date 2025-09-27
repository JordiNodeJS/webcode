import type { ReactNode } from "react";

/**
 * SectionLayout
 * Layout reutilizable que aplica un padding-top basado en la variable CSS
 * `--header-height` (definida en globals.css) para compensar un header fijo.
 */
export function SectionLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ paddingTop: "var(--header-height)" }} className="w-full">
      {children}
    </div>
  );
}

export default SectionLayout;
