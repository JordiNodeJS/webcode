/**
 * Utilidades para ofuscación de emails y protección contra bots
 */

/**
 * Codificación ROT13 + Base64
 */
export function encodeRot13Base64(email: string): string {
  const rot13 = (str: string) => {
    return str.replace(/[a-zA-Z]/g, (char) => {
      const start = char <= 'Z' ? 65 : 97;
      return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start);
    });
  };
  
  const rot13Encoded = rot13(email);
  return btoa(rot13Encoded);
}

/**
 * Decodificación ROT13 + Base64
 */
export function decodeRot13Base64(encodedEmail: string): string {
  try {
    const base64Decoded = atob(encodedEmail);
    const rot13Decoded = base64Decoded.replace(/[a-zA-Z]/g, (char) => {
      const start = char <= 'Z' ? 65 : 97;
      return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start);
    });
    return rot13Decoded;
  } catch {
    return encodedEmail; // Fallback
  }
}

/**
 * Ofuscación con entidades HTML
 */
export function encodeHtmlEntities(email: string): string {
  return email
    .split('')
    .map(char => {
      if (char === '@') return '&#64;';
      if (char === '.') return '&#46;';
      return char;
    })
    .join('');
}

/**
 * Ofuscación con caracteres Unicode
 */
export function encodeUnicode(email: string): string {
  return email
    .split('')
    .map(char => {
      if (char === '@') return '&#x40;';
      if (char === '.') return '&#x2E;';
      return char;
    })
    .join('');
}

/**
 * Ofuscación con JavaScript dinámico
 */
export function generateJavaScriptObfuscation(email: string): string {
  const parts = email.split('@');
  const user = parts[0];
  const domain = parts[1];
  
  return `document.write('${user}' + '@' + '${domain}')`;
}

/**
 * Ofuscación con CSS (dirección RTL)
 */
export function encodeCssRtl(email: string): string {
  return email.split('').reverse().join('');
}

/**
 * Ofuscación con caracteres invisibles
 */
export function encodeInvisibleChars(email: string): string {
  const invisibleChar = '\u200B'; // Zero-width space
  return email.split('').join(invisibleChar);
}

/**
 * Ofuscación con múltiples técnicas combinadas
 */
export function encodeMultiTechnique(email: string): {
  encoded: string;
  method: string;
} {
  const techniques = [
    { name: 'rot13-base64', fn: () => encodeRot13Base64(email) },
    { name: 'html-entities', fn: () => encodeHtmlEntities(email) },
    { name: 'unicode', fn: () => encodeUnicode(email) },
    { name: 'css-rtl', fn: () => encodeCssRtl(email) },
    { name: 'invisible', fn: () => encodeInvisibleChars(email) }
  ];

  const randomTechnique = techniques[Math.floor(Math.random() * techniques.length)];
  
  return {
    encoded: randomTechnique.fn(),
    method: randomTechnique.name
  };
}

/**
 * Verificar si el navegador es real
 */
export function isRealBrowser(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Verificar características del navegador
  const hasUserAgent = Boolean(navigator.userAgent && navigator.userAgent.length > 10);
  const hasPlugins = Boolean(navigator.plugins && navigator.plugins.length > 0);
  const hasScreen = Boolean(screen.width > 200 && screen.height > 200);
  const hasLanguage = Boolean(navigator.language && navigator.language.length > 0);
  
  return hasUserAgent && hasPlugins && hasScreen && hasLanguage;
}

/**
 * Verificar interacción humana
 */
export function hasHumanInteraction(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Verificar eventos de interacción
  const hasMouseEvents = window.performance && window.performance.now() > 1000;
  const hasKeyboardEvents = document.hasFocus();
  
  return hasMouseEvents || hasKeyboardEvents;
}

/**
 * Verificar patrones de bot
 */
export function detectBotPatterns(userAgent: string): boolean {
  const botPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
    /curl/i,
    /wget/i,
    /python/i,
    /php/i,
    /java/i,
    /headless/i,
    /phantom/i,
    /selenium/i
  ];

  return botPatterns.some(pattern => pattern.test(userAgent));
}

/**
 * Generar token CSRF simple
 */
export function generateCSRFToken(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

/**
 * Verificar tiempo mínimo de completado del formulario
 */
export function checkFormCompletionTime(startTime: number, minTime: number = 3000): boolean {
  return Date.now() - startTime >= minTime;
}

/**
 * Verificar patrones de spam en el contenido
 */
export function detectSpamContent(content: string): boolean {
  const spamPatterns = [
    /viagra/i,
    /casino/i,
    /loan/i,
    /bitcoin/i,
    /crypto/i,
    /free money/i,
    /click here/i,
    /urgent/i,
    /limited time/i,
    /act now/i,
    /guaranteed/i,
    /no risk/i
  ];

  return spamPatterns.some(pattern => pattern.test(content));
}

/**
 * Verificar dirección IP sospechosa (simplificado)
 */
export function isSuspiciousIP(ip: string): boolean {
  // IPs de localhost o privadas (para testing)
  const suspiciousPatterns = [
    /^127\./,
    /^192\.168\./,
    /^10\./,
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./
  ];

  return suspiciousPatterns.some(pattern => pattern.test(ip));
}

/**
 * Configuración de protección de email
 */
export const EMAIL_PROTECTION_CONFIG = {
  // Técnicas de ofuscación disponibles
  obfuscationMethods: [
    'rot13-base64',
    'html-entities',
    'unicode',
    'css-rtl',
    'invisible'
  ],
  
  // Configuración de detección de bots
  botDetection: {
    minFormTime: 3000, // 3 segundos mínimo
    maxSubmissions: 5, // 5 envíos máximo
    cooldownPeriod: 60000, // 1 minuto de espera
    suspiciousPatterns: [
      /bot/i,
      /crawler/i,
      /spider/i,
      /scraper/i
    ]
  },
  
  // Configuración de rate limiting
  rateLimit: {
    maxRequests: 10,
    windowMs: 60000, // 1 minuto
    blockDuration: 300000 // 5 minutos de bloqueo
  }
};

/**
 * Función principal para proteger un email
 */
export function protectEmail(email: string, method: string = 'auto'): {
  protected: string;
  method: string;
  isProtected: boolean;
} {
  if (method === 'auto') {
    const result = encodeMultiTechnique(email);
    return {
      protected: result.encoded,
      method: result.method,
      isProtected: true
    };
  }

  let protectedEmail = '';
  switch (method) {
    case 'rot13-base64':
      protectedEmail = encodeRot13Base64(email);
      break;
    case 'html-entities':
      protectedEmail = encodeHtmlEntities(email);
      break;
    case 'unicode':
      protectedEmail = encodeUnicode(email);
      break;
    case 'css-rtl':
      protectedEmail = encodeCssRtl(email);
      break;
    case 'invisible':
      protectedEmail = encodeInvisibleChars(email);
      break;
    default:
      protectedEmail = email;
  }

  return {
    protected: protectedEmail,
    method,
    isProtected: protectedEmail !== email
  };
}
