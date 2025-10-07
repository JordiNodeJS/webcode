# Layout Prompt troubleshooting

- Si encuentras problemas con el diseño, verifica la consola del navegador para detectar errores de CSS.
- Asegúrate de que todas las rutas de los archivos CSS y JS sean correctas.
- Utiliza herramientas de desarrollo como el inspector de elementos para ajustar estilos en tiempo real.
- Prueba el diseño en diferentes navegadores para identificar problemas de compatibilidad.
- Si el diseño no se ve bien en dispositivos móviles, revisa las consultas de medios y los estilos responsivos.
- Documenta cualquier problema encontrado y las soluciones aplicadas para futuras referencias.

# Sistema de Colores - Regla de Implementación

## 🚨 **REGLA CRÍTICA: Sistema de Theming Centralizado**

### **NUNCA usar colores hardcodeados**

- **[Error]** **Prohibido**: `#264e70`, `rgb(38, 78, 112)`, `rgba(38, 78, 112, 0.5)`
- **[Error]** **Prohibido**: Estilos inline con colores
- **[Error]** **Prohibido**: Props de color en componentes sin mapear

### ****[Completado]** SIEMPRE usar sistema centralizado**

- **Variables CSS**: `rgba(var(--color-primary), 0.8)` en `src/styles/theme.css`
- **Clases del sistema**: `.contact-card-gradient-*`, `.text-primary`, `.bg-secondary`
- **Mapeo automático**: `gradientClassMap` en componentes Astro

### ****[Carpeta Abierta]** Arquitectura de colores:**

```
src/styles/
├── theme.css           # **[Completado]** Variables CSS (fuente de verdad)
├── components.css      # **[Completado]** Gradientes con variables
└── global.css         # **[Advertencia]** Utilidades temporales Tailwind
```

### ****[Diseño]** Paleta oficial (RGB format):**

```css
--color-primary: 38 78 112; /* #264e70 - Azul corporativo */
--color-secondary: 103 145 134; /* #679186 - Verde complementario */
--color-accent: 249 180 171; /* #f9b4ab - Rosa coral CTA */
--color-highlight: 250 227 96; /* #fae360 - Amarillo destacados */
--color-neutral: 187 212 206; /* #bbd4ce - Verde neutro */
```

### ****[Herramientas]** Implementación correcta:**

```css
/* [CORRECTO] Color con opacidad */
background: rgba(var(--color-primary), 0.2);

/* [CORRECTO] Gradiente con variables */
background: linear-gradient(
  to right,
  rgba(var(--color-secondary), 1),
  rgba(var(--color-accent), 0.8)
);
```

### ****[Lista]** Verificación pre-commit:**

- [ ] No hay colores hardcodeados
- [ ] Variables definidas en `theme.css`
- [ ] Gradientes usan variables CSS
- [ ] Clases mapeadas correctamente

**Documentación completa**: `.github/docs/COLOR-SYSTEM-RULES.md`

# Playwright Prompt troubleshooting

- Utiliza el mpc de playwright para que chequeemos juntos cómo han quedado los ajustes.
- Toma screenshot para comprobar el resultado tú mismo analizando la imagen tomada.
- Investiga en la console de desarrollador para detectar errores o advertencias y estilos aplicados.
- Utiliza herramientas de desarrollo como el inspector de elementos para ajustar estilos en tiempo real.
- Si la imagen no refleja los cambios esperados, ajusta el código y repite la prueba.
- **Verificar sistema de colores**: Inspeccionar que las variables CSS se aplican correctamente y no hay overrides hardcodeados.
