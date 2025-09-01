# 🧠 Tutorial: Sistema de Memoria WebSnack

> **¡Nunca más expliques desde cero el estado de tu proyecto a un LLM!**

## 🎯 **¿Qué es el Sistema de Memoria WebSnack?**

Un sistema automático que mantiene **contexto actualizado** de tu proyecto para que Claude, GPT y otros LLMs siempre sepan:

- ✅ En qué fase está tu proyecto
- ✅ Qué tareas tienes en progreso
- ✅ Qué cambios has hecho recientemente
- ✅ Cuál es tu stack técnico actual
- ✅ Qué problemas has identificado

**Resultado**: Cada nueva sesión de chat comienza con el LLM ya informado del contexto completo.

---

## 🚀 **Setup Inicial (Solo una vez)**

### **Paso 1: Hacer Ejecutable el Script**

Abre terminal en tu proyecto y ejecuta:

```bash
chmod +x .github/automation/scripts/update-context.sh
```

### **Paso 2: Primera Ejecución**

```bash
bash .github/automation/scripts/update-context.sh
```

**Salida esperada:**

```
🔄 Actualizando contexto del proyecto WebSnack...
📊 Información del repositorio:
  - Rama actual: main
  - Último commit: abc1234 - feat: add new feature
  - Archivos cambiados: 5

✅ Contexto del proyecto actualizado exitosamente
📁 Archivos actualizados:
  - .github/context/current-session.md
  - .github/project/PROJECT-STATE.md
  - llms.txt
  - .github/context/technical-context.md
```

### **Paso 3: Configurar Git Hook (Opcional)**

Para **actualización automática** en cada commit:

```bash
cp .github/automation/hooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

¡Listo! Ya tienes el sistema funcionando.

---

## 📋 **Uso Diario**

### **🔄 Método 1: Desde VSCode (Recomendado)**

1. **Ctrl+Shift+P** en VSCode
2. Escribir: `Tasks: Run Task`
3. Seleccionar: `🔄 Update Project Context`

**¿Cuándo usarlo?**

- ⏰ Antes de sesiones importantes con LLMs
- 🔧 Después de cambios significativos en el código
- 📝 Al cambiar de rama o hacer commits importantes
- 🎯 Antes de demos o reviews

### **🔄 Método 2: Desde Terminal**

```bash
bash .github/automation/scripts/update-context.sh
```

### **🔄 Método 3: Automático con Git**

Si configuraste el git hook, se ejecuta automáticamente:

```bash
git commit -m "feat: nueva funcionalidad"
# ↑ El contexto se actualiza automáticamente
```

---

## 🎮 **Comandos y Tasks Disponibles**

### **En VSCode (Ctrl+Shift+P → "Tasks: Run Task")**

| Task                        | Qué hace                   | Cuándo usar                       |
| --------------------------- | -------------------------- | --------------------------------- |
| `🔄 Update Project Context` | Actualiza todo el contexto | Antes de sesiones LLM importantes |
| `🧠 Generate LLM Context`   | Genera contexto optimizado | Para preparar contexto específico |
| `📊 Project Status Report`  | Muestra resumen del estado | Para revisar estado general       |
| `🚀 Setup WebSnack Project` | Inicializa Next.js 15      | Solo al inicio del proyecto       |

### **En Terminal**

```bash
# Actualizar contexto
bash .github/automation/scripts/update-context.sh

# Ver estado del git hook
ls -la .git/hooks/pre-commit

# Ver archivos de contexto
ls -la .github/context/
```

---

## 🎯 **Casos de Uso Prácticos**

### **📝 Caso 1: Nueva Sesión con Claude**

**Problema**: Abres un nuevo chat y Claude no sabe nada del proyecto.

**Solución**:

1. Ejecutar: `🔄 Update Project Context` en VSCode
2. Iniciar chat normalmente
3. VS Code automáticamente adjunta `copilot-instructions.md`
4. Claude tiene contexto completo desde el primer mensaje

**Antes:**

```
Tú: "Ayúdame con el componente ContactForm"
Claude: "¿Puedes contarme más sobre tu proyecto?"
```

**Después:**

```
Tú: "Ayúdame con el componente ContactForm"
Claude: "Veo que estás en WebSnack usando Next.js 15 con React 19.
Para el ContactForm, basándome en tu stack con React Hook Form + Zod..."
```

### **📝 Caso 2: Después de una Sesión de Trabajo Intensa**

**Escenario**: Has trabajado 3 horas, hecho 8 commits, cambiado 15 archivos.

**Workflow**:

1. Antes de cerrar: `🔄 Update Project Context`
2. Mañana siguiente: Nuevo chat con contexto actualizado
3. El LLM sabe exactamente qué trabajaste ayer

### **📝 Caso 3: Cambio de Rama o Feature**

**Escenario**: Cambias de `main` a `feature/payment-system`

```bash
git checkout feature/payment-system
bash .github/automation/scripts/update-context.sh  # Actualiza contexto
```

Ahora cualquier LLM sabrá que estás trabajando en la rama de pagos.

### **📝 Caso 4: Antes de un Demo**

```bash
# Actualizar todo el contexto
🔄 Update Project Context

# Ver resumen del estado
📊 Project Status Report
```

Tienes documentación actualizada para presentar el estado real del proyecto.

---

## 📁 **¿Qué Archivos se Actualizan?**

### **`.github/context/current-session.md`**

```markdown
# 🔄 Sesión Actual - WebSnack

> **Actualizado**: 2025-09-01 15:30:00

## **Estado de la Sesión Actual**

### **Git Status**

- **Rama activa**: feature/contact-form
- **Último commit**: abc1234 - feat: add contact form validation
- **Archivos modificados recientes**: 8 archivos

### **Archivos Modificados Recientemente**

- src/components/custom/ContactForm.tsx
- src/lib/validations.ts
- src/app/contact/page.tsx
```

### **`.github/project/PROJECT-STATE.md`**

```markdown
# 🎯 Estado Actual del Proyecto WebSnack

> **Última actualización**: 2025-09-01
> **Fase actual**: DESARROLLO → COMPONENTES UI
> **Progreso general**: 45% completado

## 🚧 **TAREAS EN PROGRESO**

### **Prioridad Alta (Esta semana)**

1. **ContactForm con validación** - Status: ✅ Completado
2. **Landing page responsive** - Status: ⏳ En progreso
```

### **`llms.txt`**

```markdown
# WebSnack - Contexto Actualizado para LLMs

## Estado Actual del Desarrollo

- **Fase**: Desarrollo → Componentes UI (45% progreso)
- **Última actividad**: ContactForm completado con validación
- **Stack**: Next.js 15 + React 19 + TypeScript + Tailwind v4

## Últimos Commits

- abc1234 - feat: add contact form validation (2 min ago)
- def5678 - style: improve responsive design (1 hour ago)
```

---

## 🔍 **Verificar que Funciona**

### **Test Rápido**

1. Ejecutar el script:

```bash
bash .github/automation/scripts/update-context.sh
```

2. Verificar que se actualizó:

```bash
head -10 .github/context/current-session.md
```

3. Deberías ver timestamp actual y tu información de Git.

### **Test con Cambios**

1. Hacer un cambio y commit:

```bash
echo "# Test" >> test.md
git add test.md
git commit -m "test: verify context updates"
```

2. Ejecutar script:

```bash
bash .github/automation/scripts/update-context.sh
```

3. Verificar que detectó el nuevo commit:

```bash
grep "test: verify context updates" .github/context/current-session.md
```

---

## 🚨 **Troubleshooting**

### **❌ "Permission denied"**

```bash
chmod +x .github/automation/scripts/update-context.sh
```

### **❌ "Command not found: git"**

Necesitas tener Git instalado y configurado.

### **❌ "Tasks no aparecen en VSCode"**

1. Verificar que existe `.vscode/tasks.json`
2. Recargar VSCode: `Ctrl+Shift+P` → "Reload Window"

### **❌ "Script ejecuta pero no actualiza archivos"**

Verificar permisos de escritura en los archivos:

```bash
ls -la .github/context/
ls -la .github/project/PROJECT-STATE.md
```

### **❌ "Git hook no funciona"**

```bash
# Verificar que existe y es ejecutable
ls -la .git/hooks/pre-commit

# Si no existe, copiarlo:
cp .github/hooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

---

## 🎯 **Beneficios del Sistema**

### **👨‍💻 Para Ti como Desarrollador**

| Antes                                    | Después                                     |
| ---------------------------------------- | ------------------------------------------- |
| ❌ Explicar proyecto desde cero cada vez | ✅ Contexto automático siempre actualizado  |
| ❌ "¿En qué estaba trabajando ayer?"     | ✅ Historial claro de actividad reciente    |
| ❌ LLM no sabe el stack técnico          | ✅ Stack y decisiones técnicas documentadas |
| ❌ Repetir estado del proyecto           | ✅ Estado del proyecto siempre al día       |

### **🤖 Para los LLMs (Claude, GPT)**

- ✅ **Contexto inmediato**: Saben el estado actual desde el primer mensaje
- ✅ **Decisiones técnicas**: Conocen el stack y arquitectura elegida
- ✅ **Progreso actual**: Entienden en qué fase está el proyecto
- ✅ **Problemas identificados**: Pueden ayudar con issues conocidos

### **📊 Para el Proyecto**

- ✅ **Documentación automática**: Se mantiene al día sin esfuerzo manual
- ✅ **Onboarding rápido**: Nuevos colaboradores tienen contexto inmediato
- ✅ **Historial de decisiones**: Tracking automático de progreso
- ✅ **Consistency**: Todos los LLMs trabajan con la misma información

---

## 🔄 **Flujo de Trabajo Recomendado**

### **🌅 Al Empezar el Día**

1. `🔄 Update Project Context` en VSCode
2. Revisar `📊 Project Status Report`
3. Iniciar sesión con LLM con contexto fresco

### **🔧 Durante el Desarrollo**

- Commits automáticamente actualizan contexto (si configuraste git hook)
- Ejecutar manualmente después de cambios importantes
- No más de 2-3 veces por día en desarrollo normal

### **🌙 Al Terminar el Día**

1. `🔄 Update Project Context`
2. Commit final del día
3. Mañana siguiente = contexto perfecto

### **🎯 Antes de Sesiones Importantes**

- Reuniones con el equipo
- Demos a clientes
- Sesiones de debugging complejas
- Planning de nuevas features

---

## 📈 **Consejos Pro**

### **🔥 Optimiza tu Workflow**

1. **Usa keyboard shortcuts**: Configura shortcut para la task en VSCode
2. **Combina con aliases**:
   ```bash
   alias update-ctx="bash .github/automation/scripts/update-context.sh"
   ```
3. **Automatiza con git hook**: Una vez configurado, olvídate del tema

### **🎯 Maximiza el Valor**

- Actualiza contexto antes de sesiones **complejas** con LLMs
- Úsalo cuando cambies de **contexto** (diferentes features)
- Perfecto para **handoffs** entre desarrolladores
- Esencial antes de **code reviews** importantes

### **⚡ Integración con Otras Herramientas**

```bash
# En tu package.json (cuando tengas uno)
"scripts": {
  "update-context": "bash .github/automation/scripts/update-context.sh",
  "dev": "npm run update-context && next dev"
}
```

---

## 🎉 **¡Ya Estás Listo!**

Ahora tienes un **sistema de memoria persistente** para tu proyecto WebSnack. Cada nueva sesión con Claude será como continuar una conversación, no empezar desde cero.

### **🎯 Próximos Pasos**

1. ✅ Sistema configurado y funcionando
2. 🔄 Usar regularmente en tu workflow diario
3. 🚀 Inicializar proyecto Next.js 15 con contexto automático
4. 🎯 Desarrollar WebSnack con LLMs super-informados

---

**💡 Tip Final**: Este sistema se vuelve más valioso cuanto más lo uses. En 2-3 semanas será indispensable en tu workflow de desarrollo.

¿Preguntas? El sistema está documentado y los archivos de contexto te guiarán! 🚀
