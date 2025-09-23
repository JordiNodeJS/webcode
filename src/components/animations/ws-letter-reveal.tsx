"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <span ref={ref} className={className}>
      {text.split("").map((letter, index) => (
        <motion.span
          key={`${text}-${index}-${letter}`}
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
  );
}
