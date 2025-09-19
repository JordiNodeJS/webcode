"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { wsConfig } from "@/lib/webcode-motion-config";
import { useAnimationContext } from "@/contexts/AnimationContext";

interface WSFadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  className?: string;
  sectionId?: string;
}

export function WSFadeIn({
  children,
  delay = 0,
  direction = "up",
  distance = 20,
  className = "",
  sectionId = "",
}: WSFadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { isAnimationEnabled, disabledSections } = useAnimationContext();

  const directionOffset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };

  // Determinar si la animación debe ejecutarse
  const shouldAnimate =
    isAnimationEnabled && !disabledSections.has(sectionId) && isInView;

  // Si las animaciones están deshabilitadas, mostrar directamente sin animación
  if (!isAnimationEnabled || disabledSections.has(sectionId)) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...directionOffset[direction] }}
      animate={shouldAnimate ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration: wsConfig.durations.smooth,
        ease: wsConfig.easings.primary,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
