# ✅ Checklist de Verificación Pre-Deploy a Netlify

**Proyecto**: WEBCODE  
**Destino**: Netlify  
**Fecha**: ******\_******

---

## 📋 FASE 1: Preparación Local (Completar ANTES de deploy)

### Verificación de Build

- [ ] **Build local exitoso**

  ```bash
  pnpm install
  pnpm build
  ```

  - Sin errores de TypeScript
  - Sin errores de ESLint
  - Build completa en menos de 5 minutos

- [ ] **Servidor local funciona**
  ```bash
  pnpm start
  ```

  - Sitio carga en http://localhost:3000
  - Navegación funciona correctamente
  - No hay errores en consola del navegador

### Archivos de Configuración

- [ ] **`netlify.toml` presente** en la raíz del proyecto
  - Build command: `pnpm build`
  - Plugin `@netlify/plugin-nextjs` configurado
  - Redirects migrados desde next.config.ts
  - Headers de seguridad configurados

- [ ] **`next.config.ts` actualizado**
  - `output: "standalone"` con detección de Netlify
  - `**.netlify.app` añadido a remotePatterns
  - Configuración compatible con Netlify

- [ ] **`.env.netlify.example` creado**
  - Template con todas las variables necesarias
  - Instrucciones de configuración incluidas

- [ ] **Variables de entorno preparadas**
  - `NOTION_API_KEY` (si usas blog)
  - `NOTION_DATABASE_ID` (si usas blog)
  - `RESEND_API_KEY` (si usas emails)
  - Valores listos para copiar a Netlify Dashboard

### Control de Versiones

- [ ] **Todos los cambios commiteados**

  ```bash
  git status
  ```

  - No hay archivos sin commit
  - Mensaje de commit descriptivo

- [ ] **Push a repositorio remoto**
  ```bash
  git push origin main
  ```

  - Cambios sincronizados con GitHub/GitLab/Bitbucket

### Documentación

- [ ] **Guía de deployment leída**
  - `docs/NETLIFY-DEPLOYMENT-GUIDE.md` revisada
  - Proceso comprendido
  - Variables de entorno identificadas

---

## 📋 FASE 2: Configuración en Netlify

### Cuenta y Repositorio

- [ ] **Cuenta de Netlify creada**
  - Registro en https://app.netlify.com/signup
  - Preferiblemente con GitHub

- [ ] **Repositorio conectado**
  - Site creado en Netlify
  - Repositorio `webcode` seleccionado
  - Branch `main` configurado como producción

### Build Settings

- [ ] **Build settings verificados**
  - Base directory: (vacío)
  - Build command: `pnpm build`
  - Publish directory: `.next`
  - Netlify lee automáticamente de `netlify.toml`

### Variables de Entorno

**Variables Obligatorias:**

- [ ] `NODE_VERSION` = `20`
- [ ] `PNPM_VERSION` = `9`
- [ ] `NETLIFY` = `true`
- [ ] `NEXT_TELEMETRY_DISABLED` = `1`

**Variables de Funcionalidad (si aplica):**

- [ ] `NOTION_API_KEY` = `secret_xxxxx...`
- [ ] `NOTION_DATABASE_ID` = `xxxxxxxx-xxxx-xxxx...`
- [ ] `RESEND_API_KEY` = `re_xxxxx...`

**Variables Opcionales:**

- [ ] `NEXT_PUBLIC_GA_ID` = `G-XXXXXXXXXX` (si usas Google Analytics)
- [ ] `NEXT_PUBLIC_SITE_URL` = `https://webcode.es` (se configura automáticamente)

**Scopes Configurados:**

- [ ] Todas las variables tienen scope "All" o específico según necesidad

---

## 📋 FASE 3: Primer Deploy

### Inicio de Deploy

- [ ] **Deploy iniciado**
  - Click en "Deploy site"
  - Build logs visible en tiempo real

### Monitoreo de Build

- [ ] **Instalación de dependencias exitosa**
  - pnpm instalado correctamente
  - Dependencias descargadas sin errores

- [ ] **Build de Next.js exitoso**
  - Compilación completada
  - Páginas estáticas generadas
  - Sin errores fatales

- [ ] **Setup de Next.js Runtime**
  - Plugin `@netlify/plugin-nextjs` ejecutado
  - Funciones serverless configuradas
  - Edge Functions configuradas

- [ ] **Deploy completo**
  - URL generada: `https://________.netlify.app`
  - Deploy marcado como "Published"
  - Tiempo total: **\_** minutos

---

## 📋 FASE 4: Verificación Post-Deploy

### Frontend Básico

- [ ] **Página principal carga**
  - URL: https://________.netlify.app/
  - Carga sin errores
  - Estilos aplicados correctamente

- [ ] **Navegación funciona**
  - Menú de navegación interactivo
  - Links funcionan correctamente
  - No hay errores 404 inesperados

- [ ] **Imágenes cargan**
  - Netlify Image CDN funcionando
  - Imágenes optimizadas
  - No hay broken images

- [ ] **Dark mode funciona**
  - Toggle de tema disponible
  - Cambio de tema sin errores
  - Persistencia del tema (si implementado)

- [ ] **Animaciones funcionan**
  - Framer Motion sin errores
  - Transiciones suaves
  - No hay jank visual

### Páginas Clave

- [ ] **Home** (`/`)
  - Hero section visible
  - Call-to-actions funcionan
  - Sin errores de consola

- [ ] **Soluciones** (`/soluciones`)
  - Listado de servicios visible
  - Cards interactivos
  - Enlaces a páginas específicas funcionan

- [ ] **Solución específica** (`/soluciones/web-development`)
  - Contenido se renderiza correctamente
  - Imágenes y componentes cargan

- [ ] **Blog** (`/blog`)
  - Lista de posts carga (si configurado Notion)
  - Paginación funciona (si aplica)
  - Sin errores de API

- [ ] **Post de blog** (`/blog/[slug]`)
  - Contenido se renderiza desde Notion
  - Markdown parseado correctamente
  - Imágenes de Notion cargan

- [ ] **Briefing** (`/briefing`)
  - Formulario se muestra correctamente
  - Campos de validación funcionan

- [ ] **Contacto** (`/contacto`)
  - Formulario accesible
  - Campos requeridos marcados

- [ ] **Políticas** (`/cookies`, `/politica-privacidad`)
  - Contenido visible
  - Headers `X-Robots-Tag` aplicados (verificar en DevTools)

### API Routes y Funciones

- [ ] **Test de formulario de contacto**
  - Completar formulario en `/contacto`
  - Enviar
  - **Resultado esperado**:
    - ✅ Sin errores en UI
    - ✅ Email recibido (si `RESEND_API_KEY` configurado)
    - ⚠️ Si falla, revisar logs de Netlify Functions

- [ ] **Test de briefing**
  - Completar formulario en `/briefing`
  - Enviar
  - **Resultado esperado**:
    - ✅ Confirmación de envío
    - ✅ Email recibido (si configurado)
    - ⚠️ Revisar logs si falla

- [ ] **Test de descarga de PDF**
  - Enviar briefing
  - Descargar PDF
  - **Resultado esperado**:
    - ✅ PDF descarga correctamente
    - ✅ Contenido renderizado sin errores

### Headers y Middleware

- [ ] **Headers de seguridad presentes**
  - Abrir DevTools → Network
  - Navegar a cualquier página
  - Verificar headers:
    - ✅ `X-Frame-Options: DENY`
    - ✅ `X-Content-Type-Options: nosniff`
    - ✅ `X-XSS-Protection: 1; mode=block`
    - ✅ `Strict-Transport-Security`
    - ✅ `Content-Security-Policy`

- [ ] **Middleware aplica headers específicos**
  - Navegar a `/cookies`
  - Verificar en DevTools:
    - ✅ `X-Robots-Tag: noindex, nofollow`

### Redirects y Rewrites

- [ ] **Redirect de `/home` a `/`**
  - Navegar a https://________.netlify.app/home
  - Debe redirigir a `/`
  - Verificar status 301 en DevTools

- [ ] **Redirect de `/services` a `/soluciones`**
  - Navegar a `/services`
  - Debe redirigir a `/soluciones`
  - Status 301

- [ ] **Rewrite de `/sobre-nosotros` a `/about`**
  - Navegar a `/sobre-nosotros`
  - Debe mostrar contenido de `/about`
  - URL permanece como `/sobre-nosotros`
  - Status 200 (no redirect)

### Performance

- [ ] **Lighthouse Audit ejecutado**
  - Abrir DevTools → Lighthouse
  - Ejecutar audit en modo Incognito
  - **Scores mínimos**:
    - Performance: **\_** / 100 (target: > 90)
    - Accessibility: **\_** / 100 (target: > 90)
    - Best Practices: **\_** / 100 (target: > 90)
    - SEO: **\_** / 100 (target: > 90)

- [ ] **Core Web Vitals verificados**
  - LCP (Largest Contentful Paint): **\_** ms (target: < 2500ms)
  - FID (First Input Delay): **\_** ms (target: < 100ms)
  - CLS (Cumulative Layout Shift): **\_** (target: < 0.1)

### Responsive Design

- [ ] **Mobile (375px)**
  - Layout correcto
  - Texto legible
  - Botones accesibles
  - No hay overflow horizontal

- [ ] **Tablet (768px)**
  - Diseño adaptado
  - Navegación funcional
  - Imágenes escaladas correctamente

- [ ] **Desktop (1920px)**
  - Layout completo visible
  - Espaciado apropiado
  - Sin elementos cortados

### Consola de Errores

- [ ] **Sin errores en consola del navegador**
  - Abrir DevTools → Console
  - Navegar por el sitio
  - **Errores aceptables**: Ninguno
  - **Warnings aceptables**: Deprecation warnings menores

---

## 📋 FASE 5: Configuración de Dominio Custom (Opcional)

### Dominio

- [ ] **Dominio añadido en Netlify**
  - Site settings → Domain management
  - Custom domain: `webcode.es`

### DNS

- [ ] **DNS configurado**
  - **Opción A: Netlify DNS**
    - Nameservers cambiados en registrador
    - DNS apuntando a Netlify
  - **Opción B: DNS Externo**
    - CNAME `www` → `________.netlify.app`
    - A/ALIAS `@` → `75.2.60.5`

- [ ] **Propagación de DNS verificada**
  - Usar https://dnschecker.org/
  - Dominio resuelve correctamente a Netlify

### SSL/HTTPS

- [ ] **SSL activado**
  - Certificado Let's Encrypt provisionado
  - HTTPS funciona en dominio custom
  - Redirect HTTP → HTTPS automático

---

## 📋 FASE 6: Configuraciones Adicionales

### Deploy Settings

- [ ] **Deploy Previews activados**
  - Site settings → Build & deploy → Deploy contexts
  - Deploy previews habilitados para Pull Requests

- [ ] **Notificaciones configuradas**
  - Email cuando deploy falla (opcional)
  - Webhook a Slack/Discord (opcional)

### Analytics

- [ ] **Sistema de analytics elegido**
  - **Opción A**: Netlify Analytics ($9/mes)
  - **Opción B**: Google Analytics 4 (gratis)
  - **Opción C**: Otro (especificar: ******\_******)

- [ ] **Analytics configurado**
  - Código de tracking instalado (si GA4)
  - Variables de entorno configuradas
  - Verificado que funciona

### Monitoreo

- [ ] **Uptime monitoring configurado** (opcional)
  - UptimeRobot, Pingdom, o similar
  - Alerts configuradas

---

## 📋 FASE 7: Documentación y Handoff

### Documentación

- [ ] **README.md actualizado**
  - Instrucciones de deployment a Netlify
  - Variables de entorno documentadas
  - Comandos útiles incluidos

- [ ] **Credenciales guardadas de forma segura**
  - API keys en gestor de contraseñas
  - Acceso a Netlify Dashboard documentado
  - Contacto de soporte identificado

### Handoff (si aplica)

- [ ] **Cliente/equipo notificado**
  - URL del sitio en producción compartida
  - Acceso a Netlify Dashboard proporcionado (si aplica)
  - Documentación entregada

---

## 📋 FASE 8: Post-Launch Monitoring (Primeros 7 días)

### Día 1

- [ ] **Verificación de estabilidad**
  - Sin errores reportados
  - Sitio accesible 100% del tiempo
  - No hay crashes de funciones

### Día 3

- [ ] **Análisis de analytics**
  - Tráfico registrándose correctamente
  - Core Web Vitals estables
  - No hay regresiones de performance

### Día 7

- [ ] **Review completo**
  - Feedback recopilado
  - Issues reportados y triageados
  - Optimizaciones identificadas

---

## 🚨 Troubleshooting Rápido

### Si el build falla:

1. ✅ Verificar `NODE_VERSION=20` en variables de entorno
2. ✅ Verificar `PNPM_VERSION=9` en variables de entorno
3. ✅ Revisar logs de build en Netlify Dashboard
4. ✅ Probar `pnpm build` localmente
5. ✅ Buscar error específico en [docs de Netlify](https://docs.netlify.com/)

### Si el blog no carga:

1. ✅ Verificar `NOTION_API_KEY` configurada correctamente
2. ✅ Verificar `NOTION_DATABASE_ID` correcta
3. ✅ Comprobar que base de datos está compartida con integración
4. ✅ Ver logs de funciones en Netlify Dashboard

### Si emails no se envían:

1. ✅ Verificar `RESEND_API_KEY` configurada
2. ✅ Verificar dominio verificado en Resend
3. ✅ Revisar logs de Netlify Functions
4. ✅ Comprobar límites de plan de Resend

### Si imágenes no cargan:

1. ✅ Verificar uso correcto de `next/image`
2. ✅ Verificar `remotePatterns` en `next.config.ts`
3. ✅ Comprobar que imágenes existen en rutas correctas

---

## ✅ Sign-Off Final

### Checklist de Aprobación

- [ ] Todos los items críticos marcados
- [ ] Performance aceptable (> 90 en Lighthouse)
- [ ] Sin errores bloqueantes
- [ ] Funcionalidades core funcionando
- [ ] Documentación completa

### Aprobaciones

**Desarrollador**:  
Nombre: ********\_********  
Fecha: ********\_********  
Firma: ********\_********

**QA/Tester** (si aplica):  
Nombre: ********\_********  
Fecha: ********\_********  
Firma: ********\_********

**Cliente/Stakeholder** (si aplica):  
Nombre: ********\_********  
Fecha: ********\_********  
Firma: ********\_********

---

## 📝 Notas Adicionales

_Usa este espacio para notas, issues encontrados, o cualquier información relevante del deployment:_

---

---

---

---

---

**Proyecto**: WEBCODE  
**Deployment Platform**: Netlify  
**Fecha de Deployment**: ********\_********  
**URL en Producción**: https://********\_\_\_********

---

**🎉 ¡Felicidades por tu deployment exitoso!**
