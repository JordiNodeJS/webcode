"use client";

import { motion } from "framer-motion";
import { Rocket, Smartphone, Target, Zap } from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";
import { WSFadeIn } from "@/components/animations/ws-fade-in";
import { WSHover } from "@/components/animations/ws-hover";
import { Card, CardContent } from "@/components/ui/card";
import useOnScreen from "@/hooks/use-on-screen";

// Constantes para efectos 3D
const CARD_CONFIG = {
  ROTATION_SENSITIVITY: 25, // Aumentado para menor rotación (más sutil)
  SCALE_HOVER: 1.01, // Reducido para un efecto más sutil
  PERSPECTIVE: 1000, // Aumentado para menor perspectiva (más sutil)
  TRANSLATE_Z: 30, // Valor Z reducido para efecto 3D más sutil
  ROTATE_FACTOR: 0.5, // Factor de rotación para suavizar el efecto 3D
  ROTATE_X: 5, // Rotación en eje X reducida
  GLARE_OPACITY: 0.15, // Reducido para menos brillo
  DEFAULT_GLARE_OPACITY: 0.1,
  GLARE_PERCENTAGE_BASE: 100 // Base para calcular porcentajes de brillo
} as const;

// Constantes para colores del degradado
const GRADIENT_COLORS = {
  PINK: { r: 178, g: 62, b: 176 },
  TEAL: { r: 45, g: 212, b: 191 },
  DEFAULT: { r: 111, g: 137, b: 193 }
} as const;

// Constantes para el grid de propuestas de valor
const VALUE_PROPS_GRID_CONFIG = {
  INTERSECTION_THRESHOLD: 0.6, // Umbral de intersección para detectar visibilidad
  PLACEHOLDER_COUNT: 4 // Número de placeholders para evitar layout shift
} as const;

// Constantes para animaciones
const ANIMATION_CONFIG = {
  STAGGER_DELAY: 0.1,
  DURATION: 0.5,
  HOVER_Y_OFFSET: -10, // Desplazamiento vertical en hover
  HOVER_TRANSITION_DURATION: 0.2 // Duración de la transición en hover
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
  id: string;
  icon: React.ReactNode;
  title: string;
  features: string[];
}

const valueProps: ValueProp[] = [
  {
    id: "tecnologia",
    icon: <Rocket className="h-8 w-8 text-primary" />,
    title: "Tecnología 2025",
    features: [
      "Next.js 15 - App Router",
      "React 19 - Server Components",
      "Astro 5 - Static sites",
      "Tailwind CSS v4 - Performance"
    ]
  },
  {
    id: "performance",
    icon: <Zap className="h-8 w-8 text-secondary-foreground" />,
    title: "Performance Garantizado",
    features: [
      "<2.5s tiempo de carga",
      "99.9% uptime garantizado",
      "Core Web Vitals en verde",
      "CDN global optimizado"
    ]
  },
  {
    id: "mobile",
    icon: <Smartphone className="h-8 w-8 text-primary" />,
    title: "Mobile-First",
    features: [
      "Responsive design",
      "Accesible WCAG 2.1 AA",
      "Progressive Web Apps",
      "Touch-friendly UX"
    ]
  },
  {
    id: "barcelona",
    icon: <Target className="h-8 w-8 text-secondary-foreground" />,
    title: "Barcelona Local",
    features: [
      "Experiencia con empresas locales",
      "Integración con proveedores locales",
      "Consultas presenciales"
    ]
  }
];

// Componente para una tarjeta individual con efecto 3D (refactorizado sin manipulación directa del DOM)
const ValuePropCard = React.memo(({ prop }: { prop: ValueProp }) => {
  const [cardState, setCardState] = useState<CardState>({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
    isHovered: false
  });

  // Memoizar el degradado por defecto
  const defaultGradient = useMemo(
    () =>
      `radial-gradient(circle at 50% 50%, rgba(${GRADIENT_COLORS.DEFAULT.r}, ${GRADIENT_COLORS.DEFAULT.g}, ${GRADIENT_COLORS.DEFAULT.b}, ${CARD_CONFIG.DEFAULT_GLARE_OPACITY}), transparent)`,
    []
  );

  // Memoizar los cálculos de color para evitar recálculos innecesarios
  const calculateGradientColor = useCallback((glareX: number) => {
    const pinkRatio = (100 - glareX) / 100;
    const tealRatio = glareX / 100;

    return {
      r: Math.round(
        GRADIENT_COLORS.PINK.r * pinkRatio + GRADIENT_COLORS.TEAL.r * tealRatio
      ),
      g: Math.round(
        GRADIENT_COLORS.PINK.g * pinkRatio + GRADIENT_COLORS.TEAL.g * tealRatio
      ),
      b: Math.round(
        GRADIENT_COLORS.PINK.b * pinkRatio + GRADIENT_COLORS.TEAL.b * tealRatio
      )
    };
  }, []);

  // Calcular el degradado dinámico basado en el estado
  const dynamicGradient = useMemo(() => {
    if (!cardState.isHovered) return defaultGradient;

    const { r, g, b } = calculateGradientColor(cardState.glareX);
    return `radial-gradient(circle at ${cardState.glareX}% ${cardState.glareY}%, rgba(${r}, ${g}, ${b}, ${CARD_CONFIG.GLARE_OPACITY}), transparent)`;
  }, [
    cardState.glareX,
    cardState.glareY,
    cardState.isHovered,
    calculateGradientColor,
    defaultGradient
  ]);

  // Calcular las propiedades CSS personalizadas para el transform
  const cardTransform = useMemo(() => {
    if (!cardState.isHovered) {
      return `perspective(${CARD_CONFIG.PERSPECTIVE}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateZ(0px)`;
    }

    return `perspective(${CARD_CONFIG.PERSPECTIVE}px) rotateX(${
      cardState.rotateX * CARD_CONFIG.ROTATE_FACTOR
    }deg) rotateY(${
      cardState.rotateY * CARD_CONFIG.ROTATE_FACTOR
    }deg) scale3d(${CARD_CONFIG.SCALE_HOVER}, ${CARD_CONFIG.SCALE_HOVER}, ${
      CARD_CONFIG.SCALE_HOVER
    }) translateZ(${CARD_CONFIG.TRANSLATE_Z}px)`;
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
    const glareX = (x / rect.width) * CARD_CONFIG.GLARE_PERCENTAGE_BASE;
    const glareY = (y / rect.height) * CARD_CONFIG.GLARE_PERCENTAGE_BASE;

    setCardState((prev) => ({
      ...prev,
      rotateX,
      rotateY,
      glareX,
      glareY,
      isHovered: true
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
    const glareX = (x / rect.width) * CARD_CONFIG.GLARE_PERCENTAGE_BASE;
    const glareY = (y / rect.height) * CARD_CONFIG.GLARE_PERCENTAGE_BASE;

    setCardState((prev) => ({
      ...prev,
      rotateX,
      rotateY,
      glareX,
      glareY,
      isHovered: true
    }));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setCardState((prev) => ({
      ...prev,
      rotateX: 0,
      rotateY: 0,
      glareX: 50,
      glareY: 50,
      isHovered: false
    }));
  }, []);

  const handleTouchEnd = useCallback(() => {
    setCardState((prev) => ({
      ...prev,
      rotateX: 0,
      rotateY: 0,
      glareX: 50,
      glareY: 50,
      isHovered: false
    }));
  }, []);

  return (
    <WSHover effect="lift">
      <article
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative h-full group transition-transform duration-200 ease-out will-change-transform [transform-style:preserve-3d]"
        aria-label={`Propuesta de valor: ${prop.title}`}
        style={{
          transform: cardTransform
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
            <h3 className="text-lg font-bold text-foreground mb-4 transition duration-300 transform-gpu group-hover:[transform:translateZ(50px)]">
              {prop.title}
            </h3>

            {/* Lista de características */}
            <ul className="space-y-2 text-sm text-muted-foreground mt-4 transition-all duration-300 group-hover:[transform:translateZ(20px)]">
              {prop.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center justify-center text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-teal-500 group-hover:[transform:translateZ(15px)_scale(1.05)] font-medium transition-all duration-300"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </article>
    </WSHover>
  );
});

ValuePropCard.displayName = "ValuePropCard";

/**
 * Grid de propuestas de valor
 *
 * Server Component que renderiza las 4 propuestas de valor principales
 * de WebCode en un grid responsive con cards y efectos 3D.
 */
export const ValuePropsGrid = React.memo(() => {
  const { ref, isIntersecting } = useOnScreen(
    VALUE_PROPS_GRID_CONFIG.INTERSECTION_THRESHOLD
  );
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detectar preferencia de movimiento reducido
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);

      const handler = (event: MediaQueryListEvent) => {
        setPrefersReducedMotion(event.matches);
      };

      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    }
  }, []);

  // Actualizar el estado de visibilidad persistente
  React.useEffect(() => {
    if (isIntersecting) {
      setHasBeenVisible(true);
    }
  }, [isIntersecting]);

  // Memoizar el array de props para evitar re-renders innecesarios
  const memoizedValueProps = useMemo(() => valueProps, []);

  return (
    <div className="w-full max-w-6xl mx-auto mt-16">
      {/* Contenedor con ref para IntersectionObserver */}
      <div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[384px]"
        aria-hidden={!hasBeenVisible}
      >
        {!hasBeenVisible
          ? // Placeholder para evitar layout shift
            [...Array(VALUE_PROPS_GRID_CONFIG.PLACEHOLDER_COUNT)].map(
              (_, index) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: Placeholders estáticos sin cambio de orden
                  key={`placeholder-basic-${index}`}
                  className="h-full opacity-0"
                ></div>
              )
            )
          : // Renderizar las tarjetas cuando el elemento ha sido visible
            memoizedValueProps.map((prop, index) => (
              <WSFadeIn
                key={`${prop.title}-${index}`}
                delay={0.1 + index * 0.1}
              >
                <motion.div
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: prefersReducedMotion
                      ? 0
                      : ANIMATION_CONFIG.DURATION,
                    delay: prefersReducedMotion
                      ? 0
                      : index * ANIMATION_CONFIG.STAGGER_DELAY
                  }}
                  whileHover={
                    prefersReducedMotion
                      ? {}
                      : {
                          y: ANIMATION_CONFIG.HOVER_Y_OFFSET,
                          transition: {
                            duration: ANIMATION_CONFIG.HOVER_TRANSITION_DURATION
                          }
                        }
                  }
                  className="h-full"
                >
                  <ValuePropCard prop={prop} />
                </motion.div>
              </WSFadeIn>
            ))}
      </div>
    </div>
  );
});

ValuePropsGrid.displayName = "ValuePropsGrid";
