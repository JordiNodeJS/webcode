# 🚨 PROBLEMA: Dominio webcode.es No Funciona en Netlify

## 📝 Resumen del Problema

**Estado actual:**

- ✅ El sitio funciona correctamente en: `https://webcode-bcn.netlify.app/`
- ❌ El sitio NO funciona en: `https://webcode.es`

**Proyecto afectado:** webcode-bcn (Netlify)  
**Dominio personalizado:** webcode.es  
**Fecha:** 24 de octubre de 2025

---

## 🔍 Diagnóstico

El problema se debe a una **configuración incompleta del dominio personalizado** en Netlify. Aunque el proyecto está desplegado correctamente, el dominio `webcode.es` no está conectado o configurado adecuadamente.

### Posibles causas:

1. ⚠️ **DNS no configurado** - El dominio no apunta a los servidores de Netlify
2. ⚠️ **Dominio no añadido en Netlify** - No está configurado en el dashboard
3. ⚠️ **SSL no provisionado** - Certificado HTTPS no está activo
4. ⚠️ **Propagación DNS pendiente** - Cambios DNS aún propagándose (24-48h)

---

## ✅ Solución Implementada

He creado una **guía completa paso a paso** para resolver el problema:

### 📄 Archivos Creados

1. **`NETLIFY-DOMAIN-SETUP.md`** (Raíz del proyecto)
   - Guía completa de configuración
   - Instrucciones paso a paso
   - Troubleshooting de problemas comunes
   - Checklist de verificación

2. **`scripts/verify-domain.sh`** (Linux/macOS/Git Bash)
   - Script automático de verificación
   - Comprueba DNS, HTTPS, SSL y headers
   - Proporciona diagnóstico detallado

3. **`scripts/verify-domain.bat`** (Windows)
   - Versión Windows del script anterior
   - Misma funcionalidad adaptada

### 🔧 Configuración Actualizada

**`netlify.toml`** - Añadida sección opcional para:

- Redirect automático de `.netlify.app` → `webcode.es`
- Redirect de `www.webcode.es` → `webcode.es`

**`next.config.ts`** - Ya incluye:

- ✅ Dominio `webcode.es` en whitelist de imágenes
- ✅ Headers de seguridad optimizados
- ✅ Configuración para deployment en Netlify

---

## 🎯 Pasos a Seguir (Por Orden)

### 1️⃣ **Acceder al Dashboard de Netlify**

```
https://app.netlify.com/sites/webcode-bcn/settings/domain
```

### 2️⃣ **Verificar Estado del Dominio**

Comprueba si `webcode.es` aparece en "Custom domains" y su estado:

- ✅ **Verified** → Configurado correctamente
- ⚠️ **Awaiting External DNS** → DNS no configurado
- ❌ **Not listed** → Dominio no añadido

### 3️⃣ **Configurar el Dominio**

**OPCIÓN A - Netlify DNS (Recomendado):**

1. Añade `webcode.es` como dominio personalizado
2. Netlify te dará 4 nameservers
3. Configura esos nameservers en tu registrador
4. Espera 24-48h para propagación

**OPCIÓN B - DNS Externo:**

```
Tipo: A
Nombre: @
Valor: 75.2.60.5 (verificar IP actual en Netlify)

Tipo: CNAME
Nombre: www
Valor: webcode-bcn.netlify.app
```

### 4️⃣ **Provisionar SSL**

1. Ve a **Settings → Domain management → HTTPS**
2. Haz clic en **"Verify DNS configuration"**
3. Luego en **"Provision certificate"**
4. Activa **"Force HTTPS"**

### 5️⃣ **Verificar Configuración**

Ejecuta el script de verificación:

```bash
# Linux/macOS/Git Bash
./scripts/verify-domain.sh

# Windows
scripts\verify-domain.bat
```

### 6️⃣ **Activar Redirects (Opcional)**

Una vez funcionando, descomenta en `netlify.toml`:

```toml
[[redirects]]
  from = "https://webcode-bcn.netlify.app/*"
  to = "https://webcode.es/:splat"
  status = 301
  force = true
```

---

## ⏱️ Tiempos Estimados

| Acción                        | Tiempo             |
| ----------------------------- | ------------------ |
| Configurar dominio en Netlify | 5-10 minutos       |
| Actualizar DNS en registrador | 5 minutos          |
| Propagación DNS               | **24-48 horas** ⚠️ |
| Provisión de certificado SSL  | 5-30 minutos       |
| **TOTAL**                     | **1-2 días**       |

---

## 🧪 Verificación Online

Mientras esperas la propagación, usa estas herramientas:

### DNS Propagation

```
https://www.whatsmydns.net/#A/webcode.es
```

### SSL Certificate

```
https://www.ssllabs.com/ssltest/analyze.html?d=webcode.es
```

### Security Headers

```
https://securityheaders.com/?q=https://webcode.es
```

---

## 📚 Documentación Relacionada

- **Guía completa**: `NETLIFY-DOMAIN-SETUP.md`
- **Configuración Netlify**: `netlify.toml`
- **Configuración Next.js**: `next.config.ts`
- **Scripts de verificación**: `scripts/verify-domain.*`
- **Documentación Netlify**: https://docs.netlify.com/domains-https/custom-domains/

---

## ✅ Checklist Final

Una vez configurado todo:

- [ ] Dominio `webcode.es` añadido en Netlify
- [ ] DNS configurado (nameservers o registros A/CNAME)
- [ ] DNS propagado (verificado con whatsmydns.net)
- [ ] Certificado SSL provisionado
- [ ] Force HTTPS habilitado
- [ ] `https://webcode.es` carga correctamente
- [ ] `https://www.webcode.es` funciona o redirige
- [ ] Headers de seguridad verificados
- [ ] Redirect de `.netlify.app` activado (opcional)

---

## 🆘 Soporte

Si después de 48h el problema persiste:

1. **Verifica los logs de Netlify**: Deploy logs en el dashboard
2. **Revisa DNS**: `nslookup webcode.es` debe resolver a Netlify
3. **Contacta soporte Netlify**: https://answers.netlify.com/
4. **Revisa status**: https://www.netlifystatus.com/

---

**Última actualización**: 24 de octubre de 2025  
**Estado**: Guía de configuración lista - Pendiente de aplicación  
**Próximo paso**: Configurar dominio en Netlify Dashboard
