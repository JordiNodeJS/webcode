/**
 * EJEMPLO: Cómo intercambiar WavesBackground por CloudLightningBackground
 *
 * Este archivo muestra cómo cambiar fácilmente entre los dos fondos alternativos
 * en el componente HeroSection.
 */

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { WSFadeIn } from "@/components/animations/ws-fade-in";
import { CallToAction } from "@/components/landing/hero/Hero.CallToAction";
import { HeaderNavigation } from "@/components/landing/hero/Hero.HeaderNavigation";
import { TrustIndicators } from "@/components/landing/hero/Hero.TrustIndicators";
import { IdleOptimizedValuePropsGrid } from "@/components/landing/hero/Hero.ValuePropsGrid.Idle-Optimized";

// ✅ OPCIÓN 1: Fondo original con olas SVG
import { WavesBackground } from "@/components/landing/hero/Hero.WavesBackground";

// ✅ OPCIÓN 2: Fondo alternativo con nubes y relámpagos
import { CloudLightningBackground } from "@/components/landing/hero/Hero.CloudLightningBackground";

import { useReversibleScrollVisibility } from "@/hooks/use-reversible-scroll-visibility";

const HeroSectionExample = () => {
  const [_isScrolled, setIsScrolled] = useState(false);

  // Hook optimizado para la flecha de scroll
  const scrollIndicator = useReversibleScrollVisibility({
    fadeStartThreshold: 0.1,
    fadeOutThreshold: 0.5,
    transitionDuration: 400,
    respectReducedMotion: true,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900"
      data-animation-section="hero"
    >
      {/* Navigation */}
      <HeaderNavigation />

      {/* 🌊 OPCIÓN 1: Fondo original con olas animadas */}
      <WavesBackground />

      {/* ⚡ OPCIÓN 2: Fondo alternativo con nubes y relámpagos */}
      {/* Descomenta la línea siguiente y comenta la anterior para cambiar: */}
      {/* <CloudLightningBackground /> */}

      <div className="container relative z-10 mx-auto px-4 py-20 md:py-32">
        <div className="flex flex-col items-center text-center">
          {/* Hero Content */}
          <WSFadeIn delay={0.1} sectionId="hero">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              <span className="block">Desarrollo Web</span>
              <span className="block text-gradient-webcode">
                Profesional Barcelona
              </span>
            </h1>
          </WSFadeIn>

          <WSFadeIn delay={0.2} sectionId="hero">
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl">
              Creamos experiencias digitales excepcionales con las últimas
              tecnologías: Next.js, React, Astro y más para tu negocio en
              Barcelona.
            </p>
          </WSFadeIn>

          {/* Trust Indicators */}
          <TrustIndicators />

          {/* Main Content */}
          <IdleOptimizedValuePropsGrid />

          {/* Call to Action */}
          <CallToAction />
        </div>
      </div>

      {/* Indicador de scroll */}
      {scrollIndicator.isVisible && (
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
          onClick={scrollToContent}
          style={{
            opacity: scrollIndicator.opacity,
            transition: `opacity ${scrollIndicator.transitionDuration}ms ease-out`,
          }}
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </div>
      )}
    </div>
  );
};

export default HeroSectionExample;

/**
 * 📝 NOTAS DE IMPLEMENTACIÓN:
 *
 * 1. **Para usar el fondo de olas (actual)**:
 *    - Mantén `<WavesBackground />` descomentado
 *    - Comenta `<CloudLightningBackground />`
 *
 * 2. **Para usar el fondo de nubes con relámpagos**:
 *    - Comenta `<WavesBackground />`
 *    - Descomenta `<CloudLightningBackground />`
 *
 * 3. **Compatibilidad**:
 *    - Ambos componentes tienen la misma API
 *    - Mismo posicionamiento (absolute inset-0)
 *    - Misma gestión de performance (Intersection Observer)
 *
 * 4. **Personalización adicional**:
 *    - Puedes modificar la clase del contenedor principal para ajustar
 *      el gradiente de fondo según el componente elegido
 *    - Para CloudLightningBackground, considera usar un fondo más oscuro:
 *      `className="...bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"`
 */
