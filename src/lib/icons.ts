/**
 * Sistema de Iconos WebCode
 *
 * Estrategia multi-familia para originalidad y coherencia:
 *
 * 🎯 Lucide (lucide-react) - Iconos primarios de UI
 *    → Navegación, acciones, estados básicos
 *
 * 🚀 Heroicons (hi2) - Características y secciones
 *    → Features, servicios, highlights
 *
 * 💎 Phosphor (pi) - Creatividad y sectores
 *    → Floristería, peluquería, diseño, arte
 *
 * 🔧 Font Awesome (fa6) - Tecnologías y marcas
 *    → React, Node.js, GitHub, LinkedIn
 *
 * ✨ Feather (fi) - Estados y feedback
 *    → Success, error, warnings, info
 *
 * TARGET: Optimizar bundle size con tree-shaking
 */

// ===== IMPORTS PARA USO INTERNO =====
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  BarChart3,
  CheckIcon as Check,
  CheckCircle,
  ChevronDown,
  ChevronDownIcon,
  ChevronLeft,
  ChevronRight,
  ChevronUpIcon,
  Clock,
  Cookie,
  Cpu,
  ExternalLink,
  Eye,
  FileText,
  Heart,
  Home,
  LayoutGrid,
  Loader2,
  MapPin,
  MemoryStick,
  Menu,
  Monitor,
  Moon,
  MoreHorizontal,
  MoreVertical,
  Pause,
  Play,
  Rocket,
  RotateCcw,
  Search,
  Send,
  Settings,
  Shield,
  ShoppingCart,
  Smartphone,
  Star,
  Sun,
  Target,
  TrendingDown,
  TrendingUp,
  User,
  Users,
  XIcon as X,
  Zap,
} from "lucide-react";

import {
  FaFacebook,
  FaFigma,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaNodeJs,
  FaReact,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa6";

import {
  FiAlertCircle,
  FiArrowRight,
  FiCalendar,
  FiCheck,
  FiClock,
  FiDownload,
  FiExternalLink,
  FiInfo,
  FiMail,
  FiMapPin,
  FiPhone,
  FiShare2,
  FiUpload,
  FiX,
} from "react-icons/fi";

import {
  HiOutlineBolt,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineCodeBracket,
  HiOutlineCpuChip,
  HiOutlineExclamationTriangle,
  HiOutlineInformationCircle,
  HiOutlineLightBulb,
  HiOutlinePaintBrush,
  HiOutlineRocketLaunch,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineXCircle,
} from "react-icons/hi2";

import {
  PiCamera,
  PiCoffee,
  PiDress,
  PiFlowerTulip,
  PiForkKnife,
  PiHammer,
  PiHeart,
  PiPaintBrush,
  PiScissors,
  PiShoppingBag,
  PiStar,
  PiStorefront,
  PiWine,
} from "react-icons/pi";

import {
  RiCodeSSlashLine,
  RiFlashlightFill,
  RiLayoutGridFill,
  RiPaletteFill,
  RiSparklingFill,
} from "react-icons/ri";

// ===== RE-EXPORTS PARA USO EXTERNO =====

// Lucide
export {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  BarChart3,
  CheckCircle,
  Check,
  ChevronDown,
  ChevronDownIcon,
  ChevronLeft,
  ChevronRight,
  ChevronUpIcon,
  Clock,
  Cookie,
  Cpu,
  ExternalLink,
  Eye,
  FileText,
  Heart,
  Home,
  LayoutGrid,
  Loader2,
  MapPin,
  MemoryStick,
  Menu,
  Monitor,
  Moon,
  MoreHorizontal,
  MoreVertical,
  Pause,
  Play,
  Rocket,
  RotateCcw,
  Search,
  Send,
  Settings,
  Shield,
  ShoppingCart,
  Smartphone,
  Star,
  Sun,
  Target,
  TrendingDown,
  TrendingUp,
  User,
  Users,
  X,
  Zap,
};
// Font Awesome
export {
  FaFacebook,
  FaFigma,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaNodeJs,
  FaReact,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
};

// Feather
export {
  FiAlertCircle,
  FiArrowRight,
  FiCalendar,
  FiCheck,
  FiClock,
  FiDownload,
  FiExternalLink,
  FiInfo,
  FiMail,
  FiMapPin,
  FiPhone,
  FiShare2,
  FiUpload,
  FiX,
};

// Heroicons
export {
  HiOutlineBolt,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineCodeBracket,
  HiOutlineCpuChip,
  HiOutlineExclamationTriangle,
  HiOutlineInformationCircle,
  HiOutlineLightBulb,
  HiOutlinePaintBrush,
  HiOutlineRocketLaunch,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineXCircle,
};

// Phosphor
export {
  PiCamera,
  PiCoffee,
  PiDress,
  PiFlowerTulip,
  PiForkKnife,
  PiHammer,
  PiHeart,
  PiPaintBrush,
  PiScissors,
  PiShoppingBag,
  PiStar,
  PiStorefront,
  PiWine,
};

// Remix Icon
export {
  RiCodeSSlashLine,
  RiFlashlightFill,
  RiLayoutGridFill,
  RiPaletteFill,
  RiSparklingFill,
};

// ===== MAPA DE COMPATIBILIDAD =====
// Mantiene retrocompatibilidad con el sistema SvgIcon anterior
export const ICON_COMPATIBILITY_MAP = {
  // Navegación y UI (Lucide)
  home: Home,
  menu: Menu,
  x: X,
  close: X,
  search: Search,
  user: User,
  cart: ShoppingCart,
  "shopping-cart": ShoppingCart,
  heart: Heart,
  star: Star,
  settings: Settings,

  // Flechas y navegación
  "arrow-right": ArrowRight,
  "arrow-left": ArrowLeft,
  "arrow-up": ArrowUp,
  "arrow-down": ArrowDown,
  "chevron-down": ChevronDown,
  "chevron-right": ChevronRight,
  "chevron-left": ChevronLeft,
  "chevron-up": ChevronUpIcon,

  // Características y servicios (Heroicons)
  sparkles: HiOutlineSparkles,
  rocket: HiOutlineRocketLaunch,
  lightbulb: HiOutlineLightBulb,
  "light-bulb": HiOutlineLightBulb,
  shield: HiOutlineShieldCheck,
  zap: HiOutlineBolt,
  bolt: HiOutlineBolt,
  cpu: HiOutlineCpuChip,
  paint: HiOutlinePaintBrush,
  "paint-brush": HiOutlinePaintBrush,
  palette: HiOutlinePaintBrush,
  code: HiOutlineCodeBracket,

  // Métricas y tendencias (Lucide)
  "trending-up": TrendingUp,
  "trending-down": TrendingDown,
  "bar-chart": BarChart3,

  // Estados y feedback (Feather)
  check: FiCheck,
  "check-circle": HiOutlineCheckCircle,
  "x-circle": HiOutlineXCircle,
  "alert-circle": FiAlertCircle,
  "alert-triangle": HiOutlineExclamationTriangle,
  warning: HiOutlineExclamationTriangle,
  info: FiInfo,
  "info-circle": HiOutlineInformationCircle,

  // Contacto y comunicación
  mail: FiMail,
  email: FiMail,
  phone: FiPhone,
  "map-pin": FiMapPin,
  location: FiMapPin,
  calendar: FiCalendar,
  clock: FiClock,

  // Acciones
  download: FiDownload,
  upload: FiUpload,
  share: FiShare2,
  "external-link": FiExternalLink,

  // Sectores específicos (Phosphor)
  flower: PiFlowerTulip,
  "flower-tulip": PiFlowerTulip,
  floristeria: PiFlowerTulip,
  scissors: PiScissors,
  peluqueria: PiScissors,
  shop: PiStorefront,
  store: PiStorefront,
  tienda: PiStorefront,
  coffee: PiCoffee,
  cafeteria: PiCoffee,
  camera: PiCamera,
  fotografia: PiCamera,
  hammer: PiHammer,
  construccion: PiHammer,
  fork: PiForkKnife,
  restaurante: PiForkKnife,
  wine: PiWine,
  dress: PiDress,
  moda: PiDress,
  bag: PiShoppingBag,
  "shopping-bag": PiShoppingBag,

  // Redes sociales (Font Awesome)
  github: FaGithub,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
  instagram: FaInstagram,
  facebook: FaFacebook,
  youtube: FaYoutube,
  whatsapp: FaWhatsapp,

  // Tecnologías
  react: FaReact,
  nodejs: FaNodeJs,
  figma: FaFigma,
} as const;

export type IconName = keyof typeof ICON_COMPATIBILITY_MAP;
