# 📋 WebSnack Rules for Qoder - Index

## ✅ Formato YAML Frontmatter Correcto

Todos los archivos de reglas ahora usan el formato oficial de Qoder con frontmatter YAML:

```yaml
---
name: "Nombre de la regla"
type: "Always Apply" | "Specific Files" | "Model Decision" | "Apply Manually"
description: "Descripción de la regla"
files: ["*.ts", "*.tsx"]  # Solo para Specific Files
scenario: "Descripción del escenario"  # Solo para Model Decision
---
```

## 📂 Estructura de Reglas

| Archivo | Tipo de Regla | Formato Correcto | Descripción |
|---------|---------------|------------------|-------------|
| `WebSnack-Development-Standards.md` | **Always Apply** | ✅ YAML Frontmatter | Estándares generales de desarrollo |
| `shadcn-Components.md` | **Specific Files** | ✅ YAML Frontmatter | Componentes shadcn/ui |
| `App-Router-APIs.md` | **Specific Files** | ✅ YAML Frontmatter | App Router y APIs |
| `UI-UX-Design.md` | **Specific Files** | ✅ YAML Frontmatter | Diseño UI/UX |
| `Testing-Development-Tools.md` | **Model Decision** | ✅ YAML Frontmatter | Testing y herramientas |
| `Theming-Color-System.md` | **Specific Files** | ✅ YAML Frontmatter | Sistema de theming |
| `Git-Squash-Tools.md` | **Apply Manually** | ✅ YAML Frontmatter | Herramientas Git Squash |
| `Form-Validation-Progressive.md` | **Specific Files** | ✅ YAML Frontmatter | Validación progresiva con Zod |

## 🎯 Tipos de Regla Explicados

### Always Apply
- **WebSnack-Development-Standards**: Se aplica automáticamente a todas las conversaciones de AI
- Contiene estándares fundamentales del proyecto

### Specific Files  
- **shadcn-Components**: Se activa al trabajar con archivos de componentes
- **App-Router-APIs**: Se activa al trabajar con archivos del App Router
- **UI-UX-Design**: Se activa al trabajar con archivos de estilos/UI
- **Theming-Color-System**: Se activa al trabajar con archivos de theming/CSS
- **Form-Validation-Progressive**: Se activa al trabajar con formularios y validación

### Model Decision
- **Testing-Development-Tools**: La AI decide cuándo aplicarla basándose en el contexto de testing

### Apply Manually
- **Git-Squash-Tools**: Se aplica manualmente usando `@rule Git-Squash-Tools` en el chat

## 🚀 Configuración en Qoder

### Paso 1: Acceder a Rules
1. Abrir Qoder Settings (⌘ ⇧ , en macOS o Ctrl+Shift+, en Windows)
2. Navegar a "Rules" en el panel izquierdo
3. Hacer clic en "Add" para cada regla

### Paso 2: Configurar cada regla

#### Regla 1: Development Standards
- **Name**: WebSnack Development Standards
- **Type**: Always Apply
- **Content**: [Copiar contenido de WebSnack-Development-Standards.md]

#### Regla 2: shadcn Components
- **Name**: shadcn Components
- **Type**: Specific Files
- **File Patterns**: `src/components/**/*.tsx, src/components/**/*.ts`
- **Content**: [Copiar contenido de shadcn-Components.md]

#### Regla 3: App Router APIs
- **Name**: App Router APIs
- **Type**: Specific Files
- **File Patterns**: `src/app/**/*.tsx, src/app/**/*.ts, src/app/**/route.ts`
- **Content**: [Copiar contenido de App-Router-APIs.md]

#### Regla 4: UI/UX Design
- **Name**: UI/UX Design
- **Type**: Specific Files
- **File Patterns**: `**/*.css, **/*.scss, src/**/*.tsx, src/**/*.ts`
- **Content**: [Copiar contenido de UI-UX-Design.md]

#### Regla 5: Testing Tools
- **Name**: Testing Development Tools
- **Type**: Model Decision
- **Scenario**: Generate unit tests, E2E tests, visual testing, or development tools
- **Content**: [Copiar contenido de Testing-Development-Tools.md]

#### Regla 6: Theming System
- **Name**: Theming Color System
- **Type**: Specific Files
- **File Patterns**: `**/*.css, **/*.scss, src/styles/**/*.css, tailwind.config.js`
- **Content**: [Copiar contenido de Theming-Color-System.md]

#### Regla 7: Git Squash Tools
- **Name**: Git Squash Tools
- **Type**: Apply Manually
- **Content**: [Copiar contenido de Git-Squash-Tools.md]

#### Regla 8: Form Validation Progressive
- **Name**: Form Validation Progressive
- **Type**: Specific Files
- **File Patterns**: `src/components/**/*.tsx, src/app/**/*.tsx, src/hooks/**/*.ts`
- **Content**: [Copiar contenido de Form-Validation-Progressive.md]

## 🔧 Uso de las Reglas

### Automáticas
- **Always Apply**: Se aplican automáticamente
- **Specific Files**: Se aplican cuando editas archivos que coinciden con los patrones
- **Model Decision**: La AI decide cuándo aplicarlas según el contexto

### Manuales
- **Apply Manually**: Usar `@rule Git-Squash-Tools` en el chat de AI

## 📊 Beneficios del Sistema

### Vs Sistema de Prompts Anterior
- ✅ **Activación automática** por tipo de archivo
- ✅ **Sin referencias manuales** necesarias
- ✅ **Contexto específico** según el archivo
- ✅ **Escalabilidad** automática

### Cobertura Completa
- **100% del contenido** migrado desde `.qoder/prompts/`
- **Optimizado** para el flujo de trabajo de Qoder
- **Organizado** por dominio técnico

## 🎯 Estado del Sistema

- ✅ **8 reglas** creadas en formato oficial Qoder
- ✅ **100% compatibilidad** con sistema anterior
- ✅ **Documentación completa** incluida
- ✅ **Listo para configurar** en Qoder Settings

---

**Próximo paso**: Configurar las 8 reglas en Qoder Settings → Rules siguiendo las instrucciones de este índice.