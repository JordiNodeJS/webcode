"use client";

import { useTheme as useNextTheme } from "next-themes";
import { useEffect, useState } from "react";

/**
 * Hook personalizado para manejar el tema oscuro/claro
 *
 * Este hook utiliza next-themes para manejar la persistencia del tema
 * y sincroniza con las preferencias del sistema.
 */
export function useTheme() {
	const { theme, setTheme, systemTheme } = useNextTheme();
	const [mounted, setMounted] = useState(false);

	// Esperar a que el componente se monte para evitar problemas de hidratación
	useEffect(() => {
		setMounted(true);
	}, []);

	// Actualizar el tema cuando cambia
	const toggleTheme = () => {
		// Determinar el tema actual real (considerando el tema del sistema)
		const currentTheme = theme === "system" ? systemTheme : theme;
		const newTheme = currentTheme === "dark" ? "light" : "dark";
		setTheme(newTheme);
	};

	// Solo renderizar el tema después de que el componente se monte
	// para evitar hidratación incorrecta
	return { theme, toggleTheme, mounted };
}
