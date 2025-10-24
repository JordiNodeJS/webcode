# 🌐 Configuración del Dominio Personalizado webcode.es en Netlify

**Problema**: El sitio funciona en `https://webcode-bcn.netlify.app/` pero no en `webcode.es`

## 📋 Diagnóstico Rápido

### 1️⃣ Verificar Estado Actual

**En el Dashboard de Netlify:**
1. Ve a https://app.netlify.com/sites/webcode-bcn/settings/domain
2. Verifica la sección **"Custom domains"**
3. Comprueba si `webcode.es` aparece listado y su estado

**Estados posibles:**
- ✅ **Verified** - Dominio configurado correctamente
- ⚠️ **Awaiting External DNS** - DNS no apunta a Netlify
- ❌ **Not added** - Dominio no configurado

---

## 🔧 Solución Paso a Paso

### Opción A: Configuración con Netlify DNS (Recomendado)

**Ventajas**: Configuración automática, SSL gratis, mejor rendimiento

#### Paso 1: Configurar Netlify DNS

1. En el dashboard de Netlify: **Settings → Domain management → Domains**
2. Haz clic en **"Add custom domain"**
3. Introduce: `webcode.es`
4. Netlify te mostrará los **nameservers** que debes configurar

**Nameservers típicos de Netlify:**
```
dns1.p0X.nsone.net
dns2.p0X.nsone.net
dns3.p0X.nsone.net
dns4.p0X.nsone.net
```

#### Paso 2: Actualizar Nameservers en tu Registrador

**En el panel de tu registrador de dominios** (ejemplo: GoDaddy, Namecheap, OVH, etc.):

1. Busca la sección **"Nameservers"** o **"DNS"**
2. Cambia de nameservers personalizados
3. Pega los 4 nameservers que Netlify te proporcionó
4. Guarda los cambios

⏱️ **Tiempo de propagación**: 24-48 horas (aunque suele ser más rápido)

#### Paso 3: Configurar www (Opcional pero Recomendado)

1. En Netlify: **Domain settings → Add domain alias**
2. Añade: `www.webcode.es`
3. Netlify configurará automáticamente el redirect `www → no-www`

---

### Opción B: Configuración con DNS Externo

**Si prefieres mantener tu DNS actual** (no recomendado para principiantes):

#### Registros DNS a Configurar

En el panel DNS de tu registrador, añade estos registros:

**Para el dominio raíz (webcode.es):**
```
Type: A
Name: @ (o vacío)
Value: 75.2.60.5
TTL: 3600
```

**Para www.webcode.es:**
```
Type: CNAME
Name: www
Value: webcode-bcn.netlify.app
TTL: 3600
```

⚠️ **Nota**: La IP puede variar. Verifica la IP actual en la configuración de Netlify.

#### Verificación de Propagación DNS

Usa estas herramientas para verificar:
```bash
# Desde terminal
nslookup webcode.es
dig webcode.es

# Online
https://www.whatsmydns.net/#A/webcode.es
https://dnschecker.org/#A/webcode.es
```

---

## 🔐 Configuración SSL/HTTPS

### Habilitar HTTPS Automático

1. Ve a **Settings → Domain management → HTTPS**
2. Verifica que **"SSL/TLS certificate"** esté habilitado
3. Si no está activo:
   - Haz clic en **"Verify DNS configuration"**
   - Luego en **"Provision certificate"**

⏱️ **Tiempo de provisión**: 5-30 minutos

### Force HTTPS (Obligatorio para Seguridad)

1. En la misma sección **HTTPS**
2. Activa **"Force HTTPS"**
3. Esto redirigirá automáticamente `http://` → `https://`

---

## ✅ Verificación Final

### Checklist Completo

- [ ] Dominio añadido en Netlify Dashboard
- [ ] Estado del dominio: **"Verified"** o **"Netlify DNS"**
- [ ] DNS propagado correctamente (verificado con nslookup/dig)
- [ ] Certificado SSL activo (candado verde en navegador)
- [ ] Force HTTPS habilitado
- [ ] Redirect www configurado (opcional)
- [ ] Sitio accesible desde `https://webcode.es`
- [ ] Sitio accesible desde `https://www.webcode.es` (si configurado)

### Tests Rápidos

**Desde navegador:**
```
✅ https://webcode.es → Debe cargar el sitio
✅ https://www.webcode.es → Debe cargar el sitio (o redirect)
✅ http://webcode.es → Debe redirigir a https://webcode.es
❌ webcode-bcn.netlify.app → Opcional: configurar redirect
```

**Verificar Headers de Seguridad:**
```bash
curl -I https://webcode.es
```

Deberías ver headers como:
```
strict-transport-security: max-age=63072000
x-frame-options: DENY
x-content-type-options: nosniff
```

---

## 🚨 Problemas Comunes y Soluciones

### ❌ Error: "Domain not found" o 404

**Causa**: DNS no propagado o mal configurado

**Solución**:
1. Verifica los nameservers/DNS records
2. Espera 24-48h para propagación completa
3. Limpia caché DNS local:
   ```bash
   # Windows
   ipconfig /flushdns
   
   # macOS
   sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
   
   # Linux
   sudo systemd-resolve --flush-caches
   ```

### ❌ Error: "Certificate provisioning failed"

**Causa**: DNS no verificado o configuración incorrecta

**Solución**:
1. Ve a **Domain settings**
2. Haz clic en **"Verify DNS configuration"**
3. Si falla, revisa que los registros DNS estén correctos
4. Espera 15-30 minutos y vuelve a intentar

### ❌ Warning: "Mixed content"

**Causa**: Algunos recursos se cargan por HTTP en vez de HTTPS

**Solución**:
- Ya configurado en `next.config.ts` con headers de seguridad
- Verifica que todas las URLs en el código usen `https://`

### ❌ Sitio lento después de configurar dominio

**Causa**: Puede ser propagación DNS o caché del navegador

**Solución**:
1. Limpia caché del navegador (Ctrl + Shift + Delete)
2. Prueba en modo incógnito
3. Espera 24h para propagación completa

---

## 📊 Configuración Actual del Proyecto

### next.config.ts

Ya tenemos configurado el dominio en la whitelist de imágenes:

```typescript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "webcode.es",
      port: "",
      pathname: "/**",
    },
    // ... otros dominios
  ],
}
```

### netlify.toml

La configuración base ya está lista. Si necesitas configurar redirects del dominio antiguo:

```toml
# Opcional: Redirect desde netlify.app a dominio personalizado
[[redirects]]
  from = "https://webcode-bcn.netlify.app/*"
  to = "https://webcode.es/:splat"
  status = 301
  force = true
```

---

## 🎯 Próximos Pasos Recomendados

### Después de Configurar el Dominio:

1. **Actualizar Google Search Console**
   - Añade `https://webcode.es` como nueva propiedad
   - Verifica la propiedad con DNS TXT record

2. **Actualizar Google Analytics**
   - Actualiza la URL del sitio web en la configuración

3. **Actualizar redes sociales**
   - Actualiza enlaces en perfiles de redes sociales
   - Verifica Open Graph tags con: https://www.opengraph.xyz/

4. **Configurar Email con Dominio Personalizado**
   - Añade registros MX si quieres correos @webcode.es
   - Ejemplo: Google Workspace, Microsoft 365, etc.

5. **Monitoreo y Analytics**
   - Configura alertas de uptime (UptimeRobot, Pingdom)
   - Monitorea Core Web Vitals en producción

---

## 📞 Soporte Adicional

### Recursos Útiles:

- **Documentación oficial**: https://docs.netlify.com/domains-https/custom-domains/
- **Netlify Support**: https://answers.netlify.com/
- **Status Page**: https://www.netlifystatus.com/

### Comandos CLI de Netlify (Opcional):

```bash
# Instalar CLI
pnpm add -g netlify-cli

# Login
netlify login

# Ver configuración de dominios
netlify sites:list

# Ver detalles del sitio
netlify status
```

---

## ✨ Verificación de Producción

Una vez configurado el dominio, ejecuta estos tests:

```bash
# Performance test
pnpm run lighthouse https://webcode.es

# Security headers
curl -I https://webcode.es | grep -i "x-frame\|strict-transport\|content-security"

# SSL certificate
openssl s_client -connect webcode.es:443 -servername webcode.es
```

---

**Última actualización**: 24 de octubre de 2025  
**Versión**: 1.0  
**Proyecto**: WEBCODE - Soluciones Web para Barcelona
