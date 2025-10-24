import { test, expect } from "@playwright/test";

test.describe("Theme Toggle", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
    // Esperar a que la página cargue completamente
    await page.waitForLoadState("networkidle");
  });

  test("debe cambiar el tema de claro a oscuro", async ({ page }) => {
    // Verificar que el botón existe
    const themeToggle = page.getByTestId("theme-toggle");
    await expect(themeToggle).toBeVisible();

    // Obtener el tema inicial
    const htmlElement = page.locator("html");
    const initialTheme = await htmlElement.getAttribute("class");
    
    // Click en el botón de toggle
    await themeToggle.click();
    
    // Esperar a que el tema cambie
    await page.waitForTimeout(300);
    
    // Verificar que el tema cambió
    const newTheme = await htmlElement.getAttribute("class");
    expect(newTheme).not.toBe(initialTheme);
  });

  test("debe alternar entre temas con múltiples clicks", async ({ page }) => {
    const themeToggle = page.getByTestId("theme-toggle");
    const htmlElement = page.locator("html");
    
    // Obtener tema inicial
    const theme1 = await htmlElement.getAttribute("class");
    
    // Primer click
    await themeToggle.click();
    await page.waitForTimeout(300);
    const theme2 = await htmlElement.getAttribute("class");
    expect(theme2).not.toBe(theme1);
    
    // Segundo click (debería volver al tema inicial)
    await themeToggle.click();
    await page.waitForTimeout(300);
    const theme3 = await htmlElement.getAttribute("class");
    expect(theme3).toBe(theme1);
  });

  test("debe persistir el tema después de recargar", async ({ page }) => {
    const themeToggle = page.getByTestId("theme-toggle");
    const htmlElement = page.locator("html");
    
    // Cambiar al tema oscuro
    await themeToggle.click();
    await page.waitForTimeout(300);
    
    const themeBeforeReload = await htmlElement.getAttribute("class");
    
    // Recargar la página
    await page.reload();
    await page.waitForLoadState("networkidle");
    
    // Verificar que el tema se mantuvo
    const themeAfterReload = await htmlElement.getAttribute("class");
    expect(themeAfterReload).toBe(themeBeforeReload);
  });

  test("debe tener accesibilidad correcta", async ({ page }) => {
    const themeToggle = page.getByTestId("theme-toggle");
    
    // Verificar que tiene aria-label
    const ariaLabel = await themeToggle.getAttribute("aria-label");
    expect(ariaLabel).toBeTruthy();
    expect(ariaLabel).toMatch(/modo (claro|oscuro)/i);
    
    // Verificar que es un botón
    expect(await themeToggle.getAttribute("role")).toBeNull(); // Los Button de shadcn/ui tienen role implícito
  });
});
