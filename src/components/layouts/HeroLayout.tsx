import type { ReactNode } from "react";

interface HeroLayoutProps {
  children: ReactNode;
}

/**
 * HeroLayout
 * 
 * Layout para páginas con secciones hero prominentes
 * - Solo wrapper mínimo (min-h-screen)
 * - Las páginas individuales manejan sus propios gradientes y spacing
 * - Usado para: soluciones, proceso, briefing
 * 
 * @example
 * // app/(hero)/soluciones/seo/page.tsx
 * export default function SeoPage() {
 *   return (
 *     <>
 *       <section 
 *         className="relative pt-24 pb-20 md:pb-32"
 *         style={{ background: 'linear-gradient(...)' }}
 *       >
 *         <div className="container mx-auto max-w-6xl px-4">
 *           <h1>Hero Title</h1>
 *         </div>
 *       </section>
 *       
 *       <section className="py-20">
 *         Más contenido...
 *       </section>
 *     </>
 *   );
 * }
 */
export function HeroLayout({ children }: HeroLayoutProps) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}

