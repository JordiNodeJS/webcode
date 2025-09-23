import { test, expect } from "@playwright/test";

// Test para medir el rendimiento del botón de volver
// Este test se ejecuta contra el servidor en producción

test.describe("Back Button Performance", () => {
  test("should navigate back quickly from privacy policy page", async ({
    page
  }) => {
    // Navegar a la página principal
    await page.goto("http://localhost:3000/");

    // Medir el tiempo de carga de la página de política de privacidad
    const startTime = Date.now();
    await page.goto("http://localhost:3000/politica-privacidad");
    const loadTime = Date.now() - startTime;

    console.log(`Tiempo de carga de la página de privacidad: ${loadTime}ms`);

    // Verificar que la página se haya cargado correctamente
    await expect(page).toHaveURL("http://localhost:3000/politica-privacidad");
    await expect(
      page.locator("h1:text('Política de Privacidad')")
    ).toBeVisible();

    // Encontrar el botón de volver (está en el layout)
    const backButton = page.locator('button[aria-label="Volver"]').first();
    await expect(backButton).toBeVisible();

    // Medir el tiempo de navegación hacia atrás
    const backStartTime = Date.now();
    await backButton.click();
    const backTime = Date.now() - backStartTime;

    console.log(`Tiempo de navegación hacia atrás: ${backTime}ms`);

    // Verificar que hemos vuelto a la página principal
    await expect(page).toHaveURL("http://localhost:3000/");

    // Afirmaciones de rendimiento
    // El tiempo de navegación hacia atrás debería ser menor a 1000ms
    expect(backTime).toBeLessThan(1000);

    // El tiempo de carga de la página de privacidad debería ser razonable
    expect(loadTime).toBeLessThan(5000);
  });

  test("should navigate back quickly from about page", async ({ page }) => {
    // Navegar a la página principal
    await page.goto("http://localhost:3000/");

    // Navegar a la página about
    await page.goto("http://localhost:3000/about");
    await page.waitForLoadState("networkidle");

    // Encontrar y hacer clic en el botón de volver
    const backButton = page.locator('button[aria-label="Volver"]').first();
    await expect(backButton).toBeVisible();

    // Medir el tiempo de navegación hacia atrás
    const backStartTime = Date.now();
    await backButton.click();
    const backTime = Date.now() - backStartTime;

    console.log(`Navegación hacia atrás desde /about a /: ${backTime}ms`);

    // Verificar que hemos vuelto a la página principal
    await page.waitForTimeout(100);
    await expect(page).toHaveURL("http://localhost:3000/");

    // Afirmaciones de rendimiento
    expect(backTime).toBeLessThan(1000);
  });

  test("should navigate back quickly from services page", async ({ page }) => {
    // Navegar a la página principal
    await page.goto("http://localhost:3000/");

    // Navegar a la página de servicios
    await page.goto("http://localhost:3000/services/web-development");
    await page.waitForLoadState("networkidle");

    // Encontrar y hacer clic en el botón de volver
    const backButton = page.locator('button[aria-label="Volver"]').first();
    await expect(backButton).toBeVisible();

    // Medir el tiempo de navegación hacia atrás
    const backStartTime = Date.now();
    await backButton.click();
    const backTime = Date.now() - backStartTime;

    console.log(
      `Navegación hacia atrás desde /services/web-development a /: ${backTime}ms`
    );

    // Verificar que hemos vuelto a la página principal
    await page.waitForTimeout(100);
    await expect(page).toHaveURL("http://localhost:3000/");

    // Afirmaciones de rendimiento
    expect(backTime).toBeLessThan(1000);
  });
});
