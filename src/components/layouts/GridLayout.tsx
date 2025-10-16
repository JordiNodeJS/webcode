import type { ReactNode } from "react";

interface GridLayoutProps {
  children: ReactNode;
}

/**
 * GridLayout
 * 
 * Layout para páginas con listados, grids o colecciones
 * - Usa <section> semántico
 * - Max width: max-w-6xl (más ancho para grids)
 * - Padding top: pt-24 (para evitar overlap con navbar)
 * - Padding bottom: pb-20
 * 
 * Usado para: blog, portfolio, FAQs
 * 
 * @example
 * // app/(grid)/faqs/page.tsx
 * export default function FAQsPage() {
 *   return (
 *     <>
 *       <div className="text-center mb-16">
 *         <h1>Preguntas Frecuentes</h1>
 *       </div>
 *       
 *       <div className="space-y-4">
 *         {faqs.map(faq => <FAQItem key={faq.id} />)}
 *       </div>
 *     </>
 *   );
 * }
 */
export function GridLayout({ children }: GridLayoutProps) {
  return (
    <section className="min-h-screen pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {children}
      </div>
    </section>
  );
}

