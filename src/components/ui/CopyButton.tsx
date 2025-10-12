"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`copy-button inline-flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-md border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
      title={copied ? "¡Copiado!" : "Copiar código"}
      disabled={copied}
      data-copied={copied}
    >
      {copied ? (
        <>
          <Check className="w-3 h-3" />
          <span>Copiado</span>
        </>
      ) : (
        <>
          <Copy className="w-3 h-3" />
          <span>Copiar</span>
        </>
      )}
    </button>
  );
}
