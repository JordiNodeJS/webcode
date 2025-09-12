"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeaderNavigation } from "@/components/landing/hero/Hero.HeaderNavigation";
import { TrustIndicators } from "@/components/landing/hero/Hero.TrustIndicators";
import { ValuePropsGrid } from "@/components/landing/hero/Hero.ValuePropsGrid";
import { WavesBackground } from "@/components/landing/hero/Hero.WavesBackground";
import { CallToAction } from "@/components/landing/hero/Hero.CallToAction";

const HeroSection = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      {/* Navigation */}
      <HeaderNavigation />
      
      {/* Waves Background */}
      <WavesBackground />
      
      <div className="container relative z-10 mx-auto px-4 py-20 md:py-32">
        <div className="flex flex-col items-center text-center">
          {/* Trust Indicators */}
          <TrustIndicators />
          
          {/* Main Content */}
          <ValuePropsGrid />
          
          {/* Call to Action */}
          <CallToAction />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer transition-all duration-300 hover:scale-110"
        onClick={scrollToContent}
      >
        <ChevronDown className="h-8 w-8 text-gray-400 animate-bounce" />
      </div>
    </div>
  );
};

export default HeroSection;