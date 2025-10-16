"use client";

import { WSFadeIn } from "@/components/animations/ws-fade-in";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

interface Fase {
	numero: number;
	titulo: string;
	duracion: string;
	actividades: string[];
	entregables: string[];
	participacion: string;
}

interface PhaseDetailsProps {
	fases: Fase[];
}

// Explicaciones claras y sin tecnicismos para cada actividad
const activityExplanations: Record<string, string> = {
	// Fase 1: Discovery & Strategy
	"Análisis de necesidades del negocio":
		"Nos reunimos contigo para entender tu negocio, tus objetivos y lo que quieres conseguir con tu web. Es como una consulta donde nos cuentas tu visión y nosotros tomamos nota de todo lo importante.",

	"Research de competencia y mercado":
		"Investigamos qué están haciendo otros negocios similares al tuyo en Barcelona y online. Esto nos ayuda a identificar oportunidades para que tu web destaque y ofrezca algo único a tus clientes.",

	"Definición de objetivos y KPIs":
		"Establecemos metas claras y medibles para tu web. Por ejemplo: '20 consultas al mes' o 'aumentar ventas online un 30%'. Así sabremos si la web está funcionando bien.",

	"Arquitectura de información":
		"Organizamos todo el contenido de tu web de forma lógica. Decidimos qué secciones tendrá (Inicio, Servicios, Contacto, etc.) y cómo se conectarán entre sí para que tus clientes encuentren lo que buscan fácilmente.",

	// Fase 2: Diseño & Experiencia
	"Design system personalizado":
		"Creamos una guía visual única para tu marca: colores, tipografías, botones y estilos que reflejen tu identidad. Es como el 'manual de estilo' de tu web para que todo se vea consistente y profesional.",

	"Wireframes y flujos básicos":
		"Hacemos bocetos simples (como planos de arquitecto) que muestran dónde irá cada elemento en tu web. Sin colores ni diseño final, solo la estructura básica para que apruebes cómo funcionará.",

	"Mockups high-fidelity":
		"Diseñamos la versión final visual de tu web con todos los detalles: colores, imágenes, textos y efectos. Es como ver tu web terminada antes de empezar a programarla.",

	"Testing de usabilidad + Microsoft Clarity":
		"Probamos que tu web sea fácil de usar en diferentes dispositivos. Usamos herramientas que nos muestran cómo los visitantes navegan tu web para mejorar su experiencia.",

	// Fase 3: Desarrollo & Integración
	"Código limpio y escalable (Next.js 15 + React 19)":
		"Programamos tu web usando las tecnologías más modernas y profesionales del mercado. El código es ordenado y está preparado para crecer cuando tu negocio lo necesite, sin empezar desde cero.",

	"Integración de herramientas (Analytics, pagos, APIs)":
		"Conectamos tu web con otras plataformas que necesites: sistema de pagos online, herramientas de estadísticas para saber cuántos visitantes recibes, formularios de contacto, redes sociales, etc.",

	"Testing automatizado":
		"Realizamos pruebas exhaustivas de forma automática para asegurarnos de que todo funcione correctamente: formularios, botones, enlaces, pagos... Todo antes de que tus clientes lo vean.",

	"Optimización de performance":
		"Hacemos que tu web cargue súper rápido (menos de 3 segundos). Esto es crucial porque los clientes abandonan webs lentas y Google penaliza las webs que tardan mucho en cargar.",

	// Fase 4: Launch & Optimización
	"Deploy en producción (blue-green deployment)":
		"Publicamos tu web en internet de forma segura y sin interrupciones. Usamos una técnica profesional que permite tener la web antigua y nueva funcionando simultáneamente, haciendo el cambio sin que tus clientes noten nada.",

	"Configuración de analytics completa":
		"Instalamos y configuramos herramientas para que puedas ver estadísticas de tu web: cuántos visitantes recibes, de dónde vienen, qué páginas miran más, cuánto tiempo se quedan, etc.",

	"Interpretación de analytics y herramientas":
		"Te enseñamos a entender los números y gráficos de las estadísticas. No solo instalarlas, sino saber interpretarlas para tomar decisiones inteligentes sobre tu negocio.",

	"Training del cliente (presencial BCN o remoto)":
		"Te damos formación personalizada para que sepas gestionar tu web tú mismo: actualizar contenidos, subir fotos, cambiar precios, publicar noticias... Todo de forma visual y fácil, sin necesidad de saber programar.",
};

export default function PhaseDetails({ fases }: PhaseDetailsProps) {
	return (
		<section className="relative py-20 overflow-hidden">
			{/* Fondo con gradiente estático (optimizado) */}
			<div className="absolute inset-0 bg-gradient-to-br from-muted/30 via-background to-muted/50" />
			<div className="absolute inset-0 opacity-20">
				<div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-2xl" />
				<div className="absolute top-10 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-2xl" />
				<div className="absolute bottom-10 left-1/3 w-72 h-72 bg-accent/10 rounded-full blur-2xl" />
			</div>

			{/* Grid pattern sutil */}
			<div className="absolute inset-0 bg-[linear-gradient(rgba(var(--primary-rgb),0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary-rgb),0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

			<div className="container mx-auto px-4 relative z-10">
				<WSFadeIn delay={0.2}>
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-webcode mb-4">
							Detalles de Cada Fase
						</h2>
						<p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
							Qué hacemos, qué entregas recibes y cuánto tiempo necesitas
							dedicar
						</p>
					</div>
				</WSFadeIn>

				<div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
					{fases.map((fase, index) => (
						<WSFadeIn key={fase.numero} delay={0.1 * (index + 1)}>
							<div className="group relative">
								{/* Efecto de brillo de fondo en hover */}
								<div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700 rounded-2xl" />

								{/* Card principal con glassmorphism */}
								<div className="relative bg-card/90 backdrop-blur-xl border-2 border-primary/20 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:border-primary/40">
									{/* Label de duración alineado con el número */}
									<div className="absolute top-8 right-4 flex items-center">
										<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 shadow-lg">
											<svg
												className="w-4 h-4 text-primary flex-shrink-0"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<title>Clock</title>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
												/>
											</svg>
											<span className="text-sm font-semibold text-primary whitespace-nowrap">
												{fase.duracion}
											</span>
										</div>
									</div>

									{/* Header con número y título mejorado */}
									<div className="flex items-center gap-4 mb-6 pr-32">
										{/* Badge numérico con efecto neon */}
										<div className="relative flex-shrink-0">
											<div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl w-16 h-16 flex items-center justify-center font-bold text-2xl shadow-lg group-hover:shadow-primary/50 group-hover:scale-110 transition-all duration-300">
												{fase.numero}
											</div>
											<div className="absolute inset-0 rounded-2xl bg-primary/30 blur-md group-hover:blur-lg transition-all duration-300" />
										</div>

										{/* Título con mejor espaciado */}
										<div className="flex-1">
											<h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 leading-tight">
												{fase.titulo}
											</h3>
										</div>
									</div>

									{/* Actividades con Accordion */}
									<div className="mb-6">
										<div className="flex items-center gap-2 mb-4">
											<div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
												<svg
													className="w-5 h-5 text-primary"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<title>Clipboard</title>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
													/>
												</svg>
											</div>
											<h4 className="text-sm font-bold text-foreground uppercase tracking-wide">
												Actividades
											</h4>
										</div>

										<Accordion
											type="single"
											collapsible
											className="w-full space-y-2"
										>
											{fase.actividades.map((actividad, idx) => (
												<AccordionItem
													key={`${fase.numero}-actividad-${actividad.substring(0, 20)}`}
													value={`item-${fase.numero}-${idx}`}
													className="border-2 !border-b-2 border-primary/20 rounded-lg px-4 hover:border-primary/40 transition-all duration-300 bg-card/50 backdrop-blur-sm"
												>
													<AccordionTrigger className="text-sm font-semibold text-foreground hover:text-primary hover:no-underline py-3 px-2">
														<div className="flex items-center gap-4 text-left">
															<span className="text-primary font-bold flex-shrink-0 ml-1">
																▸
															</span>
															<span>{actividad}</span>
														</div>
													</AccordionTrigger>
													<AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4 pt-2">
														<div className="pl-7 pr-4 py-3 bg-primary/5 rounded-lg border-l-4 border-primary/50">
															{activityExplanations[actividad] ||
																"Explicación detallada de esta actividad."}
														</div>
													</AccordionContent>
												</AccordionItem>
											))}
										</Accordion>
									</div>

									{/* Entregables */}
									<div className="mb-6">
										<div className="flex items-center gap-2 mb-4">
											<div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
												<svg
													className="w-5 h-5 text-secondary"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<title>Check circle</title>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
													/>
												</svg>
											</div>
											<h4 className="text-sm font-bold text-foreground uppercase tracking-wide">
												Entregables
											</h4>
										</div>
										<ul className="grid grid-cols-1 gap-2">
											{fase.entregables.map((entregable) => (
												<li
													key={`${fase.numero}-entregable-${entregable.substring(0, 20)}`}
													className="flex items-center gap-3 text-sm text-muted-foreground bg-gradient-to-r from-secondary/5 to-transparent p-3 rounded-lg hover:from-secondary/10 transition-all duration-300"
												>
													<span className="text-secondary font-bold text-lg flex-shrink-0 flex items-center justify-center w-5 h-5">
														✓
													</span>
													<span className="hover:text-foreground transition-colors duration-300 leading-relaxed">
														{entregable}
													</span>
												</li>
											))}
										</ul>
									</div>

									{/* Participación del cliente */}
									<div className="pt-4 border-t-2 border-dashed border-primary/20">
										<div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20">
											<div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
												<svg
													className="w-5 h-5 text-primary"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<title>User</title>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
													/>
												</svg>
											</div>
											<div>
												<p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
													Tu participación
												</p>
												<p className="text-sm font-semibold text-foreground">
													{fase.participacion}
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</WSFadeIn>
					))}
				</div>
			</div>
		</section>
	);
}
