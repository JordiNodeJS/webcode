# ✅ Checklist de Configuración del Dominio webcode.es

**Fecha**: ******\_\_\_******  
**Responsable**: ******\_\_\_******

---

## 📋 Pre-verificación

- [ ] Acceso al dashboard de Netlify
- [ ] Credenciales del registrador del dominio (si es necesario)
- [ ] Git Bash o terminal disponible para verificaciones

---

## 🔍 Paso 1: Diagnóstico Inicial

- [ ] Ejecutado: `./scripts/verify-domain.sh`
- [ ] Revisado: `DOMAIN-DIAGNOSTIC-REPORT.md`
- [ ] Leído: `NETLIFY-DOMAIN-SETUP.md`

**Resultado**:

```
webcode.es responde: ☐ SÍ  ☐ NO
SSL válido: ☐ SÍ  ☐ NO
```

---

## 🌐 Paso 2: Verificar DNS (Ya Configurado)

- [ ] DNS de webcode.es apunta a Netlify (99.83.190.102, 75.2.60.5)
- [ ] CNAME de www.webcode.es apunta a webcode-bcn.netlify.app
- [ ] Verificado con `nslookup webcode.es`

**✅ Este paso ya está completo según el diagnóstico**

---

## 🎯 Paso 3: Configurar Dominio en Netlify

### 3.1 Acceder al Dashboard

- [ ] Ir a: https://app.netlify.com/sites/webcode-bcn/settings/domain
- [ ] Login exitoso

### 3.2 Verificar Custom Domains

**¿Aparece webcode.es en la lista?**

☐ **SÍ** → Ir a Paso 3.3  
☐ **NO** → Continuar con 3.2.1

#### 3.2.1 Añadir Dominio

- [ ] Click en "Add custom domain"
- [ ] Introducir: `webcode.es`
- [ ] Click en "Verify"
- [ ] Netlify confirma que el DNS está configurado
- [ ] Click en "Add domain"

**Estado del dominio**: ******\_\_\_******

### 3.3 Verificar Estado del Dominio

**Estado mostrado en Netlify**:

☐ Verified  
☐ Awaiting External DNS  
☐ Error (especificar): ******\_\_\_******

---

## 🔐 Paso 4: Configurar SSL/HTTPS

### 4.1 Acceder a HTTPS Settings

- [ ] Ir a: https://app.netlify.com/sites/webcode-bcn/settings/domain#https
- [ ] Sección "HTTPS" visible

### 4.2 Verificar Certificado Existente

**¿Hay un certificado SSL activo?**

☐ **SÍ** → Ir a Paso 4.4  
☐ **NO** → Continuar con 4.3

### 4.3 Provisionar Certificado SSL

- [ ] Click en "Verify DNS configuration"
- [ ] Esperar confirmación (puede tardar 1-2 minutos)
- [ ] Click en "Provision certificate"
- [ ] Esperar provisión (5-30 minutos)

**Hora de inicio**: ******\_\_\_******  
**Hora de finalización**: ******\_\_\_******

### 4.4 Activar Force HTTPS

- [ ] Localizar opción "Force HTTPS"
- [ ] Activar el toggle
- [ ] Guardar cambios

---

## ✅ Paso 5: Configurar www (Opcional)

### 5.1 Añadir Alias

- [ ] En Domain settings, click "Add domain alias"
- [ ] Introducir: `www.webcode.es`
- [ ] Netlify configurará el redirect automáticamente

### 5.2 Verificar Redirect

**Tipo de redirect configurado**:

☐ www → no-www (webcode.es)  
☐ no-www → www (www.webcode.es)  
☐ Otro: ******\_\_\_******

---

## 🧪 Paso 6: Verificación Post-Configuración

### 6.1 Esperar Propagación

- [ ] Esperar 15-30 minutos
- [ ] Tiempo de espera: Desde ******\_\_\_****** hasta ******\_\_\_******

### 6.2 Ejecutar Script de Verificación

- [ ] Ejecutado: `./scripts/verify-domain.sh`
- [ ] Captura de pantalla guardada (opcional)

**Resultados**:

```
✅ DNS resuelve correctamente
✅ HTTPS responde (200 OK)
✅ Certificado SSL válido
✅ Headers de seguridad presentes
```

### 6.3 Tests Manuales en Navegador

**Modo Incógnito** (para evitar caché):

- [ ] https://webcode.es → Carga el sitio
- [ ] https://www.webcode.es → Carga o redirige correctamente
- [ ] http://webcode.es → Redirige a HTTPS
- [ ] Candado verde visible en barra de direcciones

### 6.4 Verificación de Contenido

- [ ] Hero section carga correctamente
- [ ] Imágenes se muestran
- [ ] Navegación funciona
- [ ] Formularios operativos
- [ ] Blog accesible

---

## 🔧 Paso 7: Configuración Avanzada (Opcional)

### 7.1 Activar Redirects de .netlify.app

- [ ] Editar `netlify.toml`
- [ ] Descomentar sección de redirects
- [ ] Commit y push cambios
- [ ] Esperar nuevo deploy

### 7.2 Actualizar Servicios Externos

- [ ] Google Search Console → Añadir propiedad webcode.es
- [ ] Google Analytics → Actualizar URL del sitio
- [ ] Redes sociales → Actualizar enlaces

---

## 📊 Paso 8: Monitoreo Post-Deploy

### 8.1 Primera Semana

- [ ] Día 1: Verificar accesibilidad cada 6 horas
- [ ] Día 2: Test de performance con Lighthouse
- [ ] Día 3: Verificar analytics funcionando
- [ ] Día 7: Revisar logs de errores en Netlify

### 8.2 Configurar Alertas

- [ ] Configurar uptime monitoring (ej: UptimeRobot)
- [ ] Email de alerta configurado
- [ ] Umbral de alerta definido

---

## 🆘 Troubleshooting

### Si webcode.es no responde después de 30 minutos:

- [ ] Verificar logs de Netlify Deploy
- [ ] Revisar DNS nuevamente con `nslookup`
- [ ] Limpiar caché DNS local: `ipconfig /flushdns` (Windows)
- [ ] Probar desde otro dispositivo/red
- [ ] Contactar soporte Netlify

### Si SSL no se provisiona:

- [ ] Verificar que DNS esté correctamente configurado
- [ ] Esperar hasta 1 hora
- [ ] Eliminar y volver a añadir el dominio
- [ ] Revisar que no haya CAA records bloqueando Let's Encrypt

### Si aparecen errores de Mixed Content:

- [ ] Verificar que todas las URLs usen HTTPS
- [ ] Revisar console del navegador para errores
- [ ] Verificar headers de seguridad en `next.config.ts`

---

## ✅ Verificación Final

### Tests Completos

- [ ] Performance test ejecutado
  ```bash
  npm run lighthouse https://webcode.es
  ```
- [ ] Score Lighthouse: **\_\_\_** / 100

- [ ] Security headers verificados

  ```bash
  curl -I https://webcode.es | grep -i "strict-transport\|x-frame\|x-content"
  ```

- [ ] SSL rating verificado
  - URL: https://www.ssllabs.com/ssltest/analyze.html?d=webcode.es
  - Rating: **\_\_\_**

---

## 📝 Notas y Observaciones

```
Fecha: _______________
Duración total: _______________
Problemas encontrados:




Soluciones aplicadas:




```

---

## 🎉 Confirmación Final

- [ ] ✅ Sitio accesible desde https://webcode.es
- [ ] ✅ SSL/HTTPS funcionando correctamente
- [ ] ✅ Headers de seguridad configurados
- [ ] ✅ Performance óptimo (>90)
- [ ] ✅ Analytics y monitoreo activos
- [ ] ✅ Documentación actualizada

**Firma**: ******\_\_\_******  
**Fecha de completación**: ******\_\_\_******

---

**Documentos relacionados**:

- DOMAIN-DIAGNOSTIC-REPORT.md
- NETLIFY-DOMAIN-SETUP.md
- DOMAIN-ISSUE-RESOLUTION.md
- README-DOMAIN-FIX.md
