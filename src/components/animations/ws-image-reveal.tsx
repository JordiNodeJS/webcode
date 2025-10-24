"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useId, Suspense } from "react";
import { wsConfig } from "@/lib/webcode-motion-config";

interface WSImageRevealProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

export function WSImageReveal({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false
}: WSImageRevealProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const id = useId(); // React 19: IDs estables para SSR

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // En servidor: renderizar sin animación
  if (!isMounted) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  // En cliente: renderizar con animación
  return (
    <Suspense fallback={
      <div className={`overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="w-full h-full object-cover"
        />
      </div>
    }>
      <motion.div
        key={id} // Evita conflictos de hidratación
        className={`overflow-hidden ${className}`}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={isLoaded ? { scale: 1, opacity: 1 } : {}}
        transition={{
          duration: wsConfig.durations.dramatic,
          ease: wsConfig.easings.primary
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          onLoad={() => setIsLoaded(true)}
          className="w-full h-full object-cover"
        />
      </motion.div>
    </Suspense>
  );
}
