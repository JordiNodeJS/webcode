# Fuentes Locales / Local Fonts

## Configuración Opcional de Geist Fonts

La aplicación funciona perfectamente con fuentes del sistema por defecto. Opcionalmente, puedes añadir las fuentes Geist para una tipografía mejorada.

### ¿Por qué son opcionales?

- ✅ **Funciona sin ellas**: La app usa fuentes del sistema de alta calidad como fallback
- ✅ **Sin dependencias de red**: No requiere acceso a Google Fonts
- ✅ **Build más rápido**: Sin descargas externas durante el build
- ✅ **Mejora opcional**: Las fuentes Geist añaden un toque premium si las instalas

---

## Opción 1: Usar fuentes del sistema (actual)

No hagas nada. La aplicación ya funciona con:
- **Sans**: system-ui, -apple-system, Segoe UI, Roboto
- **Mono**: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas

---

## Opción 2: Añadir Geist Fonts (opcional)

### Paso 1: Descargar las fuentes

**Desde Vercel:**
1. Visita: https://vercel.com/font
2. Descarga `GeistVF.woff2` (Geist Sans Variable)
3. Descarga `GeistMonoVF.woff2` (Geist Mono Variable)

**O mediante npm:**
```bash
npm install geist
cp node_modules/geist/dist/fonts/geist-sans/GeistVF.woff2 public/fonts/
cp node_modules/geist/dist/fonts/geist-mono/GeistMonoVF.woff2 public/fonts/
npm uninstall geist  # Opcional: desinstalar después de copiar
```

### Paso 2: Colocar los archivos

Coloca los archivos descargados en:
```
public/fonts/GeistVF.woff2
public/fonts/GeistMonoVF.woff2
```

### Paso 3: Añadir CSS

Crea o edita `src/app/fonts.css`:

```css
/* Geist Sans Variable Font */
@font-face {
  font-family: 'Geist';
  src: url('/fonts/GeistVF.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

/* Geist Mono Variable Font */
@font-face {
  font-family: 'Geist Mono';
  src: url('/fonts/GeistMonoVF.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

:root {
  --font-geist-custom: 'Geist', system-ui, -apple-system, sans-serif;
  --font-geist-mono-custom: 'Geist Mono', ui-monospace, monospace;
}
```

Luego importa en `src/app/layout.tsx`:
```tsx
import "./fonts.css";
```

### Verificación

Después de seguir los pasos, las fuentes Geist se cargarán automáticamente:
- ✅ `public/fonts/GeistVF.woff2`
- ✅ `public/fonts/GeistMonoVF.woff2`
- ✅ `src/app/fonts.css` (con @font-face)

---

## Nota sobre .gitignore

Los archivos de fuentes están en `.gitignore` por defecto. Esto permite que cada desarrollador decida si quiere usar las fuentes localmente sin forzar a todos a descargarlas.

Si prefieres commitear las fuentes al repositorio, comenta estas líneas en `.gitignore`:
```gitignore
# public/fonts/*.woff
# public/fonts/*.woff2
```

