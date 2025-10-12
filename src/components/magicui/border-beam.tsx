"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  delay?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
}

export const BorderBeam = ({
  className,
  size = 100,
  duration = 10,
  delay = 0,
  borderWidth = 1.5,
  colorFrom = "#ffffff",
  colorTo = "#ffffff",
}: BorderBeamProps) => {
  return (
    <div className="absolute inset-0 rounded-[inherit] overflow-hidden pointer-events-none">
      {/* Top border */}
      <motion.div
        className={cn("absolute top-0 left-[-100%]", className)}
        style={{
          width: `${size}%`,
          height: `${borderWidth}px`,
          background: `linear-gradient(90deg, transparent, ${colorFrom}, ${colorTo}, transparent)`,
        }}
        animate={{
          x: ["0%", "200%"],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          delay: delay,
        }}
      />

      {/* Right border */}
      <motion.div
        className={cn("absolute top-[-100%] right-0", className)}
        style={{
          width: `${borderWidth}px`,
          height: `${size}%`,
          background: `linear-gradient(180deg, transparent, ${colorFrom}, ${colorTo}, transparent)`,
        }}
        animate={{
          y: ["0%", "200%"],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          delay: delay + duration / 4,
        }}
      />

      {/* Bottom border */}
      <motion.div
        className={cn("absolute bottom-0 left-[100%]", className)}
        style={{
          width: `${size}%`,
          height: `${borderWidth}px`,
          background: `linear-gradient(270deg, transparent, ${colorFrom}, ${colorTo}, transparent)`,
        }}
        animate={{
          x: ["0%", "-200%"],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          delay: delay + duration / 2,
        }}
      />

      {/* Left border */}
      <motion.div
        className={cn("absolute top-[100%] left-0", className)}
        style={{
          width: `${borderWidth}px`,
          height: `${size}%`,
          background: `linear-gradient(0deg, transparent, ${colorFrom}, ${colorTo}, transparent)`,
        }}
        animate={{
          y: ["0%", "-200%"],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          delay: delay + (3 * duration) / 4,
        }}
      />
    </div>
  );
};
