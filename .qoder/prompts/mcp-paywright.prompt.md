# PLAYWRIGHT -Verificación Visual

### **Flujo de Trabajo Estándar**

1. **Asume que el servidor de desarrollo está en marcha**
2. **Utiliza el MCP de Playwright** para verificar cambios implementados
3. **Toma screenshots** para validar el resultado visualmente
4. **Analiza la imagen tomada** para confirmar que refleja los cambios esperados
5. **Si no coincide**: ajusta el código y repite el proceso
6. Escribe el código en el MCP de playwright.

## No utilices:

- npx playwright test tests/playwright/simple-back-button-test.spec.ts --project=chromium
- no escribas código de Playwright en el archivo de prueba
- no utilices el comando npx playwright test
