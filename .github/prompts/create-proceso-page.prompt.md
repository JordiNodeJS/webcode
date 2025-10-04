# Prompt: Crear Página "Proceso" de Desarrollo Web

## Contexto del Proyecto

Estás trabajando en **WEBCODE** (anteriormente WebSnack), una plataforma de desarrollo web profesional en Barcelona. El proyecto usa:

- **Stack**: Next.js 15.4.0, React 19, TypeScript, TailwindCSS v4.1.12
- **UI Components**: shadcn/ui, Magic UI
- **Sistema de Animaciones**: WAS (WebSnack Animation System)
- **Estilo**: Diseño limpio y profesional con gradientes sutiles

### Sistema de Colores (Memoria del Proyecto)

```
Primary: Rosa #ff6680 (oklch)
Secondary: Aguamarina (oklch)
Accent: Púrpura #9333ea
Gradientes suaves en títulos y fondos
```

## Tarea

Crear una página completa en `/proceso` que explique el proceso de desarrollo web en 4 fases, siguiendo el diseño y estructura del proyecto.

## Requisitos Técnicos

### 1. Archivo a Crear
- **Ruta**: `src/app/proceso/page.tsx`
- **Tipo**: Server Component de Next.js
- **Metadata**: Usar `generateSEOMetadata` de `@/lib/seo-metadata`

### 2. Imports Necesarios

```typescript
import type { Metadata } from "next";
import Link from "next/link";
import { WSFadeIn } from "@/components/animations/ws-fade-in";
import { generateSEOMetadata } from "@/lib/seo-metadata";
```

### 3. SEO Metadata

```typescript
export const metadata: Metadata = generateSEOMetadata({
  title: "Proceso de Desarrollo Web | WEBCODE Barcelona",
  description: "Nuestro proceso de desarrollo web en 4 fases: Discovery, Diseño, Desarrollo y Launch. Transparencia total, actualizaciones semanales y garantías de calidad.",
  keywords: [
    "proceso desarrollo web",
    "metodología agile",
    "desarrollo web barcelona",
    "proceso web",
    "agencia web proceso",
    "desarrollo transparente"
  ],
  canonical: "https://webcode.es/proceso"
});
```

**IMPORTANTE**: `keywords` debe ser un **array**, NO un string.

## Estructura de Contenido

### Sección 1: Hero
- Título con gradiente: "Nuestro Proceso de Desarrollo"
- Subtítulo: "Metodología probada en 4 fases para garantizar el éxito de tu proyecto digital"
- Trust indicators: Transparencia total, Updates semanales, Garantías de calidad
- Usar clase `text-gradient-webcode` para el título
- Fondo: `bg-gradient-webcode`

### Sección 2: Timeline de 4 Fases

**Desktop**: Timeline horizontal con línea conectora
**Mobile**: Timeline vertical tipo acordeón

#### Fase 1: Discovery & Strategy (Semana 1)
**Icono**: Lupa/Search
**Actividades**:
- Análisis de necesidades del negocio
- Research de competencia y mercado
- Definición de objetivos y KPIs
- Arquitectura de información

**Entregables**: Estrategia digital completa, Wireframes interactivos, Cronograma detallado, Brief técnico

**Participación Cliente**: 8-10 horas (discovery, content review)

#### Fase 2: Diseño & Experiencia (Semana 2-3)
**Icono**: Paleta/Brush
**Actividades**:
- Design system personalizado
- Wireframes y flujos básicos
- Mockups high-fidelity
- Testing de usabilidad + Microsoft Clarity

**Entregables**: Diseños finales listos, Guía de estilo completa, Wireframes validados, Report de testing UX

**Participación Cliente**: 2-3 horas/semana (design feedback)

#### Fase 3: Desarrollo & Integración (Semana 3-5)
**Icono**: Código/Code
**Actividades**:
- Código limpio y escalable (Next.js 15 + React 19)
- Integración de herramientas (Analytics, pagos, APIs)
- Testing automatizado
- Optimización de performance

**Entregables**: Sitio completamente funcional, Panel de administración, Suite de testing, Documentación técnica

**Participación Cliente**: 1-2 horas/semana (testing, reviews)

#### Fase 4: Launch & Optimización (Semana 6)
**Icono**: Rayo/Lightning
**Actividades**:
- Deploy en producción (blue-green deployment)
- Configuración de analytics completa
- Interpretación de analytics y herramientas
- Training del cliente (presencial BCN o remoto)

**Entregables**: Sitio live y optimizado, Documentación gestión, Credenciales herramientas, 30 días soporte premium

**Participación Cliente**: 4-6 horas (training, launch)

**Tiempo Total**: 6 semanas | Participación cliente: ~25-30 horas

### Sección 3: Detalles de Cada Fase
Grid de 2 columnas (desktop) con cards expandidas que muestran:
- Número de fase en badge
- Título y duración
- Lista detallada de actividades con border-left de primary
- Entregables en lista con checkmarks

### Sección 4: Garantías de Calidad
Grid de 3 columnas con 6 garantías:

1. ✅ Updates semanales - Demos funcionales cada semana
2. 🔄 2 rounds revisiones - Por cada fase del proyecto
3. 📂 Código fuente - Acceso completo al código
4. 📚 Documentación - Técnica y de usuario detallada
5. 🛡️ 30 días soporte - Post-lanzamiento incluido
6. 🔒 Backup completo - Versionado del proyecto

**Protección del Cliente** (card destacada):
- Seguridad contractual: Contrato con entregables, Pagos por milestones (40%, 35%, 25%), Garantía 15 días
- Soporte y backup: Escalación directa, Backup completo, 30 días soporte

### Sección 5: Canales de Comunicación
Grid de 2 columnas con 4 canales:

1. 📧 Email prioritario - Respuesta <4h en horario laboral
2. 💬 WhatsApp Business - Para consultas rápidas
3. 📹 Videollamadas - Reuniones semanales de seguimiento
4. 💼 Slack/Teams - Para proyectos enterprise

### Sección 6: CTA Final
- Título: "¿Listo para empezar tu proyecto?"
- Subtítulo: "Agenda una consulta gratuita de 30 minutos..."
- 2 botones: "Consulta Gratuita" (link a /contacto) y "Ver FAQ" (link a /faqs)
- Usar clases `neon-btn-3` y `neon-btn-7` para los botones
- Texto inferior: "Respuesta en menos de 24h • Sin compromiso • Barcelona local"

## Estilos y Diseño

### Colores y Clases
```css
/* Títulos con gradiente */
.text-gradient-webcode

/* Fondos suaves */
.bg-gradient-webcode
.bg-muted/50

/* Bordes sutiles */
border border-border
border-2 border-primary (para destacar)

/* Sombras */
shadow-md
shadow-lg
shadow-xl

/* Redondeados */
rounded-lg
rounded-md

/* Opacidades */
bg-muted/50
border-border/50
```

### Cards y Componentes
- **Cards normales**: `bg-card border border-border rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300`
- **Cards destacadas**: `bg-primary/10 border-2 border-primary rounded-lg p-8 shadow-md`
- **Badges numéricos**: `bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold shadow-md`

### Animaciones
- Envolver secciones con `<WSFadeIn delay={0.1}>...</WSFadeIn>`
- Usar delays escalonados (0.1, 0.2, 0.3) para elementos en secuencia
- Transitions suaves en hover: `transition-all duration-300`
- Hover effects: `hover:-translate-y-1` para cards

### Responsive Design
```tsx
// Desktop: Timeline horizontal
<div className="hidden lg:block">
  <div className="grid grid-cols-4 gap-8">
    {/* Cards horizontales */}
  </div>
</div>

// Mobile: Timeline vertical
<div className="lg:hidden space-y-8">
  {/* Cards verticales con línea conectora */}
</div>
```

### Iconos SVG
Crear componente `PhaseIcon` que retorne SVGs inline para cada fase:
- Fase 1: Lupa (search icon)
- Fase 2: Paleta (design icon)
- Fase 3: Código (code brackets)
- Fase 4: Rayo (lightning bolt)

Usar `stroke="currentColor"` y `className="w-12 h-12"` para los SVGs.

## Referencias de Diseño

Observa estos archivos del proyecto para mantener consistencia:

1. **src/app/faqs/page.tsx** - Estructura similar de página
2. **src/app/contacto/page.tsx** - Hero section style
3. **src/components/animations/ws-fade-in.tsx** - Sistema de animaciones
4. **src/app/globals.css** - Variables de color y clases utility

## Checklist de Validación

Antes de finalizar, verifica:

- [ ] Metadata con keywords como **array** (no string)
- [ ] Imports correctos desde @/components y @/lib
- [ ] Todas las secciones incluidas (Hero, Timeline, Detalles, Garantías, Comunicación, CTA)
- [ ] Responsive design (hidden lg:block / lg:hidden)
- [ ] Animaciones WSFadeIn con delays apropiados
- [ ] Links a /contacto y /faqs funcionando
- [ ] Clases de TailwindCSS válidas (border no border-4, shadow-lg no shadow-3d-lg)
- [ ] Gradientes usando clases del proyecto (.text-gradient-webcode, .bg-gradient-webcode)
- [ ] Sin errores de TypeScript
- [ ] Todos los textos en español

## Output Esperado

Un archivo `src/app/proceso/page.tsx` completo (~650 líneas) que:

1. Se integre perfectamente con el diseño existente
2. Sea totalmente responsive (mobile-first)
3. Incluya animaciones suaves y profesionales
4. Tenga SEO optimizado
5. Sea accesible y usable
6. Mantenga la coherencia visual con el resto del proyecto

## Ejemplo de Estructura del Código

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { WSFadeIn } from "@/components/animations/ws-fade-in";
import { generateSEOMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = generateSEOMetadata({
  // ... configuración
});

const PhaseIcon = ({ phase }: { phase: number }) => {
  // ... SVG icons
};

export default function ProcesoPage() {
  const fases = [
    {
      numero: 1,
      titulo: "Discovery & Strategy",
      duracion: "Semana 1",
      // ... resto de datos
    },
    // ... más fases
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-webcode">
        {/* ... contenido hero */}
      </section>

      {/* Timeline de Fases */}
      <section className="py-20 bg-background">
        {/* Desktop timeline */}
        <div className="hidden lg:block">
          {/* ... grid horizontal */}
        </div>
        
        {/* Mobile timeline */}
        <div className="lg:hidden space-y-8">
          {/* ... lista vertical */}
        </div>
      </section>

      {/* Resto de secciones */}
      {/* ... */}
    </div>
  );
}
```

---

**Nota Final**: Este prompt está diseñado para generar una página completa y funcional en un solo intento, manteniendo la coherencia con el proyecto WEBCODE existente.

