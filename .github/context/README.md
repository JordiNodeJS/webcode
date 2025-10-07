# 📁 Sistema de Contexto WebCode

Este directorio contiene archivos de contexto que se actualizan automáticamente para mantener la memoria del proyecto entre sesiones de LLM.

## **Archivos de Contexto**

### **Archivos Principales**

- `current-session.md` - Estado de la sesión actual
- `recent-decisions.md` - Decisiones técnicas recientes
- `active-tasks.md` - Tareas en progreso
- `project-timeline.md` - Línea de tiempo del proyecto
- `technical-context.md` - Contexto técnico actualizado

### **Archivos de Snapshots**

- `daily-snapshots/` - Estados diarios del proyecto
- `milestone-snapshots/` - Estados en hitos importantes

### **Archivos de Tracking**

- `git-activity.md` - Actividad reciente en Git
- `file-changes.md` - Cambios recientes en archivos
- `error-log.md` - Errores y soluciones aplicadas

## **Uso Automático**

Estos archivos se referencian automáticamente en:

1. **`copilot-instructions.md`** - Como contexto principal
2. **`llms.txt`** - Para búsquedas contextuales
3. **Scripts de automatización** - Para updates automáticos

## **Mantenimiento**

Los archivos se actualizan automáticamente mediante:

- Git hooks (pre-commit, post-commit)
- Scripts de CI/CD
- Comandos de desarrollo personalizados
- VSCode extensions/tasks
