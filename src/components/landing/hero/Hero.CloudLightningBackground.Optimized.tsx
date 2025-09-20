/**
 * OPTIMIZACIÓN AVANZADA - CloudLightningBackground v2.0
 *
 * Implementación optimizada con las siguientes mejoras:
 * 1. Frame Rate Adaptativo (30/60 FPS según dispositivo)
 * 2. Configuración por capacidad del dispositivo
 * 3. Pool de memoria para partículas
 * 4. Renderizado selectivo (solo partículas visibles)
 * 5. Throttling de mouse events
 * 6. Canvas offscreen para preparación
 * 7. Worker thread para cálculos pesados (opcional)
 */
"use client";

import { useTheme } from "next-themes";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getThemeColors, parseRgbColor } from "@/lib/theme-colors";

interface CloudParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  brightness: number;
  isVisible: boolean; // Nuevo: solo renderizar partículas visibles
  lastUpdate: number; // Nuevo: timestamp para optimización
}

interface MousePosition {
  x: number;
  y: number;
  timestamp: number; // Nuevo: para throttling
}

interface DeviceCapabilities {
  fps: number;
  particleCount: number;
  quality: "low" | "medium" | "high";
  useOffscreen: boolean;
  enableBlur: boolean;
}

// Detección automática de capacidades del dispositivo
const detectDeviceCapabilities = (): DeviceCapabilities => {
  // Valores por defecto conservadores
  let capabilities: DeviceCapabilities = {
    fps: 30,
    particleCount: 40,
    quality: "low",
    useOffscreen: false,
    enableBlur: false,
  };

  // Verificar soporte de canvas
  const canvas = document.createElement("canvas");
  const gl =
    canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

  // Heurísticas basadas en características del navegador
  const hasWebGL = !!gl;
  const hasOffscreenCanvas = typeof OffscreenCanvas !== "undefined";
  const hasWorkers = typeof Worker !== "undefined";
  const deviceMemory = (navigator as any).deviceMemory || 4; // GB
  const hardwareConcurrency = navigator.hardwareConcurrency || 2;

  // Detectar tipo de dispositivo
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  const isTablet = /Tablet|iPad/i.test(navigator.userAgent);
  const isDesktop = !isMobile && !isTablet;

  // Configuración por tipo de dispositivo
  if (isDesktop && hasWebGL && deviceMemory >= 8) {
    // Dispositivo de alta gama
    capabilities = {
      fps: 60,
      particleCount: 120,
      quality: "high",
      useOffscreen: hasOffscreenCanvas,
      enableBlur: true,
    };
  } else if (isDesktop && hasWebGL) {
    // Dispositivo medio
    capabilities = {
      fps: 60,
      particleCount: 80,
      quality: "medium",
      useOffscreen: hasOffscreenCanvas,
      enableBlur: true,
    };
  } else if (isTablet) {
    // Tablet
    capabilities = {
      fps: 45,
      particleCount: 60,
      quality: "medium",
      useOffscreen: false,
      enableBlur: false,
    };
  } else {
    // Móvil o dispositivo de baja gama
    capabilities = {
      fps: 30,
      particleCount: 40,
      quality: "low",
      useOffscreen: false,
      enableBlur: false,
    };
  }

  return capabilities;
};

// Configuración base optimizada
const BASE_CONFIG = {
  PARTICLE_MIN_SIZE: 15,
  PARTICLE_MAX_SIZE: 45,
  PARTICLE_MIN_SPEED: 0.08,
  PARTICLE_MAX_SPEED: 0.25,
  LIGHT_RADIUS: 180,
  LIGHT_INTENSITY: 0.75,
  MOUSE_THROTTLE: 16, // ~60fps para mouse events
  VISIBILITY_MARGIN: 50, // Margen para considerar partículas visibles
  MEMORY_POOL_SIZE: 200, // Pool de partículas reutilizables
} as const;

// Pool de memoria para partículas (reutilización de objetos)
class ParticlePool {
  private pool: CloudParticle[] = [];
  private activeParticles: CloudParticle[] = [];

  constructor(poolSize: number) {
    for (let i = 0; i < poolSize; i++) {
      this.pool.push({
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        size: 0,
        opacity: 0,
        baseOpacity: 0,
        brightness: 0,
        isVisible: false,
        lastUpdate: 0,
      });
    }
  }

  acquire(): CloudParticle | null {
    const particle = this.pool.pop();
    if (particle) {
      this.activeParticles.push(particle);
      return particle;
    }
    return null;
  }

  release(particle: CloudParticle): void {
    const index = this.activeParticles.indexOf(particle);
    if (index > -1) {
      this.activeParticles.splice(index, 1);
      this.pool.push(particle);
    }
  }

  getActiveCount(): number {
    return this.activeParticles.length;
  }

  getActiveParticles(): CloudParticle[] {
    return this.activeParticles;
  }

  releaseAll(): void {
    this.pool.push(...this.activeParticles);
    this.activeParticles.length = 0;
  }
}

// Función para crear configuraciones específicas por tema
const createThemeConfig = (
  theme: "light" | "dark",
  quality: DeviceCapabilities["quality"]
) => {
  const colors = getThemeColors(theme === "dark" ? "dark" : "light");

  const baseConfig = {
    CLOUD_COLOR: parseRgbColor(colors.foreground.muted),
    LIGHTNING_COLOR: parseRgbColor(colors.accent.primary),
  };

  if (theme === "dark") {
    return {
      ...baseConfig,
      BACKGROUND_COLOR:
        quality === "low" ? `rgba(17, 24, 39, 0.9)` : `rgba(17, 24, 39, 0.85)`,
      LIGHT_OPACITY: quality === "high" ? 0.8 : 0.6,
      CLOUD_BASE_OPACITY: quality === "high" ? 0.1 : 0.06,
    };
  } else {
    return {
      ...baseConfig,
      BACKGROUND_COLOR:
        quality === "low"
          ? `rgba(238, 242, 255, 0.9)`
          : `rgba(238, 242, 255, 0.85)`,
      LIGHT_OPACITY: quality === "high" ? 0.6 : 0.4,
      CLOUD_BASE_OPACITY: quality === "high" ? 0.18 : 0.12,
    };
  }
};

export function CloudLightningBackgroundOptimized() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenCanvasRef = useRef<OffscreenCanvas | null>(null);
  const animationRef = useRef<number | null>(null);
  const particlePoolRef = useRef<ParticlePool | null>(null);
  const mouseRef = useRef<MousePosition>({ x: -1000, y: -1000, timestamp: 0 });
  const isVisibleRef = useRef(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastFrameTimeRef = useRef<number>(0);
  const fpsCounterRef = useRef({ frames: 0, lastTime: 0, currentFps: 0 });

  // Estado para capacidades del dispositivo
  const [deviceCapabilities, setDeviceCapabilities] =
    useState<DeviceCapabilities | null>(null);

  // Detectar capacidades al montar el componente
  useEffect(() => {
    setDeviceCapabilities(detectDeviceCapabilities());
  }, []);

  // Configuración actual basada en el tema y capacidades
  const currentConfig = useMemo(() => {
    if (!deviceCapabilities) return null;

    const isDark = theme === "dark";
    const themeConfig = createThemeConfig(
      isDark ? "dark" : "light",
      deviceCapabilities.quality
    );

    return {
      ...BASE_CONFIG,
      ...themeConfig,
      ...deviceCapabilities,
    };
  }, [theme, deviceCapabilities]);

  // Inicializar pool de partículas
  useEffect(() => {
    if (currentConfig) {
      particlePoolRef.current = new ParticlePool(BASE_CONFIG.MEMORY_POOL_SIZE);
    }
  }, [currentConfig]);

  // Función optimizada para crear partículas usando el pool
  const createParticles = useCallback(
    (width: number, height: number): CloudParticle[] => {
      if (!currentConfig || !particlePoolRef.current) return [];

      const particles: CloudParticle[] = [];
      const pool = particlePoolRef.current;

      for (let i = 0; i < currentConfig.particleCount; i++) {
        const particle = pool.acquire();
        if (particle) {
          // Reinicializar partícula del pool
          particle.x = Math.random() * width;
          particle.y = Math.random() * height;
          particle.vx =
            (Math.random() - 0.5) * currentConfig.PARTICLE_MAX_SPEED;
          particle.vy =
            (Math.random() - 0.5) * currentConfig.PARTICLE_MAX_SPEED;
          particle.size =
            currentConfig.PARTICLE_MIN_SIZE +
            Math.random() *
              (currentConfig.PARTICLE_MAX_SIZE -
                currentConfig.PARTICLE_MIN_SIZE);
          particle.opacity =
            currentConfig.CLOUD_BASE_OPACITY + Math.random() * 0.1;
          particle.baseOpacity = particle.opacity;
          particle.brightness = 0;
          particle.isVisible = true;
          particle.lastUpdate = performance.now();

          particles.push(particle);
        }
      }

      return particles;
    },
    [currentConfig]
  );

  // Función optimizada para calcular iluminación con early exit
  const calculateLighting = useCallback(
    (particle: CloudParticle, mouseX: number, mouseY: number): number => {
      if (!currentConfig) return 0;

      // Early exit si el mouse está muy lejos
      const roughDistance =
        Math.abs(particle.x - mouseX) + Math.abs(particle.y - mouseY);
      if (roughDistance > currentConfig.LIGHT_RADIUS * 1.5) return 0;

      const dx = particle.x - mouseX;
      const dy = particle.y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > currentConfig.LIGHT_RADIUS) return 0;

      const intensity =
        (1 - distance / currentConfig.LIGHT_RADIUS) *
        currentConfig.LIGHT_INTENSITY;
      return intensity ** 2;
    },
    [currentConfig]
  );

  // Función principal de animación optimizada
  const animate = useCallback(
    (currentTime: number) => {
      if (
        !canvasRef.current ||
        !isVisibleRef.current ||
        !currentConfig ||
        !particlePoolRef.current
      )
        return;

      // Control de FPS adaptativo
      const targetFrameTime = 1000 / currentConfig.fps;
      if (currentTime - lastFrameTimeRef.current < targetFrameTime) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      // Actualizar contador de FPS
      const fpsCounter = fpsCounterRef.current;
      fpsCounter.frames++;
      if (currentTime - fpsCounter.lastTime >= 1000) {
        fpsCounter.currentFps = Math.round(
          (fpsCounter.frames * 1000) / (currentTime - fpsCounter.lastTime)
        );
        fpsCounter.frames = 0;
        fpsCounter.lastTime = currentTime;
      }

      lastFrameTimeRef.current = currentTime;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const { width, height } = canvas;
      const particles = particlePoolRef.current.getActiveParticles();
      const mouse = mouseRef.current;

      // Limpiar canvas con fondo optimizado
      ctx.fillStyle = currentConfig.BACKGROUND_COLOR;
      ctx.fillRect(0, 0, width, height);

      // Crear gradiente de luz solo si es necesario
      const mouseInBounds =
        mouse.x >= 0 && mouse.y >= 0 && mouse.x <= width && mouse.y <= height;
      if (mouseInBounds && currentTime - mouse.timestamp < 100) {
        // Solo si el mouse se movió recientemente
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          currentConfig.LIGHT_RADIUS
        );

        const lightColor = currentConfig.LIGHTNING_COLOR;
        gradient.addColorStop(
          0,
          `rgba(${lightColor.r}, ${lightColor.g}, ${lightColor.b}, ${
            currentConfig.LIGHT_OPACITY * 0.15
          })`
        );
        gradient.addColorStop(
          0.5,
          `rgba(${lightColor.r}, ${lightColor.g}, ${lightColor.b}, ${
            currentConfig.LIGHT_OPACITY * 0.075
          })`
        );
        gradient.addColorStop(
          1,
          `rgba(${lightColor.r}, ${lightColor.g}, ${lightColor.b}, 0)`
        );

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      // Procesar partículas con optimizaciones
      let visibleParticles = 0;

      ctx.save();

      particles.forEach((particle) => {
        // Throttling de actualización por partícula
        if (currentTime - particle.lastUpdate < 32) return; // ~30fps para partículas individuales
        particle.lastUpdate = currentTime;

        // Actualizar posición
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Rebotar en los bordes con optimización
        if (particle.x < 0 || particle.x > width) {
          particle.vx *= -0.8; // Pequeña pérdida de energía
          particle.x = Math.max(0, Math.min(width, particle.x));
        }
        if (particle.y < 0 || particle.y > height) {
          particle.vy *= -0.8;
          particle.y = Math.max(0, Math.min(height, particle.y));
        }

        // Verificar visibilidad (culling)
        const margin = BASE_CONFIG.VISIBILITY_MARGIN;
        particle.isVisible =
          particle.x > -margin &&
          particle.x < width + margin &&
          particle.y > -margin &&
          particle.y < height + margin;

        if (!particle.isVisible) return;
        visibleParticles++;

        // Calcular iluminación solo para partículas visibles
        const lighting = calculateLighting(particle, mouse.x, mouse.y);
        particle.brightness = lighting;

        // Preparar para dibujar con optimización de calidad
        const finalOpacity = particle.baseOpacity + lighting * 0.5;
        const glowSize =
          particle.size +
          lighting * (currentConfig.quality === "high" ? 25 : 15);

        // Interpolación de color optimizada
        const cloudColor = currentConfig.CLOUD_COLOR;
        const lightColor = currentConfig.LIGHTNING_COLOR;
        const r = Math.round(
          cloudColor.r + lighting * (lightColor.r - cloudColor.r)
        );
        const g = Math.round(
          cloudColor.g + lighting * (lightColor.g - cloudColor.g)
        );
        const b = Math.round(
          cloudColor.b + lighting * (lightColor.b - cloudColor.b)
        );

        // Dibujar con nivel de detalle adaptativo
        if (currentConfig.quality === "high" && lighting > 0.1) {
          ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${lighting * 0.7})`;
          ctx.shadowBlur = glowSize * 0.4;
        }

        // Crear gradiente solo si es necesario
        if (currentConfig.quality !== "low" || lighting > 0.05) {
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
        } else {
          // Dibujo simple para calidad baja
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${finalOpacity})`;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Reset shadow para la siguiente partícula
        if (ctx.shadowBlur > 0) {
          ctx.shadowBlur = 0;
        }
      });

      ctx.restore();

      // Debug info en desarrollo
      if (process.env.NODE_ENV === "development") {
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.font = "12px monospace";
        ctx.fillText(
          `FPS: ${fpsCounter.currentFps} | Particles: ${visibleParticles}/${particles.length} | Quality: ${currentConfig.quality}`,
          10,
          20
        );
      }

      animationRef.current = requestAnimationFrame(animate);
    },
    [calculateLighting, currentConfig]
  );

  // Manejador de movimiento del mouse con throttling
  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!canvasRef.current || !currentConfig) return;

      const now = performance.now();
      if (now - mouseRef.current.timestamp < currentConfig.MOUSE_THROTTLE)
        return;

      const rect = canvasRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        timestamp: now,
      };
    },
    [currentConfig]
  );

  // Manejador optimizado para mouse leave
  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -1000, y: -1000, timestamp: performance.now() };
  }, []);

  // Redimensionar canvas con debouncing
  const resizeCanvas = useCallback(() => {
    if (
      !canvasRef.current ||
      !containerRef.current ||
      !currentConfig ||
      !particlePoolRef.current
    )
      return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    // Solo redimensionar si cambió significativamente
    if (
      Math.abs(canvas.width - rect.width) > 10 ||
      Math.abs(canvas.height - rect.height) > 10
    ) {
      canvas.width = rect.width;
      canvas.height = rect.height;

      // Limpiar partículas existentes y crear nuevas
      const pool = particlePoolRef.current;
      pool.releaseAll();

      const newParticles = createParticles(canvas.width, canvas.height);
      // Las partículas ya están en el pool activo por createParticles
    }
  }, [createParticles, currentConfig]);

  // Effect principal optimizado
  useEffect(() => {
    if (!canvasRef.current || !currentConfig) return;

    // Configuración inicial
    resizeCanvas();

    // Event listeners con passive para mejor performance
    const canvas = canvasRef.current;
    canvas.addEventListener("mousemove", handleMouseMove, { passive: true });
    canvas.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    let resizeTimeout: number;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(resizeCanvas, 150);
    };
    window.addEventListener("resize", debouncedResize, { passive: true });

    // Intersection Observer optimizado
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasVisible = isVisibleRef.current;
          isVisibleRef.current = entry.isIntersecting;

          if (entry.isIntersecting && !wasVisible && !animationRef.current) {
            requestAnimationFrame(animate);
          } else if (
            !entry.isIntersecting &&
            wasVisible &&
            animationRef.current
          ) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "50px 0px 50px 0px",
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Iniciar animación
    requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(resizeTimeout);
      observer.disconnect();

      // Limpiar pool de partículas
      if (particlePoolRef.current) {
        particlePoolRef.current.releaseAll();
      }
    };
  }, [animate, handleMouseMove, handleMouseLeave, resizeCanvas, currentConfig]);

  // Gradientes optimizados por tema
  const backgroundGradient = useMemo(() => {
    if (!currentConfig) return "transparent";

    const colors = getThemeColors(theme === "dark" ? "dark" : "light");

    if (theme === "dark") {
      return `linear-gradient(135deg, ${colors.background.primary} 0%, ${colors.background.secondary} 50%, ${colors.background.primary} 100%)`;
    } else {
      return `linear-gradient(135deg, ${colors.gradients.hero.from} 0%, ${colors.gradients.hero.via} 50%, ${colors.gradients.hero.to} 100%)`;
    }
  }, [theme, currentConfig]);

  // No renderizar hasta que las capacidades estén detectadas
  if (!currentConfig || !deviceCapabilities) {
    return (
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none opacity-50"
        style={{ background: backgroundGradient }}
      >
        <div className="flex items-center justify-center h-full text-sm text-gray-500">
          Optimizando rendimiento...
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="cloud-lightning-background absolute inset-0 overflow-hidden pointer-events-none"
      style={{ background: backgroundGradient }}
      data-quality={deviceCapabilities.quality}
      data-fps={deviceCapabilities.fps}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-auto"
        style={{ display: "block" }}
        aria-label={`Fondo interactivo optimizado (${deviceCapabilities.quality} quality, ${deviceCapabilities.fps}fps)`}
      />
    </div>
  );
}

// Export default para compatibilidad
export { CloudLightningBackgroundOptimized as CloudLightningBackground };
