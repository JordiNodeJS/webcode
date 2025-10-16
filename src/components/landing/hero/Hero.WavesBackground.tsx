/**
 * Waves Background Component
 *
 * Componente que renderiza un fondo con olas animadas SVG
 * que se extienden hasta el final de la sección.
 * Se suspende automáticamente cuando no está visible para optimizar rendimiento.
 */
"use client";

import { useEffect, useRef } from "react";

export function WavesBackground() {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.target === containerRef.current) {
						if (!entry.isIntersecting) {
							// Cuando no está visible, pausar animaciones para ahorrar CPU/GPU
							entry.target.classList.add("out-of-view");
						} else {
							entry.target.classList.remove("out-of-view");
						}
					}
				});
			},
			{
				threshold: 0.1,
				rootMargin: "100px 0px 100px 0px",
			},
		);

		if (containerRef.current) {
			observer.observe(containerRef.current);
		}

		return () => observer.disconnect();
	}, []);

	return (
		<div
			ref={containerRef}
			className="waves-background absolute inset-0 overflow-hidden pointer-events-none"
		>
			<svg
				className="absolute bottom-0 left-0 w-[200%] h-full"
				viewBox="0 0 2400 200"
				preserveAspectRatio="none"
				role="img"
				aria-label="Olas decorativas animadas en el fondo"
			>
				<title>Olas decorativas animadas en el fondo</title>
				{/* Ola principal más grande */}
				<path
					d="M0,100 C300,150 900,50 1200,100 C1500,150 2100,50 2400,100 L2400,200 L0,200 Z"
					fill="oklch(0.703 0.135 328.5 / 0.05)" // Rosa principal con 5% de opacidad
					className="animate-wave-slow"
				/>
				{/* Ola media */}
				<path
					d="M0,120 C300,70 900,130 1200,80 C1500,30 2100,130 2400,80 L2400,200 L0,200 Z"
					fill="oklch(0.873 0.058 184.1 / 0.05)" // Aguamarina con 5% de opacidad
					className="animate-wave-fast"
				/>
				{/* Ola superior más pequeña */}
				<path
					d="M0,140 C300,90 900,110 1200,60 C1500,10 2100,110 2400,60 L2400,200 L0,200 Z"
					fill="oklch(0.703 0.135 328.5 / 0.03)" // Rosa principal con 3% de opacidad
					className="animate-wave-medium"
				/>
			</svg>
		</div>
	);
}
