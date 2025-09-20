"use client";

import { motion } from "framer-motion";
import { Rocket, Smartphone, Target, Zap } from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";
import { WSFadeIn } from "@/components/animations/ws-fade-in";
import { Card, CardContent } from "@/components/ui/card";
import useOnScreen from "@/hooks/use-on-screen";

// Constantes optimizadas para mejor rendimiento
const CARD_CONFIG = {
  ROTATION_SENSITIVITY: 30, // Aumentado para rotación más sutil
  SCALE_HOVER: 1.02, // Más sutil
  PERSPECTIVE: 800, // Reducido para menor carga
  TRANSLATE_Z: 20, // Reducido
  ROTATE_FACTOR: 0.3, // Más sutil
  GLARE_OPACITY: 0.12, // Reducido
  DEFAULT_GLARE_OPACITY: 0.05, // Muy sutil para reposo
  GLARE_PERCENTAGE_BASE: 100,
} as const;

// Gradientes pre-calculados para optimizar rendimiento en reposo
const STATIC_GRADIENTS = {
  pink: "radial-gradient(circle at 30% 30%, rgba(178, 62, 176, 0.08), transparent)",
  teal: "radial-gradient(circle at 70% 70%, rgba(45, 212, 191, 0.08), transparent)",
  default:
    "radial-gradient(circle at 50% 50%, rgba(111, 137, 193, 0.05), transparent)",
  purple:
    "radial-gradient(circle at 60% 40%, rgba(147, 51, 234, 0.08), transparent)",
} as const;

const GRADIENT_COLORS = {
  PINK: { r: 178, g: 62, b: 176 },
  TEAL: { r: 45, g: 212, b: 191 },
  DEFAULT: { r: 111, g: 137, b: 193 },
} as const;

const VALUE_PROPS_GRID_CONFIG = {
  INTERSECTION_THRESHOLD: 0.6,
  PLACEHOLDER_COUNT: 4,
} as const;

const ANIMATION_CONFIG = {
  STAGGER_DELAY: 0.1,
  DURATION: 0.4, // Reducido para mejor rendimiento
  HOVER_Y_OFFSET: -6, // Más sutil
  HOVER_TRANSITION_DURATION: 0.15, // Más rápido
} as const;

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
  staticGradient: keyof typeof STATIC_GRADIENTS;
}

const valueProps: ValueProp[] = [
  {
    id: "tecnologia",
    icon: <Rocket className="h-8 w-8 text-primary" />,
    title: "Tecnología 2025",
    staticGradient: "pink",
    features: [
      "Next.js 15 - App Router",
      "React 19 - Server Components",
      "Astro 5 - Static sites",
      "Tailwind CSS v4 - Performance",
    ],
  },
  {
    id: "performance",
    icon: <Zap className="h-8 w-8 text-secondary-foreground" />,
    title: "Performance Garantizado",
    staticGradient: "teal",
    features: [
      "<2.5s tiempo de carga",
      "99.9% uptime garantizado",
      "Core Web Vitals en verde",
      "CDN global optimizado",
    ],
  },
  {
    id: "mobile",
    icon: <Smartphone className="h-8 w-8 text-primary" />,
    title: "Mobile-First",
    staticGradient: "purple",
    features: [
      "Responsive design",
      "Accesible WCAG 2.1 AA",
      "Progressive Web Apps",
      "Touch-friendly UX",
    ],
  },
  {
    id: "barcelona",
    icon: <Target className="h-8 w-8 text-secondary-foreground" />,
    title: "Barcelona Local",
    staticGradient: "default",
    features: [
      "Experiencia con empresas locales",
      "Integración con proveedores locales",
      "Consultas presenciales",
    ],
  },
];

// Hook para throttling de eventos (optimización de rendimiento)
const useThrottledCallback = <T extends (...args: never[]) => void>(
  callback: T,
  delay: number = 16,
): T => {
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  return React.useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current) return; // Skip si ya hay una actualización pendiente

      timeoutRef.current = setTimeout(() => {
        callback(...args);
        timeoutRef.current = null;
      }, delay);
    }) as T,
    [],
  );
};

// Componente optimizado para rendimiento
const PerformanceOptimizedCard = React.memo(({ prop }: { prop: ValueProp }) => {
  const [isActive, setIsActive] = useState(false); // Solo true cuando realmente está en hover
  const [cardState, setCardState] = useState<CardState>({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
    isHovered: false,
  });

  // Default state para reset rápido
  const defaultState = useMemo(
    () => ({
      rotateX: 0,
      rotateY: 0,
      glareX: 50,
      glareY: 50,
      isHovered: false,
    }),
    [],
  );

  // Cálculo del color optimizado con memoización
  const calculateGradientColor = useCallback((glareX: number) => {
    const pinkRatio = (100 - glareX) / 100;
    const tealRatio = glareX / 100;

    return {
      r: Math.round(
        GRADIENT_COLORS.PINK.r * pinkRatio + GRADIENT_COLORS.TEAL.r * tealRatio,
      ),
      g: Math.round(
        GRADIENT_COLORS.PINK.g * pinkRatio + GRADIENT_COLORS.TEAL.g * tealRatio,
      ),
      b: Math.round(
        GRADIENT_COLORS.PINK.b * pinkRatio + GRADIENT_COLORS.TEAL.b * tealRatio,
      ),
    };
  }, []);

  // Transform optimizado - solo calcular cuando está activo
  const cardTransform = useMemo(() => {
    if (!isActive) return "none";

    return `perspective(${CARD_CONFIG.PERSPECTIVE}px) rotateX(${
      cardState.rotateX * CARD_CONFIG.ROTATE_FACTOR
    }deg) rotateY(${
      cardState.rotateY * CARD_CONFIG.ROTATE_FACTOR
    }deg) scale3d(${CARD_CONFIG.SCALE_HOVER}, ${CARD_CONFIG.SCALE_HOVER}, ${
      CARD_CONFIG.SCALE_HOVER
    }) translateZ(${CARD_CONFIG.TRANSLATE_Z}px)`;
  }, [cardState.rotateX, cardState.rotateY, isActive]);

  // Gradiente optimizado - estático en reposo, dinámico solo en hover activo
  const gradientStyle = useMemo(() => {
    if (!isActive || !cardState.isHovered) {
      return STATIC_GRADIENTS[prop.staticGradient];
    }

    const { r, g, b } = calculateGradientColor(cardState.glareX);
    return `radial-gradient(circle at ${cardState.glareX}% ${cardState.glareY}%, rgba(${r}, ${g}, ${b}, ${CARD_CONFIG.GLARE_OPACITY}), transparent)`;
  }, [
    cardState.glareX,
    cardState.glareY,
    cardState.isHovered,
    isActive,
    prop.staticGradient,
    calculateGradientColor,
  ]);

  // Throttled mouse move para optimizar rendimiento
  const throttledMouseMove = useThrottledCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isActive) return; // No procesar si no está activo

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

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
        isHovered: true,
      }));
    },
    16,
  ); // 60fps máximo

  const handleMouseEnter = useCallback(() => {
    setIsActive(true); // Activar layer de compositing
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsActive(false); // Desactivar layer de compositing
    setCardState(defaultState); // Reset inmediato sin transición
  }, [defaultState]);

  const handleTouchStart = useCallback(() => {
    setIsActive(true);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsActive(false);
    setCardState(defaultState);
  }, [defaultState]);

  return (
    <article
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={throttledMouseMove} // Solo procesamos si isActive es true
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`
        relative h-full group transition-transform duration-200 ease-out
        ${isActive ? "will-change-transform [transform-style:preserve-3d]" : ""}
        contain-layout contain-style contain-paint
      `}
      aria-label={`Propuesta de valor: ${prop.title}`}
      style={{
        transform: cardTransform, // Solo aplicar transform cuando está activo
      }}
    >
      {/* Efecto de brillo de fondo - solo visible en hover activo */}
      <div
        className={`
          absolute inset-0 rounded-xl bg-primary/5 blur-lg -z-10
          ${
            isActive
              ? "opacity-100 transition-opacity duration-300"
              : "opacity-0 transition-none"
          }
        `}
      />

      <Card className="h-full bg-background/80 backdrop-blur-sm border-border/30 shadow-3d-sm group-hover:shadow-3d-md relative z-0 overflow-hidden transition-shadow duration-300 [transform-style:preserve-3d]">
        {/* Gradiente optimizado - estático en reposo */}
        <div
          className={`
            absolute inset-0 pointer-events-none
            ${isActive ? "transition-all duration-200" : "transition-none"}
          `}
          style={{ background: gradientStyle }}
        />

        <CardContent className="p-6 text-center h-full flex flex-col relative z-10">
          {/* Icono con animación optimizada */}
          <div
            className={`
            flex justify-center mb-4 transition-transform duration-200
            ${isActive ? "group-hover:scale-110" : ""}
          `}
          >
            {prop.icon}
          </div>

          {/* Título */}
          <h3
            className={`
            text-lg font-bold text-foreground mb-4 transition-transform duration-200
            ${isActive ? "group-hover:[transform:translateZ(30px)]" : ""}
          `}
          >
            {prop.title}
          </h3>

          {/* Lista de características */}
          <ul
            className={`
            space-y-2 text-sm text-muted-foreground mt-4 transition-all duration-200
            ${isActive ? "group-hover:[transform:translateZ(15px)]" : ""}
          `}
          >
            {prop.features.map((feature) => (
              <li
                key={feature}
                className={`
                  flex items-center justify-center text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-teal-500 font-medium transition-all duration-200
                  ${
                    isActive
                      ? "group-hover:[transform:translateZ(10px)_scale(1.02)]"
                      : ""
                  }
                `}
              >
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </article>
  );
});

PerformanceOptimizedCard.displayName = "PerformanceOptimizedCard";

/**
 * Grid de propuestas de valor OPTIMIZADO para rendimiento
 *
 * Mejoras implementadas:
 * - Gradientes estáticos en reposo
 * - will-change condicional
 * - Throttling de eventos mousemove
 * - CSS contain properties
 * - Transforms optimizados
 */
export const ValuePropsGridOptimized = React.memo(() => {
  const { ref, isIntersecting } = useOnScreen(
    VALUE_PROPS_GRID_CONFIG.INTERSECTION_THRESHOLD,
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

  React.useEffect(() => {
    if (isIntersecting) {
      setHasBeenVisible(true);
    }
  }, [isIntersecting]);

  const memoizedValueProps = useMemo(() => valueProps, []);

  return (
    <div className="w-full max-w-6xl mx-auto mt-16">
      <div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[384px]"
        aria-hidden={!hasBeenVisible}
      >
        {!hasBeenVisible
          ? [...Array(VALUE_PROPS_GRID_CONFIG.PLACEHOLDER_COUNT)].map(
              (_, index) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: Placeholders estáticos sin cambio de orden
                  key={`placeholder-optimized-${index}`}
                  className="h-full opacity-0"
                ></div>
              ),
            )
          : memoizedValueProps.map((prop, index) => (
              <WSFadeIn
                key={`${prop.title}-${index}`}
                delay={0.05 + index * 0.05} // Delays más cortos
              >
                <motion.div
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: prefersReducedMotion
                      ? 0
                      : ANIMATION_CONFIG.DURATION,
                    delay: prefersReducedMotion
                      ? 0
                      : index * ANIMATION_CONFIG.STAGGER_DELAY,
                  }}
                  whileHover={
                    prefersReducedMotion
                      ? {}
                      : {
                          y: ANIMATION_CONFIG.HOVER_Y_OFFSET,
                          transition: {
                            duration:
                              ANIMATION_CONFIG.HOVER_TRANSITION_DURATION,
                          },
                        }
                  }
                  className="h-full"
                >
                  <PerformanceOptimizedCard prop={prop} />
                </motion.div>
              </WSFadeIn>
            ))}
      </div>
    </div>
  );
});

ValuePropsGridOptimized.displayName = "ValuePropsGridOptimized";
