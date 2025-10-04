"use client";

import { useState, useEffect } from "react";

interface EmailProtectionProps {
  email: string;
  className?: string;
  showAsLink?: boolean;
  children?: React.ReactNode;
}

/**
 * Componente para proteger emails de bots y spammers
 * Utiliza múltiples técnicas de ofuscación y detección
 */
export function EmailProtection({ 
  email, 
  className = "", 
  showAsLink = true,
  children 
}: EmailProtectionProps) {
  const [decodedEmail, setDecodedEmail] = useState<string>("");
  const [isHuman, setIsHuman] = useState<boolean>(false);
  const [mouseMoved, setMouseMoved] = useState<boolean>(false);

  // Técnica 1: ROT13 + Base64 encoding
  const encodeEmail = (email: string): string => {
    const rot13 = (str: string) => {
      return str.replace(/[a-zA-Z]/g, (char) => {
        const start = char <= 'Z' ? 65 : 97;
        return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start);
      });
    };
    
    const rot13Encoded = rot13(email);
    return btoa(rot13Encoded);
  };

  // Técnica 2: Decodificación con verificación de humanidad
  const decodeEmail = (encodedEmail: string): string => {
    try {
      const base64Decoded = atob(encodedEmail);
      const rot13Decoded = base64Decoded.replace(/[a-zA-Z]/g, (char) => {
        const start = char <= 'Z' ? 65 : 97;
        return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start);
      });
      return rot13Decoded;
    } catch {
      return email; // Fallback al email original
    }
  };

  // Técnica 3: Verificación de interacción humana
  const checkHumanInteraction = () => {
    // Verificar si hay movimiento del mouse, clicks, o teclas presionadas
    const hasInteraction = mouseMoved || 
      (typeof window !== 'undefined' && 
       (window.performance?.now() || 0) > 1000); // Tiempo mínimo de carga
    
    setIsHuman(hasInteraction);
  };

  useEffect(() => {
    // Codificar el email inicialmente
    const encoded = encodeEmail(email);
    
    // Decodificar solo si es un humano
    const timer = setTimeout(() => {
      checkHumanInteraction();
      if (isHuman) {
        setDecodedEmail(decodeEmail(encoded));
      } else {
        // Mostrar email ofuscado para bots
        setDecodedEmail(email.replace(/(.{2})(.*)(@.*)/, '$1***$3'));
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [email, isHuman, mouseMoved]);

  // Event listeners para detectar interacción humana
  useEffect(() => {
    const handleMouseMove = () => setMouseMoved(true);
    const handleKeyPress = () => setMouseMoved(true);
    const handleClick = () => setMouseMoved(true);

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('keypress', handleKeyPress);
      window.addEventListener('click', handleClick);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('keypress', handleKeyPress);
        window.removeEventListener('click', handleClick);
      };
    }
  }, []);

  // Técnica 4: CSS para ocultar de lectores de pantalla simples
  const emailStyle = {
    unicodeBidi: 'bidi-override' as const,
    direction: 'rtl' as const,
  };

  if (children) {
    return (
      <span className={className} style={emailStyle}>
        {children}
      </span>
    );
  }

  if (showAsLink) {
    return (
      <a
        href={`mailto:${decodedEmail}`}
        className={className}
        style={emailStyle}
        onMouseEnter={() => {
          // Decodificar al hover para usuarios reales
          if (!isHuman) {
            setDecodedEmail(email);
            setIsHuman(true);
          }
        }}
        onClick={(e) => {
          // Verificación adicional en click
          if (!isHuman) {
            e.preventDefault();
            setDecodedEmail(email);
            setIsHuman(true);
            // Reintentar el click después de decodificar
            setTimeout(() => {
              window.location.href = `mailto:${email}`;
            }, 100);
          }
        }}
      >
        {decodedEmail}
      </a>
    );
  }

  return (
    <span className={className} style={emailStyle}>
      {decodedEmail}
    </span>
  );
}

/**
 * Hook para generar emails ofuscados
 */
export function useEmailProtection(email: string) {
  const [protectedEmail, setProtectedEmail] = useState<string>("");

  useEffect(() => {
    // Técnica adicional: Reemplazar caracteres con entidades HTML
    const obfuscateEmail = (email: string) => {
      return email
        .split('')
        .map(char => {
          if (char === '@') return '&#64;';
          if (char === '.') return '&#46;';
          return char;
        })
        .join('');
    };

    setProtectedEmail(obfuscateEmail(email));
  }, [email]);

  return protectedEmail;
}

/**
 * Componente simple para mostrar email como texto plano protegido
 */
export function ProtectedEmailText({ 
  email, 
  className = "" 
}: { 
  email: string; 
  className?: string; 
}) {
  const protectedEmail = useEmailProtection(email);
  
  return (
    <span 
      className={className}
      dangerouslySetInnerHTML={{ __html: protectedEmail }}
    />
  );
}
