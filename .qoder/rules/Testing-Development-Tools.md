---
trigger: model_decision
description: "Generate unit tests, E2E tests, visual testing, or development tools"
---

# Testing y Herramientas de Desarrollo WebSnack

## Testing Automatizado

### Framework de Testing
- Jest + React Testing Library para unit tests
- Playwright para testing E2E
- Testing con TypeScript estricto

### Patrones de Testing

```typescript
// Unit Testing Pattern
import { render, screen } from "@testing-library/react";
import { ContactForm } from "@/components/custom/ContactForm";

describe("ContactForm Component", () => {
  it("renders contact form correctly", () => {
    render(<ContactForm />);
    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("validates required fields", async () => {
    render(<ContactForm />);
    const submitButton = screen.getByRole("button", { name: /enviar/i });
    
    await userEvent.click(submitButton);
    
    expect(screen.getByText("Nombre es requerido")).toBeInTheDocument();
    expect(screen.getByText("Email es requerido")).toBeInTheDocument();
  });
});
```

### E2E Testing con Playwright

```typescript
// E2E Testing Pattern
import { test, expect } from "@playwright/test";

test("contact form submission", async ({ page }) => {
  await page.goto("/contact");
  
  await page.fill("[data-testid=name]", "Test User");
  await page.fill("[data-testid=email]", "test@example.com");
  await page.fill("[data-testid=message]", "Mensaje de prueba");
  
  await page.click("[data-testid=submit]");
  
  await expect(page.locator(".success-message")).toBeVisible();
});
```

## Verificación Visual con Playwright

### Flujo de Trabajo Estándar
1. Asumir que el servidor de desarrollo está en marcha
2. Utilizar Playwright para verificar cambios implementados
3. Tomar screenshots para validar el resultado visualmente
4. Analizar la imagen tomada para confirmar cambios esperados
5. Si no coincide: ajustar el código y repetir el proceso

### Comandos Típicos

```javascript
// Navegación y captura
await page.goto("http://localhost:3000/ruta-a-verificar");
await page.screenshot({ path: "verification.png", fullPage: true });

// Verificación de elementos específicos
await page.locator('[data-testid="componente"]').screenshot();

// Testing de responsiveness
await page.setViewportSize({ width: 375, height: 667 }); // Mobile
await page.screenshot({ path: "mobile-view.png" });
```

## Criterios de Aceptación
- Servidor de desarrollo funcionando
- Screenshots reflejan cambios esperados
- Componentes siguen patrones establecidos
- Testing pasa sin errores
- Accesibilidad verificada
- Performance dentro de límites establecidos
- Coverage mínimo del 80%