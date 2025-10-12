/**
 * Sistema de Iconos WebCode - Backward Compatibility
 * 
 * Este archivo mantiene retrocompatibilidad con el sistema anterior
 * mientras redirige a los nuevos archivos con code splitting
 * 
 * DEPRECATED: Usar imports directos desde src/lib/icons/ para mejor performance
 */

// Re-export del nuevo sistema con lazy loading
export * from "./icons";

// Re-export del mapa de compatibilidad del nuevo sistema
export { ICON_COMPATIBILITY_MAP, type IconName } from "./icons";
