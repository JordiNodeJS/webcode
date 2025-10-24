# Scripts del Proyecto WEBCODE

Este directorio contiene scripts de utilidad para el desarrollo, mantenimiento y deployment del proyecto WEBCODE.

## 📚 **Índice de Scripts**

### 🌐 Deployment y Dominios
- **[verify-domain.sh](#verify-domainsh)** - Verificación de configuración de dominio webcode.es
- **[verify-domain.bat](#verify-domainbat)** - Verificación de dominio (versión Windows)

### 🔀 Git y Control de Versiones
- **[git-rebase-squash.sh](#git-rebase-squashsh)** - Squash automático usando git rebase
- **[git-squash-branch.sh](#git-squash-branchsh)** - Squash robusto con backups

### 📝 Notion CMS
- **[verify-notion-connection.js](#verify-notion-connectionjs)** - Verificar conexión con Notion API
- **[list-notion-databases.js](#list-notion-databasesjs)** - Listar bases de datos de Notion
- **[list-database-content.js](#list-database-contentjs)** - Ver contenido de base de datos
- **[search-notion-database.js](#search-notion-databasejs)** - Buscar en bases de datos
- **[show-page-content.js](#show-page-contentjs)** - Ver contenido de página
- **[publish-page.js](#publish-pagejs)** - Publicar página de Notion

### 🎨 Optimización y Performance
- **[optimize-bundle.sh](#optimize-bundlesh)** - Análisis y optimización de bundle
- **[optimize-images-node.mjs](#optimize-images-nodemjs)** - Optimización de imágenes
- **[simple-performance-test.js](#simple-performance-testjs)** - Test de performance básico
- **[run-full-performance-analysis.js](#run-full-performance-analysisjs)** - Análisis completo de performance
- **[test-performance-cards.sh](#test-performance-cardssh)** - Test específico de tarjetas
- **[test-performance-optimizations.sh](#test-performance-optimizationssh)** - Test de optimizaciones

### 🧪 Testing y Validación
- **[playwright-snapshots.js](#playwright-snapshotsjs)** - Gestión de snapshots de Playwright
- **[validate-structured-data.mjs](#validate-structured-datamjs)** - Validación de datos estructurados

### 🔧 Utilidades
- **[analyze-unused-imports.mjs](#analyze-unused-importsmjs)** - Detectar imports no usados
- **[check-logo-neon.mjs](#check-logo-neonmjs)** - Verificar efectos de neón en logos
- **[check-missing-css-classes.mjs](#check-missing-css-classesmjs)** - Detectar clases CSS faltantes
- **[migrate-emojis-to-svg.mjs](#migrate-emojis-to-svgmjs)** - Migrar emojis a SVG
- **[update-websnack-to-webcode.mjs](#update-websnack-to-webcodemjs)** - Actualizar referencias de naming

---

## 🌐 Scripts de Deployment y Dominios

### verify-domain.sh

**Script de verificación de configuración del dominio webcode.es (Linux/macOS/Git Bash)**

#### Uso

```bash
./scripts/verify-domain.sh
```

#### Funcionalidad

- ✅ Verifica resolución DNS
- ✅ Comprueba conectividad HTTPS
- ✅ Valida certificado SSL
- ✅ Revisa headers de seguridad
- ✅ Proporciona diagnóstico completo

#### Requisitos

- `nslookup` o `dig`
- `curl`
- `openssl`

### verify-domain.bat

**Versión del script anterior para Windows CMD**

#### Uso

```cmd
scripts\verify-domain.bat
```

#### Funcionalidad

Mismas verificaciones que `verify-domain.sh` pero adaptado para Windows.

---

## 🔀 Scripts de Git

### git-rebase-squash.sh

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
