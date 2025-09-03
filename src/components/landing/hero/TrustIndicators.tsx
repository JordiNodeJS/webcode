import { Shield, MapPin, Users } from "lucide-react";

interface TrustIndicator {
  icon: React.ReactNode;
  text: string;
}

const trustIndicators: TrustIndicator[] = [
  {
    icon: <Shield className="h-4 w-4 text-primary" />,
    text: "Cumplimiento RGPD",
  },
  {
    icon: <MapPin className="h-4 w-4 text-secondary-foreground" />,
    text: "Normativas España",
  },
  {
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
        <div
          key={index}
          className="flex items-center gap-2 text-sm text-muted-foreground bg-background/50 backdrop-blur-sm px-4 py-2 rounded-lg shadow-3d-sm"
        >
          {indicator.icon}
          <span className="font-medium">✓ {indicator.text}</span>
        </div>
      ))}
    </div>
  );
}


