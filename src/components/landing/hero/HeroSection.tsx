"use client";

import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { HeaderNavigation } from "./Hero.HeaderNavigation";
import { WSFadeIn } from "@/components/animations/ws-fade-in";
import useSlowConnection from "@/hooks/use-slow-connection";

// Dynamic imports para componentes pesados
const CallToAction = dynamic(() => 
  import("./Hero.CallToAction").then((mod) => mod.CallToAction), {
  loading: () => <div className="h-12 w-64 bg-muted animate-pulse rounded-lg" />,
  ssr: true
});

const HeroContent = dynamic(() => 
  import("./Hero.Content").then((mod) => mod.HeroContent), {
  loading: () => <div className="h-32 w-full bg-muted animate-pulse rounded-lg" />,
  ssr: true
});

const TrustIndicators = dynamic(() => 
  import("./Hero.TrustIndicators").then((mod) => mod.TrustIndicators), {
  loading: () => <div className="h-16 w-full bg-muted animate-pulse rounded-lg" />,
  ssr: true
});

const ValuePropsGrid = dynamic(() => 
  import("./Hero.ValuePropsGrid").then((mod) => mod.ValuePropsGrid), {
  loading: () => <div className="h-96 w-full bg-muted animate-pulse rounded-lg" />,
  ssr: true
});

const WavesBackground = dynamic(() => 
  import("./Hero.WavesBackground").then((mod) => mod.WavesBackground), {
  loading: () => <div className="h-64 w-full bg-muted animate-pulse" />,
  ssr: true
});

/**
 * Hero Section principal de WebSnack
 *
 * Componente Server Component que renderiza la sección hero completa
 * con navegación, contenido principal, propuesta de valor y CTAs.
 *
 * Utiliza el sistema de colores WebSnack (Rosa/Aguamarina) y efectos 3D.
 *
 * ESTRUCTURA JERÁRQUICA:
 * - HeroSection (principal)
 *   ├── WavesBackground (fondo animado)
 *   ├── HeaderNavigation (navegación superior)
 *   ├── HeroContent (título y subtítulo)
 *   ├── CallToAction (botones de acción)
 *   ├── TrustIndicators (indicadores de confianza)
 *   └── ValuePropsGrid (propuestas de valor)
 */
export function HeroSection() {
  const isSlowConnection = useSlowConnection();
  const [showHeavyComponents, setShowHeavyComponents] = useState(false);

  // Mostrar componentes pesados después de un tiempo en conexiones rápidas
  // o inmediatamente en conexiones lentas si es necesario
  useEffect(() => {
    if (!isSlowConnection) {
      const timer = setTimeout(() => {
        setShowHeavyComponents(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      // En conexiones lentas, mostrar componentes más ligeros
      setShowHeavyComponents(false);
    }
  }, [isSlowConnection]);

  return (
    // Aumentar significativamente la opacidad del fondo para que se vea mejor el color
    <section className="min-h-screen bg-gradient-websnack/80 dark:bg-gradient-websnack/60 relative">
      {/* Aumentar la opacidad del patrón de fondo para mejor visibilidad */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-secondary/15" />

      {/* Waves Background Animation */}
      <Suspense fallback={<div className="h-64 w-full bg-muted animate-pulse" />}>
        <WavesBackground />
      </Suspense>

      {/* Header Navigation */}
      <HeaderNavigation />

      {/* Main Hero Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-16">
        <div className="flex flex-col items-center text-center space-y-12">
          {/* Hero Content */}
          <WSFadeIn delay={0.1}>
            <Suspense fallback={<div className="h-32 w-full bg-muted animate-pulse rounded-lg" />}>
              <HeroContent />
            </Suspense>
          </WSFadeIn>

          {/* Call to Action */}
          <WSFadeIn delay={0.3}>
            <Suspense fallback={<div className="h-12 w-64 bg-muted animate-pulse rounded-lg" />}>
              <CallToAction />
            </Suspense>
          </WSFadeIn>

          {/* Trust Indicators - Solo en conexiones rápidas */}
          {showHeavyComponents && (
            <WSFadeIn delay={0.5}>
              <Suspense fallback={<div className="h-16 w-full bg-muted animate-pulse rounded-lg" />}>
                <TrustIndicators />
              </Suspense>
            </WSFadeIn>
          )}

          {/* Value Props Grid - Solo en conexiones rápidas */}
          {showHeavyComponents && (
            <WSFadeIn delay={0.7}>
              <Suspense fallback={<div className="h-96 w-full bg-muted animate-pulse rounded-lg" />}>
                <ValuePropsGrid />
              </Suspense>
            </WSFadeIn>
          )}
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}