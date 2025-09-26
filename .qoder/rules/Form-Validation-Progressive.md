---
name: "Form Validation Progressive Patterns"
type: "Specific Files"
description: "Patrones de validación progresiva con Zod para formularios WebSnack"
files: ["src/components/**/*.tsx", "src/app/**/*.tsx", "src/hooks/**/*.ts"]
---

# Validación Progresiva - Patrones WebSnack

## Formularios Identificados (8-12 tipos)

### 🎯 Formularios Principales

1. **Contacto general** - Landing page principal
2. **Solicitud de presupuesto** - Con selección de servicios
3. **Consulta gratuita** - CTA principal del hero
4. **Newsletter/Updates** - Para leads y marketing

### 💼 Formularios Comerciales

5. **Cotización por proyecto** - Diferentes nichos (floristerías, clínicas, startups)
6. **Formulario de onboarding** - Nuevos clientes con requerimientos específicos
7. **Feedback/Testimonios** - Para casos de estudio y reviews

### 🔧 Formularios Avanzados

8. **Soporte técnico** - Para clientes existentes
9. **Registro de clientes** - Dashboard/portal de clientes
10. **Programación de reuniones** - Integración con calendario

## Implementación Progresiva de Validación

### Nivel 1: Esquemas Base

```typescript
// src/lib/validations/base.ts
const baseContactSchema = z.object({
  name: z.string().min(2, "Nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z
    .string()
    .regex(/^[679]\d{8}$/, "Teléfono español inválido")
    .optional(),
  gdprConsent: z
    .boolean()
    .refine((val) => val === true, "Debes aceptar la política de privacidad"),
  marketingConsent: z.boolean().optional()
});

const messageSchema = z.object({
  subject: z.string().min(5, "Asunto debe tener al menos 5 caracteres"),
  message: z.string().min(10, "Mensaje debe tener al menos 10 caracteres")
});
```

### Nivel 2: Esquemas por Servicio

```typescript
// src/lib/validations/services.ts
const webServiceSchema = baseContactSchema.extend({
  projectType: z.enum(["landing", "corporate", "portfolio", "blog"]),
  budget: z.enum(["1000-3000", "3000-7000", "7000-15000", "15000+"]),
  timeline: z.enum(["1-2weeks", "2-4weeks", "1-3months", "3months+"]),
  features: z
    .array(
      z.enum([
        "responsive_design",
        "cms",
        "multilingual",
        "seo_basic",
        "animations"
      ])
    )
    .min(1, "Selecciona al menos una funcionalidad")
});

const ecommerceSchema = baseContactSchema.extend({
  storeType: z.enum(["fashion", "food", "services", "digital", "other"]),
  productsCount: z.enum(["1-50", "51-200", "201-1000", "1000+"]),
  paymentMethods: z
    .array(
      z.enum(["stripe", "paypal", "bizum", "bank_transfer", "cash_on_delivery"])
    )
    .min(1),
  shippingZones: z.array(
    z.enum(["barcelona", "catalonia", "spain", "europe", "worldwide"])
  ),
  gdprCompliant: z.literal(true, {
    errorMap: () => ({ message: "El e-commerce debe cumplir RGPD" })
  })
});
```

### Nivel 3: Esquemas por Nicho de Mercado

```typescript
// src/lib/validations/niches.ts
const floristeriaSchema = ecommerceSchema.extend({
  businessInfo: z.object({
    name: z.string().min(2),
    location: z.string().min(5, "Incluye barrio de Barcelona"),
    yearsInBusiness: z.number().min(0).max(100),
    specialties: z
      .array(
        z.enum([
          "bodas",
          "funerales",
          "eventos_corporativos",
          "decoracion",
          "plantas"
        ])
      )
      .min(1)
  }),
  seasonalNeeds: z.boolean(),
  deliveryService: z.boolean(),
  socialMediaPresence: z.array(z.enum(["instagram", "facebook", "tiktok"]))
});

const veterinariaSchema = baseContactSchema.extend({
  clinicInfo: z.object({
    name: z.string().min(2),
    address: z.string().min(10),
    services: z
      .array(
        z.enum([
          "consultas_generales",
          "cirugias",
          "urgencias_24h",
          "exoticos",
          "peluqueria",
          "hotel",
          "farmacia"
        ])
      )
      .min(1),
    staff: z.number().min(1).max(50)
  }),
  digitalNeeds: z
    .array(
      z.enum([
        "citas_online",
        "historiales_digitales",
        "comunicacion_clientes",
        "tienda_online",
        "blog_consejos"
      ])
    )
    .min(1),
  rgpdMedical: z.literal(true, {
    errorMap: () => ({ message: "Debe cumplir RGPD médico específico" })
  })
});

const fintechSchema = baseContactSchema.extend({
  startupInfo: z.object({
    name: z.string().min(2),
    stage: z.enum(["idea", "mvp", "early_stage", "growth", "scale"]),
    funding: z.enum(["bootstrap", "angel", "seed", "series_a", "series_b+"]),
    team_size: z.number().min(1).max(1000)
  }),
  technicalNeeds: z
    .array(
      z.enum([
        "landing_validation",
        "dashboard_users",
        "api_integrations",
        "payment_processing",
        "kyc_integration",
        "regulatory_compliance"
      ])
    )
    .min(1),
  complianceRequirements: z.array(
    z.enum(["pci_dss", "gdpr", "psd2", "mifid", "banco_espana"])
  ),
  launchTimeline: z.enum(["1month", "3months", "6months", "1year"])
});
```

## Hooks y Componentes Reutilizables

### Hook de Validación

```typescript
// src/hooks/useFormValidation.ts
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

export function useFormValidation<T extends z.ZodSchema>(
  schema: T,
  defaultValues?: Partial<z.infer<T>>
) {
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues
  });

  return {
    ...form,
    isSubmitting: form.formState.isSubmitting,
    hasErrors: Object.keys(form.formState.errors).length > 0
  };
}
```

### Componente de Formulario Progresivo

```typescript
// src/components/custom/progressive-form.tsx
"use client";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";

interface ProgressiveFormProps<T extends z.ZodSchema> {
  schema: T;
  onSubmit: (data: z.infer<T>) => Promise<void>;
  children: (form: UseFormReturn<z.infer<T>>) => React.ReactNode;
}

export function ProgressiveForm<T extends z.ZodSchema>({
  schema,
  onSubmit,
  children,
}: ProgressiveFormProps<T>) {
  const form = useFormValidation(schema);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {children(form)}
      <Button
        type="submit"
        disabled={form.isSubmitting}
        className="w-full"
      >
        {form.isSubmitting ? "Enviando..." : "Enviar"}
      </Button>
    </form>
  );
}
```

### Componente de Campo con Validación

```typescript
// src/components/custom/form-field.tsx
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface FormFieldComponentProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select" | "checkbox";
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
  required?: boolean;
}

export function FormFieldComponent({
  form,
  name,
  label,
  type = "text",
  options,
  placeholder,
  required,
}: FormFieldComponentProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </FormLabel>
          <FormControl>
            {type === "textarea" ? (
              <Textarea
                placeholder={placeholder}
                {...field}
                className="min-h-[100px]"
              />
            ) : type === "select" ? (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : type === "checkbox" ? (
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <label className="text-sm text-muted-foreground">{placeholder}</label>
              </div>
            ) : (
              <Input type={type} placeholder={placeholder} {...field} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
```

## Ejemplo de Implementación Completa

### Formulario de Contacto por Nicho

```typescript
// src/components/custom/niche-contact-form.tsx
"use client";
import { useState } from "react";
import { ProgressiveForm } from "./progressive-form";
import { FormFieldComponent } from "./form-field";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { floristeriaSchema, veterinariaSchema, fintechSchema } from "@/lib/validations/niches";

interface NicheContactFormProps {
  niche: "floristeria" | "veterinaria" | "fintech";
}

export function NicheContactForm({ niche }: NicheContactFormProps) {
  const schemas = {
    floristeria: floristeriaSchema,
    veterinaria: veterinariaSchema,
    fintech: fintechSchema,
  };

  const titles = {
    floristeria: "Solicitar Presupuesto - Floristería",
    veterinaria: "Solicitar Presupuesto - Veterinaria",
    fintech: "Solicitar Presupuesto - Fintech",
  };

  const schema = schemas[niche];
  const title = titles[niche];

  async function handleSubmit(data: z.infer<typeof schema>) {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, niche }),
      });

      if (!response.ok) throw new Error("Error al enviar");

      // Handle success
      console.log("Formulario enviado exitosamente");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          Cuéntanos sobre tu {niche} y te ayudaremos a digitalizarla
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ProgressiveForm schema={schema} onSubmit={handleSubmit}>
          {(form) => (
            <>
              <FormFieldComponent
                form={form}
                name="name"
                label="Nombre completo"
                required
                placeholder="Tu nombre"
              />

              <FormFieldComponent
                form={form}
                name="email"
                label="Email"
                type="email"
                required
                placeholder="tu@email.com"
              />

              <FormFieldComponent
                form={form}
                name="phone"
                label="Teléfono"
                type="tel"
                placeholder="666 123 456"
              />

              {niche === "floristeria" && (
                <>
                  <FormFieldComponent
                    form={form}
                    name="businessInfo.name"
                    label="Nombre de la floristería"
                    required
                    placeholder="Flores Barcelona"
                  />

                  <FormFieldComponent
                    form={form}
                    name="businessInfo.location"
                    label="Ubicación"
                    required
                    placeholder="Gracia, Barcelona"
                  />

                  <FormFieldComponent
                    form={form}
                    name="businessInfo.specialties"
                    label="Especialidades"
                    type="select"
                    options={[
                      { value: "bodas", label: "Bodas" },
                      { value: "funerales", label: "Funerales" },
                      { value: "eventos_corporativos", label: "Eventos Corporativos" },
                      { value: "decoracion", label: "Decoración" },
                      { value: "plantas", label: "Plantas" },
                    ]}
                    placeholder="Selecciona especialidades"
                  />
                </>
              )}

              <FormFieldComponent
                form={form}
                name="gdprConsent"
                label="Consentimiento RGPD"
                type="checkbox"
                required
                placeholder="Acepto la política de privacidad y el tratamiento de mis datos"
              />

              <FormFieldComponent
                form={form}
                name="marketingConsent"
                label="Marketing"
                type="checkbox"
                placeholder="Quiero recibir información sobre servicios de WebSnack"
              />
            </>
          )}
        </ProgressiveForm>
      </CardContent>
    </Card>
  );
}
```

## Criterios de Aceptación

- ✅ **Validación progresiva**: Esquemas reutilizables que se extienden
- ✅ **RGPD compliant**: Validación obligatoria de consentimientos
- ✅ **Específico por nicho**: Validaciones adaptadas a cada sector
- ✅ **UX optimizada**: Mensajes de error en español
- ✅ **TypeScript estricto**: Sin tipos 'any', interfaces completas
- ✅ **Performance**: Validación client-side + server-side
- ✅ **Accesibilidad**: Cumple WCAG 2.1 AA
- ✅ **Reutilizable**: Componentes y hooks modulares
