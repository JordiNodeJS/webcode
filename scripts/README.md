# Scripts de Git Squash

Este directorio contiene dos scripts para aplanar ramas de Git, cada uno con diferentes enfoques y casos de uso.

## � **Documentación Completa**

- **[README.md](README.md)** - Guía de uso y comparación de scripts
- **[TECHNICAL-DOCUMENTATION.md](TECHNICAL-DOCUMENTATION.md)** - Documentación técnica detallada y método manual paso a paso

## �🚀 git-simple-squash.sh

**Script rápido y directo basado en tu idea original**

### Uso

```bash
./scripts/git-simple-squash.sh <nombre-de-rama> [mensaje-commit]
```

### Ejemplo

```bash
./scripts/git-simple-squash.sh feature/nueva-funcionalidad "feat: Nueva funcionalidad completa"
```

### Cómo funciona

1. Crea una rama huérfana temporal (sin historial)
2. Agrega todos los archivos actuales de la rama
3. Hace un commit único
4. Renombra forzando sobrescritura (`git branch -M`) ⭐

### Ventajas

- **Súper rápido** y simple
- **Sin historial previo** - rama completamente limpia
- **Basado en tu idea original** del orphan + commit + rename

### Desventajas

- **No conserva metadatos** de commits anteriores
- **No hay backup automático**
- **Pierde toda referencia** al historial previo

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

**🚀 Script Simple:** Método `orphan branch` + `git branch -M`

- **Filosofía:** "Velocidad y limpieza absoluta"
- **Casos:** Feature branches rápidos, experimentos, CI/CD

**🛡️ Script Robusto:** Método `soft reset` + backups automáticos

- **Filosofía:** "Seguridad y control máximo"
- **Casos:** Features críticos, debugging, auditorías

### **🎓 Valor Educacional**

- **Aprender Git:** Dos enfoques técnicos diferentes para el mismo problema
- **Flexibilidad:** Herramienta correcta para cada situación
- **Mejores prácticas:** Cuándo priorizar velocidad vs seguridad

---

## 🎯 ¿Cuál usar?

### Usa `git-simple-squash.sh` cuando:

- ✅ Quieres **velocidad máxima**
- ✅ **No te importa perder** el historial detallado
- ✅ La rama es **experimental** o temporal
- ✅ Quieres una **solución minimalista**

### Usa `git-squash-branch.sh` cuando:

- ✅ Trabajas en una rama **importante**
- ✅ Quieres **máxima seguridad**
- ✅ Necesitas **mantener alguna referencia** al historial
- ✅ Prefieres un proceso **paso a paso**

## 📝 Ejemplos de uso común

### Para feature branches experimentales

```bash
# Rápido y directo
./scripts/git-simple-squash.sh feature/experimento "feat: Experimento con nueva UI"
```

### Para feature branches importantes

```bash
# Con backup y seguridad
./scripts/git-squash-branch.sh feature/nueva-funcionalidad "feat: Sistema de autenticación completo"
```

### Para hotfixes

```bash
# Rápido para hotfixes
./scripts/git-simple-squash.sh hotfix/bug-critico "fix: Solución crítica para bug de seguridad"
```

## 🔧 Instalación y configuración

### Hacer scripts globalmente accesibles

```bash
# Agregar al PATH (opcional)
echo 'export PATH="$PATH:$(pwd)/scripts"' >> ~/.bashrc
source ~/.bashrc

# Ahora puedes usar desde cualquier parte:
git-simple-squash.sh mi-rama
git-squash-branch.sh mi-rama
```

### Crear alias de Git (recomendado)

```bash
# Alias para el script simple
git config --global alias.squash-simple '!bash scripts/git-simple-squash.sh'

# Alias para el script robusto
git config --global alias.squash-safe '!bash scripts/git-squash-branch.sh'

# Uso:
git squash-simple feature/mi-rama
git squash-safe feature/mi-rama-importante
```

## ⚠️ Advertencias importantes

1. **Siempre haz backup** de ramas importantes antes de usar `git-simple-squash.sh`
2. **No uses en main/master** - estos scripts son para feature branches
3. **Coordina con el equipo** si la rama está siendo usada por otros
4. **Revisa el resultado** con `git log --oneline` después del squash

## 🚀 Casos de uso WebSnack

### Para el proyecto WebSnack, recomendamos:

**Feature branches pequeñas** → `git-simple-squash.sh`

```bash
./scripts/git-simple-squash.sh feature/button-component "feat: Nuevo componente Button"
```

**Feature branches grandes** → `git-squash-branch.sh`

```bash
./scripts/git-squash-branch.sh feature/auth-system "feat: Sistema completo de autenticación"
```

**Ramas de documentación** → `git-simple-squash.sh`

```bash
./scripts/git-simple-squash.sh docs/api-documentation "docs: Documentación completa de API"
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
- [WebSnack Project Guidelines](../.github/support/git-commit-standards.md)
