import type { ReactNode } from "react";

interface ContentLayoutProps {
  children: ReactNode;
}

/**
 * ContentLayout
 * 
 * Layout para páginas de contenido simple (about, contacto, servicios)
 * - Usa <article> semántico
 * - Max width: max-w-4xl
 * - Padding top: pt-24 (para evitar overlap con navbar)
 * - Padding bottom: pb-20
 * 
 * @example
 * // app/(content)/contacto/page.tsx
 * export default function ContactoPage() {
 *   return (
 *     <>
 *       <h1>Contacto</h1>
 *       <p>Contenido...</p>
 *     </>
 *   );
 * }
 */
export function ContentLayout({ children }: ContentLayoutProps) {
  return (
    <article className="min-h-screen pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        {children}
      </div>
    </article>
  );
}

