import { HeaderNavigation } from "./HeaderNavigation";
import { HeroContent } from "./HeroContent";
import { ValuePropsGrid } from "./ValuePropsGrid";
import { CallToAction } from "./CallToAction";
import { TrustIndicators } from "./TrustIndicators";

/**
 * Hero Section principal de WebSnack
 *
 * Componente Server Component que renderiza la sección hero completa
 * con navegación, contenido principal, propuesta de valor y CTAs.
 *
 * Utiliza el sistema de colores WebSnack (Rosa/Aguamarina) y efectos 3D.
 */
export function HeroSection() {
  return (
    <section className="min-h-screen bg-gradient-websnack relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10" />

      {/* Header Navigation */}
      <HeaderNavigation />

      {/* Main Hero Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-16">
        <div className="flex flex-col items-center text-center space-y-12">
          {/* Hero Content */}
          <HeroContent />

          {/* Call to Action */}
          <CallToAction />

          {/* Trust Indicators */}
          <TrustIndicators />

          {/* Value Props Grid */}
          <ValuePropsGrid />
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
