#!/bin/bash

# Script de reorganización de documentación WEBCODE
# Fecha: 8 Octubre 2025
# Propósito: Migrar estructura plana a estructura jerárquica

set -e  # Exit on error

DOCS_DIR="docs"
BACKUP_DIR="docs_backup_$(date +%Y%m%d_%H%M%S)"

echo "🚀 Iniciando reorganización de documentación WEBCODE..."
echo ""

# 1. Crear backup
echo "📦 Creando backup en: $BACKUP_DIR"
cp -r "$DOCS_DIR" "$BACKUP_DIR"
echo "✅ Backup creado"
echo ""

# 2. Crear estructura de carpetas
echo "📁 Creando estructura de carpetas..."
mkdir -p "$DOCS_DIR/01-planificacion"
mkdir -p "$DOCS_DIR/02-diseno"
mkdir -p "$DOCS_DIR/03-desarrollo/migraciones"
mkdir -p "$DOCS_DIR/04-performance/lighthouse"
mkdir -p "$DOCS_DIR/05-seo"
mkdir -p "$DOCS_DIR/06-landing-page"
mkdir -p "$DOCS_DIR/07-comercializacion"
mkdir -p "$DOCS_DIR/08-guias"
mkdir -p "$DOCS_DIR/09-reportes/2025-09"
mkdir -p "$DOCS_DIR/09-reportes/2025-10"
mkdir -p "$DOCS_DIR/10-procesos/2025-10-03"
mkdir -p "$DOCS_DIR/11-decisiones"
mkdir -p "$DOCS_DIR/12-recursos"
mkdir -p "$DOCS_DIR/archive"
echo "✅ Carpetas creadas"
echo ""

# 3. Mover archivos a carpetas correspondientes
echo "🔄 Moviendo archivos..."

# Planificación
mv "$DOCS_DIR/01-PLANIFICACION-requisitos-del-producto.md" "$DOCS_DIR/01-planificacion/01-requisitos-del-producto.md" 2>/dev/null || true
mv "$DOCS_DIR/02-PLANIFICACION-stack-tecnologico.md" "$DOCS_DIR/01-planificacion/02-stack-tecnologico.md" 2>/dev/null || true
mv "$DOCS_DIR/PRD-GLM-4.5.md" "$DOCS_DIR/01-planificacion/PRD-GLM-4.5.md" 2>/dev/null || true

# Diseño
mv "$DOCS_DIR/00-RESUMEN-implementacion-was.md" "$DOCS_DIR/02-diseno/00-resumen-implementacion-was.md" 2>/dev/null || true
mv "$DOCS_DIR/03-DISENO-guia-estilos-base.md" "$DOCS_DIR/02-diseno/03-guia-estilos-base.md" 2>/dev/null || true
mv "$DOCS_DIR/04-DISENO-guia-estilos-extendida.md" "$DOCS_DIR/02-diseno/04-guia-estilos-extendida.md" 2>/dev/null || true
mv "$DOCS_DIR/05-DISENO-sistema-animaciones-websnack.md" "$DOCS_DIR/02-diseno/05-sistema-animaciones-webcode.md" 2>/dev/null || true
mv "$DOCS_DIR/06-DISENO-documentacion-tecnica-was.md" "$DOCS_DIR/02-diseno/06-documentacion-tecnica-was.md" 2>/dev/null || true
mv "$DOCS_DIR/07-DISENO-fundamentos-decision.md" "$DOCS_DIR/02-diseno/07-fundamentos-decision.md" 2>/dev/null || true

# Desarrollo
mv "$DOCS_DIR/08-DESARROLLO-resumen-implementacion.md" "$DOCS_DIR/03-desarrollo/08-resumen-implementacion.md" 2>/dev/null || true
mv "$DOCS_DIR/09-DESARROLLO-plan-consistencia.md" "$DOCS_DIR/03-desarrollo/09-plan-consistencia.md" 2>/dev/null || true
mv "$DOCS_DIR/10-DESARROLLO-auditoria-tecnica.md" "$DOCS_DIR/03-desarrollo/10-auditoria-tecnica.md" 2>/dev/null || true
mv "$DOCS_DIR/11-DESARROLLO-checklist-tareas.md" "$DOCS_DIR/03-desarrollo/11-checklist-tareas.md" 2>/dev/null || true
mv "$DOCS_DIR/14-DESARROLLO-migracion-eslint-biome.md" "$DOCS_DIR/03-desarrollo/14-migracion-eslint-biome.md" 2>/dev/null || true

# Migraciones
mv "$DOCS_DIR/RESUMEN-MIGRACION-ICONOS-2025-10-08.md" "$DOCS_DIR/03-desarrollo/migraciones/RESUMEN-MIGRACION-ICONOS-2025-10-08.md" 2>/dev/null || true
mv "$DOCS_DIR/SUSTITUCION-COMPLETA-ICONOS-REPORTE-FINAL.md" "$DOCS_DIR/03-desarrollo/migraciones/SUSTITUCION-COMPLETA-ICONOS-REPORTE-FINAL.md" 2>/dev/null || true
mv "$DOCS_DIR/MIGRACION-REACT-ICONS-REPORTE.md" "$DOCS_DIR/03-desarrollo/migraciones/MIGRACION-REACT-ICONS-REPORTE.md" 2>/dev/null || true

# Performance
mv "$DOCS_DIR/FINAL-PERFORMANCE-REPORT.md" "$DOCS_DIR/04-performance/FINAL-PERFORMANCE-REPORT.md" 2>/dev/null || true
mv "$DOCS_DIR/REPORTE-OPTIMIZACION-SEPTIEMBRE-2025.md" "$DOCS_DIR/04-performance/REPORTE-OPTIMIZACION-SEPTIEMBRE-2025.md" 2>/dev/null || true
mv "$DOCS_DIR/PERFORMANCE-ANALYSIS-ALL-COMPONENTS.md" "$DOCS_DIR/04-performance/PERFORMANCE-ANALYSIS-ALL-COMPONENTS.md" 2>/dev/null || true
mv "$DOCS_DIR/PERFORMANCE-ANALYSIS-CARDS.md" "$DOCS_DIR/04-performance/PERFORMANCE-ANALYSIS-CARDS.md" 2>/dev/null || true
mv "$DOCS_DIR/CPU-GPU-ANALYSIS-PROMPT.md" "$DOCS_DIR/04-performance/CPU-GPU-ANALYSIS-PROMPT.md" 2>/dev/null || true
mv "$DOCS_DIR/CPU-IDLE-DIAGNOSIS.md" "$DOCS_DIR/04-performance/CPU-IDLE-DIAGNOSIS.md" 2>/dev/null || true
mv "$DOCS_DIR/16-RENDER-BLOCKING-PLAN.md" "$DOCS_DIR/04-performance/16-RENDER-BLOCKING-PLAN.md" 2>/dev/null || true
mv "$DOCS_DIR/bundle-optimization-report.md" "$DOCS_DIR/04-performance/bundle-optimization-report.md" 2>/dev/null || true
mv "$DOCS_DIR/BUNDLE-OPTIMIZATION-RESULTS.md" "$DOCS_DIR/04-performance/BUNDLE-OPTIMIZATION-RESULTS.md" 2>/dev/null || true

# Lighthouse
mv "$DOCS_DIR/lighthouse-desktop.report.html" "$DOCS_DIR/04-performance/lighthouse/lighthouse-desktop.report.html" 2>/dev/null || true
mv "$DOCS_DIR/lighthouse-desktop.report.json" "$DOCS_DIR/04-performance/lighthouse/lighthouse-desktop.report.json" 2>/dev/null || true
mv "$DOCS_DIR/lighthouse-mobile.report.html" "$DOCS_DIR/04-performance/lighthouse/lighthouse-mobile.report.html" 2>/dev/null || true
mv "$DOCS_DIR/lighthouse-mobile.report.json" "$DOCS_DIR/04-performance/lighthouse/lighthouse-mobile.report.json" 2>/dev/null || true

# SEO
mv "$DOCS_DIR/SEO-OPTIMIZATION-REPORT.md" "$DOCS_DIR/05-seo/SEO-OPTIMIZATION-REPORT.md" 2>/dev/null || true
mv "$DOCS_DIR/15-SEO-pagina-faq.md" "$DOCS_DIR/05-seo/15-pagina-faq.md" 2>/dev/null || true

# Landing Page (mover carpeta completa)
if [ -d "$DOCS_DIR/12-LANDING-PAGE" ]; then
    mv "$DOCS_DIR/12-LANDING-PAGE" "$DOCS_DIR/06-landing-page/12-LANDING-PAGE"
fi

# Comercialización
mv "$DOCS_DIR/13-COMERCIALIZACION-dossier-comercial.md" "$DOCS_DIR/07-comercializacion/13-dossier-comercial.md" 2>/dev/null || true
mv "$DOCS_DIR/dossier-comercial.md" "$DOCS_DIR/07-comercializacion/dossier-comercial.md" 2>/dev/null || true
mv "$DOCS_DIR/BRIEFING-PDF-EXPORT.md" "$DOCS_DIR/07-comercializacion/BRIEFING-PDF-EXPORT.md" 2>/dev/null || true

# Guías
mv "$DOCS_DIR/TESTING-GUIDE.md" "$DOCS_DIR/08-guias/TESTING-GUIDE.md" 2>/dev/null || true
mv "$DOCS_DIR/EMAIL-PROTECTION-GUIDE.md" "$DOCS_DIR/08-guias/EMAIL-PROTECTION-GUIDE.md" 2>/dev/null || true
mv "$DOCS_DIR/SVG-REPO-INTEGRATION-GUIDE.md" "$DOCS_DIR/08-guias/SVG-REPO-INTEGRATION-GUIDE.md" 2>/dev/null || true

# Reportes
mv "$DOCS_DIR/REPORTE-FINAL-SEPTIEMBRE-2025.md" "$DOCS_DIR/09-reportes/2025-09/REPORTE-FINAL-SEPTIEMBRE-2025.md" 2>/dev/null || true
mv "$DOCS_DIR/REPORTE-PROGRESO-SEPTIEMBRE-2025.md" "$DOCS_DIR/09-reportes/2025-09/REPORTE-PROGRESO-SEPTIEMBRE-2025.md" 2>/dev/null || true

# Procesos
mv "$DOCS_DIR/GUIA-ESTADO-ACTUAL-Y-PASOS-SIGUIENTES.md" "$DOCS_DIR/10-procesos/GUIA-ESTADO-ACTUAL-Y-PASOS-SIGUIENTES.md" 2>/dev/null || true
mv "$DOCS_DIR/RESUMEN-SESION-PROCESO-2025-10-03.md" "$DOCS_DIR/10-procesos/2025-10-03/RESUMEN-SESION-PROCESO-2025-10-03.md" 2>/dev/null || true
mv "$DOCS_DIR/RESUMEN-MODERNIZACION-PROCESO-2025-10-03.md" "$DOCS_DIR/10-procesos/2025-10-03/RESUMEN-MODERNIZACION-PROCESO-2025-10-03.md" 2>/dev/null || true
mv "$DOCS_DIR/RESUMEN-BRIEFING-PROCESO-2025-10-03.md" "$DOCS_DIR/10-procesos/2025-10-03/RESUMEN-BRIEFING-PROCESO-2025-10-03.md" 2>/dev/null || true
mv "$DOCS_DIR/RESUMEN-FORMULARIO-BRIEFING-2025-10-03.md" "$DOCS_DIR/10-procesos/2025-10-03/RESUMEN-FORMULARIO-BRIEFING-2025-10-03.md" 2>/dev/null || true
mv "$DOCS_DIR/RESUMEN-IMPLEMENTACION-FAQ-2025-10-03.md" "$DOCS_DIR/10-procesos/2025-10-03/RESUMEN-IMPLEMENTACION-FAQ-2025-10-03.md" 2>/dev/null || true
mv "$DOCS_DIR/ANIMACIONES-TIMELINE-PROCESO-2025-10-03.md" "$DOCS_DIR/10-procesos/2025-10-03/ANIMACIONES-TIMELINE-PROCESO-2025-10-03.md" 2>/dev/null || true
mv "$DOCS_DIR/OPTIMIZACION-RENDIMIENTO-PROCESO-2025-10-03.md" "$DOCS_DIR/10-procesos/2025-10-03/OPTIMIZACION-RENDIMIENTO-PROCESO-2025-10-03.md" 2>/dev/null || true

# Decisiones
mv "$DOCS_DIR/CAMBIO-NOMBRE-WEBCODE.md" "$DOCS_DIR/11-decisiones/CAMBIO-NOMBRE-WEBCODE.md" 2>/dev/null || true
mv "$DOCS_DIR/00-REORGANIZACION-resumen.md" "$DOCS_DIR/11-decisiones/00-REORGANIZACION-resumen.md" 2>/dev/null || true

# Recursos (mover carpetas completas)
if [ -d "$DOCS_DIR/bundle-analyzer" ]; then
    mv "$DOCS_DIR/bundle-analyzer" "$DOCS_DIR/12-recursos/bundle-analyzer"
fi
if [ -d "$DOCS_DIR/components" ]; then
    mv "$DOCS_DIR/components" "$DOCS_DIR/12-recursos/components"
fi
if [ -d "$DOCS_DIR/examples" ]; then
    mv "$DOCS_DIR/examples" "$DOCS_DIR/12-recursos/examples"
fi
if [ -d "$DOCS_DIR/lecciones-css" ]; then
    mv "$DOCS_DIR/lecciones-css" "$DOCS_DIR/12-recursos/lecciones-css"
fi
if [ -d "$DOCS_DIR/notion-organized" ]; then
    mv "$DOCS_DIR/notion-organized" "$DOCS_DIR/12-recursos/notion-organized"
fi
if [ -d "$DOCS_DIR/tasks" ]; then
    mv "$DOCS_DIR/tasks" "$DOCS_DIR/12-recursos/tasks"
fi

# Archive
mv "$DOCS_DIR/LEGACY-JS-NOTES.md" "$DOCS_DIR/archive/LEGACY-JS-NOTES.md" 2>/dev/null || true
mv "$DOCS_DIR/VERCEL_PREVIEW_CHECK.md" "$DOCS_DIR/archive/VERCEL_PREVIEW_CHECK.md" 2>/dev/null || true

echo "✅ Archivos movidos"
echo ""

# 4. Crear READMEs en carpetas
echo "📝 Creando READMEs en carpetas..."

# Este paso se hará manualmente o con otro script más detallado

echo "⚠️  Pendiente: Crear README.md en cada carpeta"
echo ""

# 5. Resumen
echo "✅ Reorganización completada!"
echo ""
echo "📋 Siguientes pasos:"
echo "1. Revisar la nueva estructura en /docs"
echo "2. Crear READMEs en cada carpeta"
echo "3. Actualizar referencias en documentos"
echo "4. Verificar enlaces rotos"
echo "5. Hacer commit de cambios"
echo ""
echo "💾 Backup disponible en: $BACKUP_DIR"
echo ""
echo "❓ Si algo sale mal, restaurar con:"
echo "   rm -rf $DOCS_DIR"
echo "   mv $BACKUP_DIR $DOCS_DIR"
