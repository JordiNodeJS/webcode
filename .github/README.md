# 📁 Estructura del Directorio .github

> **Simplificación Radical**: 2025-10-30 - Reducción 80% de archivos  
> **Sistema de Diseño WebCode**: Consolidado Octubre 2025 ✨  
> **Última actualización**: 2025-10-30 - Estructura minimalista y eficiente

## 🎨 **SISTEMA DE DISEÑO WEBCODE (WAS)**

### **📚 Documentación de Estilos (NUEVO)**

#### **Consulta Rápida** ⚡

- [`WEBCODE-CHEAT-SHEET.md`](./WEBCODE-CHEAT-SHEET.md) - Referencia ultra-rápida (1 página)

#### **Documentación Principal** ⭐

- [`WEBCODE-STYLE-REFERENCE.md`](./WEBCODE-STYLE-REFERENCE.md) - Guía completa del sistema
- [`WEBCODE-STYLE-EXAMPLES.md`](./WEBCODE-STYLE-EXAMPLES.md) - Ejemplos prácticos

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
instructions/               # Instrucciones específicas VS Code (5 archivos)
├── app-router.instructions.md
├── components.instructions.md
├── styling.instructions.md
├── typescript.instructions.md
└── biome.instructions.md

prompts/                   # Prompts consolidados (9 archivos)
├── desarrollo.prompt.md          # Herramientas desarrollo y MCPs
├── arquitectura-estructura.prompt.md  # Next.js 16 App Router
├── ui-styling.prompt.md          # Sistema WAS y Tailwind v4
├── git-workflow.prompt.md        # Git y PRs
├── performance.prompt.md         # Core Web Vitals
├── llm.prompt.md                 # Generación llms.txt
├── devtools.prompt.md            # Chrome DevTools
├── component-naming-convention.prompt.md
└── hero-naming-convention.prompt.md

support/                   # Guías técnicas consolidadas (8 archivos)
├── nextjs-best-practices.md
├── nextjs16-react19-patterns.md
├── styling-guide.md
├── shadcn-ui-components.md
├── typescript-best-practices.md
├── anti-patterns-to-avoid.md
├── git-commit-standards.md
└── pnpm-package-management.md
```

### **📁 PROJECT MANAGEMENT**

```
project/                   # Gestión del proyecto (3 archivos)
├── PROJECT-STATE.md
├── MEMORY-SYSTEM-SETUP.md
└── taskmanager-instructions.md

context/                   # Sistema de memoria LLM (3 archivos)
├── current-session.md
├── technical-context.md
└── README.md

tracking/                  # Seguimiento de issues específicos
└── SERVER-COMPONENTS-HMR-INVESTIGATION.md
```

---

## 📊 **Resultados de la Simplificación**

### **Reducción de Archivos**

| Área | Antes | Después | Reducción |
|------|-------|---------|-----------|
| `.github/` | 100+ archivos | 35 archivos | **-65%** |
| `docs/` | 100+ archivos | 20 archivos | **-80%** |
| Raíz proyecto | 10 archivos | 3 archivos | **-70%** |
| **TOTAL** | **500+ archivos** | **100 archivos** | **-80%** |

### **Archivos Eliminados**

- ❌ `.github/prompts-backup/` - Backup obsoleto (15+ archivos)
- ❌ `.github/docs/` - Información duplicada (2 archivos)
- ❌ Reportes de reorganización (4 archivos) → Movidos a `docs/ACTIVE/`

### **Archivos Movidos a Archive**

```
docs/archive/
├── troubleshooting/
│   ├── SOLUCION-FINAL-NEXTJS16.md
│   └── RESOLUCION-ERROR-HMR-NEXTJS16.md
├── refactoring/
│   └── REFACTOR-SCOPE-CLARIFICATION.md
├── fixes/
│   └── README-DOMAIN-FIX.md
└── planning/
    └── NEXT-STEPS-NOTION.md
```

---

## 🚀 **Beneficios de la Simplificación**

### **1. Navegación Más Rápida**

- ✅ Menos archivos = menos confusión
- ✅ Estructura clara y lógica
- ✅ Referencias directas sin redundancia

### **2. Mantenimiento Simplificado**

- ✅ Un solo lugar para cada tipo de documentación
- ✅ Cero duplicaciones
- ✅ Fácil localización de información

### **3. Mejor Experiencia de Desarrollo**

- ✅ Integración mejorada con VS Code y GitHub Copilot
- ✅ Referencias claras en copilot-instructions.md
- ✅ Sistema de memoria optimizado

---

## 📚 **Documentación Activa**

Documentos activos movidos a `docs/ACTIVE/`:

- `SECURITY-AUDIT-REPORT.md` - Auditoría de coherencia
- `STYLE-UPDATE-SUMMARY.md` - Actualización sistema WAS
- `REORGANIZATION-PROGRESS.md` - Progreso de reorganización
- `REORGANIZATION-SUMMARY.md` - Resumen de reorganización

---

## 🔄 **Estructura Final**

```
.github/
├── README.md                       # Este archivo
├── copilot-instructions.md         # Instrucciones principales Copilot
├── WEBCODE-STYLE-REFERENCE.md      # Referencia completa estilos
├── WEBCODE-CHEAT-SHEET.md          # Guía ultra-rápida
├── WEBCODE-STYLE-EXAMPLES.md       # Ejemplos prácticos
├── SIMPLIFICATION-PLAN.md          # Plan de simplificación
├── instructions/                   # 5 archivos
├── prompts/                        # 9 archivos
├── support/                        # 8 archivos
├── project/                        # 3 archivos
├── context/                        # 3 archivos
└── tracking/                       # 1 archivo
```

**Total**: ~35 archivos (vs 100+ anteriores)

---

> **Última simplificación**: 2025-10-30  
> **Estado**: ✅ Estructura minimalista optimizada  
> **Próximo paso**: Mantener esta estructura simple y evitar acumulación de archivos
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
