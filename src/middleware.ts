import { NextRequest, NextResponse } from 'next/server';

// Lista de patrones de ataques comunes que queremos bloquear
const maliciousPatterns = [
  // WordPress exploits
  /wp-content\/plugins\/.*\.php$/i,
  /wp-admin\/.*\.php$/i,
  /wp-includes\/.*\.php$/i,
  /wp-config\.php$/i,
  
  // Common exploit files
  /\.php$/i,
  /\.asp$/i,
  /\.jsp$/i,
  /\.cgi$/i,
  
  // Specific attack patterns
  /golden\.php$/i,
  /dejavu\.php$/i,
  /file\d+\.php$/i,
  /ahax\.php$/i,
  /asasx\.php$/i,
  /astab\.php$/i,
  /wsa\.php$/i,
  /xmlrpcx\.php$/i,
  /ss\.php$/i,
  /ot\.php$/i,
  /zwso\.php$/i,
  /ad\.php$/i,
  /wp-conflg\.php$/i,
  /403\.php$/i,
  /acp\.php$/i,
  /past\.php$/i,
  /faq\.php$/i,
  /NewFile\.php$/i,
  /bolt\.php$/i,
  /wp-mn\.php$/i,
  /mek\.php$/i,
  /alfa\.php$/i,
  /lo\.php$/i,
  /build\.php$/i,
  /buy\.php$/i,
  /404\.php$/i,
  /pass\.php$/i,
  /pepe\.php$/i,
  /bless\.php$/i,
  /e\.php$/i,
  /xleetx\.php$/i,
  /elp\.php$/i,
  /great\.php$/i,
  /about\.php$/i,
  /Sanskrit\.php$/i,
  /xax\.php$/i,
  /lv\.php$/i,
  /lc\.php$/i,
  /dlex\.php$/i,
  
  // Directory traversal attempts
  /\.\.\//i,
  /\.trash\d+\//i,
  /css\/index\.php$/i,
];

// Lista de User-Agents sospechosos
const suspiciousUserAgents = [
  /sqlmap/i,
  /nikto/i,
  /nmap/i,
  /masscan/i,
  /zap/i,
  /burp/i,
  /w3af/i,
  /havij/i,
  /acunetix/i,
  /nessus/i,
  /openvas/i,
  /nessus/i,
  /scanner/i,
  /bot/i,
  /crawler/i,
  /spider/i,
  /scraper/i,
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get('user-agent') || '';
  
  // Verificar patrones maliciosos en la URL
  const isMaliciousPath = maliciousPatterns.some(pattern => pattern.test(pathname));
  
  // Verificar User-Agent sospechoso
  const isSuspiciousUA = suspiciousUserAgents.some(pattern => pattern.test(userAgent));
  
  // Si es un request malicioso, devolver 403 inmediatamente
  if (isMaliciousPath || isSuspiciousUA) {
    console.log(`🚫 Blocked malicious request: ${pathname} from ${request.ip || 'unknown'} (UA: ${userAgent})`);
    
    return new NextResponse('Forbidden', {
      status: 403,
      headers: {
        'X-Robots-Tag': 'noindex, nofollow',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  }
  
  // Continuar con el request normal
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
