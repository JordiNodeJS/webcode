"use client";

import { useState } from "react";
import { WSFadeIn } from "@/components/animations/ws-fade-in";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatisticsModal } from "@/components/ui/statistics-modal";
import { AlertTriangle, ExternalLink, FileText, TrendingUp } from "@/lib/icons";

export default function SourcesPageClient() {
  const [modalOpen, setModalOpen] = useState<string | null>(null);

  const openModal = (statistic: string) => setModalOpen(statistic);
  const closeModal = () => setModalOpen(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <WSFadeIn delay={0.1}>
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 hover:bg-primary/30">
              <FileText className="w-4 h-4 mr-2" />
              Fuentes Oficiales
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black mb-6">
              Estadísticas{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Verificables
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Todas nuestras estadísticas provienen de fuentes oficiales y
              estudios verificables. Transparencia total en nuestros datos.
            </p>
          </div>
        </WSFadeIn>

        <div className="grid gap-8 md:gap-12">
          {/* Estadística Principal */}
          <WSFadeIn delay={0.2}>
            <Card className="border-4 border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10 shadow-brutal">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl">
                  <TrendingUp className="w-8 h-8 text-primary" />
                  Estadística Principal del Briefing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-background/80 p-6 rounded-2xl border-2 border-primary/20">
                  <div className="text-center mb-4">
                    <div className="text-5xl md:text-6xl font-black text-primary mb-2">
                      47%
                    </div>
                    <p className="text-lg md:text-xl font-semibold">
                      de los proyectos fallidos se deben a gestión deficiente de
                      requisitos
                    </p>
                  </div>

                  <div className="border-t-2 border-primary/20 pt-4">
                    <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      Fuente Oficial
                    </h4>
                    <div className="bg-muted/50 p-4 rounded-xl">
                      <p className="font-semibold mb-2">
                        Project Management Institute (PMI)
                      </p>
                      <p className="text-sm text-muted-foreground mb-3">
                        Pulse of the Profession 2014 - "The High Cost of Low
                        Performance"
                      </p>
                      <a
                        href="https://www.pmi.org/learning/thought-leadership/pulse/the-high-cost-of-low-performance-2014"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                      >
                        Ver estudio completo
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </WSFadeIn>

          {/* Estadísticas Complementarias */}
          <WSFadeIn delay={0.3}>
            <Card className="border-4 border-accent/30 bg-gradient-to-br from-accent/10 to-secondary/10 shadow-brutal">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl">
                  <AlertTriangle className="w-8 h-8 text-accent" />
                  Estadísticas Complementarias
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* PMI - Recolección inadecuada */}
                  <button
                    type="button"
                    onClick={() => openModal("pmi-inadequate")}
                    className="bg-background/80 p-6 rounded-2xl border-2 border-accent/20 hover:border-accent/40 hover:bg-accent/5 transition-all duration-200 cursor-pointer group"
                  >
                    <div className="text-center mb-4">
                      <div className="text-4xl font-black text-accent mb-2 group-hover:scale-105 transition-transform">
                        37%
                      </div>
                      <p className="font-semibold">
                        Recolección inadecuada de requisitos
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Causa principal de fracaso en proyectos (PMI 2014)
                      </p>
                      <p className="text-xs text-primary mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        Haz clic para más detalles →
                      </p>
                    </div>
                  </button>

                  {/* IAG Consulting */}
                  <button
                    type="button"
                    onClick={() => openModal("iag-maturity")}
                    className="bg-background/80 p-6 rounded-2xl border-2 border-secondary/20 hover:border-secondary/40 hover:bg-secondary/5 transition-all duration-200 cursor-pointer group"
                  >
                    <div className="text-center mb-4">
                      <div className="text-4xl font-black text-accent mb-2 group-hover:scale-105 transition-transform">
                        74%
                      </div>
                      <p className="font-semibold">
                        Empresas con bajo nivel de madurez
                      </p>
                      <p className="text-sm text-muted-foreground">
                        En gestión de requisitos (IAG Consulting 2009)
                      </p>
                      <p className="text-xs text-primary mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        Haz clic para más detalles →
                      </p>
                    </div>
                  </button>

                  {/* Impacto Económico */}
                  <button
                    type="button"
                    onClick={() => openModal("economic-impact")}
                    className="bg-background/80 p-6 rounded-2xl border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 cursor-pointer group md:col-span-2"
                  >
                    <div className="text-center mb-4">
                      <div className="text-4xl font-black text-primary mb-2 group-hover:scale-105 transition-transform">
                        5.1%
                      </div>
                      <p className="font-semibold">
                        Desperdicio económico por gestión deficiente
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Equivale a $51 millones desperdiciados por cada $1,000
                        millones invertidos
                      </p>
                      <p className="text-xs text-primary mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        Haz clic para más detalles →
                      </p>
                    </div>
                  </button>
                </div>
              </CardContent>
            </Card>
          </WSFadeIn>

          {/* Metodología y Transparencia */}
          <WSFadeIn delay={0.4}>
            <Card className="border-4 border-secondary/30 bg-gradient-to-br from-secondary/10 to-primary/10 shadow-brutal">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl">
                  Metodología y Transparencia
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-bold text-lg">Nuestros Principios</h4>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>
                          Solo utilizamos fuentes oficiales y verificables
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>
                          Transparencia total en nuestras estadísticas
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>Enlaces directos a fuentes originales</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>Contexto completo de cada estadística</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-lg">Fuentes Utilizadas</h4>
                    <div className="space-y-3">
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="font-semibold text-sm">
                          Project Management Institute (PMI)
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Organización líder mundial en gestión de proyectos
                        </p>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="font-semibold text-sm">IAG Consulting</p>
                        <p className="text-xs text-muted-foreground">
                          Consultora especializada en análisis de requisitos
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/10 p-6 rounded-2xl border-2 border-primary/20">
                  <h4 className="font-bold text-lg mb-3">
                    ¿Por qué es importante la verificación de fuentes?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    En WebCode creemos en la transparencia total. Todas nuestras
                    estadísticas son verificables y provienen de organizaciones
                    reconocidas. Esto nos permite construir confianza con
                    nuestros clientes y proporcionar información precisa para la
                    toma de decisiones.
                  </p>
                </div>

                <div className="bg-accent/10 p-6 rounded-2xl border-2 border-accent/20">
                  <h4 className="font-bold text-lg mb-3">
                    📅 Relevancia del Estudio PMI 2014
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Aunque este estudio es de 2014, sigue siendo la referencia
                    más reciente y confiable sobre gestión de requisitos. Los
                    estudios posteriores del PMI y otras organizaciones se han
                    enfocado en transformación digital, metodologías ágiles y
                    otros aspectos, pero no han actualizado específicamente las
                    estadísticas sobre fallos por requisitos mal definidos.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Contexto actual:</strong> La industria se ha movido
                    hacia metodologías ágiles, pero los principios fundamentales
                    de gestión de requisitos siguen siendo críticos para el
                    éxito de cualquier proyecto, independientemente de la
                    metodología utilizada.
                  </p>
                </div>
              </CardContent>
            </Card>
          </WSFadeIn>
        </div>
      </div>

      {/* Modals */}
      <StatisticsModal
        isOpen={modalOpen === "pmi-inadequate"}
        onClose={closeModal}
        title="Recolección Inadecuada de Requisitos"
        percentage="37%"
        description="Causa principal de fracaso en proyectos (PMI 2014)"
        source="Project Management Institute (PMI) - Pulse of the Profession 2014"
        sourceUrl="https://www.pmi.org/learning/thought-leadership/pulse/the-high-cost-of-low-performance-2014"
        detailedExplanation="El estudio del PMI identificó que la recolección inadecuada de requisitos es una de las principales causas de fracaso en proyectos. Esto incluye no solo la falta de recopilación de requisitos, sino también la recopilación incompleta, imprecisa o desactualizada de las necesidades del cliente."
        context="Este problema se manifiesta cuando los equipos de proyecto no dedican suficiente tiempo o recursos a entender completamente lo que el cliente realmente necesita, o cuando no utilizan metodologías estructuradas para la recopilación de requisitos."
        impact="Las consecuencias incluyen rework significativo, excesos de presupuesto, retrasos en cronogramas, y en última instancia, proyectos que no satisfacen las expectativas del cliente o que fracasan completamente."
      />

      <StatisticsModal
        isOpen={modalOpen === "iag-maturity"}
        onClose={closeModal}
        title="Empresas con Bajo Nivel de Madurez"
        percentage="74%"
        description="En gestión de requisitos (IAG Consulting 2009)"
        source="IAG Consulting - Business Analysis Benchmark 2009"
        detailedExplanation="IAG Consulting desarrolló un modelo de madurez para evaluar qué tan bien las organizaciones gestionan los requisitos de negocio. Las empresas con 'bajo nivel de madurez' (niveles 1-2 de 5) carecen de procesos estructurados, documentación consistente y capacidades de gestión de requisitos desarrolladas."
        context="El estudio evaluó a más de 100 organizaciones y encontró que la mayoría operan con procesos ad-hoc o repetibles pero no sistemáticos. Esto significa que dependen de individuos específicos o equipos particulares en lugar de tener procesos organizacionales robustos."
        impact="Las empresas con bajo nivel de madurez logran sus objetivos de negocio solo el 54% de las veces, toman 35% más tiempo en entregar resultados, y experimentan significativo desperdicio de recursos debido a la falta de procesos efectivos de gestión de requisitos."
      />

      <StatisticsModal
        isOpen={modalOpen === "economic-impact"}
        onClose={closeModal}
        title="Desperdicio Económico por Gestión Deficiente"
        percentage="5.1%"
        description="Por cada dólar invertido en proyectos"
        source="Project Management Institute (PMI) - Pulse of the Profession 2014"
        sourceUrl="https://www.pmi.org/learning/thought-leadership/pulse/the-high-cost-of-low-performance-2014"
        detailedExplanation="El PMI calculó que las organizaciones desperdician un promedio de 5.1% de su inversión total en proyectos debido a una gestión deficiente de requisitos. Esto incluye costos de rework, cambios no controlados, retrasos, y proyectos que no cumplen con los objetivos originales."
        context="Este desperdicio se traduce en $51 millones perdidos por cada $1,000 millones invertidos en proyectos. Para una organización que invierte $10 millones anuales en proyectos, esto representa una pérdida de $510,000 al año solo por gestión deficiente de requisitos."
        impact="El impacto económico va más allá del desperdicio directo, incluyendo oportunidades perdidas, daño a la reputación, pérdida de confianza del cliente, y costos de oportunidad que podrían haberse invertido en nuevos proyectos exitosos."
      />
    </div>
  );
}
