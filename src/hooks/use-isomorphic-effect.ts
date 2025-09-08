import { useEffect, useLayoutEffect } from "react";

/**
 * Un hook que se comporta como useLayoutEffect en el cliente y como useEffect en el servidor.
 * Esto evita advertencias de hidratación cuando se necesita ejecutar efectos que dependen del DOM.
 */
const useIsomorphicEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default useIsomorphicEffect;