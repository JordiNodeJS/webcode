"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { wsConfig } from "@/lib/webcode-motion-config";

interface WSFadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  className?: string;
}

export function WSFadeIn({
  children,
  delay = 0,
  direction = "up",
  distance = 20,
  className = "",
}: WSFadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const directionOffset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...directionOffset[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
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