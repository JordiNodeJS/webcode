"use client";

/**
 * Iconos Personalizados de WebCode
 *
 * Iconos únicos que representan la identidad de marca de WebCode
 * Diseñados específicamente para diferenciarse de otras webs
 */

interface WebCodeIconProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "primary" | "secondary" | "accent";
  className?: string;
}

// Icono principal de WebCode - Código con corazón
export function WebCodeLogo({
  size = "md",
  variant = "primary",
  className
}: WebCodeIconProps) {
  return (
    <svg
      className={`${getSizeClasses(size)} ${getVariantClasses(variant)} ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="WebCode Logo"
    >
      <title>WebCode - Desarrollo Web Barcelona</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 20l4-16m4 4l4 4-4 4-4-4M6 16l-4-4 4-4 4 4M12 2l2 2M12 22l2-2M8 8l8 8M8 16l8-8"
      />
    </svg>
  );
}

// Icono de desarrollo web brutalista
export function WebCodeDev({
  size = "md",
  variant = "primary",
  className
}: WebCodeIconProps) {
  return (
    <svg
      className={`${getSizeClasses(size)} ${getVariantClasses(variant)} ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Desarrollo Web WebCode"
    >
      <title>Desarrollo Web Barcelona</title>
      <rect
        x="2"
        y="3"
        width="20"
        height="14"
        rx="2"
        ry="2"
        strokeWidth={2.5}
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 21l8 0"
        strokeWidth={2.5}
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 17l0 4"
        strokeWidth={2.5}
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 7l4 4-4 4"
        strokeWidth={2.5}
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18 7l-4 4 4 4"
        strokeWidth={2.5}
      />
    </svg>
  );
}

// Icono de Barcelona/España
export function BarcelonaIcon({
  size = "md",
  variant = "primary",
  className
}: WebCodeIconProps) {
  return (
    <svg
      className={`${getSizeClasses(size)} ${getVariantClasses(variant)} ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Barcelona"
    >
      <title>Barcelona, España</title>
      <circle cx="12" cy="12" r="10" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2l2 4h4l-2 2 2 2-4 2-2 4-2-4-4-2 2-2-2-2h4l2-4z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 12h8M12 8v8"
        strokeWidth={1.5}
      />
    </svg>
  );
}

// Icono de calidad brutalista
export function QualityIcon({
  size = "md",
  variant = "primary",
  className
}: WebCodeIconProps) {
  return (
    <svg
      className={`${getSizeClasses(size)} ${getVariantClasses(variant)} ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Calidad WebCode"
    >
      <title>Garantía de Calidad</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        strokeWidth={2.5}
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2v4M12 18v4M2 12h4M18 12h4"
        strokeWidth={1.5}
      />
    </svg>
  );
}

// Icono de innovación
export function InnovationIcon({
  size = "md",
  variant = "primary",
  className
}: WebCodeIconProps) {
  return (
    <svg
      className={`${getSizeClasses(size)} ${getVariantClasses(variant)} ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Innovación WebCode"
    >
      <title>Innovación y Tecnología</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 10V3L4 14h7v7l9-11h-7zM9.5 12l2.5 2.5L15 12M9.5 16l2.5 2.5L15 16"
      />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

// Icono de proceso de desarrollo
export function ProcessIcon({
  size = "md",
  variant = "primary",
  className
}: WebCodeIconProps) {
  return (
    <svg
      className={`${getSizeClasses(size)} ${getVariantClasses(variant)} ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Proceso WebCode"
    >
      <title>Proceso de Desarrollo</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
        strokeWidth={2.5}
      />
      <circle cx="4" cy="6" r="2" fill="currentColor" />
      <circle cx="4" cy="12" r="2" fill="currentColor" />
      <circle cx="4" cy="18" r="2" fill="currentColor" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 6h12M8 12h12M8 18h12"
        strokeWidth={1.5}
      />
    </svg>
  );
}

// Icono de colaboración
export function CollaborationIcon({
  size = "md",
  variant = "primary",
  className
}: WebCodeIconProps) {
  return (
    <svg
      className={`${getSizeClasses(size)} ${getVariantClasses(variant)} ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Colaboración WebCode"
    >
      <title>Colaboración y Comunicación</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 10v4M8 12h8"
        strokeWidth={1.5}
      />
    </svg>
  );
}

// Icono de resultado final
export function SuccessIcon({
  size = "md",
  variant = "primary",
  className
}: WebCodeIconProps) {
  return (
    <svg
      className={`${getSizeClasses(size)} ${getVariantClasses(variant)} ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Éxito WebCode"
    >
      <title>Proyecto Exitoso</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        strokeWidth={2.5}
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2v4M12 18v4M2 12h4M18 12h4"
        strokeWidth={1.5}
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 8l8 8M16 8l-8 8"
        strokeWidth={1}
        opacity={0.3}
      />
    </svg>
  );
}

// Funciones auxiliares
function getSizeClasses(size: string): string {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12"
  };
  return sizes[size as keyof typeof sizes] || sizes.md;
}

function getVariantClasses(variant: string): string {
  const variants = {
    default: "text-foreground",
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent"
  };
  return variants[variant as keyof typeof variants] || variants.default;
}

// Mapeo de iconos personalizados para uso fácil
export const WEBCODE_ICONS = {
  logo: WebCodeLogo,
  dev: WebCodeDev,
  barcelona: BarcelonaIcon,
  quality: QualityIcon,
  innovation: InnovationIcon,
  process: ProcessIcon,
  collaboration: CollaborationIcon,
  success: SuccessIcon
} as const;

export type WebCodeIconName = keyof typeof WEBCODE_ICONS;
