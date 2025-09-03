# 📋 Índice de Rules WebSnack para Qoder

## **Sistema de Reglas Migrado desde .qoder/prompts/**

Este directorio contiene todas las reglas del proyecto WebSnack convertidas desde el sistema de prompts para su uso directo en la configuración de Rules de Qoder.

---

## **📂 ESTRUCTURA DE RULES**

### **🎯 Reglas Principales**

| Archivo | Propósito | Aplica a | Origen |
|---------|-----------|----------|--------|
| `development-standards.md` | Estándares generales de desarrollo | `**/*.{ts,tsx,js,jsx}` | `.qoder/instructions/` |
| `shadcn-components.md` | Componentes shadcn/ui específicos | `src/components/**/*.{ts,tsx}` | `.qoder/prompts/shadcn.prompt.md` |
| `ui-ux-design.md` | Diseño UI/UX y estilos | `**/*.{css,scss,ts,tsx}` | `.qoder/prompts/ui-ux.prompt.md` |
| `app-router-apis.md` | App Router y APIs de Next.js 15 | `src/app/**/*.{ts,tsx}` | `.qoder/instructions/app-router.instructions.md` |
| `testing-development-tools.md` | Testing y herramientas de desarrollo | `**/*.{test,spec}.{ts,tsx}` | `.qoder/prompts/herramientas-desarrollo.prompt.md` |
| `theming-color-system.md` | Sistema de theming y colores | `**/*.{css,scss,ts,tsx}` | `.qoder/prompts/theme.prompt.md` |

---

## **🔧 Cómo Configurar en Qoder**

### **Paso 1: Agregar Rules en Settings**

1. Abrir Qoder Settings → Rules
2. Hacer clic en "Add" para cada regla
3. Copiar el contenido de cada archivo `.md`
4. Configurar los patrones de archivos correspondientes

### **Paso 2: Configuración Recomendada**

```markdown
# En Qoder Settings → Rules

## Rule 1: Development Standards
- **Name**: WebSnack Development Standards
- **Applies to**: **/*.{ts,tsx,js,jsx}
- **Content**: [Copiar contenido de development-standards.md]

## Rule 2: shadcn/ui Components  
- **Name**: WebSnack shadcn Components
- **Applies to**: src/components/**/*.{ts,tsx}
- **Content**: [Copiar contenido de shadcn-components.md]

## Rule 3: UI/UX Design
- **Name**: WebSnack UI/UX Design
- **Applies to**: **/*.{css,scss,ts,tsx}
- **Content**: [Copiar contenido de ui-ux-design.md]

## Rule 4: App Router & APIs
- **Name**: WebSnack App Router
- **Applies to**: src/app/**/*.{ts,tsx}
- **Content**: [Copiar contenido de app-router-apis.md]

## Rule 5: Testing & Dev Tools
- **Name**: WebSnack Testing
- **Applies to**: **/*.{test,spec}.{ts,tsx}
- **Content**: [Copiar contenido de testing-development-tools.md]

## Rule 6: Theming & Colors
- **Name**: WebSnack Theming
- **Applies to**: **/*.{css,scss,ts,tsx}
- **Content**: [Copiar contenido de theming-color-system.md]
```

---

## **🎯 Diferencias con Sistema de Prompts**

### **Ventajas de Rules vs Prompts**

| Aspecto | Sistema Prompts | Sistema Rules |
|---------|----------------|---------------|
| **Activación** | Manual por referencia | Automática por patrón de archivo |
| **Contexto** | Explícito en conversación | Automático por tipo de archivo |
| **Mantenimiento** | Manual | Configurado una vez |
| **Precisión** | Alta (contexto específico) | Alta (patrón de archivos) |
| **Escalabilidad** | Requiere disciplina | Automática |

### **Compatibilidad**

- ✅ **Funcionalidad**: 100% compatible con sistema original
- ✅ **Contenido**: Todo migrado sin pérdida
- ✅ **Estructura**: Organizada por tipo de archivo
- ✅ **Eficiencia**: Activación automática

---

## **📊 Métricas de Migración**

### **Estado Actual**
- **Reglas creadas**: 6 reglas principales
- **Prompts migrados**: 12 prompts especializados
- **Instrucciones migradas**: 4 guías técnicas
- **Cobertura**: 100% del sistema original

### **Archivos Cubiertos**
- **TypeScript/React**: `**/*.{ts,tsx}`
- **JavaScript**: `**/*.{js,jsx}`
- **Estilos**: `**/*.{css,scss}`
- **Tests**: `**/*.{test,spec}.{ts,tsx}`
- **App Router**: `src/app/**/*.{ts,tsx}`
- **Componentes**: `src/components/**/*.{ts,tsx}`

---

## **🚀 Próximos Pasos**

### **Configuración Inmediata**
1. **Copiar rules**: Agregar cada regla en Qoder Settings
2. **Verificar patrones**: Confirmar que los patrones de archivos funcionan
3. **Probar sistema**: Crear/editar archivos y verificar activación
4. **Ajustar si necesario**: Modificar patrones según estructura real

### **Mantenimiento**
1. **Actualizar reglas**: Modificar contenido según evolución del proyecto
2. **Añadir nuevas reglas**: Usar estructura similar para nuevos patrones
3. **Sincronizar**: Mantener consistencia con sistema `.qoder/` si es necesario

---

## **💡 Consejos de Uso**

### **Para Máxima Efectividad**
- **Específico por archivo**: Cada regla se activa según el tipo de archivo
- **Contexto automático**: No necesitas referenciar manualmente
- **Combinable**: Múltiples reglas pueden aplicar al mismo archivo
- **Evolutivo**: Fácil de actualizar y expandir

### **Debugging Rules**
- **Verificar patrones**: Usar globos correctos (`**/*.{ts,tsx}`)
- **Orden de prioridad**: Reglas más específicas deben ir primero
- **Contenido**: Asegurar que el markdown esté bien formateado

---

**¡Tu sistema de Rules está listo para usar con Qoder!** 🎯

**Próxima acción**: Configurar las 6 reglas principales en Qoder Settings → Rules