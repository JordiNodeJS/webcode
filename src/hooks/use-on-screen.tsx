import { useRef, useState } from "react";
import useIsomorphicEffect from "./use-isomorphic-effect";

/**
 * Hook personalizado para detectar cuando un elemento entra en la pantalla usando IntersectionObserver
 *
 * @param threshold - El porcentaje del elemento que debe estar visible para activar la intersección (0-1)
 * @param rootMargin - Margen alrededor del elemento raíz (similar a margin CSS)
 * @returns Un objeto con ref (para asignar al elemento) y isIntersecting (estado de intersección)
 */
const useOnScreen = (
	threshold: number = 0.1,
	rootMargin: string = "0px",
): { ref: React.RefObject<HTMLDivElement | null>; isIntersecting: boolean } => {
	const ref = useRef<HTMLDivElement>(null);
	const [isIntersecting, setIsIntersecting] = useState(false);

	useIsomorphicEffect(() => {
		// En entorno de servidor, retornamos valores por defecto
		if (typeof window === "undefined" || !ref.current) {
			return;
		}

		// Verificar si IntersectionObserver está disponible
		if (!("IntersectionObserver" in window)) {
			// Fallback: hacer visible inmediatamente si no hay soporte
			setIsIntersecting(true);
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsIntersecting(entry.isIntersecting);
			},
			{
				threshold,
				rootMargin,
			},
		);

		if (ref.current) {
			observer.observe(ref.current);
		}

		// Limpiar observer al desmontar
		return () => {
			observer.disconnect();
		};
	}, [threshold, rootMargin]);

	return { ref, isIntersecting };
};

export default useOnScreen;
