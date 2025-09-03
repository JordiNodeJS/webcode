# Sistema de Prompts WebSnack para Qoder

## 🎯 Estructura del Sistema

Este sistema adapta el sistema de prompts de GitHub Copilot al editor Qoder, manteniendo la misma organización pero optimizado para las capacidades específicas de Qoder.

### 📁 Organización de Directorios

```
.qoder/
├── README.md                    # Este archivo - Guía principal
├── instructions/                # Instrucciones técnicas específicas
│   ├── app-router.instructions.md
│   ├── components.instructions.md
│   ├── styling.instructions.md
│   └── typescript.instructions.md
├── prompts/                     # Prompts especializados para tareas específicas
│   ├── README.md               # Índice y guía de prompts
│   ├── _template-estandar.md   # Template para nuevos prompts
│   ├── shadcn.prompt.md        # Componentes shadcn/ui
│   ├── ui-ux.prompt.md         # Diseño UI/UX
│   ├── arquitectura.prompt.md  # Patrones de arquitectura
│   └── [otros prompts...]
├── context/                     # Contexto dinámico del proyecto
│   ├── current-session.md      # Sesión actual de desarrollo
│   ├── technical-context.md    # Contexto técnico actualizado
│   └── project-state.md        # Estado general del proyecto
├── project/                     # Gestión y configuración del proyecto
│   ├── taskmanager-instructions.md
│   └── project-configuration.md
├── support/                     # Patrones, ejemplos y anti-patrones
│   └── [archivos de soporte...]
└── docs/                       # Documentación del sistema
    └── migration-guide.md      # Guía de migración desde GitHub
```

## 🚀 Cómo Usar Este Sistema

### 1. **Archivo Principal: llms.txt**
El archivo raíz `llms.txt` es el punto de entrada principal que lee Qoder. Contiene:
- Contexto general del proyecto
- Referencias a prompts especializados
- Estado actual del desarrollo
- Instrucciones fundamentales

### 2. **Prompts Especializados**
Ubicados en `.qoder/prompts/`, cada prompt se enfoca en una tarea específica:
- **Desarrollo de componentes**: `shadcn.prompt.md`
- **Diseño UI/UX**: `ui-ux.prompt.md` 
- **Arquitectura**: `arquitectura.prompt.md`
- **Y muchos más...**

### 3. **Contexto Dinámico**
Los archivos en `.qoder/context/` se actualizan automáticamente:
- Estado del proyecto en tiempo real
- Decisiones técnicas recientes
- Progreso y tareas pendientes

### 4. **Instrucciones Técnicas**
Guías específicas en `.qoder/instructions/` para:
- TypeScript patterns
- Component development
- Styling guidelines
- App Router best practices

## 🔄 Migración desde GitHub

Este sistema mantiene **compatibilidad completa** con tu estructura anterior:
- Todos los prompts se han migrado
- La lógica de referencias se mantiene
- Los patrones de desarrollo son idénticos

### Diferencias Clave con GitHub Copilot

| Aspecto | GitHub Copilot | Qoder |
|---------|---------------|-------|
| Archivo principal | `copilot-instructions.md` | `llms.txt` |
| Directorio base | `.github/` | `.qoder/` |
| Referencias | Automáticas en contexto | Explícitas en llms.txt |
| Actualización | Manual/automática | Manual con herramientas |

## 📝 Cómo Referenciar Prompts

En `llms.txt` o en cualquier conversación con Qoder, puedes referenciar:

```markdown
Para desarrollo de componentes, consulta: .qoder/prompts/shadcn.prompt.md
Para patrones UI/UX, revisa: .qoder/prompts/ui-ux.prompt.md
Estado actual del proyecto: .qoder/context/project-state.md
```

## 🛠️ Mantenimiento

1. **Actualizar contexto**: Modificar archivos en `.qoder/context/`
2. **Añadir nuevos prompts**: Usar template en `.qoder/prompts/_template-estandar.md`
3. **Revisar instrucciones**: Actualizar archivos en `.qoder/instructions/`

## 🎯 Próximos Pasos

1. Revisar y personalizar `llms.txt` para tus necesidades
2. Explorar prompts especializados en `.qoder/prompts/`
3. Configurar contexto inicial en `.qoder/context/`
4. Comenzar a usar el sistema con Qoder

---

**¿Necesitas ayuda?** Consulta `.qoder/docs/migration-guide.md` para una guía detallada de migración.