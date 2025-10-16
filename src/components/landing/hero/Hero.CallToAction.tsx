"use client";

import Link from "next/link";
import { ArrowRight, Eye } from "@/lib/icons";
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
      {/* CTA Principal - Estilo Botón 3: Líneas deslizantes (link a /contacto) */}
      <Link
        href="/contacto"
        onClick={onClickCTA}
        className={`${styles.neonBtn3} group relative inline-flex items-center justify-center`}
      >
        <span className="relative z-10 flex items-center">
          Consulta Gratuita
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>

      {/* CTA Secundario - Estilo Botón 7: Barrido completo */}
      <a
        href="https://jordinodejs.github.io/"
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.neonBtn7} group relative`}
      >
        <span className="relative z-10 flex items-center">
          <Eye className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
          Ver Portfolio
        </span>
      </a>
    </div>
  );
}
