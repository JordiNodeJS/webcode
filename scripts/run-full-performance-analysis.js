// 🔬 Playwright Script - Análisis Completo de Rendimiento
// scripts/run-full-performance-analysis.js

const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

async function runFullPerformanceAnalysis() {
  console.log(
    "🚀 Iniciando análisis completo de rendimiento con Playwright..."
  );

  let browser;
  let context;
  let page;

  try {
    // Launch browser
    browser = await chromium.launch({
      headless: false, // Visible para debugging
      devtools: true,
      args: [
        "--enable-memory-info",
        "--enable-precise-memory-info",
        "--disable-web-security",
        "--allow-running-insecure-content",
      ],
    });

    context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      deviceScaleFactor: 1,
    });

    page = await context.newPage();

    // Enable console logging
    page.on("console", (msg) => {
      if (msg.type() === "log") {
        console.log("📊", msg.text());
      }
    });

    console.log("✅ Browser launched successfully");

    // Wait for dev server to be ready
    console.log("⏳ Waiting for development server...");
    let serverReady = false;
    let attempts = 0;
    const maxAttempts = 10;

    while (!serverReady && attempts < maxAttempts) {
      try {
        await page.goto("http://localhost:3001", {
          waitUntil: "networkidle",
          timeout: 5000,
        });
        serverReady = true;
        console.log("✅ Development server is ready");
      } catch (error) {
        attempts++;
        console.log(
          `⏳ Attempt ${attempts}/${maxAttempts} - Server not ready yet...`
        );
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }

    if (!serverReady) {
      throw new Error(
        "❌ Development server is not accessible at http://localhost:3001"
      );
    }

    // Import the FullPerformanceAnalyzer class
    const analyzerCode = await fs.promises.readFile(
      path.join(__dirname, "../src/scripts/full-performance-analysis.ts"),
      "utf-8"
    );

    // Inject the analyzer into the page
    await page.addInitScript(() => {
      // Performance measurement utilities
      window.measureFPS = (duration) => {
        return new Promise((resolve) => {
          const startTime = performance.now();
          let frameCount = 0;

          const measure = () => {
            frameCount++;
            const currentTime = performance.now();

            if (currentTime - startTime >= duration) {
              const fps = Math.round(
                (frameCount * 1000) / (currentTime - startTime)
              );
              resolve(fps);
            } else {
              requestAnimationFrame(measure);
            }
          };

          requestAnimationFrame(measure);
        });
      };

      window.measureMemory = () => {
        if (performance.memory) {
          return Math.round(
            (performance.memory.usedJSHeapSize -
              performance.memory.totalJSHeapSize) /
              1024 /
              1024
          );
        }
        return 0;
      };
    });

    console.log("📊 Starting comprehensive performance analysis...");

    // **1. HEADER NAVIGATION ANALYSIS**
    console.log("🔍 Analyzing Header Navigation...");

    await page.goto("http://localhost:3001", { waitUntil: "networkidle" });

    const headerAnalysis = await page.evaluate(async () => {
      // Measure baseline performance
      const baselineFPS = await window.measureFPS(2000);
      const baselineMemory = window.measureMemory();

      // Simulate scroll to trigger scroll listeners
      window.scrollTo({ top: 500, behavior: "smooth" });
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const scrollFPS = await window.measureFPS(3000);
      const scrollMemory = window.measureMemory();

      // Test mobile menu toggle (if exists)
      const mobileToggle = document.querySelector(
        '[data-testid="mobile-menu-toggle"]'
      );
      if (mobileToggle) {
        mobileToggle.click();
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      const interactionFPS = await window.measureFPS(2000);
      const interactionMemory = window.measureMemory();

      window.scrollTo({ top: 0, behavior: "smooth" });

      return {
        name: "HeaderNavigation",
        fpsIdle: baselineFPS,
        fpsActive: scrollFPS,
        memoryUsage: Math.max(scrollMemory, interactionMemory),
        warnings: scrollFPS < 55 ? ["FPS drops during scroll"] : [],
        recommendations:
          scrollFPS < 55 ? ["Implement throttled scroll listener"] : [],
      };
    });

    console.log("✅ Header Navigation Analysis:", headerAnalysis);

    // **2. VALUE PROPS GRID ANALYSIS (CRITICAL)**
    console.log("🚨 Analyzing ValuePropsGrid (Critical Component)...");

    const valuePropsAnalysis = await page.evaluate(async () => {
      // Scroll to cards section
      const cardsSection =
        document.querySelector('[data-testid="value-props-grid"]') ||
        document.querySelector(".grid") ||
        document.querySelector('[class*="card"]');

      if (cardsSection) {
        cardsSection.scrollIntoView({ behavior: "smooth" });
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      // Measure idle performance with cards visible
      const idleFPS = await window.measureFPS(5000); // 5 second idle test
      const idleMemory = window.measureMemory();

      // Test card hover performance
      const cards = document.querySelectorAll(
        '[data-testid="value-prop-card"], [class*="card"]'
      );
      let activeFPS = 60;

      if (cards.length > 0) {
        for (let i = 0; i < Math.min(cards.length, 3); i++) {
          const card = cards[i];

          // Simulate hover
          const hoverEvent = new MouseEvent("mouseenter", { bubbles: true });
          card.dispatchEvent(hoverEvent);

          await new Promise((resolve) => setTimeout(resolve, 1000));

          const currentFPS = await window.measureFPS(1000);
          if (currentFPS < activeFPS) {
            activeFPS = currentFPS;
          }

          // Remove hover
          const leaveEvent = new MouseEvent("mouseleave", { bubbles: true });
          card.dispatchEvent(leaveEvent);
        }
      }

      const warnings = [];
      const recommendations = [];

      if (idleFPS < 55) {
        warnings.push("CRITICAL: Cards causing FPS drops even when idle");
        recommendations.push("Implement conditional GPU layers (will-change)");
        recommendations.push("Use static gradients for idle state");
      }

      if (activeFPS < 45) {
        warnings.push("CRITICAL: Severe FPS drops during card hover");
        recommendations.push("Throttle mousemove events to 16ms");
        recommendations.push("Optimize transform calculations");
      }

      if (idleMemory > 10) {
        warnings.push("High memory usage from cards");
        recommendations.push("Optimize gradient calculations");
      }

      return {
        name: "ValuePropsGrid",
        fpsIdle: idleFPS,
        fpsActive: activeFPS,
        memoryUsage: idleMemory,
        warnings,
        recommendations,
      };
    });

    console.log("🚨 ValuePropsGrid Analysis:", valuePropsAnalysis);

    // **3. WAVES BACKGROUND ANALYSIS**
    console.log("🌊 Analyzing Waves Background...");

    const wavesAnalysis = await page.evaluate(async () => {
      // Scroll to top to ensure waves are visible
      window.scrollTo({ top: 0, behavior: "smooth" });
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const fps = await window.measureFPS(5000);
      const memory = window.measureMemory();

      const warnings = [];
      const recommendations = [];

      // Check if multiple wave animations exist
      const waves = document.querySelectorAll('[class*="animate-wave"]');

      if (waves.length > 2 && fps < 58) {
        warnings.push("Multiple SVG wave animations impacting performance");
        recommendations.push("Reduce number of animated wave layers");
        recommendations.push("Use CSS transforms instead of path animations");
      }

      return {
        name: "WavesBackground",
        fpsIdle: fps,
        fpsActive: fps,
        memoryUsage: memory,
        warnings,
        recommendations,
      };
    });

    console.log("🌊 Waves Background Analysis:", wavesAnalysis);

    // **4. WS ANIMATION SYSTEM ANALYSIS**
    console.log("✨ Analyzing WS Animation System...");

    const animationSystemAnalysis = await page.evaluate(async () => {
      // Count fade-in components
      const fadeInElements = document.querySelectorAll(
        '[data-ws-fade-in], [class*="fade-in"], [class*="animate-"]'
      );
      const fadeInCount = fadeInElements.length;

      // Scroll to trigger animations
      const halfScroll = document.body.scrollHeight / 2;
      window.scrollTo({ top: halfScroll, behavior: "smooth" });
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const fps = await window.measureFPS(3000);
      const memory = window.measureMemory();

      const warnings = [];
      const recommendations = [];

      if (fadeInCount > 10) {
        warnings.push(
          `${fadeInCount} animation components may cause performance issues`
        );
        recommendations.push("Implement shared IntersectionObserver");
        recommendations.push("Use lazy loading for non-critical animations");
      }

      if (fps < 55) {
        warnings.push("Animation system impacting frame rate");
        recommendations.push("Batch animation triggers");
        recommendations.push("Optimize IntersectionObserver thresholds");
      }

      return {
        name: "WS Animation System",
        fpsIdle: fps,
        fpsActive: fps,
        memoryUsage: memory,
        warnings,
        recommendations,
      };
    });

    console.log("✨ Animation System Analysis:", animationSystemAnalysis);

    // **5. THEME TOGGLE ANALYSIS**
    console.log("🎨 Analyzing Theme Toggle...");

    const themeAnalysis = await page.evaluate(async () => {
      const beforeFPS = await window.measureFPS(1000);

      // Try to find and click theme toggle
      const themeToggle =
        document.querySelector('[data-testid="theme-toggle"]') ||
        document.querySelector('[class*="theme"]') ||
        document.querySelector('button[aria-label*="theme"]');

      let afterFPS = beforeFPS;
      let memory = window.measureMemory();

      if (themeToggle) {
        themeToggle.click();
        await new Promise((resolve) => setTimeout(resolve, 1000));

        afterFPS = await window.measureFPS(2000);
        memory = window.measureMemory();

        // Toggle back
        themeToggle.click();
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      const warnings = [];
      const recommendations = [];

      if (afterFPS < 50) {
        warnings.push("Theme toggle causing significant FPS drops");
        recommendations.push("Optimize CSS custom property transitions");
        recommendations.push(
          "Use transform animations instead of color changes"
        );
      }

      return {
        name: "ThemeToggle",
        fpsIdle: beforeFPS,
        fpsActive: afterFPS,
        memoryUsage: memory,
        warnings,
        recommendations,
      };
    });

    console.log("🎨 Theme Toggle Analysis:", themeAnalysis);

    // **6. OVERALL PAGE PERFORMANCE**
    console.log("📈 Analyzing Overall Page Performance...");

    const overallAnalysis = await page.evaluate(async () => {
      const scrollPositions = [0, 0.25, 0.5, 0.75, 1.0];
      const scrollMetrics = [];

      for (const position of scrollPositions) {
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        window.scrollTo({ top: maxScroll * position, behavior: "smooth" });
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const fps = await window.measureFPS(2000);
        const memory = window.measureMemory();
        scrollMetrics.push({ fps, memory });
      }

      const averageFPS =
        scrollMetrics.reduce((sum, m) => sum + m.fps, 0) / scrollMetrics.length;
      const totalMemoryUsage = Math.max(...scrollMetrics.map((m) => m.memory));
      const performanceScore = Math.min(
        100,
        Math.round((averageFPS / 60) * 100)
      );

      return {
        averageFPS: Math.round(averageFPS * 10) / 10,
        totalMemoryUsage,
        performanceScore,
      };
    });

    console.log("📈 Overall Performance:", overallAnalysis);

    // **7. COMPILE FINAL REPORT**
    const allComponents = [
      headerAnalysis,
      valuePropsAnalysis,
      wavesAnalysis,
      animationSystemAnalysis,
      themeAnalysis,
    ];

    // Identify critical issues
    const criticalIssues = [];
    allComponents.forEach((comp) => {
      if (comp.fpsIdle < 55) {
        criticalIssues.push(`${comp.name}: FPS drops below 55 even when idle`);
      }
      if (comp.fpsActive < 45) {
        criticalIssues.push(
          `${comp.name}: Severe FPS drops during interaction`
        );
      }
      if (comp.memoryUsage > 15) {
        criticalIssues.push(
          `${comp.name}: High memory usage (${comp.memoryUsage}MB)`
        );
      }
    });

    // Prioritize optimizations
    const optimizationsPriority = [];
    allComponents
      .filter((c) => c.warnings.length > 2)
      .forEach((c) =>
        optimizationsPriority.push(
          `HIGH: Optimize ${c.name} - ${c.warnings.length} issues`
        )
      );

    allComponents
      .filter((c) => c.fpsIdle < 55 || c.fpsActive < 50)
      .forEach((c) =>
        optimizationsPriority.push(`MEDIUM: Performance issues in ${c.name}`)
      );

    const finalReport = {
      timestamp: new Date().toISOString(),
      totalTestDuration: Date.now(),
      components: allComponents,
      overallMetrics: overallAnalysis,
      criticalIssues,
      optimizationsPriority,
    };

    // **8. GENERATE HTML REPORT**
    console.log("📊 Generating HTML Report...");

    const reportHTML = generateHTMLReport(finalReport);
    const reportPath = path.join(
      __dirname,
      "../docs/performance-report-full.html"
    );

    await fs.promises.writeFile(reportPath, reportHTML, "utf-8");
    console.log(`✅ Full Performance Report saved to: ${reportPath}`);

    // **9. CONSOLE SUMMARY**
    console.log("\n🔬 ANÁLISIS COMPLETO FINALIZADO");
    console.log("==========================================");
    console.log(`📊 FPS Promedio General: ${overallAnalysis.averageFPS} FPS`);
    console.log(
      `💾 Uso de Memoria Total: ${overallAnalysis.totalMemoryUsage}MB`
    );
    console.log(
      `🎯 Score de Performance: ${overallAnalysis.performanceScore}/100`
    );
    console.log(`🚨 Problemas Críticos: ${criticalIssues.length}`);
    console.log(
      `🔧 Optimizaciones Pendientes: ${optimizationsPriority.length}`
    );

    if (criticalIssues.length > 0) {
      console.log("\n🚨 PROBLEMAS CRÍTICOS IDENTIFICADOS:");
      criticalIssues.forEach((issue) => console.log(`   ⚠️  ${issue}`));
    }

    if (optimizationsPriority.length > 0) {
      console.log("\n🎯 PRÓXIMAS OPTIMIZACIONES RECOMENDADAS:");
      optimizationsPriority
        .slice(0, 5)
        .forEach((priority) => console.log(`   💡 ${priority}`));
    }

    console.log(`\n📄 Reporte completo disponible en: ${reportPath}`);

    return finalReport;
  } catch (error) {
    console.error("❌ Error during performance analysis:", error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
      console.log("✅ Browser closed");
    }
  }
}

function generateHTMLReport(report) {
  return `
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
            <p class="text-gray-600">WebCode - Todos los Componentes (Playwright Automation)</p>
            <div class="mt-4 flex gap-4">
                <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    📅 ${new Date(report.timestamp).toLocaleString("es-ES")}
                </span>
                <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    🤖 Automated Testing
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
                    ${report.overallMetrics.averageFPS} FPS
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
                `
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
                            <div class="text-sm text-gray-600">WebCode Component</div>
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
                            `
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
                            `
                              )
                              .join("")}
                        </ul>
                    </div>
                    `
                        : ""
                    }
                </div>
                `
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
                `
                  )
                  .join("")}
            </div>
        </div>
        
        <footer class="mt-8 pt-8 border-t text-center text-gray-500">
            <p>🤖 Generated automatically with Playwright • WebCode Performance Lab</p>
        </footer>
    </div>
</body>
</html>
  `;
}

// Run the analysis
runFullPerformanceAnalysis()
  .then((report) => {
    console.log("\n✅ Analysis completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Analysis failed:", error.message);
    process.exit(1);
  });
