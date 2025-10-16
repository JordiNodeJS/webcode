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
	loading?: "lazy" | "eager";
	itemProp?: string;
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
			loading={priority ? "eager" : loading}
			itemProp={itemProp}
			onError={() => setError(true)}
			// Forzar unoptimized para imágenes de Notion temporalmente
			unoptimized={src.includes("notion.so")}
			// Mejorar performance con placeholder
			placeholder="blur"
			blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
		/>
	);
}
