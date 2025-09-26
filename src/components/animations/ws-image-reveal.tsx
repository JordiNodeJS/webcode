"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
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
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
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
  );
}
