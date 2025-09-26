# Criterios de Aceptación - Hero Section

## Métricas de Performance

### Core Web Vitals

- **LCP (Largest Contentful Paint)**: < 2.5 segundos
- **FID (First Input Delay)**: < 100 milisegundos
- **CLS (Cumulative Layout Shift)**: < 0.1

### Otras Métricas

- **Tiempo de carga total**: < 2.5 segundos
- **Bundle size**: < 200KB para componentes críticos
- **Puntuación Lighthouse**: > 95 en mobile y desktop

## Criterios Técnicos

### TypeScript y Code Quality

- [ ] Strict TypeScript mode habilitado
- [ ] Sin uso de tipo 'any'
- [ ] Interfaces bien definidas para todas las props
- [ ] Componentes tipados correctamente
- [ ] Sin errores de compilación

### Server Components

- [ ] Uso de Server Components por defecto
- [ ] Client Components solo donde sea necesario
- [ ] Correcta separación de lógica server/client

### Responsive Design

- [ ] Mobile-first implementation
- [ ] Breakpoints: 320px, 768px, 1024px, 1280px
- [ ] Touch targets >= 48px
- [ ] Grid adaptativo (1 columna móvil, 3 desktop)

### Accesibilidad (WCAG 2.1 AA)

- [ ] Contraste de texto >= 4.5:1
- [ ] Estructura semántica correcta (h1, h2, etc.)
- [ ] ARIA labels donde sea necesario
- [ ] Navegación por teclado funcional
- [ ] Focus visible en elementos interactivos
- [ ] Zero accessibility violations en axe-core

## Criterios de Diseño

### Tipografía

- [ ] Variable fonts para optimización
- [ ] Escala tipográfica consistente
- [ ] Legibilidad en todos los dispositivos
- [ ] Carga optimizada de fuentes

### Colores y Branding

- [ ] **Sistema de colores WebSnack implementado** con comando automático
- [ ] **Colores principales**: Rosa `#dc7cb3` (primary), Aguamarina `#bce3e5` (secondary)
- [ ] **Variables CSS disponibles**: `--primary`, `--secondary`, `--accent`, `--background`, `--foreground`
- [ ] Paleta de colores brand consistente
- [ ] Soporte para dark mode
- [ ] Transiciones suaves entre modos
- [ ] Contraste adecuado en ambos modos

### Espaciado y Layout

- [ ] Sistema de espaciado consistente
- [ ] Grid alineado correctamente
- [ ] Jerarquía visual clara
- [ ] Alineación vertical/horizontal precisa

## Criterios Funcionales

### Navegación

- [ ] Logo enlazado a homepage
- [ ] Todos los items de menú funcionales
- [ ] Selector de idioma operativo
- [ ] Menú hamburguesa en mobile

### Call to Action

- [ ] Botón primario "Consulta Gratuita" funcional
- [ ] Botón secundario "Ver Portfolio" funcional
- [ ] Estados hover/focus visibles
- [ ] Enlaces abren en misma/otra pestaña según contexto

### Contenido

- [ ] Headline principal visible y claro
- [ ] Subheadline descriptiva
- [ ] Value props completos y formateados
- [ ] Trust indicators visibles

## Criterios de Testing

### Unit Tests

- [ ] Cobertura > 80% para componentes
- [ ] Tests para diferentes estados
- [ ] Mocks para dependencias externas
- [ ] Assertions para props y renders

### Integration Tests

- [ ] Composición de componentes
- [ ] Props passing correctamente
- [ ] Event handlers funcionales
- [ ] State management (si aplica)

### E2E Tests

- [ ] Navegación entre secciones
- [ ] Funcionalidad de CTAs
- [ ] Responsive behavior
- [ ] Accesibilidad básica

## Criterios de Optimización

### Imágenes

- [ ] Uso de Next.js Image component
- [ ] Formatos modernos (webp, avif)
- [ ] Tamaños responsive
- [ ] Lazy loading donde sea apropiado

### Código

- [ ] Code splitting implementado
- [ ] Dynamic imports para componentes pesados
- [ ] Tree shaking para dependencias
- [ ] Minificación automática

### Caché

- [ ] Estrategias de caching definidas
- [ ] Revalidación de contenido
- [ ] CDN configuration
- [ ] Preloading de recursos críticos

## Métricas de Negocio

### Conversión

- [ ] CTA primario visible above the fold
- [ ] Trust indicators posicionados estratégicamente
- [ ] Value props alineados con objetivos de negocio
- [ ] Mensaje claro en primeros 3 segundos

### Usabilidad

- [ ] Tiempo para completar acción principal < 30 segundos
- [ ] Tasa de rebote esperada < 40%
- [ ] Navegación intuitiva
- [ ] Claridad del propósito de la página

## Checklist Final

### Pre-Code Review

- [ ] Código sigue estándares WebSnack
- [ ] Todos los criterios técnicos cumplidos
- [ ] Tests pasando
- [ ] Sin errores de linting

### Post-Code Review

- [ ] Feedback de code review incorporado
- [ ] Performance benchmarks verificados
- [ ] Accesibilidad auditada
- [ ] Documentación actualizada

### Pre-Lanzamiento

- [ ] Staging environment verificado
- [ ] Cross-browser testing completado
- [ ] Métricas de performance validadas
- [ ] Plan de rollback definido
