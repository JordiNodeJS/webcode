/**
 * Cloud Lightning Background Component
 *
 * Componente alternativo inspirado en el efecto de Onlook.com
 * Utiliza canvas y JavaScript para crear nubes vaporosas que se iluminan
 * cuando el cursor pasa por encima, simulando un efecto de relámpagos.
 *
 * Características:
 * - Soporte completo para modo claro y oscuro
 * - Efecto de iluminación que sigue al cursor
 * - Simulación de nubes vaporosas con resplandor
 * - Optimizado para performance y dispositivos móviles
 */
"use client";

import { useTheme } from "next-themes";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getThemeColors, parseRgbColor } from "@/lib/theme-colors";
import useScrollPosition from "@/hooks/use-scroll-position";

interface CloudParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  brightness: number;
}

interface MousePosition {
  x: number;
  y: number;
}

// Configuración base optimizada para rendimiento
const BASE_CONFIG = {
  PARTICLE_COUNT: 60, // Reducido para mejor rendimiento
  PARTICLE_MIN_SIZE: 15,
  PARTICLE_MAX_SIZE: 50,
  PARTICLE_MIN_SPEED: 0.08,
  PARTICLE_MAX_SPEED: 0.25,
  LIGHT_RADIUS: 180, // Reducido para mejor rendimiento
  LIGHT_INTENSITY: 0.7,
  ANIMATION_SPEED: 50, // Reducido FPS para ahorro de CPU
} as const;

// Límites dinámicos para ahorro de CPU cuando el fondo se desvanece
const MIN_LIGHT_RADIUS = Math.max(
  40,
  Math.floor(BASE_CONFIG.LIGHT_RADIUS * 0.3)
);
const MIN_PARTICLE_COUNT = 8; // mínimo para mantener algo de presencia si no está totalmente oculto

// Función para crear configuraciones específicas por tema usando los colores del sistema
const createThemeConfig = (theme: "light" | "dark") => {
  const colors = getThemeColors(theme);

  if (theme === "dark") {
    // Modo oscuro: paleta WebSnack con tonos más sutiles pero vibrantes
    const cloudColor = parseRgbColor(colors.accent.secondary); // Aguamarina sutil para nubes
    const lightningColor = parseRgbColor(colors.accent.primary); // Rosa brillante para iluminación

    return {
      CLOUD_COLOR: cloudColor,
      LIGHTNING_COLOR: lightningColor,
      BACKGROUND_COLOR: `rgba(15, 23, 42, 0.9)`, // Color de fondo oscuro del tema (#0f172a)
      LIGHT_OPACITY: 0.75,
      CLOUD_BASE_OPACITY: 0.06,
    };
  } else {
    // Modo claro: paleta completa WebSnack rosa-aguamarina
    const cloudColor = parseRgbColor(colors.accent.secondary); // Aguamarina para nubes sutiles
    const lightningColor = parseRgbColor(colors.accent.primary); // Rosa WebSnack para iluminación

    return {
      CLOUD_COLOR: cloudColor,
      LIGHTNING_COLOR: lightningColor,
      BACKGROUND_COLOR: `rgba(244, 251, 252, 0.85)`, // Fondo claro del tema (#f4fbfc)
      LIGHT_OPACITY: 0.6,
      CLOUD_BASE_OPACITY: 0.12,
    };
  }
};

export function CloudLightningBackground() {
  const { theme, resolvedTheme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<CloudParticle[]>([]);
  const mouseRef = useRef<MousePosition>({ x: -1000, y: -1000 });
  const isVisibleRef = useRef(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(true);
  const opacityRef = useRef<number>(1);

  // Scroll -> opacidad dinámica del fondo (1 en top -> 0 tras fadeEnd px)
  const scroll = useScrollPosition();
  const fadeStart = 0; // px
  const fadeEnd = 800; // px hasta desaparecer
  const progress = Math.min(
    1,
    Math.max(0, (scroll.y - fadeStart) / Math.max(1, fadeEnd - fadeStart))
  );
  const opacity = 1 - progress; // 1 -> 0

  // Evitar hidratación mismatch - solo inicializar después del mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Configuración actual basada en el tema resuelto (evita problemas de hidratación)
  const currentConfig = useMemo(() => {
    if (!mounted) {
      // Durante SSR/hidratación, usar configuración neutral
      return {
        ...BASE_CONFIG,
        ...createThemeConfig("light"), // Default neutral
      };
    }

    const isDark = resolvedTheme === "dark" || theme === "dark";
    const themeConfig = createThemeConfig(isDark ? "dark" : "light");

    return {
      ...BASE_CONFIG,
      ...themeConfig,
    };
  }, [theme, resolvedTheme, mounted]);

  // Función para crear partículas de nube con optimización para móviles
  const createParticles = useCallback(
    (width: number, height: number): CloudParticle[] => {
      const particles: CloudParticle[] = [];

      // Optimizar número de partículas según el tamaño de pantalla
      const isMobile = width < 768; // Breakpoint típico para móviles
      const particleCount = isMobile
        ? Math.max(15, Math.floor(BASE_CONFIG.PARTICLE_COUNT * 0.4)) // 40% para móviles
        : BASE_CONFIG.PARTICLE_COUNT;

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * currentConfig.PARTICLE_MAX_SPEED,
          vy: (Math.random() - 0.5) * currentConfig.PARTICLE_MAX_SPEED,
          size:
            currentConfig.PARTICLE_MIN_SIZE +
            Math.random() *
              (currentConfig.PARTICLE_MAX_SIZE -
                currentConfig.PARTICLE_MIN_SIZE),
          opacity: currentConfig.CLOUD_BASE_OPACITY + Math.random() * 0.15,
          baseOpacity: currentConfig.CLOUD_BASE_OPACITY + Math.random() * 0.15,
          brightness: 0,
        });
      }

      return particles;
    },
    [currentConfig]
  );

  // Función para calcular la iluminación de una partícula
  const calculateLighting = useCallback(
    (
      particle: CloudParticle,
      mouseX: number,
      mouseY: number,
      effectiveRadius: number
    ): number => {
      const dx = particle.x - mouseX;
      const dy = particle.y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > effectiveRadius) return 0;

      const intensity =
        (1 - distance / effectiveRadius) * currentConfig.LIGHT_INTENSITY;
      return intensity ** 2; // Exponential falloff para efecto más dramático
    },
    [currentConfig]
  );

  // Función principal de animación
  const animate = useCallback(() => {
    if (
      !canvasRef.current ||
      !isVisibleRef.current ||
      opacityRef.current <= 0.01
    ) {
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvas;
    const particles = particlesRef.current;
    const mouse = mouseRef.current;
    const opacityVal = Math.max(0, Math.min(1, opacityRef.current));

    // Radio de luz y número de partículas efectivos según opacidad
    const effectiveRadius =
      MIN_LIGHT_RADIUS +
      (BASE_CONFIG.LIGHT_RADIUS - MIN_LIGHT_RADIUS) * opacityVal;
    const activeCount =
      opacityVal <= 0.01
        ? 0
        : Math.max(
            MIN_PARTICLE_COUNT,
            Math.floor(BASE_CONFIG.PARTICLE_COUNT * opacityVal)
          );

    // Aplicar opacidad global según scroll
    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(1, opacityRef.current));

    // Limpiar canvas con fondo adaptado al tema
    ctx.fillStyle = currentConfig.BACKGROUND_COLOR;
    ctx.fillRect(0, 0, width, height);

    // Crear gradiente radial para el efecto de luz del cursor mejorado
    if (mouse.x >= 0 && mouse.y >= 0 && mouse.x <= width && mouse.y <= height) {
      const gradient = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        effectiveRadius
      );

      // Colores del tema WebSnack para el efecto de iluminación
      const centerColor =
        theme === "dark"
          ? `rgba(255, 170, 215, ${currentConfig.LIGHT_OPACITY * 0.15})` // Rosa brillante modo oscuro
          : `rgba(220, 124, 179, ${currentConfig.LIGHT_OPACITY * 0.15})`; // Rosa principal

      const midColor =
        theme === "dark"
          ? `rgba(165, 243, 252, ${currentConfig.LIGHT_OPACITY * 0.08})` // Aguamarina modo oscuro
          : `rgba(188, 227, 229, ${currentConfig.LIGHT_OPACITY * 0.08})`; // Aguamarina principal

      gradient.addColorStop(0, centerColor);
      gradient.addColorStop(0.5, midColor);
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)"); // Transparente al final

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }

    // Dibujar y animar solo las partículas activas
    for (let i = 0; i < activeCount; i++) {
      const particle = particles[i];
      // Actualizar posición
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Rebotar en los bordes
      if (particle.x < 0 || particle.x > width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > height) particle.vy *= -1;

      // Mantener dentro de los límites
      particle.x = Math.max(0, Math.min(width, particle.x));
      particle.y = Math.max(0, Math.min(height, particle.y));

      // Calcular iluminación
      const lighting = calculateLighting(
        particle,
        mouse.x,
        mouse.y,
        effectiveRadius
      );
      particle.brightness = lighting;

      // Preparar para dibujar
      const finalOpacity = particle.baseOpacity + lighting * 0.6;
      const glowSize = particle.size + lighting * 30;

      // Color base vs color iluminado
      const r =
        currentConfig.CLOUD_COLOR.r +
        lighting *
          (currentConfig.LIGHTNING_COLOR.r - currentConfig.CLOUD_COLOR.r);
      const g =
        currentConfig.CLOUD_COLOR.g +
        lighting *
          (currentConfig.LIGHTNING_COLOR.g - currentConfig.CLOUD_COLOR.g);
      const b =
        currentConfig.CLOUD_COLOR.b +
        lighting *
          (currentConfig.LIGHTNING_COLOR.b - currentConfig.CLOUD_COLOR.b);

      // Dibujar partícula con efecto de resplandor
      ctx.save();

      // Efecto de resplandor mejorado con sombras 3D del sistema WAS
      if (lighting > 0.1) {
        // Usar colores del tema WebSnack para el resplandor
        const glowColor =
          theme === "dark"
            ? `rgba(255, 170, 215, ${lighting * 0.8})` // Rosa brillante modo oscuro
            : `rgba(220, 124, 179, ${lighting * 0.8})`; // Rosa principal modo claro

        ctx.shadowColor = glowColor;
        ctx.shadowBlur = glowSize * 0.5;
        ctx.shadowOffsetX = lighting * 2; // Efecto 3D sutil
        ctx.shadowOffsetY = lighting * 2;
      }

      // Dibujar la partícula principal
      const gradient = ctx.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        glowSize
      );
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${finalOpacity})`);
      gradient.addColorStop(
        0.4,
        `rgba(${r}, ${g}, ${b}, ${finalOpacity * 0.6})`
      );
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    ctx.restore();

    animationRef.current = requestAnimationFrame(animate);
  }, [calculateLighting, currentConfig]);

  // Manejador de movimiento del mouse
  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }, []);

  // Manejador para cuando el mouse sale del canvas
  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -1000, y: -1000 };
  }, []);

  // Redimensionar canvas
  const resizeCanvas = useCallback(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;

    // Recrear partículas con nuevas dimensiones
    particlesRef.current = createParticles(canvas.width, canvas.height);
  }, [createParticles]);

  // Effect para configuración inicial y cleanup
  useEffect(() => {
    if (!canvasRef.current) return;

    // Configuración inicial
    resizeCanvas();

    // Event listeners
    const canvas = canvasRef.current;
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", resizeCanvas);

    // Intersection Observer para pausar cuando no esté visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
          setIsIntersecting(entry.isIntersecting);
        });
      },
      {
        threshold: 0.1,
        rootMargin: "100px 0px 100px 0px",
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Iniciar animación (si corresponde)
    if (isVisibleRef.current && opacityRef.current > 0.01) {
      animate();
    }

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resizeCanvas);
      observer.disconnect();
    };
  }, [animate, handleMouseMove, handleMouseLeave, resizeCanvas]);

  // Arrancar/parar animación según intersección u opacidad
  useEffect(() => {
    opacityRef.current = opacity;
    const shouldAnimate = isIntersecting && opacity > 0.01;
    if (shouldAnimate && !animationRef.current) {
      animate();
    } else if (!shouldAnimate && animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, [isIntersecting, opacity, animate]);

  return (
    <div
      ref={containerRef}
      className="cloud-lightning-background absolute inset-0 overflow-hidden pointer-events-none bg-gradient-webcode transition-opacity duration-300 ease-out will-change-[opacity]"
      style={{ opacity }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-auto"
        style={{
          display: "block",
        }}
        aria-label="Fondo interactivo con nubes que se iluminan al pasar el cursor"
      />
    </div>
  );
}
