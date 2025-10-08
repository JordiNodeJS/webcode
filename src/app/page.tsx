import { HeroSection } from "@/components/landing/hero";
import { CloudBgClient } from "@/components/landing/hero/CloudBgClient";
import { ServicesSection } from "@/components/landing/services";



export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Fondo de nubes consistente para toda la página (no bloqueante) */}
      <CloudBgClient />

      <div className="relative z-10">
        <HeroSection />
        <ServicesSection />
      </div>
    </main>
  );
}
