"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Zap, Smartphone, Target } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface ValueProp {
  icon: React.ReactNode;
  title: string;
  features: string[];
}

const valueProps: ValueProp[] = [
  {
    icon: <Rocket className="h-8 w-8 text-primary" />,
    title: "Tecnología 2025",
    features: [
      "Next.js 15 - App Router",
      "React 19 - Server Components",
      "Astro 5 - Static sites",
      "Tailwind CSS v4 - Performance",
    ],
  },
  {
    icon: <Zap className="h-8 w-8 text-secondary-foreground" />,
    title: "Performance Garantizado",
    features: [
      "<2.5s tiempo de carga",
      "99.9% uptime garantizado",
      "Core Web Vitals en verde",
      "CDN global optimizado",
    ],
  },
  {
    icon: <Smartphone className="h-8 w-8 text-primary" />,
    title: "Mobile-First",
    features: [
      "Responsive design",
      "Accesible WCAG 2.1 AA",
      "Progressive Web Apps",
      "Touch-friendly UX",
    ],
  },
  {
    icon: <Target className="h-8 w-8 text-secondary-foreground" />,
    title: "Barcelona Local",
    features: [
      "Conocimiento del mercado",
      "Soporte en ES/CA/EN",
      "Reuniones presenciales",
      "Cumplimiento normativo",
    ],
  },
];

/**
 * Grid de propuestas de valor
 *
 * Server Component que renderiza las 4 propuestas de valor principales
 * de WebSnack en un grid responsive con cards y efectos 3D.
 */
export function ValuePropsGrid() {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShouldAnimate(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    // Verificar si ya hemos scrolleado lo suficiente al cargar la página
    if (window.scrollY > 100) {
      setShouldAnimate(true);
    } else {
      window.addEventListener('scroll', handleScroll);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto mt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {valueProps.map((prop, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="h-full"
          >
            <Card className="h-full bg-background/80 backdrop-blur-sm border-border/30 shadow-3d-sm hover:shadow-3d-md transition-all duration-300 transform hover:scale-105 hover:border-primary/30">
              <CardContent className="p-6 text-center h-full flex flex-col">
                {/* Icono */}
                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {prop.icon}
                </div>

                {/* Título */}
                <h3 className="text-lg font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {prop.title}
                </h3>

                {/* Lista de características */}
                <ul className="space-y-2 text-sm text-muted-foreground mt-4">
                  {prop.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center justify-center text-center"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}