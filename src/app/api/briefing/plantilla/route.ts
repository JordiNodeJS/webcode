import { type NextRequest, NextResponse } from "next/server";
import { generateBlankBriefingPDF } from "@/lib/pdf-generator";

export async function GET(request: NextRequest) {
  try {
    // Generar la plantilla en blanco
    const pdf = generateBlankBriefingPDF();
    
    // Convertir a buffer
    const pdfBuffer = Buffer.from(pdf.output("arraybuffer"));
    
    // Nombre del archivo
    const fileName = "briefing-webcode-plantilla.pdf";

    // Devolver el PDF como descarga
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Length": pdfBuffer.length.toString(),
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    });
  } catch (error) {
    console.error("Error generating blank PDF:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Error al generar la plantilla PDF",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

