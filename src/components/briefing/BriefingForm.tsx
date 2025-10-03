"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle, Loader2, Send } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Esquema de validación completo
const briefingFormSchema = z.object({
  // Información de contacto
  email: z.string().email("Email inválido"),
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  empresa: z.string().optional(),
  telefono: z.string().optional(),

  // Paso 1: Objetivos del Proyecto
  objetivoPrincipal: z.string().min(10, "Describe brevemente el objetivo principal"),
  problemasResolver: z.string().min(10, "Describe los problemas a resolver"),
  presupuestoEstimado: z.enum(["<3000", "3000-8000", "8000-15000", "15000-30000", ">30000", "no-definido"]),
  plazoPreferido: z.enum(["urgente", "1-2-meses", "3-6-meses", "flexible", "no-definido"]),
  kpisExito: z.string().optional(),

  // Paso 2: Público Objetivo
  publicoObjetivo: z.string().min(10, "Describe tu público objetivo"),
  edadRango: z.string().optional(),
  ubicacionGeografica: z.string().optional(),
  dispositivosPrincipales: z.array(z.string()).min(1, "Selecciona al menos un dispositivo"),
  idiomasNecesarios: z.array(z.string()).min(1, "Selecciona al menos un idioma"),

  // Paso 3: Funcionalidades
  tipoProyecto: z.enum(["landing", "corporativa", "ecommerce", "webapp", "blog", "portal", "otro"]),
  funcionalidadesEsenciales: z.array(z.string()).min(1, "Selecciona al menos una funcionalidad"),
  funcionalidadesDeseadas: z.string().optional(),
  integracionesNecesarias: z.string().optional(),
  requisitosSeguridadEspeciales: z.string().optional(),

  // Paso 4: Estilo Visual y Marca
  tieneIdentidadCorporativa: z.boolean(),
  coloresPreferidos: z.string().optional(),
  referenciasVisuales: z.string().optional(),
  tonoComunicacion: z.enum(["profesional", "cercano", "juvenil", "elegante", "tecnico", "otro"]),
  tieneLogotipos: z.boolean(),

  // Paso 5: Contenidos
  contenidosDisponibles: z.boolean(),
  numerosPaginasEstimadas: z.enum(["1-5", "6-10", "11-20", "21-50", ">50", "no-definido"]),
  necesitaRedaccion: z.boolean(),
  necesitaFotografia: z.boolean(),
  necesitaVideos: z.boolean(),

  // Paso 6: Restricciones Técnicas
  tieneHostingActual: z.boolean(),
  necesitaDominio: z.boolean(),
  necesitaMigracion: z.boolean(),
  requisitosCMS: z.enum(["no", "si-simple", "si-avanzado", "no-se"]),
  requisitosSEO: z.boolean(),
  accesibilidadWCAG: z.boolean(),

  // Información adicional
  informacionAdicional: z.string().optional(),
  comoConociste: z.enum(["google", "redes-sociales", "recomendacion", "evento", "otro"]).optional(),

  // RGPD
  gdprConsent: z.boolean().refine((val) => val === true, "Debes aceptar la política de privacidad")
});

type BriefingFormData = z.infer<typeof briefingFormSchema>;

const TOTAL_STEPS = 7;
const STORAGE_KEY = "webcode-briefing-draft";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function BriefingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<BriefingFormData>({
    resolver: zodResolver(briefingFormSchema),
    defaultValues: {
      email: "",
      nombre: "",
      empresa: "",
      telefono: "",
      objetivoPrincipal: "",
      problemasResolver: "",
      presupuestoEstimado: "no-definido",
      plazoPreferido: "no-definido",
      kpisExito: "",
      publicoObjetivo: "",
      edadRango: "",
      ubicacionGeografica: "",
      dispositivosPrincipales: [],
      idiomasNecesarios: ["es"],
      tipoProyecto: "corporativa",
      funcionalidadesEsenciales: [],
      funcionalidadesDeseadas: "",
      integracionesNecesarias: "",
      requisitosSeguridadEspeciales: "",
      tieneIdentidadCorporativa: false,
      coloresPreferidos: "",
      referenciasVisuales: "",
      tonoComunicacion: "profesional",
      tieneLogotipos: false,
      contenidosDisponibles: false,
      numerosPaginasEstimadas: "no-definido",
      necesitaRedaccion: false,
      necesitaFotografia: false,
      necesitaVideos: false,
      tieneHostingActual: false,
      necesitaDominio: false,
      necesitaMigracion: false,
      requisitosCMS: "no-se",
      requisitosSEO: true,
      accesibilidadWCAG: false,
      informacionAdicional: "",
      comoConociste: undefined,
      gdprConsent: false
    }
  });

  // Guardar borrador en localStorage
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Cargar borrador al montar
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          form.reset(parsed);
        } catch (error) {
          console.error("Error loading draft:", error);
        }
      }
    }
  }, [form]);

  const onSubmit = async (data: BriefingFormData) => {
    setFormStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/briefing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al enviar el formulario");
      }

      setFormStatus("success");
      // Limpiar borrador
      if (typeof window !== "undefined") {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      console.error("Error:", error);
      setFormStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Error inesperado"
      );
    }
  };

  const nextStep = async () => {
    const fields = getFieldsForStep(currentStep);
    const isValid = await form.trigger(fields as any);
    if (isValid && currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const progress = (currentStep / TOTAL_STEPS) * 100;

  // Función para descargar PDF
  const downloadPDF = async () => {
    try {
      const formData = form.getValues();
      const response = await fetch("/api/briefing/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) throw new Error("Error al generar el PDF");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `briefing-${formData.nombre.replace(/\s+/g, "-").toLowerCase()}-${new Date().toISOString().split("T")[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Error al descargar el PDF. Por favor, inténtalo de nuevo.");
    }
  };

  // Estado de éxito
  if (formStatus === "success") {
    return (
      <Card className="max-w-2xl mx-auto bg-card/80 backdrop-blur-sm border-3 border-primary/30 shadow-brutal">
        <CardContent className="text-center py-12 space-y-6">
          <CheckCircle className="w-20 h-20 text-primary mx-auto" />
          <h2 className="text-3xl font-black text-foreground">
            ¡Briefing Recibido!
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Gracias por completar el formulario de briefing. Hemos recibido toda la información 
            y te responderemos en las próximas 24 horas con una propuesta personalizada.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              onClick={downloadPDF}
              variant="default" 
              size="lg"
              className="gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Descargar PDF
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/">Volver al inicio</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/proceso">Ver nuestro proceso</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progreso */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-foreground">
            Paso {currentStep} de {TOTAL_STEPS}
          </span>
          <span className="text-sm font-bold text-primary">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-3 bg-muted border-2 border-border" />
      </div>

      <Card className="bg-card/80 backdrop-blur-sm border-3 border-border shadow-brutal">
        <CardHeader>
          <CardTitle className="text-2xl font-black text-foreground">
            {getStepTitle(currentStep)}
          </CardTitle>
          <CardDescription className="text-base">
            {getStepDescription(currentStep)}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {renderStepContent(currentStep, form)}

              {/* Error message */}
              {formStatus === "error" && (
                <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 border-2 border-destructive/30 rounded-lg">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex gap-4 pt-6 border-t-2 border-border">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="flex-1"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Anterior
                  </Button>
                )}

                {currentStep < TOTAL_STEPS ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="flex-1"
                  >
                    Siguiente
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={formStatus === "submitting"}
                  >
                    {formStatus === "submitting" ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Enviar Briefing
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Tips */}
      <div className="mt-6 p-4 rounded-lg bg-muted/50 border-2 border-border">
        <p className="text-sm text-muted-foreground text-center">
          💡 <strong>Tip:</strong> Tu progreso se guarda automáticamente. Puedes cerrar esta página 
          y continuar más tarde desde donde lo dejaste.
        </p>
      </div>
    </div>
  );
}

// Helper functions
function getStepTitle(step: number): string {
  const titles = [
    "Información de Contacto",
    "Objetivos del Proyecto",
    "Público Objetivo",
    "Funcionalidades Requeridas",
    "Estilo Visual y Marca",
    "Contenidos",
    "Restricciones Técnicas y Resumen"
  ];
  return titles[step - 1] || "";
}

function getStepDescription(step: number): string {
  const descriptions = [
    "Comencemos con tus datos para poder contactarte",
    "Cuéntanos qué quieres lograr con tu proyecto web",
    "Define a quién va dirigido tu proyecto",
    "Especifica qué debe hacer tu sitio web",
    "Describe cómo quieres que se vea tu web",
    "Información sobre el contenido de tu web",
    "Detalles técnicos y confirmación final"
  ];
  return descriptions[step - 1] || "";
}

function getFieldsForStep(step: number): string[] {
  const fieldsByStep: Record<number, string[]> = {
    1: ["email", "nombre"],
    2: ["objetivoPrincipal", "problemasResolver", "presupuestoEstimado", "plazoPreferido"],
    3: ["publicoObjetivo", "dispositivosPrincipales", "idiomasNecesarios"],
    4: ["tipoProyecto", "funcionalidadesEsenciales"],
    5: ["tieneIdentidadCorporativa", "tonoComunicacion"],
    6: ["contenidosDisponibles", "numerosPaginasEstimadas"],
    7: ["gdprConsent"]
  };
  return fieldsByStep[step] || [];
}

function renderStepContent(step: number, form: any) {
  switch (step) {
    case 1:
      return <Step1ContactInfo form={form} />;
    case 2:
      return <Step2ProjectGoals form={form} />;
    case 3:
      return <Step3TargetAudience form={form} />;
    case 4:
      return <Step4Functionality form={form} />;
    case 5:
      return <Step5VisualStyle form={form} />;
    case 6:
      return <Step6Content form={form} />;
    case 7:
      return <Step7TechAndConsent form={form} />;
    default:
      return null;
  }
}

// Step Components
function Step1ContactInfo({ form }: any) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="nombre"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nombre completo *</FormLabel>
            <FormControl>
              <Input placeholder="Juan Pérez" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email *</FormLabel>
            <FormControl>
              <Input type="email" placeholder="juan@empresa.com" {...field} />
            </FormControl>
            <FormDescription>
              Te enviaremos la propuesta a este email
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="empresa"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Empresa / Proyecto</FormLabel>
            <FormControl>
              <Input placeholder="Mi Empresa S.L." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="telefono"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Teléfono</FormLabel>
            <FormControl>
              <Input type="tel" placeholder="+34 600 000 000" {...field} />
            </FormControl>
            <FormDescription>
              Opcional - para contacto rápido
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

function Step2ProjectGoals({ form }: any) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="objetivoPrincipal"
        render={({ field }) => (
          <FormItem>
            <FormLabel>¿Cuál es el objetivo principal de tu proyecto web? *</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Ej: Necesito una web corporativa para dar a conocer mis servicios y captar nuevos clientes..."
                className="min-h-24"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="problemasResolver"
        render={({ field }) => (
          <FormItem>
            <FormLabel>¿Qué problemas quieres resolver? *</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Ej: Mi web actual está anticuada, no recibo consultas online, la competencia me supera..."
                className="min-h-24"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="presupuestoEstimado"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Presupuesto estimado *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona rango" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="<3000">Menos de 3.000€</SelectItem>
                  <SelectItem value="3000-8000">3.000€ - 8.000€</SelectItem>
                  <SelectItem value="8000-15000">8.000€ - 15.000€</SelectItem>
                  <SelectItem value="15000-30000">15.000€ - 30.000€</SelectItem>
                  <SelectItem value=">30000">Más de 30.000€</SelectItem>
                  <SelectItem value="no-definido">Aún no definido</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="plazoPreferido"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plazo preferido *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona plazo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="urgente">Urgente (menos de 1 mes)</SelectItem>
                  <SelectItem value="1-2-meses">1-2 meses</SelectItem>
                  <SelectItem value="3-6-meses">3-6 meses</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                  <SelectItem value="no-definido">Aún no definido</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="kpisExito"
        render={({ field }) => (
          <FormItem>
            <FormLabel>¿Cómo medirás el éxito del proyecto?</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Ej: Incremento de consultas en un 30%, mejora del posicionamiento, más ventas online..."
                className="min-h-20"
                {...field}
              />
            </FormControl>
            <FormDescription>
              KPIs, métricas u objetivos específicos (opcional)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

function Step3TargetAudience({ form }: any) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="publicoObjetivo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Describe tu público objetivo *</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Ej: Empresas pequeñas y medianas de Barcelona que buscan servicios de consultoría..."
                className="min-h-24"
                {...field}
              />
            </FormControl>
            <FormDescription>
              ¿A quién va dirigido tu proyecto?
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="edadRango"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rango de edad</FormLabel>
              <FormControl>
                <Input placeholder="Ej: 25-45 años" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ubicacionGeografica"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ubicación geográfica</FormLabel>
              <FormControl>
                <Input placeholder="Ej: Barcelona, España" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="dispositivosPrincipales"
        render={() => (
          <FormItem>
            <FormLabel>Dispositivos principales * (selecciona todos los relevantes)</FormLabel>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2">
              {["Móvil", "Tablet", "Desktop", "Todos por igual"].map((dispositivo) => (
                <FormField
                  key={dispositivo}
                  control={form.control}
                  name="dispositivosPrincipales"
                  render={({ field }) => (
                    <FormItem
                      key={dispositivo}
                      className="flex items-center space-x-2"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(dispositivo)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, dispositivo])
                              : field.onChange(
                                  field.value?.filter((value: string) => value !== dispositivo)
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        {dispositivo}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="idiomasNecesarios"
        render={() => (
          <FormItem>
            <FormLabel>Idiomas necesarios * (selecciona todos)</FormLabel>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
              {[
                { value: "es", label: "Español" },
                { value: "ca", label: "Catalán" },
                { value: "en", label: "Inglés" },
                { value: "fr", label: "Francés" },
                { value: "de", label: "Alemán" },
                { value: "otro", label: "Otro" }
              ].map((idioma) => (
                <FormField
                  key={idioma.value}
                  control={form.control}
                  name="idiomasNecesarios"
                  render={({ field }) => (
                    <FormItem
                      className="flex items-center space-x-2"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(idioma.value)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, idioma.value])
                              : field.onChange(
                                  field.value?.filter((value: string) => value !== idioma.value)
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        {idioma.label}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

function Step4Functionality({ form }: any) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="tipoProyecto"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tipo de proyecto *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona tipo" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="landing">Landing Page</SelectItem>
                <SelectItem value="corporativa">Web Corporativa</SelectItem>
                <SelectItem value="ecommerce">Tienda Online (E-commerce)</SelectItem>
                <SelectItem value="webapp">Aplicación Web</SelectItem>
                <SelectItem value="blog">Blog / Revista Digital</SelectItem>
                <SelectItem value="portal">Portal / Plataforma</SelectItem>
                <SelectItem value="otro">Otro</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="funcionalidadesEsenciales"
        render={() => (
          <FormItem>
            <FormLabel>Funcionalidades esenciales * (selecciona todas las necesarias)</FormLabel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {[
                "Formulario de contacto",
                "Mapa interactivo",
                "Chat en vivo",
                "Reservas/Citas online",
                "Pago online",
                "Registro de usuarios",
                "Blog/Noticias",
                "Galería de imágenes",
                "Descargas (PDFs, docs)",
                "Área de clientes",
                "Integración redes sociales",
                "Newsletter"
              ].map((funcionalidad) => (
                <FormField
                  key={funcionalidad}
                  control={form.control}
                  name="funcionalidadesEsenciales"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(funcionalidad)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, funcionalidad])
                              : field.onChange(
                                  field.value?.filter((value: string) => value !== funcionalidad)
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        {funcionalidad}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="funcionalidadesDeseadas"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Otras funcionalidades deseadas</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe otras funcionalidades que te gustaría tener..."
                className="min-h-20"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="integracionesNecesarias"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Integraciones necesarias</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Ej: CRM, ERP, herramientas de email marketing, pasarelas de pago específicas..."
                className="min-h-20"
                {...field}
              />
            </FormControl>
            <FormDescription>
              APIs, servicios externos, etc.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

function Step5VisualStyle({ form }: any) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="tieneIdentidadCorporativa"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between rounded-lg border-2 border-border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">
                ¿Tienes identidad corporativa definida?
              </FormLabel>
              <FormDescription>
                Logo, colores, tipografía, manual de marca, etc.
              </FormDescription>
            </div>
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="tieneLogotipos"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between rounded-lg border-2 border-border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">
                ¿Tienes logotipo?
              </FormLabel>
              <FormDescription>
                Logo en formato vectorial o alta calidad
              </FormDescription>
            </div>
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="coloresPreferidos"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Colores preferidos</FormLabel>
            <FormControl>
              <Input 
                placeholder="Ej: Azul corporativo, verde menta, tonos cálidos..."
                {...field}
              />
            </FormControl>
            <FormDescription>
              Colores que te gustaría usar o códigos hex (#FF6680)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="referenciasVisuales"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Referencias visuales</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Pega URLs de webs que te inspiren o describe el estilo que buscas..."
                className="min-h-24"
                {...field}
              />
            </FormControl>
            <FormDescription>
              URLs de webs que te gusten o descripciones
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="tonoComunicacion"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tono de comunicación *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona tono" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="profesional">Profesional y formal</SelectItem>
                <SelectItem value="cercano">Cercano y amigable</SelectItem>
                <SelectItem value="juvenil">Juvenil y moderno</SelectItem>
                <SelectItem value="elegante">Elegante y sofisticado</SelectItem>
                <SelectItem value="tecnico">Técnico y especializado</SelectItem>
                <SelectItem value="otro">Otro</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              ¿Cómo quieres comunicarte con tu audiencia?
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

function Step6Content({ form }: any) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="contenidosDisponibles"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between rounded-lg border-2 border-border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">
                ¿Tienes los contenidos preparados?
              </FormLabel>
              <FormDescription>
                Textos, imágenes, videos que quieres incluir
              </FormDescription>
            </div>
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="numerosPaginasEstimadas"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Número estimado de páginas/secciones *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona rango" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="1-5">1-5 páginas</SelectItem>
                <SelectItem value="6-10">6-10 páginas</SelectItem>
                <SelectItem value="11-20">11-20 páginas</SelectItem>
                <SelectItem value="21-50">21-50 páginas</SelectItem>
                <SelectItem value=">50">Más de 50 páginas</SelectItem>
                <SelectItem value="no-definido">Aún no definido</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-3 rounded-lg border-2 border-border p-4">
        <p className="text-sm font-medium">¿Necesitas ayuda con...?</p>
        
        <FormField
          control={form.control}
          name="necesitaRedaccion"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-normal cursor-pointer">
                Redacción de contenidos
              </FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="necesitaFotografia"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-normal cursor-pointer">
                Fotografía profesional
              </FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="necesitaVideos"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-normal cursor-pointer">
                Producción de videos
              </FormLabel>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

function Step7TechAndConsent({ form }: any) {
  return (
    <div className="space-y-4">
      <div className="space-y-3 rounded-lg border-2 border-border p-4">
        <p className="text-sm font-medium">Infraestructura técnica</p>
        
        <FormField
          control={form.control}
          name="tieneHostingActual"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-normal cursor-pointer">
                Tengo hosting actual
              </FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="necesitaDominio"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-normal cursor-pointer">
                Necesito registrar dominio
              </FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="necesitaMigracion"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-normal cursor-pointer">
                Necesito migración desde web existente
              </FormLabel>
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="requisitosCMS"
        render={({ field }) => (
          <FormItem>
            <FormLabel>¿Necesitas gestionar el contenido tú mismo? (CMS) *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona opción" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="no">No, prefiero delegar la gestión</SelectItem>
                <SelectItem value="si-simple">Sí, panel simple para textos e imágenes</SelectItem>
                <SelectItem value="si-avanzado">Sí, CMS completo (WordPress, etc.)</SelectItem>
                <SelectItem value="no-se">No lo sé aún</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-3 rounded-lg border-2 border-border p-4">
        <p className="text-sm font-medium">Requisitos adicionales</p>
        
        <FormField
          control={form.control}
          name="requisitosSEO"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-normal cursor-pointer">
                Optimización SEO básica incluida
              </FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accesibilidadWCAG"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-normal cursor-pointer">
                Accesibilidad WCAG (requisito legal)
              </FormLabel>
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="comoConociste"
        render={({ field }) => (
          <FormItem>
            <FormLabel>¿Cómo nos conociste?</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona opción" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="google">Google u otro buscador</SelectItem>
                <SelectItem value="redes-sociales">Redes sociales</SelectItem>
                <SelectItem value="recomendacion">Recomendación</SelectItem>
                <SelectItem value="evento">Evento o networking</SelectItem>
                <SelectItem value="otro">Otro</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="informacionAdicional"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Información adicional</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="¿Algo más que quieras contarnos sobre tu proyecto?"
                className="min-h-24"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* RGPD Consent */}
      <FormField
        control={form.control}
        name="gdprConsent"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-start space-x-3 rounded-lg border-3 border-primary/30 bg-primary/5 p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="grid gap-1.5 leading-none">
                <FormLabel className="text-sm font-medium cursor-pointer">
                  Acepto la política de privacidad y el tratamiento de mis datos *
                </FormLabel>
                <FormDescription className="text-xs">
                  Al enviar este formulario, consientes el tratamiento de tus datos 
                  para elaborar una propuesta según nuestra{" "}
                  <Link
                    href="/politica-privacidad"
                    className="underline text-primary font-medium"
                    target="_blank"
                  >
                    política de privacidad
                  </Link>
                  .
                </FormDescription>
              </div>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

