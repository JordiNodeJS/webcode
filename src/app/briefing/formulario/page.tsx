import type { Metadata } from "next";
import { BriefingForm } from "@/components/briefing/BriefingForm";
import { generateSEOMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = generateSEOMetadata({
  title: "Formulario de Briefing | WEBCODE Barcelona",
  description:
    "Completa nuestro formulario de briefing para definir los requisitos de tu proyecto web. Proceso guiado paso a paso para recopilar toda la información necesaria.",
  keywords: [
    "formulario briefing web",
    "requisitos proyecto web",
    "consulta proyecto digital",
    "formulario desarrollo web",
    "briefing online Barcelona"
  ],
  canonical: "https://webcode.es/briefing/formulario"
});

export default function BriefingFormularioPage() {
  return (
    <div className="min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border-3 border-primary/30 backdrop-blur-sm shadow-brutal-sm">
            <span className="text-2xl">📋</span>
            <span className="text-sm font-bold text-primary">Formulario Guiado</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gradient-webcode">
            Formulario de Briefing
          </h1>
          
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Completa este formulario paso a paso para ayudarnos a entender tu proyecto. 
            La información que proporciones nos permitirá crear una propuesta precisa y ajustada a tus necesidades.
          </p>

          {/* Info badges */}
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card/80 backdrop-blur-sm border-2 border-border">
              <span className="text-primary">⏱️</span>
              <span className="text-xs font-bold text-muted-foreground">10-15 min</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card/80 backdrop-blur-sm border-2 border-border">
              <span className="text-primary">💾</span>
              <span className="text-xs font-bold text-muted-foreground">Guardado automático</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card/80 backdrop-blur-sm border-2 border-border">
              <span className="text-primary">📧</span>
              <span className="text-xs font-bold text-muted-foreground">Respuesta en 24h</span>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <BriefingForm />
      </div>
    </div>
  );
}

