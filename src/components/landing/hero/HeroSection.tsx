"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { WSFadeIn } from "@/components/animations/ws-fade-in";
import { CallToAction } from "@/components/landing/hero/Hero.CallToAction";
import { HeaderNavigation } from "@/components/landing/hero/Hero.HeaderNavigation";
import { TrustIndicators } from "@/components/landing/hero/Hero.TrustIndicators";
import { IdleOptimizedValuePropsGrid } from "@/components/landing/hero/Hero.ValuePropsGrid.Idle-Optimized";
import { WavesBackground } from "@/components/landing/hero/Hero.WavesBackground";
import { useReversibleScrollVisibility } from "@/hooks/use-reversible-scroll-visibility";
import { CloudLightningBackground } from "./Hero.CloudLightningBackground";

const HeroSection = () => {
  const [_isScrolled, setIsScrolled] = useState(false);

  // Hook optimizado para la flecha de scroll
  const scrollIndicator = useReversibleScrollVisibility({
    fadeStartThreshold: 0.1, // Comienza a desaparecer al 10% del scroll
    fadeOutThreshold: 0.5, // Completamente invisible al 50% del scroll
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

      {/* Waves Background */}
      {/* <WavesBackground /> */}
      <CloudLightningBackground />

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

      {/* Scroll Indicator - Optimizado para Performance */}
      <button
        ref={scrollIndicator.setElementRef}
        type="button"
        className="absolute bottom-8 left-1/2 cursor-pointer transition-transform duration-200 will-change-transform hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-transparent border-none p-2"
        onClick={scrollToContent}
        aria-label="Desplazarse hacia abajo para ver más contenido"
        style={{
          transform: `translateX(-50%) translateY(0)`,
          opacity: scrollIndicator.opacity,
          visibility: scrollIndicator.opacity > 0 ? "visible" : "hidden",
          transition: scrollIndicator.isReducedMotion
            ? "opacity 0.2s ease-out, visibility 0.2s ease-out"
            : "opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s ease-out",
        }}
      >
        <ChevronDown
          className={`h-8 w-8 text-gray-400 dark:text-gray-500 transition-colors duration-200 ${
            !scrollIndicator.isReducedMotion ? "animate-bounce" : ""
          }`}
        />
      </button>
    </div>
  );
};

export default HeroSection;
