"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Zap, Smartphone, Target } from "lucide-react";
import { motion } from "framer-motion";

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

// Componente para una tarjeta individual con efecto 3D
const ValuePropCard = React.memo(({ prop }: { prop: ValueProp }) => {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es dispositivo móvil (optimizado)
  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 768 || 'ontouchstart' in window;
      setIsMobile(prev => prev !== mobile ? mobile : prev);
    };
    
    checkIsMobile();
    const resizeObserver = new ResizeObserver(checkIsMobile);
    if (cardRef.current) {
      resizeObserver.observe(cardRef.current);
    }
    
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Memoizar el degradado por defecto
  const defaultGradient = useMemo(() => 
    `radial-gradient(circle at 50% 50%, rgba(111, 137, 193, 0.15), transparent)`, 
    []
  );

  // Memoizar los cálculos de color para evitar recálculos innecesarios
  const calculateGradientColor = useCallback((glareX: number) => {
    const pinkRatio = (100 - glareX) / 100;
    const tealRatio = glareX / 100;
    
    return {
      r: Math.round(178 * pinkRatio + 45 * tealRatio),
      g: Math.round(62 * pinkRatio + 212 * tealRatio),
      b: Math.round(176 * pinkRatio + 191 * tealRatio),
    };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Invertir la dirección de la rotación
    const rotateX = (centerY - y) / 20;
    const rotateY = (x - centerX) / 20;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    
    // Usar transform3d para mejor rendimiento
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    
    // Efecto de brillo optimizado
    const glare = card.querySelector('.glare') as HTMLElement;
    if (glare) {
      const { r, g, b } = calculateGradientColor(glareX);
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(${r}, ${g}, ${b}, 0.2), transparent)`;
    }
  }, [calculateGradientColor]);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!cardRef.current || e.touches.length === 0) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Invertir la dirección de la rotación
    const rotateX = (centerY - y) / 20;
    const rotateY = (x - centerX) / 20;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    
    // Efecto de brillo optimizado
    const glare = card.querySelector('.glare') as HTMLElement;
    if (glare) {
      const { r, g, b } = calculateGradientColor(glareX);
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(${r}, ${g}, ${b}, 0.2), transparent)`;
    }
  }, [calculateGradientColor]);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    
    // Restaurar el brillo sutil por defecto
    const glare = card.querySelector('.glare') as HTMLElement;
    if (glare) {
      glare.style.background = defaultGradient;
    }
  }, [defaultGradient]);

  const handleTouchEnd = useCallback(() => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    
    // Restaurar el brillo sutil por defecto
    const glare = card.querySelector('.glare') as HTMLElement;
    if (glare) {
      glare.style.background = defaultGradient;
    }
  }, [defaultGradient]);

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative h-full group transition-transform duration-200 ease-out will-change-transform [transform-style:preserve-3d]"
    >
      {/* Efecto de brillo tenue rosa detrás de la tarjeta al hacer hover */}
      <div className="absolute inset-0 rounded-xl bg-primary/5 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>
      
      <Card className="h-full bg-background/80 backdrop-blur-sm border-border/30 shadow-3d-sm group-hover:shadow-3d-md transition-all duration-700 relative z-0 overflow-hidden [transform-style:preserve-3d]">
        {/* Elemento para el efecto de brillo */}
        <div className="glare absolute inset-0 pointer-events-none" style={{ background: defaultGradient }}></div>
        
        <CardContent className="p-6 text-center h-full flex flex-col relative z-10">
          {/* Icono */}
          <div className="flex justify-center mb-4 group-hover:scale-125 transition-transform duration-300">
            {prop.icon}
          </div>

          {/* Título */}
          <h3 className="text-lg font-bold text-foreground mb-4 transition duration-300 transform-gpu group-hover:[transform:translateZ(50px)] group-hover:drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]">
            {prop.title}
          </h3>

          {/* Lista de características */}
          <ul className="space-y-2 text-sm text-muted-foreground mt-4 transition-transform duration-300 transform-gpu group-hover:[transform:translateZ(40px)] group-hover:drop-shadow-[0_12px_24px_rgba(0,0,0,0.4)]">
            {prop.features.map((feature, featureIndex) => (
              <li
                key={featureIndex}
                className="flex items-center justify-center text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-teal-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] group-hover:[transform:translateZ(30px)] group-hover:drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)]"
              >
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
});

/**
 * Grid de propuestas de valor
 *
 * Server Component que renderiza las 4 propuestas de valor principales
 * de WebSnack en un grid responsive con cards y efectos 3D.
 */
export const ValuePropsGrid = React.memo(() => {
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
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Memoizar el array de props para evitar re-renders innecesarios
  const memoizedValueProps = useMemo(() => valueProps, []);

  return (
    <div className="w-full max-w-6xl mx-auto mt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {memoizedValueProps.map((prop, index) => (
          <motion.div
            key={`${prop.title}-${index}`}
            initial={{ opacity: 0, y: 50 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="h-full"
          >
            <ValuePropCard prop={prop} />
          </motion.div>
        ))}
      </div>
    </div>
  );
});

ValuePropsGrid.displayName = 'ValuePropsGrid';