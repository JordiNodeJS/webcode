"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Zap, Smartphone, Target } from "lucide-react";
import { motion } from "framer-motion";

// Constantes para efectos 3D
const CARD_CONFIG = {
  ROTATION_SENSITIVITY: 25, // Aumentado para menor rotación (más sutil)
  SCALE_HOVER: 1.01, // Reducido para un efecto más sutil
  PERSPECTIVE: 1000, // Aumentado para menor perspectiva (más sutil)
  TRANSLATE_Z: 30, // Valor Z reducido para efecto 3D más sutil
  ROTATE_X: 5, // Rotación en eje X reducida
  GLARE_OPACITY: 0.15, // Reducido para menos brillo
  DEFAULT_GLARE_OPACITY: 0.1,
} as const;

// Constantes para colores del degradado
const GRADIENT_COLORS = {
  PINK: { r: 178, g: 62, b: 176 },
  TEAL: { r: 45, g: 212, b: 191 },
  DEFAULT: { r: 111, g: 137, b: 193 },
} as const;

// Constantes para animaciones
const ANIMATION_CONFIG = {
  SCROLL_THRESHOLD: 100,
  STAGGER_DELAY: 0.1,
  DURATION: 0.5,
} as const;

// Interface para el estado de la tarjeta
interface CardState {
  rotateX: number;
  rotateY: number;
  glareX: number;
  glareY: number;
  isHovered: boolean;
}

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

// Componente para una tarjeta individual con efecto 3D (refactorizado sin manipulación directa del DOM)
const ValuePropCard = React.memo(({ prop }: { prop: ValueProp }) => {
  const [cardState, setCardState] = useState<CardState>({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
    isHovered: false,
  });

  // Memoizar el degradado por defecto
  const defaultGradient = useMemo(() => 
    `radial-gradient(circle at 50% 50%, rgba(${GRADIENT_COLORS.DEFAULT.r}, ${GRADIENT_COLORS.DEFAULT.g}, ${GRADIENT_COLORS.DEFAULT.b}, ${CARD_CONFIG.DEFAULT_GLARE_OPACITY}), transparent)`, 
    []
  );

  // Memoizar los cálculos de color para evitar recálculos innecesarios
  const calculateGradientColor = useCallback((glareX: number) => {
    const pinkRatio = (100 - glareX) / 100;
    const tealRatio = glareX / 100;
    
    return {
      r: Math.round(GRADIENT_COLORS.PINK.r * pinkRatio + GRADIENT_COLORS.TEAL.r * tealRatio),
      g: Math.round(GRADIENT_COLORS.PINK.g * pinkRatio + GRADIENT_COLORS.TEAL.g * tealRatio),
      b: Math.round(GRADIENT_COLORS.PINK.b * pinkRatio + GRADIENT_COLORS.TEAL.b * tealRatio),
    };
  }, []);

  // Calcular el degradado dinámico basado en el estado
  const dynamicGradient = useMemo(() => {
    if (!cardState.isHovered) return defaultGradient;
    
    const { r, g, b } = calculateGradientColor(cardState.glareX);
    return `radial-gradient(circle at ${cardState.glareX}% ${cardState.glareY}%, rgba(${r}, ${g}, ${b}, ${CARD_CONFIG.GLARE_OPACITY}), transparent)`;
  }, [cardState.glareX, cardState.glareY, cardState.isHovered, calculateGradientColor, defaultGradient]);

  // Calcular las propiedades CSS personalizadas para el transform
  const cardTransform = useMemo(() => {
    if (!cardState.isHovered) {
      return `perspective(${CARD_CONFIG.PERSPECTIVE}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateZ(0px)`;
    }
    
    return `perspective(${CARD_CONFIG.PERSPECTIVE}px) rotateX(${cardState.rotateX * 0.5}deg) rotateY(${cardState.rotateY * 0.5}deg) scale3d(${CARD_CONFIG.SCALE_HOVER}, ${CARD_CONFIG.SCALE_HOVER}, ${CARD_CONFIG.SCALE_HOVER}) translateZ(${CARD_CONFIG.TRANSLATE_Z}px)`;
  }, [cardState.rotateX, cardState.rotateY, cardState.isHovered]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Invertir la dirección de la rotación
    const rotateX = (centerY - y) / CARD_CONFIG.ROTATION_SENSITIVITY;
    const rotateY = (x - centerX) / CARD_CONFIG.ROTATION_SENSITIVITY;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    
    setCardState(prev => ({
      ...prev,
      rotateX,
      rotateY,
      glareX,
      glareY,
      isHovered: true,
    }));
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 0) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Invertir la dirección de la rotación
    const rotateX = (centerY - y) / CARD_CONFIG.ROTATION_SENSITIVITY;
    const rotateY = (x - centerX) / CARD_CONFIG.ROTATION_SENSITIVITY;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    
    setCardState(prev => ({
      ...prev,
      rotateX,
      rotateY,
      glareX,
      glareY,
      isHovered: true,
    }));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setCardState(prev => ({
      ...prev,
      rotateX: 0,
      rotateY: 0,
      glareX: 50,
      glareY: 50,
      isHovered: false,
    }));
  }, []);

  const handleTouchEnd = useCallback(() => {
    setCardState(prev => ({
      ...prev,
      rotateX: 0,
      rotateY: 0,
      glareX: 50,
      glareY: 50,
      isHovered: false,
    }));
  }, []);

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative h-full group transition-transform duration-200 ease-out will-change-transform [transform-style:preserve-3d]"
      role="article"
      aria-label={`Propuesta de valor: ${prop.title}`}
      style={{
        transform: cardTransform,
      }}
    >
      {/* Efecto de brillo tenue rosa detrás de la tarjeta al hacer hover */}
      <div className="absolute inset-0 rounded-xl bg-primary/5 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>
      
      <Card className="h-full bg-background/80 backdrop-blur-sm border-border/30 shadow-3d-sm group-hover:shadow-3d-md transition-all duration-700 relative z-0 overflow-hidden [transform-style:preserve-3d]">
        {/* Elemento para el efecto de brillo - ahora usa el degradado calculado */}
        <div 
          className="absolute inset-0 pointer-events-none transition-all duration-300" 
          style={{ background: dynamicGradient }}
        ></div>
        
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
          <ul className="space-y-2 text-sm text-muted-foreground mt-4 transition-all duration-300 group-hover:[transform:translateZ(20px)] group-hover:drop-shadow-[0_12px_24px_rgba(0,0,0,0.4)]">
            {prop.features.map((feature, featureIndex) => (
              <li
                key={featureIndex}
                className="flex items-center justify-center text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-teal-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] group-hover:[transform:translateZ(15px)_scale(1.05)] group-hover:drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)] font-medium transition-all duration-300"
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

ValuePropCard.displayName = 'ValuePropCard';

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
      if (window.scrollY > ANIMATION_CONFIG.SCROLL_THRESHOLD) {
        setShouldAnimate(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    // Verificar si ya hemos scrolleado lo suficiente al cargar la página
    if (window.scrollY > ANIMATION_CONFIG.SCROLL_THRESHOLD) {
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
            transition={{ duration: ANIMATION_CONFIG.DURATION, delay: index * ANIMATION_CONFIG.STAGGER_DELAY }}
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