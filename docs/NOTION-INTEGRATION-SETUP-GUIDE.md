# Guía de Configuración: Integración de Notion

## 📋 Resumen
Esta guía te ayudará a configurar correctamente la integración de Notion con tu blog en WebCode.

---

## 🔑 Paso 1: Crear la Integración en Notion

1. **Ve a Notion Integrations**
   - URL: https://www.notion.so/my-integrations
   - Inicia sesión con tu cuenta de Notion

2. **Crear nueva integración**
   - Click en **"+ New integration"**
   - Nombre: `WebCode Blog` (o el nombre que prefieras)
   - Logo: (opcional) Sube el logo de tu proyecto
   - Associated workspace: Selecciona tu workspace

3. **Configurar Capabilities (Permisos)**
   - ✅ **Read content** (necesario para leer posts)
   - ✅ **Read comments** (opcional, para futuros features)
   - ❌ **Update content** (no necesario por ahora)
   - ❌ **Insert content** (no necesario por ahora)

4. **Tipo de integración**
   - Selecciona **"Internal integration"** (uso privado)

5. **Guardar y copiar el API Key**
   - Click en **"Submit"**
   - Copia el **Internal Integration Token**
   - Este es tu `NOTION_API_KEY`

---

## 🗄️ Paso 2: Obtener el ID de tu Base de Datos

### Método 1: Desde la URL de Notion

1. Abre tu base de datos "WebCode Blog" en Notion
2. La URL se verá así:
   ```
   https://www.notion.so/workspace/2898237ea3b380cda403f6a1c72a1116?v=...
                                   └─────────────────┬─────────────────┘
                                            Este es tu Database ID
   ```
3. Copia la parte entre el último `/` y el `?v=`
4. **Formatea el ID con guiones:**
   - Antes: `2898237ea3b380cda403f6a1c72a1116`
   - Después: `2898237e-a3b3-80cd-a403-f6a1c72a1116`

### Método 2: Usando la API de Notion

```bash
# Listar todas las bases de datos compartidas con tu integración
curl 'https://api.notion.com/v1/search' \
  -H 'Authorization: Bearer TU_API_KEY' \
  -H 'Notion-Version: 2022-06-28' \
  -H 'Content-Type: application/json' \
  --data '{"filter":{"value":"database","property":"object"}}'
```

---

## 🔗 Paso 3: Compartir la Base de Datos con la Integración

**⚠️ ESTE ES EL PASO MÁS IMPORTANTE**

1. **Abre tu base de datos** "WebCode Blog" en Notion
2. **Click en los tres puntos (...)** en la esquina superior derecha
3. **Selecciona "Add connections"** o "Conectar a"
4. **Busca tu integración** "WebCode Blog" en la lista
5. **Click en la integración** para añadirla
6. **Confirma** el acceso

### Visual:
```
┌─────────────────────────────────────┐
│  WebCode Blog Database              │
│  ┌──────────────┐                   │
│  │ ...  (menú)  │ ← Click aquí      │
│  └──────────────┘                   │
│     │                                │
│     ├─ Add connections               │ ← Selecciona esto
│     ├─ Export                        │
│     ├─ Delete                        │
│     └─ ...                           │
└─────────────────────────────────────┘
```

---

## 🔐 Paso 4: Configurar Variables de Entorno

1. **Crea o edita `.env.local`** en la raíz del proyecto:

```bash
# .env.local

# Notion Integration
NOTION_API_KEY=secret_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NOTION_DATABASE_ID=2898237e-a3b3-80cd-a403-f6a1c72a1116
```

2. **Verifica el formato:**
   - ✅ `NOTION_API_KEY` debe empezar con `secret_`
   - ✅ `NOTION_DATABASE_ID` debe tener el formato UUID con guiones
   - ✅ No uses comillas alrededor de los valores

---

## ✅ Paso 5: Verificar la Configuración

### Opción A: Usando el servidor de desarrollo

```bash
# Reinicia el servidor
pnpm dev

# Abre el navegador en:
http://localhost:3000/blog
```

### Opción B: Script de prueba manual

Crea un archivo `test-notion-connection.js`:

```javascript
// test-notion-connection.js
require('dotenv').config({ path: '.env.local' });
const { Client } = require('@notionhq/client');

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function testConnection() {
  try {
    console.log('🔍 Probando conexión con Notion...\n');
    
    // Probar query a la base de datos
    const response = await notion.dataSources.query({
      data_source_id: process.env.NOTION_DATABASE_ID,
      page_size: 1,
    });
    
    console.log('✅ Conexión exitosa!');
    console.log(`📊 Total de páginas encontradas: ${response.results.length}`);
    
    if (response.results.length > 0) {
      const page = response.results[0];
      console.log('\n📄 Primera página:');
      console.log(`   ID: ${page.id}`);
      console.log(`   Creada: ${page.created_time}`);
    }
    
  } catch (error) {
    console.error('❌ Error de conexión:');
    console.error(`   Código: ${error.code}`);
    console.error(`   Mensaje: ${error.message}`);
    
    if (error.code === 'object_not_found') {
      console.log('\n💡 Solución:');
      console.log('   1. Abre tu base de datos en Notion');
      console.log('   2. Click en "..." → "Add connections"');
      console.log('   3. Selecciona tu integración');
    }
  }
}

testConnection();
```

Ejecuta:
```bash
node test-notion-connection.js
```

---

## 🐛 Solución de Problemas Comunes

### Error: "object_not_found"
**Causa:** La base de datos no está compartida con la integración.

**Solución:**
1. Ve a tu base de datos en Notion
2. Click en "..." → "Add connections"
3. Añade tu integración

### Error: "unauthorized"
**Causa:** API Key inválido o mal configurado.

**Solución:**
1. Verifica que `NOTION_API_KEY` empiece con `secret_`
2. Regenera el token desde https://www.notion.so/my-integrations
3. Actualiza `.env.local` con el nuevo token
4. Reinicia el servidor

### Error: "invalid_request_url"
**Causa:** Database ID con formato incorrecto.

**Solución:**
1. Verifica que el ID tenga el formato: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
2. No uses la URL completa, solo el ID
3. Asegúrate de que los guiones estén en los lugares correctos

### Error: "rate_limited"
**Causa:** Demasiadas peticiones a la API de Notion.

**Solución:**
1. Espera unos minutos antes de reintentar
2. Implementa caching en tu aplicación
3. Reduce la frecuencia de `revalidate` en Next.js

---

## 📚 Estructura de la Base de Datos Requerida

Tu base de datos "WebCode Blog" debe tener las siguientes propiedades:

### Propiedades Obligatorias:

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `title` | Title | Título del post (campo principal) |
| `published` | Checkbox | Estado de publicación |
| `date` | Date | Fecha de publicación |
| `slug` | Text | URL amigable del post |

### Propiedades Opcionales:

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `excerpt` | Text | Resumen del artículo |
| `coverImage` | Files & media | Imagen de portada |
| `tags` | Multi-select | Categorías/tags del post |
| `author` | Person | Autor del artículo |
| `readTime` | Number | Tiempo de lectura (se calcula auto) |

### Ejemplo de Configuración:

```
┌─────────────────────────────────────────────────────────┐
│  WebCode Blog                                           │
├──────────┬──────────┬──────┬────────┬──────────────────┤
│ title    │ published│ date │ slug   │ tags             │
│ (Title)  │ (Checkbox)│(Date)│ (Text) │ (Multi-select)   │
├──────────┼──────────┼──────┼────────┼──────────────────┤
│ Post 1   │    ☑     │ Hoy  │ post-1 │ Next.js, React   │
│ Post 2   │    ☐     │ Ayer │ post-2 │ TypeScript       │
└──────────┴──────────┴──────┴────────┴──────────────────┘
```

---

## 🔄 Revalidación y Cache

El blog usa ISR (Incremental Static Regeneration) de Next.js:

```typescript
// En src/app/blog/page.tsx
export const revalidate = 3600; // Revalidar cada 1 hora
```

Para forzar una actualización inmediata:
1. Reinicia el servidor de desarrollo
2. Borra la carpeta `.next`
3. Ejecuta `pnpm dev` nuevamente

---

## 📞 Soporte

Si sigues teniendo problemas:

1. **Revisa los logs** en la terminal del servidor
2. **Consulta la documentación** de Notion API: https://developers.notion.com/
3. **Verifica el archivo** `docs/BLOG-NOTION-DEVTOOLS-AUDIT.md`

---

## ✨ Checklist Final

Antes de continuar, asegúrate de que:

- [ ] Has creado la integración en https://www.notion.so/my-integrations
- [ ] Tienes el API Key y empieza con `secret_`
- [ ] Has obtenido el Database ID de tu base de datos
- [ ] Has compartido la base de datos con tu integración
- [ ] Has configurado `.env.local` con ambas variables
- [ ] Has reiniciado el servidor de desarrollo
- [ ] La página `/blog` carga sin errores

---

**¡Listo!** Tu blog ya debería estar conectado con Notion y mostrando los posts correctamente.
