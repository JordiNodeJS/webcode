#!/bin/bash

# Git Simple Branch Squash
# Versión simplificada del script de squash usando reset --soft
# Permite merge posterior con la rama principal

set -e

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Verificar argumentos
if [ $# -eq 0 ]; then
    echo "Uso: $0 <nombre-de-rama> [mensaje-commit]"
    echo "Ejemplo: $0 feature/mi-rama 'feat: Nueva funcionalidad completa'"
    exit 1
fi

BRANCH_NAME="$1"
COMMIT_MSG="${2:-chore: Squash branch '$BRANCH_NAME'}"
BACKUP_NAME="${BRANCH_NAME}-backup-$(date +%Y%m%d-%H%M%S)"

echo -e "${GREEN}🔄 Squashing branch: $BRANCH_NAME${NC}"

# Verificar que la rama existe
if ! git show-ref --verify --quiet refs/heads/"$BRANCH_NAME"; then
    echo -e "${RED}❌ La rama '$BRANCH_NAME' no existe${NC}"
    exit 1
fi

# Crear backup de seguridad
echo -e "${YELLOW}💾 Creando backup: $BACKUP_NAME${NC}"
git branch "$BACKUP_NAME" "$BRANCH_NAME"

# Cambiar a la rama objetivo
echo -e "${YELLOW}📍 Cambiando a $BRANCH_NAME${NC}"
git checkout "$BRANCH_NAME"

# Detectar rama base (main o master)
if git show-ref --verify --quiet refs/heads/main; then
    BASE_BRANCH="main"
elif git show-ref --verify --quiet refs/heads/master; then
    BASE_BRANCH="master"
else
    echo -e "${RED}❌ No se pudo detectar la rama base (main/master)${NC}"
    git branch -D "$BACKUP_NAME"
    exit 1
fi

# Encontrar el punto de divergencia
echo -e "${YELLOW}🔍 Detectando punto de divergencia con $BASE_BRANCH${NC}"
MERGE_BASE=$(git merge-base "$BASE_BRANCH" "$BRANCH_NAME" 2>/dev/null || git rev-list --max-parents=0 "$BRANCH_NAME")
COMMITS_COUNT=$(git rev-list --count "$MERGE_BASE..HEAD")

if [ "$COMMITS_COUNT" -eq 0 ]; then
    echo -e "${RED}❌ No hay commits únicos para squashear${NC}"
    git branch -D "$BACKUP_NAME"
    exit 1
fi

echo -e "${YELLOW}📊 Squasheando $COMMITS_COUNT commits desde $BASE_BRANCH${NC}"

# Usar reset --soft para preservar historia común
echo -e "${YELLOW}🔄 Aplicando reset --soft al punto de divergencia${NC}"
git reset --soft "$MERGE_BASE"

# Crear el commit squasheado
echo -e "${YELLOW}📦 Creando commit squasheado${NC}"
git commit -m "$COMMIT_MSG"

echo -e "${GREEN}✅ Squash completado!${NC}"
echo "La rama '$BRANCH_NAME' ahora tiene un solo commit."
echo "Commits squasheados: $COMMITS_COUNT"
echo "Nuevo commit: $(git rev-parse --short HEAD) - $COMMIT_MSG"
echo "Backup disponible en: $BACKUP_NAME"
echo ""
echo "✅ Esta rama ahora se puede mergear con $BASE_BRANCH normalmente"
echo ""
echo -e "${YELLOW}¿Quieres eliminar el backup $BACKUP_NAME? (y/N):${NC}"
read -r delete_backup

if [ "$delete_backup" = "y" ] || [ "$delete_backup" = "Y" ]; then
    git branch -D "$BACKUP_NAME"
    echo -e "${GREEN}🗑️ Backup eliminado${NC}"
else
    echo -e "${GREEN}💾 Backup conservado: $BACKUP_NAME${NC}"
fi
