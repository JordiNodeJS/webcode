import { HeroSection } from "@/components/landing/hero";
import { CloudBgClient } from "@/components/landing/hero/CloudBgClient";
import { ServicesSection } from "@/components/landing/services";
import { EnhancedServicesSection } from "@/components/landing/services";
import { WorkflowSection } from "@/components/landing/workflow";
import { PortfolioSection } from "@/components/landing/portfolio";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Fondo de nubes consistente para toda la página (no bloqueante) */}
      <CloudBgClient />

      <div className="relative z-10">
        <HeroSection />
        <ServicesSection />
        <EnhancedServicesSection />
        <WorkflowSection />
        <PortfolioSection />
      </div>
    </main>
  );
}
