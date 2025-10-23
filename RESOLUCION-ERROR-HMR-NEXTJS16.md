# Resolución del Error de HMR en Next.js 16 - 23 de Octubre 2025

## 📋 Resumen del Problema

### Error Inicial
```
Module [project]/node_modules/.pnpm/next@15.5.2_@opentelemetry+.../next/dist/compiled/react-experimental/jsx-dev-runtime.js was instantiated because it was required from module [project]/src/contexts/AnimationContext.tsx, but the module factory is not available. It might have been deleted in an HMR update.
```

**Síntomas:**
- La aplicación no renderizaba después de la migración a Next.js 16
- El error mostraba una ruta a Next.js 15.5.2 aunque se había instalado 16.0.0
- El problema ocurría en `AnimationContext.tsx` durante la inicialización del layout

## 🔍 Análisis del Problema

### Causa Raíz
El error fue causado por **caché corrupta** de múltiples fuentes:

1. **Caché de pnpm store**: Contenía versiones antiguas de Next.js (15.5.2)
2. **Directorio `.next/`**: Cache de compilación de Turbopack con módulos antiguos
3. **`node_modules/.cache/`**: Cache de dependencias instaladas
4. **`node_modules/`**: Instalación inconsistente de paquetes

### Por Qué Ocurrió
Durante la migración a Next.js 16:
- Las dependencias se actualizaron en `package.json`
- Sin embargo, el sistema de caché de pnpm y Turbopack aún referenciaba módulos de la versión anterior
- El HMR (Hot Module Replacement) intentaba cargar módulos de React experimental de Next.js 15.5.2
- Estos módulos ya no existían en la nueva instalación, causando el error

## ✅ Solución Aplicada

### Paso 1: Limpiar Store de pnpm
```bash
pnpm store prune
```
**Resultado:** Eliminó 4016 archivos y 76 paquetes obsoletos

### Paso 2: Eliminar node_modules
```bash
rm -rf node_modules
```

### Paso 3: Limpiar Cache de Next.js
```bash
rm -rf .next node_modules/.cache
```

### Paso 4: Reinstalar Dependencias
```bash
pnpm install --force
```
**Resultado:** Instaló 871 paquetes limpios con Next.js 16.0.0 y React 19.2.0

### Paso 5: Migrar middleware a proxy (Next.js 16)
```bash
# Renombrar archivos
mv middleware.ts proxy.ts

# Actualizar función exportada
export function proxy(request: NextRequest) {
  // ... lógica
}
```

## 📦 Versiones Confirmadas

Después de la limpieza, las versiones correctas:
```json
{
  "next": "16.0.0",
  "react": "19.2.0",
  "react-dom": "19.2.0"
}
```

## 🎯 Mejoras Adicionales

### 1. Consolidación de Archivos Proxy
Se unificaron dos archivos middleware en un solo `proxy.ts`:
- **Antes:** `middleware.ts` (root) + `src/middleware.ts`
- **Después:** `proxy.ts` (root) con toda la lógica consolidada

### 2. Configuración de Proxy
```typescript
// proxy.ts - Next.js 16
export function proxy(request: NextRequest) {
  // Security: Bloqueo de patrones maliciosos
  // SEO: X-Robots-Tag para páginas sensibles
  // ...
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};
```

## 🚀 Resultado

### Estado del Servidor
```
✓ Next.js 16.0.0 (Turbopack)
✓ Ready in 923ms
✓ No warnings
✓ Sin errores de HMR
```

### Verificaciones Exitosas
- ✅ Servidor de desarrollo funciona correctamente
- ✅ Hot Module Replacement operativo
- ✅ No hay referencias a versiones antiguas
- ✅ AnimationContext renderiza sin problemas
- ✅ Proxy implementado según convenciones de Next.js 16

## 📚 Documentación Consultada

### Context7 - Next.js
- **Library ID:** `/vercel/next.js`
- **Trust Score:** 10
- **Topics:** HMR, React 19 migration, module resolution

### Hallazgos Clave de la Documentación
1. **HMR en Next.js 16**: Usa Turbopack por defecto con nuevo sistema de cache
2. **Migración middleware → proxy**: Cambio obligatorio en Next.js 16
3. **React 19 Compatibility**: Requiere actualización completa del store de paquetes
4. **Cache Management**: Next.js 16 usa nuevo sistema de cache que puede conflictuar con versiones anteriores

## 🔄 Procedimiento para Futuras Migraciones

### Checklist de Limpieza de Cache
```bash
# 1. Limpiar store de pnpm
pnpm store prune

# 2. Eliminar node_modules
rm -rf node_modules

# 3. Limpiar cache de Next.js
rm -rf .next node_modules/.cache

# 4. Reinstalar dependencias
pnpm install --force

# 5. Verificar versiones
pnpm list next react react-dom
```

### Verificación Post-Migración
1. ✅ Verificar que no haya warnings sobre `middleware`
2. ✅ Confirmar que el servidor inicia sin errores
3. ✅ Probar HMR con cambios en componentes
4. ✅ Verificar que no haya referencias a versiones antiguas en los logs

## 🎓 Lecciones Aprendidas

### 1. Importancia de la Limpieza de Cache
En migraciones mayores de versión (Next.js 15 → 16):
- **Siempre** limpiar el store de pnpm con `pnpm store prune`
- **Siempre** eliminar completamente `node_modules/` y `.next/`
- Usar `--force` en la reinstalación para garantizar consistencia

### 2. Conflictos de Cache en Turbopack
Turbopack (por defecto en Next.js 16) es más sensible a cache corrupta:
- Cache de versiones anteriores puede causar errores de runtime
- Los errores de "module factory not available" suelen indicar cache obsoleta

### 3. Convenciones de Next.js 16
- `middleware.ts` → `proxy.ts` es obligatorio
- React Compiler ahora es estable (no experimental)
- APIs asíncronas en Server Components son el estándar

## 📝 Notas Adicionales

### Advertencias Informativas (No Críticas)
```
⚠ serverComponentsHmrCache (experimental)
✓ viewTransition (experimental)
```
Estas advertencias son normales y no afectan el funcionamiento.

### Optimizaciones Activadas
```typescript
// next.config.ts
experimental: {
  optimizePackageImports: ["lucide-react", "framer-motion"],
  serverComponentsHmrCache: false, // Desactivado temporalmente
}
```

## 🔗 Referencias

- [Next.js 16 Documentation](https://nextjs.org/docs)
- [Next.js Middleware → Proxy Migration](https://nextjs.org/docs/messages/middleware-to-proxy)
- [React 19 Upgrade Guide](https://react.dev/blog/2024/12/05/react-19)
- [Turbopack Performance](https://turbo.build/pack/docs)

---

**Resolución:** ✅ Completada exitosamente
**Tiempo de resolución:** ~15 minutos
**Estado del proyecto:** Completamente funcional con Next.js 16.0.0
