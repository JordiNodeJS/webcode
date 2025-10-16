import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fuentes y Estadísticas | WebCode - Datos Verificables",
  description:
    "Fuentes verificables y estadísticas utilizadas en WebCode para respaldar nuestras afirmaciones sobre desarrollo web."
};

export default function SourcesPage() {
  return (
    <div className="min-h-screen bg-gradient-webcode pt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-8 text-center">
            Fuentes y Estadísticas
          </h1>

          <p className="text-lg text-muted-foreground mb-12 text-center">
            Datos verificables que respaldan nuestras afirmaciones
          </p>

          <div className="grid gap-8 md:gap-12">
            {/* Estadística Principal */}
            <div className="border-4 border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10 shadow-brutal rounded-2xl p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                Estadística Principal del Briefing
              </h2>

              <div className="bg-background/80 p-6 rounded-2xl border-2 border-primary/20">
                <div className="text-center mb-4">
                  <div className="text-5xl md:text-6xl font-black text-accent mb-2">
                    74%
                  </div>
                  <p className="text-lg md:text-xl font-semibold">
                    Empresas con bajo nivel de madurez
                  </p>
                  <p className="text-sm text-muted-foreground">
                    En gestión de requisitos (IAG Consulting 2009)
                  </p>
                  <a 
                    href="https://www.pmi.org/learning/library/es-2014-pulse-gestion-de-requisitos-13529" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-primary hover:text-primary/80 underline text-sm font-medium transition-colors"
                  >
                    Ver fuente original →
                  </a>
                </div>
              </div>
            </div>

            {/* Otras estadísticas */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-background/80 p-6 rounded-2xl border-2 border-secondary/20 shadow-brutal">
                <div className="text-center">
                  <div className="text-3xl font-black text-primary mb-2">
                    47%
                  </div>
                  <p className="font-semibold">de los proyectos fallidos</p>
                  <p className="text-sm text-muted-foreground">
                    Se deben a gestión deficiente de requisitos
                  </p>
                  <a 
                    href="https://www.standishgroup.com/products/copy-of-chaos-report-beyond-infinity-digital-version" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-primary hover:text-primary/80 underline text-sm font-medium transition-colors"
                  >
                    Ver fuente original →
                  </a>
                </div>
              </div>

              <div className="bg-background/80 p-6 rounded-2xl border-2 border-accent/20 shadow-brutal">
                <div className="text-center">
                  <div className="text-3xl font-black text-secondary mb-2">
                    68%
                  </div>
                  <p className="font-semibold">de los proyectos de software</p>
                  <p className="text-sm text-muted-foreground">
                    Exceden el presupuesto inicial
                  </p>
                  <a 
                    href="https://www.pmi.org/learning/library/es-2014-pulse-gestion-de-requisitos-13529" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-primary hover:text-primary/80 underline text-sm font-medium transition-colors"
                  >
                    Ver fuente original →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
