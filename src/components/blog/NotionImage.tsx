"use client";

/**
 * Componente Image wrapper con manejo de errores
 * Maneja casos donde las imágenes de Notion no se cargan correctamente
 * 
 * OPTIMIZACIONES NEXT.JS 16:
 * - sizes: Responsive image sizing para diferentes viewports
 * - placeholder: Blur effect para mejor UX durante carga
 * - onError: Fallback graceful para imágenes rotas
 * - unoptimized: Solo para imágenes de Notion (problema de CORS)
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
  loading?: "lazy" | "eager";
  itemProp?: string;
  /**
   * Attribute sizes del estándar HTML responsive images
   * Define qué tamaño tendrá la imagen en diferentes viewports
   * Ayuda al browser a elegir la imagen correcta del srcset
   * 
   * Ejemplos:
   * - Cover image: "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
   * - Thumbnail: "(max-width: 768px) 100vw, 400px"
   * - Related posts: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
   */
  sizes?: string;
}

export function NotionImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  loading = "lazy",
  itemProp,
  sizes
}: NotionImageProps) {
  const [error, setError] = useState(false);

  // Si hay error o no hay src, no renderizar nada
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
      loading={priority ? "eager" : loading}
      itemProp={itemProp}
      onError={() => setError(true)}
      // Forzar unoptimized para imágenes de Notion temporalmente (CORS issues)
      unoptimized={src.includes("notion.so")}
      // Placeholder blur para mejor perceived performance
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      // Responsive image sizing: ayuda al browser a elegir el tamaño correcto
      sizes={sizes}
    />
  );
}
