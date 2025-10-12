"use client";

import { useMemo } from "react";
import {
  EMOJI_TO_SVG_MAP,
  type EmojiKey,
  getSvgIconName,
} from "@/lib/svg-icons";

/**
 * Hook para reemplazar emoticones por SVGs
 *
 * Proporciona funciones para convertir emoticones a componentes SVG
 * manteniendo la coherencia visual del sistema de diseño WebCode
 */

interface EmojiReplacementOptions {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "primary" | "secondary" | "accent";
  className?: string;
}

export function useEmojiReplacement() {
  /**
   * Convierte un emoji a un componente SVG
   */
  const replaceEmoji = useMemo(() => {
    return (emoji: string, options: EmojiReplacementOptions = {}) => {
      const svgName = getSvgIconName(emoji);

      if (!svgName) {
        // Si no hay SVG equivalente, devolver null para que se use el emoji original
        return null;
      }

      return {
        type: "svg",
        name: svgName,
        size: options.size || "md",
        variant: options.variant || "default",
        className: options.className,
        title: emoji,
      };
    };
  }, []);

  /**
   * Reemplaza todos los emoticones en un texto por SVGs
   */
  const replaceEmojisInText = useMemo(() => {
    return (text: string, options: EmojiReplacementOptions = {}) => {
      // Regex para encontrar emoticones Unicode
      const emojiRegex =
        /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu;

      const parts = text.split(emojiRegex);
      const emojis = text.match(emojiRegex) || [];

      type SvgReplacement = ReturnType<typeof replaceEmoji> extends infer R
        ? NonNullable<R>
        : never;

      const result: Array<string | SvgReplacement> = [];

      for (let i = 0; i < parts.length; i++) {
        if (parts[i]) {
          result.push(parts[i]);
        }

        if (emojis[i]) {
          const replacement = replaceEmoji(emojis[i], options);
          if (replacement) {
            result.push(replacement);
          } else {
            result.push(emojis[i]);
          }
        }
      }

      return result;
    };
  }, [replaceEmoji]);

  /**
   * Verifica si un emoji tiene equivalente SVG
   */
  const hasSvgEquivalent = useMemo(() => {
    return (emoji: string): boolean => {
      return getSvgIconName(emoji) !== null;
    };
  }, []);

  /**
   * Obtiene la lista de emoticones soportados
   */
  const supportedEmojis = useMemo(() => {
    return Object.keys(EMOJI_TO_SVG_MAP) as EmojiKey[];
  }, []);

  return {
    replaceEmoji,
    replaceEmojisInText,
    hasSvgEquivalent,
    supportedEmojis,
  };
}
