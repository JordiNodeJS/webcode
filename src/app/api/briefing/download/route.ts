import { type NextRequest, NextResponse } from "next/server";
import { type BriefingPDFData, generateBriefingPDF } from "@/lib/pdf-generator";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as BriefingPDFData;

    // Generar el PDF
    const pdf = generateBriefingPDF(body);
    
    // Convertir a buffer
    const pdfBuffer = Buffer.from(pdf.output("arraybuffer"));
    
    // Crear nombre de archivo con fecha
    const date = new Date().toISOString().split("T")[0];
    const fileName = `briefing-${body.nombre.replace(/\s+/g, "-").toLowerCase()}-${date}.pdf`;

    // Devolver el PDF como descarga
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Length": pdfBuffer.length.toString()
      }
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Error al generar el PDF",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

