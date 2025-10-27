# 🚨 PROBLEMA: webcode.es No Funciona

## Estado Actual

- ✅ **https://webcode-bcn.netlify.app/** → Funciona perfectamente
- ❌ **https://webcode.es** → No responde (timeout)
- ⚠️ **DNS configurado correctamente** pero falta configuración en Netlify

---

## 🎯 Solución Rápida (5 pasos)

### 1. Acceder a Netlify Dashboard

```
https://app.netlify.com/sites/webcode-bcn/settings/domain
```

### 2. Añadir Dominio Personalizado

- Click en **"Add custom domain"**
- Introducir: `webcode.es`
- Netlify verificará el DNS automáticamente

### 3. Provisionar SSL

- Ir a **HTTPS settings**
- Click en **"Provision certificate"**
- Esperar 5-30 minutos

### 4. Activar Force HTTPS

- En la misma sección HTTPS
- Activar **"Force HTTPS"**

### 5. Verificar

```bash
# Esperar 15-30 minutos y ejecutar:
./scripts/verify-domain.sh
```

---

## 📚 Documentación Completa

| Archivo                                                        | Contenido                         |
| -------------------------------------------------------------- | --------------------------------- |
| **[docs/deployment/DOMAIN-DIAGNOSTIC-REPORT.md](docs/deployment/DOMAIN-DIAGNOSTIC-REPORT.md)** | 📊 Diagnóstico técnico detallado  |
| **[docs/deployment/NETLIFY-DOMAIN-SETUP.md](docs/deployment/NETLIFY-DOMAIN-SETUP.md)**         | 📖 Guía paso a paso completa      |
| **[docs/deployment/DOMAIN-ISSUE-RESOLUTION.md](docs/deployment/DOMAIN-ISSUE-RESOLUTION.md)**   | 📝 Resumen ejecutivo del problema |

---

## 🔧 Scripts de Verificación

```bash
# Linux/macOS/Git Bash
./scripts/verify-domain.sh

# Windows
scripts\verify-domain.bat
```

---

## ⏱️ Tiempo Total Estimado

- **Configuración**: 10-15 minutos
- **Provisión SSL**: 15-30 minutos
- **Total**: 30-45 minutos

---

## 📞 Próximo Paso

👉 **ACCIÓN INMEDIATA**: [Acceder a Netlify Dashboard](https://app.netlify.com/sites/webcode-bcn/settings/domain)

---

**Última actualización**: 24 de octubre de 2025
