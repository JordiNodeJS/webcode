// 🔬 Analizador Completo de Performance - Todos los Componentes WebCode
// src/scripts/full-performance-analysis.ts

export interface ComponentMetrics {
  name: string;
  location: string;
  type: "Server" | "Client";
  fpsIdle: number;
  fpsActive: number;
  memoryUsage: number;
  warnings: string[];
  recommendations: string[];
}

export interface PerformanceReport {
  timestamp: string;
  totalTestDuration: number;
  components: ComponentMetrics[];
  overallMetrics: {
    averageFPS: number;
    totalMemoryUsage: number;
    performanceScore: number;
  };
  criticalIssues: string[];
  optimizationsPriority: string[];
}

export class FullPerformanceAnalyzer {
  // biome-ignore lint/suspicious/noExplicitAny: Tipo Playwright Page dinámico
  private page: any;
  private baseURL = "http://localhost:3001";

  // biome-ignore lint/suspicious/noExplicitAny: Tipo Playwright Page dinámico
  constructor(page: any) {
    this.page = page;
  }

  /**
   * 🎯 ANÁLISIS COMPLETO DE TODOS LOS COMPONENTES
   */
  async runFullAnalysis(): Promise<PerformanceReport> {
    console.log("🔬 Iniciando análisis completo de rendimiento...");

    const startTime = Date.now();
    const components: ComponentMetrics[] = [];

    // Navigate to main page
    await this.page.goto(this.baseURL);
    await this.page.waitForLoadState("networkidle");

    // 1. Hero Section Components
    components.push(await this.analyzeHeaderNavigation());
    components.push(await this.analyzeHeroContent());
    components.push(await this.analyzeValuePropsGrid());
    components.push(await this.analyzeWavesBackground());
    components.push(await this.analyzeCallToAction());

    // 2. Animation System Components
    components.push(await this.analyzeWSFadeInComponents());
    components.push(await this.analyzeWSHoverEffects());
    components.push(await this.analyzeWSLetterReveal());

    // 3. UI Components
    components.push(await this.analyzeThemeToggle());

    // 4. Overall Page Performance
    const overallMetrics = await this.analyzeOverallPerformance();

    const totalDuration = Date.now() - startTime;

    const report: PerformanceReport = {
      timestamp: new Date().toISOString(),
      totalTestDuration: totalDuration,
      components,
      overallMetrics,
      criticalIssues: this.identifyTriticalIssues(components),
      optimizationsPriority: this.prioritizeOptimizations(components),
    };

    await this.generateHTMLReport(report);

    return report;
  }

  /**
   * 🎯 HEADER NAVIGATION ANALYSIS
   */
  private async analyzeHeaderNavigation(): Promise<ComponentMetrics> {
    console.log("📊 Analizando Header Navigation...");

    // Test scroll performance impact
    const beforeScroll = await this.measurePerformance(2000);

    // Simulate scrolling to trigger scroll listeners
    await this.page.evaluate(() => {
      window.scrollTo({ top: 500, behavior: "smooth" });
    });
    await this.page.waitForTimeout(1000);

    const duringScroll = await this.measurePerformance(3000);

    // Test mobile menu toggle
    await this.page.click('[data-testid="mobile-menu-toggle"]').catch(() => {});
    await this.page.waitForTimeout(500);

    const _afterInteraction = await this.measurePerformance(2000);

    await this.page.evaluate(() =>
      window.scrollTo({ top: 0, behavior: "smooth" }),
    );

    const warnings = [];
    const recommendations = [];

    if (duringScroll.fps < 55) {
      warnings.push("FPS drops significantly during scroll");
      recommendations.push("Implement throttled scroll listener");
    }

    if (duringScroll.memoryUsage > beforeScroll.memoryUsage + 5) {
      warnings.push("Memory usage increases during scroll");
      recommendations.push("Optimize scroll state management");
    }

    return {
      name: "HeaderNavigation",
      location: "src/components/landing/hero/Hero.HeaderNavigation.tsx",
      type: "Client",
      fpsIdle: beforeScroll.fps,
      fpsActive: duringScroll.fps,
      memoryUsage: duringScroll.memoryUsage,
      warnings,
      recommendations,
    };
  }

  /**
   * 🎯 VALUE PROPS GRID ANALYSIS (CRÍTICO)
   */
  private async analyzeValuePropsGrid(): Promise<ComponentMetrics> {
    console.log("🚨 Analizando ValuePropsGrid (Componente Crítico)...");

    // Scroll to cards section
    await this.page.evaluate(() => {
      const cardsSection = document.querySelector(
        '[data-testid="value-props-grid"]',
      );
      if (cardsSection) {
        cardsSection.scrollIntoView({ behavior: "smooth" });
      }
    });
    await this.page.waitForTimeout(1000);

    // Measure idle performance (cards visible but no interaction)
    const idle = await this.measurePerformance(5000); // 5s idle test

    // Measure active performance (hover multiple cards)
    const cards = await this.page.$$('[data-testid="value-prop-card"]');

    let activeMetrics = { fps: 60, memoryUsage: 0 };
    if (cards.length > 0) {
      // Hover over each card for 1 second
      for (let i = 0; i < Math.min(cards.length, 3); i++) {
        await cards[i].hover();
        await this.page.waitForTimeout(1000);

        const currentMetrics = await this.measurePerformance(1000);
        if (currentMetrics.fps < activeMetrics.fps) {
          activeMetrics = currentMetrics;
        }
      }
    }

    const warnings = [];
    const recommendations = [];

    // CRITICAL performance thresholds for cards
    if (idle.fps < 55) {
      warnings.push("CRITICAL: Cards causing FPS drops even when idle");
      recommendations.push("Implement conditional GPU layers (will-change)");
      recommendations.push("Use static gradients for idle state");
    }

    if (activeMetrics.fps < 45) {
      warnings.push("CRITICAL: Severe FPS drops during card hover");
      recommendations.push("Throttle mousemove events to 16ms");
      recommendations.push("Optimize transform calculations");
    }

    if (idle.memoryUsage > 10) {
      warnings.push("High memory usage from cards");
      recommendations.push("Optimize gradient calculations");
    }

    return {
      name: "ValuePropsGrid",
      location: "src/components/landing/hero/Hero.ValuePropsGrid.tsx",
      type: "Client",
      fpsIdle: idle.fps,
      fpsActive: activeMetrics.fps,
      memoryUsage: idle.memoryUsage,
      warnings,
      recommendations,
    };
  }

  /**
   * 🎯 WAVES BACKGROUND ANALYSIS
   */
  private async analyzeWavesBackground(): Promise<ComponentMetrics> {
    console.log("🌊 Analizando Waves Background...");

    // Scroll to top to make sure waves are visible
    await this.page.evaluate(() =>
      window.scrollTo({ top: 0, behavior: "smooth" }),
    );
    await this.page.waitForTimeout(1000);

    const metrics = await this.measurePerformance(5000); // 5s measurement

    const warnings = [];
    const recommendations = [];

    // Check if SVG animations are causing issues
    const hasMultipleWaves = await this.page.evaluate(() => {
      const waves = document.querySelectorAll('[class*="animate-wave"]');
      return waves.length > 2;
    });

    if (hasMultipleWaves && metrics.fps < 58) {
      warnings.push("Multiple SVG wave animations impacting performance");
      recommendations.push("Reduce number of animated wave layers");
      recommendations.push("Use CSS transforms instead of path animations");
    }

    return {
      name: "WavesBackground",
      location: "src/components/landing/hero/Hero.WavesBackground.tsx",
      type: "Server",
      fpsIdle: metrics.fps,
      fpsActive: metrics.fps,
      memoryUsage: metrics.memoryUsage,
      warnings,
      recommendations,
    };
  }

  /**
   * 🎯 WS ANIMATION SYSTEM ANALYSIS
   */
  private async analyzeWSFadeInComponents(): Promise<ComponentMetrics> {
    console.log("✨ Analizando WSFadeIn Animation System...");

    // Count total WSFadeIn components
    const fadeInCount = await this.page.evaluate(() => {
      return document.querySelectorAll("[data-ws-fade-in]").length;
    });

    // Scroll through page to trigger fade ins
    await this.page.evaluate(() => {
      window.scrollTo({
        top: document.body.scrollHeight / 2,
        behavior: "smooth",
      });
    });
    await this.page.waitForTimeout(2000);

    const metrics = await this.measurePerformance(3000);

    const warnings = [];
    const recommendations = [];

    if (fadeInCount > 10) {
      warnings.push(
        `${fadeInCount} WSFadeIn components may cause performance issues`,
      );
      recommendations.push("Implement shared IntersectionObserver");
      recommendations.push("Use lazy loading for non-critical animations");
    }

    if (metrics.fps < 55) {
      warnings.push("Animation system impacting frame rate");
      recommendations.push("Batch animation triggers");
      recommendations.push("Optimize IntersectionObserver thresholds");
    }

    return {
      name: "WSFadeIn System",
      location: "src/components/animations/ws-fade-in.tsx",
      type: "Client",
      fpsIdle: metrics.fps,
      fpsActive: metrics.fps,
      memoryUsage: metrics.memoryUsage,
      warnings,
      recommendations,
    };
  }

  /**
   * 🎯 THEME TOGGLE ANALYSIS
   */
  private async analyzeThemeToggle(): Promise<ComponentMetrics> {
    console.log("🎨 Analizando Theme Toggle Performance...");

    const beforeToggle = await this.measurePerformance(1000);

    // Toggle theme
    await this.page.click('[data-testid="theme-toggle"]').catch(() => {});
    await this.page.waitForTimeout(1000); // Wait for theme transition

    const afterToggle = await this.measurePerformance(2000);

    // Toggle back
    await this.page.click('[data-testid="theme-toggle"]').catch(() => {});
    await this.page.waitForTimeout(1000);

    const _finalMetrics = await this.measurePerformance(1000);

    const warnings = [];
    const recommendations = [];

    if (afterToggle.fps < 50) {
      warnings.push("Theme toggle causing significant FPS drops");
      recommendations.push("Optimize CSS custom property transitions");
      recommendations.push("Use transform animations instead of color changes");
    }

    return {
      name: "ThemeToggle",
      location: "src/components/landing/hero/Hero.ThemeToggle.tsx",
      type: "Client",
      fpsIdle: beforeToggle.fps,
      fpsActive: afterToggle.fps,
      memoryUsage: afterToggle.memoryUsage,
      warnings,
      recommendations,
    };
  }

  /**
   * 🎯 Stub methods for other components
   */
  private async analyzeHeroContent(): Promise<ComponentMetrics> {
    const metrics = await this.measurePerformance(2000);
    return {
      name: "HeroContent",
      location: "src/components/landing/hero/Hero.Content.tsx",
      type: "Server",
      fpsIdle: metrics.fps,
      fpsActive: metrics.fps,
      memoryUsage: metrics.memoryUsage,
      warnings: [],
      recommendations: ["Server component - performance optimized by default"],
    };
  }

  private async analyzeCallToAction(): Promise<ComponentMetrics> {
    const metrics = await this.measurePerformance(2000);
    return {
      name: "CallToAction",
      location: "src/components/landing/hero/Hero.CallToAction.tsx",
      type: "Client",
      fpsIdle: metrics.fps,
      fpsActive: metrics.fps,
      memoryUsage: metrics.memoryUsage,
      warnings: [],
      recommendations: [],
    };
  }

  private async analyzeWSHoverEffects(): Promise<ComponentMetrics> {
    const metrics = await this.measurePerformance(2000);
    return {
      name: "WSHover Effects",
      location: "src/components/animations/ws-hover.tsx",
      type: "Client",
      fpsIdle: metrics.fps,
      fpsActive: metrics.fps,
      memoryUsage: metrics.memoryUsage,
      warnings: [],
      recommendations: [],
    };
  }

  private async analyzeWSLetterReveal(): Promise<ComponentMetrics> {
    const metrics = await this.measurePerformance(2000);
    return {
      name: "WSLetterReveal",
      location: "src/components/animations/ws-letter-reveal.tsx",
      type: "Client",
      fpsIdle: metrics.fps,
      fpsActive: metrics.fps,
      memoryUsage: metrics.memoryUsage,
      warnings: [],
      recommendations: [],
    };
  }

  /**
   * 🎯 OVERALL PAGE PERFORMANCE
   */
  private async analyzeOverallPerformance() {
    console.log("📈 Analizando rendimiento general de la página...");

    // Full page scroll test
    await this.page.evaluate(() =>
      window.scrollTo({ top: 0, behavior: "instant" }),
    );
    await this.page.waitForTimeout(500);

    const scrollMetrics = [];
    const scrollPositions = [0, 0.25, 0.5, 0.75, 1.0];

    for (const position of scrollPositions) {
      await this.page.evaluate((pos: number) => {
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        window.scrollTo({ top: maxScroll * pos, behavior: "smooth" });
      }, position);

      await this.page.waitForTimeout(1000);
      const metrics = await this.measurePerformance(2000);
      scrollMetrics.push(metrics);
    }

    const averageFPS =
      scrollMetrics.reduce((sum, m) => sum + m.fps, 0) / scrollMetrics.length;
    const totalMemoryUsage = Math.max(
      ...scrollMetrics.map((m) => m.memoryUsage),
    );

    // Performance score calculation
    const performanceScore = Math.min(100, Math.round((averageFPS / 60) * 100));

    return {
      averageFPS,
      totalMemoryUsage,
      performanceScore,
    };
  }

  /**
   * 🔧 UTILITY METHODS
   */
  private async measurePerformance(duration: number) {
    const startTime = performance.now();
    let frameCount = 0;
    const _lastTime = startTime;

    return new Promise<{ fps: number; memoryUsage: number }>((resolve) => {
      const measure = () => {
        frameCount++;
        const currentTime = performance.now();

        if (currentTime - startTime >= duration) {
          const fps = Math.round(
            (frameCount * 1000) / (currentTime - startTime),
          );

          // Estimate memory usage (simplified)
          // biome-ignore lint/suspicious/noExplicitAny: Performance API memory extension
          const memoryUsage = (performance as any).memory
            ? Math.round(
                // biome-ignore lint/suspicious/noExplicitAny: Performance API memory extension
                ((performance as any).memory.usedJSHeapSize -
                  // biome-ignore lint/suspicious/noExplicitAny: Performance API memory extension
                  (performance as any).memory.totalJSHeapSize) /
                  1024 /
                  1024,
              )
            : 0;

          resolve({ fps, memoryUsage });
        } else {
          requestAnimationFrame(measure);
        }
      };

      requestAnimationFrame(measure);
    });
  }

  private identifyTriticalIssues(components: ComponentMetrics[]): string[] {
    const critical: string[] = [];

    components.forEach((comp) => {
      if (comp.fpsIdle < 55) {
        critical.push(`${comp.name}: FPS drops below 55 even when idle`);
      }
      if (comp.fpsActive < 45) {
        critical.push(`${comp.name}: Severe FPS drops during interaction`);
      }
      if (comp.memoryUsage > 15) {
        critical.push(
          `${comp.name}: High memory usage (${comp.memoryUsage}MB)`,
        );
      }
    });

    return critical;
  }

  private prioritizeOptimizations(components: ComponentMetrics[]): string[] {
    const priorities: string[] = [];

    components
      .filter((c) => c.warnings.length > 2)
      .forEach((c) => {
        priorities.push(
          `HIGH: Optimize ${c.name} - ${c.warnings.length} issues`,
        );
      });

    // Medium priority: Performance issues
    components
      .filter((c) => c.fpsIdle < 55 || c.fpsActive < 50)
      .forEach((c) => {
        priorities.push(`MEDIUM: Performance issues in ${c.name}`);
      });

    // Low priority: Memory optimizations
    components
      .filter((c) => c.memoryUsage > 5)
      .forEach((c) => {
        priorities.push(`LOW: Memory optimization for ${c.name}`);
      });

    return priorities;
  }

  /**
   * 📊 GENERATE HTML REPORT
   */
  private async generateHTMLReport(report: PerformanceReport) {
    const html = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WebCode - Análisis Completo de Rendimiento</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#3b82f6',
                        success: '#10b981',
                        warning: '#f59e0b',
                        danger: '#ef4444'
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-gray-50 text-gray-900">
    <div class="container mx-auto p-8 max-w-7xl">
        <header class="mb-8">
            <h1 class="text-4xl font-bold text-primary mb-2">🔬 Análisis Completo de Rendimiento</h1>
            <p class="text-gray-600">WebCode - Todos los Componentes</p>
            <div class="mt-4 flex gap-4">
                <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    📅 ${new Date(report.timestamp).toLocaleString("es-ES")}
                </span>
                <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    ⏱️ Duración: ${Math.round(report.totalTestDuration / 1000)}s
                </span>
            </div>
        </header>

        <!-- Overall Metrics -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white p-6 rounded-lg shadow-sm">
                <h3 class="text-lg font-semibold mb-2">🎯 FPS Promedio</h3>
                <div class="text-3xl font-bold ${
                  report.overallMetrics.averageFPS >= 55
                    ? "text-success"
                    : "text-danger"
                }">
                    ${report.overallMetrics.averageFPS.toFixed(1)} FPS
                </div>
                <p class="text-sm text-gray-600 mt-1">Objetivo: 55+ FPS</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-sm">
                <h3 class="text-lg font-semibold mb-2">💾 Uso de Memoria</h3>
                <div class="text-3xl font-bold ${
                  report.overallMetrics.totalMemoryUsage <= 10
                    ? "text-success"
                    : "text-warning"
                }">
                    ${report.overallMetrics.totalMemoryUsage}MB
                </div>
                <p class="text-sm text-gray-600 mt-1">Objetivo: <10MB</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-sm">
                <h3 class="text-lg font-semibold mb-2">📊 Score General</h3>
                <div class="text-3xl font-bold ${
                  report.overallMetrics.performanceScore >= 90
                    ? "text-success"
                    : report.overallMetrics.performanceScore >= 70
                      ? "text-warning"
                      : "text-danger"
                }">
                    ${report.overallMetrics.performanceScore}/100
                </div>
                <p class="text-sm text-gray-600 mt-1">Basado en FPS</p>
            </div>
        </div>

        <!-- Critical Issues -->
        ${
          report.criticalIssues.length > 0
            ? `
        <div class="bg-red-50 border border-red-200 p-6 rounded-lg mb-8">
            <h3 class="text-lg font-semibold text-red-800 mb-4">🚨 Problemas Críticos</h3>
            <ul class="space-y-2">
                ${report.criticalIssues
                  .map(
                    (issue) => `
                <li class="flex items-start gap-2">
                    <span class="text-red-500 mt-1">⚠️</span>
                    <span class="text-red-700">${issue}</span>
                </li>
                `,
                  )
                  .join("")}
            </ul>
        </div>
        `
            : ""
        }

        <!-- Components Analysis -->
        <div class="mb-8">
            <h2 class="text-2xl font-bold mb-6">📋 Análisis por Componente</h2>
            <div class="grid gap-6">
                ${report.components
                  .map(
                    (comp) => `
                <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 ${
                  comp.warnings.length > 0
                    ? "border-red-400"
                    : "border-green-400"
                }">
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <h3 class="text-xl font-semibold">${comp.name}</h3>
                            <p class="text-sm text-gray-600">${
                              comp.location
                            }</p>
                            <span class="inline-block mt-2 px-2 py-1 text-xs rounded-full ${
                              comp.type === "Server"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }">
                                ${comp.type} Component
                            </span>
                        </div>
                        <div class="text-right">
                            <div class="text-sm text-gray-600">FPS</div>
                            <div class="text-2xl font-bold ${
                              comp.fpsIdle >= 55
                                ? "text-success"
                                : "text-danger"
                            }">
                                ${comp.fpsIdle} / ${comp.fpsActive}
                            </div>
                            <div class="text-xs text-gray-500">idle / active</div>
                        </div>
                    </div>
                    
                    ${
                      comp.warnings.length > 0
                        ? `
                    <div class="mb-4">
                        <h4 class="font-semibold text-orange-800 mb-2">⚠️ Advertencias</h4>
                        <ul class="text-sm space-y-1">
                            ${comp.warnings
                              .map(
                                (warning) => `
                            <li class="text-orange-700">• ${warning}</li>
                            `,
                              )
                              .join("")}
                        </ul>
                    </div>
                    `
                        : ""
                    }
                    
                    ${
                      comp.recommendations.length > 0
                        ? `
                    <div>
                        <h4 class="font-semibold text-blue-800 mb-2">💡 Recomendaciones</h4>
                        <ul class="text-sm space-y-1">
                            ${comp.recommendations
                              .map(
                                (rec) => `
                            <li class="text-blue-700">• ${rec}</li>
                            `,
                              )
                              .join("")}
                        </ul>
                    </div>
                    `
                        : ""
                    }
                </div>
                `,
                  )
                  .join("")}
            </div>
        </div>

        <!-- Optimization Priorities -->
        <div class="bg-white p-6 rounded-lg shadow-sm">
            <h2 class="text-2xl font-bold mb-6">🎯 Prioridades de Optimización</h2>
            <div class="space-y-3">
                ${report.optimizationsPriority
                  .map(
                    (priority) => `
                <div class="flex items-center gap-3 p-3 rounded-lg ${
                  priority.startsWith("HIGH")
                    ? "bg-red-50"
                    : priority.startsWith("MEDIUM")
                      ? "bg-yellow-50"
                      : "bg-blue-50"
                }">
                    <span class="text-lg">
                        ${
                          priority.startsWith("HIGH")
                            ? "🚨"
                            : priority.startsWith("MEDIUM")
                              ? "⚠️"
                              : "💡"
                        }
                    </span>
                    <span class="flex-1">${priority}</span>
                </div>
                `,
                  )
                  .join("")}
            </div>
        </div>
    </div>
</body>
</html>
    `;

    console.log("📊 Reporte HTML generado exitosamente");
    return html;
  }
}

// Export para uso en Playwright
export default FullPerformanceAnalyzer;
