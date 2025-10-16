import jsPDF from "jspdf";

export interface BriefingPDFData {
  // Contacto
  nombre: string;
  email: string;
  empresa?: string;
  telefono?: string;

  // Objetivos
  objetivoPrincipal: string;
  problemasResolver: string;
  presupuestoEstimado: string;
  plazoPreferido: string;
  kpisExito?: string;

  // Público
  publicoObjetivo: string;
  edadRango?: string;
  ubicacionGeografica?: string;
  dispositivosPrincipales: string[];
  idiomasNecesarios: string[];

  // Funcionalidades
  tipoProyecto: string;
  funcionalidadesEsenciales: string[];
  funcionalidadesDeseadas?: string;
  integracionesNecesarias?: string;
  requisitosSeguridadEspeciales?: string;

  // Estilo
  tieneIdentidadCorporativa: boolean;
  coloresPreferidos?: string;
  referenciasVisuales?: string;
  tonoComunicacion: string;
  tieneLogotipos: boolean;

  // Contenidos
  contenidosDisponibles: boolean;
  numerosPaginasEstimadas: string;
  necesitaRedaccion: boolean;
  necesitaFotografia: boolean;
  necesitaVideos: boolean;

  // Técnico
  tieneHostingActual: boolean;
  necesitaDominio: boolean;
  necesitaMigracion: boolean;
  requisitosCMS: string;
  requisitosSEO: boolean;
  accesibilidadWCAG: boolean;

  // Adicional
  informacionAdicional?: string;
  comoConociste?: string;

  // Metadata
  timestamp?: string;
}

// Mapeos para valores legibles
const presupuestoMap: Record<string, string> = {
  "<3000": "Menos de 3.000€",
  "3000-8000": "3.000€ - 8.000€",
  "8000-15000": "8.000€ - 15.000€",
  "15000-30000": "15.000€ - 30.000€",
  ">30000": "Más de 30.000€",
  "no-definido": "Aún no definido"
};

const plazoMap: Record<string, string> = {
  urgente: "Urgente (menos de 1 mes)",
  "1-2-meses": "1-2 meses",
  "3-6-meses": "3-6 meses",
  flexible: "Flexible",
  "no-definido": "Aún no definido"
};

const tipoProyectoMap: Record<string, string> = {
  landing: "Landing Page",
  corporativa: "Web Corporativa",
  ecommerce: "Tienda Online (E-commerce)",
  webapp: "Aplicación Web",
  blog: "Blog / Revista Digital",
  portal: "Portal / Plataforma",
  otro: "Otro"
};

const tonoComunicacionMap: Record<string, string> = {
  profesional: "Profesional",
  cercano: "Cercano y amigable",
  juvenil: "Juvenil y dinámico",
  elegante: "Elegante y sofisticado",
  tecnico: "Técnico y especializado",
  otro: "Otro"
};

const paginasMap: Record<string, string> = {
  "1-5": "1-5 páginas",
  "6-10": "6-10 páginas",
  "11-20": "11-20 páginas",
  "21-50": "21-50 páginas",
  ">50": "Más de 50 páginas",
  "no-definido": "Aún no definido"
};

const cmsMap: Record<string, string> = {
  no: "No necesito CMS",
  "si-simple": "Sí, CMS simple",
  "si-avanzado": "Sí, CMS avanzado",
  "no-se": "No estoy seguro"
};

const idiomasMap: Record<string, string> = {
  es: "Español",
  ca: "Catalán",
  en: "Inglés",
  fr: "Francés",
  de: "Alemán",
  otro: "Otro"
};

export function generateBriefingPDF(
  data: BriefingPDFData,
  isBlank = false
): jsPDF {
  const doc = new jsPDF();

  // Colores del sistema
  const primaryColor: [number, number, number] = [255, 102, 128]; // #ff6680
  const darkBg: [number, number, number] = [24, 24, 27]; // #18181b
  const textColor: [number, number, number] = [161, 161, 170]; // #a1a1aa

  let yPos = 20;
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;

  // Helper para añadir nueva página si es necesario
  const checkPageBreak = (requiredHeight: number) => {
    if (yPos + requiredHeight > doc.internal.pageSize.height - 20) {
      doc.addPage();
      yPos = 20;
    }
  };

  // Logo y título
  doc.setFillColor(...primaryColor);
  doc.rect(margin, yPos, 40, 8, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("WEBCODE", margin + 3, yPos + 5.5);

  yPos += 15;

  // Título principal
  doc.setTextColor(...darkBg);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text(
    isBlank ? "BRIEFING DE PROYECTO WEB" : "Briefing de Proyecto Web",
    margin,
    yPos
  );

  yPos += 8;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...textColor);
  if (isBlank) {
    doc.text("Plantilla para completar manualmente", margin, yPos);
  } else {
    doc.text(
      `Generado el ${new Date(data.timestamp || Date.now()).toLocaleDateString(
        "es-ES",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        }
      )}`,
      margin,
      yPos
    );
  }

  yPos += 15;

  // Función para añadir sección
  const addSection = (
    title: string,
    content: Array<{ label: string; value: string | boolean | string[] }>
  ) => {
    checkPageBreak(50);

    // Título de sección
    doc.setFillColor(...primaryColor);
    doc.rect(margin, yPos, contentWidth, 8, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(title, margin + 3, yPos + 5.5);

    yPos += 12;

    // Contenido de la sección
    content.forEach(({ label, value }) => {
      checkPageBreak(20);

      doc.setTextColor(...darkBg);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text(`${label}:`, margin, yPos);

      yPos += 5;

      doc.setFont("helvetica", "normal");
      doc.setTextColor(...textColor);

      let displayValue: string;

      if (Array.isArray(value)) {
        displayValue = isBlank
          ? "______________________________________"
          : value.join(", ");
      } else if (typeof value === "boolean") {
        displayValue = isBlank ? "☐ Sí  ☐ No" : value ? "Sí" : "No";
      } else {
        displayValue = isBlank
          ? "______________________________________"
          : value || "No especificado";
      }

      const lines = doc.splitTextToSize(displayValue, contentWidth - 5);
      lines.forEach((line: string) => {
        checkPageBreak(6);
        doc.text(line, margin + 3, yPos);
        yPos += 5;
      });

      yPos += 2;
    });

    yPos += 5;
  };

  // 1. INFORMACIÓN DE CONTACTO
  addSection("1. Información de Contacto", [
    { label: "Nombre completo", value: data.nombre },
    { label: "Email", value: data.email },
    { label: "Empresa / Proyecto", value: data.empresa || "" },
    { label: "Teléfono", value: data.telefono || "" }
  ]);

  // 2. OBJETIVOS DEL PROYECTO
  addSection("2. Objetivos del Proyecto", [
    { label: "Objetivo principal", value: data.objetivoPrincipal },
    { label: "Problemas a resolver", value: data.problemasResolver },
    {
      label: "Presupuesto estimado",
      value:
        presupuestoMap[data.presupuestoEstimado] || data.presupuestoEstimado
    },
    {
      label: "Plazo preferido",
      value: plazoMap[data.plazoPreferido] || data.plazoPreferido
    },
    { label: "KPIs / Métricas de éxito", value: data.kpisExito || "" }
  ]);

  // 3. PÚBLICO OBJETIVO
  addSection("3. Público Objetivo", [
    { label: "Descripción del público objetivo", value: data.publicoObjetivo },
    { label: "Rango de edad", value: data.edadRango || "" },
    { label: "Ubicación geográfica", value: data.ubicacionGeografica || "" },
    { label: "Dispositivos principales", value: data.dispositivosPrincipales },
    {
      label: "Idiomas necesarios",
      value: data.idiomasNecesarios.map((code) => idiomasMap[code] || code)
    }
  ]);

  // 4. FUNCIONALIDADES REQUERIDAS
  addSection("4. Funcionalidades Requeridas", [
    {
      label: "Tipo de proyecto",
      value: tipoProyectoMap[data.tipoProyecto] || data.tipoProyecto
    },
    {
      label: "Funcionalidades esenciales",
      value: data.funcionalidadesEsenciales
    },
    {
      label: "Funcionalidades deseadas",
      value: data.funcionalidadesDeseadas || ""
    },
    {
      label: "Integraciones necesarias",
      value: data.integracionesNecesarias || ""
    },
    {
      label: "Requisitos de seguridad",
      value: data.requisitosSeguridadEspeciales || ""
    }
  ]);

  // 5. ESTILO VISUAL Y MARCA
  addSection("5. Estilo Visual y Marca", [
    {
      label: "¿Tiene identidad corporativa?",
      value: data.tieneIdentidadCorporativa
    },
    { label: "Colores preferidos", value: data.coloresPreferidos || "" },
    { label: "Referencias visuales", value: data.referenciasVisuales || "" },
    {
      label: "Tono de comunicación",
      value: tonoComunicacionMap[data.tonoComunicacion] || data.tonoComunicacion
    },
    { label: "¿Tiene logotipos?", value: data.tieneLogotipos }
  ]);

  // 6. CONTENIDOS
  addSection("6. Contenidos", [
    { label: "¿Contenidos ya disponibles?", value: data.contenidosDisponibles },
    {
      label: "Número de páginas estimadas",
      value:
        paginasMap[data.numerosPaginasEstimadas] || data.numerosPaginasEstimadas
    },
    {
      label: "¿Necesita redacción de contenidos?",
      value: data.necesitaRedaccion
    },
    {
      label: "¿Necesita fotografía profesional?",
      value: data.necesitaFotografia
    },
    { label: "¿Necesita producción de videos?", value: data.necesitaVideos }
  ]);

  // 7. ASPECTOS TÉCNICOS
  addSection("7. Aspectos Técnicos", [
    { label: "¿Tiene hosting actual?", value: data.tieneHostingActual },
    { label: "¿Necesita dominio?", value: data.necesitaDominio },
    { label: "¿Necesita migración?", value: data.necesitaMigracion },
    {
      label: "Requisitos de CMS",
      value: cmsMap[data.requisitosCMS] || data.requisitosCMS
    },
    { label: "¿Optimización SEO?", value: data.requisitosSEO },
    { label: "¿Accesibilidad WCAG?", value: data.accesibilidadWCAG }
  ]);

  // 8. INFORMACIÓN ADICIONAL
  if (!isBlank || data.informacionAdicional || data.comoConociste) {
    addSection("8. Información Adicional", [
      {
        label: "Comentarios adicionales",
        value: data.informacionAdicional || ""
      },
      { label: "¿Cómo nos conociste?", value: data.comoConociste || "" }
    ]);
  }

  // Footer
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(...textColor);
    doc.text(
      `WEBCODE Barcelona | info@webcode.es | Página ${i} de ${totalPages}`,
      pageWidth / 2,
      doc.internal.pageSize.height - 10,
      { align: "center" }
    );
  }

  return doc;
}

// Generar plantilla en blanco
export function generateBlankBriefingPDF(): jsPDF {
  const blankData: BriefingPDFData = {
    nombre: "",
    email: "",
    empresa: "",
    telefono: "",
    objetivoPrincipal: "",
    problemasResolver: "",
    presupuestoEstimado: "no-definido",
    plazoPreferido: "no-definido",
    kpisExito: "",
    publicoObjetivo: "",
    edadRango: "",
    ubicacionGeografica: "",
    dispositivosPrincipales: [],
    idiomasNecesarios: [],
    tipoProyecto: "",
    funcionalidadesEsenciales: [],
    funcionalidadesDeseadas: "",
    integracionesNecesarias: "",
    requisitosSeguridadEspeciales: "",
    tieneIdentidadCorporativa: false,
    coloresPreferidos: "",
    referenciasVisuales: "",
    tonoComunicacion: "",
    tieneLogotipos: false,
    contenidosDisponibles: false,
    numerosPaginasEstimadas: "no-definido",
    necesitaRedaccion: false,
    necesitaFotografia: false,
    necesitaVideos: false,
    tieneHostingActual: false,
    necesitaDominio: false,
    necesitaMigracion: false,
    requisitosCMS: "no-se",
    requisitosSEO: false,
    accesibilidadWCAG: false,
    informacionAdicional: "",
    comoConociste: ""
  };

  return generateBriefingPDF(blankData, true);
}
