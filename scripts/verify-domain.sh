#!/bin/bash

# Script de verificación de configuración de dominio webcode.es
# Proyecto: WEBCODE
# Última actualización: 24 de octubre de 2025

echo "🔍 VERIFICACIÓN DE DOMINIO WEBCODE.ES"
echo "======================================"
echo ""

DOMAIN="webcode.es"
WWW_DOMAIN="www.webcode.es"
NETLIFY_DOMAIN="webcode-bcn.netlify.app"

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para verificar DNS
check_dns() {
    local domain=$1
    echo "📡 Verificando DNS para $domain..."
    
    if command -v nslookup &> /dev/null; then
        nslookup $domain
        echo ""
    elif command -v dig &> /dev/null; then
        dig $domain +short
        echo ""
    else
        echo -e "${YELLOW}⚠️  nslookup/dig no disponible. Instala bind-utils${NC}"
        echo ""
    fi
}

# Función para verificar HTTP/HTTPS
check_https() {
    local url=$1
    echo "🔐 Verificando HTTPS para $url..."
    
    if command -v curl &> /dev/null; then
        HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -L "$url" --max-time 10)
        
        if [ "$HTTP_CODE" = "200" ]; then
            echo -e "${GREEN}✅ $url responde correctamente (HTTP $HTTP_CODE)${NC}"
        elif [ "$HTTP_CODE" = "000" ]; then
            echo -e "${RED}❌ $url no responde (timeout o DNS no resuelve)${NC}"
        else
            echo -e "${YELLOW}⚠️  $url responde con HTTP $HTTP_CODE${NC}"
        fi
    else
        echo -e "${YELLOW}⚠️  curl no disponible${NC}"
    fi
    echo ""
}

# Función para verificar SSL
check_ssl() {
    local domain=$1
    echo "🔒 Verificando certificado SSL para $domain..."
    
    if command -v openssl &> /dev/null; then
        SSL_INFO=$(echo | openssl s_client -connect "$domain:443" -servername "$domain" 2>/dev/null | openssl x509 -noout -dates 2>/dev/null)
        
        if [ ! -z "$SSL_INFO" ]; then
            echo -e "${GREEN}✅ Certificado SSL válido${NC}"
            echo "$SSL_INFO"
        else
            echo -e "${RED}❌ No se pudo verificar el certificado SSL${NC}"
        fi
    else
        echo -e "${YELLOW}⚠️  openssl no disponible${NC}"
    fi
    echo ""
}

# Función para verificar headers de seguridad
check_security_headers() {
    local url=$1
    echo "🛡️  Verificando headers de seguridad para $url..."
    
    if command -v curl &> /dev/null; then
        HEADERS=$(curl -s -I -L "$url" --max-time 10 2>/dev/null)
        
        # Verificar headers importantes
        if echo "$HEADERS" | grep -qi "strict-transport-security"; then
            echo -e "${GREEN}✅ HSTS habilitado${NC}"
        else
            echo -e "${RED}❌ HSTS no encontrado${NC}"
        fi
        
        if echo "$HEADERS" | grep -qi "x-frame-options"; then
            echo -e "${GREEN}✅ X-Frame-Options configurado${NC}"
        else
            echo -e "${RED}❌ X-Frame-Options no encontrado${NC}"
        fi
        
        if echo "$HEADERS" | grep -qi "x-content-type-options"; then
            echo -e "${GREEN}✅ X-Content-Type-Options configurado${NC}"
        else
            echo -e "${RED}❌ X-Content-Type-Options no encontrado${NC}"
        fi
    else
        echo -e "${YELLOW}⚠️  curl no disponible${NC}"
    fi
    echo ""
}

# Ejecutar verificaciones
echo "═══════════════════════════════════════════════════════════"
echo "1️⃣  VERIFICACIÓN DE DNS"
echo "═══════════════════════════════════════════════════════════"
check_dns $DOMAIN
check_dns $WWW_DOMAIN

echo "═══════════════════════════════════════════════════════════"
echo "2️⃣  VERIFICACIÓN DE CONECTIVIDAD HTTPS"
echo "═══════════════════════════════════════════════════════════"
check_https "https://$DOMAIN"
check_https "https://$WWW_DOMAIN"
check_https "https://$NETLIFY_DOMAIN"

echo "═══════════════════════════════════════════════════════════"
echo "3️⃣  VERIFICACIÓN DE CERTIFICADO SSL"
echo "═══════════════════════════════════════════════════════════"
check_ssl $DOMAIN

echo "═══════════════════════════════════════════════════════════"
echo "4️⃣  VERIFICACIÓN DE HEADERS DE SEGURIDAD"
echo "═══════════════════════════════════════════════════════════"
check_security_headers "https://$DOMAIN"

echo "═══════════════════════════════════════════════════════════"
echo "✅ VERIFICACIÓN COMPLETA"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "📝 PRÓXIMOS PASOS:"
echo "  1. Si el DNS no resuelve, verifica la configuración en tu registrador"
echo "  2. Si HTTPS no responde, espera 24-48h para propagación DNS"
echo "  3. Si el SSL falla, verifica la configuración en Netlify Dashboard"
echo "  4. Consulta NETLIFY-DOMAIN-SETUP.md para más detalles"
echo ""
echo "🔗 HERRAMIENTAS ONLINE ÚTILES:"
echo "  • DNS Propagation: https://www.whatsmydns.net/#A/$DOMAIN"
echo "  • SSL Check: https://www.ssllabs.com/ssltest/analyze.html?d=$DOMAIN"
echo "  • Security Headers: https://securityheaders.com/?q=https://$DOMAIN"
echo ""
