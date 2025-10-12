import { WSFadeIn } from "@/components/animations/ws-fade-in";
import { MapPin, Shield, Users } from "@/lib/icons";

interface TrustIndicator {
  id: string;
  icon: React.ReactNode;
  text: string;
}

const trustIndicators: TrustIndicator[] = [
  {
    id: "rgpd",
    icon: <Shield className="h-4 w-4 text-primary" />,
    text: "Cumplimiento RGPD",
  },
  {
    id: "spain",
    icon: <MapPin className="h-4 w-4 text-secondary-foreground" />,
    text: "Normativas España",
  },
  {
    id: "barcelona",
    icon: <Users className="h-4 w-4 text-primary" />,
    text: "Barcelona Local",
  },
];

/**
 * Indicadores de confianza
 *
 * Server Component que muestra los badges de confianza y cumplimiento
 * legal para generar credibilidad en el mercado español.
 */
export function TrustIndicators() {
  return (
    <div className="flex flex-wrap justify-center items-center gap-6 mt-6 opacity-90">
      {trustIndicators.map((indicator, index) => (
        <WSFadeIn key={indicator.id} delay={0.2 + index * 0.1}>
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-background/50 backdrop-blur-sm px-4 py-2 rounded-lg shadow-3d-sm">
            {indicator.icon}
            <span className="font-medium">✓ {indicator.text}</span>
          </div>
        </WSFadeIn>
      ))}
    </div>
  );
}
