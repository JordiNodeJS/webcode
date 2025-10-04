import { z } from "zod";

// Esquema de validación completo para el briefing
export const briefingFormSchema = z.object({
  // Información de contacto
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email no válido"),
  telefono: z.string().min(9, "Teléfono no válido"),
  empresa: z.string().optional(),
  sitioWeb: z.string().url("URL no válida").optional().or(z.literal("")),

  // Objetivos del proyecto
  objetivoPrincipal: z.string().min(10, "Describe al menos el objetivo principal"),
  problemasResolver: z.string().min(10, "Describe qué problemas quieres resolver"),
  objetivosEspecificos: z.string().optional(),
  publicoObjetivo: z.string().min(10, "Describe tu público objetivo"),
  competencia: z.string().optional(),
  kpisExito: z.string().optional(),

  // Presupuesto y plazos
  presupuestoEstimado: z.enum(["no-definido", "<3000", "3000-8000", "8000-15000", "15000-30000", "30000+"]),
  plazoPreferido: z.enum(["no-definido", "urgente", "1-mes", "2-3-meses", "3-6-meses", "6+ meses", "flexible"]),
  presupuesto: z.enum(["<3000", "3000-8000", "8000-15000", "15000-30000", "30000+", "no-se"]),
  plazoEntrega: z.enum(["urgente", "1-mes", "2-3-meses", "3-6-meses", "6+ meses", "flexible"]),
  fechaLanzamiento: z.string().optional(),

  // Público objetivo
  edadRango: z.string().optional(),
  ubicacionGeografica: z.string().optional(),
  dispositivosPrincipales: z.array(z.string()),
  idiomasNecesarios: z.array(z.string()),

  // Tipo de proyecto y funcionalidades
  tipoProyecto: z.array(z.string()).min(1, "Selecciona al menos un tipo de proyecto"),
  funcionalidades: z.array(z.string()).min(1, "Selecciona al menos una funcionalidad"),
  funcionalidadesEsenciales: z.array(z.string()),
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
  tonoComunicacion: z.string(),

  // Contenidos
  contenidosDisponibles: z.boolean(),
  numerosPaginasEstimadas: z.string(),
  necesitaRedaccion: z.boolean(),
  necesitaFotografia: z.boolean(),
  necesitaVideos: z.boolean(),

  // Técnico
  tieneHostingActual: z.boolean(),
  necesitaDominio: z.boolean(),
  necesitaMigracion: z.boolean(),
  requisitosCMS: z.string(),
  requisitosSEO: z.boolean(),
  accesibilidadWCAG: z.boolean(),

  // Información adicional
  comentariosAdicionales: z.string().optional(),
  informacionAdicional: z.string().optional(),
  comoConociste: z.string().optional(),

  // RGPD
  gdprConsent: z.boolean().refine((val) => val === true, "Debes aceptar la política de privacidad")
});

export type BriefingFormData = z.infer<typeof briefingFormSchema>;
