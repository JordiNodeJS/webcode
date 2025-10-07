"use client";

import React from "react";
import { useEmojiReplacement } from "@/hooks/use-emoji-replacement";
import { SvgIcon } from "./svg-icon";

/**
 * Componente EmojiToSvg
 *
 * Reemplaza automáticamente emoticones en texto por SVGs
 * Mantiene la coherencia visual del sistema de diseño WebCode
 */

interface EmojiToSvgProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "primary" | "secondary" | "accent";
  className?: string;
  inline?: boolean;
}

export function EmojiToSvg({
  children,
  size = "md",
  variant = "default",
  className = "",
  inline = false
}: EmojiToSvgProps) {
  const { replaceEmojisInText } = useEmojiReplacement();

  // Procesar el contenido de los children
  const processChildren = (node: React.ReactNode): React.ReactNode => {
    if (typeof node === "string") {
      // Reemplazar emoticones en strings devolviendo ReactNodes
      const sequence = replaceEmojisInText(node, { size, variant, className });
      return sequence.map((item, idx) => {
        if (typeof item === "string") return item;
        // item es un descriptor SvgReplacement
        return (
          <SvgIcon
            key={`emoji-${idx}-${item.name}`}
            name={item.name}
            size={item.size}
            variant={item.variant}
            className={item.className}
            title={item.title}
          />
        );
      });
    }

    if (React.isValidElement(node)) {
      // Si es un elemento React, procesar recursivamente
      const element = node as React.ReactElement<{
        children?: React.ReactNode;
      }>;
      if (element.props && element.props.children) {
        const processedChildren = React.Children.map(
          element.props.children,
          processChildren
        );
        return React.cloneElement(element, {
          ...element.props,
          children: processedChildren
        });
      }
      return element;
    }

    if (Array.isArray(node)) {
      // Si es un array, procesar cada elemento
      const processed = node.map(processChildren);
      return React.Children.toArray(processed);
    }

    return node;
  };

  const processedContent = processChildren(children);

  if (inline) {
    return <span className={className}>{processedContent}</span>;
  }

  return <div className={className}>{processedContent}</div>;
}

/**
 * Componente para reemplazar un emoji específico
 */
interface SingleEmojiToSvgProps {
  emoji: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "primary" | "secondary" | "accent";
  className?: string;
  fallback?: boolean;
}

export function SingleEmojiToSvg({
  emoji,
  size = "md",
  variant = "default",
  className = "",
  fallback = true
}: SingleEmojiToSvgProps) {
  const { replaceEmoji, hasSvgEquivalent } = useEmojiReplacement();

  if (!hasSvgEquivalent(emoji) && !fallback) {
    return null;
  }

  const replacement = replaceEmoji(emoji, { size, variant, className });

  if (!replacement) {
    return <span className={className}>{emoji}</span>;
  }

  return (
    <SvgIcon
      name={replacement.name}
      size={replacement.size}
      variant={replacement.variant}
      className={replacement.className}
      title={replacement.title}
    />
  );
}
