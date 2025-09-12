# Scripts de Git Squash

Este directorio contiene **dos scripts** para aplanar ramas de Git, cada uno con diferentes enfoques y casos de uso.

## 📚 **Documentación Completa**

- **[README.md](README.md)** - Guía de uso y comparación de scripts
- **[TECHNICAL-DOCUMENTATION.md](TECHNICAL-DOCUMENTATION.md)** - Documentación técnica detallada y método manual paso a paso

## 🎯 git-rebase-squash.sh

**Script automático usando git rebase (método estándar)**

### Uso

```bash
./scripts/git-rebase-squash.sh <nombre-de-rama> [commits_desde_base] [mensaje-commit]
```

### Ejemplos

```bash
# Auto-detecta commits desde main/master
./scripts/git-rebase-squash.sh feature/nueva-funcionalidad

# Especifica número de commits manualmente
./scripts/git-rebase-squash.sh feature/nueva-funcionalidad 5

# Con mensaje personalizado
./scripts/git-rebase-squash.sh feature/nueva-funcionalidad 3 "feat: Nueva funcionalidad completa"
```

### Cómo funciona

1. Detecta automáticamente commits únicos desde main/master
2. Usa `git rebase -i` con script automático (sin intervención manual)
3. Hace squash de todos los commits automáticamente
4. Crea backup automático antes del proceso
5. Usa método estándar de Git internamente

### Ventajas

- **Método estándar** - Usa herramientas nativas de Git
- **Automático** - Sin intervención manual
- **Desde la misma rama** - Workflow natural
- **Backup automático** - Seguridad integrada
- **Preserva estructura** - Mantiene historial de merge natural

### Desventajas

- **Solo squash completo** - No permite squash selectivo
- **Más lento** que el método orphan branch
- **Más complejo** internamente que los otros métodos

---

## 🛡️ git-squash-branch.sh

**Script robusto y seguro con múltiples protecciones**

### Uso

```bash
./scripts/git-squash-branch.sh <nombre-de-rama> [mensaje-commit]
```

### Ejemplo

```bash
./scripts/git-squash-branch.sh feature/nueva-funcionalidad "feat: Nueva funcionalidad completa"
```

### Cómo funciona

1. **Verificaciones de seguridad** - rama existe, no estás en ella, etc.
2. **Crea backup automático** de la rama original
3. **Soft reset** al punto de divergencia con la rama base
4. **Commit único** con toda la diferencia
5. **Opción de rollback** si algo sale mal
6. **Resumen detallado** del proceso

### Ventajas

- **Máxima seguridad** con backups y rollback
- **Conserva la estructura** del repositorio
- **Mensajes informativos** del proceso
- **Manejo de errores** robusto
- **Confirmación requerida** antes de proceder

### Desventajas

- **Más complejo** de usar
- **Más lento** debido a las verificaciones

---

## 🔀 **Filosofía de Diversidad: Dos Enfoques, Mismo Objetivo**

### **🎯 Diseño Intencional**

Mantenemos **dos métodos diferentes** intencionalmente porque diferentes situaciones requieren diferentes herramientas:

**🎯 Script Rebase:** Método `git rebase -i` automático

- **Filosofía:** "Estándar Git con workflow natural"
- **Casos:** Desarrollo normal, workflow desde la misma rama

**🛡️ Script Robusto:** Método `soft reset` + backups automáticos

- **Filosofía:** "Seguridad y control máximo"
- **Casos:** Features críticos, debugging, auditorías

### **🎓 Valor Educacional**

- **Aprender Git:** Dos enfoques técnicos diferentes para el mismo problema
- **Flexibilidad:** Herramienta correcta para cada situación
- **Mejores prácticas:** Cuándo priorizar estándares vs seguridad

---

## 🎯 ¿Cuál usar?

### Usa `git-rebase-squash.sh` cuando:

- ✅ Quieres usar **método estándar de Git**
- ✅ Prefieres **herramientas nativas** de Git
- ✅ Necesitas **workflow desde la misma rama**
- ✅ Quieres **squash automático** con rebase

### Usa `git-squash-branch.sh` cuando:

- ✅ Trabajas en una rama **importante**
- ✅ Quieres **máxima seguridad**
- ✅ Necesitas **mantener alguna referencia** al historial
- ✅ Prefieres un proceso **automático pero seguro**

## � Comparación de Scripts

| Característica   | Rebase         | Robusto          |
| ---------------- | -------------- | ---------------- |
| **Velocidad**    | 🔄 Medio       | 🔄 Rápido        |
| **Control**      | ❌ Todo o nada | ❌ Todo o nada   |
| **Seguridad**    | ✅ Backup auto | ✅ Máxima        |
| **Complejidad**  | 🟡 Medio       | 🟠 Avanzado      |
| **Método**       | Git rebase     | Soft reset       |
| **Backup**       | ✅ Automático  | ✅ Automático    |
| **Estándar Git** | ✅ Nativo      | ❌ Método custom |

## �📝 Ejemplos de uso común

### Para desarrollo normal

```bash
# Método estándar desde la misma rama
git checkout feature/nueva-funcionalidad
./scripts/git-rebase-squash.sh feature/nueva-funcionalidad "feat: Nueva funcionalidad completa"
```

### Para feature branches importantes

```bash
# Con backup y seguridad total
./scripts/git-squash-branch.sh feature/nueva-funcionalidad "feat: Sistema de autenticación completo"
```

### Para workflow estándar

```bash
# Usando herramientas nativas de Git
git checkout feature/mi-trabajo
./scripts/git-rebase-squash.sh feature/mi-trabajo 5 "feat: Implementación completa"
```

## 🔧 Instalación y configuración

### Hacer scripts globalmente accesibles

```bash
# Agregar al PATH (opcional)
echo 'export PATH="$PATH:$(pwd)/scripts"' >> ~/.bashrc
source ~/.bashrc

# Ahora puedes usar desde cualquier parte:
git-rebase-squash.sh mi-rama
git-squash-branch.sh mi-rama
```

### Crear alias de Git (recomendado)

```bash
# Alias para el script rebase
git config --global alias.squash-rebase '!bash scripts/git-rebase-squash.sh'

# Alias para el script robusto
git config --global alias.squash-safe '!bash scripts/git-squash-branch.sh'

# Uso:
git squash-rebase feature/mi-rama
git squash-safe feature/mi-rama-importante
```

## ⚠️ Advertencias importantes

1. **Siempre haz backup** de ramas importantes antes del squash
2. **No uses en main/master** - estos scripts son para feature branches
3. **Coordina con el equipo** si la rama está siendo usada por otros
4. **Revisa el resultado** con `git log --oneline` después del squash

## 🚀 Casos de uso WebCode

### Para el proyecto WebCode, recomendamos:

**Feature branches normales** → `git-rebase-squash.sh`

```bash
./scripts/git-rebase-squash.sh feature/button-component "feat: Nuevo componente Button"
```

**Feature branches grandes** → `git-squash-branch.sh`

```bash
./scripts/git-squash-branch.sh feature/auth-system "feat: Sistema completo de autenticación"
```

**Ramas de documentación** → `git-rebase-squash.sh`

```bash
./scripts/git-rebase-squash.sh docs/api-documentation "docs: Documentación completa de API"
```

---

## 📖 **Referencias y Documentación Adicional**

### **Para entender el funcionamiento interno:**

- 📋 **[TECHNICAL-DOCUMENTATION.md](TECHNICAL-DOCUMENTATION.md)** - Explicación paso a paso del método manual
- 🔧 **Método orphan branch** - Por qué es superior a rebase interactivo
- 💡 **Casos de uso reales** - Ejemplos prácticos y troubleshooting

### **Para usuarios avanzados:**

- ⚙️ **Comandos git manual** - Cómo hacer squash sin scripts
- 🔍 **Comparación de métodos** - Orphan vs Rebase vs Reset
- 🛠️ **Personalización** - Cómo adaptar los scripts a tus necesidades

### **Enlaces útiles:**

- [Git Documentation - git checkout --orphan](https://git-scm.com/docs/git-checkout#Documentation/git-checkout.txt---orphanltnew-branchgt)
- [Git Documentation - git branch -M](https://git-scm.com/docs/git-branch#Documentation/git-branch.txt--M)
- [WebCode Project Guidelines](../.github/support/git-commit-standards.md)
