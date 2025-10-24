"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useId, Suspense } from "react";
import { wsConfig } from "@/lib/webcode-motion-config";

interface WSFadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  className?: string;
  _sectionId?: string; // Prefijo _ para parámetros no utilizados
}

export function WSFadeIn({
  children,
  delay = 0,
  direction = "up",
  distance = 20,
  className = "",
  _sectionId = ""
}: WSFadeInProps) {
  const id = useId(); // React 19: IDs estables para SSR
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // En cliente: renderizar con animación
  const getInitialPosition = () => {
    switch (direction) {
      case "up": return { opacity: 0, y: distance };
      case "down": return { opacity: 0, y: -distance };
      case "left": return { opacity: 0, x: distance };
      case "right": return { opacity: 0, x: -distance };
      default: return { opacity: 0, y: distance };
    }
  };

  return (
    <Suspense fallback={<div className={className}>{children}</div>}>
      <motion.div
        ref={ref}
        key={id} // Evita conflictos de hidratación
        initial={getInitialPosition()}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{
          duration: wsConfig.durations.normal,
          ease: wsConfig.easings.primary,
          delay
        }}
        className={className}
      >
        {children}
      </motion.div>
    </Suspense>
  );
}
