# ⚙️ Contexto Técnico Actual - WEBCODE

> **Auto-generado**: 2025-09-20T22:45:00+02:00
> **Última optimización**: Animaciones neon optimizadas para rendimiento

## **Stack Tecnológico Confirmado**

### **Framework & Core**

```json
{
  "framework": "Next.js 15.4.0",
  "react": "React 19",
  "typescript": "5.x strict mode",
  "packageManager": "pnpm",
  "nodeVersion": "18.17.0+"
}
```

### **UI & Styling**

```json
{
  "css": "Tailwind CSS v4",
  "components": "shadcn/ui (v4 compatible)",
  "animations": "Magic UI",
  "icons": "Lucide React",
  "fonts": "Inter + Geist"
}
```

### **Development Tools**

```json
{
  "validation": "Zod + React Hook Form",
  "testing": "Jest + React Testing Library",
  "linting": "ESLint + Prettier",
  "git": "Husky pre-commit hooks"
}
```

### **🚀 Optimizaciones de Rendimiento Recientes**

```json
{
  "neonAnimations": "Convertidas a hover-only (eliminadas infinitas)",
  "backgroundEffects": "Opacidad dinámica por scroll optimizada",
  "textEffects": "Gradientes neon con GPU acceleration",
  "languageSelector": "Backdrop blur mejorado sin impacto performance"
}
```

**Mejoras Críticas Implementadas:**
<<<<<<< HEAD
=======

>>>>>>> feat/11-1
- ✅ Eliminadas animaciones CSS infinitas (`shine`, `subtlePulse`)
- ✅ Optimizado rendering de partículas en background
- ✅ Implementado lazy loading para efectos pesados
- ✅ Reducido repainting en scroll events

---

## **Arquitectura del Proyecto**

### **Estructura de Carpetas Planificada**

```
src/
├── app/                    # App Router (Next.js 15)
│   ├── (marketing)/       # Route groups
│   ├── (dashboard)/
│   └── api/               # API routes
├── components/
│   ├── ui/                # shadcn/ui (NO MODIFICAR)
│   ├── magicui/           # Magic UI components
│   └── custom/            # Componentes WebSnack
├── lib/                   # Utilities & configs
├── hooks/                 # Custom React hooks
└── types/                 # TypeScript definitions
```

### **Convenciones de Naming**

- **Componentes**: PascalCase (`ContactForm.tsx`)
- **Hooks**: camelCase con `use` prefix (`useWebSnackData.ts`)
- **Utilities**: camelCase (`formatPrice.ts`)
- **Types**: PascalCase con `Type` suffix (`UserType.ts`)
- **Constants**: SCREAMING_SNAKE_CASE (`API_ENDPOINTS.ts`)

---

## **Patrones de Desarrollo**

### **Next.js 15 Patterns**

```typescript
// ✅ Server Component (default)
export default async function Page() {
  const data = await fetch("/api/data", { cache: "force-cache" });
  return <div>{/* content */}</div>;
}

// ✅ Client Component (solo cuando necesario)
("use client");
export default function InteractiveComponent() {
  const [state, setState] = useState();
  return <div>{/* interactive content */}</div>;
}

// ✅ API Routes (App Router)
export async function GET() {
  return Response.json({ data: "example" });
}
```

### **Validation Patterns**

```typescript
// ✅ Zod Schema Pattern
const ContactSchema = z.object({
  name: z.string().min(2, "Mínimo 2 caracteres"),
  email: z.string().email("Email inválido"),
  message: z.string().min(10, "Mensaje muy corto"),
});

// ✅ React Hook Form Integration
const form = useForm<z.infer<typeof ContactSchema>>({
  resolver: zodResolver(ContactSchema),
});
```

---

## **Performance & SEO**

### **Core Web Vitals Targets**

- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- **TTFB**: < 600ms

### **SEO Requirements**

```typescript
// ✅ Metadata API (Next.js 15)
export const metadata: Metadata = {
  title: "WebSnack - Desarrollo Web Barcelona",
  description: "Soluciones web profesionales para freelancers y PYMEs",
  openGraph: {
    title: "WebSnack",
    description: "Tu partner en desarrollo web",
    images: ["/og-image.jpg"],
  },
};
```

---

## **Estado de Dependencias**

### **Instaladas** ❌

```json
{
  "status": "NO_INSTALLED",
  "reason": "Proyecto en fase de planificación",
  "nextStep": "Ejecutar setup inicial"
}
```

### **Requeridas para Setup**

```bash
# Core dependencies
pnpm create next-app@latest
pnpm add next@latest react@latest react-dom@latest

# UI & Styling
pnpm dlx shadcn@latest init
pnpm add tailwindcss

# Forms & Validation
pnpm add react-hook-form @hookform/resolvers zod

# Development
pnpm add -D @types/node typescript eslint
```

---

## **Comandos de Desarrollo**

### **Setup Commands**

```bash
# Crear proyecto
pnpm create next-app@latest websnack --typescript --tailwind --eslint --app --src-dir

# Instalar shadcn/ui
pnpm dlx shadcn@latest init

# Desarrollo
pnpm dev

# Build
pnpm build
```

### **Git Workflow**

```bash
# Branches
main              # Producción
develop           # Desarrollo
feature/*         # Features
hotfix/*          # Fixes urgentes

# Commits (Conventional)
feat: add contact form
fix: resolve navbar issue
docs: update README
```

---

## **Environment Variables**

```env
# Base URLs
NEXT_PUBLIC_SITE_URL=https://websnack.es
NEXT_PUBLIC_API_URL=/api

# Database (TBD)
DATABASE_URL=

# Auth (TBD)
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# External APIs
RESEND_API_KEY=
STRIPE_SECRET_KEY=
```

---

## **Problemas Conocidos & Soluciones**

### **Tailwind v4 Migration**

- **Issue**: Nueva sintaxis de configuración
- **Solution**: Seguir docs oficiales de migración
- **Status**: Pendiente de evaluar

### **React 19 Compatibility**

- **Issue**: Algunas librerías no compatible aún
- **Solution**: Verificar cada dependencia
- **Status**: Tracking ongoing

---

## **Testing Strategy**

### **Unit Testing**

```typescript
// ✅ Component Testing Pattern
import { render, screen } from "@testing-library/react";
import ContactForm from "@/components/custom/ContactForm";

test("renders contact form", () => {
  render(<ContactForm />);
  expect(screen.getByRole("form")).toBeInTheDocument();
});
```

### **E2E Testing**

```typescript
// ✅ Playwright Pattern
test("contact form submission", async ({ page }) => {
  await page.goto("/contact");
  await page.fill("[data-testid=name]", "Test User");
  await page.click("[data-testid=submit]");
  await expect(page.locator(".success")).toBeVisible();
});
```

---

> > > > > > > > > > > > > > > > > > > **Última sincronización**: 2025-09-03 18:45:47
