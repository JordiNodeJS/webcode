/**
 * Componente optimizado para renderizar contenido Markdown del blog
 *
 * Optimizaciones implementadas:
 * - Dynamic imports de plugins rehype para code splitting
 * - Lazy loading de react-markdown
 * - Mejor performance en initial load
 *
 * NOTA: Este componente usa <img> en vez de Next.js Image para imágenes
 * dinámicas de markdown, lo cual es la práctica recomendada para contenido
 * externo no controlado.
 */

"use client";

import { Suspense, lazy, useMemo } from "react";
import type { Components } from "react-markdown";
import { Skeleton } from "@/components/ui/skeleton";
import "highlight.js/styles/github-dark.css"; // Tema de highlight.js
import "../../styles/webcode-code-theme.css"; // Tema personalizado WebCode

// Dynamic import de ReactMarkdown para code splitting
const ReactMarkdown = lazy(() => import("react-markdown"));

// interface MarkdownRendererProps {
//   content: string;
// }

// Lazy loading de plugins rehype
const loadRehypePlugins = async () => {
  const [
    { default: rehypeHighlight },
    { default: rehypeRaw },
    { default: rehypeSanitize }
  ] = await Promise.all([
    import("rehype-highlight"),
    import("rehype-raw"),
    import("rehype-sanitize")
  ]);

  return [rehypeRaw, rehypeSanitize, rehypeHighlight];
};

/**
 * Skeleton mientras carga el Markdown renderer
 */
function MarkdownSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      ))}
    </div>
  );
}

/**
 * Componente interno que renderiza el Markdown
 * Se carga dinámicamente con los plugins
 */
function MarkdownContent({
  content,
  components
}: {
  content: string;
  components: Components;
}) {
  const rehypePlugins = useMemo(() => {
    // Los plugins se cargan de forma lazy la primera vez que se necesitan
    return loadRehypePlugins();
  }, []);

  return (
    <Suspense fallback={<MarkdownSkeleton />}>
      <ReactMarkdown
        rehypePlugins={rehypePlugins as never}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </Suspense>
  );
}

export { MarkdownContent };
