# 🎨 Sistema de Temas WebSnack

## Variables CSS Personalizadas

El sistema de temas de WebSnack utiliza variables CSS personalizadas para mantener consistencia y facilitar cambios globales.

### Tokens de Color Base

```css
:root {
  /* Colores principales */
  --primary: #3b82f6;
  --secondary: #64748b;
  --accent: #f59e0b;

  /* Estados */
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;

  /* Neutros */
  --background: #ffffff;
  --foreground: #1f2937;
}
```

### Uso de Variables

```css
/* ✅ Correcto */
.button-primary {
  background-color: var(--primary);
  color: var(--background);
}

/* ❌ Evitar colores hardcodeados */
.button-wrong {
  background-color: #3b82f6;
}
```

### Añadir Nuevas Variables

1. Definir la variable en `:root`
2. Documentar su propósito
3. Crear fallbacks apropiados
4. Actualizar este archivo

### Compatibilidad

Las variables CSS están soportadas en todos los navegadores modernos. Para proyectos que requieren soporte legacy, considerar fallbacks:

```css
.element {
  color: #3b82f6; /* fallback */
  color: var(--primary);
}
```
