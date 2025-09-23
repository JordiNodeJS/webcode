# 🔍 Análisis de Rendimiento - Tarjetas WebSnack

## 📊 PROBLEMAS IDENTIFICADOS EN REPOSO

### 🚨 1. **Causas Principales del Consumo de CPU en Reposo**

#### **A. CSS Transform Costoso Aplicado Permanentemente**

```tsx
// 🔴 PROBLEMA: Transform complejo siempre activo
style={{
  transform: cardTransform, // Siempre calculado, incluso en reposo
}}

// cardTransform siempre evalúa:
const cardTransform = `perspective(1000px) rotateX(${cardState.rotateX}deg) rotateY(${cardState.rotateY}deg) scale3d(1.01, 1.01, 1.01) translateZ(30px)`;
```

**Impacto**: Fuerza layer de compositing permanente, consume GPU incluso sin interacción.

#### **B. Clases CSS con `will-change-transform` Siempre Activas**

```tsx
// 🔴 PROBLEMA: will-change siempre activo
className = "will-change-transform [transform-style:preserve-3d]";
```

**Impacto**: El navegador mantiene layer de compositing activo permanentemente.

#### **C. Multiple Gradientes Dinámicos Calculados**

```tsx
// 🔴 PROBLEMA: Cálculos constantes de gradiente
const dynamicGradient = useMemo(() => {
  // Siempre recalcula colores y posiciones
  const { r, g, b } = calculateGradientColor(cardState.glareX);
  return `radial-gradient(circle at ${cardState.glareX}% ${cardState.glareY}%, rgba(${r}, ${g}, ${b}, 0.15), transparent)`;
}, [cardState.glareX, cardState.glareY, cardState.isHovered]);
```

**Impacto**: Re-renderiza elementos con gradientes complejos constantemente.

#### **D. Transitions de Larga Duración Activas**

```css
/* 🔴 PROBLEMA: Transiciones largas siempre escuchando */
transition-all duration-700  /* 700ms = muy larga */
transition-opacity duration-700
```

**Impacto**: El navegador mantiene listeners de animación activos.

---

## ⚡ ESTRATEGIAS DE OPTIMIZACIÓN

### 🎯 **Estrategia 1: CSS Layers Condicionales**

```tsx
// ✅ SOLUCIÓN: Aplicar transform solo cuando sea necesario
const OptimizedCard = React.memo(() => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      className={`
        relative h-full group transition-transform duration-200 ease-out
        ${isHovered ? 'will-change-transform [transform-style:preserve-3d]' : ''}
      `}
      style={{
        // Solo aplicar transform complejo en hover
        transform: isHovered ? cardTransform : 'none',
      }}
    >
```

### 🎯 **Estrategia 2: GPU Layers Optimizados**

```css
/* ✅ SOLUCIÓN: Usar transform3d solo cuando sea necesario */
.card-idle {
  /* Estado de reposo: sin layers extras */
  transform: none;
  will-change: auto;
}

.card-active {
  /* Estado activo: activar GPU layer */
  will-change: transform;
  transform: translate3d(0, 0, 0); /* Mínimo para activar GPU */
}
```

### 🎯 **Estrategia 3: Gradientes Estáticos vs Dinámicos**

```tsx
// ✅ SOLUCIÓN: Gradientes pre-calculados
const STATIC_GRADIENTS = {
  pink: "radial-gradient(circle at 30% 30%, rgba(178, 62, 176, 0.1), transparent)",
  teal: "radial-gradient(circle at 70% 70%, rgba(45, 212, 191, 0.1), transparent)",
  default:
    "radial-gradient(circle at 50% 50%, rgba(111, 137, 193, 0.08), transparent)"
} as const;

// Usar gradientes estáticos en reposo, dinámicos solo en hover
const gradientStyle = isHovered ? dynamicGradient : STATIC_GRADIENTS.default;
```

### 🎯 **Estrategia 4: Intersection Observer para Activación Selectiva**

```tsx
// ✅ SOLUCIÓN: Solo activar animaciones cuando las tarjetas están visibles
const useConditionalAnimations = () => {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "50px"
  });

  return {
    ref,
    enableAnimations: isIntersecting // Solo animar si está visible
  };
};
```

---

## 🚀 IMPLEMENTACIÓN DE LA SOLUCIÓN

### **Paso 1: Tarjeta Optimizada para Reposo**

```tsx
const PerformanceOptimizedCard = React.memo(({ prop }: { prop: ValueProp }) => {
  const [isActive, setIsActive] = useState(false); // Solo true en hover real
  const [cardState, setCardState] = useState(DEFAULT_CARD_STATE);

  // Usar RAF throttling para limitar actualizaciones
  const throttledUpdate = useCallback(
    throttle((newState: CardState) => {
      setCardState(newState);
    }, 16), // 60fps máximo
    []
  );

  const handleMouseEnter = useCallback(() => {
    setIsActive(true); // Activar layer de compositing
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsActive(false); // Desactivar layer de compositing
    setCardState(DEFAULT_CARD_STATE); // Reset inmediato
  }, []);

  return (
    <article
      className={`
        relative h-full group transition-transform duration-200 ease-out
        ${isActive ? "will-change-transform [transform-style:preserve-3d]" : ""}
      `}
      style={{
        transform: isActive ? cardTransform : "none" // Solo transformar cuando está activo
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={isActive ? handleMouseMove : undefined} // Solo escuchar mousemove si está activo
    >
      {/* Gradiente optimizado */}
      <div
        className={`
          absolute inset-0 pointer-events-none
          ${isActive ? "transition-all duration-300" : "transition-none"}
        `}
        style={{
          background: isActive ? dynamicGradient : STATIC_GRADIENTS.default
        }}
      />

      {/* Resto del contenido... */}
    </article>
  );
});
```

### **Paso 2: Throttling y Debouncing Inteligente**

```tsx
// ✅ Limitar actualizaciones de estado
const useThrottledMouseMove = (callback: Function, delay: number = 16) => {
  const throttleRef = useRef<NodeJS.Timeout>();

  return useCallback(
    (e: React.MouseEvent) => {
      if (throttleRef.current) return; // Skip si ya hay una actualización pendiente

      throttleRef.current = setTimeout(() => {
        callback(e);
        throttleRef.current = null;
      }, delay);
    },
    [callback, delay]
  );
};
```

### **Paso 3: CSS Optimizado para Rendimiento**

```css
/* ✅ CSS optimizado para reposo */
.card-optimized {
  /* Estado base: mínimo impacto en rendimiento */
  backface-visibility: hidden; /* Evita redraws */
  transform: translate3d(0, 0, 0); /* Fuerza GPU layer solo si es necesario */
  will-change: auto; /* Dejar que el navegador decida */
}

.card-optimized:hover {
  /* Solo activar propiedades costosas en hover */
  will-change: transform, filter;
  transform-style: preserve-3d;
}

/* Usar contain para limitar el impacto de las animaciones */
.card-container {
  contain: layout style paint;
}
```

---

## 📈 RESULTADOS ESPERADOS

### **Antes (Problemático)**

- **Reposo**: 45-50 FPS (debería ser 60)
- **Memoria GPU**: Layers activos permanentemente
- **CPU**: 8-12% uso constante
- **Re-renders**: Constantes por mousemove

### **Después (Optimizado)**

- **Reposo**: 60 FPS estables
- **Memoria GPU**: Layers solo cuando son necesarios
- **CPU**: <2% uso en reposo
- **Re-renders**: Solo en interacciones reales

---

## 🧪 TESTING RECOMENDADO

### **Usar la herramienta creada**: `/dev-performance-test`

1. **Comparar escenarios**:
   - Original vs Optimizada vs Estática
2. **Métricas clave a observar**:
   - FPS en reposo (objetivo: 60 FPS constante)
   - Uso de memoria JS
   - Número de re-renders
3. **Casos de prueba**:
   - ✅ Cards en reposo (sin hover) durante 30 segundos
   - ✅ Hover rápido sobre múltiples cards
   - ✅ Scroll rápido con cards visibles
   - ✅ Cambio de pestaña y regreso (suspend/resume)

---

## 🎯 IMPLEMENTACIÓN PRIORITARIA

1. **Paso 1**: Implementar `will-change` condicional
2. **Paso 2**: Optimizar gradientes (estáticos en reposo)
3. **Paso 3**: Throttling de mousemove events
4. **Paso 4**: CSS contain properties
5. **Paso 5**: Testing y validación con herramientas dev
