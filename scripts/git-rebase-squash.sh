#!/bin/bash

# Script para squashing de ramas usando git rebase interactivo
# Parte del sistema WebSnack de herramientas Git
# Autor: WebSnack Team
# Versión: 1.0.0

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Función de logging con timestamp
log() {
    echo -e "${GREEN}[$(date +%H:%M:%S)]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[$(date +%H:%M:%S)]${NC} $1"
}

error() {
    echo -e "${RED}[$(date +%H:%M:%S)]${NC} $1"
    exit 1
}

info() {
    echo -e "${BLUE}[$(date +%H:%M:%S)]${NC} $1"
}

# Función de ayuda
show_help() {
    echo -e "${PURPLE}Git Rebase Squash Script${NC}"
    echo ""
    echo "Uso: $0 <rama> [commits_desde_base] [mensaje_personalizado]"
    echo ""
    echo "Parámetros:"
    echo "  rama                 - Nombre de la rama a squashear (puedes ejecutar desde la misma rama)"
    echo "  commits_desde_base   - Número de commits desde la base (opcional, auto-detecta)"
    echo "  mensaje_personalizado - Mensaje para el commit squasheado (opcional)"
    echo ""
    echo "Ejemplos:"
    echo "  # Desde cualquier rama:"
    echo "  $0 feature/nueva-funcionalidad"
    echo "  # Desde la misma rama (más natural):"
    echo "  git checkout feature/nueva-funcionalidad"
    echo "  $0 feature/nueva-funcionalidad 5"
    echo "  $0 feature/nueva-funcionalidad 3 'feat: Nueva funcionalidad completa'"
    echo ""
    echo "Características:"
    echo "  1. Squash automático de todos los commits"
    echo "  2. Usa git rebase interno (método estándar)"
    echo "  3. Ejecuta desde la misma rama (workflow natural)"
    echo "  4. Backup automático de seguridad"
    echo "  5. Sin intervención manual - completamente automático"
    echo ""
    echo "Ventajas del método rebase automático:"
    echo "  • Usa herramientas nativas de Git"
    echo "  • Preserva estructura de merge natural"
    echo "  • Método estándar y reconocido"
    echo "  • Automático como los otros scripts"
    echo ""
    exit 1
}

# Verificar argumentos
if [ $# -eq 0 ] || [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
    show_help
    exit 0
fi

BRANCH_NAME="$1"
COMMITS_COUNT="$2"
CUSTOM_MESSAGE="$3"

# Verificar que estamos en un repositorio git
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    error "No estás en un repositorio Git"
fi

# Verificar que la rama existe
if ! git show-ref --verify --quiet refs/heads/"$BRANCH_NAME"; then
    error "La rama '$BRANCH_NAME' no existe"
fi

# Generar nombre del backup
BACKUP_NAME="${BRANCH_NAME}-rebase-backup-$(date +%Y%m%d-%H%M%S)"

# Obtener la rama actual
CURRENT_BRANCH=$(git branch --show-current)

# Permitir ejecutar desde la misma rama (es lo más natural)
if [ "$CURRENT_BRANCH" = "$BRANCH_NAME" ]; then
    log "Ejecutando rebase desde la misma rama: $BRANCH_NAME"
else
    log "Cambiando a la rama $BRANCH_NAME"
    git checkout "$BRANCH_NAME"
fi

# Crear backup antes de proceder
log "Creando backup: $BACKUP_NAME"
git branch "$BACKUP_NAME" "$BRANCH_NAME"

# Detectar base de la rama automáticamente si no se especifica
if [ -z "$COMMITS_COUNT" ]; then
    # Detectar rama base (main o master)
    if git show-ref --verify --quiet refs/heads/main; then
        BASE_BRANCH="main"
    elif git show-ref --verify --quiet refs/heads/master; then
        BASE_BRANCH="master"
    else
        error "No se pudo detectar la rama base (main/master)"
    fi
    
    info "Detectando commits desde $BASE_BRANCH..."
    
    # Calcular commits desde la base
    MERGE_BASE=$(git merge-base "$BASE_BRANCH" "$BRANCH_NAME" 2>/dev/null || git rev-list --max-parents=0 "$BRANCH_NAME")
    COMMITS_COUNT=$(git rev-list --count "$MERGE_BASE..$BRANCH_NAME")
    
    if [ "$COMMITS_COUNT" -eq 0 ]; then
        error "No hay commits únicos en esta rama para squashear"
    fi
    
    log "Detectados $COMMITS_COUNT commits únicos desde $BASE_BRANCH"
else
    log "Usando $COMMITS_COUNT commits especificados manualmente"
fi

# Mostrar información de los commits
info "Commits que serán incluidos en el rebase interactivo:"
git log --oneline -"$COMMITS_COUNT"

echo ""
warn "El script hará squash automático de todos los commits."
warn "No habrá intervención manual - todo será automático."
echo ""
echo "Commits que serán squasheados automáticamente:"
git log --oneline -"$COMMITS_COUNT" | sed 's/^/  → /'
echo ""

# Confirmar la operación
echo -e "${YELLOW}¿Proceder con el squash automático de $COMMITS_COUNT commits? (y/N):${NC}"
read -r confirm

if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
    log "Operación cancelada. Eliminando backup..."
    git checkout "$CURRENT_BRANCH" 2>/dev/null || git checkout main 2>/dev/null || git checkout master
    git branch -D "$BACKUP_NAME"
    exit 0
fi

log "Iniciando rebase automático con squash completo..."

# Función de rollback
rollback() {
    warn "Rebase fallido o cancelado. Realizando rollback..."
    git rebase --abort 2>/dev/null || true
    git reset --hard "$BACKUP_NAME" 2>/dev/null || true
    error "Rollback completado. La rama ha sido restaurada desde backup $BACKUP_NAME"
}

# Trap para manejar errores
trap rollback ERR

# Crear script temporal para rebase automático
REBASE_SCRIPT=$(mktemp)
echo "pick $(git rev-parse HEAD~$((COMMITS_COUNT-1)))" > "$REBASE_SCRIPT"
for ((i=COMMITS_COUNT-2; i>=0; i--)); do
    echo "squash $(git rev-parse HEAD~$i)" >> "$REBASE_SCRIPT"
done

# Ejecutar rebase automático usando el script
export GIT_SEQUENCE_EDITOR="cp $REBASE_SCRIPT"

if [ -n "$CUSTOM_MESSAGE" ]; then
    # Si hay mensaje personalizado, preparar commit template
    TEMP_MSG_FILE=$(mktemp)
    echo "$CUSTOM_MESSAGE" > "$TEMP_MSG_FILE"
    
    # Configurar editor temporal que use el mensaje personalizado
    export GIT_EDITOR="cp $TEMP_MSG_FILE"
    
    git rebase -i "HEAD~$COMMITS_COUNT"
    
    # Limpiar
    rm -f "$TEMP_MSG_FILE"
    unset GIT_EDITOR
else
    # Rebase automático con mensaje generado
    TEMP_MSG_FILE=$(mktemp)
    echo "feat: Squashed $COMMITS_COUNT commits from $BRANCH_NAME" > "$TEMP_MSG_FILE"
    echo "" >> "$TEMP_MSG_FILE"
    echo "Commits squashed:" >> "$TEMP_MSG_FILE"
    git log --oneline -"$COMMITS_COUNT" | sed 's/^/- /' >> "$TEMP_MSG_FILE"
    
    export GIT_EDITOR="cp $TEMP_MSG_FILE"
    git rebase -i "HEAD~$COMMITS_COUNT"
    
    # Limpiar
    rm -f "$TEMP_MSG_FILE"
    unset GIT_EDITOR
fi

# Limpiar archivos temporales
rm -f "$REBASE_SCRIPT"
unset GIT_SEQUENCE_EDITOR

# Verificar que el rebase fue exitoso
if ! git diff --quiet HEAD@{1} HEAD; then
    NEW_COMMIT=$(git rev-parse HEAD)
    log "Rebase completado exitosamente!"
    log "Nuevo commit: $NEW_COMMIT"
else
    warn "No se detectaron cambios después del rebase"
fi

# Limpiar trap
trap - ERR

# Mostrar resumen
echo ""
echo -e "${GREEN}✅ Rebase interactivo completado exitosamente!${NC}"
echo ""
echo "Resumen:"
echo "  - Rama: $BRANCH_NAME"
echo "  - Commits procesados: $COMMITS_COUNT"
echo "  - Método: Interactive rebase"
echo "  - Backup disponible en: $BACKUP_NAME"
echo ""
echo "Comandos útiles:"
echo "  - Ver el resultado: git log --oneline -5"
echo "  - Ver cambios: git show HEAD"
echo "  - Restaurar backup: git reset --hard $BACKUP_NAME"
echo "  - Eliminar backup: git branch -D $BACKUP_NAME"
echo ""

# Preguntar si quiere eliminar el backup
echo -e "${YELLOW}¿Quieres eliminar el backup $BACKUP_NAME? (y/N):${NC}"
read -r delete_backup

if [ "$delete_backup" = "y" ] || [ "$delete_backup" = "Y" ]; then
    git branch -D "$BACKUP_NAME"
    log "Backup eliminado"
else
    log "Backup conservado: $BACKUP_NAME"
fi

log "Proceso completado!"
