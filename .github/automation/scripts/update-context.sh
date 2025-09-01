#!/bin/bash

# 🔄 Update Project Context
# Script para actualizar automáticamente los archivos de contexto del proyecto

set -e

echo "🔄 Actualizando contexto del proyecto WebSnack..."

# Obtener información del repositorio
LAST_COMMIT=$(git log -1 --format="%h - %s (%an, %ar)")
CURRENT_BRANCH=$(git branch --show-current)
CURRENT_DATE=$(date -Iseconds)
FILES_CHANGED=$(git diff --name-only HEAD~1 HEAD | wc -l)

# Crear timestamp
TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")

echo "📊 Información del repositorio:"
echo "  - Rama actual: $CURRENT_BRANCH"
echo "  - Último commit: $LAST_COMMIT"
echo "  - Archivos cambiados: $FILES_CHANGED"

# Actualizar current-session.md
cat > .github/context/current-session.md << EOF
# 🔄 Sesión Actual - WebSnack

> **Actualizado**: $TIMESTAMP
> **LLM**: Claude 4 Sonnet  
> **Contexto**: Auto-actualizado por script

## **Estado de la Sesión Actual**

### **Git Status**
- **Rama activa**: $CURRENT_BRANCH
- **Último commit**: $LAST_COMMIT
- **Archivos modificados recientes**: $FILES_CHANGED archivos

### **Archivos Modificados Recientemente**
$(git diff --name-only HEAD~3 HEAD | head -10 | sed 's/^/- /' | sed 's|\.github/MEMORY-SYSTEM-SETUP\.md|.github/project/MEMORY-SYSTEM-SETUP.md|g' | sed 's|\.github/PROJECT-STATE\.md|.github/project/PROJECT-STATE.md|g' | sed 's|\.github/TUTORIAL-SISTEMA-MEMORIA\.md|.github/project/TUTORIAL-SISTEMA-MEMORIA.md|g' | sed 's|\.github/taskmanager-instructions\.md|.github/project/taskmanager-instructions.md|g' | sed 's|\.github/copilot/|.github/support/|g' | sed 's|\.github/scripts/|.github/automation/scripts/|g' | sed 's|\.github/hooks/|.github/automation/hooks/|g')

### **Estado del Workspace**
- **Directorio de trabajo**: $(pwd)
- **Node version**: $(node --version 2>/dev/null || echo "No instalado")
- **pnpm version**: $(pnpm --version 2>/dev/null || echo "No instalado")

### **Contexto para Próxima Sesión**
\`\`\`
Última actividad: $TIMESTAMP
Estado del proyecto: $(cat .github/project/PROJECT-STATE.md | grep "Fase actual" | cut -d':' -f2 2>/dev/null || echo " SETUP INICIAL")
Archivos recientes: $FILES_CHANGED cambios detectados
Rama activa: $CURRENT_BRANCH

El proyecto WebSnack mantiene memoria automática a través de archivos de contexto que se actualizan automáticamente. Consultar .github/project/PROJECT-STATE.md para el estado más reciente del proyecto.
\`\`\`

---

## **Variables de Sesión**

### **Environment**
- **OS**: $(uname -s 2>/dev/null || echo "Windows")
- **Shell**: $SHELL
- **PWD**: $(pwd)
- **User**: $(whoami)

### **Git Activity**
\`\`\`bash
$(git log --oneline -5)
\`\`\`

### **Project Status**
- **Package.json exists**: $([ -f package.json ] && echo "✅ Sí" || echo "❌ No")
- **Next.js installed**: $([ -d node_modules/next ] && echo "✅ Sí" || echo "❌ No")
- **TypeScript config**: $([ -f tsconfig.json ] && echo "✅ Sí" || echo "❌ No")

**Actualización automática**: $TIMESTAMP
EOF

# Actualizar PROJECT-STATE.md con información dinámica
sed -i "s/> \*\*Última actualización\*\*:.*/> **Última actualización**: $(date +%Y-%m-%d)/" .github/project/PROJECT-STATE.md

# Actualizar llms.txt
sed -i "s/> \*\*Generado automáticamente\*\*:.*/> **Generado automáticamente**: $CURRENT_DATE/" llms.txt
sed -i "s/\*\*Última actualización\*\*:.*/> **Última actualización**: $TIMESTAMP/" llms.txt

# Actualizar technical-context.md
sed -i "s/> \*\*Auto-generado\*\*:.*/> **Auto-generado**: $CURRENT_DATE/" .github/context/technical-context.md
sed -i "s/\*\*Última sincronización\*\*:.*/> **Última sincronización**: $TIMESTAMP/" .github/context/technical-context.md

echo "✅ Contexto del proyecto actualizado exitosamente"
echo "📁 Archivos actualizados:"
echo "  - .github/context/current-session.md"
echo "  - .github/project/PROJECT-STATE.md" 
echo "  - llms.txt"
echo "  - .github/context/technical-context.md"

# Mostrar resumen del estado
echo ""
echo "📊 Resumen del estado actual:"
echo "  - Fecha: $TIMESTAMP"
echo "  - Rama: $CURRENT_BRANCH"
echo "  - Cambios recientes: $FILES_CHANGED archivos"
echo ""
