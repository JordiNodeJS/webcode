import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { briefingFormSchema } from "@/types/briefing";
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

// Esquema de validación para el servidor (añadir campos adicionales)
const briefingFormServerSchema = briefingFormSchema.extend({
  timestamp: z.string(),
  userAgent: z.string().optional(),
  // Campo honeypot - debe estar vacío
  website: z
    .string()
    .optional()
    .refine((val) => !val || val.trim() === "", {
      message: "Bot detected"
    })
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validar datos del formulario
    const validatedData = briefingFormServerSchema.parse(body);

    // Obtener información adicional de la request
    const clientIP =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const referer = request.headers.get("referer") || "direct";

    // Datos completos para logging/envío
    const briefingData = {
      ...validatedData,
      metadata: {
        ip: clientIP,
        referer,
        timestamp: new Date().toISOString(),
        userAgent: validatedData.userAgent || "unknown"
      }
    };

    // Enviar email con Resend
    const emailResult = await sendBriefingEmailWithResend(briefingData);

    if (!emailResult.success) {
      console.error("❌ Error enviando email de briefing:", emailResult.error);
      throw new Error(emailResult.error || "Error enviando email");
    }

    // Respuesta de éxito
    return NextResponse.json({
      success: true,
      message: "Briefing enviado correctamente",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("❌ Error en formulario de briefing:", error);

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
          "No se pudo procesar tu briefing. Por favor, inténtalo de nuevo."
      },
      { status: 500 }
    );
  }
}

// Función para enviar email de briefing con Resend
async function sendBriefingEmailWithResend(
  briefingData: z.infer<typeof briefingFormServerSchema> & {
    metadata: RequestMetadata;
  }
): Promise<EmailResponse> {
  try {
    const emailContent = {
      from: process.env.RESEND_FROM_EMAIL || "contacto@webcode.es",
      to: process.env.RESEND_TO_EMAIL || "info@webcode.es",
      subject: `Nuevo Briefing de Proyecto: ${briefingData.empresa || briefingData.nombre}`,
      html: generateBriefingEmailTemplate(briefingData),
      text: generateBriefingPlainTextEmail(briefingData),
      replyTo: briefingData.email
    };

    const resend = await getResend();
    const result = await resend.emails.send(emailContent);

    if (result.error) {
      return { success: false, error: result.error.message };
    }

    return { success: true, id: result.data?.id };
  } catch (error) {
    console.error("❌ Error en sendBriefingEmailWithResend:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido"
    };
  }
}

// Template de email HTML para briefing
function generateBriefingEmailTemplate(
  data: z.infer<typeof briefingFormServerSchema> & { metadata: RequestMetadata }
): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Nuevo Briefing de Proyecto - WEBCODE</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { background: #3b82f6; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
        .footer { background: #374151; color: white; padding: 15px; border-radius: 0 0 8px 8px; font-size: 12px; }
        .section { margin-bottom: 25px; padding: 15px; background: white; border-radius: 6px; border-left: 4px solid #3b82f6; }
        .section-title { font-weight: bold; color: #1e40af; margin-bottom: 10px; font-size: 16px; }
        .field { margin-bottom: 12px; }
        .label { font-weight: bold; color: #374151; }
        .value { margin-top: 4px; padding: 8px; background: #f3f4f6; border-radius: 4px; }
        .consent { background: #dcfce7; padding: 15px; border-radius: 6px; border-left: 4px solid #22c55e; margin-top: 20px; }
        .checkbox-list { display: flex; flex-wrap: wrap; gap: 8px; }
        .checkbox-item { background: #e0e7ff; color: #3730a3; padding: 4px 8px; border-radius: 4px; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📋 Nuevo Briefing de Proyecto</h1>
          <p>Recibido el ${new Date(data.timestamp).toLocaleString("es-ES")}</p>
        </div>
        
        <div class="content">
          <!-- Información de Contacto -->
          <div class="section">
            <div class="section-title">👤 Información de Contacto</div>
            <div class="field">
              <div class="label">Nombre:</div>
              <div class="value">${data.nombre}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${data.email}</div>
            </div>
            <div class="field">
              <div class="label">Teléfono:</div>
              <div class="value">${data.telefono}</div>
            </div>
            ${
              data.empresa
                ? `
            <div class="field">
              <div class="label">Empresa:</div>
              <div class="value">${data.empresa}</div>
            </div>
            `
                : ""
            }
            ${
              data.sitioWeb
                ? `
            <div class="field">
              <div class="label">Sitio Web Actual:</div>
              <div class="value">${data.sitioWeb}</div>
            </div>
            `
                : ""
            }
          </div>

          <!-- Objetivos del Proyecto -->
          <div class="section">
            <div class="section-title">🎯 Objetivos del Proyecto</div>
            <div class="field">
              <div class="label">Objetivo Principal:</div>
              <div class="value">${data.objetivoPrincipal}</div>
            </div>
            <div class="field">
              <div class="label">Problemas a Resolver:</div>
              <div class="value">${data.problemasResolver}</div>
            </div>
            ${
              data.kpisExito
                ? `
            <div class="field">
              <div class="label">KPIs de Éxito:</div>
              <div class="value">${data.kpisExito}</div>
            </div>
            `
                : ""
            }
            <div class="field">
              <div class="label">Presupuesto Estimado:</div>
              <div class="value">${formatPresupuesto(data.presupuestoEstimado)}</div>
            </div>
            <div class="field">
              <div class="label">Plazo Preferido:</div>
              <div class="value">${formatPlazo(data.plazoPreferido)}</div>
            </div>
          </div>

          <!-- Público Objetivo -->
          <div class="section">
            <div class="section-title">👥 Público Objetivo</div>
            <div class="field">
              <div class="label">Descripción del Público:</div>
              <div class="value">${data.publicoObjetivo}</div>
            </div>
            ${
              data.edadRango
                ? `
            <div class="field">
              <div class="label">Rango de Edad:</div>
              <div class="value">${data.edadRango}</div>
            </div>
            `
                : ""
            }
            ${
              data.ubicacionGeografica
                ? `
            <div class="field">
              <div class="label">Ubicación Geográfica:</div>
              <div class="value">${data.ubicacionGeografica}</div>
            </div>
            `
                : ""
            }
            <div class="field">
              <div class="label">Dispositivos Principales:</div>
              <div class="checkbox-list">
                ${data.dispositivosPrincipales?.map((device) => `<span class="checkbox-item">${device}</span>`).join("") || "No especificado"}
              </div>
            </div>
            <div class="field">
              <div class="label">Idiomas Necesarios:</div>
              <div class="checkbox-list">
                ${data.idiomasNecesarios?.map((lang) => `<span class="checkbox-item">${lang}</span>`).join("") || "No especificado"}
              </div>
            </div>
          </div>

          <!-- Funcionalidades -->
          <div class="section">
            <div class="section-title">⚙️ Funcionalidades Requeridas</div>
            <div class="field">
              <div class="label">Tipo de Proyecto:</div>
              <div class="checkbox-list">
                ${data.tipoProyecto.map((type) => `<span class="checkbox-item">${type}</span>`).join("")}
              </div>
            </div>
            <div class="field">
              <div class="label">Funcionalidades Esenciales:</div>
              <div class="checkbox-list">
                ${data.funcionalidadesEsenciales?.map((func) => `<span class="checkbox-item">${func}</span>`).join("") || "No especificado"}
              </div>
            </div>
            ${
              data.funcionalidadesDeseadas
                ? `
            <div class="field">
              <div class="label">Otras Funcionalidades:</div>
              <div class="value">${data.funcionalidadesDeseadas}</div>
            </div>
            `
                : ""
            }
            ${
              data.integracionesNecesarias
                ? `
            <div class="field">
              <div class="label">Integraciones Necesarias:</div>
              <div class="value">${data.integracionesNecesarias}</div>
            </div>
            `
                : ""
            }
          </div>

          <!-- Estilo Visual -->
          <div class="section">
            <div class="section-title">🎨 Estilo Visual y Marca</div>
            <div class="field">
              <div class="label">Identidad Corporativa:</div>
              <div class="value">${formatIdentidad(data.tieneIdentidadCorporativa)}</div>
            </div>
            <div class="field">
              <div class="label">Tiene Logotipos:</div>
              <div class="value">${data.tieneLogotipos ? "Sí" : "No"}</div>
            </div>
            ${
              data.coloresPreferidos
                ? `
            <div class="field">
              <div class="label">Colores Preferidos:</div>
              <div class="value">${data.coloresPreferidos}</div>
            </div>
            `
                : ""
            }
            ${
              data.referenciasVisuales
                ? `
            <div class="field">
              <div class="label">Referencias Visuales:</div>
              <div class="value">${data.referenciasVisuales}</div>
            </div>
            `
                : ""
            }
            <div class="field">
              <div class="label">Tono de Comunicación:</div>
              <div class="value">${data.tonoComunicacion}</div>
            </div>
          </div>

          <!-- Contenidos -->
          <div class="section">
            <div class="section-title">📝 Contenidos</div>
            <div class="field">
              <div class="label">Contenidos Disponibles:</div>
              <div class="value">${data.contenidosDisponibles ? "Sí" : "No"}</div>
            </div>
            <div class="field">
              <div class="label">Número de Páginas Estimadas:</div>
              <div class="value">${data.numerosPaginasEstimadas}</div>
            </div>
            <div class="field">
              <div class="label">Necesita Ayuda con:</div>
              <div class="checkbox-list">
                ${data.necesitaRedaccion ? '<span class="checkbox-item">Redacción</span>' : ""}
                ${data.necesitaFotografia ? '<span class="checkbox-item">Fotografía</span>' : ""}
                ${data.necesitaVideos ? '<span class="checkbox-item">Videos</span>' : ""}
              </div>
            </div>
          </div>

          <!-- Requisitos Técnicos -->
          <div class="section">
            <div class="section-title">🔧 Requisitos Técnicos</div>
            <div class="field">
              <div class="label">Tiene Hosting Actual:</div>
              <div class="value">${data.tieneHostingActual ? "Sí" : "No"}</div>
            </div>
            <div class="field">
              <div class="label">Necesita Registrar Dominio:</div>
              <div class="value">${data.necesitaDominio ? "Sí" : "No"}</div>
            </div>
            <div class="field">
              <div class="label">Necesita Migración:</div>
              <div class="value">${data.necesitaMigracion ? "Sí" : "No"}</div>
            </div>
            <div class="field">
              <div class="label">Requisitos CMS:</div>
              <div class="value">${data.requisitosCMS}</div>
            </div>
            <div class="field">
              <div class="label">Optimización SEO:</div>
              <div class="value">${data.requisitosSEO ? "Sí" : "No"}</div>
            </div>
            <div class="field">
              <div class="label">Accesibilidad WCAG:</div>
              <div class="value">${data.accesibilidadWCAG ? "Sí" : "No"}</div>
            </div>
          </div>

          <!-- Información Adicional -->
          ${
            data.informacionAdicional
              ? `
          <div class="section">
            <div class="section-title">ℹ️ Información Adicional</div>
            <div class="field">
              <div class="value">${data.informacionAdicional}</div>
            </div>
          </div>
          `
              : ""
          }

          <!-- Cómo nos conoció -->
          ${
            data.comoConociste
              ? `
          <div class="section">
            <div class="section-title">🔍 Cómo nos conoció</div>
            <div class="field">
              <div class="value">${data.comoConociste}</div>
            </div>
          </div>
          `
              : ""
          }

          <!-- Consentimiento RGPD -->
          <div class="consent">
            <div class="label">✅ Consentimiento RGPD:</div>
            <div>El usuario ha aceptado la política de privacidad el ${new Date(data.timestamp).toLocaleString("es-ES")}</div>
          </div>
          
          <!-- Información técnica -->
          <div class="field" style="margin-top: 20px; font-size: 12px; color: #6b7280;">
            <div><strong>Información técnica:</strong></div>
            <div>IP: ${data.metadata?.ip ?? "unknown"}</div>
            <div>User Agent: ${data.metadata?.userAgent ?? "unknown"}</div>
            <div>Referer: ${data.metadata?.referer ?? "direct"}</div>
          </div>
        </div>
        
        <div class="footer">
          <p>Este email fue generado automáticamente por el formulario de briefing de WEBCODE.</p>
          <p>Para responder al cliente, simplemente responde a este email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Template de email en texto plano para briefing
function generateBriefingPlainTextEmail(
  data: z.infer<typeof briefingFormServerSchema> & { metadata: RequestMetadata }
): string {
  return `
📋 NUEVO BRIEFING DE PROYECTO - WEBCODE

Recibido el ${new Date(data.timestamp).toLocaleString("es-ES")}

=== INFORMACIÓN DE CONTACTO ===
Nombre: ${data.nombre}
Email: ${data.email}
Teléfono: ${data.telefono}
${data.empresa ? `Empresa: ${data.empresa}` : ""}
${data.sitioWeb ? `Sitio Web Actual: ${data.sitioWeb}` : ""}

=== OBJETIVOS DEL PROYECTO ===
Objetivo Principal: ${data.objetivoPrincipal}
Problemas a Resolver: ${data.problemasResolver}
${data.kpisExito ? `KPIs de Éxito: ${data.kpisExito}` : ""}
Presupuesto Estimado: ${formatPresupuesto(data.presupuestoEstimado)}
Plazo Preferido: ${formatPlazo(data.plazoPreferido)}

=== PÚBLICO OBJETIVO ===
Descripción: ${data.publicoObjetivo}
${data.edadRango ? `Rango de Edad: ${data.edadRango}` : ""}
${data.ubicacionGeografica ? `Ubicación: ${data.ubicacionGeografica}` : ""}
Dispositivos: ${data.dispositivosPrincipales?.join(", ") || "No especificado"}
Idiomas: ${data.idiomasNecesarios?.join(", ") || "No especificado"}

=== FUNCIONALIDADES REQUERIDAS ===
Tipo de Proyecto: ${data.tipoProyecto.join(", ")}
Funcionalidades Esenciales: ${data.funcionalidadesEsenciales?.join(", ") || "No especificado"}
${data.funcionalidadesDeseadas ? `Otras Funcionalidades: ${data.funcionalidadesDeseadas}` : ""}
${data.integracionesNecesarias ? `Integraciones: ${data.integracionesNecesarias}` : ""}

=== ESTILO VISUAL Y MARCA ===
Identidad Corporativa: ${formatIdentidad(data.tieneIdentidadCorporativa)}
Tiene Logotipos: ${data.tieneLogotipos ? "Sí" : "No"}
${data.coloresPreferidos ? `Colores Preferidos: ${data.coloresPreferidos}` : ""}
${data.referenciasVisuales ? `Referencias Visuales: ${data.referenciasVisuales}` : ""}
Tono de Comunicación: ${data.tonoComunicacion}

=== CONTENIDOS ===
Contenidos Disponibles: ${data.contenidosDisponibles ? "Sí" : "No"}
Páginas Estimadas: ${data.numerosPaginasEstimadas}
Necesita Ayuda: ${[
    data.necesitaRedaccion ? "Redacción" : "",
    data.necesitaFotografia ? "Fotografía" : "",
    data.necesitaVideos ? "Videos" : ""
  ]
    .filter(Boolean)
    .join(", ")}

=== REQUISITOS TÉCNICOS ===
Tiene Hosting: ${data.tieneHostingActual ? "Sí" : "No"}
Necesita Dominio: ${data.necesitaDominio ? "Sí" : "No"}
Necesita Migración: ${data.necesitaMigracion ? "Sí" : "No"}
CMS: ${data.requisitosCMS}
SEO: ${data.requisitosSEO ? "Sí" : "No"}
Accesibilidad WCAG: ${data.accesibilidadWCAG ? "Sí" : "No"}

${data.informacionAdicional ? `=== INFORMACIÓN ADICIONAL ===\n${data.informacionAdicional}\n` : ""}

${data.comoConociste ? `=== CÓMO NOS CONOCIÓ ===\n${data.comoConociste}\n` : ""}

✅ CONSENTIMIENTO RGPD:
El usuario ha aceptado la política de privacidad el ${new Date(data.timestamp).toLocaleString("es-ES")}

=== INFORMACIÓN TÉCNICA ===
IP: ${data.metadata?.ip ?? "unknown"}
User Agent: ${data.metadata?.userAgent ?? "unknown"}
Referer: ${data.metadata?.referer ?? "direct"}

---
Este email fue generado automáticamente por el formulario de briefing de WEBCODE.
Para responder al cliente, simplemente responde a este email.
  `.trim();
}

// Funciones auxiliares para formatear datos
function formatPresupuesto(presupuesto: string): string {
  const presupuestoLabels: Record<string, string> = {
    "no-definido": "No definido",
    "<3000": "Menos de 3.000€",
    "3000-8000": "3.000€ - 8.000€",
    "8000-15000": "8.000€ - 15.000€",
    "15000-30000": "15.000€ - 30.000€",
    "30000+": "Más de 30.000€"
  };
  return presupuestoLabels[presupuesto] || presupuesto;
}

function formatPlazo(plazo: string): string {
  const plazoLabels: Record<string, string> = {
    "no-definido": "No definido",
    urgente: "Urgente (menos de 1 mes)",
    "1-mes": "1 mes",
    "2-3-meses": "2-3 meses",
    "3-6-meses": "3-6 meses",
    "6+ meses": "Más de 6 meses",
    flexible: "Flexible"
  };
  return plazoLabels[plazo] || plazo;
}

function formatIdentidad(identidad: string): string {
  const identidadLabels: Record<string, string> = {
    si: "Sí, completamente definida",
    no: "No, necesitamos crearla",
    parcialmente: "Parcialmente, necesita mejoras"
  };
  return identidadLabels[identidad] || identidad;
}
