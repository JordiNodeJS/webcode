import jsPDF from "jspdf";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { briefingFormSchema } from "@/types/briefing";

// Esquema de validación para el servidor
const briefingFormServerSchema = briefingFormSchema.extend({
  timestamp: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validar datos del formulario
    const validatedData = briefingFormServerSchema.parse(body);

    // Generar PDF
    const pdfBuffer = await generateBriefingPDF(validatedData);

    // Retornar PDF como respuesta
    const arrayBuffer = pdfBuffer.buffer.slice(pdfBuffer.byteOffset, pdfBuffer.byteOffset + pdfBuffer.byteLength) as ArrayBuffer;
    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="briefing-${validatedData.nombre.replace(/\s+/g, "-").toLowerCase()}-${new Date().toISOString().split("T")[0]}.pdf"`,
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("❌ Error generando PDF de briefing:", error);

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
        error: "Error al generar el PDF",
        message: "No se pudo generar el PDF. Por favor, inténtalo de nuevo."
      },
      { status: 500 }
    );
  }
}

// Función para generar el PDF del briefing
async function generateBriefingPDF(data: z.infer<typeof briefingFormServerSchema>): Promise<Uint8Array> {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  let yPosition = margin;

  // Configuración de fuentes y colores
  const primaryColor = [255, 102, 128]; // #ff6680
  const secondaryColor = [57, 130, 246]; // #3b82f6
  const textColor = [31, 41, 55]; // #1f2937

  // Función para agregar título de sección
  const addSectionTitle = (title: string, icon: string = "") => {
    if (yPosition > 250) {
      doc.addPage();
      yPosition = margin;
    }
    
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    
    const titleText = `${icon} ${title}`;
    const titleWidth = doc.getTextWidth(titleText);
    
    doc.rect(margin, yPosition - 5, titleWidth + 10, 10, "F");
    doc.text(titleText, margin + 5, yPosition + 2);
    
    yPosition += 20;
  };

  // Función para agregar campo
  const addField = (label: string, value: string | string[] | boolean | undefined, required: boolean = false) => {
    if (yPosition > 270) {
      doc.addPage();
      yPosition = margin;
    }

    const labelText = required ? `${label} *` : label;
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.text(labelText, margin, yPosition);
    
    yPosition += 6;
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(75, 85, 99); // #4b5563
    
    let displayValue = "";
    if (Array.isArray(value)) {
      displayValue = value.join(", ");
    } else if (typeof value === "boolean") {
      displayValue = value ? "Sí" : "No";
    } else {
      displayValue = value || "No especificado";
    }
    
    // Dividir texto largo en múltiples líneas
    const lines = doc.splitTextToSize(displayValue, contentWidth);
    doc.text(lines, margin, yPosition);
    
    yPosition += (lines.length * 4) + 8;
  };

  // Header
  doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.rect(0, 0, pageWidth, 30, "F");
  
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("📋 BRIEFING DE PROYECTO", margin, 20);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Generado el ${new Date(data.timestamp).toLocaleString("es-ES")}`, margin, 25);
  
  yPosition = 45;

  // 1. Información de Contacto
  addSectionTitle("Información de Contacto", "👤");
  addField("Nombre completo", data.nombre, true);
  addField("Email", data.email, true);
  addField("Teléfono", data.telefono);
  addField("Empresa / Proyecto", data.empresa);
  addField("Sitio Web Actual", data.sitioWeb);

  // 2. Objetivos del Proyecto
  addSectionTitle("Objetivos del Proyecto", "🎯");
  addField("Objetivo Principal", data.objetivoPrincipal, true);
  addField("Problemas a Resolver", data.problemasResolver, true);
  addField("Objetivos Específicos", data.objetivosEspecificos);
  addField("Público Objetivo", data.publicoObjetivo, true);
  addField("Competencia", data.competencia);
  addField("KPIs de Éxito", data.kpisExito);
  addField("Presupuesto Estimado", formatPresupuesto(data.presupuestoEstimado), true);
  addField("Plazo Preferido", formatPlazo(data.plazoPreferido), true);

  // 3. Público Objetivo Detallado
  addSectionTitle("Público Objetivo Detallado", "👥");
  addField("Rango de Edad", data.edadRango);
  addField("Ubicación Geográfica", data.ubicacionGeografica);
  addField("Dispositivos Principales", data.dispositivosPrincipales, true);
  addField("Idiomas Necesarios", data.idiomasNecesarios, true);

  // 4. Funcionalidades
  addSectionTitle("Funcionalidades Requeridas", "⚙️");
  addField("Tipo de Proyecto", data.tipoProyecto, true);
  addField("Funcionalidades Esenciales", data.funcionalidadesEsenciales, true);
  addField("Otras Funcionalidades", data.funcionalidadesDeseadas);
  addField("Integraciones Necesarias", data.integracionesNecesarias);

  // 5. Estilo Visual
  addSectionTitle("Estilo Visual y Marca", "🎨");
  addField("Identidad Corporativa", formatIdentidad(data.tieneIdentidadCorporativa), true);
  addField("Tiene Logotipos", data.tieneLogotipos);
  addField("Colores Preferidos", data.coloresPreferidos);
  addField("Colores a Evitar", data.coloresEvitar);
  addField("Referencias Visuales", data.referenciasVisuales);
  addField("Tono de Comunicación", data.tonoComunicacion, true);

  // 6. Contenidos
  addSectionTitle("Contenidos", "📝");
  addField("Contenidos Disponibles", data.contenidosDisponibles);
  addField("Número de Páginas Estimadas", formatPaginas(data.numerosPaginasEstimadas), true);
  addField("Necesita Redacción", data.necesitaRedaccion);
  addField("Necesita Fotografía", data.necesitaFotografia);
  addField("Necesita Videos", data.necesitaVideos);

  // 7. Requisitos Técnicos
  addSectionTitle("Requisitos Técnicos", "🔧");
  addField("Tiene Hosting Actual", data.tieneHostingActual);
  addField("Necesita Registrar Dominio", data.necesitaDominio);
  addField("Necesita Migración", data.necesitaMigracion);
  addField("Requisitos CMS", formatCMS(data.requisitosCMS), true);
  addField("Optimización SEO", data.requisitosSEO);
  addField("Accesibilidad WCAG", data.accesibilidadWCAG);

  // 8. Información Adicional
  if (data.informacionAdicional || data.comentariosAdicionales) {
    addSectionTitle("Información Adicional", "ℹ️");
    if (data.informacionAdicional) {
      addField("Información Adicional", data.informacionAdicional);
    }
    if (data.comentariosAdicionales) {
      addField("Comentarios Adicionales", data.comentariosAdicionales);
    }
  }

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    
    // Línea de separación
    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setLineWidth(0.5);
    doc.line(margin, 280, pageWidth - margin, 280);
    
    // Footer text
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(107, 114, 128); // #6b7280
    doc.text("WEBCODE - Desarrollo Web Profesional", margin, 290);
    doc.text(`Página ${i} de ${pageCount}`, pageWidth - margin - 20, 290);
    doc.text("webcode.es | info@webcode.es", margin + 60, 290);
  }

  // Convertir a Uint8Array
  const pdfOutput = doc.output("arraybuffer");
  return new Uint8Array(pdfOutput);
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
    "urgente": "Urgente (menos de 1 mes)",
    "1-2-meses": "1-2 meses",
    "3-6-meses": "3-6 meses",
    "flexible": "Flexible"
  };
  return plazoLabels[plazo] || plazo;
}

function formatIdentidad(identidad: string): string {
  const identidadLabels: Record<string, string> = {
    "si": "Sí, completamente definida",
    "no": "No, necesitamos crearla",
    "parcialmente": "Parcialmente, necesita mejoras"
  };
  return identidadLabels[identidad] || identidad;
}

function formatPaginas(paginas: string): string {
  const paginasLabels: Record<string, string> = {
    "1-5": "1-5 páginas",
    "6-10": "6-10 páginas",
    "11-20": "11-20 páginas",
    "21-50": "21-50 páginas",
    ">50": "Más de 50 páginas",
    "no-definido": "No definido"
  };
  return paginasLabels[paginas] || paginas;
}

function formatCMS(cms: string): string {
  const cmsLabels: Record<string, string> = {
    "no": "No, prefiero delegar la gestión",
    "si-simple": "Sí, panel simple para textos e imágenes",
    "si-avanzado": "Sí, CMS completo (WordPress, etc.)",
    "no-se": "No lo sé aún"
  };
  return cmsLabels[cms] || cms;
}
