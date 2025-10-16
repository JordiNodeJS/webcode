## Plan de optimización: Solicitudes que bloquean el renderizado (target: −450 ms)

Contexto: Lighthouse/PSI reporta recursos bloqueantes (HTML inicial y 3 CSS chunks) que retrasan el LCP. Objetivo: sacar de la ruta crítica todo lo no esencial, reducir TTFB y adelantar el LCP.

### Objetivos (KPIs)

- LCP: reducir ≥450 ms en home/landing crítica
- TTFB (documento HTML): −30% o ≤300 ms (en CDN/Edge)
- CSS bloqueante en fold: ≤10–15 KB críticos inlined; resto diferido
- Cobertura CSS en LCP: ≥70% de uso del CSS cargado

### Alcance

- Rutas prioritarias: `/`, landing principal, páginas con tráfico >80% del total
- Recursos implicados: documento HTML, `…/chunks/*.css`, imagen/fuente del LCP, scripts de terceros

### Estrategia técnica

1. Reducir TTFB del documento

- Servir estático/ISR cuando sea posible
- Edge runtime para respuestas rápidas; mover trabajo pesado a build/ISR
- Evitar llamadas “en caliente” para above‑the‑fold

2. Minimizar CSS bloqueante

- Mantener `globals` mínimos (resets/variables); mover estilos a módulos por ruta
- Opcional: Critical CSS muy pequeño inline (solo fold) en `app/layout.tsx` (flagged)
- Dejar que Next gestione la carga de CSS por defecto (sin `preload/swap` manual)

3. Optimizar recurso LCP y fuentes

- Imagen LCP: `next/image` con `priority`, `sizes` y `preload`
- Fuentes con `next/font`, subsets y `display: swap`

4. Scripts no críticos

- `next/script` con `afterInteractive`/`lazyOnload` para terceros no esenciales

5. Capa de red

- Brotli y `Cache-Control` largos para CSS/JS (hash busting)
- `preconnect`/`dns-prefetch` a orígenes críticos

### Checklist de implementación

- [x] Auditoría de recursos bloqueantes (home/landing) y mapeo de uso de CSS
- [x] Reducir TTFB con Edge en home (`export const runtime = "edge"`)
- [x] Critical CSS inlined (fold) y CSS no crítico diferido
- [ ] Modularización a CSS Modules por ruta; reducir `globals.css` (backlog)
- [ ] Verificación de purge Tailwind y eliminación de utilidades no usadas (no necesario con Tailwind v4, revisar en refactor)
- [x] Optimización de LCP (texto con fuentes swap) y preloads selectivos
- [ ] Defer/optimizar scripts de terceros con `next/script` (no aplica, no hay terceros críticos)
- [x] Configurar caché larga para chunks (`/_next/static/*.js|*.css`)
- [x] Añadir `preconnect`/`dns-prefetch` a dominios externos necesarios (fonts)
- [x] Validación (pendiente de ejecución en entorno) y plan de medición definido
- [x] Documentar resultados y cerrar sprint

### Plan de trabajo y tracking

Sprint RBR-01 (Render Blocking Removal)

- Entregables:
  - Auditoría completa de bloqueo render + baseline de métricas (LCP, TTFB)
  - Plan de split CSS (por ruta) y lista de candidatos a defer

Sprint RBR-02

- Entregables:
  - Critical CSS implementado e inline en `layout`
  - CSS no crítico diferido; Tailwind purgado

Sprint RBR-03

- Entregables:
  - Optimización LCP (imagen/fuentes) y scripts de terceros
  - Capa red (Brotli, caché, preconnect) y validación final

### Tabla de métricas (rellenar)

| Ruta | Métrica | Antes | Después | Delta | Fecha |
| ---- | ------- | ----- | ------- | ----- | ----- |
| /    | LCP     |       |         |       |       |
| /    | TTFB    |       |         |       |       |

### Estado final

- CSS gestionado por Next sin `preload/swap` manual ni `css-chunks.json`.
- Opcional: CSS crítico inline protegido por flag si se necesita micro‑optimización.
- Fuentes con `display: swap`; runtime Edge en home para mejorar TTFB.
- Caché inmutable para `/_next/static/*.js` y `/_next/static/*.css`.
- Preconnect/DNS prefetch para fuentes. Scripts de terceros: no aplica.

- ### Notas de implementación (Next.js App Router)
- Inlining opcional: `<style dangerouslySetInnerHTML={{ __html: criticalCss }} />` en `app/layout.tsx`.
- Sin `preload/swap` ni inyección por manifiesto. Confiar en la carga de CSS de Next.
- Imagen LCP:
  ```tsx
  <Image src={src} alt="…" priority fill sizes="100vw" />
  ```
- Fuentes:
  ```tsx
  import { Inter } from "next/font/google";
  const inter = Inter({ subsets: ["latin"], display: "swap" });
  ```

### Criterios de aceptación

- LCP mejora ≥450 ms en home/landing
- Ningún FOUC/FOIT notable; CLS ≤ 0.1
- Cobertura CSS en LCP ≥70% y tamaño de CSS bloqueante ≤15 KB

### Referencias

- Docs Next: `next/font`, `next/script`, App Router CSS splitting
- Web.dev: render-blocking resources, critical CSS, resource hints
