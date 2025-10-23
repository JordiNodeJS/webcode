# 📁 Estructura del Directorio .github

> **Reorganizado**: 2025-09-01 según mejores prácticas oficiales de GitHub y VS Code  
> **Sistema de Diseño WebCode**: Consolidado Octubre 2025 ✨  
> **Última actualización**: 2025-10-09 - Proyecto listo para producción

## 🎨 **SISTEMA DE DISEÑO WEBCODE (WAS)**

### **📚 Documentación de Estilos (NUEVO)**

#### **Consulta Rápida** ⚡
- [`WEBCODE-CHEAT-SHEET.md`](./WEBCODE-CHEAT-SHEET.md) - Referencia ultra-rápida (1 página)

#### **Documentación Principal** ⭐
- [`WEBCODE-STYLE-REFERENCE.md`](./WEBCODE-STYLE-REFERENCE.md) - Guía completa del sistema
- [`WEBCODE-STYLE-EXAMPLES.md`](./WEBCODE-STYLE-EXAMPLES.md) - Ejemplos prácticos
- [`STYLE-UPDATE-SUMMARY.md`](./STYLE-UPDATE-SUMMARY.md) - Resumen de actualización

### **🎯 Sistema en 30 Segundos**

**Colores**: Rosa (#dc7cb3) + Aguamarina (#bce3e5) con OKLCH  
**Sombras**: 3D offset con `var(--shadow-3d-md)` y colores del tema  
**Animaciones**: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` + 200-300ms  
**Tipografía**: Geist Sans (body) + Space Grotesk (titles) + Fira Code (mono)  
**Hover**: `opacity-80` + `translate-y-0.5` + `scale-102`  
**Espaciado**: 3, 6, 8, 16 (texto, elemento, componente, sección)  
**Stack**: Next.js 16.0.0 + React 19.2.0 + Tailwind v4 + TypeScript 5

### **✅ Checklist Express**

- [ ] ¿Usa colores del tema (primary/secondary)?
- [ ] ¿Tiene sombra 3D donde corresponde?
- [ ] ¿Usa tipografía correcta (font-display/font-sans)?
- [ ] ¿Tiene hover:opacity-80 en elementos interactivos?
- [ ] ¿Usa timing WAS (duration-200/300)?
- [ ] ¿Es responsive mobile-first?
- [ ] ¿Funciona en dark mode?
- [ ] ¿Espaciado semántico (3, 6, 8, 16)?

---

## 🎯 **Organización Mejorada**

Esta estructura sigue las convenciones oficiales de GitHub y optimiza la experiencia con herramientas modernas como VS Code y GitHub Copilot.

### **📁 Archivos Oficiales (Raíz)**

```
copilot-instructions.md     # Instrucciones principales de Copilot ✅
workflows/                  # GitHub Actions (nuevo) 🆕
```

### **📁 COPILOT SYSTEM**

```
instructions/               # 🆕 Instrucciones específicas VS Code
├── components.instructions.md
├── app-router.instructions.md
├── styling.instructions.md
├── typescript.instructions.md
├── biome.instructions.md          # 🆕 Linter/Formatter
└── BIOME-IMPLEMENTATION-SUMMARY.md # 🆕 Migración ESLint→Biome

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
