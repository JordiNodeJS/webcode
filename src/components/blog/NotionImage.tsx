"use client";

/**
 * Componente Image wrapper con manejo de errores
 * Maneja casos donde las imágenes de Notion no se cargan correctamente
 */

import Image from "next/image";
import { useState } from "react";

interface NotionImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

export function NotionImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
}: NotionImageProps) {
  const [error, setError] = useState(false);

  // Si hay error, no renderizar nada
  if (error || !src) {
    return null;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      onError={() => setError(true)}
      // Forzar unoptimized para imágenes de Notion temporalmente
      unoptimized={src.includes("notion.so")}
    />
  );
}
