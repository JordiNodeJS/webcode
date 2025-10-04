import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import type { BriefingFormData } from "@/types/briefing";
import type { EmailResponse } from "@/types/resend";

// Importación dinámica de Resend
async function getResend() {
  const { Resend } = await import("resend");
  return new Resend(process.env.RESEND_API_KEY);
}

// Esquema de validación para el briefing
const briefingFormServerSchema = z.object({
  // Contacto
  email: z.string().email("Email inválido"),
  nombre: z.string().min(2),
  empresa: z.string().optional(),
  telefono: z.string().optional(),

  // Objetivos
  objetivoPrincipal: z.string().min(10),
  problemasResolver: z.string().min(10),
  presupuestoEstimado: z.string(),
  plazoPreferido: z.string(),
  kpisExito: z.string().optional(),

  // Público
  publicoObjetivo: z.string().min(10),
  edadRango: z.string().optional(),
  ubicacionGeografica: z.string().optional(),
  dispositivosPrincipales: z.array(z.string()),
  idiomasNecesarios: z.array(z.string()),

  // Funcionalidades
  tipoProyecto: z.string(),
  funcionalidadesEsenciales: z.array(z.string()),
  funcionalidadesDeseadas: z.string().optional(),
  integracionesNecesarias: z.string().optional(),
  requisitosSeguridadEspeciales: z.string().optional(),

  // Estilo
  tieneIdentidadCorporativa: z.boolean(),
  coloresPreferidos: z.string().optional(),
  referenciasVisuales: z.string().optional(),
  tonoComunicacion: z.string(),
  tieneLogotipos: z.boolean(),

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

  // Adicional
  informacionAdicional: z.string().optional(),
  comoConociste: z.string().optional(),

  // RGPD
  gdprConsent: z.boolean().refine((val) => val === true, "Consentimiento requerido"),

  // Metadata
  timestamp: z.string(),
  userAgent: z.string().optional()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validar datos
    const validatedData = briefingFormServerSchema.parse(body);

    // Metadata de la request
    const clientIP =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const referer = request.headers.get("referer") || "direct";

    const briefingData = {
      ...validatedData,
      metadata: {
        ip: clientIP,
        referer,
        timestamp: new Date().toISOString(),
        userAgent: validatedData.userAgent || "unknown"
      }
    };

    // Enviar email
    const emailResult = await sendBriefingEmail(briefingData);

    if (!emailResult.success) {
      console.error("❌ Error enviando email:", emailResult.error);
      throw new Error(emailResult.error || "Error enviando email");
    }

    return NextResponse.json({
      success: true,
      message: "Briefing recibido correctamente",
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
        message: "No se pudo procesar el briefing. Por favor, inténtalo de nuevo."
      },
      { status: 500 }
    );
  }
}

async function sendBriefingEmail(
  briefingData: z.infer<typeof briefingFormServerSchema> & {
    metadata: {
      ip: string;
      referer: string;
      timestamp: string;
      userAgent: string;
    };
  }
): Promise<EmailResponse> {
  try {
    const emailContent = {
      from: process.env.RESEND_FROM_EMAIL || "contacto@webcode.es",
      to: process.env.RESEND_TO_EMAIL || "info@webcode.es",
      subject: `📋 Nuevo Briefing: ${briefingData.nombre} - ${briefingData.tipoProyecto}`,
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
    console.error("❌ Error en sendBriefingEmail:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido"
    };
  }
}

function generateBriefingEmailTemplate(data: BriefingFormData): string {
  const presupuestoLabels: Record<string, string> = {
    "<3000": "Menos de 3.000€",
    "3000-8000": "3.000€ - 8.000€",
    "8000-15000": "8.000€ - 15.000€",
    "15000-30000": "15.000€ - 30.000€",
    ">30000": "Más de 30.000€",
    "no-definido": "Aún no definido"
  };

  const plazoLabels: Record<string, string> = {
    "urgente": "Urgente (menos de 1 mes)",
    "1-2-meses": "1-2 meses",
    "3-6-meses": "3-6 meses",
    "flexible": "Flexible",
    "no-definido": "Aún no definido"
  };

  const tipoProyectoLabels: Record<string, string> = {
    "landing": "Landing Page",
    "corporativa": "Web Corporativa",
    "ecommerce": "Tienda Online (E-commerce)",
    "webapp": "Aplicación Web",
    "blog": "Blog / Revista Digital",
    "portal": "Portal / Plataforma",
    "otro": "Otro"
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Nuevo Briefing - WEBCODE</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #ff6680, #9333ea); color: white; padding: 30px; border-radius: 12px 12px 0 0; }
        .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
        .section { margin-bottom: 30px; padding: 20px; background: white; border-radius: 8px; border-left: 4px solid #ff6680; }
        .section-title { font-size: 18px; font-weight: bold; color: #ff6680; margin-bottom: 15px; }
        .field { margin-bottom: 12px; }
        .label { font-weight: bold; color: #374151; display: inline-block; min-width: 180px; }
        .value { color: #1f2937; }
        .list { margin: 8px 0 8px 20px; }
        .list li { margin: 4px 0; }
        .footer { background: #374151; color: white; padding: 20px; border-radius: 0 0 12px 12px; font-size: 13px; }
        .highlight { background: #dcfce7; padding: 15px; border-radius: 6px; border-left: 4px solid #22c55e; margin: 15px 0; }
        .emoji { font-size: 20px; margin-right: 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1><span class="emoji">📋</span>Nuevo Briefing de Proyecto</h1>
          <p style="margin: 0; opacity: 0.9;">Recibido el ${new Date(data.timestamp).toLocaleString("es-ES")}</p>
        </div>
        
        <div class="content">
          <!-- Información de Contacto -->
          <div class="section">
            <div class="section-title"><span class="emoji">👤</span>Información de Contacto</div>
            <div class="field">
              <span class="label">Nombre:</span>
              <span class="value">${data.nombre}</span>
            </div>
            <div class="field">
              <span class="label">Email:</span>
              <span class="value"><a href="mailto:${data.email}">${data.email}</a></span>
            </div>
            ${data.empresa ? `<div class="field">
              <span class="label">Empresa:</span>
              <span class="value">${data.empresa}</span>
            </div>` : ""}
            ${data.telefono ? `<div class="field">
              <span class="label">Teléfono:</span>
              <span class="value">${data.telefono}</span>
            </div>` : ""}
          </div>

          <!-- Objetivos del Proyecto -->
          <div class="section">
            <div class="section-title"><span class="emoji">🎯</span>Objetivos del Proyecto</div>
            <div class="field">
              <span class="label">Objetivo Principal:</span><br>
              <span class="value">${data.objetivoPrincipal}</span>
            </div>
            <div class="field">
              <span class="label">Problemas a Resolver:</span><br>
              <span class="value">${data.problemasResolver}</span>
            </div>
            <div class="field">
              <span class="label">Presupuesto Estimado:</span>
              <span class="value">${presupuestoLabels[data.presupuestoEstimado] || data.presupuestoEstimado}</span>
            </div>
            <div class="field">
              <span class="label">Plazo Preferido:</span>
              <span class="value">${plazoLabels[data.plazoPreferido] || data.plazoPreferido}</span>
            </div>
            ${data.kpisExito ? `<div class="field">
              <span class="label">KPIs de Éxito:</span><br>
              <span class="value">${data.kpisExito}</span>
            </div>` : ""}
          </div>

          <!-- Público Objetivo -->
          <div class="section">
            <div class="section-title"><span class="emoji">👥</span>Público Objetivo</div>
            <div class="field">
              <span class="label">Descripción:</span><br>
              <span class="value">${data.publicoObjetivo}</span>
            </div>
            ${data.edadRango ? `<div class="field">
              <span class="label">Rango de Edad:</span>
              <span class="value">${data.edadRango}</span>
            </div>` : ""}
            ${data.ubicacionGeografica ? `<div class="field">
              <span class="label">Ubicación:</span>
              <span class="value">${data.ubicacionGeografica}</span>
            </div>` : ""}
            <div class="field">
              <span class="label">Dispositivos Principales:</span>
              <ul class="list">
                ${data.dispositivosPrincipales.map((d: string) => `<li>${d}</li>`).join("")}
              </ul>
            </div>
            <div class="field">
              <span class="label">Idiomas Necesarios:</span>
              <span class="value">${data.idiomasNecesarios.join(", ")}</span>
            </div>
          </div>

          <!-- Funcionalidades -->
          <div class="section">
            <div class="section-title"><span class="emoji">⚙️</span>Funcionalidades y Tipo de Proyecto</div>
            <div class="field">
              <span class="label">Tipo de Proyecto:</span>
              <span class="value">${tipoProyectoLabels[data.tipoProyecto] || data.tipoProyecto}</span>
            </div>
            <div class="field">
              <span class="label">Funcionalidades Esenciales:</span>
              <ul class="list">
                ${data.funcionalidadesEsenciales.map((f: string) => `<li>${f}</li>`).join("")}
              </ul>
            </div>
            ${data.funcionalidadesDeseadas ? `<div class="field">
              <span class="label">Otras Funcionalidades:</span><br>
              <span class="value">${data.funcionalidadesDeseadas}</span>
            </div>` : ""}
            ${data.integracionesNecesarias ? `<div class="field">
              <span class="label">Integraciones:</span><br>
              <span class="value">${data.integracionesNecesarias}</span>
            </div>` : ""}
          </div>

          <!-- Estilo Visual -->
          <div class="section">
            <div class="section-title"><span class="emoji">🎨</span>Estilo Visual y Marca</div>
            <div class="field">
              <span class="label">Identidad Corporativa:</span>
              <span class="value">${data.tieneIdentidadCorporativa ? "✅ Sí" : "❌ No"}</span>
            </div>
            <div class="field">
              <span class="label">Tiene Logotipos:</span>
              <span class="value">${data.tieneLogotipos ? "✅ Sí" : "❌ No"}</span>
            </div>
            ${data.coloresPreferidos ? `<div class="field">
              <span class="label">Colores Preferidos:</span>
              <span class="value">${data.coloresPreferidos}</span>
            </div>` : ""}
            <div class="field">
              <span class="label">Tono de Comunicación:</span>
              <span class="value">${data.tonoComunicacion}</span>
            </div>
            ${data.referenciasVisuales ? `<div class="field">
              <span class="label">Referencias Visuales:</span><br>
              <span class="value">${data.referenciasVisuales}</span>
            </div>` : ""}
          </div>

          <!-- Contenidos -->
          <div class="section">
            <div class="section-title"><span class="emoji">📝</span>Contenidos</div>
            <div class="field">
              <span class="label">Contenidos Disponibles:</span>
              <span class="value">${data.contenidosDisponibles ? "✅ Sí" : "❌ No"}</span>
            </div>
            <div class="field">
              <span class="label">Páginas Estimadas:</span>
              <span class="value">${data.numerosPaginasEstimadas}</span>
            </div>
            <div class="field">
              <span class="label">Necesita Redacción:</span>
              <span class="value">${data.necesitaRedaccion ? "✅ Sí" : "❌ No"}</span>
            </div>
            <div class="field">
              <span class="label">Necesita Fotografía:</span>
              <span class="value">${data.necesitaFotografia ? "✅ Sí" : "❌ No"}</span>
            </div>
            <div class="field">
              <span class="label">Necesita Videos:</span>
              <span class="value">${data.necesitaVideos ? "✅ Sí" : "❌ No"}</span>
            </div>
          </div>

          <!-- Técnico -->
          <div class="section">
            <div class="section-title"><span class="emoji">🔧</span>Requisitos Técnicos</div>
            <div class="field">
              <span class="label">Tiene Hosting Actual:</span>
              <span class="value">${data.tieneHostingActual ? "✅ Sí" : "❌ No"}</span>
            </div>
            <div class="field">
              <span class="label">Necesita Dominio:</span>
              <span class="value">${data.necesitaDominio ? "✅ Sí" : "❌ No"}</span>
            </div>
            <div class="field">
              <span class="label">Necesita Migración:</span>
              <span class="value">${data.necesitaMigracion ? "✅ Sí" : "❌ No"}</span>
            </div>
            <div class="field">
              <span class="label">Requisitos CMS:</span>
              <span class="value">${data.requisitosCMS}</span>
            </div>
            <div class="field">
              <span class="label">Optimización SEO:</span>
              <span class="value">${data.requisitosSEO ? "✅ Sí" : "❌ No"}</span>
            </div>
            <div class="field">
              <span class="label">Accesibilidad WCAG:</span>
              <span class="value">${data.accesibilidadWCAG ? "✅ Sí" : "❌ No"}</span>
            </div>
          </div>

          ${data.informacionAdicional ? `
          <div class="section">
            <div class="section-title"><span class="emoji">💬</span>Información Adicional</div>
            <div class="value">${data.informacionAdicional}</div>
          </div>
          ` : ""}

          ${data.comoConociste ? `
          <div class="field" style="margin-top: 20px;">
            <span class="label">Cómo nos conoció:</span>
            <span class="value">${data.comoConociste}</span>
          </div>
          ` : ""}

          <div class="highlight">
            <strong>✅ Consentimiento RGPD:</strong><br>
            El usuario ha aceptado la política de privacidad el ${new Date(data.timestamp).toLocaleString("es-ES")}
          </div>

          <div style="margin-top: 20px; padding: 15px; background: #f3f4f6; border-radius: 6px; font-size: 12px; color: #6b7280;">
            <strong>Información técnica:</strong><br>
            IP: ${data.metadata.ip}<br>
            User Agent: ${data.metadata.userAgent}<br>
            Referer: ${data.metadata.referer}
          </div>
        </div>
        
        <div class="footer">
          <p style="margin: 0 0 10px 0;"><strong>📋 Briefing completo recibido</strong></p>
          <p style="margin: 0;">Este email fue generado automáticamente por el formulario de briefing de WEBCODE.</p>
          <p style="margin: 10px 0 0 0;">Para responder al cliente, simplemente responde a este email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateBriefingPlainTextEmail(data: BriefingFormData): string {
  return `
📋 NUEVO BRIEFING DE PROYECTO - WEBCODE

Recibido el ${new Date(data.timestamp).toLocaleString("es-ES")}

═══════════════════════════════════════════════════

👤 INFORMACIÓN DE CONTACTO

Nombre: ${data.nombre}
Email: ${data.email}
${data.empresa ? `Empresa: ${data.empresa}` : ""}
${data.telefono ? `Teléfono: ${data.telefono}` : ""}

═══════════════════════════════════════════════════

🎯 OBJETIVOS DEL PROYECTO

Objetivo Principal:
${data.objetivoPrincipal}

Problemas a Resolver:
${data.problemasResolver}

Presupuesto: ${data.presupuestoEstimado}
Plazo: ${data.plazoPreferido}
${data.kpisExito ? `KPIs: ${data.kpisExito}` : ""}

═══════════════════════════════════════════════════

👥 PÚBLICO OBJETIVO

${data.publicoObjetivo}

${data.edadRango ? `Edad: ${data.edadRango}` : ""}
${data.ubicacionGeografica ? `Ubicación: ${data.ubicacionGeografica}` : ""}
Dispositivos: ${data.dispositivosPrincipales.join(", ")}
Idiomas: ${data.idiomasNecesarios.join(", ")}

═══════════════════════════════════════════════════

⚙️ FUNCIONALIDADES

Tipo de Proyecto: ${data.tipoProyecto}

Funcionalidades Esenciales:
${data.funcionalidadesEsenciales.map((f: string) => `- ${f}`).join("\n")}

${data.funcionalidadesDeseadas ? `Otras Funcionalidades:\n${data.funcionalidadesDeseadas}` : ""}

═══════════════════════════════════════════════════

🎨 ESTILO VISUAL

Identidad Corporativa: ${data.tieneIdentidadCorporativa ? "Sí" : "No"}
Logotipos: ${data.tieneLogotipos ? "Sí" : "No"}
${data.coloresPreferidos ? `Colores: ${data.coloresPreferidos}` : ""}
Tono: ${data.tonoComunicacion}

═══════════════════════════════════════════════════

📝 CONTENIDOS

Contenidos Disponibles: ${data.contenidosDisponibles ? "Sí" : "No"}
Páginas Estimadas: ${data.numerosPaginasEstimadas}
Necesita Redacción: ${data.necesitaRedaccion ? "Sí" : "No"}
Necesita Fotografía: ${data.necesitaFotografia ? "Sí" : "No"}
Necesita Videos: ${data.necesitaVideos ? "Sí" : "No"}

═══════════════════════════════════════════════════

🔧 REQUISITOS TÉCNICOS

Hosting Actual: ${data.tieneHostingActual ? "Sí" : "No"}
Necesita Dominio: ${data.necesitaDominio ? "Sí" : "No"}
Necesita Migración: ${data.necesitaMigracion ? "Sí" : "No"}
CMS: ${data.requisitosCMS}
SEO: ${data.requisitosSEO ? "Sí" : "No"}
Accesibilidad: ${data.accesibilidadWCAG ? "Sí" : "No"}

═══════════════════════════════════════════════════

${data.informacionAdicional ? `💬 INFORMACIÓN ADICIONAL\n\n${data.informacionAdicional}\n\n═══════════════════════════════════════════════════\n` : ""}

✅ CONSENTIMIENTO RGPD:
El usuario ha aceptado la política de privacidad el ${new Date(data.timestamp).toLocaleString("es-ES")}

INFORMACIÓN TÉCNICA:
IP: ${data.metadata.ip}
User Agent: ${data.metadata.userAgent}
Referer: ${data.metadata.referer}

═══════════════════════════════════════════════════

Este email fue generado automáticamente por el formulario de briefing de WEBCODE.
Para responder al cliente, simplemente responde a este email.
  `.trim();
}

