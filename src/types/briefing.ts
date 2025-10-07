import { z } from "zod";

// Esquema de validación completo para el briefing
export const briefingFormSchema = z.object({
  // Información de contacto
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email no válido"),
  telefono: z.string().optional(),
  empresa: z.string().optional(),
  sitioWeb: z.string().url("URL no válida").optional().or(z.literal("")),

  // Objetivos del proyecto
  objetivoPrincipal: z
    .string()
    .min(10, "Describe al menos el objetivo principal"),
  problemasResolver: z
    .string()
    .min(10, "Describe qué problemas quieres resolver"),
  objetivosEspecificos: z.string().optional(),
  publicoObjetivo: z.string().min(10, "Describe tu público objetivo"),
  competencia: z.string().optional(),
  kpisExito: z.string().optional(),

  // Presupuesto y plazos
  presupuestoEstimado: z.enum([
    "no-definido",
    "<3000",
    "3000-8000",
    "8000-15000",
    "15000-30000",
    "30000+"
  ]),
  plazoPreferido: z.enum([
    "no-definido",
    "urgente",
    "1-2-meses",
    "3-6-meses",
    "flexible"
  ]),
  fechaLanzamiento: z.string().optional(),

  // Público objetivo
  edadRango: z.string().optional(),
  ubicacionGeografica: z.string().optional(),
  dispositivosPrincipales: z.array(z.string()).optional(),
  idiomasNecesarios: z.array(z.string()).optional(),

  // Tipo de proyecto y funcionalidades
  tipoProyecto: z
    .array(z.string())
    .min(1, "Selecciona al menos un tipo de proyecto"),
  funcionalidades: z.array(z.string()).optional(),
  funcionalidadesEsenciales: z.array(z.string()).optional(),
  funcionalidadesDeseadas: z.string().optional(),
  integraciones: z.array(z.string()).optional(),
  integracionesNecesarias: z.string().optional(),
  contenido: z.array(z.string()).optional(),
  requisitosSeguridadEspeciales: z.string().optional(),

  // Estilo visual
  tieneIdentidadCorporativa: z.enum(["si", "no", "parcialmente"]),
  tieneLogotipos: z.boolean(),
  coloresPreferidos: z.string().optional(),
  coloresEvitar: z.string().optional(),
  referencias: z.string().optional(),
  referenciasVisuales: z.string().optional(),
  estiloPreferido: z.array(z.string()).optional(),
  tonoComunicacion: z.enum([
    "profesional",
    "cercano",
    "juvenil",
    "elegante",
    "tecnico",
    "otro"
  ]),

  // Contenidos
  contenidosDisponibles: z.boolean(),
  numerosPaginasEstimadas: z.enum([
    "1-5",
    "6-10",
    "11-20",
    "21-50",
    ">50",
    "no-definido"
  ]),
  necesitaRedaccion: z.boolean(),
  necesitaFotografia: z.boolean(),
  necesitaVideos: z.boolean(),

  // Técnico
  tieneHostingActual: z.boolean(),
  necesitaDominio: z.boolean(),
  necesitaMigracion: z.boolean(),
  requisitosCMS: z.enum(["no", "si-simple", "si-avanzado", "no-se"]),
  requisitosSEO: z.boolean(),
  accesibilidadWCAG: z.boolean(),

  // Información adicional
  comentariosAdicionales: z.string().optional(),
  informacionAdicional: z.string().optional(),
  comoConociste: z
    .enum(["google", "redes-sociales", "recomendacion", "evento", "otro"])
    .optional(),

  // RGPD
  gdprConsent: z
    .boolean()
    .refine((val) => val === true, "Debes aceptar la política de privacidad")
});

export type BriefingFormData = z.infer<typeof briefingFormSchema>;
