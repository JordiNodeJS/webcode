# 🧪 GUÍA DE TESTING - Performance WEBCODE

## **[Completado]** **ESTADO ACTUAL**

### ****[Objetivos]** SOLUCIÓN IMPLEMENTADA:**

- **[Completado]** **Página principal** ahora usa `IdleOptimizedValuePropsGrid`
- **[Completado]** **Performance Test Lab** funcionando sin errores
- **[Completado]** **Servidor** corriendo en http://localhost:3001

### ****[Herramientas]** RUTAS DISPONIBLES:**

#### **1. Página Principal (con solución optimizada)**

```
http://localhost:3001/
```

- **Componente activo**: `IdleOptimizedValuePropsGrid`
- **Comportamiento**: GPU layers solo durante hover
- **Expectativa**: ~90% menos consumo CPU en idle

#### **2. Performance Test Lab**

```
http://localhost:3001/dev-performance-test
```

- **Componente**: `PerformanceTestLab`
- **Funcionalidad**: Comparar 4 escenarios diferentes
- **Métricas**: FPS, memoria, renders en tiempo real

---

## 🧪 **CÓMO USAR EL PERFORMANCE TEST LAB**

### **Paso 1: Acceder al Lab**

```bash
# El servidor ya está corriendo
http://localhost:3001/dev-performance-test
```

### **Paso 2: Escenarios Disponibles**

#### ****[Círculo Rojo]** "Tarjetas Originales"**

- Componente con problemas de performance
- GPU layers siempre activas
- Consume CPU en idle

#### **🟡 "Tarjetas Optimizadas"**

- Versión intermedia con algunas optimizaciones
- Mejor que original, pero no ideal

#### **🟢 "Tarjetas Estáticas"**

- Sin animaciones, solo CSS básico
- Performance perfecto, pero sin efectos

#### ****[Objetivos]** "Idle Performance Optimized"** **[Destacado]** **RECOMENDADO**

- Nueva solución implementada
- GPU layers condicionales
- Máximo performance + UX preservada

### **Paso 3: Interpretar Métricas**

#### ****[Análisis]** FPS (Frames Por Segundo)**

- **Verde (58-60 FPS)**: Excelente
- **Amarillo (45-57 FPS)**: Aceptable
- **Rojo (<45 FPS)**: Problemático

#### ****[Guardar]** Memoria**

- **Verde (<5MB)**: Excelente
- **Amarillo (5-15MB)**: Aceptable
- **Rojo (>15MB)**: Problemático

#### ****[Recargar]** Renders**

- **Muestra**: Número de re-renders por componente
- **Ideal**: Mínimos renders en idle

### **Paso 4: Pruebas Recomendadas**

#### **Test 1: Performance en Idle**

1. Seleccionar escenario
2. **NO mover el mouse** por 10 segundos
3. Observar FPS - debe mantenerse alto (55+)
4. Comparar entre escenarios

#### **Test 2: Performance con Hover**

1. Seleccionar escenario
2. Hacer hover sobre las tarjetas
3. Observar que efectos funcionan correctamente
4. FPS debe mantenerse >45 durante hover

#### **Test 3: Comparación A/B**

1. Probar "Tarjetas Originales" - anotar métricas
2. Probar "Idle Performance Optimized" - anotar métricas
3. Comparar diferencias

---

## **[Análisis]** **RESULTADOS ESPERADOS**

### **En la Página Principal (localhost:3001/)**

#### **Antes (Originales):**

- **[Error]** FPS idle: ~40-50 FPS
- **[Error]** CPU usage: Alto constante
- **[Error]** 16 GPU layers activas permanentemente

#### **Después (Idle Optimized):**

- **[Completado]** FPS idle: ~55-60 FPS
- **[Completado]** CPU usage: Bajo en idle
- **[Completado]** 0 GPU layers en idle, 4 solo durante hover

### **En el Performance Test Lab:**

#### **Métricas Objetivo para "Idle Performance Optimized":**

- **[Objetivos]** **FPS**: 58-60 FPS en idle
- **[Objetivos]** **Memoria**: <5MB adicional
- **[Objetivos]** **Renders**: ~90% menos que original
- **[Objetivos]** **Efectos visuales**: Preservados durante hover

---

## **[Herramientas]** **TROUBLESHOOTING**

### **"No veo diferencias en performance":**

1. Abrir **DevTools** → **Performance** tab
2. Grabar 30 segundos sin tocar nada
3. Comparar CPU usage entre escenarios

### **"Los efectos 3D no funcionan":**

1. Verificar que hagas **hover** sobre las tarjetas
2. Los efectos se activan solo durante hover (esto es correcto)

### **"El Performance Lab no carga":**

1. Verificar que el servidor esté en puerto 3001
2. Revisar consola del navegador para errores
3. Usar ruta completa: `http://localhost:3001/dev-performance-test`

### **"No veo las métricas en tiempo real":**

1. Las métricas se actualizan cada segundo
2. Interactuar con las tarjetas para ver cambios
3. Verificar que JavaScript esté habilitado

---

## **[Idea]** **CÓMO VERIFICAR QUE LA SOLUCIÓN FUNCIONA**

### **Método 1: Visual DevTools**

```javascript
// En DevTools Console:
// Ver capas activas
console.log(
  "GPU Layers:",
  document.querySelectorAll('[style*="will-change"]').length
);

// Ver elementos con transform 3D
console.log(
  "3D Contexts:",
  document.querySelectorAll('[style*="preserve-3d"]').length
);
```

### **Método 2: Performance Monitor**

```javascript
// En DevTools Performance:
// 1. Iniciar grabación
// 2. Esperar 10 segundos sin tocar nada
// 3. Parar grabación
// 4. Revisar "Main Thread" - debe estar mayormente idle
```

### **Método 3: Task Manager**

```
Chrome → More tools → Task Manager
- Buscar tab de WebCode
- Revisar CPU % - debe ser <5% en idle
```

---

## **[Objetivos]** **PRÓXIMOS PASOS**

### **Si la solución funciona bien:**

1. **[Completado]** La implementación está completa
2. **[Completado]** Performance optimizado
3. **[Completado]** UX preservada
4. **[Análisis]** Documentar métricas finales

### **Si necesitas más optimizaciones:**

1. **[Búsqueda]** Revisar otros componentes (botones con brillo)
2. **[Objetivos]** Aplicar mismo patrón a otros elementos
3. **[Crecimiento]** Implementar monitoring continuo

---

_Guía actualizada: Septiembre 19, 2025_  
_Servidor: http://localhost:3001_  
_Performance Lab: http://localhost:3001/dev-performance-test_
