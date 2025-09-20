import { useEffect, useLayoutEffect } from "react";

/**
 * Hook que selecciona el efecto adecuado según el entorno
 *
 * En el cliente usa useLayoutEffect para ejecutar el efecto antes de pintar
 * En el servidor usa useEffect para evitar errores de referencia a window
 *
 * @see https://reactjs.org/docs/hooks-reference.html#uselayouteffect
 */
const useIsomorphicEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default useIsomorphicEffect;
