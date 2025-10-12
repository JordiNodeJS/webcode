"use client";

import { WSFadeIn } from "@/components/animations/ws-fade-in";
import { SingleEmojiToSvg } from "@/components/ui/emoji-to-svg";

interface Garantia {
  icono: string;
  titulo: string;
  descripcion: string;
}

interface QualityGuaranteesProps {
  garantias: Garantia[];
}

export default function QualityGuarantees({
  garantias,
}: QualityGuaranteesProps) {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Fondo estático (optimizado) */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-2xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-2xl" />
      </div>

      {/* Pattern decorativo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(var(--primary-rgb),0.05)_1px,transparent_1px)] bg-[size:3rem_3rem]" />

      <div className="container mx-auto px-4 relative z-10">
        <WSFadeIn delay={0.2}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-webcode mb-4">
              Garantías de Calidad
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Compromisos claros que garantizan la excelencia de tu proyecto
            </p>
          </div>
        </WSFadeIn>

        {/* Grid de garantías con efectos modernos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
          {garantias.map((garantia, index) => (
            <WSFadeIn key={garantia.titulo} delay={0.1 * (index + 1)}>
              <div className="group relative h-full">
                {/* Brillo de fondo en hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-700 rounded-2xl" />

                {/* Card con glassmorphism */}
                <div className="relative h-full bg-card/80 backdrop-blur-xl border-2 border-primary/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:scale-105">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    {/* Icono con efecto */}
                    <div className="relative mb-4 inline-block">
                      <div className="transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                        <SingleEmojiToSvg
                          emoji={garantia.icono}
                          size="xl"
                          variant="primary"
                          className="text-5xl md:text-6xl"
                        />
                      </div>
                      <div className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500">
                        <SingleEmojiToSvg
                          emoji={garantia.icono}
                          size="xl"
                          variant="primary"
                          className="text-5xl md:text-6xl"
                        />
                      </div>
                    </div>

                    {/* Título */}
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {garantia.titulo}
                    </h3>

                    {/* Descripción */}
                    <p className="text-sm md:text-base text-muted-foreground group-hover:text-foreground transition-colors duration-300 leading-relaxed">
                      {garantia.descripcion}
                    </p>

                    {/* Decoración inferior */}
                    <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-700" />
                  </div>
                </div>
              </div>
            </WSFadeIn>
          ))}
        </div>

        {/* Card destacada: Protección del Cliente */}
        <WSFadeIn delay={0.8}>
          <div className="max-w-5xl mx-auto">
            <div className="group relative">
              {/* Brillo exterior optimizado */}
              <div className="absolute -inset-2 bg-gradient-to-r from-primary via-secondary to-primary opacity-20 blur-2xl group-hover:opacity-40 transition-all duration-700 rounded-3xl" />

              {/* Card principal con glassmorphism premium */}
              <div className="relative bg-gradient-to-br from-primary/10 via-card/90 to-secondary/10 backdrop-blur-2xl border-2 border-primary/30 rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden">
                {/* Pattern decorativo interno */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.1),transparent_70%)]" />

                {/* Contenido */}
                <div className="relative z-10">
                  {/* Título principal con icono */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 mb-4">
                      <div className="text-5xl">🛡️</div>
                      <h3 className="text-3xl md:text-4xl font-bold text-gradient-webcode">
                        Protección del Cliente
                      </h3>
                      <div className="text-5xl">🔐</div>
                    </div>
                    <p className="text-muted-foreground">
                      Tu inversión está protegida en cada paso del camino
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Seguridad contractual */}
                    <div className="group/card relative">
                      <div className="absolute -inset-1 bg-primary/20 rounded-2xl blur-xl group-hover/card:blur-2xl transition-all duration-300" />
                      <div className="relative bg-card/50 backdrop-blur-sm border border-primary/30 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-2xl shadow-lg">
                            🔐
                          </div>
                          <h4 className="text-xl font-bold text-foreground">
                            Seguridad contractual
                          </h4>
                        </div>
                        <ul className="space-y-3">
                          <li className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
                            <span className="text-primary font-bold text-lg flex-shrink-0 flex items-center justify-center w-5 h-5">
                              ✓
                            </span>
                            <span>Contrato con entregables definidos</span>
                          </li>
                          <li className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
                            <span className="text-primary font-bold text-lg flex-shrink-0 flex items-center justify-center w-5 h-5">
                              ✓
                            </span>
                            <span>Pagos por milestones (40%, 35%, 25%)</span>
                          </li>
                          <li className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
                            <span className="text-primary font-bold text-lg flex-shrink-0 flex items-center justify-center w-5 h-5">
                              ✓
                            </span>
                            <span>Garantía de satisfacción 15 días</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Soporte y backup */}
                    <div className="group/card relative">
                      <div className="absolute -inset-1 bg-secondary/20 rounded-2xl blur-xl group-hover/card:blur-2xl transition-all duration-300" />
                      <div className="relative bg-card/50 backdrop-blur-sm border border-secondary/30 rounded-2xl p-6 hover:border-secondary/50 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center text-2xl shadow-lg">
                            🛡️
                          </div>
                          <h4 className="text-xl font-bold text-foreground">
                            Soporte y backup
                          </h4>
                        </div>
                        <ul className="space-y-3">
                          <li className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
                            <span className="text-secondary font-bold text-lg flex-shrink-0 flex items-center justify-center w-5 h-5">
                              ✓
                            </span>
                            <span>Escalación directa al equipo senior</span>
                          </li>
                          <li className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
                            <span className="text-secondary font-bold text-lg flex-shrink-0 flex items-center justify-center w-5 h-5">
                              ✓
                            </span>
                            <span>Backup completo y versionado Git</span>
                          </li>
                          <li className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
                            <span className="text-secondary font-bold text-lg flex-shrink-0 flex items-center justify-center w-5 h-5">
                              ✓
                            </span>
                            <span>30 días de soporte premium incluido</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Badge de confianza */}
                  <div className="mt-8 text-center">
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 border border-primary/30">
                      <span className="text-2xl">⭐</span>
                      <span className="text-sm font-semibold text-foreground">
                        100% de satisfacción en proyectos completados
                      </span>
                      <span className="text-2xl">⭐</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </WSFadeIn>
      </div>
    </section>
  );
}
