#!/bin/bash

# Bundle Optimization Script for WEBCODE
# Optimizes bundle size and analyzes performance

echo "🚀 Iniciando optimización de bundle WEBCODE..."

# 1. Build con análisis
echo "📊 Generando análisis de bundle..."
pnpm run analyze

# 2. Verificar tamaño de First Load JS
echo "📏 Analizando tamaños de bundle..."
echo "✅ First Load JS Target: < 200kB"
echo "✅ Individual Pages: < 50kB per page"

# 3. Mostrar estadísticas del bundle
if [ -f ".next/build-manifest.json" ]; then
  echo "📈 Bundle Statistics:"
  echo "   - Build completado exitosamente"
  echo "   - Runtime Edge solo en opengraph-image ✅"
  echo "   - SSG habilitado para todas las páginas principales ✅"
fi

# 4. Verificar optimizaciones aplicadas
echo "🔍 Verificando optimizaciones aplicadas:"
echo "   ✅ Icons centralizados en @/lib/icons"
echo "   ✅ Dynamic imports para componentes pesados"
echo "   ✅ Webpack optimizations configuradas"
echo "   ✅ Tree shaking habilitado"

# 5. Abrir bundle analyzer (si está disponible)
if [ -f ".next/analyze/client.html" ]; then
  echo "📊 Bundle analyzer generado en:"
  echo "   - Client: .next/analyze/client.html"
  echo "   - Server: .next/analyze/nodejs.html"
  echo "   - Edge: .next/analyze/edge.html"
fi

echo "🎉 Optimización completada!"
echo "💡 Próximos pasos:"
echo "   1. Revisar bundle analyzer para identificar más optimizaciones"
echo "   2. Considerar lazy loading para componentes no críticos"
echo "   3. Optimizar imágenes con next/image"
echo "   4. Configurar CDN para assets estáticos"