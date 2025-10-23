# Convención de Nombres para Componentes - WebCode

## Descripción

Esta regla define la convención de nombres jerárquica para todos los componentes del proyecto WebCode, con el objetivo de facilitar la identificación de componentes principales y la relación entre componentes secundarios en cualquier sección de la aplicación.

## Convención General

```
[NombreSección].[Subsección].[Componente].tsx
```

### Para Componentes Principales de Páginas:

- `Page.Section.tsx` - Componente principal de una página

### Para Componentes Secundarios:

- `Page.NombreComponente.tsx` - Componentes de primer nivel
- `Page.Sección.Componente.tsx` - Componentes de segundo nivel
- `Page.Sección.Subsección.Componente.tsx` - Componentes de tercer nivel

## Ejemplos por Secciones

### Página Principal (Landing)

- `Hero.Section.tsx` - Componente principal de la sección Hero
- `Hero.WavesBackground.tsx` - Fondo animado
- `Hero.HeaderNavigation.tsx` - Navegación
- `Hero.Content.tsx` - Contenido principal

### Página de Servicios

- `Services.Section.tsx` - Componente principal
- `Services.Header.tsx` - Encabezado
- `Services.Intro.tsx` - Introducción
- `Services.Features.tsx` - Características

### Componentes Anidados

- `Services.Features.Card.tsx` - Tarjeta de características
- `Contact.Form.Input.tsx` - Input personalizado

## Beneficios

1. **Identificación rápida**: Permite identificar a simple vista la jerarquía de componentes
2. **Organización visual**: Los archivos se agrupan naturalmente en el explorador
3. **Mantenimiento más fácil**: Facilita la búsqueda y modificación de componentes relacionados
4. **Escalabilidad**: Facilita añadir nuevos componentes sin romper la estructura
5. **Consistencia**: Aplica el mismo patrón en todo el proyecto

## Aplicación

Esta convención se aplica a todos los componentes dentro del directorio `src/components/`.
