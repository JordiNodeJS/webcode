"use client";

import { useId } from "react";

export function ServiceHeader() {
	const id = useId();
	const descId = `service-header-desc-${id}`;

	return (
		<section
			className="text-center max-w-4xl mx-auto"
			aria-labelledby={`servicios-${id}`}
		>
			<h2 id={`servicios-${id}`} className="neon-cyan-title mb-6 scroll-mt-20">
				Soluciones Simples
			</h2>
			<p
				id={`servicios-paragraph-${id}`}
				className="text-xl md:text-2xl text-muted-foreground leading-relaxed"
				aria-describedby={descId}
			>
				Para negocios que necesitan presencia digital{" "}
				<span className="text-foreground font-semibold">rápida y efectiva</span>
			</p>

			<span id={descId} className="sr-only">
				Sección de servicios con soluciones rápidas y efectivas para negocios.
			</span>
		</section>
	);
}
