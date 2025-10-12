"use client";

import { motion } from "framer-motion";
import React, { useCallback, useMemo, useState } from "react";
import { WSFadeIn } from "@/components/animations/ws-fade-in";
import { WSHover } from "@/components/animations/ws-hover";
import { Card, CardContent } from "@/components/ui/card";
import useOnScreen from "@/hooks/use-on-screen";
import { Rocket, Smartphone, Target, Zap } from "@/lib/icons";

// Constantes para efectos 3D
const CARD_CONFIG = {
  ROTATION_SENSITIVITY: 25,
  SCALE_HOVER: 1.01,
  PERSPECTIVE: 1000,
  TRANSLATE_Z: 30,
  ROTATE_FACTOR: 0.5,
  GLARE_OPACITY: 0.15,
  DEFAULT_GLARE_OPACITY: 0.1,
  GLARE_PERCENTAGE_BASE: 100,
} as const;

// Gradientes estáticos para estado idle (NO calculados dinámicamente)
const STATIC_GRADIENTS = {
  idle: "radial-gradient(circle at 50% 50%, rgba(111, 137, 193, 0.1), transparent)",
  card1:
    "radial-gradient(circle at 30% 40%, rgba(178, 62, 176, 0.15), transparent)",
  card2:
    "radial-gradient(circle at 70% 30%, rgba(45, 212, 191, 0.15), transparent)",
  card3:
    "radial-gradient(circle at 40% 70%, rgba(178, 62, 176, 0.15), transparent)",
  card4:
    "radial-gradient(circle at 60% 50%, rgba(45, 212, 191, 0.15), transparent)",
} as const;

// Constantes para colores del degradado (solo para hover)
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
  DURATION: 0.5,
  HOVER_Y_OFFSET: -10, // Desplazamiento vertical en hover
  HOVER_TRANSITION_DURATION: 0.2, // Duración de la transición en hover
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
      "Tailwind CSS v4 - Performance",
    ],
  },
  {
    id: "performance",
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
    id: "mobile",
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
    id: "barcelona",
    icon: <Target className="h-8 w-8 text-secondary-foreground" />,
    title: "Barcelona Local",
    features: [
      "Experiencia con empresas locales",
      "Integración con proveedores locales",
      "Consultas presenciales",
    ],
  },
];

// Componente de tarjeta OPTIMIZADO para idle performance
const IdleOptimizedCard = React.memo(
  ({ prop, index }: { prop: ValueProp; index: number }) => {
    const [cardState, setCardState] = useState<CardState>({
      rotateX: 0,
      rotateY: 0,
      glareX: 50,
      glareY: 50,
      isHovered: false,
    });

    // Solo calcular gradiente dinámico durante hover
    const calculateGradientColor = useCallback((glareX: number) => {
      const pinkRatio = (100 - glareX) / 100;
      const tealRatio = glareX / 100;

      return {
        r: Math.round(
          GRADIENT_COLORS.PINK.r * pinkRatio +
            GRADIENT_COLORS.TEAL.r * tealRatio,
        ),
        g: Math.round(
          GRADIENT_COLORS.PINK.g * pinkRatio +
            GRADIENT_COLORS.TEAL.g * tealRatio,
        ),
        b: Math.round(
          GRADIENT_COLORS.PINK.b * pinkRatio +
            GRADIENT_COLORS.TEAL.b * tealRatio,
        ),
      };
    }, []);

    // Usar gradiente estático para idle, dinámico solo para hover
    const currentGradient = useMemo(() => {
      if (!cardState.isHovered) {
        return (
          STATIC_GRADIENTS[
            `card${index + 1}` as keyof typeof STATIC_GRADIENTS
          ] || STATIC_GRADIENTS.idle
        );
      }

      const { r, g, b } = calculateGradientColor(cardState.glareX);
      return `radial-gradient(circle at ${cardState.glareX}% ${cardState.glareY}%, rgba(${r}, ${g}, ${b}, ${CARD_CONFIG.GLARE_OPACITY}), transparent)`;
    }, [
      cardState.glareX,
      cardState.glareY,
      cardState.isHovered,
      calculateGradientColor,
      index,
    ]);

    // Transform 3D solo durante hover
    const cardTransform = useMemo(() => {
      if (!cardState.isHovered) {
        return "none"; // NO transforms en idle = NO GPU layers
      }

      return `perspective(${CARD_CONFIG.PERSPECTIVE}px) rotateX(${
        cardState.rotateX * CARD_CONFIG.ROTATE_FACTOR
      }deg) rotateY(${
        cardState.rotateY * CARD_CONFIG.ROTATE_FACTOR
      }deg) scale3d(${CARD_CONFIG.SCALE_HOVER}, ${CARD_CONFIG.SCALE_HOVER}, ${
        CARD_CONFIG.SCALE_HOVER
      }) translateZ(${CARD_CONFIG.TRANSLATE_Z}px)`;
    }, [cardState.rotateX, cardState.rotateY, cardState.isHovered]);

    // Throttled mouse move (16ms = 60fps max)
    const lastMoveTime = React.useRef(0);
    const handleMouseMove = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        const now = performance.now();
        if (now - lastMoveTime.current < 16) return; // Throttle to 60fps
        lastMoveTime.current = now;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (centerY - y) / CARD_CONFIG.ROTATION_SENSITIVITY;
        const rotateY = (x - centerX) / CARD_CONFIG.ROTATION_SENSITIVITY;
        const glareX = (x / rect.width) * CARD_CONFIG.GLARE_PERCENTAGE_BASE;
        const glareY = (y / rect.height) * CARD_CONFIG.GLARE_PERCENTAGE_BASE;

        setCardState({
          rotateX,
          rotateY,
          glareX,
          glareY,
          isHovered: true,
        });
      },
      [],
    );

    const handleMouseEnter = useCallback(() => {
      setCardState((prev) => ({ ...prev, isHovered: true }));
    }, []);

    const handleMouseLeave = useCallback(() => {
      setCardState({
        rotateX: 0,
        rotateY: 0,
        glareX: 50,
        glareY: 50,
        isHovered: false,
      });
    }, []);

    const handleTouchMove = useCallback(
      (e: React.TouchEvent<HTMLDivElement>) => {
        if (e.touches.length === 0) return;

        const now = performance.now();
        if (now - lastMoveTime.current < 16) return; // Throttle to 60fps
        lastMoveTime.current = now;

        const rect = e.currentTarget.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (centerY - y) / CARD_CONFIG.ROTATION_SENSITIVITY;
        const rotateY = (x - centerX) / CARD_CONFIG.ROTATION_SENSITIVITY;
        const glareX = (x / rect.width) * CARD_CONFIG.GLARE_PERCENTAGE_BASE;
        const glareY = (y / rect.height) * CARD_CONFIG.GLARE_PERCENTAGE_BASE;

        setCardState({
          rotateX,
          rotateY,
          glareX,
          glareY,
          isHovered: true,
        });
      },
      [],
    );

    const handleTouchEnd = useCallback(() => {
      setCardState({
        rotateX: 0,
        rotateY: 0,
        glareX: 50,
        glareY: 50,
        isHovered: false,
      });
    }, []);

    return (
      <WSHover effect="lift">
        <article
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`
          relative h-full group transition-transform duration-200 ease-out
          ${
            cardState.isHovered
              ? // Solo durante hover: activar GPU layers y 3D context (igual que original)
                "will-change-transform [transform-style:preserve-3d]"
              : // En idle: NO GPU layers, NO 3D context - OPTIMIZACIÓN CLAVE
                ""
          }
        `}
          aria-label={`Propuesta de valor: ${prop.title}`}
          style={{
            transform: cardTransform,
          }}
        >
          {/* Efecto de brillo tenue rosa detrás de la tarjeta al hacer hover - IGUAL QUE ORIGINAL */}
          <div className="absolute inset-0 rounded-xl bg-primary/5 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>

          <Card
            className={`
        h-full bg-white/10 dark:bg-black/10 backdrop-blur-sm border-white/20 dark:border-white/10 relative z-0 overflow-hidden
        ${
          cardState.isHovered
            ? // Durante hover: sombras 3D y efectos avanzados - más visibilidad
              "shadow-3d-sm group-hover:shadow-3d-md transition-all duration-700 [transform-style:preserve-3d] bg-white/20 dark:bg-black/20"
            : // En idle: sombra simple y transparente
              "shadow-3d-sm transition-shadow duration-300"
        }
      `}
          >
            {/* Elemento para el efecto de brillo - IGUAL QUE ORIGINAL */}
            <div
              className="absolute inset-0 pointer-events-none transition-all duration-300"
              style={{ background: currentGradient }}
            ></div>

            <CardContent className="p-6 text-center h-full flex flex-col relative z-10">
              {/* Icono - IGUAL QUE ORIGINAL */}
              <div className="flex justify-center mb-4 group-hover:scale-125 transition-transform duration-300">
                {prop.icon}
              </div>

              {/* Título - Con sombra para mejor legibilidad en fondo transparente */}
              <h3 className="text-lg font-bold text-foreground mb-4 transition duration-300 transform-gpu group-hover:[transform:translateZ(50px)] drop-shadow-sm">
                {prop.title}
              </h3>

              {/* Lista de características - Con mejor contraste para fondo transparente */}
              <ul className="space-y-2 text-sm text-muted-foreground mt-4 transition-all duration-300 group-hover:[transform:translateZ(20px)]">
                {prop.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center justify-center text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-teal-500 group-hover:[transform:translateZ(15px)_scale(1.05)] font-medium transition-all duration-300 drop-shadow-sm"
                    style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)" }}
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
  },
);

IdleOptimizedCard.displayName = "IdleOptimizedCard";

/**
 * Grid de propuestas de valor OPTIMIZADO para rendimiento en reposo
 *
 * Diferencias clave:
 * - NO usa will-change-transform en estado idle
 * - NO mantiene preserve-3d activo permanentemente
 * - Gradientes estáticos para estado idle
 * - Transiciones 3D solo durante hover
 * - Event throttling a 60fps
 * - Sin WSHover (Framer Motion) innecesario
 */
export const IdleOptimizedValuePropsGrid = React.memo(() => {
  const { ref, isIntersecting } = useOnScreen(
    VALUE_PROPS_GRID_CONFIG.INTERSECTION_THRESHOLD,
  );
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

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

  // Renderizar placeholders si no es visible aún
  if (!hasBeenVisible) {
    return (
      <div className="w-full max-w-6xl mx-auto mt-16">
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[384px]"
          data-testid="value-props-grid"
        >
          {Array.from({
            length: VALUE_PROPS_GRID_CONFIG.PLACEHOLDER_COUNT,
          }).map((_, index) => (
            <div
              key={`placeholder-idle-${VALUE_PROPS_GRID_CONFIG.PLACEHOLDER_COUNT}-${index}`}
              className="h-full opacity-0"
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto mt-16">
      {/* Contenedor con ref para IntersectionObserver */}
      <div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[384px]"
        aria-hidden={!hasBeenVisible}
      >
        {valueProps.map((prop, index) => (
          <WSFadeIn
            key={prop.id}
            delay={
              prefersReducedMotion ? 0 : index * ANIMATION_CONFIG.STAGGER_DELAY
            }
          >
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : ANIMATION_CONFIG.DURATION,
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
                        duration: ANIMATION_CONFIG.HOVER_TRANSITION_DURATION,
                      },
                    }
              }
              className="h-full"
            >
              <IdleOptimizedCard prop={prop} index={index} />
            </motion.div>
          </WSFadeIn>
        ))}
      </div>
    </div>
  );
});

IdleOptimizedValuePropsGrid.displayName = "IdleOptimizedValuePropsGrid";
