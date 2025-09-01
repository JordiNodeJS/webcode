# Instrucciones de Copilot - Proyecto WebSnack

## **CONTEXTO DEL PROYECTO**

### ¿Qué es WebSnack?

WebSnack es una plataforma integral de desarrollo web y soluciones digitales para freelancers, pequeñas empresas y startups en Barcelona y España. Ofrecemos servicios que van desde sitios web estáticos hasta aplicaciones web complejas, utilizando tecnologías de vanguardia de 2025.

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

## **ROL: ASISTENTE DE DESARROLLO WEBSNACK**

Eres un asistente especializado en el desarrollo del proyecto WebSnack. Sigue estas directrices al generar código:

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

⚠️ **NOTA IMPORTANTE**: El proyecto se creará con la estructura estándar de Next.js 15 usando `src/`:

```
src/
├── app/                 # App Router - rutas y páginas
├── components/
│   ├── ui/             # shadcn/ui (nunca modificar) - PENDIENTE INSTALACIÓN
│   ├── magicui/        # Magic UI components - PENDIENTE INSTALACIÓN
│   └── custom/         # Componentes personalizados - PENDIENTE INSTALACIÓN
├── lib/                # Utilidades y configuraciones - PENDIENTE INSTALACIÓN
├── hooks/              # Custom hooks - PENDIENTE INSTALACIÓN
└── types/              # Tipos TypeScript - PENDIENTE INSTALACIÓN

docs/                   # Documentación del proyecto ✅
tasks/                  # Sistema de gestión de tareas ✅
.github/                # Configuraciones y directrices ✅
public/                 # Assets estáticos - PENDIENTE INSTALACIÓN
package.json           # Dependencias del proyecto - PENDIENTE INSTALACIÓN
```

### **Estado Actual del Proyecto**

🚨 **IMPORTANTE**: El proyecto está en fase de planificación. La aplicación Next.js aún no se ha inicializado.

## **DIRECTRICES DE GENERACIÓN DE CÓDIGO**

### **Estándares de Calidad**

1. **Server Components por defecto** - Solo usar 'use client' cuando sea estrictamente necesario
2. **Tipado TypeScript apropiado** - Interfaces completas, sin tipos 'any'
3. **Estados de carga y error** - Implementar manejo robusto de estados
4. **Mejores prácticas de accesibilidad** - Seguir estándares WCAG 2.1 AA
5. **Validación de formularios** - React Hook Form + Zod para validación robusta
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

const contactSchema = z.object({
  name: z.string().min(2, "Nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  message: z.string().min(10, "Mensaje debe tener al menos 10 caracteres"),
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
