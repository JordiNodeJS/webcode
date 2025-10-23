# Auditoría DevTools - Integración Blog con Notion

**Fecha**: 11 de octubre de 2025  
**Branch**: `feat/blog`  
**Servidor**: `http://localhost:3000/blog`

## 📋 Resumen Ejecutivo

La integración del blog con Notion API está **funcionalmente operativa**, pero requiere **configuración de permisos** en Notion para acceder a la base de datos.

### Estado General
- ✅ Cliente de Notion configurado correctamente
- ✅ Variables de entorno cargadas (`.env.local`)
- ✅ Conexión con API de Notion establecida
- ❌ **Permisos de base de datos no configurados**

---

## 🔍 Análisis Detallado

### 1. Estructura del Cliente Notion v5.1.0

**Investigación realizada:**
```javascript
// Métodos disponibles en notion.databases
['retrieve', 'create', 'update']

// Propiedades del cliente
['blocks', 'databases', 'dataSources', 'pages', 'users', 'comments', 'fileUploads', 'search', 'oauth']
```

**Hallazgo importante:**
- ❌ `notion.databases.query()` NO existe en v5.1.0
- ✅ `notion.dataSources.query()` es el método correcto

### 2. Corrección Implementada

**Archivo**: `src/lib/notion/client.ts`

**Antes (incorrecto):**
```typescript
const res = await notion.request({ path, method: "post", body });
// Error: "Invalid request URL"
```

**Después (correcto):**
```typescript
export async function queryDatabase(
  params: DatabaseQueryParameters,
): Promise<DatabaseQueryResponse> {
  const { database_id, ...rest } = params;
  const res = await (notion as any).dataSources.query({
    data_source_id: database_id,
    ...rest,
  });
  return res as DatabaseQueryResponse;
}
```

### 3. Error Actual en la Consola

**Mensaje de error:**
```
APIResponseError: Could not find database with ID: 2898237e-a3b3-80cd-a403-f6a1c72a1116. 
Make sure the relevant pages and databases are shared with your integration.
```

**Detalles del error:**
- **Code**: `object_not_found`
- **Status**: `404`
- **Request ID**: `91c31408-5265-4c6f-afe5-266ceb80d266`
- **Database ID**: `2898237e-a3b3-80cd-a403-f6a1c72a1116`

### 4. Análisis de Red (DevTools)

**Request fallida:**
```http
GET /blog -> 500 Internal Server Error (6085ms)
```

**Headers de respuesta de Notion API:**
```
status: 404
content-type: application/json; charset=utf-8
x-notion-request-id: 91c31408-5265-4c6f-afe5-266ceb80d266
```

### 5. Stack Trace del Error

```
Error: No se pudieron obtener los artículos del blog
    at getBlogPosts (src\lib\notion\blog-service.ts:67:11)
    at async BlogPage (src\app\blog\page.tsx:27:21)

Originado en:
    at queryDatabase (src\lib\notion\client.ts:41:15)
    at async getBlogPosts (src\lib\notion\blog-service.ts:32:22)
```

---

## ✅ Verificaciones Completadas

### Variables de Entorno
```bash
✓ .env.local existe
✓ NOTION_API_KEY configurada
✓ NOTION_DATABASE_ID configurada
```

### Cliente de Notion
```bash
✓ Paquete @notionhq/client@5.1.0 instalado
✓ Cliente instanciado correctamente
✓ Autenticación funcionando (API key válida)
✓ Método dataSources.query() disponible
```

### Servidor de Desarrollo
```bash
✓ Next.js 15.5.2 con Turbopack
✓ Servidor corriendo en http://localhost:3000
✓ Hot reload funcionando
✓ Middleware compilado sin errores
```

---

## 🚨 Problema Identificado

### Causa Raíz
La base de datos de Notion **NO está compartida** con la integración de Notion creada para el proyecto.

### Impacto
- ❌ No se pueden obtener los posts del blog
- ❌ Error 404 en todas las peticiones a Notion API
- ❌ Página del blog muestra error 500

---

## 🔧 Solución Requerida

### Pasos para Resolver

1. **Acceder a Notion**
   - Abrir la base de datos del blog en Notion
   - ID de la base de datos: `2898237e-a3b3-80cd-a403-f6a1c72a1116`

2. **Compartir con la Integración**
   - Click en el botón "..." (más opciones) de la base de datos
   - Seleccionar "Add connections" o "Conectar a"
   - Buscar y seleccionar tu integración de Notion
   - Confirmar el acceso

3. **Verificar Permisos**
   - La integración necesita permisos de **lectura** (read)
   - No son necesarios permisos de escritura para el blog

4. **Probar la Conexión**
   - Refrescar la página del blog
   - Verificar que los posts se cargan correctamente

### Configuración de la Integración

**Nombre recomendado**: `WebCode Blog Integration`

**Permisos mínimos requeridos:**
- ✅ Read content
- ❌ Update content (no necesario)
- ❌ Insert content (no necesario)

---

## 📊 Pruebas Realizadas con DevTools

### Console
- ✅ Error capturado y mostrado correctamente
- ✅ Stack trace completo disponible
- ✅ Request ID de Notion para debugging

### Network
- ✅ Request a `/blog` visible
- ✅ Tiempo de respuesta registrado (6085ms)
- ✅ Status code 500 identificado
- ✅ Headers de Notion API analizados

### Screenshots
- ✅ Captura guardada: `docs/blog-notion-error-permissions.png`

---

## 🎯 Próximos Pasos

### Inmediatos (Bloqueantes)
1. [ ] Compartir base de datos de Notion con la integración
2. [ ] Verificar que la conexión funciona
3. [ ] Probar carga de posts en el blog

### Opcionales (Mejoras)
1. [ ] Añadir mejor manejo de errores de permisos
2. [ ] Implementar mensaje de error amigable para usuarios
3. [ ] Crear página de status de conexión con Notion
4. [ ] Añadir logging de peticiones a Notion API

---

## 📝 Notas Técnicas

### Cambios en el Cliente de Notion v5
En la versión 5.x del cliente oficial de Notion:
- `databases.query()` fue renombrado/movido a `dataSources.query()`
- El parámetro `database_id` ahora se llama `data_source_id`
- La estructura de respuesta se mantiene compatible

### Compatibilidad
El código actual es compatible con:
- ✅ @notionhq/client v5.1.0+
- ✅ Next.js 15.5.2
- ✅ React 19
- ✅ TypeScript con modo estricto

---

## 🔗 Referencias

- [Notion API Documentation](https://developers.notion.com/)
- [Notion Client v5 GitHub](https://github.com/makenotion/notion-sdk-js)
- [Next.js Error Handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)

---

## 📸 Evidencia Visual

Ver captura de pantalla del error en DevTools:
- Archivo: `docs/blog-notion-error-permissions.png`
- Muestra: Error overlay de Next.js con detalles completos del error

---

**Conclusión**: La integración está **técnicamente correcta** y solo requiere **configuración de permisos en Notion** para funcionar completamente.
