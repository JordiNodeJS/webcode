import type { Metadata } from "next";
import Link from "next/link";
import { SolucionCard } from "@/components/soluciones";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
	title: "Consultoría Tecnológica | WEBCODE",
	description:
		"Consultoría tecnológica y estratégica para empresas. Optimización de procesos, arquitectura de software y transformación digital.",
	openGraph: {
		title: "Consultoría Tecnológica | WEBCODE",
		description:
			"Consultoría tecnológica y estratégica para empresas en transformación digital.",
	},
};

export default function ConsultingPage() {
	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 dark:from-primary/10 dark:via-accent/10 dark:to-secondary/10 py-20 md:py-32">
				<div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-accent/3 to-secondary/3 dark:from-primary/5 dark:via-accent/5 dark:to-secondary/5" />
				<div className="container mx-auto max-w-6xl px-4 relative z-10">
					<div className="max-w-3xl">
						<div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-primary/20 to-accent/20 dark:from-primary/30 dark:to-accent/30 text-primary dark:text-primary font-bold uppercase text-sm tracking-wider rounded-full border border-primary/30">
							Consultoría Tech
						</div>
						<h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-foreground">
							Transformamos tu{" "}
							<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
								Tecnología
							</span>{" "}
							en Ventaja Competitiva
						</h1>
						<p className="text-xl md:text-2xl text-muted-foreground mb-8">
							Consultoría tecnológica y estratégica para empresas que quieren
							liderar en la era digital.
						</p>
						<div className="flex flex-wrap gap-4">
							<Button
								asChild
								size="lg"
								className="font-bold text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:scale-105 transition-all duration-300"
							>
								<Link href="/contacto">Consulta Inicial Gratis</Link>
							</Button>
							<Button
								asChild
								variant="outline"
								size="lg"
								className="font-bold text-lg px-8 py-6 hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 transition-all duration-300"
							>
								<Link href="/blog">Ver Casos de Éxito</Link>
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* Services */}
			<section className="container mx-auto max-w-6xl px-4 py-20">
				<h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
					Áreas de{" "}
					<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
						Consultoría
					</span>
				</h2>

				<div className="grid md:grid-cols-2 gap-8">
					{[
						{
							icon: "🏗️",
							title: "Arquitectura de Software",
							description:
								"Diseñamos la arquitectura técnica de tu producto digital.",
							features: [
								"Auditoría de arquitectura actual",
								"Diseño de sistemas escalables",
								"Microservicios vs Monolito",
								"Cloud architecture (AWS, GCP, Azure)",
								"APIs y integraciones",
								"Documentación técnica",
							],
						},
						{
							icon: "🚀",
							title: "Transformación Digital",
							description: "Acompañamos tu empresa en el cambio digital.",
							features: [
								"Diagnóstico digital",
								"Roadmap de transformación",
								"Selección de tecnologías",
								"Gestión del cambio",
								"Training y capacitación",
								"Métricas y KPIs",
							],
						},
						{
							icon: "⚡",
							title: "Optimización de Procesos",
							description:
								"Automatizamos y optimizamos tus procesos de negocio.",
							features: [
								"Análisis de procesos",
								"Identificación de cuellos de botella",
								"Automatización con IA",
								"Integración de herramientas",
								"DevOps y CI/CD",
								"Monitorización y alertas",
							],
						},
						{
							icon: "👨‍💼",
							title: "CTO as a Service",
							description: "Un CTO senior a tu disposición sin contrato fijo.",
							features: [
								"Estrategia tecnológica",
								"Gestión de equipos técnicos",
								"Roadmap de producto",
								"Tech hiring",
								"Code reviews",
								"Budget planning",
							],
						},
					].map((service) => (
						<SolucionCard key={service.title}>
							<div className="text-5xl mb-4">{service.icon}</div>
							<h3 className="text-2xl font-bold mb-3">{service.title}</h3>
							<p className="text-muted-foreground mb-4">
								{service.description}
							</p>
							<ul className="space-y-2 text-sm">
								{service.features.map((feature) => (
									<li key={feature} className="flex items-start gap-2">
										<span className="text-primary font-bold">✓</span>
										<span>{feature}</span>
									</li>
								))}
							</ul>
						</SolucionCard>
					))}
				</div>
			</section>

			{/* Why Hire Us */}
			<section className="bg-gradient-to-br from-accent/5 to-primary/5 dark:from-accent/10 dark:to-primary/10 py-20">
				<div className="container mx-auto max-w-6xl px-4">
					<h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">
						Por Qué Confiar en Nosotros
					</h2>
					<p className="text-center text-muted-foreground mb-12 text-lg max-w-2xl mx-auto">
						Experiencia real en startups, scaleups y empresas consolidadas.
					</p>

					<div className="grid md:grid-cols-3 gap-8">
						{[
							{
								icon: "💡",
								title: "Experiencia Real",
								description:
									"Más de 10 años construyendo productos digitales desde cero hasta scale.",
							},
							{
								icon: "🎯",
								title: "Foco en Resultados",
								description:
									"No solo recomendamos, ejecutamos. Acompañamos la implementación.",
							},
							{
								icon: "🤝",
								title: "Partnership Real",
								description:
									"No somos consultores de PowerPoint. Nos ensuciamos las manos.",
							},
							{
								icon: "⚙️",
								title: "Tech Stack Moderno",
								description:
									"Trabajamos con tecnologías actuales, no legacy obsoleto.",
							},
							{
								icon: "📈",
								title: "Escalabilidad",
								description:
									"Diseñamos soluciones que crecen contigo, sin reescrituras.",
							},
							{
								icon: "💰",
								title: "ROI Medible",
								description:
									"Todas nuestras recomendaciones tienen métricas claras de éxito.",
							},
						].map((reason) => (
							<SolucionCard key={reason.title} hover={false}>
								<div className="text-4xl mb-3 text-center">{reason.icon}</div>
								<h3 className="text-xl font-bold mb-2 text-center">
									{reason.title}
								</h3>
								<p className="text-muted-foreground text-sm text-center">
									{reason.description}
								</p>
							</SolucionCard>
						))}
					</div>
				</div>
			</section>

			{/* How We Work */}
			<section className="container mx-auto max-w-6xl px-4 py-20">
				<h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
					Cómo Trabajamos
				</h2>

				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
					{[
						{
							num: "01",
							title: "Discovery",
							desc: "Entendemos tu negocio, stack actual, equipo y objetivos.",
						},
						{
							num: "02",
							title: "Diagnóstico",
							desc: "Auditoría completa e identificación de quick wins y mejoras estructurales.",
						},
						{
							num: "03",
							title: "Roadmap",
							desc: "Plan de acción priorizado con timelines y recursos necesarios.",
						},
						{
							num: "04",
							title: "Ejecución",
							desc: "Implementación con tu equipo o el nuestro. Soporte continuo.",
						},
					].map((step) => (
						<SolucionCard key={step.num}>
							<div className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
								{step.num}
							</div>
							<h3 className="text-xl font-bold mb-3">{step.title}</h3>
							<p className="text-muted-foreground text-sm">{step.desc}</p>
						</SolucionCard>
					))}
				</div>
			</section>

			{/* Use Cases */}
			<section className="bg-gradient-to-br from-secondary/5 to-accent/5 dark:from-secondary/10 dark:to-accent/10 py-20">
				<div className="container mx-auto max-w-6xl px-4">
					<h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
						Casos de Uso Típicos
					</h2>

					<div className="grid md:grid-cols-2 gap-8">
						{[
							{
								scenario: "Startup Pre-Seed/Seed",
								challenge: "Necesitas construir tu MVP rápido y escalable",
								solution:
									"Te ayudamos a definir el stack, arquitectura y priorizar features. Evitamos deuda técnica desde día 1.",
							},
							{
								scenario: "Scaleup Series A/B",
								challenge: "Tu stack actual no escala, necesitas refactorizar",
								solution:
									"Auditoría técnica, roadmap de migración y ejecución. Sin parar el negocio.",
							},
							{
								scenario: "Empresa Consolidada",
								challenge: "Legacy tech que frena innovación",
								solution:
									"Modernización gradual, integraciones y APIs. Transformación sin risk.",
							},
							{
								scenario: "Tech Team Building",
								challenge: "No sabes cómo estructurar tu equipo técnico",
								solution:
									"Hiring strategy, roles definition, procesos y tech culture.",
							},
						].map((useCase) => (
							<SolucionCard key={useCase.scenario}>
								<h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
									{useCase.scenario}
								</h3>
								<div className="mb-3">
									<span className="font-semibold text-sm text-muted-foreground">
										Reto:
									</span>{" "}
									<span className="text-sm">{useCase.challenge}</span>
								</div>
								<div>
									<span className="font-semibold text-sm text-primary">
										Solución:
									</span>{" "}
									<span className="text-sm">{useCase.solution}</span>
								</div>
							</SolucionCard>
						))}
					</div>
				</div>
			</section>

			{/* Pricing */}
			<section className="container mx-auto max-w-6xl px-4 py-20">
				<h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
					Modalidades de Trabajo
				</h2>

				<div className="grid md:grid-cols-3 gap-8">
					{[
						{
							title: "Proyecto Puntual",
							description: "Auditoría o consultoría específica",
							price: "€3.000 - €10.000",
							features: [
								"Alcance definido",
								"Entregable final (informe + roadmap)",
								"1-2 semanas de trabajo",
								"Ideal para diagnóstico",
							],
						},
						{
							title: "Retainer Mensual",
							description: "CTO as a Service",
							price: "€2.500 - €6.000/mes",
							features: [
								"Disponibilidad continuada",
								"Estrategia + ejecución",
								"Calls semanales",
								"Soporte técnico permanente",
							],
						},
						{
							title: "Equity Partnership",
							description: "Para startups early-stage",
							price: "Equity + cash",
							features: [
								"Skin in the game",
								"Compromiso a largo plazo",
								"Participación en producto",
								"Network y fundraising support",
							],
						},
					].map((option) => (
						<SolucionCard key={option.title}>
							<h3 className="text-2xl font-bold mb-2">{option.title}</h3>
							<p className="text-sm text-muted-foreground mb-4">
								{option.description}
							</p>
							<div className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
								{option.price}
							</div>
							<ul className="space-y-2 text-sm">
								{option.features.map((feature) => (
									<li key={feature} className="flex items-start gap-2">
										<span className="text-primary font-bold">✓</span>
										<span>{feature}</span>
									</li>
								))}
							</ul>
						</SolucionCard>
					))}
				</div>
			</section>

			{/* CTA */}
			<section className="relative overflow-hidden bg-gradient-webcode py-20 md:py-28">
				{/* Decoración de fondo con patrón */}
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.06),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.04),transparent_50%)]" />
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(188,227,229,0.12),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(188,227,229,0.08),transparent_50%)]" />

				<div className="container relative z-10 mx-auto max-w-4xl px-4 text-center">
					<h2 className="text-white mb-6 text-3xl font-display font-bold md:text-5xl lg:text-6xl dark:neon-cyan-title">
						¿Hablamos de tu Proyecto?
					</h2>
					<p className="mb-8 text-lg font-sans md:text-xl lg:text-2xl text-slate-600 dark:text-white/95">
						Primera consulta gratis. Sin compromiso. Solo value.
					</p>
					<Button
						asChild
						size="lg"
						variant="secondary"
						className={`
              font-bold text-base md:text-lg px-6 py-4 md:px-8 md:py-5
              hover:opacity-90 hover:-translate-y-0.5
              transition-all duration-200 
              ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
              border-0
            `}
						style={{
							backgroundColor: `rgb(var(--secondary-rgb))`,
							color: "rgb(8 11 12)",
							boxShadow: "var(--shadow-3d-sm)",
						}}
					>
						<Link href="/contacto">Agendar Consulta Gratis</Link>
					</Button>
				</div>
			</section>
		</div>
	);
}
