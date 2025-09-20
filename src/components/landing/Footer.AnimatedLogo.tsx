"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Props para el componente AnimatedLogo
 */
interface AnimatedLogoProps {
  /** Tamaño del logo */
  size?: "sm" | "md" | "lg" | "xl";
  /** Clase CSS adicional */
  className?: string;
  /** Ancho personalizado (opcional, sobrescribe size) */
  width?: string;
  /** Alto personalizado (opcional, sobrescribe size) */
  height?: string;
  /** Deshabilitar animación */
  disabled?: boolean;
  /** Título del logo */
  title?: string;
}

/**
 * AnimatedLogo - Logo animado reutilizable con props configurables
 *
 * Componente flexible que permite controlar tamaño, animación y estilos
 * Manteniendo los colores y gradientes del tema WEBCODE
 */
export function AnimatedLogo({
  size = "lg",
  className = "",
  width,
  height,
  disabled = false,
  title = "Logo animado WEBCODE",
}: AnimatedLogoProps) {
  const [isInView, setIsInView] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (logoRef.current) {
      observer.observe(logoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Función para determinar el tamaño basado en las props
  const getSizeClasses = () => {
    // Si se especifican width/height personalizados, usarlos
    if (width || height) {
      return "";
    }

    // Tamaños predefinidos
    const sizeMap = {
      sm: "w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48",
      md: "w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56",
      lg: "w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80", // Valores actuales por defecto
      xl: "w-56 h-56 md:w-80 md:h-80 lg:w-96 lg:h-96",
    };

    return sizeMap[size] || sizeMap.lg;
  };

  // Estilos inline para width/height personalizados
  const customSizeStyles =
    width || height
      ? {
          width: width || "auto",
          height: height || "auto",
        }
      : {};

  // Paths normalizados para evitar errores de hidratación
  const paths = {
    circle1:
      "M237.773,56.673c-98.48,0-178.314,79.834-178.314,178.315c0,98.48,79.834,178.314,178.314,178.314c98.481,0,178.314-79.834,178.314-178.314C416.088,136.507,336.255,56.673,237.773,56.673z M237.774,384.817c-82.749,0-149.829-67.079-149.829-149.829c0-82.75,67.081-149.831,149.829-149.831c82.751,0,149.828,67.082,149.828,149.831C387.603,317.738,320.525,384.817,237.774,384.817z",
    circle2:
      "M247.303,76.867c-98.481,0-178.315,79.834-178.315,178.317c0,98.479,79.834,178.314,178.315,178.314c98.481,0,178.314-79.836,178.314-178.314C425.617,156.701,345.784,76.867,247.303,76.867z M247.304,405.013c-82.749,0-149.83-67.08-149.83-149.829c0-82.751,67.081-149.833,149.83-149.833s149.828,67.081,149.828,149.833C397.132,337.933,330.053,405.013,247.304,405.013z",
    circle3:
      "M262.227,56.672c-98.48,0-178.314,79.834-178.314,178.315c0,98.48,79.834,178.315,178.314,178.315c98.481,0,178.314-79.835,178.314-178.315C440.541,136.506,360.708,56.672,262.227,56.672z M262.227,384.817c-82.748,0-149.829-67.079-149.829-149.83c0-82.75,67.081-149.831,149.829-149.831c82.752,0,149.829,67.082,149.829,149.831C412.056,317.738,344.979,384.817,262.227,384.817z",
    circle4:
      "M264.227,438.497c98.48,0,178.314-79.834,178.314-178.315c0-98.48-79.834-178.314-178.314-178.314c-98.481,0-178.314,79.834-178.314,178.314C85.912,358.663,165.745,438.497,264.227,438.497z M264.226,110.353c82.749,0,149.829,67.079,149.829,149.829s-67.08,149.831-149.829,149.831c-82.751,0-149.828-67.082-149.828-149.831C114.397,177.432,181.475,110.353,264.226,110.353z",
    circle5:
      "M252.697,421.303c98.48,0,178.314-79.834,178.315-178.316c0-98.479-79.834-178.314-178.315-178.314S74.383,144.508,74.383,242.986C74.383,341.469,154.216,421.303,252.697,421.303z M252.696,93.157c82.749,0,149.83,67.08,149.83,149.829c0,82.752-67.081,149.832-149.83,149.832s-149.828-67.081-149.828-149.832C102.868,160.237,169.947,93.157,252.696,93.157z",
    circle6:
      "M232.773,438.498c98.48,0,178.314-79.834,178.314-178.315c0-98.48-79.834-178.315-178.314-178.315c-98.481,0-178.314,79.835-178.314,178.315C54.459,358.664,134.292,438.498,232.773,438.498z M232.773,110.353c82.748,0,149.829,67.079,149.829,149.83c-0.001,82.749-67.081,149.831-149.829,149.831c-82.752,0-149.829-67.082-149.829-149.831C82.944,177.432,150.021,110.353,232.773,110.353z",
  };

  return (
    <div
      ref={logoRef}
      className={`footer-animated-logo relative flex flex-col items-center justify-center pointer-events-none ${className}`}
      title={title}
    >
      {/* SVG Container con animación en viewport */}
      <div className={`relative ${getSizeClasses()}`} style={customSizeStyles}>
        <svg
          viewBox="0 0 500 500"
          className="logo-spinner footer-svg-gradient-shapes w-full h-full"
          style={{
            animation: disabled ? "none" : "spin 8s linear infinite",
            animationPlayState: disabled
              ? "paused"
              : isInView
              ? "running"
              : "paused",
          }}
        >
          {/* Definición de gradientes usando colores del tema WEBCODE */}
          <defs>
            {/* Gradiente Rosa Principal */}
            <linearGradient
              id="webcode-grad-primary"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="50%" stopColor="rgb(var(--primary-rgb))" />
              <stop
                offset="100%"
                stopColor="rgb(var(--primary-rgb))"
                stopOpacity="0"
              />
            </linearGradient>
            {/* Gradiente Aquamarina Secundario */}
            <linearGradient
              id="webcode-grad-secondary"
              x1="100%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="50%" stopColor="rgb(var(--secondary-rgb))" />
              <stop
                offset="100%"
                stopColor="rgb(var(--secondary-rgb))"
                stopOpacity="0"
              />
            </linearGradient>
            {/* Gradiente Mixto */}
            <linearGradient
              id="webcode-grad-mixed"
              x1="100%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="30%" stopColor="rgb(var(--primary-rgb))" />
              <stop offset="70%" stopColor="rgb(var(--secondary-rgb))" />
              <stop
                offset="100%"
                stopColor="rgb(var(--secondary-rgb))"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>

          {/* Formas circulares con gradientes del tema */}
          {/* Círculo 1 - Rosa Principal */}
          <path
            className="opacity-20"
            fill="url(#webcode-grad-primary)"
            d={paths.circle1}
          />

          {/* Círculo 2 - Aquamarina Secundario */}
          <path
            className="opacity-50"
            fill="url(#webcode-grad-secondary)"
            d={paths.circle2}
          />

          {/* Círculo 3 - Gradiente Mixto */}
          <path
            className="opacity-60"
            fill="url(#webcode-grad-mixed)"
            d={paths.circle3}
          />

          {/* Círculos invertidos para más profundidad */}
          <path
            className="opacity-25"
            fill="url(#webcode-grad-primary)"
            d={paths.circle4}
          />

          <path
            className="opacity-40"
            fill="url(#webcode-grad-secondary)"
            d={paths.circle5}
          />

          <path
            className="opacity-45"
            fill="url(#webcode-grad-mixed)"
            d={paths.circle6}
          />
        </svg>
      </div>

      {/* Logo WEBCODE - Colores corregidos del tema */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h2 className="logo-text text-2xl md:text-3xl lg:text-4xl font-bold font-mono tracking-tighter leading-none neon-theme-soft">
          <span style={{ color: "rgb(var(--primary-rgb))" }}>Web</span>
          <span style={{ color: "rgba(var(--primary-rgb), 0.6)" }}>Code</span>
        </h2>

        {/* Subtítulo bajo el logo principal - dividido en WEB / Design con color turquesa del tema */}
        <div
          className="logo-sub text-xs md:text-sm text-center mt-1 font-sans tracking-wide neon-theme-soft"
          aria-hidden={false}
        >
          <span style={{ color: "rgb(var(--secondary-rgb,130,200,210))" }}>
            WEB
          </span>
          <span
            style={{ color: "rgba(var(--secondary-rgb,130,200,210),0.65)" }}
          >
            Design
          </span>
        </div>
      </div>

      {/* Efecto de resplandor sutil cuando está en viewport */}
      <div
        className={`absolute inset-0 rounded-full transition-all duration-500 ${
          isInView && !disabled
            ? "bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 blur-2xl scale-110"
            : "scale-100 opacity-0"
        }`}
      />
    </div>
  );
}

// Ejemplos de uso:
/*
// Uso básico con tamaño por defecto (lg)
<AnimatedLogo />

// Tamaño pequeño
<AnimatedLogo size="sm" />

// Tamaño personalizado
<AnimatedLogo width="200px" height="200px" />

// Sin animación
<AnimatedLogo disabled={true} />

// Con clase adicional y título personalizado
<AnimatedLogo
  size="xl"
  className="my-custom-class"
  title="Mi Logo Personalizado"
/>
*/
