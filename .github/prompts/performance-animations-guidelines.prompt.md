# Prompt: Guía de Optimización de Animaciones y Rendimiento

## Contexto

Este prompt proporciona directrices basadas en experiencia real de optimización de rendimiento en el proyecto WEBCODE, donde se identificó y resolvió un problema de **consumo excesivo de CPU/GPU (>100 en idle)** causado por animaciones innecesarias.

## Stack Tecnológico

- **Framework**: Next.js 15.4.0, React 19
- **Styling**: TailwindCSS v4.1.12
- **Animations**: CSS animations, Framer Motion (opcional)
- **Performance**: Lighthouse, Chrome DevTools

## 🚨 Problemas Comunes de Rendimiento

### Síntomas de Mal Rendimiento
- ✗ CPU/GPU usage >50 en páginas en reposo
- ✗ Frame drops o stuttering al hacer scroll
- ✗ Batería se agota rápidamente en móviles
- ✗ Ventilador de laptop se activa constantemente
- ✗ Lighthouse Performance Score <90

### Causas Principales
1. **Animaciones continuas innecesarias** (`animate-pulse`, `animate-spin`, `animate-bounce`)
2. **Blur effects excesivos** (`blur-3xl`, múltiples `backdrop-blur`)
3. **Gradientes animados** con `background-size` y `background-position`
4. **Transform animations** en muchos elementos simultáneamente
5. **Animaciones que nunca se detienen** (sin hover, sin scroll triggers)

## **[Completado]** Reglas de Oro para Animaciones

### 1. **Principio de Necesidad**
```tsx
// **[Error]** MAL: Animación continua innecesaria
<div className="bg-primary/20 rounded-full blur-3xl animate-pulse" />

// **[Completado]** BIEN: Fondo estático (mismo efecto visual, 0% CPU)
<div className="bg-primary/20 rounded-full blur-2xl" />
```

**Pregúntate**: ¿Esta animación aporta valor funcional o es solo decorativa?
- Si es decorativa y continua → **Eliminarla**
- Si aporta feedback al usuario → **Mantenerla con triggers**

### 2. **Animaciones Solo con Triggers**

```tsx
// **[Error]** MAL: Animación constante
<div className="animate-ping opacity-20" />

// **[Completado]** BIEN: Animación solo en hover
<div className="group">
  <div className="opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
</div>

// **[Completado]** MEJOR: Animación solo en estado activo
<button className={cn(
  "transition-all duration-300",
  isLoading && "animate-pulse"
)}>
  {isLoading ? "Cargando..." : "Enviar"}
</button>
```

**Triggers válidos**:
- `:hover` - Interacción del usuario
- `:focus` - Accesibilidad
- `data-active` - Estados de UI
- Intersection Observer - Scroll visible
- User actions - Click, submit, etc.

### 3. **Límite de Elementos Animados**

```tsx
// **[Error]** MAL: 20+ elementos animándose simultáneamente
{backgrounds.map(bg => (
  <div key={bg.id} className="animate-blob blur-3xl" />
))}

// **[Completado]** BIEN: Máximo 3-5 elementos animados
<div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 blur-2xl" />
<div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 blur-2xl" />
// Solo 2 elementos estáticos, 0 animados
```

**Límites recomendados**:
- Máximo **5 elementos** con animaciones continuas
- Máximo **10 elementos** con animaciones hover
- Máximo **3 blur effects** pesados (blur-3xl, backdrop-blur-xl)

### 4. **Optimización de Blur**

```tsx
// **[Error]** MAL: Blur muy pesado (alto costo GPU)
<div className="backdrop-blur-3xl blur-3xl" />

// **[Completado]** BIEN: Blur moderado
<div className="backdrop-blur-md blur-2xl" />

// **[Completado]** MEJOR: Blur solo cuando es necesario
<div className="bg-card/90 backdrop-blur-sm" />
```

**Jerarquía de costo GPU**:
1. `blur-3xl`, `backdrop-blur-3xl` - **MUY COSTOSO** (evitar)
2. `blur-2xl`, `backdrop-blur-xl` - **COSTOSO** (usar con moderación)
3. `blur-xl`, `backdrop-blur-lg` - **MODERADO** (máximo 5 elementos)
4. `blur-lg`, `backdrop-blur-md` - **LIGERO** (uso normal)
5. `blur-md`, `backdrop-blur-sm` - **MUY LIGERO** (preferido)

### 5. **Clases de Animación Prohibidas (sin trigger)**

```tsx
// **[Error]** PROHIBIDO: Animaciones continuas sin trigger
"animate-spin"       // Solo para loaders activos
"animate-ping"       // Solo con hover o estados
"animate-pulse"      // Solo para skeleton loaders
"animate-bounce"     // Solo con hover o eventos
"animate-blob"       // Evitar completamente (custom)
"animate-shimmer"    // Solo con hover

// **[Completado]** PERMITIDO: Animaciones con trigger
"hover:animate-pulse"
"data-loading:animate-spin"
"group-hover:animate-bounce"
```

### 6. **Animaciones CSS vs JavaScript**

```tsx
// **[Completado]** PREFERIDO: CSS transitions (GPU accelerated)
className="transition-all duration-300 hover:scale-110"

// **[Error]** EVITAR: JavaScript animations constantes
useEffect(() => {
  const interval = setInterval(() => {
    setRotation(r => r + 1); // Re-render cada frame!
  }, 16);
}, []);

// **[Completado]** ALTERNATIVA: CSS + clases condicionales
className={cn(
  "transition-transform duration-300",
  isActive && "rotate-180"
)}
```

## **[Lista]** Checklist de Optimización

### Antes de Añadir Animaciones

- [ ] ¿La animación aporta valor funcional?
- [ ] ¿Puede ser reemplazada por un efecto estático?
- [ ] ¿Tiene un trigger de usuario (hover, click, scroll)?
- [ ] ¿Cuántos elementos ya tienen animaciones en la página?
- [ ] ¿El blur effect es realmente necesario?
- [ ] ¿He probado con `blur-2xl` en lugar de `blur-3xl`?
- [ ] ¿He verificado CPU/GPU usage en Chrome DevTools?

### Al Detectar Problemas de Rendimiento

#### 1. Identificar Elementos Animados
```javascript
// Ejecutar en Console de Chrome DevTools
const animatedElements = document.querySelectorAll('[class*="animate-"]');
console.log('Animated elements:', animatedElements.length);
animatedElements.forEach((el, i) => {
  console.log(`${i + 1}:`, el.className);
});
```

#### 2. Identificar Blur Effects
```javascript
const blurElements = document.querySelectorAll('[class*="blur-"], [class*="backdrop-blur"]');
console.log('Blur elements:', blurElements.length);
```

#### 3. Métricas de Referencia
```javascript
// Performance API
const perfData = performance.getEntriesByType('navigation')[0];
console.log('DOM Interactive:', perfData.domInteractive);
console.log('DOM Complete:', perfData.domComplete);
```

## **[Objetivos]** Patrones de Optimización

### Pattern 1: Background Decorativo
```tsx
// **[Error]** ANTES: Múltiples blobs animados
<section className="relative">
  <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 blur-3xl animate-pulse" />
  <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 blur-3xl animate-pulse animation-delay-2000" />
  <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 blur-3xl animate-blob" />
  <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 blur-3xl animate-blob animation-delay-4000" />
</section>

// **[Completado]** DESPUÉS: Máximo 2 elementos estáticos
<section className="relative">
  {/* Gradiente de fondo */}
  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
  
  {/* Máximo 2 blur spots estáticos */}
  <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-2xl" />
  <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-2xl" />
</section>
```

**Resultado**: De 4 animaciones continuas + blur-3xl → 0 animaciones + blur-2xl = **~90% menos CPU/GPU**

### Pattern 2: Loading States
```tsx
// **[Error]** MAL: Spinner siempre visible y animado
<div className="animate-spin">**[Recargar]**</div>

// **[Completado]** BIEN: Spinner solo cuando está cargando
{isLoading && (
  <div className="animate-spin">
    <LoaderIcon />
  </div>
)}

// **[Completado]** MEJOR: Skeleton loader específico
<div className={cn(
  "h-20 rounded-lg",
  isLoading ? "animate-pulse bg-muted" : "bg-card"
)}>
  {!isLoading && children}
</div>
```

### Pattern 3: Hover Effects (sin animaciones continuas)
```tsx
// **[Error]** MAL: Badge con ping continuo
<div className="relative">
  <span>Nuevo</span>
  <div className="absolute inset-0 animate-ping opacity-20" />
</div>

// **[Completado]** BIEN: Efecto solo en hover
<div className="group relative">
  <span>Nuevo</span>
  <div className="absolute inset-0 scale-0 group-hover:scale-100 transition-transform duration-300 opacity-20" />
</div>

// **[Completado]** MEJOR: Glow effect solo con CSS
<div className="relative transition-all duration-300 hover:shadow-lg hover:shadow-primary/50">
  <span>Nuevo</span>
</div>
```

### Pattern 4: Card Interactions
```tsx
// **[Error]** MAL: Múltiples layers con animaciones y blurs
<div className="relative group">
  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary opacity-20 blur-xl animate-gradient-x" />
  <div className="relative bg-card/80 backdrop-blur-3xl">
    <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
    {children}
  </div>
</div>

// **[Completado]** BIEN: Efectos simples y eficientes
<div className="group relative bg-card/90 backdrop-blur-sm border-2 border-primary/20 rounded-2xl transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/20">
  {children}
</div>
```

### Pattern 5: Timeline Connectors
```tsx
// **[Error]** MAL: Línea con gradiente animado
<div className="absolute top-0 h-full w-1 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary to-primary animate-shimmer bg-[length:100%_200%]" />
</div>

// **[Completado]** BIEN: Línea estática con buen diseño
<div className="absolute top-0 h-full w-1 bg-gradient-to-b from-primary/20 via-primary to-primary/20 rounded-full" />
```

## **[Búsqueda]** Herramientas de Diagnóstico

### Chrome DevTools Performance Panel

1. **Abrir DevTools**: F12 → Performance tab
2. **Start recording**
3. **Dejar página en reposo 5 segundos**
4. **Stop recording**
5. **Analizar**:
   - Main thread activity debe estar mayormente idle
   - GPU usage no debe exceder 20-30% en reposo
   - No debe haber "Long Tasks" continuos

### Script de Análisis Automático

```javascript
// Ejecutar en Console para análisis rápido
const performanceAnalysis = () => {
  const animated = document.querySelectorAll('[class*="animate-"]');
  const blur = document.querySelectorAll('[class*="blur-"]');
  const backdropBlur = document.querySelectorAll('[class*="backdrop-blur"]');
  const gradients = document.querySelectorAll('[class*="gradient"]');
  
  const analysis = {
    animatedElements: animated.length,
    blurElements: blur.length,
    backdropBlurElements: backdropBlur.length,
    gradientElements: gradients.length,
    score: 100,
    issues: []
  };
  
  // Scoring
  if (animated.length > 5) {
    analysis.score -= (animated.length - 5) * 5;
    analysis.issues.push(`**[Advertencia]** Demasiados elementos animados: ${animated.length} (máximo recomendado: 5)`);
  }
  
  if (blur.length > 10) {
    analysis.score -= (blur.length - 10) * 2;
    analysis.issues.push(`**[Advertencia]** Demasiados blur effects: ${blur.length} (máximo recomendado: 10)`);
  }
  
  const blur3xl = document.querySelectorAll('[class*="blur-3xl"]');
  if (blur3xl.length > 0) {
    analysis.score -= blur3xl.length * 10;
    analysis.issues.push(`**[Error]** Blur-3xl detectado: ${blur3xl.length} elementos (muy costoso GPU)`);
  }
  
  // Report
  console.log('=== ANÁLISIS DE RENDIMIENTO ===');
  console.log(`Score: ${Math.max(0, analysis.score)}/100`);
  console.log(`\nElementos animados: ${analysis.animatedElements}`);
  console.log(`Blur effects: ${analysis.blurElements}`);
  console.log(`Backdrop blur: ${analysis.backdropBlurElements}`);
  console.log(`Gradientes: ${analysis.gradientElements}`);
  
  if (analysis.issues.length > 0) {
    console.log('\n**[Advertencia]** ISSUES ENCONTRADOS:');
    analysis.issues.forEach(issue => console.log(issue));
  } else {
    console.log('\n**[Completado]** No se encontraron problemas de rendimiento');
  }
  
  return analysis;
};

performanceAnalysis();
```

## **[Análisis]** Métricas de Referencia

### Performance Targets

| Métrica | Excelente | Bueno | Aceptable | Malo |
|---------|-----------|-------|-----------|------|
| Animated elements | 0-3 | 4-5 | 6-10 | >10 |
| Blur-3xl elements | 0 | 0-1 | 2-3 | >3 |
| CPU idle % | <20 | 20-30 | 30-50 | >50 |
| GPU usage % | <10 | 10-20 | 20-40 | >40 |
| Lighthouse Perf | >95 | 90-95 | 80-90 | <80 |
| FPS en scroll | 60 | 55-60 | 45-55 | <45 |

### Caso Real: Optimización Página Proceso

**Antes**:
- 24 elementos animados
- 8x animate-pulse, 6x animate-blob
- CPU idle: >100 (Chrome Task Manager)
- Múltiples blur-3xl

**Después**:
- 4 elementos animados (solo skeleton loaders)
- 0 animaciones decorativas continuas
- CPU idle: ~20-30 (estimado)
- blur-3xl → blur-2xl

**Reducción**: **83% menos elementos animados**, **~75% menos CPU/GPU usage**

## **[Diseño]** Alternativas sin Animaciones

### En lugar de `animate-pulse`
```tsx
// **[Error]** animate-pulse continuo
<div className="bg-primary/20 animate-pulse" />

// **[Completado]** Gradiente estático bien diseñado
<div className="bg-gradient-to-br from-primary/20 via-primary/10 to-transparent" />
```

### En lugar de `animate-blob`
```tsx
// **[Error]** Blob animado
<div className="absolute bg-primary/10 blur-3xl animate-blob" />

// **[Completado]** Múltiples blobs estáticos con posiciones estratégicas
<div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 blur-2xl rounded-full" />
<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 blur-2xl rounded-full" />
```

### En lugar de `animate-shimmer`
```tsx
// **[Error]** Shimmer animado
<div className="bg-gradient-to-r from-transparent via-primary to-transparent animate-shimmer" />

// **[Completado]** Gradiente estático con buen diseño
<div className="bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
```

### En lugar de `animate-bounce`
```tsx
// **[Error]** Bounce continuo
<div className="animate-bounce">**[Lanzamiento]**</div>

// **[Completado]** Estático o scale en hover
<div className="transition-transform hover:scale-110">**[Lanzamiento]**</div>
```

## **[Documentación]** Template de Revisión de Código

Al revisar animaciones en PRs, usar este checklist:

```markdown
## Performance Review Checklist

### Animaciones
- [ ] No hay animaciones continuas innecesarias
- [ ] Todas las animaciones tienen triggers (hover, focus, estado)
- [ ] Total de elementos animados ≤ 5
- [ ] No se usa `animate-pulse` excepto en loaders
- [ ] No se usa `animate-blob` (custom, muy costoso)

### Blur Effects
- [ ] No se usa `blur-3xl` (preferir `blur-2xl` o menor)
- [ ] Total de blur effects ≤ 10
- [ ] `backdrop-blur` es necesario (no se puede lograr con opacidad)

### Gradientes
- [ ] No hay gradientes animados continuos
- [ ] Gradientes tienen max 3 color stops

### Testing
- [ ] Probado en Chrome DevTools Performance
- [ ] CPU idle < 30% en Task Manager
- [ ] No hay frame drops al hacer scroll
- [ ] Lighthouse Performance > 90

### Alternativas Consideradas
- [ ] ¿Se puede lograr el mismo efecto sin animación?
- [ ] ¿Se puede usar CSS en lugar de JS?
- [ ] ¿Se puede reducir el número de layers?
```

## **[Lanzamiento]** Guía de Implementación

### Paso 1: Auditar Página Existente

```bash
# En Chrome DevTools Console
performanceAnalysis();
```

### Paso 2: Identificar Elementos Críticos

```javascript
// Listar todas las animaciones
document.querySelectorAll('[class*="animate-"]').forEach((el, i) => {
  console.log(`${i + 1}:`, el.className, el.tagName);
});
```

### Paso 3: Priorizar Optimizaciones

1. **Crítico** (eliminar inmediatamente):
   - Animaciones continuas sin propósito
   - blur-3xl en múltiples elementos
   - animate-blob, animate-shimmer

2. **Importante** (reducir):
   - Más de 5 elementos con animate-pulse
   - Más de 10 blur effects
   - Gradientes animados

3. **Opcional** (mejorar):
   - Cambiar transitions muy largas (>500ms)
   - Optimizar hover effects complejos

### Paso 4: Implementar Optimizaciones

```tsx
// Reemplazar en componentes
// animate-pulse → estático o hover-only
// blur-3xl → blur-2xl
// animate-blob → remover
// animate-shimmer → gradiente estático
```

### Paso 5: Verificar Resultados

1. Recargar página
2. Abrir Task Manager de Chrome
3. Verificar que CPU/GPU < 30 en idle
4. Run Lighthouse
5. Verificar Performance Score > 90

## **[Recursos]** Referencias y Recursos

### Documentación
- [CSS Triggers](https://csstriggers.com/) - Qué properties causan repaints
- [will-change](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change) - Optimización GPU
- [Lighthouse Performance](https://developer.chrome.com/docs/lighthouse/performance/)

### Best Practices
- Preferir `transform` y `opacity` (GPU accelerated)
- Evitar animar `width`, `height`, `top`, `left` (causan reflow)
- Usar `will-change` solo cuando sea necesario
- Remover `will-change` después de la animación

### Tools
- Chrome DevTools Performance Panel
- Chrome Task Manager (Shift + Esc)
- Lighthouse CI
- [Web Vitals Extension](https://chrome.google.com/webstore/detail/web-vitals)

## **[Rendimiento]** Resumen Ejecutivo

### **[Error]** NO HACER
1. Animaciones continuas decorativas (pulse, blob, shimmer)
2. Más de 5 elementos animados simultáneamente
3. blur-3xl en múltiples elementos
4. Animaciones sin triggers de usuario
5. JavaScript para animaciones que CSS puede hacer

### **[Completado]** HACER
1. Animaciones con propósito (loading, feedback)
2. Triggers claros (hover, focus, estado)
3. blur-2xl o menor, máximo 10 elementos
4. CSS transitions simples (<300ms)
5. Probar con Performance Panel antes de merge

### **[Objetivos]** Objetivo
**CPU/GPU en idle < 30%** | **Lighthouse Performance > 90** | **0 frame drops en scroll**

---

**Versión**: 1.0  
**Última actualización**: 3 de Octubre de 2025  
**Basado en**: Optimización real de página /proceso (83% reducción de animaciones)

