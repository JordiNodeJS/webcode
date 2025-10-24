# **[Monitor]** Prompt para Análisis de CPU/GPU - Chrome DevTools

## **[Lista]** **Instrucciones del Prompt**

```
Analiza el rendimiento y consumo de CPU/GPU de mi aplicación web usando Chrome DevTools. Sigue este proceso paso a paso:

### **[Objetivos]** **PROCESO DE ANÁLISIS**

1. **Configuración Inicial**
   - Abre la aplicación en Chrome DevTools
   - Verifica que estés en la página correcta
   - Asegúrate de que no hay limitaciones de CPU/red activas

2. **Análisis Base (CPU Normal)**
   - Ejecuta performance trace con reload automático
   - Captura métricas: LCP, CLS, TTFB, Render Delay
   - Analiza insights: LCPBreakdown, RenderBlocking, DOMSize, ForcedReflow
   - Revisa mensajes de consola para errores

3. **Análisis con CPU Limitada**
   - Activa CPU throttling (4x slowdown)
   - Ejecuta nuevo performance trace
   - Compara métricas con el análisis base
   - Identifica componentes más afectados por limitaciones de CPU

4. **Análisis de GPU (si aplica)**
   - Verifica uso de CSS transforms, animations
   - Identifica elementos que fuerzan composición
   - Revisa si hay animaciones que bloquean el main thread

### **[Análisis]** **FORMATO DEL REPORTE**

Genera un reporte estructurado con:

#### ****[Objetivos]** Métricas Principales**
- LCP (antes/después de CPU throttling)
- CLS, TTFB, Render Delay
- Impacto porcentual de CPU limitada

#### ****[Búsqueda]** Problemas Identificados**
1. **Render Blocking Resources** (lista detallada)
2. **DOM Complexity** (elementos, profundidad, layout thrashing)
3. **Forced Reflows** (causas y impacto)
4. **CPU Sensitivity** (componentes más afectados)
5. **GPU Usage** (compositing layers, animations)

#### ****[Lanzamiento]** Recomendaciones de Optimización**
- **Inmediatas** (quick wins)
- **A Mediano Plazo** (refactoring)
- **A Largo Plazo** (arquitectura)

#### ****[Crecimiento]** Análisis Comparativo**
- Métricas antes vs después de CPU throttling
- Identificación de bottlenecks específicos
- Estimación de impacto en usuarios reales

#### ****[Completado]** Aspectos Positivos**
- Métricas que están bien
- Optimizaciones ya implementadas

### 🛠️ **HERRAMIENTAS A USAR**

- `performance_start_trace` (con reload y autoStop)
- `performance_analyze_insight` (LCPBreakdown, RenderBlocking, DOMSize, ForcedReflow)
- `emulate_cpu` (throttling 4x)
- `list_console_messages`
- `emulate_network` (opcional para análisis completo)

### **[Documentación]** **EJEMPLO DE SALIDA ESPERADA**

```

## **[Análisis]** **Análisis de Consumo de CPU/GPU - [Nombre App]**

### **[Objetivos]** **Métricas Principales**

**Sin limitación de CPU:**

- LCP: X ms
- CLS: X
- TTFB: X ms
- Render Delay: X ms (X% del tiempo total)

**Con CPU limitada (4x slowdown):**

- LCP: X ms (aumento de X%)
- [resto de métricas]

### **[Búsqueda]** **Problemas Identificados**

1. **Render Blocking Resources**
   - [lista detallada con tiempos]
2. **DOM Complexity**
   - [estadísticas específicas]
3. **CPU Sensitivity**
   - [componentes más afectados]

### **[Lanzamiento]** **Recomendaciones**

- **Inmediatas:** [lista específica]
- **A Mediano Plazo:** [lista específica]

### **[Crecimiento]** **Impacto Estimado**

- [análisis de impacto en usuarios reales]

```

### **[Advertencia]** **CONSIDERACIONES ESPECIALES**

- Siempre ejecuta análisis en condiciones controladas
- Compara métricas antes y después de cambios
- Considera diferentes tipos de dispositivos (móvil, desktop)
- Incluye estimaciones de impacto en Core Web Vitals
- Prioriza recomendaciones por impacto/efort

### **[Objetivos]** **OBJETIVO FINAL**

El reporte debe ser:
- **Accionable**: Recomendaciones específicas y priorizadas
- **Técnico**: Con métricas precisas y detalles
- **Comprensible**: Explicaciones claras del impacto
- **Completo**: Cubriendo todos los aspectos de rendimiento
```

## **[Herramientas]** **Uso del Prompt**

1. **Copia el contenido del bloque de código**
2. **Péguelo como instrucción inicial**
3. **Especifica la URL o página a analizar**
4. **Ajusta parámetros específicos si es necesario**

## **[Recursos]** **Contexto Adicional**

Este prompt está diseñado para:

- **Desarrolladores**: Que necesitan análisis técnicos detallados
- **Product Managers**: Que requieren métricas de rendimiento
- **DevOps**: Que optimizan infraestructura
- **QA**: Que validan rendimiento en diferentes condiciones

## **[Diseño]** **Personalización**

Puedes modificar el prompt para:

- **Enfocarse en métricas específicas** (solo LCP, solo CLS, etc.)
- **Incluir análisis de accesibilidad**
- **Agregar comparaciones con competidores**
- **Incorporar análisis de SEO técnico**
