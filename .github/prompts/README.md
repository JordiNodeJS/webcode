# WEBCODE Prompts & Guidelines

Este directorio contiene prompts y guías de desarrollo para mantener la consistencia y calidad del proyecto WEBCODE.

## 📚 Índice de Prompts

### 🎨 Diseño y Desarrollo de Páginas

#### [`create-proceso-page.prompt.md`](./create-proceso-page.prompt.md)
**Propósito**: Crear una página completa de "Proceso" de desarrollo web

**Contenido**:
- Estructura de 4 fases del proceso de desarrollo
- Timeline horizontal (desktop) y vertical (mobile)
- Garantías de calidad y protección del cliente
- Canales de comunicación
- SEO metadata y responsive design

**Características**:
- Diseño con gradientes y glassmorphism
- Componentes WSFadeIn para animaciones
- Trust indicators y CTAs optimizados
- ~650 líneas de código

**Cuándo usar**: Al crear páginas similares de servicios o procesos

---

### ⚡ Optimización y Rendimiento

#### [`performance-animations-guidelines.prompt.md`](./performance-animations-guidelines.prompt.md)
**Propósito**: Guía completa de optimización de animaciones y rendimiento

**Contenido**:
- **Reglas de oro** para animaciones eficientes
- **Problemas comunes** de rendimiento (CPU/GPU >100)
- **Límites recomendados** de elementos animados
- **Patrones de optimización** con código real
- **Herramientas de diagnóstico** (Chrome DevTools)
- **Script de análisis automático** de rendimiento

**Caso de estudio real**:
- Optimización página `/proceso`
- Reducción: 24 → 4 elementos animados (-83%)
- CPU/GPU: >100 → ~20-30 en idle (-75%)

**Métricas objetivo**:
- Elementos animados: ≤5
- CPU idle: <30%
- Lighthouse Performance: >90
- Sin blur-3xl (usar blur-2xl)

**Cuándo usar**: 
- Antes de añadir animaciones nuevas
- Al detectar problemas de rendimiento
- Durante code reviews de componentes con animaciones
- Al optimizar páginas existentes

---

## 🎯 Guía de Uso

### Para Desarrolladores

1. **Antes de empezar una tarea**, revisar si existe un prompt relevante
2. **Durante el desarrollo**, seguir las guidelines del prompt
3. **Antes de commit**, verificar checklist de optimización

### Para Code Reviews

1. Verificar adherencia a los prompts relevantes
2. Usar checklists de los prompts para validación
3. Comprobar métricas de rendimiento cuando aplique

## 📊 Métricas de Calidad

Todos los prompts están basados en:
- ✅ Experiencia real del proyecto
- ✅ Problemas resueltos documentados
- ✅ Mejores prácticas de la industria
- ✅ Métricas medibles

## 🔄 Mantenimiento

### Actualización de Prompts

Cuando se descubra un nuevo patrón o optimización:
1. Documentarlo en el prompt relevante
2. Añadir ejemplo de código
3. Incluir métricas before/after si aplica
4. Actualizar este README

### Creación de Nuevos Prompts

Template sugerido:
```markdown
# Prompt: [Título Descriptivo]

## Contexto
[Explicación del propósito]

## Stack Tecnológico
[Tecnologías relevantes]

## Guía/Contenido Principal
[Contenido detallado]

## Ejemplos
[Código de ejemplo]

## Checklist
[Items verificables]
```

## 📝 Historial de Prompts

| Fecha | Prompt | Descripción |
|-------|--------|-------------|
| 2025-10-03 | `performance-animations-guidelines.prompt.md` | Guía de optimización basada en caso real |
| 2025-10-03 | `create-proceso-page.prompt.md` | Template para página de Proceso |

## 🚀 Próximos Prompts Planeados

Ideas para futuros prompts:
- [ ] Component architecture guidelines
- [ ] SEO optimization checklist
- [ ] Accessibility (a11y) standards
- [ ] Testing best practices
- [ ] API integration patterns
- [ ] Form validation standards
- [ ] Error handling guidelines

## 💡 Contribuir

Para añadir un nuevo prompt:
1. Crear archivo `.prompt.md` en este directorio
2. Seguir el template sugerido
3. Añadir entrada en este README
4. Commit con mensaje descriptivo

---

**Proyecto**: WEBCODE  
**Última actualización**: 3 de Octubre de 2025  
**Mantenido por**: Equipo WEBCODE
