# Rule: Testing y Herramientas de Desarrollo WebSnack

## **Aplica a**: `**/*.{test,spec}.{ts,tsx,js,jsx}` y `src/**/*.{ts,tsx}`

### **Testing Automatizado**

#### **Framework de Testing**
- Jest + React Testing Library para unit tests
- Playwright para testing E2E
- Testing con TypeScript estricto

#### **Patrones de Testing**

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

#### **E2E Testing con Playwright**

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

### **Verificación Visual con Playwright**

#### **Flujo de Trabajo Estándar**
1. Asumir que el servidor de desarrollo está en marcha
2. Utilizar Playwright para verificar cambios implementados
3. Tomar screenshots para validar el resultado visualmente
4. Analizar la imagen tomada para confirmar cambios esperados
5. Si no coincide: ajustar el código y repetir el proceso

#### **Comandos Típicos**

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

### **Desarrollo con MCPs**

#### **Context7 MCP - Mejora de Patrones**
- Detección mejorada de patrones en proyectos Next.js, React y Tailwind
- Generación de código optimizada basada en mejores prácticas
- Análisis de contexto para sugerencias más precisas

#### **shadcn/ui MCP - Gestión de Componentes**
- Optimizar la creación de componentes en proyectos Next.js y React
- Máximo provecho del MCP siguiendo las directrices de componentes
- Adaptación automática a la estructura del proyecto

### **Validación de Componentes**

```typescript
// Testing de Accesibilidad
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

test("should not have accessibility violations", async () => {
  const { container } = render(<ContactForm />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### **Performance Testing**

```typescript
// Performance Testing con Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";

test("Core Web Vitals", async ({ page }) => {
  await page.goto("/");
  
  // Verificar métricas de performance
  const lcp = await page.evaluate(() => {
    return new Promise((resolve) => {
      getLCP(resolve);
    });
  });
  
  expect(lcp.value).toBeLessThan(2500); // LCP < 2.5s
});
```

### **Flujo de Trabajo Integrado**

#### **Desarrollo → Testing → Verificación**
1. Implementar cambios en código
2. Ejecutar servidor de desarrollo
3. Usar Playwright para testing automatizado
4. Capturar screenshots para verificación visual
5. Aplicar MCPs para análisis de patrones y mejoras
6. Validar componentes con testing de accesibilidad

### **Comandos de Testing**

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Coverage
pnpm test:coverage

# Visual testing
pnpm test:visual
```

### **Criterios de Aceptación**
- Servidor de desarrollo funcionando
- Screenshots reflejan cambios esperados
- Componentes siguen patrones establecidos
- Testing pasa sin errores
- Accesibilidad verificada
- Performance dentro de límites establecidos
- Coverage mínimo del 80%