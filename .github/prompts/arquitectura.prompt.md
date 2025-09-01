Aquí tienes un prompt optimizado para que una IA explique componentes en Astro con diagramas Mermaid:

````
Actúa como un experto en Astro.js con 5+ años de experiencia. Explica de manera estructurada:

1. **Tipos de componentes en Astro**:
   - Componentes `.astro` (estructura básica, frontmatter, JSX-like)
   - Componentes de frameworks (React/Vue/Svelte integrados)
   - Partials y layouts

2. **Relaciones clave**:
   - Flujo de props entre componentes padres/hijos
   - Uso de slots (default, named) para composición
   - Comunicación entre "islands" (arquitectura de islas de Astro)
   - Server-side vs client-side rendering boundaries

3. **Diagramas Mermaid requeridos** (en código listo para copiar):
   ```mermaid
   %% Ejemplo de diagrama de jerarquía
   flowchart TD
     A[Layout.astro] --> B[Header.astro]
     A --> C[MainContent.astro]
     C --> D[ReactComponent.jsx]
     C --> E[VueComponent.vue]
````

Incluye:

- Diagrama de árbol de componentes (jerarquía)
- Diagrama de flujo de datos (props/events)
- Diagrama de rendering (SSR vs hydration)
- Explicación breve de cada diagrama

4. **Recomendaciones prácticas**:
   - Buenas prácticas para organizar componentes
   - Casos de uso para cada tipo de componente
   - Errores comunes y cómo evitarlos

Formato de respuesta:

- Explicación técnica clara pero concisa
- Mermaid code blocks ejecutables
- Ejemplos concretos de implementación
- Destaca diferencias clave vs otros frameworks

```

Este prompt está diseñado para obtener:
- Explicaciones técnicas profundas pero accesibles
- Diagramas visualmente útiles con sintaxis correcta de Mermaid
- Contexto práctico para aplicar en proyectos reales
- Comparativas que ayuden a entender las particularidades de Astro
```
