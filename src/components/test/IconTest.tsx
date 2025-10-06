"use client";

import { SingleEmojiToSvg } from '@/components/ui/emoji-to-svg';
import { WebCodeLogo, WebCodeDev, QualityIcon } from '@/components/ui/webcode-icons';

/**
 * Componente de prueba para verificar que los iconos SVG funcionan correctamente
 */

export function IconTest() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Prueba de Iconos SVG - WebCode
      </h1>
      
      {/* Prueba de iconos de emoticones */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Iconos de Emoticones</h2>
        <div className="flex flex-wrap gap-4">
          <SingleEmojiToSvg emoji="💡" size="md" variant="primary" />
          <SingleEmojiToSvg emoji="🚀" size="md" variant="secondary" />
          <SingleEmojiToSvg emoji="🎯" size="md" variant="accent" />
          <SingleEmojiToSvg emoji="✅" size="md" variant="default" />
          <SingleEmojiToSvg emoji="🔧" size="md" variant="primary" />
          <SingleEmojiToSvg emoji="📱" size="md" variant="secondary" />
        </div>
      </section>

      {/* Prueba de iconos personalizados de WebCode */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Iconos Personalizados WebCode</h2>
        <div className="flex flex-wrap gap-4">
          <WebCodeLogo size="md" variant="primary" />
          <WebCodeDev size="md" variant="secondary" />
          <QualityIcon size="md" variant="accent" />
        </div>
      </section>

      {/* Prueba de diferentes tamaños */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Diferentes Tamaños</h2>
        <div className="flex items-center gap-4">
          <SingleEmojiToSvg emoji="🎨" size="sm" variant="primary" />
          <SingleEmojiToSvg emoji="🎨" size="md" variant="primary" />
          <SingleEmojiToSvg emoji="🎨" size="lg" variant="primary" />
          <SingleEmojiToSvg emoji="🎨" size="xl" variant="primary" />
        </div>
      </section>

      {/* Prueba de diferentes variantes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Diferentes Variantes</h2>
        <div className="flex items-center gap-4">
          <SingleEmojiToSvg emoji="⚡" size="lg" variant="default" />
          <SingleEmojiToSvg emoji="⚡" size="lg" variant="primary" />
          <SingleEmojiToSvg emoji="⚡" size="lg" variant="secondary" />
          <SingleEmojiToSvg emoji="⚡" size="lg" variant="accent" />
        </div>
      </section>

      {/* Prueba de emoticones no soportados */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Emoticones No Soportados (Fallback)</h2>
        <div className="flex flex-wrap gap-4">
          <SingleEmojiToSvg emoji="🦄" size="md" variant="primary" />
          <SingleEmojiToSvg emoji="🌈" size="md" variant="secondary" />
          <SingleEmojiToSvg emoji="🍕" size="md" variant="accent" />
        </div>
        <p className="text-sm text-muted-foreground">
          Estos emoticones no tienen equivalente SVG, por lo que se muestran como texto original.
        </p>
      </section>
    </div>
  );
}
