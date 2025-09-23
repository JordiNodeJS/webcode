# Performance Testing

Esta carpeta contiene scripts y herramientas de testing de performance que utilizan Playwright y otras dependencias de desarrollo.

## Archivos

- `PerformanceTestAutomation.ts`: Script de automatización de pruebas de rendimiento con Playwright

## Nota importante

Los archivos en esta carpeta están excluidos del build de producción de Next.js para evitar problemas de dependencias (como `@playwright/test`) que no están disponibles en el entorno de producción.

## Uso

Estos archivos están diseñados para ejecutarse en el entorno de desarrollo local para análisis de performance y testing automatizado.
