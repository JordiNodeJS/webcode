#!/bin/bash

# Script de prueba para git-simple-squash.sh
# Crea un repositorio de prueba y verifica que el squash funcione correctamente

set -e

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

TEST_DIR="./test-squash-repo"
ORIGINAL_DIR=$(pwd)

# Función de limpieza
cleanup() {
    echo -e "${YELLOW}🧹 Limpiando repositorio de prueba...${NC}"
    cd "$ORIGINAL_DIR"
    rm -rf "$TEST_DIR"
}

# Trap para limpiar en caso de error
trap cleanup EXIT

echo -e "${BLUE}🧪 Iniciando prueba de git-simple-squash.sh${NC}"
echo ""

# Crear repositorio de prueba
echo -e "${YELLOW}📁 Creando repositorio de prueba en $TEST_DIR${NC}"
rm -rf "$TEST_DIR"
mkdir "$TEST_DIR"
cd "$TEST_DIR"

# Inicializar repositorio
git init
git config user.name "Test User"
git config user.email "test@example.com"

# Crear commit inicial en main
echo "# Test Repository" > README.md
git add README.md
git commit -m "Initial commit"

echo -e "${GREEN}✅ Repositorio base creado${NC}"
echo ""

# Crear una rama feature con múltiples commits
echo -e "${YELLOW}🌿 Creando rama feature/test con múltiples commits${NC}"
git checkout -b feature/test

# Simular desarrollo con múltiples commits
echo "función 1" > feature1.txt
git add feature1.txt
git commit -m "feat: Add feature 1"

echo "función 2" > feature2.txt
git add feature2.txt
git commit -m "feat: Add feature 2"

echo "fix bug" > bugfix.txt
git add bugfix.txt
git commit -m "fix: Fix important bug"

echo "documentación" > docs.txt
git add docs.txt
git commit -m "docs: Add documentation"

echo -e "${GREEN}✅ Rama feature/test creada con 4 commits${NC}"

# Mostrar estado antes del squash
echo ""
echo -e "${BLUE}📊 Estado antes del squash:${NC}"
git log --oneline
echo ""

# Ejecutar el script de squash
echo -e "${YELLOW}🔧 Ejecutando git-simple-squash.sh${NC}"
echo ""

# Confirmar automáticamente la eliminación del backup para la prueba
echo "y" | bash "$ORIGINAL_DIR/git-simple-squash.sh" feature/test "feat: Complete feature implementation"

echo ""
echo -e "${BLUE}📊 Estado después del squash:${NC}"
git log --oneline
echo ""

# Verificar que solo hay un commit en la rama
COMMITS_IN_FEATURE=$(git rev-list --count HEAD ^master)
if [ "$COMMITS_IN_FEATURE" -eq 1 ]; then
    echo -e "${GREEN}✅ Verificación exitosa: La rama tiene exactamente 1 commit único${NC}"
else
    echo -e "${RED}❌ Error: La rama tiene $COMMITS_IN_FEATURE commits únicos (esperado: 1)${NC}"
    exit 1
fi

# Probar merge con master
echo ""
echo -e "${YELLOW}🔀 Probando merge con master${NC}"
git checkout master

# Intentar merge
if git merge feature/test --no-edit; then
    echo -e "${GREEN}✅ Merge exitoso! El script funciona correctamente${NC}"
    echo ""
    echo -e "${BLUE}📊 Estado final del repositorio:${NC}"
    git log --oneline --graph
else
    echo -e "${RED}❌ Error: No se pudo hacer merge${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}🎉 ¡Prueba completada exitosamente!${NC}"
echo ""
echo "Resumen de la prueba:"
echo "  ✅ Repositorio de prueba creado"
echo "  ✅ Rama feature con 4 commits creada"
echo "  ✅ Script git-simple-squash.sh ejecutado"
echo "  ✅ Rama squasheada a 1 commit"
echo "  ✅ Merge con master exitoso"
echo ""
echo "El script git-simple-squash.sh ahora funciona correctamente y permite merge!"