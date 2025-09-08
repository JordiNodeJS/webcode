import { ArrowRight, Eye } from "lucide-react";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Button } from "@/components/ui/button";
import { WSHover } from "@/components/animations/ws-hover";
import { WSFadeIn } from "@/components/animations/ws-fade-in";

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
      <WSFadeIn delay={0.5}>
        <WSHover effect="lift">
          <Button
            size="lg"
            className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground shadow-3d-md hover:shadow-3d-lg transition-all duration-300 transform hover:scale-105 px-8 py-6 text-lg font-semibold"
          >
            Consulta Gratuita
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            <BorderBeam
              duration={6}
              size={100}
              colorFrom="#dc7cb3"
              colorTo="#bce3e5"
            />
          </Button>
        </WSHover>
      </WSFadeIn>

      {/* CTA Secundario */}
      <WSFadeIn delay={0.7}>
        <WSHover effect="lift">
          <Button
            variant="outline"
            size="lg"
            className="group relative overflow-hidden border-2 border-secondary text-secondary-foreground hover:border-secondary/60 hover:bg-secondary/20 hover:text-secondary-foreground shadow-3d-sm hover:shadow-3d-sm transition-all duration-300 transform hover:scale-105 px-8 py-6 text-lg font-semibold"
          >
            <Eye className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
            Ver Portfolio
            <BorderBeam
              duration={8}
              size={120}
              delay={2}
              colorFrom="#dc7cb3"
              colorTo="#bce3e5"
            />
          </Button>
        </WSHover>
      </WSFadeIn>
    </div>
  );
}