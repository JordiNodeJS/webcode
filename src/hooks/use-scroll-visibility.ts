import { useState } from "react";
import useIsomorphicEffect from "./use-isomorphic-effect";

/**
 * Hook personalizado para manejar la visibilidad de elementos basado en el scroll
 *
 * @param threshold - La cantidad de píxeles que se deben hacer scroll para que el elemento sea visible
 * @returns Un booleano que indica si el elemento debe ser visible
 */
const useScrollVisibility = (threshold: number = 100): boolean => {
	const [isVisible, setIsVisible] = useState(false);

	useIsomorphicEffect(() => {
		// En entorno de servidor, retornamos false por defecto
		if (typeof window === "undefined") {
			return;
		}

		const handleScroll = () => {
			if (window.scrollY > threshold) {
				setIsVisible(true);
				// Remover el event listener una vez que el elemento es visible
				window.removeEventListener("scroll", handleScroll);
			}
		};

		// Verificar si ya se ha scrolleado más allá del umbral al cargar la página
		if (window.scrollY > threshold) {
			setIsVisible(true);
		} else {
			window.addEventListener("scroll", handleScroll);
		}

		// Limpiar event listener al desmontar
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [threshold]);

	return isVisible;
};

export default useScrollVisibility;
