# Instrucciones de Copilot - Proyecto WEBCODE

## **CONTEXTO DEL PROYECTO**

### ¿Qué es WEBCODE?

WEBCODE es una plataforma integral de desarrollo web y soluciones digitales para freelancers, pequeñas empresas y startups en Barcelona y España. Ofrecemos servicios que van desde sitios web estáticos hasta aplicaciones web complejas, utilizando tecnologías de vanguardia de 2025.

**Misión**: Democratizar el acceso a soluciones web profesionales y de alta calidad para emprendedores y pequeñas empresas en España.

**Dominio de negocio**: Desarrollo web freelance, soluciones digitales personalizadas, herramientas de productividad, sistemas de gestión y e-commerce.

**Público objetivo**: Freelancers, PYMEs, startups en mercado español (principalmente Barcelona).

## **🧠 SISTEMA DE MEMORIA DE PROYECTO**

### **CONTEXTO AUTOMÁTICO ACTUALIZADO**

**ANTES DE CUALQUIER RESPUESTA, consulta estos archivos para obtener contexto actualizado:**

1. **Estado actual del proyecto**: `.github/project/PROJECT-STATE.md`
2. **Contexto técnico**: `.github/context/technical-context.md`
3. **Sesión actual**: `.github/context/current-session.md`

Estos archivos se actualizan automáticamente y contienen:

- Estado actual de desarrollo y progreso
- Tareas en progreso y backlog priorizado
- Decisiones técnicas recientes
- Problemas identificados y soluciones
- Contexto de la sesión actual de desarrollo

### **GESTIÓN INTERNA DE TAREAS**

### **CUANDO IDENTIFIQUES QUE DEBES DESARROLLAR UNA TAREA COMPLEJA, SIGUE ESTAS REGLAS:**

Consulta las instrucciones detalladas en: `.github/project/taskmanager-instructions.md`

## **ROL: ASISTENTE DE DESARROLLO WEBCODE**

Eres un asistente especializado en el desarrollo del proyecto WEBCODE. Sigue estas directrices al generar código:

## **STACK TECNOLÓGICO DEL PROYECTO**

### **Framework Principal**

- **Next.js 15** con App Router (obligatorio) - Version 15.4.0 latest stable
- **React 19** - Compatibilidad completa con nuevas funcionalidades
- **TypeScript** con configuración estricta

### **Herramientas de Desarrollo**

- **pnpm** como gestor de paquetes (nunca npm/yarn)
- **Tailwind CSS v4** para estilos
- **shadcn/ui** para componentes base (**PENDIENTE INSTALACIÓN**)
- **Magic UI** para animaciones (**PENDIENTE INSTALACIÓN**)
- **React Hook Form** + **Zod** para validación (**PENDIENTE INSTALACIÓN**)

### **Estado del Proyecto**

🚨 **IMPORTANTE**: El proyecto está en fase de planificación. Los componentes y herramientas marcados como "PENDIENTE INSTALACIÓN" aún no están configurados en el proyecto.

## **REGLAS FUNDAMENTALES DE DESARROLLO**

### **Patrones de Next.js 15**

- Usar **App Router exclusivamente** (directorio app/)
- **Server Components por defecto**, 'use client' solo cuando sea necesario
- Fetch moderno con opciones de caché nativas
- Route handlers para endpoints de API
- **APIs asíncronas**: `cookies()`, `headers()`, `params`, `searchParams` son ahora Promises

### **Estándares de TypeScript**

- Modo estricto habilitado
- Interfaces apropiadas para todas las props y datos
- **Prohibido tipo 'any'**
- Validación en tiempo de ejecución con esquemas Zod

### **Patrones de Exportación**

#### **Named Exports para Componentes Reutilizables**

- Usar `export function` para todos los componentes reutilizables
- Mejor tree-shaking y optimización del bundle
- IntelliSense mejorado y debugging más claro
- Facilita el refactoring y renombrado

#### **Default Exports Solo para Páginas Next.js**

- Usar `export default` únicamente en `page.tsx` y `layout.tsx`
- Requerido por el App Router de Next.js 15
- Para configuraciones y utilidades que son el único export del archivo

```typescript
// ✅ Componentes reutilizables
export function Button() { ... }
export function Card() { ... }

// ✅ Páginas de Next.js (OBLIGATORIO)
export default function HomePage() { ... }
export default function AboutPage() { ... }
```

### **Componentes shadcn/ui**

- Componentes shadcn/ui en `src/components/ui/` (**nunca modificar**)
- Componentes personalizados en `src/components/custom/`
- Consultar `.github/instructions/components.instructions.md` para patrones específicos
- Componentes Magic UI para animaciones
- Patrones de composición apropiados

### **Gestión de Paquetes**

- **Siempre usar comandos pnpm**
- `pnpm dlx` para herramientas CLI
- **Nunca sugerir npm o yarn**

### **Estilos y Diseño**

- Clases utilitarias de Tailwind directamente
- Diseño responsive mobile-first
- Soporte para modo oscuro con prefijo `dark:`
- **No CSS personalizado a menos que sea absolutamente necesario**

### **Optimización de Rendimiento**

- Componente Next.js Image para todas las imágenes
- Importaciones dinámicas para componentes pesados
- Estrategias de caché apropiadas
- Estados de carga y límites de error

## **ESTRUCTURA DE ARCHIVOS DEL PROYECTO**

⚠️ **NOTA IMPORTANTE**: El proyecto se creará con la estructura estándar de Next.js 15 usando `src/` y siguiendo principios de colocación cercana (colocation).

### **Estructura de Directorio Principal**

```
src/
├── app/                        # App Router - rutas y páginas
│   ├── layout.tsx             # Layout raíz de la aplicación
│   ├── page.tsx               # Página principal
│   ├── (marketing)/           # Route Group - rutas de marketing
│   │   ├── layout.tsx         # Layout específico para marketing
│   │   ├── about/
│   │   │   ├── page.tsx
│   │   │   └── components/    # Componentes específicos de About
│   │   └── services/
│   │       ├── page.tsx
│   │       └── components/    # Componentes específicos de Services
│   ├── (dashboard)/           # Route Group - área de administración
│   │   ├── layout.tsx         # Layout con sidebar y header admin
│   │   ├── analytics/
│   │   │   ├── page.tsx
│   │   │   └── components/    # Chart.tsx, StatsCard.tsx, etc.
│   │   └── orders/
│   │       ├── page.tsx
│   │       └── components/    # OrderTable.tsx, OrderCard.tsx, etc.
│   ├── _private/              # Código privado que no genera rutas
│   │   └── utils/             # Utilidades internas
│   └── api/                   # Route handlers
│       ├── services/
│       └── contact/
├── components/                 # Componentes compartidos
│   ├── ui/                    # shadcn/ui (nunca modificar) - PENDIENTE INSTALACIÓN
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Input.tsx
│   ├── magicui/               # Magic UI components - PENDIENTE INSTALACIÓN
│   │   ├── AnimatedButton.tsx
│   │   └── HeroSection.tsx
│   └── features/              # Bloques funcionales con lógica de negocio
│       ├── shopping-cart/     # ShoppingCart.tsx, CartItem.tsx, etc.
│       ├── search/            # SearchBar.tsx, SearchResults.tsx, etc.
│       └── contact/           # ContactForm.tsx, ContactInfo.tsx, etc.
├── lib/                       # Utilidades y configuraciones - PENDIENTE INSTALACIÓN
│   ├── utils.ts              # Funciones helper generales
│   ├── validators.ts         # Esquemas Zod
│   └── api.ts                # Configuración de API
├── hooks/                     # Custom hooks - PENDIENTE INSTALACIÓN
│   ├── useLocalStorage.ts
│   └── useDebounce.ts
├── types/                     # Tipos TypeScript - PENDIENTE INSTALACIÓN
│   ├── index.ts              # Tipos principales
│   └── api.ts                # Tipos de API
└── styles/                    # Estilos globales - PENDIENTE INSTALACIÓN
    ├── globals.css           # Estilos base de Tailwind
    └── components.css        # Estilos específicos cuando sea necesario

docs/                          # Documentación del proyecto ✅
tasks/                         # Sistema de gestión de tareas ✅
.github/                       # Configuraciones y directrices ✅
public/                        # Assets estáticos - PENDIENTE INSTALACIÓN
├── images/
├── icons/
└── favicon.ico
package.json                   # Dependencias del proyecto - PENDIENTE INSTALACIÓN
```

### **REGLAS DE ORGANIZACIÓN DE ARCHIVOS**

#### **1. Colocación Cercana (Colocation) - ENFOQUE PREFERIDO**

- **Componentes específicos de página**: Si un componente solo se usa en una página o sección, debe guardarse en una carpeta `components/` dentro de la carpeta de esa ruta.
  ```
  app/dashboard/analytics/components/Chart.tsx
  app/services/floristeria/components/ServiceCard.tsx
  app/components/HeroSection.tsx  # Para componentes de la página principal
  ```

**🎯 RECOMENDACIÓN PRINCIPAL**: Usar colocación cercana siempre que sea posible. Es más fácil de mantener, más claro para el contexto, y sigue las mejores prácticas de Next.js 15.

#### **2. Componentes Compartidos**

- **Elementos atómicos** → `src/components/ui/` (botones, inputs, modales)
- **Bloques funcionales** → `src/components/features/` (carrito, buscador, formularios complejos)
- **Animaciones** → `src/components/magicui/` (componentes con animaciones especiales)

#### **3. Layouts Jerárquicos**

- **Layout raíz**: `app/layout.tsx` - Estructura base de toda la aplicación
- **Layouts de sección**: `app/(marketing)/layout.tsx` - Header/footer específicos
- **Layouts de funcionalidad**: `app/(dashboard)/layout.tsx` - Sidebar, navegación admin

#### **4. Agrupación de Rutas (Route Groups)**

- Usar `(nombreGrupo)` para agrupar rutas sin afectar la URL:
  ```
  app/(marketing)/about/page.tsx     → /about
  app/(marketing)/services/page.tsx  → /services
  app/(dashboard)/orders/page.tsx    → /orders
  ```

#### **5. Archivos Privados y Utilidades**

- **Carpetas con `_` inicial**: No generan rutas públicas
  ```
  app/_private/utils/     # Utilidades internas
  app/_components/        # Componentes privados de app/
  ```
- **Lógica compartida fuera de app/**:
  ```
  src/lib/        # Helpers y configuraciones
  src/hooks/      # Custom hooks reutilizables
  src/types/      # Tipos TypeScript globales
  ```

#### **6. Nomenclatura Clara**

- **Evitar `index.tsx` genéricos** en componentes
- **Usar nombres descriptivos**:

  ```
  ✅ UserProfileCard.tsx
  ✅ ProductListItem.tsx
  ✅ ContactFormSubmit.tsx

  ❌ index.tsx
  ❌ Component.tsx
  ❌ Card.tsx (demasiado genérico)
  ```

#### **7. Convención de Nombres Jerárquica para Componentes**

- **Para mejorar la identificación del componente principal y la jerarquía**, se debe aplicar la siguiente convención de nombres jerárquica:
  ```
  [NombreSección].[Subsección].[Componente].tsx
  ```
- **Para Componentes Principales de Páginas**:
  - `Page.Section.tsx` - Componente principal de una página
- **Para Componentes Secundarios**:
  - `Page.NombreComponente.tsx` - Componentes de primer nivel
  - `Page.Sección.Componente.tsx` - Componentes de segundo nivel
  - `Page.Sección.Subsección.Componente.tsx` - Componentes de tercer nivel

**Ejemplos**:

- `Hero.Section.tsx` - Componente principal de la sección Hero
- `Hero.WavesBackground.tsx` - Fondo animado con olas
- `Hero.HeaderNavigation.tsx` - Navegación superior
- `Services.Section.tsx` - Componente principal de la página de servicios
- `Services.Features.tsx` - Sección de características
- `Services.Features.Card.tsx` - Tarjeta de características

Para más detalles, consultar: `.github/prompts/component-naming-convention.prompt.md`

#### **8. Organización de Estilos**

- **Estilos globales**: `src/styles/globals.css`
- **Estilos específicos**: Junto al componente solo si no se reutilizan
- **Preferencia por Tailwind**: Evitar CSS personalizado cuando sea posible

#### **8. Guía de Decisión: Colocación Cercana vs Features**

**🎯 USAR COLOCACIÓN CERCANA (app/components/) cuando:**

- El componente solo se usa en una página específica
- Es parte de la funcionalidad principal de esa ruta
- Quieres mantener todo el código relacionado junto
- Es un componente de presentación sin lógica de negocio compleja

**🔧 USAR FEATURES (src/components/features/) cuando:**

- El componente se reutiliza en múltiples páginas
- Tiene lógica de negocio compleja
- Es un módulo funcional completo (ej: carrito de compras)
- Necesitas separar claramente la lógica de negocio

**📱 EJEMPLO PRÁCTICO:**

```
# ✅ Colocación Cercana - Página principal
app/components/HeroSection.tsx
app/components/HeaderNavigation.tsx

# ✅ Features - Funcionalidad reutilizable
src/components/features/shopping-cart/ShoppingCart.tsx
src/components/features/search/SearchBar.tsx
```

### **Estado Actual del Proyecto**

🚨 **IMPORTANTE**: El proyecto está en fase de planificación. La aplicación Next.js aún no se ha inicializado.

## **DIRECTRICES DE GENERACIÓN DE CÓDIGO**

### **Estándares de Calidad**

1. **Server Components por defecto** - Solo usar 'use client' cuando sea estrictamente necesario
2. **Tipado TypeScript apropiado** - Interfaces completas, sin tipos 'any'
3. **Estados de carga y error** - Implementar manejo robusto de estados
4. **Mejores prácticas de accesibilidad** - Seguir estándares WCAG 2.1 AA
5. **Validación de formularios** - React Hook Form + Zod con patrones progresivos para validación robusta
6. **Elementos HTML semánticos** - Usar etiquetas apropiadas para SEO y accesibilidad
7. **Diseño responsive** - Mobile-first, adaptive para todas las pantallas
8. **Optimización de rendimiento** - Core Web Vitals en verde
9. **Sugerencias de mensajes de commit** - Siguiendo convenciones del proyecto

### **Patrones Específicos de WebSnack**

- **Enfoque en mercado español** - Considerar localización y UX local
- **SEO optimizado** - Meta tags, structured data, sitemap automático
- **Performance crítico** - Tiempo de carga <2.5s para todos los proyectos
- **Accesibilidad completa** - 100% compliance WCAG 2.1 AA
- **Gestión de errores centralizada** - Error boundaries y logging apropiado

### **Testing y Calidad** (PENDIENTE CONFIGURACIÓN)

- **Testing unitario** - Jest + React Testing Library
- **Testing de integración** - Cypress o Playwright
- **Linting y formateo** - ESLint + Prettier configurado
- **Pre-commit hooks** - Husky para validación automática

### **Deploy y CI/CD** (PENDIENTE CONFIGURACIÓN)

- **Vercel como plataforma principal** - Optimizado para Next.js
- **GitHub Actions** - CI/CD automatizado
- **Monitoreo de performance** - Core Web Vitals tracking
- **Error tracking** - Sentry o similar para producción

### **Ejemplos de Código y Comandos**

#### **Setup inicial del proyecto (PENDIENTE)**

```bash
# Crear proyecto Next.js 15
pnpm create next-app@latest websnack --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Instalar dependencias principales
pnpm add next@latest react@latest react-dom@latest

# Instalar shadcn/ui
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button card input

# Instalar validación de formularios
pnpm add react-hook-form @hookform/resolvers zod

# Instalar Magic UI (cuando esté disponible)
pnpm add magicui
```

#### **Ejemplo de Server Component**

```typescript
// src/app/services/page.tsx
interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
}

export default async function ServicesPage() {
  // Fetch de datos en Server Component
  const services: Service[] = await fetch("/api/services", {
    cache: "force-cache", // Cache estático
  }).then((res) => res.json());

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Servicios WebSnack</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </main>
  );
}
```

#### **Ejemplo de Client Component con validación**

```typescript
"use client";

// src/components/custom/contact-form.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// ✅ Validación Base
const contactSchema = z.object({
  name: z.string().min(2, "Nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  message: z.string().min(10, "Mensaje debe tener al menos 10 caracteres"),
  gdprConsent: z
    .boolean()
    .refine((val) => val === true, "Debes aceptar la política de privacidad"),
});

// ✅ Validación Progresiva por Nicho
const floristeriaSchema = contactSchema.extend({
  businessInfo: z.object({
    name: z.string().min(2),
    location: z.string().min(5, "Incluye barrio de Barcelona"),
    specialties: z
      .array(z.enum(["bodas", "funerales", "eventos_corporativos"]))
      .min(1),
  }),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    // Lógica de envío
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Implementación del formulario */}
    </form>
  );
}
```

**Referencias detalladas**:

- Consulta los archivos en `.github/support/` para patrones específicos, mejores prácticas y anti-patrones a evitar
- Revisa `.github/instructions/` para guías específicas por tipo de archivo
- Sistema de prompts disponible en `.github/prompts/`

## **SISTEMA DE PROMPTS ESPECIALIZADOS**

### **Prompts Principales (Estandarizados)**

Para tareas específicas, consulta estos prompts especializados en `.github/prompts/`:

- **`herramientas-desarrollo.prompt.md`** - MCPs, Testing automatizado, Playwright
- **`shadcn.prompt.md`** - Componentes shadcn/ui v4 con Next.js 15
- **`ui-ux.prompt.md`** - Diseño UI/UX con Tailwind CSS v4
- **`llm.prompt.md`** - Generación de archivos llms.txt optimizados

### **Prompts Técnicos Complementarios**

- **`arquitectura.prompt.md`** - Patrones de arquitectura
- **`layout.prompt.md`** - Layouts y estructura de páginas
- **`mcp-tools-nextjs.prompt.md`** - MCPs específicos para Next.js
- **`tailwind4-theming.prompt.md`** - Sistema de temas Tailwind v4
- **`theme.prompt.md`** - Gestión avanzada de temas

### **Navegación Completa**

Consulta **`.github/prompts/README.md`** para el índice completo del sistema de prompts, estado de estandarización y guías de uso.
