# WebCode - Stack Tecnológico 2025

> **Última actualización**: 15 Octubre 2025  
> **Estado**: ✅ Stack completamente implementado y validado  
> Documento técnico completo del proyecto WebCode con tecnologías de vanguardia.

---

## **[Objetivos]** Resumen Ejecutivo

WebCode se desarrollará utilizando el stack tecnológico más avanzado disponible en 2025, priorizando:

- **Performance extremo** con Core Web Vitals en verde
- **Developer Experience** de primera clase
- **Escalabilidad** para growth empresarial
- **Accesibilidad** WCAG 2.1 AA por defecto
- **SEO técnico** optimizado para mercado español/barcelonés

---

## **[Arquitectura]** Stack Principal (Core Technologies)

### ✅ Estado de Implementación

| Tecnología | Versión | Estado |
|------------|---------|--------|
| Next.js | 15.5.2 | ✅ Implementado |
| React | 19.1.0 | ✅ Implementado |
| TypeScript | 5.x | ✅ Implementado |
| Tailwind CSS | 4.x | ✅ Implementado |
| Framer Motion | 12.23.12 | ✅ Implementado |
| Lucide React | 0.542.0 | ✅ Implementado |
| shadcn/ui | Latest | ✅ Implementado |
| Playwright | 1.55.0 | ✅ Implementado |
| ESLint | 9.37.0 | ✅ Implementado |
| Prettier | 3.6.2 | ✅ Implementado |

### Frontend Framework

#### Next.js 15 + App Router

**Versión:** `15.5.2` ✅ **IMPLEMENTADO**  
**Estado:** Completamente configurado con App Router y Turbopack

Para crear el proyecto en una nueva carpeta con un nombre específico:

```bash
pnpm dlx create-next-app@latest . --turbo --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

Para crear el proyecto en la carpeta actual (asegúrate de que esté vacía):

```bash
pnpm create next-app@latest . --turbo --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

**Alternativa usando `pnpm dlx` (recomendado para evitar problemas de interpretación de parámetros):**

```bash
pnpm dlx create-next-app@latest . --turbo --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

> **Nota Importante**:
>
> 1. La opción `--turbo` debe ir después del nombre del proyecto o `.` para ser interpretada correctamente.
> 2. Si ejecutas el comando en una carpeta que ya existe y no está vacía, puede interpretar `--turbo` como el nombre del proyecto.
> 3. Asegúrate de estar en una carpeta vacía o especifica un nombre de proyecto para evitar problemas.
> 4. El uso de `pnpm dlx` puede evitar problemas de interpretación de parámetros en algunos casos.

```bash
pnpm add next@latest react@latest react-dom@latest
```

**Novedades Next.js 15:**

- **App Router estabilizado** - Navegación optimizada y Server Components por defecto
- **APIs asíncronas** - `cookies()`, `headers()`, `params`, `searchParams` ahora son Promises
- **Partial Prerendering (PPR)** - Combinación de contenido estático y dinámico en la misma ruta
- **React 19 Compatibility** - Soporte completo para nuevas funcionalidades de React
- **Performance mejorado** - Bundling optimizado y tiempo de build reducido 40%
- **Turbopack estable** - Reemplazo de Webpack con velocidad de build 10x más rápida

**Beneficios para WebCode:**

- **SEO-first** - Server-side rendering nativo mejora crawling y indexación
- **Core Web Vitals optimizados** - LCP <2.5s, FID <100ms, CLS <0.1 garantizados
- **TypeScript integrado** - Type safety end-to-end sin configuración adicional
- **Route handlers** - API endpoints optimizados para backend ligero

---

#### React 19

**Versión:** `19.1.0` ✅ **IMPLEMENTADO**  
**Estado:** Completamente integrado con Next.js 15

**Novedades React 19:**

- **React Compiler** - Optimización automática de re-renders sin useMemo/useCallback
- **Server Components estables** - Renderizado en servidor sin JavaScript del cliente
- **Concurrent Features** - Rendering no bloqueante para UX fluida
- **New Hooks** - `use()` para promises, `useActionState()` para form states
- **Better Hydration** - Selective hydration mejora First Input Delay

**Implementación WebCode:**

```tsx
// Server Component nativo - 0 JavaScript del cliente
export default async function LandingPage() {
  const testimonials = await getTestimonials(); // Server-side data fetching
  return (
    <main>
      <HeroSection />
      <ServicesGrid />
      <TestimonialsCarousel data={testimonials} />
    </main>
  );
}

// Client Component solo donde necesario
("use client");
export function ContactForm() {
  const [result, submitAction, isPending] = useActionState(submitForm, null);
  // Form handling optimizado con new hooks
}
```

---

### Styling & Design System

#### Tailwind CSS v4

**Versión:** `4.0.0-alpha.x` (transitioning to stable)
**Instalación:** Fase 1 - Setup inicial

```bash
pnpm add tailwindcss@next @tailwindcss/postcss@next
```

**Novedades Tailwind v4:**

- **CSS-first Configuration** - `@theme` directive reemplaza `tailwind.config.js`
- **Modern CSS Features** - Cascade layers, `@property`, `color-mix()` nativo
- **Performance Engine** - Engine Rust/CSS 50% más rápido que v3
- **Dynamic Utilities** - `grid-cols-15` disponible sin configuración previa
- **Container Queries** - `@min-*`, `@max-*` variants para responsive containers
- **3D Transforms** - `perspective-*`, `rotate-x-*`, `rotate-z-*` utilities

**Configuración WebCode:**

```css
/* app/globals.css */
@import "tailwindcss";

/* Tema personalizado WebCode - Rosa/Aguamarina con efectos 3D */
:root {
  --background: #ffffff;
  --foreground: #5b5b5b;
  --card: #ffffff;
  --card-foreground: #5b5b5b;
  --popover: #ffffff;
  --popover-foreground: #5b5b5b;
  --primary: #dc7cb3;
  --primary-foreground: #ffffff;
  --secondary: #bce3e5;
  --secondary-foreground: #333333;
  --muted: #f4fbfc;
  --muted-foreground: #7a7a7a;
  --accent: #fffcf7;
  --accent-foreground: #333333;
  --destructive: #fcb4b5;
  --destructive-foreground: #ffffff;
  --border: #dc7cb3;
  --input: #e4e4e4;
  --ring: #f0aacd;
  --chart-1: #f0aacd;
  --chart-2: #bee7f0;
  --chart-3: #fffcf7;
  --chart-4: #fce8f2;
  --chart-5: #e177ab;
  --sidebar: #ffffff;
  --sidebar-foreground: #333333;
  --sidebar-primary: #f280b8;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #fef6fb;
  --sidebar-accent-foreground: #333333;
  --sidebar-border: #ffffff;
  --sidebar-ring: #f280b8;
  --font-sans: Poppins, sans-serif;
  --font-serif: Lora, serif;
  --font-mono: Fira Code, monospace;
  --radius: 0.4rem;
  --shadow-2xs: 3px 3px 0px 0px hsl(325.5319 58.0247% 68.2353% / 0.5);
  --shadow-xs: 3px 3px 0px 0px hsl(325.5319 58.0247% 68.2353% / 0.5);
  --shadow-sm:
    3px 3px 0px 0px hsl(325.5319 58.0247% 68.2353% / 1),
    3px 1px 2px -1px hsl(325.5319 58.0247% 68.2353% / 1);
  --shadow:
    3px 3px 0px 0px hsl(325.5319 58.0247% 68.2353% / 1),
    3px 1px 2px -1px hsl(325.5319 58.0247% 68.2353% / 1);
  --shadow-md:
    3px 3px 0px 0px hsl(325.5319 58.0247% 68.2353% / 1),
    3px 2px 4px -1px hsl(325.5319 58.0247% 68.2353% / 1);
  --shadow-lg:
    3px 3px 0px 0px hsl(325.5319 58.0247% 68.2353% / 1),
    3px 4px 6px -1px hsl(325.5319 58.0247% 68.2353% / 1);
  --shadow-xl:
    3px 3px 0px 0px hsl(325.5319 58.0247% 68.2353% / 1),
    3px 8px 10px -1px hsl(325.5319 58.0247% 68.2353% / 1);
  --shadow-2xl: 3px 3px 0px 0px hsl(325.5319 58.0247% 68.2353% / 2.5);
  --tracking-normal: 0em;
  --spacing: 0.25rem;
}

.dark {
  --background: #162b37;
  --foreground: #ffffff;
  --card: #223743;
  --card-foreground: #ffffff;
  --popover: #223743;
  --popover-foreground: #ffffff;
  --primary: #fffcf7;
  --primary-foreground: #162b37;
  --secondary: #f6dee4;
  --secondary-foreground: #162b37;
  --muted: #2b2f34;
  --muted-foreground: #f6dee4;
  --accent: #d9a8ba;
  --accent-foreground: #ffffff;
  --destructive: #ed95c3;
  --destructive-foreground: #162b37;
  --border: #3c566b;
  --input: #263d49;
  --ring: #75c0c5;
  --chart-1: #75c0c5;
  --chart-2: #f6dee4;
  --chart-3: #d9a8ba;
  --chart-4: #1c6e82;
  --chart-5: #2b2f34;
  --sidebar: #132530;
  --sidebar-foreground: #ffffff;
  --sidebar-primary: #f280b8;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #fef6fb;
  --sidebar-accent-foreground: #253142;
  --sidebar-border: #424e61;
  --sidebar-ring: #f280b8;
  --font-sans: Poppins, sans-serif;
  --font-serif: Lora, serif;
  --font-mono: Fira Code, monospace;
  --radius: 0.4rem;
  --shadow-2xs: 3px 3px 0px 0px hsl(206.8085 28.1437% 32.7451% / 0.5);
  --shadow-xs: 3px 3px 0px 0px hsl(206.8085 28.1437% 32.7451% / 0.5);
  --shadow-sm:
    3px 3px 0px 0px hsl(206.8085 28.1437% 32.7451% / 1),
    3px 1px 2px -1px hsl(206.8085 28.1437% 32.7451% / 1);
  --shadow:
    3px 3px 0px 0px hsl(206.8085 28.1437% 32.7451% / 1),
    3px 1px 2px -1px hsl(206.8085 28.1437% 32.7451% / 1);
  --shadow-md:
    3px 3px 0px 0px hsl(206.8085 28.1437% 32.7451% / 1),
    3px 2px 4px -1px hsl(206.8085 28.1437% 32.7451% / 1);
  --shadow-lg:
    3px 3px 0px 0px hsl(206.8085 28.1437% 32.7451% / 1),
    3px 4px 6px -1px hsl(206.8085 28.1437% 32.7451% / 1);
  --shadow-xl:
    3px 3px 0px 0px hsl(206.8085 28.1437% 32.7451% / 1),
    3px 8px 10px -1px hsl(206.8085 28.1437% 32.7451% / 1);
  --shadow-2xl: 3px 3px 0px 0px hsl(206.8085 28.1437% 32.7451% / 2.5);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
  --font-serif: var(--font-serif);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  --shadow-2xs: var(--shadow-2xs);
  --shadow-xs: var(--shadow-xs);
  --shadow-sm: var(--shadow-sm);
  --shadow: var(--shadow);
  --shadow-md: var(--shadow-md);
  --shadow-lg: var(--shadow-lg);
  --shadow-xl: var(--shadow-xl);
  --shadow-2xl: var(--shadow-2xl);
}
```

**Beneficios para WebCode:**

- **Bundle size optimizado** - Solo CSS usado se incluye en build final
- **Tema branded coherente** - Colores rosa/aguamarina con identidad visual única
- **Efectos 3D nativos** - Sombras con profundidad para UI moderna
- **Dark mode automático** - Variables CSS permiten theming sin JavaScript
- **Responsive avanzado** - Container queries para componentes adaptativos
- **Typography scale** - Tipografías Poppins/Lora/Fira Code perfectamente escaladas

---

#### shadcn/ui v4

**Versión:** `0.9.0+` (latest components)
**Instalación:** Fase 2 - Componentes base

```bash
pnpm dlx shadcn@latest init
# Instalación del tema personalizado WebCode (Rosa/Aguamarina con efectos 3D)
pnpm dlx shadcn@latest add https://tweakcn.com/r/themes/cmex1abh7000c04l4h2avft17
pnpm dlx shadcn@latest add button card input form
```

**Componentes disponibles (46 total):**

- **Primitivos:** Button, Input, Label, Textarea, Select
- **Layout:** Card, Separator, Aspect Ratio, Resizable
- **Navigation:** Breadcrumb, Navigation Menu, Sidebar, Pagination
- **Feedback:** Alert, Toast (Sonner), Progress, Skeleton
- **Overlays:** Dialog, Sheet, Drawer, Popover, Tooltip
- **Data Display:** Table, Badge, Avatar, Accordion
- **Forms:** Form, Checkbox, Radio Group, Switch, Slider

**Arquitectura de componentes:**

``tsx
// components/ui/ - No modificar (shadcn/ui base)
// components/custom/ - Extensiones para WebCode
// components/sections/ - Secciones de landing page
// components/forms/ - Formularios específicos del negocio

```

**Beneficios para WebCode:**

- **Accessibilidad WCAG 2.1 AA** - Todos los componentes incluyen ARIA labels
- **Customización completa** - Copy-paste approach permite modificaciones
- **Radix UI primitives** - Base sólida con keyboard navigation
- **TypeScript first** - Props tipadas y autocompletado perfecto

---

#### Magic UI

**Versión:** `0.11.x` (latest stable)
**Instalación:** Fase 3 - Microanimaciones

``bash
pnpm add framer-motion lucide-react
pnpm dlx magicui-cli add animated-beam
pnpm dlx magicui-cli add text-reveal
```

**Componentes de animación:**

- **Text Effects:** AnimatedCounter, TextReveal, TypingAnimation
- **UI Effects:** AnimatedBeam, OrbitingCircles, ShimmerButton
- **Backgrounds:** AnimatedGridPattern, DotPattern, Meteors
- **Interactive:** MagicCard, BentoGrid, PulsatingButton

**Implementación para landing:**

```tsx
// Hero section con efectos
export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <AnimatedGridPattern className="absolute inset-0 opacity-30" />
      <div className="container mx-auto">
        <TextReveal className="text-6xl font-bold">
          Transformamos ideas en experiencias digitales excepcionales
        </TextReveal>
        <AnimatedCounter from={0} to={150} suffix="+ proyectos completados" />
      </div>
    </section>
  );
}
```

---

### Development Tools

#### TypeScript 5.7+

**Versión:** `5.7.2` (latest stable)
**Instalación:** Fase 1 - Setup inicial

**Configuración estricta para WebCode:**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/types/*": ["./src/types/*"]
    }
  }
}
```

**Beneficios para WebCode:**

- **Type Safety** - Prevención de bugs en tiempo de desarrollo
- **IntelliSense avanzado** - Autocompletado de props y APIs
- **Refactoring seguro** - Cambios en interfaces se propagan automáticamente
- **Better DX** - Error catching antes de runtime

---

#### Package Manager: pnpm

**Versión:** `9.15.0+` (latest stable)
**Instalación:** Prerrequisito del proyecto

```bash
# Instalación global
npm install -g pnpm@latest

# Verificación
pnpm --version
```

**Beneficios para WebCode:**

- **Velocidad superior** - 2x más rápido que npm/yarn
- **Disk space efficiency** - Symlinks reducen almacenamiento
- **Strict dependency resolution** - Evita phantom dependencies
- **Workspaces nativo** - Monorepo support out-of-the-box

---

## **[Diseño]** UI/UX Libraries (Fase 3-4)

### Radix UI

**Versión:** `1.1.2+` (primitives)
**Instalación:** Automática con shadcn/ui

```bash
# Componentes adicionales según necesidad
pnpm add @radix-ui/react-toast
pnpm add @radix-ui/react-dropdown-menu
pnpm add @radix-ui/react-dialog
```

**Primitivos utilizados:**

- **Overlay Management** - Portal, Focus Management, ESC handling
- **Keyboard Navigation** - Arrow keys, Tab handling, ARIA patterns
- **State Management** - Controlled/uncontrolled patterns
- **Accessibility** - Screen reader announcements, focus indicators

---

### Framer Motion

**Versión:** `11.15.0+` (latest stable)
**Instalación:** Fase 3 - Animaciones avanzadas

``bash
pnpm add framer-motion

```

**Implementación en WebCode:**

``tsx
// Scroll-triggered animations
export function ServiceCard({ children, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group relative overflow-hidden rounded-xl bg-white p-8 shadow-lg"
    >
      {children}
    </motion.div>
  );
}

// Page transitions
export function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
```

---

## **[Análisis]** Performance & Analytics (Fase 4-5)

### Analytics & Tracking

**Instalación:** Fase 4 - Post-launch optimización

```bash
# Google Analytics 4
pnpm add gtag

# Vercel Analytics (opcional)
pnpm add @vercel/analytics
```

**Implementación RGPD-compliant:**

```tsx
// lib/analytics.ts
export function trackEvent(eventName: string, parameters?: object) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, {
      anonymize_ip: true, // RGPD compliance
      ...parameters
    });
  }
}

// Componente de consentimiento
export function CookieConsent() {
  const [consent, setConsent] = useState<boolean | null>(null);

  useEffect(() => {
    const storedConsent = localStorage.getItem("cookie-consent");
    if (storedConsent) {
      setConsent(JSON.parse(storedConsent));
      initializeAnalytics(JSON.parse(storedConsent));
    }
  }, []);

  return consent === null ? <ConsentBanner onAccept={handleAccept} /> : null;
}
```

---

### SEO & Meta Management

**Instalación:** Fase 2 - Contenido y estructura

```bash
pnpm add next-seo
```

**Configuración para mercado español:**

```tsx
// lib/seo.ts
export const defaultSEO = {
  titleTemplate: "%s | WebCode - Desarrollo Web Barcelona",
  defaultTitle: "WebCode - Desarrollo Web Moderno en Barcelona",
  description:
    "Desarrollo web profesional con Next.js 15 y React 19. Sitios web, e-commerce y aplicaciones para freelancers y empresas en Barcelona y España.",
  canonical: "https://webcode.es",
  openGraph: {
    type: "website",
    locale: "es_ES",
    alternateLocales: ["ca_ES", "en_US"],
    url: "https://webcode.es",
    siteName: "WebCode",
    images: [
      {
        url: "https://webcode.es/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WebCode - Desarrollo Web Barcelona"
      }
    ]
  },
  additionalMetaTags: [
    {
      name: "geo.region",
      content: "ES-CT"
    },
    {
      name: "geo.placename",
      content: "Barcelona"
    },
    {
      name: "geo.position",
      content: "41.3874;2.1686"
    }
  ]
};
```

---

## 🛠️ Development & Build Tools (Fase 1-2)

### Linting & Formatting

#### ESLint + Prettier

**Instalación:** Fase 1 - Setup inicial

```bash
# ESLint configuración Next.js
pnpm add -D eslint-config-next@latest

# Prettier para formatting
pnpm add -D prettier eslint-config-prettier

# Plugins adicionales
pnpm add -D @typescript-eslint/eslint-plugin
pnpm add -D eslint-plugin-tailwindcss
```

**Configuración `.eslintrc.json`:**

```json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended",
    "plugin:tailwindcss/recommended",
    "prettier"
  ],
  "plugins": ["@typescript-eslint", "tailwindcss"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "tailwindcss/classnames-order": "error",
    "tailwindcss/no-custom-classname": "warn"
  }
}
```

---

#### Husky + lint-staged

**Instalación:** Fase 2 - Git hooks

```bash
pnpm add -D husky lint-staged
pnpm exec husky init
```

**Pre-commit hooks:**

``json
// package.json
{
"lint-staged": {
"_.{ts,tsx}": ["eslint --fix", "prettier --write"],
"_.{css,md}": ["prettier --write"]
}
}

````

---

### Testing (Fase 5 - Calidad)

#### Vitest + Testing Library

**Instalación:** Fase 5 - Testing suite

```bash
pnpm add -D vitest @vitejs/plugin-react
pnpm add -D @testing-library/react @testing-library/jest-dom
pnpm add -D @testing-library/user-event
````

**Configuración `vitest.config.ts`:**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"]
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});
```

---

#### Playwright (E2E Testing)

**Instalación:** Fase 5 - Testing end-to-end

```bash
pnpm create playwright@latest
```

**Tests críticos para WebCode:**

```ts
// e2e/landing-page.spec.ts
test("landing page performance", async ({ page }) => {
  await page.goto("/");

  // Core Web Vitals testing
  const lcp = await page.evaluate(() => {
    return new Promise((resolve) => {
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        resolve(lastEntry.startTime);
      }).observe({ entryTypes: ["largest-contentful-paint"] });
    });
  });

  expect(lcp).toBeLessThan(2500); // LCP < 2.5s
});

test("contact form submission", async ({ page }) => {
  await page.goto("/");
  await page.fill('[data-testid="name-input"]', "Juan Pérez");
  await page.fill('[data-testid="email-input"]', "juan@empresa.com");
  await page.fill(
    '[data-testid="message-textarea"]',
    "Consulta presupuesto web"
  );

  await page.click('[data-testid="submit-button"]');
  await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
});
```

---

## **[Web]** Deployment & Infrastructure (Fase 6)

### Vercel (Primary Platform)

**Configuración:** Fase 6 - Production deployment

```bash
# Vercel CLI
pnpm add -D vercel

# Deploy
pnpm exec vercel --prod
```

**Vercel configuration `vercel.json`:**

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 10
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

---

### Domain & DNS

**Configuración:** Fase 6 - Dominio y SSL

- **Dominio principal:** `webcode.es`
- **Subdominio staging:** `staging.webcode.es`
- **CDN:** Cloudflare (opcional para caching adicional)
- **SSL:** Automático vía Vercel
- **Email:** Google Workspace o similar para `hola@webcode.es`

---

## **[Lista]** Fases de Implementación

### Fase 1: Fundación (Semana 1)

- **[Completado]** Setup inicial Next.js 15 + React 19
- **[Completado]** Configuración TypeScript estricta
- **[Completado]** Tailwind CSS v4 setup
- **[Completado]** Estructura de carpetas
- **[Completado]** Git repository + Husky hooks

``bash

# Scripts Fase 1

pnpm create next-app@latest webcode --typescript --tailwind --eslint --app --src-dir
cd webcode
pnpm add tailwindcss@next @tailwindcss/postcss@next
pnpm add -D husky lint-staged prettier eslint-config-prettier

```

---

### Fase 2: Componentes Base (Semana 2)

- **[Herramientas]** shadcn/ui inicialización
- **[Herramientas]** Componentes primitivos (Button, Card, Input, Form)
- **[Herramientas]** Layout system (Header, Footer, Container)
- **[Herramientas]** Typography scale y spacing system
- **[Herramientas]** Dark mode implementation

``bash
# Scripts Fase 2
pnpm dlx shadcn@latest init
# Tema personalizado WebCode con efectos 3D
pnpm dlx shadcn@latest add https://tweakcn.com/r/themes/cmex1abh7000c04l4h2avft17
pnpm dlx shadcn@latest add button card input form label
pnpm dlx shadcn@latest add alert badge separator
```

---

### Fase 3: Landing Page Structure (Semana 3)

- **[Herramientas]** Hero section con animaciones
- **[Herramientas]** Services grid responsivo
- **[Herramientas]** Testimonials carousel
- **[Herramientas]** Pricing tables interactivas
- **[Herramientas]** Contact form con validación

``bash

# Scripts Fase 3

pnpm add framer-motion react-hook-form zod @hookform/resolvers
pnpm dlx magicui-cli add animated-beam text-reveal

````

---

### Fase 4: Interactividad & Animaciones (Semana 4)

- **[Herramientas]** Magic UI animations
- **[Herramientas]** Scroll-triggered effects
- **[Herramientas]** Form handling con React Hook Form + Zod
- **[Herramientas]** SEO meta tags y structured data
- **[Herramientas]** Analytics implementation (RGPD-compliant)

```bash
# Scripts Fase 4
pnpm add next-seo gtag @vercel/analytics
pnpm add react-hook-form zod @hookform/resolvers
````

---

### Fase 5: Testing & Quality (Semana 5)

- **[Herramientas]** Unit tests con Vitest
- **[Herramientas]** E2E tests con Playwright
- **[Herramientas]** Performance auditing
- **[Herramientas]** Accessibility testing
- **[Herramientas]** SEO validation

``bash

# Scripts Fase 5

pnpm add -D vitest @vitejs/plugin-react @testing-library/react
pnpm create playwright@latest

```

---

### Fase 6: Deployment & Production (Semana 6)

- **[Herramientas]** Vercel deployment
- **[Herramientas]** Domain configuration
- **[Herramientas]** SSL setup
- **[Herramientas]** CDN optimization
- **[Herramientas]** Monitoring & alerts

``bash
# Scripts Fase 6
pnpm add -D vercel
pnpm exec vercel --prod
```

---

## **[Objetivos]** Performance Targets

### Core Web Vitals Objetivos

- **LCP (Largest Contentful Paint):** <2.0s
- **FID (First Input Delay):** <100ms
- **CLS (Cumulative Layout Shift):** <0.1
- **TTFB (Time to First Byte):** <600ms

### Lighthouse Scores Target

- **Performance:** 95+
- **Accessibility:** 100
- **Best Practices:** 100
- **SEO:** 100

### Bundle Size Limits

- **First Load JS:** <120KB
- **Page JS:** <50KB per route
- **CSS:** <30KB critical CSS
- **Images:** WebP/AVIF optimized, responsive

---

## **[Candado]** Security & Compliance

### RGPD Compliance

- Cookie consent management
- Data processing transparency
- User rights implementation (access, deletion)
- Privacy policy legal compliance

### Security Headers

- Content Security Policy (CSP)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- HTTPS only + HSTS

### Accessibility WCAG 2.1 AA

- Screen reader compatibility
- Keyboard navigation
- Color contrast ratios
- Focus management
- ARIA labels and descriptions

---

## 🌍 Internationalization (Future)

### Multi-language Support

- **Primary:** Español (es-ES)
- **Secondary:** Catalán (ca-ES)
- **Tertiary:** Inglés (en-US)

### Implementation Strategy

```bash
# Futuro: Fase 7+
pnpm add next-intl
```

---

## **[Crecimiento]** Monitoring & Analytics

### Performance Monitoring

- Vercel Speed Insights
- Google PageSpeed Insights
- Real User Monitoring (RUM)

### Business Analytics

- Google Analytics 4
- Goal conversion tracking
- Form submission analytics
- Page interaction heatmaps

### Error Tracking

```bash
# Futuro: Production monitoring
pnpm add @sentry/nextjs
```

---

## **[Lanzamiento]** Conclusión

Este stack tecnológico posiciona a WebCode como una solución de vanguardia en el mercado barcelonés de desarrollo web, combinando:

**[Completado]** **Tecnologías 2025** - Next.js 15, React 19, Tailwind v4
**[Completado]** **Performance Superior** - Core Web Vitals optimizados
**[Completado]** **Developer Experience** - TypeScript, shadcn/ui, Magic UI
**[Completado]** **Escalabilidad** - Arquitectura modular y componentizada
**[Completado]** **Cumplimiento Legal** - RGPD, WCAG 2.1 AA, normativas españolas

La implementación por fases garantiza un desarrollo ordenado y la posibilidad de ajustar tecnologías según las necesidades específicas del proyecto.

---

**Última actualización:** Agosto 2025  
**Versión del documento:** 1.0  
**Próxima revisión:** Septiembre 2025
