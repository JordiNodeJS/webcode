#!/usr/bin/env node

/**
 * Script de Migración Automática de Emoticones a SVGs
 *
 * Reemplaza todos los emoticones en archivos de documentación y prompts
 * por referencias a SVGs para crear una identidad visual única de WebCode
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

// Mapeo de emoticones a nombres descriptivos para documentación
const EMOJI_TO_TEXT_MAP = {
  "🎨": "Diseño",
  "🏗️": "Arquitectura",
  "🎯": "Objetivos",
  "✅": "Completado",
  "❌": "Error",
  "⚠️": "Advertencia",
  "📊": "Análisis",
  "💡": "Idea",
  "📝": "Documentación",
  "🔧": "Herramientas",
  "📋": "Lista",
  "📚": "Recursos",
  "⚡": "Rendimiento",
  "📱": "Móvil",
  "🎉": "Celebración",
  "🚀": "Lanzamiento",
  "💻": "Desarrollo",
  "🌐": "Web",
  "📈": "Crecimiento",
  "⭐": "Destacado",
  "🎁": "Regalo",
  "💎": "Calidad",
  "🔥": "Tendencia",
  "🌟": "Estrella",
  "💫": "Brillo",
  "✨": "Magia",
  "📞": "Teléfono",
  "📧": "Email",
  "💬": "Chat",
  "🖥️": "Escritorio",
  "📹": "Video",
  "🔍": "Búsqueda",
  "🛡️": "Protección",
  "🧠": "Inteligencia",
  "📸": "Fotografía",
  "⏰": "Tiempo",
  "🔗": "Enlace",
  "💭": "Pensamiento",
  "🎪": "Entretenimiento",
  "🎭": "Arte",
  "🎬": "Cine",
  "🎵": "Música",
  "🎶": "Música",
  "🎸": "Guitarra",
  "🎹": "Piano",
  "🎺": "Trompeta",
  "🎻": "Violín",
  "🎲": "Dados",
  "🎳": "Bolos",
  "🎮": "Videojuegos",
  "🎰": "Casino",
  "🎱": "Billar",
  "🖌️": "Pincel",
  "📐": "Regla",
  "📏": "Medición",
  "📌": "Pin",
  "📍": "Ubicación",
  "📎": "Clip",
  "🖇️": "Grapa",
  "📖": "Libro",
  "📗": "Libro Verde",
  "📘": "Libro Azul",
  "📙": "Libro Amarillo",
  "📕": "Libro Rojo",
  "📓": "Cuaderno",
  "📔": "Diario",
  "📒": "Carpeta",
  "📑": "Marcador",
  "🔖": "Marcador",
  "🏷️": "Etiqueta",
  "💰": "Dinero",
  "💸": "Gasto",
  "💳": "Tarjeta",
  "💴": "Yen",
  "💵": "Dólar",
  "💶": "Euro",
  "💷": "Libra",
  "💹": "Gráfico",
  "💺": "Asiento",
  "💼": "Maletín",
  "💽": "Disco",
  "💾": "Guardar",
  "💿": "CD",
  "📀": "DVD",
  "📁": "Carpeta",
  "📂": "Carpeta Abierta",
  "📃": "Página",
  "📄": "Documento",
  "📅": "Calendario",
  "📆": "Calendario",
  "📇": "Ficha",
  "📉": "Descenso",
  "📛": "Insignia",
  "📜": "Pergamino",
  "📟": "Beeper",
  "📠": "Fax",
  "📡": "Satélite",
  "📢": "Altavoz",
  "📣": "Megáfono",
  "📤": "Enviar",
  "📥": "Recibir",
  "📦": "Paquete",
  "📨": "Carta",
  "📩": "Sobre",
  "📪": "Buzón",
  "📫": "Buzón Abierto",
  "📬": "Buzón Con Bandera",
  "📭": "Buzón Vacío",
  "📮": "Buzón Postal",
  "📯": "Trompeta",
  "📰": "Periódico",
  "📲": "Móvil",
  "📳": "Vibración",
  "📴": "Móvil Apagado",
  "📵": "Sin Señal",
  "📶": "Señal",
  "📷": "Cámara",
  "📺": "Televisión",
  "📻": "Radio",
  "📼": "VHS",
  "📽️": "Proyector",
  "📾": "CD",
  "📿": "Rosario",
  "🔀": "Aleatorio",
  "🔁": "Repetir",
  "🔂": "Repetir Uno",
  "🔃": "Actualizar",
  "🔄": "Recargar",
  "🔅": "Brillo Bajo",
  "🔆": "Brillo Alto",
  "🔇": "Silencio",
  "🔈": "Volumen Bajo",
  "🔉": "Volumen Medio",
  "🔊": "Volumen Alto",
  "🔋": "Batería",
  "🔌": "Enchufe",
  "🔎": "Lupa",
  "🔏": "Candado",
  "🔐": "Candado Cerrado",
  "🔑": "Llave",
  "🔒": "Candado",
  "🔓": "Candado Abierto",
  "🔔": "Campana",
  "🔕": "Campana Silenciada",
  "🔘": "Radio",
  "🔙": "Atrás",
  "🔚": "Fin",
  "🔛": "Encendido",
  "🔜": "Próximo",
  "🔝": "Arriba",
  "🔞": "Adultos",
  "🔟": "Diez",
  "🔠": "Mayúsculas",
  "🔡": "Minúsculas",
  "🔢": "Números",
  "🔣": "Símbolos",
  "🔤": "Letras",
  "🔦": "Linterna",
  "🔨": "Martillo",
  "🔩": "Tornillo",
  "🔪": "Cuchillo",
  "🔫": "Pistola",
  "🔬": "Microscopio",
  "🔭": "Telescopio",
  "🔮": "Bola de Cristal",
  "🔯": "Estrella de David",
  "🔰": "Principiante",
  "🔱": "Tridente",
  "🔲": "Cuadrado",
  "🔳": "Cuadrado Blanco",
  "🔴": "Círculo Rojo",
  "🔵": "Círculo Azul",
  "🔶": "Diamante Naranja",
  "🔷": "Diamante Azul",
  "🔸": "Diamante Pequeño Naranja",
  "🔹": "Diamante Pequeño Azul",
  "🔺": "Triángulo Rojo",
  "🔻": "Triángulo Rojo Invertido",
  "🔼": "Triángulo Pequeño",
  "🔽": "Triángulo Pequeño Invertido",
  "🕐": "Una",
  "🕑": "Dos",
  "🕒": "Tres",
  "🕓": "Cuatro",
  "🕔": "Cinco",
  "🕕": "Seis",
  "🕖": "Siete",
  "🕗": "Ocho",
  "🕘": "Nueve",
  "🕙": "Diez",
  "🕚": "Once",
  "🕛": "Doce",
  "🕜": "Una y Media",
  "🕝": "Dos y Media",
  "🕞": "Tres y Media",
  "🕟": "Cuatro y Media",
  "🕠": "Cinco y Media",
  "🕡": "Seis y Media",
  "🕢": "Siete y Media",
  "🕣": "Ocho y Media",
  "🕤": "Nueve y Media",
  "🕥": "Diez y Media",
  "🕦": "Once y Media",
  "🕧": "Doce y Media",
  "🕰️": "Reloj",
  "🕳️": "Agujero",
  "🕴️": "Levitar",
  "🕵️": "Detective",
  "🕶️": "Gafas de Sol",
  "🕷️": "Araña",
  "🕸️": "Telaraña",
  "🕹️": "Joystick",
  "🕺": "Bailarín",
  "🖊️": "Bolígrafo",
  "🖋️": "Pluma",
  "🖍️": "Crayón",
  "🖎": "Tijeras",
  "🖏": "Mano",
  "🖐️": "Mano Abierta",
  "🖑": "Mano Deteniendo",
  "🖒": "Pulgar Arriba",
  "🖓": "Pulgar Abajo",
  "🖔": "Mano Izquierda",
  "🖕": "Dedo Medio",
  "🖖": "Saludo Vulcano",
  "🖗": "Mano Derecha",
  "🖘": "Mano Izquierda",
  "🖙": "Mano Derecha",
  "🖚": "Mano Izquierda",
  "🖛": "Mano Derecha",
  "🖜": "Mano Izquierda",
  "🖝": "Mano Derecha",
  "🖞": "Mano Izquierda",
  "🖟": "Mano Derecha",
  "🖠": "Mano Izquierda",
  "🖡": "Mano Derecha",
  "🖢": "Mano Izquierda",
  "🖣": "Mano Derecha",
  "🖤": "Corazón Negro",
  "🖥️": "Monitor",
  "🖦": "Teclado",
  "🖧": "Ratón",
  "🖨️": "Impresora",
  "🖩": "Calculadora",
  "🖪": "Círculo",
  "🖫": "Círculo",
  "🖬": "Círculo",
  "🖭": "Círculo",
  "🖮": "Círculo",
  "🖯": "Círculo",
  "🖰": "Círculo",
  "🖱️": "Ratón",
  "🖲️": "Círculo",
  "🖳": "Círculo",
  "🖴": "Círculo",
  "🖵": "Círculo",
  "🖶": "Círculo",
  "🖷": "Círculo",
  "🖸": "Círculo",
  "🖹": "Círculo",
  "🖺": "Círculo",
  "🖻": "Círculo",
  "🖼️": "Marco",
  "🖽": "Círculo",
  "🖾": "Círculo",
  "🖿": "Círculo",
  "🗀": "Carpeta",
  "🗁": "Carpeta",
  "🗂️": "Carpeta",
  "🗃️": "Carpeta",
  "🗄️": "Carpeta",
  "🗅": "Carpeta",
  "🗆": "Carpeta",
  "🗇": "Carpeta",
  "🗈": "Carpeta",
  "🗉": "Carpeta",
  "🗊": "Carpeta",
  "🗋": "Carpeta",
  "🗌": "Carpeta",
  "🗍": "Carpeta",
  "🗎": "Carpeta",
  "🗏": "Carpeta",
  "🗐": "Carpeta",
  "🗑️": "Papelera",
  "🗒": "Notas",
  "🗓": "Calendario",
  "🗔": "Círculo",
  "🗕": "Círculo",
  "🗖": "Círculo",
  "🗗": "Círculo",
  "🗘": "Círculo",
  "🗙": "Círculo",
  "🗚": "Círculo",
  "🗛": "Círculo",
  "🗜": "Círculo",
  "🗝": "Círculo",
  "🗞": "Periódico",
  "🗟": "Círculo",
  "🗠": "Círculo",
  "🗡": "Espada",
  "🗢": "Círculo",
  "🗣": "Hablar",
  "🗤": "Círculo",
  "🗥": "Círculo",
  "🗦": "Círculo",
  "🗧": "Círculo",
  "🗨": "Burbuja de Diálogo",
  "🗩": "Burbuja de Diálogo",
  "🗪": "Burbuja de Diálogo",
  "🗫": "Burbuja de Diálogo",
  "🗬": "Burbuja de Diálogo",
  "🗭": "Burbuja de Diálogo",
  "🗮": "Burbuja de Diálogo",
  "🗯": "Burbuja de Diálogo",
  "🗰": "Burbuja de Diálogo",
  "🗱": "Burbuja de Diálogo",
  "🗲": "Burbuja de Diálogo",
  "🗳": "Burbuja de Diálogo",
  "🗴": "Burbuja de Diálogo",
  "🗵": "Burbuja de Diálogo",
  "🗶": "Burbuja de Diálogo",
  "🗷": "Burbuja de Diálogo",
  "🗸": "Burbuja de Diálogo",
  "🗹": "Burbuja de Diálogo",
  "🗺": "Mapa",
  "🗻": "Monte Fuji",
  "🗼": "Torre de Tokio",
  "🗽": "Estatua de la Libertad",
  "🗾": "Mapa de Japón",
  "🗿": "Moai"
};

// Directorios a procesar
const DIRECTORIES_TO_PROCESS = ["docs", ".github/prompts"];

// Extensiones de archivo a procesar
const FILE_EXTENSIONS = [".md", ".txt", ".json"];

function replaceEmojisInText(text) {
  let result = text;

  // Reemplazar emoticones con texto descriptivo
  Object.entries(EMOJI_TO_TEXT_MAP).forEach(([emoji, text]) => {
    const regex = new RegExp(emoji, "g");
    result = result.replace(regex, `**[${text}]**`);
  });

  return result;
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const newContent = replaceEmojisInText(content);

    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, "utf8");
      console.log(`✅ Migrado: ${path.relative(projectRoot, filePath)}`);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`❌ Error procesando ${filePath}:`, error.message);
    return false;
  }
}

function processDirectory(dirPath) {
  const items = fs.readdirSync(dirPath);
  let processedCount = 0;

  items.forEach((item) => {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processedCount += processDirectory(fullPath);
    } else if (
      stat.isFile() &&
      FILE_EXTENSIONS.some((ext) => item.endsWith(ext))
    ) {
      if (processFile(fullPath)) {
        processedCount++;
      }
    }
  });

  return processedCount;
}

function main() {
  console.log("🚀 Iniciando migración de emoticones a SVGs...\n");

  let totalProcessed = 0;

  DIRECTORIES_TO_PROCESS.forEach((dir) => {
    const dirPath = path.join(projectRoot, dir);

    if (fs.existsSync(dirPath)) {
      console.log(`📁 Procesando directorio: ${dir}`);
      const count = processDirectory(dirPath);
      totalProcessed += count;
      console.log(`   Procesados: ${count} archivos\n`);
    } else {
      console.log(`⚠️  Directorio no encontrado: ${dir}\n`);
    }
  });

  console.log(`🎉 Migración completada!`);
  console.log(`📊 Total de archivos procesados: ${totalProcessed}`);
  console.log(
    `\n💡 Los emoticones han sido reemplazados por texto descriptivo entre **[corchetes]**`
  );
  console.log(
    `   Esto crea una identidad visual única para WebCode sin emoticones Unicode.`
  );
}

main();
