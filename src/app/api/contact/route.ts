import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import type { EmailResponse } from "@/types/resend";

// Importación dinámica de Resend para evitar problemas de Edge Runtime
async function getResend() {
  const { Resend } = await import("resend");
  return new Resend(process.env.RESEND_API_KEY);
}

// Tipo para los metadatos de la request
interface RequestMetadata {
  ip: string;
  referer: string;
  timestamp: string;
  userAgent: string;
}

// Esquema de validación para el servidor
const contactFormServerSchema = z.object({
  email: z.string().email("Email inválido"),
  subject: z.string().min(1, "El asunto es obligatorio"),
  serviceType: z.enum([
    "web-development",
    "e-commerce",
    "seo",
    "consulting",
    "other"
  ]),
  message: z.string().min(10).max(1000),
  gdprConsent: z
    .boolean()
    .refine((val) => val === true, "Consentimiento RGPD requerido"),
  consentTimestamp: z.string(),
  userAgent: z.string().optional(),
  timestamp: z.string(),
  // Campo honeypot - debe estar vacío
  website: z.string().optional().refine((val) => !val || val.trim() === "", {
    message: "Bot detected"
  })
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validar datos del formulario
    const validatedData = contactFormServerSchema.parse(body);

    // Obtener información adicional de la request
    const clientIP =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const referer = request.headers.get("referer") || "direct";

    // Datos completos para logging/envío
    const contactData = {
      ...validatedData,
      metadata: {
        ip: clientIP,
        referer,
        timestamp: new Date().toISOString(),
        userAgent: validatedData.userAgent || "unknown"
      }
    };

    // Enviar email con Resend
    const emailResult = await sendEmailWithResend(contactData);

    if (!emailResult.success) {
      console.error("❌ Error enviando email:", emailResult.error);
      throw new Error(emailResult.error || "Error enviando email");
    }

    // Respuesta de éxito
    return NextResponse.json({
      success: true,
      message: "Mensaje enviado correctamente",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("❌ Error en formulario de contacto:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Datos del formulario inválidos",
          details: error.issues
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: "Error interno del servidor",
        message:
          "No se pudo procesar tu mensaje. Por favor, inténtalo de nuevo."
      },
      { status: 500 }
    );
  }
}

// Función para enviar email con Resend
async function sendEmailWithResend(
  contactData: z.infer<typeof contactFormServerSchema> & {
    metadata: RequestMetadata;
  }
): Promise<EmailResponse> {
  try {
    const emailContent = {
      from: process.env.RESEND_FROM_EMAIL || "contacto@webcode.es",
      to: process.env.RESEND_TO_EMAIL || "info@webcode.es",
      subject: `Nueva consulta: ${contactData.subject}`,
      html: _generateEmailTemplate(contactData),
      text: generatePlainTextEmail(contactData),
      replyTo: contactData.email
    };

    // Email send initiated (logs removed for production cleanliness)

    const resend = await getResend();
    const result = await resend.emails.send(emailContent);

    if (result.error) {
      return { success: false, error: result.error.message };
    }

    return { success: true, id: result.data?.id };
  } catch (error) {
    console.error("❌ Error en sendEmailWithResend:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido"
    };
  }
}

// Template de email preparado para Resend
function toSafeContact(data: unknown) {
  // Extrae de forma defensiva las propiedades que esperamos del body
  const unk = data as unknown as Record<string, unknown> | undefined;

  const safe = {
    email:
      typeof unk?.email === "string" ? unk.email : "desconocido@webcode.es",
    subject: typeof unk?.subject === "string" ? unk.subject : "(sin asunto)",
    serviceType:
      typeof unk?.serviceType === "string" ? unk.serviceType : "other",
    message: typeof unk?.message === "string" ? unk.message : "",
    consentTimestamp:
      typeof unk?.consentTimestamp === "string"
        ? unk.consentTimestamp
        : new Date().toISOString(),
    timestamp:
      typeof unk?.timestamp === "string"
        ? unk.timestamp
        : new Date().toISOString(),
    metadata:
      typeof unk?.metadata === "object" && unk?.metadata !== null
        ? (unk.metadata as Record<string, unknown>)
        : {}
  } as const;

  return safe;
}

function _generateEmailTemplate(data: unknown): string {
  // Obtener una versión segura del objeto
  const safe = toSafeContact(data);
  const serviceTypeLabels: Record<string, string> = {
    "web-development": "Desarrollo Web",
    "e-commerce": "Tienda Online (E-commerce)",
    seo: "SEO y Posicionamiento",
    consulting: "Consultoría Digital",
    other: "Otro"
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Nueva consulta de WEBCODE</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #3b82f6; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
        .footer { background: #374151; color: white; padding: 15px; border-radius: 0 0 8px 8px; font-size: 12px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #374151; }
        .consent { background: #dcfce7; padding: 10px; border-radius: 4px; border-left: 4px solid #22c55e; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚀 Nueva consulta de WEBCODE</h1>
          <p>Recibida el ${new Date(safe.timestamp).toLocaleString("es-ES")}</p>
        </div>
        
        <div class="content">
          <div class="field">
            <div class="label">Email del cliente:</div>
            <div>${safe.email}</div>
          </div>
          
          <div class="field">
            <div class="label">Asunto:</div>
            <div>${safe.subject}</div>
          </div>
          
          <div class="field">
            <div class="label">Tipo de servicio:</div>
            <div>${
              serviceTypeLabels[safe.serviceType] || safe.serviceType
            }</div>
          </div>
          
          <div class="field">
            <div class="label">Mensaje:</div>
            <div style="white-space: pre-wrap; background: white; padding: 15px; border-radius: 4px; border: 1px solid #d1d5db;">${
              safe.message
            }</div>
          </div>
          
          <div class="consent">
            <div class="label">✅ Consentimiento RGPD:</div>
            <div>El usuario ha aceptado la política de privacidad el ${new Date(
              safe.consentTimestamp
            ).toLocaleString("es-ES")}</div>
          </div>
          
          <div class="field" style="margin-top: 20px; font-size: 12px; color: #6b7280;">
            <div><strong>Información técnica:</strong></div>
            <div>IP: ${safe.metadata?.ip ?? "unknown"}</div>
            <div>User Agent: ${safe.metadata?.userAgent ?? "unknown"}</div>
            <div>Referer: ${safe.metadata?.referer ?? "direct"}</div>
          </div>
        </div>
        
        <div class="footer">
          <p>Este email fue generado automáticamente por el formulario de contacto de WEBCODE.</p>
          <p>Para responder al cliente, simplemente responde a este email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Template de email en texto plano
function generatePlainTextEmail(data: unknown): string {
  const safe = toSafeContact(data);
  const serviceTypeLabels: Record<string, string> = {
    "web-development": "Desarrollo Web",
    "e-commerce": "Tienda Online (E-commerce)",
    seo: "SEO y Posicionamiento",
    consulting: "Consultoría Digital",
    other: "Otro"
  };

  return `
🚀 NUEVA CONSULTA DE WEBCODE

Recibida el ${new Date(safe.timestamp).toLocaleString("es-ES")}

EMAIL DEL CLIENTE: ${safe.email}
ASUNTO: ${safe.subject}
TIPO DE SERVICIO: ${serviceTypeLabels[safe.serviceType] || safe.serviceType}

MENSAJE:
${safe.message}

✅ CONSENTIMIENTO RGPD:
El usuario ha aceptado la política de privacidad el ${new Date(
    safe.consentTimestamp
  ).toLocaleString("es-ES")}

INFORMACIÓN TÉCNICA:
IP: ${safe.metadata?.ip ?? "unknown"}
User Agent: ${safe.metadata?.userAgent ?? "unknown"}
Referer: ${safe.metadata?.referer ?? "direct"}

---
Este email fue generado automáticamente por el formulario de contacto de WEBCODE.
Para responder al cliente, simplemente responde a este email.
  `.trim();
}
