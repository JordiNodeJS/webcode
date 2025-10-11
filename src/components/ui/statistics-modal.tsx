"use client";

import { useId } from "react";
import { ExternalLink, X } from "@/lib/icons";
import { Button } from "./button";

interface StatisticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  percentage: string;
  description: string;
  source: string;
  sourceUrl?: string;
  detailedExplanation: string;
  context?: string;
  impact?: string;
}

export function StatisticsModal({
  isOpen,
  onClose,
  title,
  percentage,
  description,
  source,
  sourceUrl,
  detailedExplanation,
  context,
  impact
}: StatisticsModalProps) {
  const modalTitleId = useId();

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby={modalTitleId}
      tabIndex={-1}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background border-4 border-primary/30 rounded-2xl shadow-brutal"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        role="document"
      >
        {/* Header */}
        <div className="sticky top-0 bg-background border-b-2 border-primary/20 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-4xl font-black text-primary">
                {percentage}
              </div>
              <div>
                <h2 id={modalTitleId} className="text-xl font-bold">
                  {title}
                </h2>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={onClose}
              className="border-2 border-primary/30 hover:bg-primary/10"
              aria-label="Cerrar modal"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Source */}
          <div className="bg-primary/10 p-4 rounded-xl border-2 border-primary/20">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
              📊 Fuente Oficial
            </h3>
            <p className="font-semibold mb-2">{source}</p>
            {sourceUrl && (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors text-sm"
              >
                Ver estudio completo
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Detailed Explanation */}
          <div className="bg-muted/50 p-4 rounded-xl">
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              📋 Explicación Detallada
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {detailedExplanation}
            </p>
          </div>

          {/* Context */}
          {context && (
            <div className="bg-accent/10 p-4 rounded-xl border-2 border-accent/20">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                🌍 Contexto
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {context}
              </p>
            </div>
          )}

          {/* Impact */}
          {impact && (
            <div className="bg-secondary/10 p-4 rounded-xl border-2 border-secondary/20">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                💡 Impacto
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {impact}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-background border-t-2 border-primary/20 p-6 rounded-b-2xl">
          <Button
            onClick={onClose}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
}
