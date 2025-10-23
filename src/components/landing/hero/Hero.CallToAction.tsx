"use client";

import Link from "next/link";
import { Eye } from "@/lib/icons";
import styles from "./Hero.CallToAction.module.css";

/**
 * Botones de Call to Action principales con efectos neon
 *
 * Server Component con los CTAs principales de la Hero Section.
 * Reproduce fielmente los efectos de los botones 3 y 7 del CodePen:
 * - Botón 3: Líneas deslizantes desde esquinas con relleno de color
 * - Botón 7: Barrido completo con líneas que atraviesan el botón
 */
export function CallToAction() {
  // Simple CTA: usamos Link para navegación y hacemos un intento de view-transition
  const onClickCTA = (_e: React.MouseEvent<HTMLAnchorElement>) => {
    // Marca temporal que permite a la CSS detectar la transición
    if (typeof document !== "undefined") {
      const doc = document as unknown as {
        startViewTransition?: (cb: () => void) => void;
      };

      if (typeof doc.startViewTransition === "function") {
        try {
          doc.startViewTransition(() => {
            document.documentElement.setAttribute("data-vtx-cta", "true");
            // Limpieza programada
            setTimeout(
              () => document.documentElement.removeAttribute("data-vtx-cta"),
              900
            );
          });
        } catch {
          // noop - permitir que Link realice la navegación normalmente
        }
      }
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 mt-8">
      {/* CTA Principal - Estilo La Teva Web: "¿Hablamos?" */}
      <Link
        href="/contacto"
        onClick={onClickCTA}
        className={`${styles.neonBtn3} group relative inline-flex items-center justify-center`}
      >
        <span className="relative z-10 flex items-center">
          ¿Hablamos?
          <span className="ml-2 text-lg">💬</span>
        </span>
      </Link>

      {/* CTA Secundario - Ver Servicios */}
      <Link
        href="/soluciones"
        onClick={onClickCTA}
        className={`${styles.neonBtn7} group relative`}
      >
        <span className="relative z-10 flex items-center">
          <Eye className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
          Ver Servicios
        </span>
      </Link>

      {/* CTA Terciario - Portfolio */}
      <a
        href="https://jordinodejs.github.io/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 bg-background/80 backdrop-blur-sm border border-border text-foreground font-semibold rounded-xl shadow-3d-sm hover:shadow-3d-md transition-all duration-300 hover:scale-105"
      >
        <span>Portfolio</span>
        <span className="text-lg">🚀</span>
      </a>
    </div>
  );
}
