# Convención de Nombres para Componentes de la Sección Hero

## Descripción

Esta regla define la convención de nombres jerárquica para los componentes de la sección Hero, con el objetivo de facilitar la identificación del componente principal y la relación entre los componentes secundarios.

## Convención

1. **Componente Principal**: `HeroSection.tsx` (sin prefijo, ya que es el componente principal)
2. **Componentes Secundarios**: `Hero.NombreComponente.tsx`

## Ejemplos

- `HeroSection.tsx` - Componente principal
- `Hero.WavesBackground.tsx` - Fondo animado con olas
- `Hero.HeaderNavigation.tsx` - Navegación superior
- `Hero.Content.tsx` - Contenido principal
- `Hero.CallToAction.tsx` - Botones de llamada a la acción
- `Hero.TrustIndicators.tsx` - Indicadores de confianza
- `Hero.ValuePropsGrid.tsx` - Grid de propuestas de valor
- `Hero.ThemeToggle.tsx` - Selector de tema

## Beneficios

1. **Identificación rápida**: Permite identificar a simple vista el componente principal y los secundarios
2. **Organización visual**: Los archivos se agrupan naturalmente en el explorador
3. **Mantenimiento más fácil**: Facilita la búsqueda y modificación de componentes relacionados
4. **Escalabilidad**: Facilita añadir nuevos componentes sin romper la estructura

## Aplicación

Esta convención se aplica a todos los componentes dentro del directorio `src/components/landing/hero/`.
