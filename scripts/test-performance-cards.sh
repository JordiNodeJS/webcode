#!/bin/bash

# Script para ejecutar pruebas de rendimiento de las tarjetas WebCode
# Requiere navegador con DevTools y herramientas de performance

echo "🔬 INICIANDO ANÁLISIS DE RENDIMIENTO - TARJETAS WEBSNACK"
echo "=================================================="

# Función para mostrar instrucciones
show_instructions() {
    echo ""
    echo "📋 INSTRUCCIONES DE PRUEBA:"
    echo "1. Abrir navegador en http://localhost:3000/dev-performance-test"
    echo "2. Abrir DevTools (F12) > Performance Tab"
    echo "3. Grabar performance por 30 segundos en cada escenario:"
    echo "   - Tarjetas Originales (en reposo)"
    echo "   - Tarjetas Optimizadas (en reposo)"
    echo "   - Tarjetas Estáticas (control)"
    echo "4. Comparar FPS, CPU usage y GPU layers"
    echo ""
}

# Función para verificar prerequisites
check_prerequisites() {
    echo "🔍 Verificando prerequisites..."
    
    if ! command -v pnpm &> /dev/null; then
        echo "❌ pnpm no encontrado. Instala pnpm primero."
        exit 1
    fi
    
    if [ ! -f "package.json" ]; then
        echo "❌ No se encontró package.json. Ejecuta desde la raíz del proyecto."
        exit 1
    fi
    
    echo "✅ Prerequisites verificados"
}

# Función para iniciar servidor de desarrollo
start_dev_server() {
    echo "🚀 Iniciando servidor de desarrollo..."
    
    # Verificar si el servidor ya está corriendo
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        echo "✅ Servidor ya corriendo en puerto 3000"
    else
        echo "⏳ Iniciando pnpm dev..."
        pnpm dev &
        DEV_PID=$!
        
        # Esperar a que el servidor arranque
        echo "⏳ Esperando a que el servidor arranque..."
        for i in {1..30}; do
            if curl -s http://localhost:3000 > /dev/null 2>&1; then
                echo "✅ Servidor iniciado correctamente"
                break
            fi
            sleep 1
            echo "   Intento $i/30..."
        done
        
        if ! curl -s http://localhost:3000 > /dev/null 2>&1; then
            echo "❌ Error: No se pudo iniciar el servidor"
            exit 1
        fi
    fi
}

# Función para generar reporte de performance
generate_report() {
    echo ""
    echo "📊 MÉTRICAS A EVALUAR:"
    echo "====================="
    echo ""
    echo "🎯 ESTADO DE REPOSO (sin hover):"
    echo "   • FPS objetivo: 60 FPS constante"
    echo "   • CPU usage: <2%"
    echo "   • GPU layers: mínimos"
    echo "   • Memory leaks: ninguno"
    echo ""
    echo "⚡ ESTADO ACTIVO (con hover):"
    echo "   • FPS esperado: 45-60 FPS"
    echo "   • CPU usage: 8-15% (aceptable)"
    echo "   • GPU layers: incremento esperado"
    echo "   • Smoothness: sin drops evidentes"
    echo ""
    echo "🔍 PROBLEMAS A IDENTIFICAR:"
    echo "   • Constant repaints en reposo"
    echo "   • will-change siempre activo"
    echo "   • Transform calculations innecesarios"
    echo "   • Gradient recalculations constantes"
    echo "   • Event listeners sin cleanup"
    echo ""
}

# Función para abrir herramientas de análisis
open_analysis_tools() {
    echo "🛠️ HERRAMIENTAS DE ANÁLISIS RECOMENDADAS:"
    echo "========================================="
    echo ""
    echo "1. Chrome DevTools Performance:"
    echo "   - Enable 'Paint flashing' para ver repaints"
    echo "   - Enable 'Layer borders' para ver GPU layers"
    echo "   - Record performance durante 30s en reposo"
    echo ""
    echo "2. Chrome DevTools Rendering:"
    echo "   - Frame Rendering Stats (FPS)"
    echo "   - Paint Flashing"
    echo "   - Layer Borders"
    echo "   - Scrolling Performance Issues"
    echo ""
    echo "3. Página de test personalizada:"
    echo "   - http://localhost:3000/dev-performance-test"
    echo "   - Monitor en tiempo real de FPS y memoria"
    echo "   - Comparación lado a lado de escenarios"
    echo ""
}

# Función principal
main() {
    echo "🎯 WebCode Performance Test Suite"
    echo "Analizando rendimiento de tarjetas en reposo vs activo"
    echo ""
    
    check_prerequisites
    start_dev_server
    show_instructions
    generate_report
    open_analysis_tools
    
    echo ""
    echo "🚀 LISTO PARA TESTING!"
    echo "======================"
    echo ""
    echo "1. Abre http://localhost:3000/dev-performance-test"
    echo "2. Abre DevTools > Performance"
    echo "3. Sigue las instrucciones de la página"
    echo ""
    echo "💡 TIP: Usa Cmd/Ctrl+Shift+I para abrir DevTools rápidamente"
    echo ""
    
    # Opción para abrir automáticamente el navegador
    read -p "¿Abrir navegador automáticamente? (y/n): " -r
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        if command -v open &> /dev/null; then
            open "http://localhost:3000/dev-performance-test"
        elif command -v xdg-open &> /dev/null; then
            xdg-open "http://localhost:3000/dev-performance-test"
        elif command -v start &> /dev/null; then
            start "http://localhost:3000/dev-performance-test"
        else
            echo "⚠️ No se pudo abrir el navegador automáticamente"
            echo "   Abre manualmente: http://localhost:3000/dev-performance-test"
        fi
    fi
}

# Trap para cleanup al salir
cleanup() {
    echo ""
    echo "🧹 Limpiando procesos..."
    if [ ! -z "$DEV_PID" ]; then
        kill $DEV_PID 2>/dev/null
        echo "✅ Servidor de desarrollo detenido"
    fi
}

trap cleanup EXIT

# Ejecutar función principal
main "$@"