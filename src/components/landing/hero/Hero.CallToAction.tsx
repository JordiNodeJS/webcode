import { ArrowRight, Eye } from "lucide-react";

/**
 * Botones de Call to Action principales con efectos neon
 *
 * Server Component con los CTAs principales de la Hero Section.
 * Reproduce fielmente los efectos de los botones 3 y 7 del CodePen:
 * - Botón 3: Líneas deslizantes desde esquinas con relleno de color
 * - Botón 7: Barrido completo con líneas que atraviesan el botón
 */
export function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 mt-8">
      {/* CTA Principal - Estilo Botón 3: Líneas deslizantes */}
      <button className="neon-btn-3 group relative">
        <span className="relative z-10 flex items-center">
          Consulta Gratuita
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </span>
      </button>

      {/* CTA Secundario - Estilo Botón 7: Barrido completo */}
      <button className="neon-btn-7 group relative">
        <span className="relative z-10 flex items-center">
          <Eye className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
          Ver Portfolio
        </span>
      </button>
    </div>
  );
}
