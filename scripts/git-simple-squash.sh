#!/bin/bash

# Git Simple Branch Squash
# Versión simplificada del script de squash usando el método orphan
# Basado en la idea original del usuario

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
TEMP_BRANCH="${BRANCH_NAME}-temp-$(date +%s)"

echo -e "${GREEN}🔄 Squashing branch: $BRANCH_NAME${NC}"

# Verificar que la rama existe
if ! git show-ref --verify --quiet refs/heads/"$BRANCH_NAME"; then
    echo -e "${RED}❌ La rama '$BRANCH_NAME' no existe${NC}"
    exit 1
fi

# Cambiar a la rama objetivo
echo -e "${YELLOW}📍 Cambiando a $BRANCH_NAME${NC}"
git checkout "$BRANCH_NAME"

# Crear rama huérfana temporal
echo -e "${YELLOW}🌱 Creando rama huérfana temporal${NC}"
git checkout --orphan "$TEMP_BRANCH"

# Agregar todos los archivos y hacer commit
echo -e "${YELLOW}📦 Commitando todos los archivos${NC}"
git add .
git commit -m "$COMMIT_MSG"

# Renombrar la rama temporal forzando sobrescritura (método optimizado)
echo -e "${YELLOW}🔄 Reemplazando rama original${NC}"
git branch -M "$BRANCH_NAME"

echo -e "${GREEN}✅ Squash completado!${NC}"
echo "La rama '$BRANCH_NAME' ahora tiene un solo commit."
echo "Commit: $(git rev-parse --short HEAD) - $COMMIT_MSG"
