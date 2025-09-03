# Desglose de Tareas - Fase 1: Estructura Base

## Tarea 0: Configuración del Sistema de Colores WebSnack (CRÍTICA)

### Descripción
Implementar automáticamente el sistema de colores Rosa/Aguamarina de WebSnack usando el comando de shadcn/ui.

### Subtareas
1. Ejecutar comando de inicialización de shadcn/ui
2. Instalar tema personalizado WebSnack
3. Instalar componentes base con el tema
4. Verificar implementación del sistema de colores

### Detalles técnicos
- Usar pnpm dlx para comandos shadcn/ui
- Verificar que las variables CSS se hayan implementado
- Confirmar disponibilidad de colores Rosa `#dc7cb3` y Aguamarina `#bce3e5`
- Probar componentes base con el nuevo tema

### Comandos a ejecutar
```bash
# 1. Inicializar shadcn/ui
pnpm dlx shadcn@latest init

# 2. Instalar tema personalizado WebSnack (Rosa/Aguamarina con efectos 3D)
pnpm dlx shadcn@latest add https://tweakcn.com/r/themes/cmex1abh7000c04l4h2avft17

# 3. Instalar componentes base con el tema
pnpm dlx shadcn@latest add button card input form label textarea select
```

### Criterios de aceptación
- Sistema de colores WebSnack implementado
- Variables CSS disponibles en `globals.css`
- Componentes shadcn/ui con tema personalizado
- Verificación de colores: `#dc7cb3` (Rosa), `#bce3e5` (Aguamarina)

## Tarea 1: Crear estructura de directorios y componentes

### Descripción
Establecer la estructura de archivos y componentes necesarios para la Hero Section.

### Subtareas
1. Crear directorio `src/components/landing/hero/`
2. Crear componente principal `HeroSection.tsx`
3. Crear subcomponentes:
   - `HeaderNavigation.tsx`
   - `HeroContent.tsx`
   - `ValuePropsGrid.tsx`
   - `CallToAction.tsx`
   - `TrustIndicators.tsx`

### Detalles técnicos
- Utilizar TypeScript strict mode
- Seguir patrón de Server Components por defecto
- Crear interfaces para props de cada componente

### Archivos a crear
```
src/
├── app/
│   ├── page.tsx
│   └── components/
│       ├── HeroSection.tsx
│       ├── HeaderNavigation.tsx
│       ├── HeroContent.tsx
│       ├── ValuePropsGrid.tsx
│       ├── CallToAction.tsx
│       └── TrustIndicators.tsx
```

### Criterios de aceptación
- Estructura de directorios correcta
- Componentes creados con tipos TypeScript
- Server Components por defecto

## Tarea 2: Implementar Header de Navegación

### Descripción
Crear el componente de navegación superior con logo, menú y selector de idioma.

### Subtareas
1. Implementar logo WebSnack con Next.js Image
2. Crear menú de navegación con items:
   - Servicios
   - Proceso
   - Portfolio
   - Contacto
3. Implementar selector de idioma (ES/CA/EN)
4. Hacer componente responsive

### Detalles técnicos
- Utilizar `next/image` para optimización
- Implementar como Server Component
- Crear tipos para items de navegación
- Utilizar `next/link` para routing

### Código base
```tsx
interface NavigationItem {
  name: string;
  href: string;
}

interface HeaderNavigationProps {
  navigationItems: NavigationItem[];
  languages: string[];
  currentLanguage: string;
}
```

### Criterios de aceptación
- Logo optimizado con Next.js Image
- Menú responsive (mobile/desktop)
- Selector de idioma funcional
- HTML semántico correcto

## Tarea 3: Desarrollar Hero Content Principal

### Descripción
Implementar el contenido principal de la Hero Section con headline, subheadline y CTAs.

### Subtareas
1. Crear estructura para headline principal:
   ```
   Transformamos ideas en experiencias
   digitales excepcionales
   ```
2. Implementar subheadline:
   ```
   Desarrollo web moderno con Next.js 15 y React 19 para freelancers,
   pequeñas empresas y startups en Barcelona y España
   ```
3. Crear componentes para CTAs:
   - Consulta Gratuita (primary)
   - Ver Portfolio (secondary)

### Detalles técnicos
- Utilizar tipografía responsive
- Implementar como Server Component
- Crear tipos para props
- Optimizar para SEO

### Código base
```tsx
interface HeroContentProps {
  headline: string;
  subheadline: string;
}

interface CallToActionProps {
  primaryText: string;
  primaryHref: string;
  secondaryText: string;
  secondaryHref: string;
}
```

### Criterios de aceptación
- Tipografía responsive
- Contraste adecuado WCAG 2.1 AA
- Enlaces funcionales
- HTML semántico

## Tarea 4: Implementar Grid de Value Props

### Descripción
Crear el grid de 3 columnas con los value propositions principales.

### Subtareas
1. Crear estructura de grid responsive (3 columnas desktop, 1 columna mobile)
2. Implementar cada value prop con icono:
   - 🚀 Tecnología 2025
   - ⚡ Performance Garantizado
   - 📱 Mobile-First
3. Añadir lista de características para cada value prop

### Detalles técnicos
- Utilizar CSS Grid con Tailwind
- Implementar como Server Component
- Crear tipos para value props
- Iconos como componentes SVG

### Código base
```tsx
interface ValueProp {
  icon: string;
  title: string;
  features: string[];
}

interface ValuePropsGridProps {
  valueProps: ValueProp[];
}
```

### Criterios de aceptación
- Grid responsive
- Iconos optimizados
- Contraste adecuado
- Espaciado consistente

## Tarea 5: Implementar Trust Indicators

### Descripción
Crear los indicadores de confianza debajo de los CTAs.

### Subtareas
1. Implementar badges de confianza:
   - ✓ Cumplimiento RGPD
   - ✓ Normativas España
   - ✓ Barcelona Local
2. Asegurar visibilidad en todos los dispositivos
3. Optimizar para lectura rápida

### Detalles técnicos
- Utilizar badges con Tailwind
- Implementar como Server Component
- Crear tipos para trust indicators

### Código base
```tsx
interface TrustIndicator {
  text: string;
  verified: boolean;
}

interface TrustIndicatorsProps {
  indicators: TrustIndicator[];
}
```

### Criterios de aceptación
- Visibilidad clara
- Contraste adecuado
- Responsive design
- HTML semántico

## Tarea 6: Integración de componentes

### Descripción
Componer todos los elementos en la Hero Section principal y verificar funcionamiento.

### Subtareas
1. Componer HeroSection con todos los subcomponentes
2. Verificar estructura HTML semántica
3. Probar responsive design
4. Validar accesibilidad básica

### Detalles técnicos
- Componer en orden correcto
- Verificar jerarquía de headings
- Probar en múltiples viewports
- Validar estructura semántica

### Código base
```tsx
export default function HeroSection() {
  return (
    <section className="hero-section">
      <HeaderNavigation {...navigationProps} />
      <HeroContent {...heroContentProps} />
      <ValuePropsGrid {...valueProps} />
      <CallToAction {...ctaProps} />
      <TrustIndicators {...trustIndicators} />
    </section>
  );
}
```

### Criterios de aceptación
- Composición correcta de componentes
- Estructura semántica válida
- Responsive en todos los breakpoints
- Sin errores de compilación