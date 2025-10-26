/**
 * 🎬 Spline Scenes Registry
 * 
 * Rutas centralizadas de las escenas 3D de Spline (.splinecode)
 * 
 * @see Tutorial: https://spline.webcode.es/guia-spline
 */

export const SPLINE_SCENES = {
  /** Escena de teclado interactivo - Usada en landing pages */
  KEYBOARD: "/scenes/keyboard-scene.splinecode",
  
  /** Escena principal - General purpose */
  MAIN: "/scenes/scene.splinecode",
  
  /** Escena alternativa 1 */
  SCENE_1: "/scenes/scene-1.splinecode",
  
  /** Escena alternativa 3 */
  SCENE_3: "/scenes/scene-3.splinecode",
} as const;

export type SplineScenePath = typeof SPLINE_SCENES[keyof typeof SPLINE_SCENES];
