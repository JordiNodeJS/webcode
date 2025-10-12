"use client";

import { WSFadeIn } from "@/components/animations/ws-fade-in";
import { SingleEmojiToSvg } from "@/components/ui/emoji-to-svg";

interface Canal {
  icono: string;
  titulo: string;
  descripcion: string;
}

interface CommunicationChannelsProps {
  canales: Canal[];
}

export default function CommunicationChannels({
  canales,
}: CommunicationChannelsProps) {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Fondo con gradiente y patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/40 via-background to-muted/30" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(var(--primary-rgb),0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--primary-rgb),0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Blobs estáticos (optimizado) */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-2xl" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-secondary/10 rounded-full blur-2xl" />

      <div className="container mx-auto px-4 relative z-10">
        <WSFadeIn delay={0.2}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-webcode mb-4">
              Canales de Comunicación
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Siempre disponibles para mantenerte informado y resolver dudas
            </p>
          </div>
        </WSFadeIn>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {canales.map((canal, index) => (
            <WSFadeIn key={canal.titulo} delay={0.1 * (index + 1)}>
              <div className="group relative h-full">
                {/* Efecto de brillo en hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-25 blur-xl transition-all duration-700 rounded-2xl" />

                {/* Card con glassmorphism */}
                <div className="relative h-full bg-card/80 backdrop-blur-xl border-2 border-primary/20 rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:border-primary/40">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 flex items-start gap-4">
                    {/* Icono con efecto */}
                    <div className="relative flex-shrink-0">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/30 group-hover:border-primary/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                        <SingleEmojiToSvg
                          emoji={canal.icono}
                          size="xl"
                          variant="primary"
                          className="transform group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="absolute inset-0 rounded-2xl bg-primary/30 blur-lg opacity-0 group-hover:opacity-50 transition-all duration-500" />
                    </div>

                    {/* Contenido */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                        {canal.titulo}
                      </h3>
                      <p className="text-sm md:text-base text-muted-foreground group-hover:text-foreground transition-colors duration-300 leading-relaxed">
                        {canal.descripcion}
                      </p>

                      {/* Indicador de disponibilidad */}
                      <div className="mt-4 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-medium text-green-600 dark:text-green-400">
                          Disponible ahora
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Decoración inferior */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-b-2xl" />
                </div>
              </div>
            </WSFadeIn>
          ))}
        </div>

        {/* Nota adicional con diseño mejorado */}
        <WSFadeIn delay={0.6}>
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary opacity-20 blur-xl group-hover:opacity-30 transition-all duration-500 rounded-2xl" />
              <div className="relative bg-gradient-to-r from-primary/10 via-card/90 to-secondary/10 backdrop-blur-xl border border-primary/30 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <title>Information</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      <span className="font-semibold text-foreground">
                        Tiempo de respuesta garantizado:
                      </span>{" "}
                      Menos de 4 horas en horario laboral (9:00 - 18:00 CET).{" "}
                      Para urgencias críticas, disponemos de línea directa 24/7.
                    </p>
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
