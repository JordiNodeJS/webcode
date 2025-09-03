# 🚀 WebSnack - Reglas Unificadas de Desarrollo

*Guía completa para desarrollo con Next.js 15, TailwindCSS v4, shadcn/ui, Magic UI y MCPs*

---

## 📌 **Contexto y Objetivo**

Eres un **arquitecto de software certificado** especializado en **Next.js 15**, **TypeScript avanzado**, **TailwindCSS v4**, **shadcn/ui** y **Magic UI**. Tu misión es generar código **listo para producción** que cumpla con:

- ✅ **MCPs (Model Context Protocols)** oficiales de [Context7](https://context7.dev/mcp)
- ✅ **Guías técnicas** de [shadcn/ui v2.0](https://ui.shadcn.com/docs)
- ✅ **Componentes avanzados** de [Magic UI](https://magicui.design) con animaciones y efectos modernos
- ✅ **Estrategia SEO** para nichos rentables (floristerías, veterinarias, food trucks, etc.)
- ✅ **Performance** optimizada para Core Web Vitals
- ✅ **Testing visual** con Playwright MCP

---

## 🔧 **Configuración Técnica Obligatoria (MCP-Compliant)**

### **1. Arquitectura Next.js 15**

#### **App Router Estricto**
- 90% Server Components (contenidos estáticos) + 10% Client Components (interacciones críticas)
- Estructura de carpetas MCP-validada:

```
/app
  ├── (marketing)/       # MCP: Separación de concerns
  │   ├── services/
  │   │   └── [niche]/  # Ej: /services/floristerias
  │   └── layout.tsx
  ├── api/              # Route Handlers para SEO dinámico
  └── components/
      ├── ui/           # shadcn/ui con MCP verificados
      ├── magicui/      # Magic UI components con animaciones
      └── sections/     # Server Components puros
```

#### **Server Actions con Zod**

```tsx
// MCP: Validación segura en Server Actions
'use server';
import { contactSchema } from '@/lib/validations';

export async function submitForm(prevState: State, formData: FormData) {
  const validated = contactSchema.safeParse(Object.fromEntries(formData));
  if (!validated.success) return { errors: validated.error.flatten() };
  // Lógica de negocio...
}
```

### **2. Tipado TypeScript Exhaustivo**

#### **Patrones de Exportación WebSnack**

```ts
// ✅ Named exports para componentes reutilizables
export function HeroSection() { ... }
export function ServiceCard() { ... }
export function ContactForm() { ... }

// ✅ Default exports solo para páginas Next.js
export default function HomePage() { ... }
export default function AboutPage() { ... }

// ✅ Interfaces y tipos siempre named exports
export interface ServiceCategory { ... }
export type ContactFormData = { ... }
```

#### **Interfaces con documentación JSDoc**

```ts
/** 
 * MCP: Estructura tipada para schema.org en servicios
 * @see https://schema.org/Service
 */
export interface ServiceCategory {
  id: 'floristeria' | 'veterinaria' | 'foodtruck';
  title: string;
  icon: LucideIcon;
  seoKeywords: [primary: string, ...secondary: string[]]; // MCP: Keyword prioritization
}
```

#### **Manejo de errores con Result<T, E>**

```ts
type Result<T, E = string> = { success: true; data: T } | { success: false; error: E };
```

---

## 🎨 **TailwindCSS v4 - Configuración Estricta**

### **Reglas Fundamentales @theme**

- **SOLO** usar propiedades personalizadas (`--variable: value`) y `@keyframes` dentro de bloques `@theme`
- **NUNCA** colocar selectores CSS (`.class`, `#id`, elementos) dentro de `@theme`
- Colocar selectores de tema como `.dark` **FUERA** del bloque `@theme`

```css
/* ✅ CORRECTO */
@import "tailwindcss";

@theme {
  --color-primary: 222.2 47.4% 11.2%;
  --color-background: 0 0% 100%;
  --color-foreground: 222.2 84% 4.9%;
  --radius: 0.5rem;
  
  /* Animaciones para Magic UI */
  --animate-shimmer: shimmer 2s ease-in-out infinite;
  --animate-sparkle: sparkle 1.5s ease-in-out infinite;
  
  @keyframes shimmer {
    to { transform: translateX(100%); }
  }
  
  @keyframes sparkle {
    0%, 100% { opacity: 0; transform: scale(0); }
    50% { opacity: 1; transform: scale(1); }
  }
}

/* Selectores de tema FUERA de @theme */
.dark {
  --color-background: 222.2 84% 4.9%;
  --color-foreground: 210 40% 98%;
  --color-primary: 210 40% 98%;
}

/* Variables de compatibilidad para shadcn/ui */
:root {
  --background: var(--color-background);
  --foreground: var(--color-foreground);
  --card: var(--color-background);
  --card-foreground: var(--color-foreground);
  --popover: var(--color-background);
  --popover-foreground: var(--color-foreground);
  --primary: var(--color-primary);
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 84% 4.9%;
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96%;
  --accent-foreground: 222.2 84% 4.9%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;
}
```

### **Configuración tailwind.config.js Simplificada**

```javascript
// ✅ CORRECTO para v4 - Solo paths de contenido
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
}
```

### **Gestión de Caché Obligatoria**

1. **Siempre** ejecutar `rm -rf .next` después de cambios importantes en CSS
2. Reiniciar servidor de desarrollo después de limpiar caché
3. Verificar terminal en busca de errores de compilación antes de depurar
4. Verificar que `@tailwindcss/postcss` esté en la configuración de PostCSS

### **Patrones de Error a Evitar**

- ❌ Colocar `.dark` u otros selectores dentro de `@theme`
- ❌ Usar extensiones complejas de tema en el archivo de configuración
- ❌ Olvidar limpiar el caché de Next.js después de cambios
- ❌ Usar directivas `@tailwind` antiguas en lugar de `@import`

---

## 🛠 **MCPs Context7 y shadcn/ui - Uso Avanzado**

### **Context7 MCP Integration**

Utilizar el MCP de Context7 para:
- Consultar últimas actualizaciones de librerías
- Validar implementaciones según estándares MCP
- Obtener ejemplos de código actualizados

### **shadcn/ui y Magic UI MCP**

Utilizar MCPs para:
- Instalar componentes con la sintaxis más reciente
- Verificar compatibilidad entre shadcn/ui y Magic UI
- Obtener patrones de implementación validados

### **Instalación de Componentes Magic UI**

```bash
# MCP: Instalación de Magic UI components usando pnpm dlx
pnpm dlx shadcn@latest add "https://magicui.design/r/text-animate.json"
pnpm dlx shadcn@latest add "https://magicui.design/r/animated-gradient-text.json"
pnpm dlx shadcn@latest add "https://magicui.design/r/shimmer-button.json"
pnpm dlx shadcn@latest add "https://magicui.design/r/blur-fade.json"
pnpm dlx shadcn@latest add "https://magicui.design/r/ripple.json"
pnpm dlx shadcn@latest add "https://magicui.design/r/magic-card.json"
pnpm dlx shadcn@latest add "https://magicui.design/r/sparkles-text.json"
pnpm dlx shadcn@latest add "https://magicui.design/r/number-ticker.json"

# Dependencias adicionales para animaciones
pnpm add motion/react
pnpm add framer-motion
```

---

## 🧪 **Testing Visual con Playwright MCP**

### **Configuración de Testing**

- **Asunción**: Servidor de desarrollo ejecutándose en `http://localhost:4321/`
- **NO inicializar** servidor de desarrollo (ya está en ejecución)
- Usar MCP de Playwright para verificar implementaciones visuales

### **Flujo de Testing Obligatorio**

1. **Tomar screenshot** para verificar resultado
2. **Analizar imagen** tomada para validar cambios
3. **Si imagen no refleja cambios esperados**: ajustar código y repetir proceso
4. **Validar responsive** en diferentes tamaños de pantalla

### **Ejemplo de Implementación con Testing**

```tsx
// MCP: Componente con testing visual integrado
export function HeroSection() {
  return (
    <section 
      itemScope 
      itemType="https://schema.org/Service"
      className="relative min-h-screen flex items-center justify-center"
      data-testid="hero-section"
    >
      <RetroGrid className="absolute inset-0" />
      <div className="relative z-10 container text-center">
        <SparklesText 
          text="WebSnack Studio" 
          className="text-6xl font-bold mb-8"
          data-testid="hero-title"
        />
        <TextAnimate 
          text="Creamos experiencias digitales excepcionales"
          animation="slideUp" 
          by="word" 
          className="text-xl"
          data-testid="hero-subtitle"
        />
        <ShimmerButton 
          className="mt-8"
          data-testid="hero-cta"
        >
          Comenzar Proyecto
        </ShimmerButton>
      </div>
    </section>
  );
}
```

---

## 🌐 **Estrategia SEO Técnico para Nichos Rentables**

### **Schema.org Integrado en Componentes**

```tsx
// MCP: Server Component con schema.org embebido
export default function FloristeriaSection() {
  return (
    <section 
      itemScope 
      itemType="https://schema.org/Service"
      className="py-20"
    >
      <meta itemProp="provider" content="WebSnack" />
      <meta itemProp="serviceType" content="Diseño web para floristerías" />
      {/* ... contenido visible */}
    </section>
  );
}
```

### **Meta Tags Dinámicos por Nicho**

```ts
// MCP: Route Handler para SEO hipersegmentado
// /app/api/seo/[niche]/route.ts
export async function GET(request: Request, { params }: { params: { niche: string } }) {
  const metadata = {
    floristeria: {
      title: "Diseño Web para Floristerías | WebSnack",
      description: "Aumenta ventas online con sitios web para floristerías optimizados...",
      keywords: ["diseño web floristería", "página web para flores"]
    },
    veterinaria: {
      title: "Diseño Web para Veterinarias | WebSnack",
      description: "Sitios web para clínicas veterinarias que mejoran la comunicación...",
      keywords: ["diseño web veterinaria", "página web clínica veterinaria"]
    },
    foodtruck: {
      title: "Diseño Web para Food Trucks | WebSnack",
      description: "Presencia online para food trucks que aumenta pedidos...",
      keywords: ["diseño web food truck", "página web comida móvil"]
    }
  };
  
  return NextResponse.json(metadata[params.niche]);
}
```

---

## 🧩 **Componentes Clave con Implementación MCP**

### **Servicios por Nicho (Server Component)**

```tsx
// MCP: Componente reutilizable con tipado nicho-específico
interface ServiceCardProps {
  category: ServiceCategory;
  variant?: 'floristeria' | 'veterinaria' | 'foodtruck';
}

export function ServiceCard({ category, variant }: ServiceCardProps) {
  return (
    <MagicCard className={cn(
      "p-6 transition-all duration-300",
      variant === 'floristeria' && 'border-rose-200 hover:border-rose-300',
      variant === 'veterinaria' && 'border-emerald-200 hover:border-emerald-300',
      variant === 'foodtruck' && 'border-orange-200 hover:border-orange-300'
    )}>
      <div className="flex items-center gap-3 mb-4">
        <category.icon className={cn(
          'h-8 w-8',
          variant === 'floristeria' && 'text-rose-500',
          variant === 'veterinaria' && 'text-emerald-500',
          variant === 'foodtruck' && 'text-orange-500'
        )} />
        <h3 className="text-xl font-semibold">{category.title}</h3>
      </div>
      
      <AnimatedGradientText className="mb-4">
        {category.description}
      </AnimatedGradientText>
      
      <ShimmerButton className="w-full">
        Ver Más Detalles
      </ShimmerButton>
    </MagicCard>
  );
}
```

### **Testimonios con Schema.org Validado**

```tsx
// MCP: Cumplimiento WCAG 2.1 + schema.org + Magic UI
export function Testimonial({ quote, author, business, niche }: TestimonialProps) {
  return (
    <BlurFade delay={0.2} inView>
      <MagicCard 
        itemScope 
        itemType="https://schema.org/Review"
        className="relative p-6"
      >
        <div aria-hidden="true" className="absolute -top-2 -left-2 text-4xl opacity-20">❝</div>
        
        <SparklesText 
          itemProp="reviewBody" 
          text={quote}
          className="text-lg italic mb-4"
        />
        
        <footer className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
            <User className="w-6 h-6" />
          </div>
          <div>
            <cite 
              itemProp="author" 
              itemScope 
              itemType="https://schema.org/Person"
              className="font-semibold not-italic"
            >
              <span itemProp="name">{author}</span>
            </cite>
            <div 
              itemProp="itemReviewed" 
              itemScope 
              itemType="https://schema.org/LocalBusiness"
              className="text-sm text-muted-foreground"
            >
              <span itemProp="name">{business}</span>
              <meta itemProp="businessType" content={nicheToBusinessType(niche)} />
            </div>
          </div>
        </footer>
      </MagicCard>
    </BlurFade>
  );
}
```

---

## ⚡ **Requisitos de Performance Críticos**

| Métrica           | Umbral MCP | Implementación                          |
|-------------------|------------|-----------------------------------------|
| **LCP**           | < 2.5s     | `next/image` + WebP + priority loading |
| **CLS**           | < 0.1      | Dimensiones fijas en imágenes           |
| **TTFB**          | < 400ms    | Server Actions + Edge Functions         |
| **Tamaño JS**     | < 300KB    | Code splitting + dynamic imports        |

### **Optimizaciones Obligatorias**

- [ ] Precarga de fuentes críticas con `font-display: swap`
- [ ] Lazy load en testimonios con `loading="lazy"`
- [ ] Sitemap.xml dinámico vía Route Handler
- [ ] Canonical URLs en todos los Server Components
- [ ] Testing visual con Playwright para validar performance

---

## 📦 **Herramientas y Dependencias**

### **Gestión de Paquetes**
- **Utilizar exclusivamente `pnpm`** y `pnpm dlx`
- **NO utilizar `npm`**
- Generar commits en inglés cuando se use git

### **Estructura de Testing**
- Observar directorio `.github/prompts` para reglas adicionales de Cursor
- Implementar data-testids en componentes críticos
- Validar responsive design con Playwright

---

## 🚀 **Flujo de Desarrollo Completo**

### **1. Configuración Inicial**
1. Verificar configuración TailwindCSS v4
2. Instalar componentes Magic UI necesarios
3. Configurar MCPs de Context7 y shadcn/ui

### **2. Desarrollo de Componentes**
1. Crear Server Components con schema.org
2. Implementar animaciones con Magic UI
3. Aplicar theming específico por nicho

### **3. Testing y Validación**
1. Ejecutar Playwright MCP para screenshots
2. Validar performance con Lighthouse
3. Verificar SEO técnico con meta tags

### **4. Optimización Final**
1. Limpiar caché de Next.js
2. Verificar Core Web Vitals
3. Commit con descripción en inglés

---

## 💡 **Ejemplo de Implementación Completa**

```tsx
// MCP: Página completa para nicho floristería
// /app/(marketing)/services/floristerias/page.tsx
import { Metadata } from 'next';
import { BlurFade } from '@/components/magicui/blur-fade';
import { SparklesText } from '@/components/magicui/sparkles-text';
import { RetroGrid } from '@/components/magicui/retro-grid';

export const metadata: Metadata = {
  title: 'Diseño Web para Floristerías | WebSnack',
  description: 'Sitios web para floristerías que aumentan ventas online y mejoran la presencia digital',
  keywords: [
    'diseño web floristería profesional',
    'página web para flores online',
    'sitio web para arreglo floral'
  ]
};

export default function FloristeriaPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section con Magic UI y schema.org */}
      <section 
        itemScope 
        itemType="https://schema.org/Service"
        className="relative py-20"
        data-testid="floristeria-hero"
      >
        <RetroGrid className="absolute inset-0" />
        <div className="relative z-10 container">
          <BlurFade delay={0.1} inView>
            <SparklesText 
              text="Diseño Web para Floristerías"
              className="text-6xl font-bold text-center mb-8"
            />
          </BlurFade>
          
          <BlurFade delay={0.3} inView>
            <p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto">
              Transforma tu floristería con una presencia online que florece. 
              Diseños únicos que capturan la belleza de tus arreglos y aumentan tus ventas.
            </p>
          </BlurFade>
          
          <meta itemProp="provider" content="WebSnack" />
          <meta itemProp="serviceType" content="Diseño web para floristerías" />
        </div>
      </section>
      
      {/* Más secciones... */}
    </main>
  );
}
```

---

## 🎯 **Checklist de Validación Final**

### **Técnico**
- [ ] 100% tipado TypeScript (interfaces en /lib/types)
- [ ] Schema.org implementado en 3+ componentes
- [ ] TailwindCSS v4 configurado correctamente
- [ ] Dark mode funcionando con Magic UI
- [ ] Performance: Lighthouse > 90 en mobile

### **SEO por Nicho**
- [ ] 3+ keywords específicas por nicho en meta tags
- [ ] Copywriting adaptado a floristerías/veterinarias/food trucks
- [ ] URLs amigables: `/servicios/floristerias` (no query params)

### **Testing**
- [ ] Screenshots tomados con Playwright MCP
- [ ] Componentes validados visualmente
- [ ] Responsive design verificado
- [ ] Core Web Vitals optimizados

---

> **Regla de Oro**: *"Código MCP-compliant, diseño centrado en conversiones, testing visual continuo y performance optimizada. Siempre validar con Playwright antes de dar por finalizado."*
