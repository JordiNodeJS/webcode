"use client";

import React, { useEffect, useState } from 'react';
import { EmojiToSvg } from './emoji-to-svg';

/**
 * Componente AutoEmojiReplacer
 * 
 * Reemplaza automáticamente TODOS los emoticones en el contenido
 * para crear una identidad visual única de WebCode
 */

interface AutoEmojiReplacerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'primary' | 'secondary' | 'accent';
  className?: string;
  inline?: boolean;
}

export function AutoEmojiReplacer({ 
  children, 
  size = 'md', 
  variant = 'default',
  className = '',
  inline = false
}: AutoEmojiReplacerProps) {
  const [processedContent, setProcessedContent] = useState<React.ReactNode>(children);

  useEffect(() => {
    // Procesar el contenido para reemplazar emoticones
    const processContent = (node: React.ReactNode): React.ReactNode => {
      if (typeof node === 'string') {
        // Detectar emoticones en strings y reemplazarlos
        return <EmojiToSvg size={size} variant={variant} inline={inline}>{node}</EmojiToSvg>;
      }
      
      if (React.isValidElement(node)) {
        // Si tiene children, procesar recursivamente
        if (node.props.children) {
          const processedChildren = React.Children.map(node.props.children, processContent);
          return React.cloneElement(node, { ...node.props, children: processedChildren });
        }
        return node;
      }
      
      if (Array.isArray(node)) {
        return node.map((item, index) => (
          <React.Fragment key={index}>
            {processContent(item)}
          </React.Fragment>
        ));
      }
      
      return node;
    };

    setProcessedContent(processContent(children));
  }, [children, size, variant, inline]);

  if (inline) {
    return <span className={className}>{processedContent}</span>;
  }

  return <div className={className}>{processedContent}</div>;
}

/**
 * Hook para reemplazar emoticones en cualquier contenido
 */
export function useAutoEmojiReplacement() {
  const replaceAllEmojis = (content: string, options: {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'default' | 'primary' | 'secondary' | 'accent';
  } = {}) => {
    return (
      <AutoEmojiReplacer 
        size={options.size || 'md'} 
        variant={options.variant || 'default'}
        inline
      >
        {content}
      </AutoEmojiReplacer>
    );
  };

  return { replaceAllEmojis };
}
