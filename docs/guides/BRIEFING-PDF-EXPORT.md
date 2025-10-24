# Exportación de Briefing a PDF

## **[Documento]** Descripción

Sistema completo para generar documentos PDF del briefing de proyectos web. Incluye dos funcionalidades principales:

1. **PDF del briefing completado** - Descarga del formulario con todos los datos del cliente
2. **Plantilla en blanco** - Documento PDF vacío para rellenar manualmente

## **[Lanzamiento]** Funcionalidades Implementadas

### 1. Generador de PDF (`src/lib/pdf-generator.ts`)

Utilidad principal que genera documentos PDF profesionales con:

- **Branding de WEBCODE** - Logo, colores corporativos (#ff6680 primary)
- **Estructura de 8 secciones**:
  1. Información de Contacto
  2. Objetivos del Proyecto
  3. Público Objetivo
  4. Funcionalidades Requeridas
  5. Estilo Visual y Marca
  6. Contenidos
  7. Aspectos Técnicos
  8. Información Adicional

- **Formateo profesional**:
  - Paginación automática
  - Títulos con fondo de color
  - Footer con información de contacto
  - Mapeo de valores a texto legible
  - Soporte para campos de texto largo con line wrapping

### 2. API Endpoints

#### `/api/briefing/download` (POST)

Genera y descarga el PDF con los datos del briefing completado.

**Request Body:**

```typescript
{
  nombre: string;
  email: string;
  empresa?: string;
  telefono?: string;
  objetivoPrincipal: string;
  problemasResolver: string;
  presupuestoEstimado: string;
  plazoPreferido: string;
  // ... resto de campos del briefing
  timestamp: string;
}
```

**Response:**

- Content-Type: `application/pdf`
- Content-Disposition: `attachment; filename="briefing-{nombre}-{fecha}.pdf"`
- PDF binario listo para descarga

#### `/api/briefing/plantilla` (GET)

Descarga una plantilla PDF en blanco para completar manualmente.

**Response:**

- Content-Type: `application/pdf`
- Content-Disposition: `attachment; filename="briefing-webcode-plantilla.pdf"`
- Cache: Cacheado indefinidamente (inmutable)

### 3. Integración en el Formulario

#### Botón de Descarga Post-Envío

Tras completar el briefing, el usuario puede:

- **[Completado]** Descargar su briefing en PDF
- **[Completado]** Volver al inicio
- **[Completado]** Ver el proceso completo

#### Plantilla Descargable en Página Principal

En `/briefing`:

- Botón destacado para descargar la plantilla PDF vacía
- Permite a clientes completar el briefing offline

## **[Diseño]** Diseño del PDF

### Colores

- **Primary**: RGB(255, 102, 128) - #ff6680
- **Dark Background**: RGB(24, 24, 27) - #18181b
- **Text Color**: RGB(161, 161, 170) - #a1a1aa

### Tipografía

- **Títulos**: Helvetica Bold, 12-24pt
- **Contenido**: Helvetica Regular, 10pt
- **Footer**: Helvetica, 8pt

### Layout

- **Márgenes**: 20pt en todos los lados
- **Ancho de contenido**: `pageWidth - 40pt`
- **Espaciado entre secciones**: 5-15pt
- **Saltos de página automáticos**

## **[Paquete]** Dependencias

```json
{
  "jspdf": "^3.0.3",
  "jspdf-autotable": "^5.0.2"
}
```

## **[Herramientas]** Uso Técnico

### Generar PDF del Briefing Completado

```typescript
import { generateBriefingPDF, type BriefingPDFData } from "@/lib/pdf-generator";

const briefingData: BriefingPDFData = {
  nombre: "Juan Pérez",
  email: "juan@example.com",
  // ... resto de datos
  timestamp: new Date().toISOString()
};

const pdf = generateBriefingPDF(briefingData);

// Descargar
pdf.save("briefing-juan-perez.pdf");

// O convertir a buffer para API
const buffer = Buffer.from(pdf.output("arraybuffer"));
```

### Generar Plantilla en Blanco

```typescript
import { generateBlankBriefingPDF } from "@/lib/pdf-generator";

const pdf = generateBlankBriefingPDF();
pdf.save("briefing-plantilla.pdf");
```

### Descargar desde el Frontend

```typescript
const downloadPDF = async () => {
  const response = await fetch("/api/briefing/download", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(briefingData)
  });

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "briefing.pdf";
  a.click();
  window.URL.revokeObjectURL(url);
};
```

## **[Web]** URLs Disponibles

- **Formulario online**: `https://webcode.es/briefing/formulario`
- **Descargar plantilla**: `https://webcode.es/api/briefing/plantilla`
- **Página informativa**: `https://webcode.es/briefing`

## **[Magia]** Características Especiales

### Mapeo de Valores

Todos los valores codificados se traducen a texto legible:

```typescript
// Antes: "8000-15000"
// Después en PDF: "8.000€ - 15.000€"

// Antes: ["es", "ca", "en"]
// Después en PDF: "Español, Catalán, Inglés"

// Antes: tieneIdentidadCorporativa: true
// Después en PDF: "Sí"
```

### Manejo de Arrays

Los arrays de funcionalidades y dispositivos se formatean como listas separadas por comas.

### Texto Largo

Los campos de texto largo (como objetivos, problemas a resolver) se dividen automáticamente en múltiples líneas respetando el ancho de página.

### Paginación Inteligente

El sistema detecta cuando una sección no cabe en la página actual y añade un salto de página automático.

## **[Objetivos]** Casos de Uso

1. **Cliente completa formulario online**
   - Rellena el briefing paso a paso
   - Al finalizar, descarga su PDF
   - Lo revisa y lo comparte internamente
   - WEBCODE recibe copia por email

2. **Cliente prefiere formato offline**
   - Descarga la plantilla desde `/briefing`
   - La imprime o la completa digitalmente
   - Nos la envía por email
   - WEBCODE digitaliza la información

3. **Documentación del proyecto**
   - El PDF sirve como documento de referencia
   - Se archiva con la propuesta
   - Se consulta durante el desarrollo

## **[Candado]** Seguridad

- **[Completado]** Validación de datos con Zod
- **[Completado]** Sanitización de nombres de archivo
- **[Completado]** Sin almacenamiento de PDFs en servidor
- **[Completado]** Generación on-demand
- **[Completado]** Headers de seguridad apropiados

## **[Análisis]** Rendimiento

- **Tiempo de generación**: ~100-300ms
- **Tamaño típico**: 50-150 KB
- **Compresión**: Ninguna (PDFs ya optimizados)
- **Cache**: Plantilla en blanco cacheada indefinidamente

## 🐛 Manejo de Errores

Todos los endpoints manejan errores gracefully:

```typescript
{
  success: false,
  error: "Error al generar el PDF",
  details: "Mensaje de error específico"
}
```

## **[Lanzamiento]** Mejoras Futuras

- [ ] Añadir logo del cliente en el PDF
- [ ] Permitir selección de idioma del PDF
- [ ] Generar versión con gráficos/estadísticas
- [ ] Añadir marca de agua "BORRADOR"
- [ ] Envío automático del PDF por email
- [ ] Firma digital del PDF
- [ ] Versión multiidioma del PDF
- [ ] Exportar a otros formatos (DOCX, HTML)

## **[Documentación]** Notas de Implementación

1. **jsPDF** se ejecuta tanto en cliente como servidor
2. Los PDFs se generan en memoria, no se guardan en disco
3. La plantilla en blanco usa el mismo generador con datos vacíos
4. El sistema es completamente stateless
5. Compatible con Next.js 15 y App Router

## **[Teléfono]** Contacto

Para dudas sobre esta funcionalidad:

- **Responsable**: Equipo WEBCODE
- **Email**: info@webcode.es
- **Documentación**: `/docs/BRIEFING-PDF-EXPORT.md`

---

**Última actualización**: Octubre 2025  
**Versión**: 1.0.0
