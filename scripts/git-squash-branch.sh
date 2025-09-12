#!/bin/bash

# Git Branch Squash Script
# Aplana una rama completa a un único commit manteniendo el historial de forma segura
# Autor: WebCode Development Team
# Fecha: 2025-09-01

set -e  # Salir si hay algún error

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para mostrar ayuda
show_help() {
    echo -e "${BLUE}Git Branch Squash Script${NC}"
    echo ""
    echo "Uso: $0 <nombre-de-rama> [mensaje-del-commit]"
    echo ""
    echo "Argumentos:"
    echo "  nombre-de-rama    Nombre de la rama a aplanar"
    echo "  mensaje-del-commit (opcional) Mensaje personalizado para el commit squasheado"
    echo ""
    echo "Ejemplos:"
    echo "  $0 feature/nueva-funcionalidad"
    echo "  $0 hotfix/bug-critico 'Fix: Solución completa para bug crítico'"
    echo ""
    echo "El script:"
    echo "  1. Verifica que la rama existe"
    echo "  2. Crea un backup de seguridad"
    echo "  3. Aplana todos los commits en uno solo"
    echo "  4. Mantiene el mismo nombre de rama"
    echo "  5. Ofrece rollback si algo sale mal"
}

# Función para logging
log() {
    echo -e "${GREEN}[$(date +'%H:%M:%S')]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

# Verificar argumentos
if [ $# -eq 0 ] || [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
    show_help
    exit 0
fi

BRANCH_NAME="$1"
CUSTOM_MESSAGE="$2"

# Verificar que estamos en un repositorio git
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    error "No estás en un repositorio Git"
fi

# Verificar que la rama existe
if ! git show-ref --verify --quiet refs/heads/"$BRANCH_NAME"; then
    error "La rama '$BRANCH_NAME' no existe"
fi

# Generar nombre del backup
BACKUP_NAME="${BRANCH_NAME}-backup-$(date +%Y%m%d-%H%M%S)"

# Obtener la rama actual
CURRENT_BRANCH=$(git branch --show-current)

# Verificar que no estamos en la rama que queremos squashear
if [ "$CURRENT_BRANCH" = "$BRANCH_NAME" ]; then
    warn "Estás en la rama que quieres squashear. Cambiando a main/master..."
    if git show-ref --verify --quiet refs/heads/main; then
        git checkout main
    elif git show-ref --verify --quiet refs/heads/master; then
        git checkout master
    else
        error "No se pudo encontrar una rama principal (main/master)"
    fi
fi

# Crear backup antes de proceder
log "Creando backup: $BACKUP_NAME"
git branch "$BACKUP_NAME" "$BRANCH_NAME"

# Obtener información de la rama antes de modificarla
FIRST_COMMIT=$(git merge-base HEAD "$BRANCH_NAME" 2>/dev/null || git rev-list --max-parents=0 "$BRANCH_NAME")
LAST_COMMIT=$(git rev-parse "$BRANCH_NAME")
TOTAL_COMMITS=$(git rev-list --count "$FIRST_COMMIT..$LAST_COMMIT")

log "Rama: $BRANCH_NAME"
log "Commits a squashear: $TOTAL_COMMITS"
log "Backup creado: $BACKUP_NAME"

# Confirmar la operación
echo ""
echo -e "${YELLOW}¿Estás seguro de que quieres aplanar la rama '$BRANCH_NAME'?${NC}"
echo "Se crearán $TOTAL_COMMITS commits en uno solo."
echo -e "Escribe '${GREEN}yes${NC}' para continuar o cualquier otra cosa para cancelar:"
read -r confirmation

if [ "$confirmation" != "yes" ]; then
    log "Operación cancelada. Eliminando backup..."
    git branch -D "$BACKUP_NAME"
    exit 0
fi

# Función de rollback
rollback() {
    warn "Realizando rollback..."
    git branch -D "$BRANCH_NAME" 2>/dev/null || true
    git branch -m "$BACKUP_NAME" "$BRANCH_NAME"
    error "Rollback completado. La rama original ha sido restaurada."
}

# Trap para manejar errores
trap rollback ERR

log "Iniciando proceso de squash..."

# Método elegante: usar reset --soft
log "Cambiando a la rama $BRANCH_NAME"
git checkout "$BRANCH_NAME"

# Obtener la rama base (normalmente main o master)
BASE_BRANCH="main"
if ! git show-ref --verify --quiet refs/heads/main; then
    if git show-ref --verify --quiet refs/heads/master; then
        BASE_BRANCH="master"
    else
        # Intentar detectar la rama base automáticamente
        BASE_BRANCH=$(git for-each-ref --format='%(refname:short)' refs/heads/ | grep -E '^(main|master|develop|dev)$' | head -1)
        if [ -z "$BASE_BRANCH" ]; then
            BASE_BRANCH="HEAD~$TOTAL_COMMITS"
        fi
    fi
fi

log "Usando rama base: $BASE_BRANCH"

# Encontrar el punto de divergencia
MERGE_BASE=$(git merge-base "$BASE_BRANCH" "$BRANCH_NAME" 2>/dev/null || git rev-list --max-parents=0 "$BRANCH_NAME")

# Hacer soft reset al punto de divergencia
log "Realizando soft reset..."
git reset --soft "$MERGE_BASE"

# Crear mensaje del commit
if [ -n "$CUSTOM_MESSAGE" ]; then
    COMMIT_MESSAGE="$CUSTOM_MESSAGE"
else
    # Generar mensaje automático basado en los commits squasheados
    COMMIT_MESSAGE="feat: Squash branch '$BRANCH_NAME' ($(git rev-list --count HEAD.."$LAST_COMMIT") commits)

$(git log --oneline "$MERGE_BASE..$LAST_COMMIT" | head -10)
$([ $(git rev-list --count "$MERGE_BASE..$LAST_COMMIT") -gt 10 ] && echo "... y $(( $(git rev-list --count "$MERGE_BASE..$LAST_COMMIT") - 10 )) commits más")"
fi

# Commitear todos los cambios
log "Creando commit squasheado..."
git commit -m "$COMMIT_MESSAGE"

# Verificar que todo salió bien
NEW_COMMIT=$(git rev-parse HEAD)
log "Nuevo commit: $NEW_COMMIT"

# Remover trap de error ya que todo salió bien
trap - ERR

echo ""
echo -e "${GREEN}✅ Squash completado exitosamente!${NC}"
echo ""
echo "Resumen:"
echo "  - Rama: $BRANCH_NAME"
echo "  - Commits originales: $TOTAL_COMMITS"
echo "  - Nuevo commit: ${NEW_COMMIT:0:7}"
echo "  - Backup disponible en: $BACKUP_NAME"
echo ""
echo "Comandos útiles:"
echo "  - Ver el commit: git show HEAD"
echo "  - Restaurar backup: git branch -m $BRANCH_NAME ${BRANCH_NAME}-squashed && git branch -m $BACKUP_NAME $BRANCH_NAME"
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
