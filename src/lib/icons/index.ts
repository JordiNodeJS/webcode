/**
 * Sistema de Iconos WebCode - Barrel Export con Lazy Loading
 * 
 * Estrategia multi-familia para originalidad y coherencia:
 * 
 * 🎯 Lucide (lucide-react) - Iconos primarios de UI
 * 🚀 Heroicons (hi2) - Características y secciones  
 * 💎 Phosphor (pi) - Creatividad y sectores
 * 🔧 Font Awesome (fa6) - Tecnologías y marcas
 * ✨ Feather (fi) - Estados y feedback
 * 🎨 Remix (ri) - Utilidades
 * 
 * TARGET: Optimizar bundle size con tree-shaking y lazy loading
 */

// ===== IMPORTS INMEDIATOS (Críticos) =====
// Solo Lucide se carga inmediatamente por ser el más usado
export * from "./lucide";

// ===== LAZY IMPORTS (No críticos) =====
// Estas familias se cargan bajo demanda

// Font Awesome - Tecnologías y marcas (carga bajo demanda)
export const loadFontAwesome = () => import("./fontawesome");

// Feather - Estados y feedback (carga bajo demanda)  
export const loadFeather = () => import("./feather");

// Heroicons - Características (carga bajo demanda)
export const loadHeroicons = () => import("./heroicons");

// Phosphor - Sectores creativos (carga bajo demanda)
export const loadPhosphor = () => import("./phosphor");

// Remix - Utilidades (carga bajo demanda)
export const loadRemix = () => import("./remix");

// ===== MAPA DE COMPATIBILIDAD =====
// Mantiene retrocompatibilidad con el sistema anterior
import * as Lucide from "./lucide";

// Lazy loading para iconos no críticos
const iconCache = new Map();

async function getIcon(family: string, iconName: string) {
  const cacheKey = `${family}-${iconName}`;
  
  if (iconCache.has(cacheKey)) {
    return iconCache.get(cacheKey);
  }

  let module;
  switch (family) {
    case "fontawesome":
      module = await loadFontAwesome();
      break;
    case "feather":
      module = await loadFeather();
      break;
    case "heroicons":
      module = await loadHeroicons();
      break;
    case "phosphor":
      module = await loadPhosphor();
      break;
    case "remix":
      module = await loadRemix();
      break;
    default:
      return null;
  }

  const icon = module[iconName];
  if (icon) {
    iconCache.set(cacheKey, icon);
  }
  return icon;
}

// Mapa de compatibilidad con lazy loading
export const ICON_COMPATIBILITY_MAP = {
  // Navegación y UI (Lucide - carga inmediata)
  home: Lucide.Home,
  menu: Lucide.Menu,
  x: Lucide.X,
  close: Lucide.X,
  search: Lucide.Search,
  user: Lucide.User,
  cart: Lucide.ShoppingCart,
  "shopping-cart": Lucide.ShoppingCart,
  heart: Lucide.Heart,
  star: Lucide.Star,
  settings: Lucide.Settings,

  // Flechas y navegación (Lucide - carga inmediata)
  "arrow-right": Lucide.ArrowRight,
  "arrow-left": Lucide.ArrowLeft,
  "arrow-up": Lucide.ArrowUp,
  "arrow-down": Lucide.ArrowDown,
  "chevron-down": Lucide.ChevronDown,
  "chevron-right": Lucide.ChevronRight,
  "chevron-left": Lucide.ChevronLeft,
  "chevron-up": Lucide.ChevronUpIcon,

  // Características y servicios (Heroicons - lazy loading)
  sparkles: () => getIcon("heroicons", "HiOutlineSparkles"),
  rocket: () => getIcon("heroicons", "HiOutlineRocketLaunch"),
  lightbulb: () => getIcon("heroicons", "HiOutlineLightBulb"),
  "light-bulb": () => getIcon("heroicons", "HiOutlineLightBulb"),
  shield: () => getIcon("heroicons", "HiOutlineShieldCheck"),
  zap: () => getIcon("heroicons", "HiOutlineBolt"),
  bolt: () => getIcon("heroicons", "HiOutlineBolt"),
  cpu: () => getIcon("heroicons", "HiOutlineCpuChip"),
  paint: () => getIcon("heroicons", "HiOutlinePaintBrush"),
  "paint-brush": () => getIcon("heroicons", "HiOutlinePaintBrush"),
  palette: () => getIcon("heroicons", "HiOutlinePaintBrush"),
  code: () => getIcon("heroicons", "HiOutlineCodeBracket"),

  // Métricas y tendencias (Lucide - carga inmediata)
  "trending-up": Lucide.TrendingUp,
  "trending-down": Lucide.TrendingDown,
  "bar-chart": Lucide.BarChart3,

  // Estados y feedback (Feather - lazy loading)
  check: () => getIcon("feather", "FiCheck"),
  "check-circle": () => getIcon("heroicons", "HiOutlineCheckCircle"),
  "x-circle": () => getIcon("heroicons", "HiOutlineXCircle"),
  "alert-circle": () => getIcon("feather", "FiAlertCircle"),
  "alert-triangle": () => getIcon("heroicons", "HiOutlineExclamationTriangle"),
  warning: () => getIcon("heroicons", "HiOutlineExclamationTriangle"),
  info: () => getIcon("feather", "FiInfo"),
  "info-circle": () => getIcon("heroicons", "HiOutlineInformationCircle"),

  // Contacto y comunicación (Feather - lazy loading)
  mail: () => getIcon("feather", "FiMail"),
  email: () => getIcon("feather", "FiMail"),
  phone: () => getIcon("feather", "FiPhone"),
  "map-pin": () => getIcon("feather", "FiMapPin"),
  location: () => getIcon("feather", "FiMapPin"),
  calendar: () => getIcon("feather", "FiCalendar"),
  clock: () => getIcon("feather", "FiClock"),

  // Acciones (Feather - lazy loading)
  download: () => getIcon("feather", "FiDownload"),
  upload: () => getIcon("feather", "FiUpload"),
  share: () => getIcon("feather", "FiShare2"),
  "external-link": () => getIcon("feather", "FiExternalLink"),

  // Sectores específicos (Phosphor - lazy loading)
  flower: () => getIcon("phosphor", "PiFlowerTulip"),
  "flower-tulip": () => getIcon("phosphor", "PiFlowerTulip"),
  floristeria: () => getIcon("phosphor", "PiFlowerTulip"),
  scissors: () => getIcon("phosphor", "PiScissors"),
  peluqueria: () => getIcon("phosphor", "PiScissors"),
  shop: () => getIcon("phosphor", "PiStorefront"),
  store: () => getIcon("phosphor", "PiStorefront"),
  tienda: () => getIcon("phosphor", "PiStorefront"),
  coffee: () => getIcon("phosphor", "PiCoffee"),
  cafeteria: () => getIcon("phosphor", "PiCoffee"),
  camera: () => getIcon("phosphor", "PiCamera"),
  fotografia: () => getIcon("phosphor", "PiCamera"),
  hammer: () => getIcon("phosphor", "PiHammer"),
  construccion: () => getIcon("phosphor", "PiHammer"),
  fork: () => getIcon("phosphor", "PiForkKnife"),
  restaurante: () => getIcon("phosphor", "PiForkKnife"),
  wine: () => getIcon("phosphor", "PiWine"),
  dress: () => getIcon("phosphor", "PiDress"),
  moda: () => getIcon("phosphor", "PiDress"),
  bag: () => getIcon("phosphor", "PiShoppingBag"),
  "shopping-bag": () => getIcon("phosphor", "PiShoppingBag"),

  // Redes sociales (Font Awesome - lazy loading)
  github: () => getIcon("fontawesome", "FaGithub"),
  linkedin: () => getIcon("fontawesome", "FaLinkedin"),
  twitter: () => getIcon("fontawesome", "FaTwitter"),
  instagram: () => getIcon("fontawesome", "FaInstagram"),
  facebook: () => getIcon("fontawesome", "FaFacebook"),
  youtube: () => getIcon("fontawesome", "FaYoutube"),
  whatsapp: () => getIcon("fontawesome", "FaWhatsapp"),

  // Tecnologías (Font Awesome - lazy loading)
  react: () => getIcon("fontawesome", "FaReact"),
  nodejs: () => getIcon("fontawesome", "FaNodeJs"),
  figma: () => getIcon("fontawesome", "FaFigma"),
} as const;

export type IconName = keyof typeof ICON_COMPATIBILITY_MAP;
