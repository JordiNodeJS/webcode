@echo off
REM Script de verificación de configuración de dominio webcode.es (Windows)
REM Proyecto: WEBCODE
REM Última actualización: 24 de octubre de 2025

echo ========================================
echo VERIFICACION DE DOMINIO WEBCODE.ES
echo ========================================
echo.

set DOMAIN=webcode.es
set WWW_DOMAIN=www.webcode.es
set NETLIFY_DOMAIN=webcode-bcn.netlify.app

echo ========================================
echo 1. VERIFICACION DE DNS
echo ========================================
echo.
echo Verificando DNS para %DOMAIN%...
nslookup %DOMAIN%
echo.
echo Verificando DNS para %WWW_DOMAIN%...
nslookup %WWW_DOMAIN%
echo.

echo ========================================
echo 2. VERIFICACION DE CONECTIVIDAD
echo ========================================
echo.
echo Intentando conectar a https://%DOMAIN%...
curl -s -o NUL -w "HTTP Status: %%{http_code}\n" -L https://%DOMAIN% --max-time 10
echo.
echo Intentando conectar a https://%WWW_DOMAIN%...
curl -s -o NUL -w "HTTP Status: %%{http_code}\n" -L https://%WWW_DOMAIN% --max-time 10
echo.
echo Intentando conectar a https://%NETLIFY_DOMAIN%...
curl -s -o NUL -w "HTTP Status: %%{http_code}\n" -L https://%NETLIFY_DOMAIN% --max-time 10
echo.

echo ========================================
echo 3. VERIFICACION DE HEADERS DE SEGURIDAD
echo ========================================
echo.
echo Obteniendo headers de https://%DOMAIN%...
curl -s -I -L https://%DOMAIN% --max-time 10 | findstr /i "strict-transport x-frame x-content-type"
echo.

echo ========================================
echo VERIFICACION COMPLETA
echo ========================================
echo.
echo PROXIMOS PASOS:
echo   1. Si el DNS no resuelve, verifica la configuracion en tu registrador
echo   2. Si HTTPS no responde, espera 24-48h para propagacion DNS
echo   3. Si el SSL falla, verifica la configuracion en Netlify Dashboard
echo   4. Consulta NETLIFY-DOMAIN-SETUP.md para mas detalles
echo.
echo HERRAMIENTAS ONLINE UTILES:
echo   - DNS Propagation: https://www.whatsmydns.net/#A/%DOMAIN%
echo   - SSL Check: https://www.ssllabs.com/ssltest/analyze.html?d=%DOMAIN%
echo   - Security Headers: https://securityheaders.com/?q=https://%DOMAIN%
echo.
pause
