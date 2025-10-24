"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useId, Suspense } from "react";
import { wsConfig } from "@/lib/webcode-motion-config";

interface WSLetterRevealProps {
  text: string;
  delay?: number;
  className?: string;
}

export function WSLetterReveal({
  text,
  delay = 0,
  className = ""
}: WSLetterRevealProps) {
  const [isMounted, setIsMounted] = useState(false);
  const id = useId(); // React 19: IDs estables para SSR
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // En servidor: renderizar sin animación
  if (!isMounted) {
    return (
      <span className={className}>
        {text}
      </span>
    );
  }

  // En cliente: renderizar con animación
  return (
    <Suspense fallback={<span className={className}>{text}</span>}>
      <span ref={ref} className={className}>
        {text.split("").map((letter, index) => (
          <motion.span
            key={`${id}-${index}-${letter}`} // Usar ID estable
            initial={{ opacity: 0, y: 20, rotateX: 90 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{
              duration: wsConfig.durations.normal,
              ease: wsConfig.easings.primary,
              delay: delay + index * wsConfig.stagger.tight
            }}
            style={{ display: "inline-block" }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </span>
    </Suspense>
  );
}
