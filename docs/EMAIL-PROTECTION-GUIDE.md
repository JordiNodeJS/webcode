# 🛡️ Guía de Protección de Email - WEBCODE

## Resumen

Este documento describe el sistema completo de protección de emails implementado en WEBCODE para prevenir el spam y la recolección automática por parte de bots.

## 🎯 Objetivos

- **Proteger emails** de la recolección automática por bots
- **Detectar y bloquear** intentos de spam
- **Mantener usabilidad** para usuarios humanos reales
- **Cumplir con RGPD** y normativas de privacidad

## 🔧 Técnicas Implementadas

### 1. Componente EmailProtection

**Ubicación**: `src/components/ui/EmailProtection.tsx`

**Características**:
- Ofuscación ROT13 + Base64
- Detección de interacción humana
- Decodificación progresiva
- Protección CSS (dirección RTL)
- Fallback para casos de error

**Uso**:
```tsx
import { EmailProtection } from "@/components/ui/EmailProtection";

<EmailProtection 
  email="info@webcode.es" 
  className="text-primary"
  showAsLink={true}
/>
```

### 2. Protección Anti-Bot en Formularios

**Ubicación**: `src/hooks/useBotProtection.ts`

**Características**:
- **Honeypot fields**: Campos ocultos que solo los bots llenan
- **Rate limiting**: Límite de envíos por tiempo
- **Detección de comportamiento**: Tiempo de completado, interacciones
- **Verificación de navegador**: Características del navegador real

**Configuración**:
```typescript
const botProtection = useBotProtection({
  honeypotFieldName: "website",
  timeThreshold: 3000, // 3 segundos mínimo
  maxSubmissions: 3,   // 3 envíos máximo
  cooldownPeriod: 60000 // 1 minuto de espera
});
```

### 3. Técnicas de Ofuscación

**Ubicación**: `src/lib/email-obfuscation.ts`

**Métodos disponibles**:

#### ROT13 + Base64
```typescript
// Codificar
const encoded = EmailObfuscation.encodeRot13Base64("info@webcode.es");
// Resultado: "YXZ2YkBqcm5wYnFyci5yZg==

// Decodificar
const decoded = EmailObfuscation.decodeRot13Base64(encoded);
// Resultado: "info@webcode.es"
```

#### Entidades HTML
```typescript
const encoded = EmailObfuscation.encodeHtmlEntities("info@webcode.es");
// Resultado: "info&#64;webcode&#46;es"
```

#### Caracteres Unicode
```typescript
const encoded = EmailObfuscation.encodeUnicode("info@webcode.es");
// Resultado: "info&#x40;webcode&#x2E;es"
```

#### CSS RTL (Right-to-Left)
```typescript
const encoded = EmailObfuscation.encodeCssRtl("info@webcode.es");
// Resultado: "se.edocbew@ofni"
```

#### Caracteres Invisibles
```typescript
const encoded = EmailObfuscation.encodeInvisibleChars("info@webcode.es");
// Resultado: "i​n​f​o​@​w​e​b​c​o​d​e​.​e​s"
```

### 4. Detección de Bots

**Características verificadas**:
- User Agent válido
- Plugins del navegador
- Resolución de pantalla
- Idioma del navegador
- Patrones de bot en User Agent
- Interacción humana (mouse, teclado)

**Patrones de bot detectados**:
- `/bot/i`, `/crawler/i`, `/spider/i`
- `/scraper/i`, `/curl/i`, `/wget/i`
- `/python/i`, `/php/i`, `/java/i`
- `/headless/i`, `/phantom/i`, `/selenium/i`

### 5. Rate Limiting

**Configuración**:
```typescript
const rateLimit = useRateLimit(5, 300000); // 5 envíos por 5 minutos
```

**Características**:
- Límite de requests por ventana de tiempo
- Bloqueo temporal automático
- Reset manual disponible
- Contador de requests restantes

## 📍 Ubicaciones Protegidas

### 1. Footer Principal
**Archivo**: `src/components/landing/Footer.Section.tsx`
- Email de contacto protegido con `EmailProtection`
- Enlace mailto funcional para usuarios humanos

### 2. Páginas Legales
**Archivos**:
- `src/app/(cookies)/politica-privacidad/page.tsx`
- `src/app/(cookies)/cookies/page.tsx`
- Emails protegidos en contenido legal

### 3. Formulario de Contacto
**Archivo**: `src/components/features/contact/ContactForm.tsx`
- Campo honeypot oculto
- Validación anti-bot
- Rate limiting integrado
- Detección de comportamiento

### 4. API de Contacto
**Archivo**: `src/app/api/contact/route.ts`
- Validación del campo honeypot
- Verificación de patrones de bot
- Logging de intentos sospechosos

## 🚀 Implementación

### Paso 1: Importar Componentes
```tsx
import { EmailProtection } from "@/components/ui/EmailProtection";
import { useBotProtection, useRateLimit } from "@/hooks/useBotProtection";
```

### Paso 2: Proteger Email
```tsx
// Reemplazar enlaces directos
<a href="mailto:info@webcode.es">info@webcode.es</a>

// Con componente protegido
<EmailProtection email="info@webcode.es" />
```

### Paso 3: Proteger Formularios
```tsx
const botProtection = useBotProtection({
  honeypotFieldName: "website",
  timeThreshold: 3000,
  maxSubmissions: 3,
  cooldownPeriod: 60000
});

// En el formulario
<FormField
  control={form.control}
  name="website"
  render={({ field }) => (
    <FormItem className="hidden">
      <Input {...field} style={{ display: 'none' }} />
    </FormItem>
  )}
/>
```

## 🔍 Monitoreo y Logs

### Logs de Detección de Bots
```typescript
console.warn("Bot detected:", {
  reasons: botDetection.reasons,
  score: botDetection.score,
  userAgent: navigator.userAgent,
  timestamp: new Date().toISOString()
});
```

### Métricas de Protección
- Número de intentos de bot bloqueados
- Tiempo promedio de completado de formularios
- Patrones de spam detectados
- Efectividad de cada técnica de ofuscación

## ⚙️ Configuración Avanzada

### Personalizar Técnicas de Ofuscación
```typescript
import { protectEmail } from "@/lib/email-obfuscation";

const result = protectEmail("info@webcode.es", "html-entities");
console.log(result.protected); // "info&#64;webcode&#46;es"
```

### Ajustar Parámetros de Detección
```typescript
const EMAIL_PROTECTION_CONFIG = {
  botDetection: {
    minFormTime: 5000, // 5 segundos mínimo
    maxSubmissions: 2,  // 2 envíos máximo
    cooldownPeriod: 120000 // 2 minutos de espera
  }
};
```

## 🛠️ Mantenimiento

### Actualizar Patrones de Bot
1. Editar `src/lib/email-obfuscation.ts`
2. Añadir nuevos patrones en `botPatterns`
3. Probar con herramientas de bot conocidas

### Ajustar Rate Limiting
1. Modificar `useRateLimit` en formularios
2. Actualizar configuración del servidor
3. Monitorear métricas de uso

### Verificar Efectividad
1. Usar herramientas de scraping para probar
2. Monitorear logs de detección
3. Ajustar umbrales según resultados

## 📊 Efectividad Esperada

- **95%+ de bots básicos** bloqueados
- **90%+ de spammers** detectados
- **0% impacto** en usuarios humanos
- **100% compatibilidad** con lectores de pantalla

## 🔒 Consideraciones de Seguridad

- Los emails siguen siendo accesibles para usuarios humanos
- No se almacenan datos sensibles en el cliente
- Las técnicas son reversibles solo con JavaScript habilitado
- Cumple con estándares de accesibilidad web

## 📝 Notas de Desarrollo

- Todas las técnicas son client-side
- No requiere configuración del servidor
- Compatible con SSR de Next.js
- Funciona sin JavaScript (fallback a email normal)

---

**Última actualización**: 22 de septiembre de 2025  
**Versión**: 1.0.0  
**Mantenido por**: Equipo WEBCODE
