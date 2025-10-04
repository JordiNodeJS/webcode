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
  objetivosEspecificos: z.string().optional(),
  publicoObjetivo: z.string().min(10, "Describe tu público objetivo"),
  competencia: z.string().optional(),

  // Tipo de proyecto y funcionalidades
  tipoProyecto: z.array(z.string()).min(1, "Selecciona al menos un tipo de proyecto"),
  funcionalidades: z.array(z.string()).min(1, "Selecciona al menos una funcionalidad"),
  integraciones: z.array(z.string()).optional(),
  contenido: z.array(z.string()).optional(),

  // Estilo visual
  tieneIdentidadCorporativa: z.enum(["si", "no", "parcialmente"]),
  coloresPreferidos: z.string().optional(),
  coloresEvitar: z.string().optional(),
  referencias: z.string().optional(),
  estiloPreferido: z.array(z.string()).optional(),

  // Presupuesto y plazos
  presupuesto: z.enum(["<3000", "3000-8000", "8000-15000", "15000-30000", "30000+", "no-se"]),
  plazoEntrega: z.enum(["urgente", "1-mes", "2-3-meses", "3-6-meses", "6+ meses", "flexible"]),
  fechaLanzamiento: z.string().optional(),

  // Información adicional
  comentariosAdicionales: z.string().optional(),
  comoConociste: z.string().optional(),

  // RGPD
  gdprConsent: z.boolean().refine((val) => val === true, "Debes aceptar la política de privacidad")
});

export type BriefingFormData = z.infer<typeof briefingFormSchema>;
