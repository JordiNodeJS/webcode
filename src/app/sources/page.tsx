import { AlertTriangle, ExternalLink, FileText, TrendingUp } from 'lucide-react'
import type { Metadata } from 'next'
import { WSFadeIn } from '@/components/animations/ws-fade-in'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Fuentes y Estadísticas | WebCode - Datos Verificables',
  description: 'Fuentes oficiales y estadísticas verificables sobre gestión de proyectos y requisitos. Datos del Project Management Institute (PMI) y estudios complementarios.',
  keywords: ['fuentes', 'estadísticas', 'PMI', 'gestión proyectos', 'requisitos', 'verificable'],
  openGraph: {
    title: 'Fuentes y Estadísticas | WebCode',
    description: 'Fuentes oficiales y estadísticas verificables sobre gestión de proyectos y requisitos.',
  },
}

export default function SourcesPage() {
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
              Estadísticas <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Verificables</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Todas nuestras estadísticas provienen de fuentes oficiales y estudios verificables. 
              Transparencia total en nuestros datos.
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
                      de los proyectos fallidos se deben a gestión deficiente de requisitos
                    </p>
                  </div>
                  
                  <div className="border-t-2 border-primary/20 pt-4">
                    <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      Fuente Oficial
                    </h4>
                    <div className="bg-muted/50 p-4 rounded-xl">
                      <p className="font-semibold mb-2">Project Management Institute (PMI)</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        Pulse of the Profession 2014 - "The High Cost of Low Performance"
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
                  <div className="bg-background/80 p-6 rounded-2xl border-2 border-accent/20">
                    <div className="text-center mb-4">
                      <div className="text-4xl font-black text-accent mb-2">
                        37%
                      </div>
                      <p className="font-semibold">
                        Recolección inadecuada de requisitos
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Causa principal de fracaso en proyectos (PMI 2014)
                      </p>
                    </div>
                  </div>

                  {/* IAG Consulting */}
                  <div className="bg-background/80 p-6 rounded-2xl border-2 border-secondary/20">
                    <div className="text-center mb-4">
                      <div className="text-4xl font-black text-secondary mb-2">
                        74%
                      </div>
                      <p className="font-semibold">
                        Empresas con bajo nivel de madurez
                      </p>
                      <p className="text-sm text-muted-foreground">
                        En gestión de requisitos (IAG Consulting 2009)
                      </p>
                    </div>
                  </div>

                  {/* Impacto Económico */}
                  <div className="bg-background/80 p-6 rounded-2xl border-2 border-primary/20 md:col-span-2">
                    <div className="text-center mb-4">
                      <div className="text-4xl font-black text-primary mb-2">
                        5.1%
                      </div>
                      <p className="font-semibold">
                        Desperdicio económico por gestión deficiente
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Equivale a $51 millones desperdiciados por cada $1,000 millones invertidos
                      </p>
                    </div>
                  </div>
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
                        <span>Solo utilizamos fuentes oficiales y verificables</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>Transparencia total en nuestras estadísticas</span>
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
                        <p className="font-semibold text-sm">Project Management Institute (PMI)</p>
                        <p className="text-xs text-muted-foreground">Organización líder mundial en gestión de proyectos</p>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="font-semibold text-sm">IAG Consulting</p>
                        <p className="text-xs text-muted-foreground">Consultora especializada en análisis de requisitos</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/10 p-6 rounded-2xl border-2 border-primary/20">
                  <h4 className="font-bold text-lg mb-3">¿Por qué es importante la verificación de fuentes?</h4>
                  <p className="text-sm text-muted-foreground">
                    En WebCode creemos en la transparencia total. Todas nuestras estadísticas son verificables 
                    y provienen de organizaciones reconocidas. Esto nos permite construir confianza con nuestros 
                    clientes y proporcionar información precisa para la toma de decisiones.
                  </p>
                </div>

                <div className="bg-accent/10 p-6 rounded-2xl border-2 border-accent/20">
                  <h4 className="font-bold text-lg mb-3">📅 Relevancia del Estudio PMI 2014</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Aunque este estudio es de 2014, sigue siendo la referencia más reciente y confiable sobre 
                    gestión de requisitos. Los estudios posteriores del PMI y otras organizaciones se han 
                    enfocado en transformación digital, metodologías ágiles y otros aspectos, pero no han 
                    actualizado específicamente las estadísticas sobre fallos por requisitos mal definidos.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Contexto actual:</strong> La industria se ha movido hacia metodologías ágiles, 
                    pero los principios fundamentales de gestión de requisitos siguen siendo críticos para 
                    el éxito de cualquier proyecto, independientemente de la metodología utilizada.
                  </p>
                </div>
              </CardContent>
            </Card>
          </WSFadeIn>
        </div>
      </div>
    </div>
  )
}
