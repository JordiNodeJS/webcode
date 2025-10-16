// Script de automatización de pruebas de rendimiento con Playwright
// Este script se ejecutará cuando el servidor esté disponible

import { expect, type Page, test } from "@playwright/test";

interface PerformanceMetrics {
	fps: number;
	memory: number;
	renderCount: number;
	state: "REPOSO" | "ACTIVO";
	scenario: string;
	timestamp: number;
}

interface TestResults {
	scenario: string;
	avgFPS: number;
	minFPS: number;
	maxFPS: number;
	avgMemory: number;
	idleTime: number;
	activeTime: number;
	totalSamples: number;
}

class PerformanceTestAutomation {
	private page: Page;
	private results: TestResults[] = [];

	constructor(page: Page) {
		this.page = page;
	}

	async navigateToLab(): Promise<void> {
		await this.page.goto("http://localhost:3001/dev-performance-test");
		await this.page.waitForLoadState("networkidle");

		// Esperar a que los componentes se carguen
		await this.page.waitForSelector('[data-testid="performance-metrics"]', {
			timeout: 10000,
		});
	}

	async getPerformanceMetrics(): Promise<PerformanceMetrics> {
		// Extraer métricas de la UI
		const fps = await this.page.textContent('[data-testid="fps-value"]');
		const memory = await this.page.textContent('[data-testid="memory-value"]');
		const renderCount = await this.page.textContent(
			'[data-testid="render-count"]',
		);
		const state = await this.page.textContent(
			'[data-testid="state-indicator"]',
		);

		return {
			fps: parseInt(fps?.replace(" FPS", "") || "0", 10),
			memory: parseInt(memory?.replace(" MB", "") || "0", 10),
			renderCount: parseInt(renderCount || "0", 10),
			state: state?.includes("REPOSO") ? "REPOSO" : "ACTIVO",
			scenario: await this.getCurrentScenario(),
			timestamp: Date.now(),
		};
	}

	async getCurrentScenario(): Promise<string> {
		const activeScenario = await this.page.textContent(
			'[data-testid="active-scenario"]',
		);
		return activeScenario || "unknown";
	}

	async selectScenario(scenarioId: string): Promise<void> {
		await this.page.click(`[data-testid="scenario-${scenarioId}"]`);
		await this.page.waitForTimeout(1000); // Esperar a que se actualice
	}

	async startRecording(): Promise<void> {
		await this.page.click('[data-testid="start-recording"]');
		await this.page.waitForTimeout(500);
	}

	async stopRecording(): Promise<void> {
		await this.page.click('[data-testid="stop-recording"]');
		await this.page.waitForTimeout(500);
	}

	async measureIdlePerformance(
		scenario: string,
		duration: number = 30000,
	): Promise<TestResults> {
		console.log(`🔍 Midiendo rendimiento en reposo para: ${scenario}`);

		await this.selectScenario(scenario);
		await this.startRecording();

		const metrics: PerformanceMetrics[] = [];
		const startTime = Date.now();

		// Recopilar métricas durante el período especificado
		while (Date.now() - startTime < duration) {
			const metric = await this.getPerformanceMetrics();
			metrics.push(metric);

			// Esperar 100ms entre muestras
			await this.page.waitForTimeout(100);
		}

		await this.stopRecording();

		return this.calculateResults(scenario, metrics);
	}

	async measureActivePerformance(
		scenario: string,
		duration: number = 20000,
	): Promise<TestResults> {
		console.log(`⚡ Midiendo rendimiento activo para: ${scenario}`);

		await this.selectScenario(scenario);
		await this.startRecording();

		const metrics: PerformanceMetrics[] = [];
		const startTime = Date.now();

		// Simular interacciones de hover
		while (Date.now() - startTime < duration) {
			// Hacer hover sobre las tarjetas alternativamente
			const cards = await this.page
				.locator('[data-testid^="test-card-"]')
				.all();

			for (const card of cards) {
				await card.hover();
				await this.page.waitForTimeout(200);

				const metric = await this.getPerformanceMetrics();
				metrics.push(metric);

				// Mover el mouse fuera
				await this.page.mouse.move(0, 0);
				await this.page.waitForTimeout(100);

				if (Date.now() - startTime >= duration) break;
			}
		}

		await this.stopRecording();

		return this.calculateResults(scenario, metrics);
	}

	private calculateResults(
		scenario: string,
		metrics: PerformanceMetrics[],
	): TestResults {
		const fpsList = metrics.map((m) => m.fps);
		const memoryList = metrics.map((m) => m.memory);
		const idleMetrics = metrics.filter((m) => m.state === "REPOSO");
		const activeMetrics = metrics.filter((m) => m.state === "ACTIVO");

		return {
			scenario,
			avgFPS: Math.round(fpsList.reduce((a, b) => a + b, 0) / fpsList.length),
			minFPS: Math.min(...fpsList),
			maxFPS: Math.max(...fpsList),
			avgMemory: Math.round(
				memoryList.reduce((a, b) => a + b, 0) / memoryList.length,
			),
			idleTime: idleMetrics.length,
			activeTime: activeMetrics.length,
			totalSamples: metrics.length,
		};
	}

	async runCompleteTestSuite(): Promise<TestResults[]> {
		console.log("🚀 Iniciando suite completa de pruebas de rendimiento...");

		const scenarios = ["original", "optimized", "static"];
		const results: TestResults[] = [];

		for (const scenario of scenarios) {
			console.log(`\n📊 Probando escenario: ${scenario}`);

			// Prueba en reposo (30 segundos)
			const idleResults = await this.measureIdlePerformance(scenario, 30000);
			idleResults.scenario += "-idle";
			results.push(idleResults);

			// Pausa entre pruebas
			await this.page.waitForTimeout(2000);

			// Prueba activa (20 segundos)
			const activeResults = await this.measureActivePerformance(
				scenario,
				20000,
			);
			activeResults.scenario += "-active";
			results.push(activeResults);

			// Pausa más larga entre escenarios
			await this.page.waitForTimeout(5000);
		}

		this.results = results;
		return results;
	}

	generateReport(): string {
		console.log("\n📈 REPORTE DE RENDIMIENTO AUTOMATIZADO");
		console.log("=".repeat(50));

		let report = `
# 🔬 Reporte Automatizado de Rendimiento WebCode
## Generado: ${new Date().toLocaleString()}

### 📊 Resultados por Escenario

`;

		this.results.forEach((result) => {
			const isIdle = result.scenario.includes("idle");
			const scenarioName = result.scenario
				.replace("-idle", "")
				.replace("-active", "");
			const state = isIdle ? "REPOSO" : "ACTIVO";

			report += `
#### ${scenarioName.toUpperCase()} - ${state}
- **FPS Promedio**: ${result.avgFPS}
- **FPS Mínimo**: ${result.minFPS}
- **FPS Máximo**: ${result.maxFPS}
- **Memoria Promedio**: ${result.avgMemory} MB
- **Muestras Totales**: ${result.totalSamples}
- **Tiempo en Reposo**: ${Math.round(
				(result.idleTime / result.totalSamples) * 100,
			)}%
- **Tiempo Activo**: ${Math.round(
				(result.activeTime / result.totalSamples) * 100,
			)}%

`;
		});

		// Análisis comparativo
		const originalIdle = this.results.find(
			(r) => r.scenario === "original-idle",
		);
		const optimizedIdle = this.results.find(
			(r) => r.scenario === "optimized-idle",
		);
		const staticIdle = this.results.find((r) => r.scenario === "static-idle");

		if (originalIdle && optimizedIdle && staticIdle) {
			report += `
### 🎯 Análisis Comparativo (Estado de Reposo)

| Métrica | Original | Optimizada | Estática | Mejora |
|---------|----------|------------|----------|--------|
| FPS Promedio | ${originalIdle.avgFPS} | ${optimizedIdle.avgFPS} | ${
				staticIdle.avgFPS
			} | ${(
				((optimizedIdle.avgFPS - originalIdle.avgFPS) / originalIdle.avgFPS) *
					100
			).toFixed(1)}% |
| FPS Mínimo | ${originalIdle.minFPS} | ${optimizedIdle.minFPS} | ${
				staticIdle.minFPS
			} | ${optimizedIdle.minFPS - originalIdle.minFPS} FPS |
| Memoria | ${originalIdle.avgMemory} MB | ${optimizedIdle.avgMemory} MB | ${
				staticIdle.avgMemory
			} MB | ${originalIdle.avgMemory - optimizedIdle.avgMemory} MB |

### ✅ Conclusiones

**Problemas Identificados:**
${
	originalIdle.avgFPS < 58
		? "- ❌ FPS por debajo de 58 en reposo (original)"
		: "- ✅ FPS estables en reposo"
}
${
	originalIdle.avgMemory > staticIdle.avgMemory + 5
		? "- ❌ Consumo excesivo de memoria en reposo"
		: "- ✅ Memoria bajo control"
}

**Optimizaciones Validadas:**
${
	optimizedIdle.avgFPS > originalIdle.avgFPS
		? "- ✅ Mejora en FPS con versión optimizada"
		: "- ⚠️ No hay mejora significativa en FPS"
}
${
	optimizedIdle.avgMemory < originalIdle.avgMemory
		? "- ✅ Reducción en uso de memoria"
		: "- ⚠️ Sin mejora en memoria"
}

`;
		}

		console.log(report);
		return report;
	}
}

// Función para ejecutar las pruebas
export async function runAutomatedPerformanceTests(
	page: Page,
): Promise<string> {
	const automation = new PerformanceTestAutomation(page);

	try {
		await automation.navigateToLab();
		await automation.runCompleteTestSuite();
		return automation.generateReport();
	} catch (error) {
		console.error("Error durante las pruebas automatizadas:", error);
		throw error;
	}
}

// Test de Playwright
test.describe("Performance Lab - Automated Testing", () => {
	test("should measure performance for all scenarios", async ({ page }) => {
		await page.setViewportSize({ width: 1920, height: 1080 });

		const report = await runAutomatedPerformanceTests(page);

		// Verificar que el reporte contiene los resultados esperados
		expect(report).toContain("REPORTE AUTOMATIZADO");
		expect(report).toContain("original-idle");
		expect(report).toContain("optimized-idle");
		expect(report).toContain("static-idle");

		// Guardar reporte
		await page.evaluate((reportContent) => {
			console.log(reportContent);
		}, report);
	});
});

export { PerformanceTestAutomation };
