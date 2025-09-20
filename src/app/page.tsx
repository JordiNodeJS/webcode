import {
  CloudLightningBackground,
  HeroSection,
} from "@/components/landing/hero";
import { ServicesSection } from "@/components/landing/services";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Fondo de nubes consistente para toda la página */}
      <div className="fixed inset-0 z-0">
        <CloudLightningBackground />
      </div>

      <div className="relative z-10">
        <HeroSection />
        <ServicesSection />
      </div>
    </main>
  );
}
