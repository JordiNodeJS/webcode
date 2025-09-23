**1. ACTIVACIÓN DEL SISTEMA DE GESTIÓN:**

- Al reconocer que enfrentas una tarea compleja que requiere múltiples pasos o componentes, activa automáticamente tu sistema interno de task manager
- Inicia creando un índice maestro de tareas para el proyecto o solicitud actual

**2. CREACIÓN DEL ÍNDICE DE TAREAS:**

- Mantén un registro interno estructurado (no requiere archivos físicos)
- Si es necesario persistencia, crea archivos en carpeta tasks/
- Genera un ID único para cada tarea principal (formato: T001, T002, etc.)
- Registra en el índice: título, descripción, estado inicial, fecha de creación, y prioridad
- Mantén este índice actualizado en tiempo real durante todo el proceso

**3. DESCOMPOSICIÓN DE TAREAS COMPLEJAS:**

- Para tareas complejas, descompónlas en subtareas con IDs jerárquicos (ej: T001.1, T001.2)
- Cada subtarea debe tener sus propios metadatos: descripción, estado, progreso
- El progreso de la tarea padre se calcula automáticamente basado en las subtareas

**4. GESTIÓN DE DEPENDENCIAS:**

- Identifica y registra las dependencias entre tareas antes de comenzar la ejecución
- Una tarea no puede marcarse como "en progreso" hasta que todas sus dependencias estén "completadas"
- Verifica que no existan dependencias circulares en el sistema
- **Si detectas dependencias circulares:**
  - Identifica el ciclo completo (ej: T001 → T002 → T003 → T001)
  - Reestructura las tareas para romper el ciclo
  - Considera crear una tarea padre que contenga las tareas en conflicto
  - Documenta la resolución en el log de cambios

**5. SEGUIMIENTO Y MANTENIMIENTO:**

- Estados válidos: pendiente → en progreso → completada → cancelada (opcional)
- Actualiza el estado de cada tarea/subtarea a medida que avanzas
- Registra el progreso porcentual de cada tarea (0-100%)
- Mantén un log de cambios con: timestamp, tarea afectada, cambio realizado, motivo
- Si una tarea se bloquea, marca como "bloqueada" temporalmente e identifica acciones para desbloquear

**6. PRIORIZACIÓN Y EJECUCIÓN:**

- **Criterios de prioridad (de mayor a menor):**
  1. Tareas críticas sin dependencias (pueden iniciarse inmediatamente)
  2. Tareas que desbloquean múltiples tareas dependientes
  3. Tareas con mayor impacto en el progreso global
  4. Tareas con menor complejidad estimada (quick wins)
- Ejecuta las tareas en orden según sus dependencias y prioridad calculada
- Las tareas sin dependencias pendientes tienen prioridad de ejecución
- Informa periódicamente sobre el estado general del progreso

**7. FORMATO DE REPORTE INTERNO:**
Mantén un registro estructurado con este formato:

```
[PROYECTO: Nombre del proyecto]
[ÍNDICE DE TAREAS]
T001: [Título] - Estado: [pendiente/en progreso/completada/cancelada/bloqueada] - Progreso: [0-100%] - Dependencias: [T002,T003] o [ninguna]
├── T001.1: [Subtarea] - Estado: [estado] - Progreso: [0-100%]
└── T001.2: [Subtarea] - Estado: [estado] - Progreso: [0-100%]

[ESTADO GENERAL]
Total tareas: 5 | Completadas: 2 | En progreso: 1 | Pendientes: 2 | Bloqueadas: 0
Progreso global: [promedio calculado de todas las tareas]%

[LOG DE CAMBIOS RECIENTES]
[timestamp] T001: Estado cambiado de 'pendiente' a 'en progreso' - Iniciando desarrollo
[timestamp] T002: Progreso actualizado de 50% a 75% - Completada fase de análisis
```

**8. CRITERIOS DE FINALIZACIÓN:**

- **Una tarea está completada cuando:**
  - Todas sus subtareas están en estado "completada"
  - Se han cumplido todos los criterios de aceptación definidos
  - No hay dependencias de salida pendientes que la requieran
- **Una subtarea está completada cuando:**
  - Se ha ejecutado exitosamente su objetivo específico
  - Ha sido validada (si aplica)
- **El proyecto se considera finalizado cuando:**
  - Todas las tareas principales están en estado "completada"
  - No quedan tareas en estado "bloqueada" sin resolver
  - Se ha generado el resumen final del trabajo realizado y los resultados obtenidos

**9. MANEJO DE EXCEPCIONES:**

- Si surgen imprevistos que afecten las tareas, actualiza el índice y reevalúa las dependencias
- Si una tarea resulta innecesaria, marca su estado como "cancelada" y ajusta las dependencias afectadas
- Si una tarea no puede proceder temporalmente, marca como "bloqueada" con motivo específico
- Documenta todos los cambios excepcionales en el log de cambios con justificación

**ACTIVACIÓN AUTOMÁTICA:**
Estas reglas se aplican automáticamente cuando identifiques cualquier solicitud que requiera:

- Múltiples pasos secuenciales o paralelos
- Desglose de problemas complejos
- Coordinación de diferentes componentes o fases
- Seguimiento de progreso a lo largo del tiempo

---

Estas indicaciones funcionan como un sistema operativo interno que se activa cuando la IA reconoce que enfrenta una tarea que requiere gestión estructurada.
