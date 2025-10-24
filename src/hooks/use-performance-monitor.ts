"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface PerformanceMemory {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

interface PerformanceWithMemory extends Performance {
  memory?: PerformanceMemory;
}

interface PerformanceData {
  fps: number;
  memory: number;
  domNodes: number;
  renderCount: number;
  isIdle: boolean;
  timestamp: number;
}

interface PerformanceMonitorOptions {
  enabled?: boolean;
  sampleInterval?: number;
  logToConsole?: boolean;
}

/**
 * Hook para monitorear el rendimiento en tiempo real
 * Especialmente útil para detectar consumo de CPU en reposo vs activo
 */
export function usePerformanceMonitor(options: PerformanceMonitorOptions = {}) {
  const {
    enabled = process.env.NODE_ENV === "development",
    sampleInterval = 1000,
    logToConsole = false
  } = options;

  const [performanceData, setPerformanceData] = useState<PerformanceData>({
    fps: 0,
    memory: 0,
    domNodes: 0,
    renderCount: 0,
    isIdle: true,
    timestamp: Date.now()
  });

  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const animationFrameRef = useRef<number | null>(null);
  const renderCountRef = useRef(0);
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detectar actividad del usuario para determinar si está "en reposo"
  const [isIdle, setIsIdle] = useState(true);

  const resetIdleTimer = useCallback(() => {
    setIsIdle(false);
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
    }
    idleTimeoutRef.current = setTimeout(() => {
      setIsIdle(true);
    }, 2000); // 2 segundos sin actividad = reposo
  }, []);

  // Monitor de FPS
  const measureFPS = useCallback(() => {
    frameCountRef.current++;
    const now = performance.now();
    const delta = now - lastTimeRef.current;

    if (delta >= sampleInterval) {
      const fps = Math.round((frameCountRef.current * 1000) / delta);
      frameCountRef.current = 0;
      lastTimeRef.current = now;

      // Obtener información de memoria si está disponible
      const perfWithMemory = performance as PerformanceWithMemory;
      const memory = perfWithMemory.memory
        ? Math.round(perfWithMemory.memory.usedJSHeapSize / 1024 / 1024)
        : 0;

      // Contar nodos DOM
      const domNodes = document.querySelectorAll("*").length;

      const newData: PerformanceData = {
        fps,
        memory,
        domNodes,
        renderCount: renderCountRef.current,
        isIdle,
        timestamp: Date.now()
      };

      setPerformanceData(newData);

      if (logToConsole) {
        console.log(`🔍 Performance Monitor:`, {
          state: isIdle ? "REPOSO" : "ACTIVO",
          fps: `${fps} FPS`,
          memory: `${memory} MB`,
          domNodes: `${domNodes} nodes`,
          renders: renderCountRef.current
        });
      }
    }

    if (enabled) {
      animationFrameRef.current = requestAnimationFrame(measureFPS);
    }
  }, [enabled, isIdle, logToConsole, sampleInterval]);

  // Hook para contar renders
  useEffect(() => {
    renderCountRef.current++;
  });

  useEffect(() => {
    if (!enabled) return;

    // Iniciar monitoreo de FPS
    animationFrameRef.current = requestAnimationFrame(measureFPS);

    // Listeners para detectar actividad del usuario
    const activities = [
      "mouseenter",
      "mousemove",
      "click",
      "scroll",
      "keydown"
    ];

    activities.forEach((event) => {
      document.addEventListener(event, resetIdleTimer, { passive: true });
    });

    // Inicializar como idle
    resetIdleTimer();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
      activities.forEach((event) => {
        document.removeEventListener(event, resetIdleTimer);
      });
    };
  }, [
    enabled,
    measureFPS, // Inicializar como idle
    resetIdleTimer
  ]);

  return {
    performanceData,
    isIdle,
    // Función para obtener un resumen de rendimiento
    getPerformanceSummary: () => ({
      state: isIdle ? "REPOSO" : "ACTIVO",
      fps: performanceData.fps,
      memory: `${performanceData.memory} MB`,
      domNodes: performanceData.domNodes,
      renderCount: performanceData.renderCount,
      timestamp: new Date(performanceData.timestamp).toLocaleTimeString()
    })
  };
}

/**
 * Hook específico para monitorear componentes individuales
 */
export function useComponentPerformanceMonitor(componentName: string) {
  const renderCountRef = useRef(0);
  const mountTimeRef = useRef(0);
  const [uptime, setUptime] = useState(0);
  const [renderCount, setRenderCount] = useState(0);

  // Inicializar mountTime en useEffect para evitar Date.now() durante render
  useEffect(() => {
    if (mountTimeRef.current === 0) {
      mountTimeRef.current = Date.now();
    }

    // Actualizar uptime periódicamente
    const interval = setInterval(() => {
      if (mountTimeRef.current > 0) {
        setUptime(Date.now() - mountTimeRef.current);
      }
    }, 1000); // Actualizar cada segundo

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    renderCountRef.current++;
    setRenderCount(renderCountRef.current);

    if (process.env.NODE_ENV === "development") {
      console.log(`🎯 ${componentName} render #${renderCountRef.current}`);
    }
  }, [componentName]);

  return {
    renderCount,
    uptime,
    logRender: (reason?: string) => {
      console.log(`🔄 ${componentName} re-render:`, {
        count: renderCountRef.current,
        reason: reason || "unknown",
        uptime: `${Math.round(uptime / 1000)}s`
      });
    }
  };
}
