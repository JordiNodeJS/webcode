# Fuentes Locales / Local Fonts

## Geist Fonts

Para usar las fuentes Geist localmente y evitar dependencias de red:

### Descarga / Download

1. **Geist Sans**:
   - Visita: https://vercel.com/font
   - Descarga: `GeistVF.woff2` (Variable Font)
   - Coloca en: `public/fonts/GeistVF.woff2`

2. **Geist Mono**:
   - Visita: https://vercel.com/font
   - Descarga: `GeistMonoVF.woff2` (Variable Font)
   - Coloca en: `public/fonts/GeistMonoVF.woff2`

### Alternativa con npm

```bash
# Instalar paquetes de fuentes
npm install geist

# Copiar archivos de fuentes
cp node_modules/geist/dist/fonts/geist-sans/GeistVF.woff2 public/fonts/
cp node_modules/geist/dist/fonts/geist-mono/GeistMonoVF.woff2 public/fonts/
```

### Fuentes de Respaldo / Fallback Fonts

Si las fuentes Geist no están disponibles, la aplicación usa fuentes del sistema:
- **Sans**: system-ui, -apple-system, Segoe UI, Roboto
- **Mono**: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas

Esto asegura que la aplicación funcione incluso sin las fuentes descargadas.

### Verificación

Después de colocar las fuentes, verifica que estén en:
- ✅ `public/fonts/GeistVF.woff2`
- ✅ `public/fonts/GeistMonoVF.woff2`

La aplicación cargará automáticamente las fuentes locales en el próximo build.
