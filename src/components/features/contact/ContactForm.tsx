"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle, Loader2, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Esquema de validación Zod
const contactFormSchema = z.object({
  email: z
    .string()
    .min(1, "El email es obligatorio")
    .email("Por favor, introduce un email válido"),
  subject: z.string().min(1, "El asunto es obligatorio"),
  serviceType: z
    .enum(["web-development", "e-commerce", "seo", "consulting", "other"])
    .optional()
    .refine((val) => val !== undefined, {
      message: "Por favor, selecciona un tipo de servicio"
    }),
  message: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(1000, "El mensaje no puede exceder los 1000 caracteres"),
  gdprConsent: z
    .boolean()
    .refine((val) => val === true, "Debes aceptar la política de privacidad")
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const serviceOptions = [
  { value: "web-development", label: "Desarrollo Web" },
  { value: "e-commerce", label: "Tienda Online (E-commerce)" },
  { value: "seo", label: "SEO y Posicionamiento" },
  { value: "consulting", label: "Consultoría Digital" },
  { value: "other", label: "Otro (especificar en mensaje)" }
];

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      email: "",
      subject: "",
      serviceType: undefined,
      message: "",
      gdprConsent: false
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    setFormStatus("submitting");
    setErrorMessage("");

    try {
      // Preparar datos para envío (incluir timestamp del consentimiento)
      const formData = {
        ...data,
        consentTimestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al enviar el formulario");
      }

      setFormStatus("success");
      form.reset();
    } catch (error) {
      console.error("Error al enviar formulario:", error);
      setFormStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo."
      );
    }
  };

  // Estado de éxito
  if (formStatus === "success") {
    return (
      <Card className="bg-gradient-to-br from-gradient-primary via-background to-gradient-secondary border-border/40 shadow-xl">
        <CardContent className="text-center py-8 space-y-4">
          <CheckCircle className="w-16 h-16 text-primary mx-auto" />
          <h3 className="text-2xl font-semibold text-foreground">
            ¡Mensaje enviado!
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Gracias por contactarnos. Hemos recibido tu mensaje y te
            responderemos lo antes posible a la dirección de email
            proporcionada.
          </p>
          <Button
            onClick={() => {
              setFormStatus("idle");
              form.reset();
            }}
            variant="outline"
          >
            Enviar otro mensaje
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="relative rounded-2xl p-0 overflow-hidden bg-gradient-to-br from-gradient-primary/40 via-background/80 to-gradient-secondary/40 border-border/30 shadow-xl backdrop-blur-sm dark:from-slate-800/40 dark:via-slate-900/60 dark:to-slate-800/40 light:shadow-primary/20 light:border-primary/20">
      <CardHeader className="pt-6">
        <CardTitle className="text-2xl font-semibold mb-2 text-card-foreground">
          Solicitar información
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="tu@email.com"
                      {...field}
                      disabled={formStatus === "submitting"}
                    />
                  </FormControl>
                  <FormDescription>
                    Solo utilizaremos tu email para responder a tu consulta
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Asunto */}
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asunto *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej: Solicitud de presupuesto para web corporativa"
                      {...field}
                      disabled={formStatus === "submitting"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Tipo de servicio */}
            <FormField
              control={form.control}
              name="serviceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de servicio *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={formStatus === "submitting"}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un servicio" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {serviceOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Mensaje */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensaje *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe tu proyecto, necesidades, presupuesto estimado, plazos, etc."
                      className="min-h-32"
                      {...field}
                      disabled={formStatus === "submitting"}
                    />
                  </FormControl>
                  <FormDescription>
                    {field.value?.length || 0}/1000 caracteres
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Consentimiento RGPD */}
            <FormField
              control={form.control}
              name="gdprConsent"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={formStatus === "submitting"}
                      />
                    </FormControl>
                    <div className="grid gap-1.5 leading-none">
                      <FormLabel className="text-sm font-normal cursor-pointer">
                        Acepto la política de privacidad y el tratamiento de mis
                        datos para responder a esta consulta *
                      </FormLabel>
                      <FormDescription className="text-xs">
                        Al marcar esta casilla, consientes el tratamiento de tu
                        email para responder a tu consulta según nuestra{" "}
                        <Link
                          href="/politica-de-privacidad"
                          className="underline text-primary"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Ir a la política de privacidad (se abre en una nueva pestaña)"
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
            {/* Mensaje de error */}
            {formStatus === "error" && (
              <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
            {/* Botón de envío */}
            <Button
              type="submit"
              className="w-full"
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
                  Enviar mensaje
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="p-4 md:p-6 bg-gradient-to-r from-gradient-muted via-background/70 to-gradient-muted rounded-b-2xl border-t border-border/30">
        <div className="w-full">
          <h4 className="text-sm font-medium text-foreground mb-2">
            Compromiso de privacidad
          </h4>
          <p className="text-xs text-muted-foreground/80">
            WEBCODE se compromete a proteger tu privacidad. Solo recopilamos tu
            dirección de email para responder a tu consulta. No utilizamos
            cookies de seguimiento ni compartimos tus datos con terceros. Puedes
            ejercer tus derechos de acceso, rectificación o supresión en
            cualquier momento.
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}

export default ContactForm;
