# 📖 Guía de Migración - GitHub Copilot a Qoder

## **🎯 Resumen de Migración**

Tu sistema de prompts de GitHub Copilot ha sido completamente migrado al editor Qoder, manteniendo toda la funcionalidad y organización original, pero optimizado para las capacidades específicas de Qoder.

---

## **📋 Qué Se Ha Migrado**

### **✅ Estructura Completa**

| Elemento Original | Ubicación GitHub | Ubicación Qoder | Estado |
|-------------------|------------------|-----------------|--------|
| **Archivo principal** | `copilot-instructions.md` | `llms.txt` | ✅ Adaptado |
| **Prompts especializados** | `.github/prompts/` | `.qoder/prompts/` | ✅ Migrados |
| **Instrucciones técnicas** | `.github/instructions/` | `.qoder/instructions/` | ✅ Migrados |
| **Contexto dinámico** | `.github/context/` | `.qoder/context/` | ✅ Migrados |
| **Gestión de proyecto** | `.github/project/` | `.qoder/project/` | ✅ Migrados |

### **📁 Nueva Estructura**

```
.qoder/                           # Directorio principal (equivale a .github/)
├── README.md                     # Guía del sistema completo
├── prompts/                      # 11 prompts especializados migrados
│   ├── README.md                # Índice y navegación
│   ├── _template-estandar.md    # Template para nuevos prompts
│   ├── shadcn.prompt.md         # Componentes shadcn/ui
│   ├── ui-ux.prompt.md          # Diseño UI/UX
│   └── [otros 7 prompts...]     # Todos los prompts originales
├── instructions/                 # Guías técnicas detalladas
├── context/                      # Contexto dinámico del proyecto
├── project/                      # Gestión y configuración
└── docs/                        # Documentación del sistema
    └── migration-guide.md       # Esta guía
```

---

## **🚀 Cómo Usar el Sistema con Qoder**

### **1. Archivo Principal: llms.txt**

Tu archivo `llms.txt` actualizado es el punto de entrada que lee Qoder:

```markdown
# Instrucciones Qoder - Proyecto WebSnack

## Sistema de Prompts Especializado
Para tareas específicas, consulta estos prompts en .qoder/prompts/:
- Componentes shadcn/ui: .qoder/prompts/shadcn.prompt.md
- Diseño UI/UX: .qoder/prompts/ui-ux.prompt.md
- Arquitectura: .qoder/prompts/arquitectura.prompt.md

## Contexto Actualizado
- Estado del proyecto: .qoder/context/project-state.md
- Contexto técnico: .qoder/context/technical-context.md
```

### **2. Referenciar Prompts Especializados**

En tus conversaciones con Qoder, puedes referenciar directamente:

```markdown
"Necesito crear un componente shadcn/ui, consulta: .qoder/prompts/shadcn.prompt.md"
"Para el diseño UI/UX, revisa: .qoder/prompts/ui-ux.prompt.md"
"Estado actual del proyecto: .qoder/context/project-state.md"
```

### **3. Navegación Rápida**

- **Índice completo**: `.qoder/prompts/README.md`
- **Guía del sistema**: `.qoder/README.md`
- **Template para nuevos prompts**: `.qoder/prompts/_template-estandar.md`

---

## **🔄 Diferencias Clave con GitHub Copilot**

### **Funcionalidad**

| Aspecto | GitHub Copilot | Qoder |
|---------|---------------|-------|
| **Activación** | Automática en contexto | Manual por referencia explícita |
| **Archivo principal** | `copilot-instructions.md` | `llms.txt` |
| **Referencias** | Automáticas | Explícitas en conversación |
| **Personalización** | Limitada | Completa |
| **Mantenimiento** | Automático parcial | Manual completo |

### **Ventajas del Sistema Qoder**

- ✅ **Control completo**: Tú decides cuándo y cómo usar cada prompt
- ✅ **Flexibilidad**: Puedes combinar múltiples prompts según necesidades
- ✅ **Transparencia**: Referencias explícitas, no "magia negra"
- ✅ **Personalizable**: Fácil de modificar y extender

---

## **📝 Ejemplos de Uso Práctico**

### **Ejemplo 1: Desarrollo de Componente**

```markdown
Conversación con Qoder:
"Necesito crear un botón personalizado para WebSnack. 
Consulta: .qoder/prompts/shadcn.prompt.md para las guías de componentes."
```

### **Ejemplo 2: Diseño UI/UX**

```markdown
Conversación con Qoder:
"Voy a diseñar la página de servicios. 
Revisa: .qoder/prompts/ui-ux.prompt.md para los patrones de diseño
Estado actual: .qoder/context/project-state.md"
```

### **Ejemplo 3: Arquitectura**

```markdown
Conversación con Qoder:
"Necesito estructurar la aplicación Next.js.
Consulta: .qoder/prompts/arquitectura.prompt.md
Contexto técnico: .qoder/context/technical-context.md"
```

---

## **🛠️ Mantenimiento del Sistema**

### **Actualizar Contexto**

Los archivos en `.qoder/context/` deben actualizarse manualmente:

```bash
# Editar estado del proyecto
nano .qoder/context/project-state.md

# Actualizar contexto técnico
nano .qoder/context/technical-context.md

# Modificar sesión actual
nano .qoder/context/current-session.md
```

### **Añadir Nuevos Prompts**

1. **Usar template**: Copia `.qoder/prompts/_template-estandar.md`
2. **Adaptar contenido**: Sigue la estructura estándar
3. **Actualizar índice**: Añadir entrada en `.qoder/prompts/README.md`
4. **Referenciar en llms.txt**: Incluir referencia si es prompt principal

### **Sincronización con GitHub (Opcional)**

Si quieres mantener ambos sistemas:

```bash
# Sincronizar cambios de GitHub a Qoder
cp .github/prompts/nuevo-prompt.md .qoder/prompts/
# Adaptar referencias .github/ → .qoder/

# Sincronizar cambios de Qoder a GitHub  
cp .qoder/prompts/nuevo-prompt.md .github/prompts/
# Adaptar referencias .qoder/ → .github/
```

---

## **🎯 Mejores Prácticas**

### **Para Desarrolladores**

1. **Referencias explícitas**: Siempre menciona archivos `.qoder/` específicos
2. **Contexto actualizado**: Mantén archivos en `.qoder/context/` al día
3. **Usa índices**: Consulta `.qoder/prompts/README.md` para navegación
4. **Combina prompts**: Puedes referenciar múltiples prompts en una conversación

### **Para Equipos**

1. **Documentar cambios**: Actualizar archivos de contexto con decisiones
2. **Estandardizar**: Usar template para nuevos prompts
3. **Revisar regularmente**: Mantener relevancia del contenido
4. **Compartir conocimiento**: Todos deben conocer la estructura

---

## **❓ Solución de Problemas**

### **Problema: Qoder no encuentra archivos**

**Solución**: Verificar rutas relativas
```bash
# Verificar que existe
ls -la .qoder/prompts/shadcn.prompt.md

# Usar ruta completa si es necesario
/path/to/project/.qoder/prompts/shadcn.prompt.md
```

### **Problema: Referencias no funcionan**

**Solución**: Usar referencias explícitas en conversaciones
```markdown
# En lugar de: "usa el prompt de shadcn"
# Usar: "consulta: .qoder/prompts/shadcn.prompt.md"
```

### **Problema: Información desactualizada**

**Solución**: Actualizar archivos de contexto
```bash
# Editar archivos relevantes
nano .qoder/context/project-state.md
nano .qoder/context/technical-context.md
```

---

## **🎉 Sistema Listo para Usar**

### **Checklist Final**

- ✅ Sistema migrado completamente
- ✅ Estructura `.qoder/` creada
- ✅ `llms.txt` actualizado con referencias
- ✅ Todos los prompts adaptados
- ✅ Contexto dinámico migrado
- ✅ Documentación creada

### **Próximos Pasos**

1. **Probar el sistema**: Usar algunos prompts con Qoder
2. **Validar funcionamiento**: Confirmar que las referencias funcionan
3. **Personalizar**: Adaptar contextos a tus necesidades específicas
4. **Experimentar**: Combinar diferentes prompts según proyectos

---

**¡Tu sistema de prompts está completamente migrado y listo para usar con Qoder!** 🎯

Para cualquier duda, consulta `.qoder/README.md` o esta guía.