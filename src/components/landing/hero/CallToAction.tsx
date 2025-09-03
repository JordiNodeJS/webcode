import { Button } from "@/components/ui/button";
import { ArrowRight, Eye } from "lucide-react";

/**
 * Botones de Call to Action principales
 *
 * Server Component con los CTAs principales de la Hero Section.
 * Botón primario para consulta gratuita y secundario para portfolio.
 */
export function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
      {/* CTA Principal */}
      <Button
        size="lg"
        className="group bg-primary hover:bg-primary/90 text-primary-foreground shadow-3d-md hover:shadow-3d-lg transition-all duration-300 transform hover:scale-105 px-8 py-6 text-lg font-semibold"
      >
        Consulta Gratuita
        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
      </Button>

      {/* CTA Secundario */}
      <Button
        variant="outline"
        size="lg"
        className="group border-2 border-secondary text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground shadow-3d-sm hover:shadow-3d-md transition-all duration-300 transform hover:scale-105 px-8 py-6 text-lg font-semibold"
      >
        <Eye className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
        Ver Portfolio
      </Button>
    </div>
  );
}
