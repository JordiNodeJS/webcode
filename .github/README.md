# 📁 Estructura del Directorio .github

> **Reorganizado**: 2025-09-01 según mejores prácticas oficiales de GitHub y VS Code

## 🎯 **Organización Mejorada**

Esta estructura sigue las convenciones oficiales de GitHub y optimiza la experiencia con herramientas modernas como VS Code y GitHub Copilot.

### **📁 Archivos Oficiales (Raíz)**

```
copilot-instructions.md     # Instrucciones principales de Copilot ✅
```

### **📁 COPILOT SYSTEM**

```
instructions/               # 🆕 Instrucciones específicas VS Code
├── components.instructions.md
├── app-router.instructions.md
├── styling.instructions.md
└── typescript.instructions.md

prompts/                   # Sistema de prompts reutilizables
└── ...

support/                   # 🔄 Anteriormente 'copilot/'
└── ...                    # Archivos de soporte y patrones
```

### **📁 PROJECT MANAGEMENT**

```
project/                   # 🔄 Gestión del proyecto
├── PROJECT-STATE.md      # 🔄 Movido desde raíz
├── MEMORY-SYSTEM-SETUP.md
├── TUTORIAL-SISTEMA-MEMORIA.md
└── taskmanager-instructions.md

context/                   # ✅ Sistema de memoria LLM
├── current-session.md
├── technical-context.md
└── README.md
```

### **📁 AUTOMATION**

```
automation/                # 🔄 Scripts y automatización
├── scripts/              # 🔄 Movido desde raíz
│   └── update-context.sh
└── hooks/                # 🔄 Git hooks
    └── pre-commit
```

## 🚀 **Beneficios de la Reorganización**

### **1. Compatibilidad VS Code Mejorada**

- **`.github/instructions/`**: Soporte nativo para instrucciones específicas por tipo de archivo
- **Frontmatter `applyTo`**: Control granular sobre qué archivos aplican las instrucciones
- **Mejor integración**: Con GitHub Copilot y herramientas de desarrollo

### **2. Organización Lógica**

- **Separación clara**: Entre archivos oficiales y personalizados
- **Agrupación temática**: Por función y propósito
- **Escalabilidad**: Estructura preparada para crecimiento del proyecto

### **3. Mantenimiento Simplificado**

- **Referencias actualizadas**: Scripts y configuraciones ajustadas
- **Rutas consistentes**: Nomenclatura estándar seguida
- **Documentación clara**: Cada directorio con propósito específico

## 📋 **Migración Completada**

### **Archivos Movidos:**

- `PROJECT-STATE.md` → `project/PROJECT-STATE.md`
- `MEMORY-SYSTEM-SETUP.md` → `project/MEMORY-SYSTEM-SETUP.md`
- `TUTORIAL-SISTEMA-MEMORIA.md` → `project/TUTORIAL-SISTEMA-MEMORIA.md`
- `taskmanager-instructions.md` → `project/taskmanager-instructions.md`
- `scripts/` → `automation/scripts/`
- `hooks/` → `automation/hooks/`
- `copilot/` → `support/`

### **Archivos Creados:**

- `instructions/components.instructions.md`
- `instructions/app-router.instructions.md`
- `instructions/styling.instructions.md`
- `instructions/typescript.instructions.md`

### **Referencias Actualizadas:**

- `copilot-instructions.md` - rutas corregidas
- `automation/scripts/update-context.sh` - paths ajustados

## 🔄 **Próximos Pasos**

La estructura está lista para:

1. **Fase 3**: Integración con GitHub Actions
2. **Templates**: Issues y Pull Requests
3. **Archivos oficiales**: CONTRIBUTING.md, SECURITY.md, etc.

---

> **Nota**: Todos los sistemas existentes mantienen su funcionalidad. Los scripts de automatización y el sistema de memoria LLM han sido actualizados para trabajar con la nueva estructura.
