// 🔬 Simplified Performance Analysis Script
// scripts/simple-performance-test.js

const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

async function simplePerformanceTest() {
  console.log("🚀 Starting simplified performance analysis...");

  const browser = await chromium.launch({
    headless: false,
    devtools: false,
    args: ["--enable-memory-info"]
  });

  try {
    const page = await browser.newPage();

    // Add performance monitoring to page
    await page.addInitScript(() => {
      window.performanceData = {
        fps: [],
        memory: [],
        timestamps: []
      };

      let frameCount = 0;
      let startTime = performance.now();

      function measureFrame() {
        frameCount++;
        const currentTime = performance.now();

        if (currentTime - startTime >= 1000) {
          // Every second
          const fps = Math.round(
            (frameCount * 1000) / (currentTime - startTime)
          );
          const memory = performance.memory
            ? Math.round(performance.memory.usedJSHeapSize / 1024 / 1024)
            : 0;

          window.performanceData.fps.push(fps);
          window.performanceData.memory.push(memory);
          window.performanceData.timestamps.push(new Date().toISOString());

          frameCount = 0;
          startTime = currentTime;
        }

        requestAnimationFrame(measureFrame);
      }

      requestAnimationFrame(measureFrame);
    });

    // Navigate to the site
    console.log("📡 Navigating to WebCode...");
    await page.goto("http://localhost:3001", {
      waitUntil: "networkidle",
      timeout: 10000
    });

    console.log("✅ Page loaded, starting measurements...");

    // **Test 1: Idle Performance (5 seconds)**
    console.log("⏸️ Testing idle performance...");
    await page.waitForTimeout(5000);

    let perfData = await page.evaluate(() => window.performanceData);
    console.log(
      `📊 Idle FPS: ${perfData.fps.slice(-3).join(", ")} (avg: ${Math.round(
        perfData.fps.reduce((a, b) => a + b, 0) / perfData.fps.length
      )})`
    );

    // **Test 2: Scroll Performance**
    console.log("📜 Testing scroll performance...");

    await page.evaluate(() => {
      window.scrollTo({
        top: document.body.scrollHeight / 2,
        behavior: "smooth"
      });
    });
    await page.waitForTimeout(2000);

    await page.evaluate(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    });
    await page.waitForTimeout(2000);

    await page.evaluate(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    await page.waitForTimeout(2000);

    perfData = await page.evaluate(() => window.performanceData);
    const recentFPS = perfData.fps.slice(-6);
    console.log(
      `📊 Scroll FPS: ${recentFPS.join(", ")} (avg: ${Math.round(
        recentFPS.reduce((a, b) => a + b, 0) / recentFPS.length
      )})`
    );

    // **Test 3: Card Hover Performance**
    console.log("🃏 Testing card hover performance...");

    const cards = await page.$$('.grid > div, [class*="card"]');
    console.log(`Found ${cards.length} potential card elements`);

    if (cards.length > 0) {
      for (let i = 0; i < Math.min(3, cards.length); i++) {
        await cards[i].hover();
        await page.waitForTimeout(1000);

        const currentPerf = await page.evaluate(() => {
          const data = window.performanceData;
          return {
            fps: data.fps[data.fps.length - 1] || 0,
            memory: data.memory[data.memory.length - 1] || 0
          };
        });

        console.log(
          `📊 Card ${i + 1} hover - FPS: ${currentPerf.fps}, Memory: ${
            currentPerf.memory
          }MB`
        );
      }
    }

    // **Final Performance Summary**
    const finalData = await page.evaluate(() => window.performanceData);

    const avgFPS = Math.round(
      finalData.fps.reduce((a, b) => a + b, 0) / finalData.fps.length
    );
    const maxMemory = Math.max(...finalData.memory);
    const minFPS = Math.min(...finalData.fps);

    const summary = {
      timestamp: new Date().toISOString(),
      testDuration: finalData.fps.length,
      averageFPS: avgFPS,
      minimumFPS: minFPS,
      maxMemoryUsage: maxMemory,
      fpsReadings: finalData.fps,
      memoryReadings: finalData.memory,
      performanceScore: Math.min(100, Math.round((minFPS / 60) * 100)),
      issues: []
    };

    // Identify issues
    if (minFPS < 55) {
      summary.issues.push(`⚠️ FPS dropped to ${minFPS} (below 55 target)`);
    }
    if (maxMemory > 50) {
      summary.issues.push(`⚠️ Memory usage reached ${maxMemory}MB (high)`);
    }
    if (avgFPS < 58) {
      summary.issues.push(`⚠️ Average FPS ${avgFPS} below optimal (58+)`);
    }

    console.log("\n🔬 PERFORMANCE ANALYSIS SUMMARY");
    console.log("=====================================");
    console.log(`📊 Average FPS: ${avgFPS} FPS`);
    console.log(`📉 Minimum FPS: ${minFPS} FPS`);
    console.log(`💾 Max Memory: ${maxMemory} MB`);
    console.log(`🎯 Performance Score: ${summary.performanceScore}/100`);
    console.log(`⏱️ Test Duration: ${summary.testDuration} seconds`);

    if (summary.issues.length > 0) {
      console.log("\n🚨 ISSUES IDENTIFIED:");
      summary.issues.forEach((issue) => console.log(`   ${issue}`));
    } else {
      console.log("\n✅ NO PERFORMANCE ISSUES DETECTED");
    }

    // Save detailed report
    const reportPath = path.join(
      __dirname,
      "../docs/simple-performance-report.json"
    );
    fs.writeFileSync(reportPath, JSON.stringify(summary, null, 2));
    console.log(`\n📄 Detailed report saved to: ${reportPath}`);

    // Generate simple HTML report
    const htmlReport = generateSimpleHTMLReport(summary);
    const htmlPath = path.join(
      __dirname,
      "../docs/simple-performance-report.html"
    );
    fs.writeFileSync(htmlPath, htmlReport);
    console.log(`📄 HTML report saved to: ${htmlPath}`);

    return summary;
  } catch (error) {
    console.error("❌ Error during performance test:", error.message);
    throw error;
  } finally {
    await browser.close();
    console.log("✅ Browser closed");
  }
}

function generateSimpleHTMLReport(data) {
  const fpsChart = data.fpsReadings
    .map((fps, i) => `${i * 1000}: ${fps}`)
    .join(", ");

  return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WebCode - Simple Performance Report</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body class="bg-gray-50">
    <div class="container mx-auto p-8 max-w-4xl">
        <header class="mb-8">
            <h1 class="text-3xl font-bold text-blue-600 mb-2">🔬 WebCode Performance Report</h1>
            <p class="text-gray-600">Simple Automated Analysis • ${new Date(
              data.timestamp
            ).toLocaleString("es-ES")}</p>
        </header>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div class="bg-white p-4 rounded-lg shadow">
                <h3 class="font-semibold text-gray-700">Average FPS</h3>
                <div class="text-2xl font-bold ${
                  data.averageFPS >= 55 ? "text-green-600" : "text-red-600"
                }">
                    ${data.averageFPS}
                </div>
            </div>
            <div class="bg-white p-4 rounded-lg shadow">
                <h3 class="font-semibold text-gray-700">Minimum FPS</h3>
                <div class="text-2xl font-bold ${
                  data.minimumFPS >= 55 ? "text-green-600" : "text-red-600"
                }">
                    ${data.minimumFPS}
                </div>
            </div>
            <div class="bg-white p-4 rounded-lg shadow">
                <h3 class="font-semibold text-gray-700">Max Memory</h3>
                <div class="text-2xl font-bold ${
                  data.maxMemoryUsage <= 50
                    ? "text-green-600"
                    : "text-yellow-600"
                }">
                    ${data.maxMemoryUsage}MB
                </div>
            </div>
            <div class="bg-white p-4 rounded-lg shadow">
                <h3 class="font-semibold text-gray-700">Score</h3>
                <div class="text-2xl font-bold ${
                  data.performanceScore >= 90
                    ? "text-green-600"
                    : data.performanceScore >= 70
                      ? "text-yellow-600"
                      : "text-red-600"
                }">
                    ${data.performanceScore}/100
                </div>
            </div>
        </div>
        
        ${
          data.issues.length > 0
            ? `
        <div class="bg-red-50 border border-red-200 p-4 rounded-lg mb-8">
            <h3 class="font-bold text-red-800 mb-2">🚨 Issues Detected</h3>
            <ul class="text-red-700">
                ${data.issues.map((issue) => `<li>${issue}</li>`).join("")}
            </ul>
        </div>
        `
            : `
        <div class="bg-green-50 border border-green-200 p-4 rounded-lg mb-8">
            <h3 class="font-bold text-green-800 mb-2">✅ Performance Good</h3>
            <p class="text-green-700">No significant performance issues detected!</p>
        </div>
        `
        }
        
        <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="font-bold mb-4">📈 FPS Over Time</h3>
            <canvas id="fpsChart" width="400" height="200"></canvas>
        </div>
        
        <script>
            const ctx = document.getElementById('fpsChart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [${data.fpsReadings
                      .map((_, i) => `'${i}s'`)
                      .join(", ")}],
                    datasets: [{
                        label: 'FPS',
                        data: [${data.fpsReadings.join(", ")}],
                        borderColor: 'rgb(59, 130, 246)',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 70,
                            ticks: {
                                callback: function(value) {
                                    return value + ' FPS';
                                }
                            }
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Frame Rate Performance'
                        }
                    }
                }
            });
        </script>
    </div>
</body>
</html>
  `;
}

// Run the test
simplePerformanceTest()
  .then((result) => {
    console.log("✅ Performance test completed successfully!");
  })
  .catch((error) => {
    console.error("❌ Performance test failed:", error.message);
    process.exit(1);
  });
