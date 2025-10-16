"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Activity,
	AlertTriangle,
	BarChart3,
	CheckCircle,
	Clock,
	Cpu,
	MemoryStick,
	Monitor,
	Pause,
	Play,
	Rocket,
	RotateCcw,
	Target,
	TrendingDown,
	TrendingUp,
	Zap,
} from "@/lib/icons";

// Componentes UI simplificados para evitar dependencias
const Badge = ({
	children,
	variant = "default",
	className = "",
}: {
	children: React.ReactNode;
	variant?: string;
	className?: string;
}) => (
	<span
		className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
			variant === "success"
				? "bg-green-100 text-green-800"
				: variant === "warning"
					? "bg-yellow-100 text-yellow-800"
					: variant === "destructive"
						? "bg-red-100 text-red-800"
						: "bg-blue-100 text-blue-800"
		} ${className}`}
	>
		{children}
	</span>
);

const Progress = ({
	value = 0,
	max = 100,
	className = "",
}: {
	value?: number;
	max?: number;
	className?: string;
}) => {
	const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
	return (
		<div
			className={`relative h-2 w-full overflow-hidden rounded-full bg-gray-200 ${className}`}
		>
			<div
				className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
				style={{ width: `${percentage}%` }}
			/>
		</div>
	);
};

import { WSHover } from "@/components/animations/ws-hover";
import {
	useComponentPerformanceMonitor,
	usePerformanceMonitor,
} from "@/hooks/use-performance-monitor";

interface TestScenario {
	id: string;
	name: string;
	description: string;
	component: React.ComponentType;
}

// Versión original con animaciones complejas
const OriginalCard = React.memo(() => {
	const { logRender } = useComponentPerformanceMonitor("OriginalCard");
	const [cardState, setCardState] = useState({
		rotateX: 0,
		rotateY: 0,
		glareX: 50,
		glareY: 50,
		isHovered: false,
	});

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const rotateX = (y - rect.height / 2) / 25;
		const rotateY = (x - rect.width / 2) / 25;

		setCardState({
			rotateX,
			rotateY,
			glareX: (x / rect.width) * 100,
			glareY: (y / rect.height) * 100,
			isHovered: true,
		});
		logRender("mousemove update");
	};

	const handleMouseLeave = () => {
		setCardState({
			rotateX: 0,
			rotateY: 0,
			glareX: 50,
			glareY: 50,
			isHovered: false,
		});
		logRender("mouseleave reset");
	};

	const cardTransform = `perspective(1000px) rotateX(${cardState.rotateX}deg) rotateY(${cardState.rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
	const dynamicGradient = `radial-gradient(circle at ${cardState.glareX}% ${cardState.glareY}%, rgba(178, 62, 176, 0.15), transparent)`;

	return (
		<WSHover effect="lift">
			<article
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
				className="relative h-full group will-change-transform [transform-style:preserve-3d]"
				style={{ transform: cardTransform }}
			>
				<div className="absolute inset-0 rounded-xl bg-primary/5 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>

				<Card className="h-full bg-background/80 backdrop-blur-sm border-border/30 shadow-3d-sm group-hover:shadow-3d-md transition-all duration-700 overflow-hidden [transform-style:preserve-3d]">
					<div
						className="absolute inset-0 pointer-events-none transition-all duration-300"
						style={{ background: dynamicGradient }}
					></div>

					<CardContent className="p-6 text-center h-full flex flex-col relative z-10">
						<div className="flex justify-center mb-4 group-hover:scale-125 transition-transform duration-300">
							<Rocket className="h-8 w-8 text-primary" />
						</div>

						<h3 className="text-lg font-bold text-foreground mb-4 transition duration-300 transform-gpu group-hover:[transform:translateZ(50px)]">
							Tecnología 2025
						</h3>

						<ul className="space-y-2 text-sm text-muted-foreground mt-4 transition-all duration-300 group-hover:[transform:translateZ(20px)]">
							<li className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-teal-500 group-hover:[transform:translateZ(15px)_scale(1.05)] font-medium transition-all duration-300">
								Next.js 15 - App Router
							</li>
							<li className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-teal-500 group-hover:[transform:translateZ(15px)_scale(1.05)] font-medium transition-all duration-300">
								React 19 - Server Components
							</li>
						</ul>
					</CardContent>
				</Card>
			</article>
		</WSHover>
	);
});

// Versión optimizada sin animaciones costosas
const OptimizedCard = React.memo(() => {
	useComponentPerformanceMonitor("OptimizedCard");

	return (
		<Card className="h-full bg-background border-border/30 shadow-sm hover:shadow-md transition-shadow duration-200">
			<CardContent className="p-6 text-center h-full flex flex-col">
				<div className="flex justify-center mb-4">
					<Rocket className="h-8 w-8 text-primary" />
				</div>

				<h3 className="text-lg font-bold text-foreground mb-4">
					Tecnología 2025
				</h3>

				<ul className="space-y-2 text-sm text-muted-foreground mt-4">
					<li className="text-muted-foreground">Next.js 15 - App Router</li>
					<li className="text-muted-foreground">
						React 19 - Server Components
					</li>
				</ul>
			</CardContent>
		</Card>
	);
});

// Versión sin animaciones (control)
const StaticCard = React.memo(() => {
	useComponentPerformanceMonitor("StaticCard");

	return (
		<div className="h-full bg-white border border-gray-200 rounded-lg p-6 text-center">
			<div className="flex justify-center mb-4">
				<Rocket className="h-8 w-8 text-blue-600" />
			</div>

			<h3 className="text-lg font-bold text-gray-900 mb-4">Tecnología 2025</h3>

			<ul className="space-y-2 text-sm text-gray-600 mt-4">
				<li>Next.js 15 - App Router</li>
				<li>React 19 - Server Components</li>
			</ul>
		</div>
	);
});

OriginalCard.displayName = "OriginalCard";
OptimizedCard.displayName = "OptimizedCard";
StaticCard.displayName = "StaticCard";

// Nueva tarjeta optimizada para idle performance - LAYOUT IDÉNTICO AL ORIGINAL
const IdleOptimizedCard = React.memo(() => {
	const { logRender } = useComponentPerformanceMonitor("IdleOptimizedCard");
	const [cardState, setCardState] = useState({
		rotateX: 0,
		rotateY: 0,
		glareX: 50,
		glareY: 50,
		isHovered: false,
	});

	// Gradiente estático para idle - MISMO SISTEMA QUE PRODUCCIÓN
	const staticGradient =
		"radial-gradient(circle at 50% 50%, rgba(111, 137, 193, 0.1), transparent)";

	// Solo calcular gradiente dinámico durante hover - IDÉNTICO AL ORIGINAL
	const currentGradient = cardState.isHovered
		? `radial-gradient(circle at ${cardState.glareX}% ${cardState.glareY}%, rgba(178, 62, 176, 0.15), transparent)`
		: staticGradient;

	// Transform 3D solo durante hover - OPTIMIZACIÓN CLAVE
	const cardTransform = cardState.isHovered
		? `perspective(1000px) rotateX(${cardState.rotateX * 0.5}deg) rotateY(${
				cardState.rotateY * 0.5
			}deg) scale3d(1.01, 1.01, 1.01) translateZ(30px)`
		: "none"; // NO transforms en idle = NO GPU layers

	// Throttled mouse move (60fps max) - OPTIMIZACIÓN CLAVE
	const lastMoveTime = React.useRef(0);
	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const now = performance.now();
		if (now - lastMoveTime.current < 16) return; // Throttle to 60fps
		lastMoveTime.current = now;

		const rect = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;
		const rotateX = (centerY - y) / 25;
		const rotateY = (x - centerX) / 25;

		setCardState({
			rotateX,
			rotateY,
			glareX: (x / rect.width) * 100,
			glareY: (y / rect.height) * 100,
			isHovered: true,
		});
		logRender("throttled mousemove update");
	};

	const handleMouseEnter = () => {
		setCardState((prev) => ({ ...prev, isHovered: true }));
		logRender("mouseenter - activate GPU layers");
	};

	const handleMouseLeave = () => {
		setCardState({
			rotateX: 0,
			rotateY: 0,
			glareX: 50,
			glareY: 50,
			isHovered: false,
		});
		logRender("mouseleave - deactivate GPU layers");
	};

	const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
		if (e.touches.length === 0) return;

		const now = performance.now();
		if (now - lastMoveTime.current < 16) return; // Throttle to 60fps
		lastMoveTime.current = now;

		const rect = e.currentTarget.getBoundingClientRect();
		const touch = e.touches[0];
		const x = touch.clientX - rect.left;
		const y = touch.clientY - rect.top;
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;
		const rotateX = (centerY - y) / 25;
		const rotateY = (x - centerX) / 25;

		setCardState({
			rotateX,
			rotateY,
			glareX: (x / rect.width) * 100,
			glareY: (y / rect.height) * 100,
			isHovered: true,
		});
	};

	const handleTouchEnd = () => {
		setCardState({
			rotateX: 0,
			rotateY: 0,
			glareX: 50,
			glareY: 50,
			isHovered: false,
		});
	};

	return (
		<WSHover effect="lift">
			<article
				onMouseEnter={handleMouseEnter}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
				className={`
        relative h-full group transition-transform duration-200 ease-out
        ${
					cardState.isHovered
						? // Solo durante hover: activar GPU layers y 3D context - IGUAL QUE ORIGINAL
							"will-change-transform [transform-style:preserve-3d]"
						: // En idle: NO GPU layers, NO 3D context - OPTIMIZACIÓN CLAVE
							""
				}
      `}
				style={{ transform: cardTransform }}
			>
				{/* Efecto de brillo tenue rosa detrás de la tarjeta al hacer hover - IGUAL QUE ORIGINAL */}
				<div className="absolute inset-0 rounded-xl bg-primary/5 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>

				<Card className="h-full bg-background/80 backdrop-blur-sm border-border/30 shadow-3d-sm group-hover:shadow-3d-md transition-all duration-700 relative z-0 overflow-hidden [transform-style:preserve-3d]">
					{/* Elemento para el efecto de brillo - IGUAL QUE ORIGINAL */}
					<div
						className="absolute inset-0 pointer-events-none transition-all duration-300"
						style={{ background: currentGradient }}
					></div>

					<CardContent className="p-6 text-center h-full flex flex-col relative z-10">
						{/* Icono - IGUAL QUE ORIGINAL */}
						<div className="flex justify-center mb-4 group-hover:scale-125 transition-transform duration-300">
							<Rocket className="h-8 w-8 text-primary" />
						</div>

						{/* Título - IGUAL QUE ORIGINAL */}
						<h3 className="text-lg font-bold text-foreground mb-4 transition duration-300 transform-gpu group-hover:[transform:translateZ(50px)]">
							Tecnología 2025
						</h3>

						{/* Lista de características - IGUAL QUE ORIGINAL pero con contenido optimizado */}
						<ul className="space-y-2 text-sm text-muted-foreground mt-4 transition-all duration-300 group-hover:[transform:translateZ(20px)]">
							<li className="flex items-center justify-center text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-teal-500 group-hover:[transform:translateZ(15px)_scale(1.05)] font-medium transition-all duration-300">
								Next.js 15 - App Router
							</li>
							<li className="flex items-center justify-center text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-teal-500 group-hover:[transform:translateZ(15px)_scale(1.05)] font-medium transition-all duration-300">
								React 19 - Server Components
							</li>
							<li className="flex items-center justify-center text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-teal-500 group-hover:[transform:translateZ(15px)_scale(1.05)] font-medium transition-all duration-300">
								🎯 Idle Performance Optimized
							</li>
							<li className="flex items-center justify-center text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-teal-500 group-hover:[transform:translateZ(15px)_scale(1.05)] font-medium transition-all duration-300">
								⚡ GPU Layers Condicionales
							</li>
						</ul>
					</CardContent>
				</Card>
			</article>
		</WSHover>
	);
});

IdleOptimizedCard.displayName = "IdleOptimizedCard";

const testScenarios: TestScenario[] = [
	{
		id: "original",
		name: "Tarjetas Originales",
		description: "Con todas las animaciones y efectos 3D actuales",
		component: OriginalCard,
	},
	{
		id: "optimized",
		name: "Tarjetas Optimizadas",
		description: "Con animaciones simplificadas, solo shadow hover",
		component: OptimizedCard,
	},
	{
		id: "static",
		name: "Tarjetas Estáticas",
		description: "Sin animaciones, solo CSS básico",
		component: StaticCard,
	},
	{
		id: "idle-optimized",
		name: "🎯 Idle Performance Optimized",
		description:
			"GPU layers solo cuando necesario, throttled events, gradientes estáticos",
		component: IdleOptimizedCard,
	},
];

export function PerformanceTestLab() {
	const { performanceData, isIdle, getPerformanceSummary } =
		usePerformanceMonitor({
			enabled: true,
			logToConsole: false, // UI más limpia
		});

	const [activeScenario, setActiveScenario] = useState("original");
	const [perfHistory, setPerfHistory] = useState<
		Array<{
			scenario: string;
			data: Record<string, unknown>;
			timestamp: number;
		}>
	>([]);
	const [isRecording, setIsRecording] = useState(false);
	const [testResults, setTestResults] = useState<Record<string, unknown>>({});
	const [startTime, setStartTime] = useState<number>(Date.now());

	// Funciones de validación para evitar NaN en el render
	const safeNumber = useCallback(
		(value: number | undefined | null, fallback: number = 0): number => {
			return typeof value === "number" &&
				!Number.isNaN(value) &&
				Number.isFinite(value)
				? value
				: fallback;
		},
		[],
	);

	const formatMetric = (
		value: number | undefined | null,
		fallback: string = "--",
	): string => {
		const safe = safeNumber(value);
		return safe === 0 && (value === undefined || value === null)
			? fallback
			: safe.toString();
	};

	// Métricas avanzadas con validación
	const avgFPS =
		perfHistory.length > 0
			? Math.round(
					perfHistory
						.slice(-10)
						.reduce(
							(acc, entry) =>
								acc +
								safeNumber(
									(entry.data as Record<string, unknown>).fps as number,
								),
							0,
						) / Math.min(perfHistory.length, 10),
				)
			: 0;

	const memoryTrend =
		perfHistory.length > 1
			? safeNumber(
					(perfHistory[perfHistory.length - 1].data as Record<string, unknown>)
						.memory as number,
				) -
				safeNumber(
					(perfHistory[perfHistory.length - 2].data as Record<string, unknown>)
						.memory as number,
				)
			: 0;

	const testDuration = Math.round((Date.now() - startTime) / 1000);

	useEffect(() => {
		const summary = getPerformanceSummary();
		setPerfHistory((prev) => [
			...prev.slice(-100), // Más datos para gráficos
			{
				scenario: activeScenario,
				data: summary,
				timestamp: Date.now(),
			},
		]);

		// Actualizar resultados si está grabando
		if (isRecording) {
			setTestResults((prev) => ({
				...prev,
				[activeScenario]: {
					...(prev[activeScenario] || {}),
					avgFPS: safeNumber(avgFPS) || safeNumber(summary.fps),
					minFPS: Math.min(
						safeNumber(
							(prev[activeScenario] as Record<string, unknown>)
								?.minFPS as number,
							60,
						),
						safeNumber(summary.fps),
					),
					maxFPS: Math.max(
						safeNumber(
							(prev[activeScenario] as Record<string, unknown>)
								?.maxFPS as number,
							0,
						),
						safeNumber(summary.fps),
					),
					avgMemory: safeNumber(performanceData.memory),
					samples:
						(((prev[activeScenario] as Record<string, unknown>)
							?.samples as number) || 0) + 1,
					idleTime: isIdle
						? (((prev[activeScenario] as Record<string, unknown>)
								?.idleTime as number) || 0) + 1
						: ((prev[activeScenario] as Record<string, unknown>)
								?.idleTime as number) || 0,
				},
			}));
		}
	}, [
		performanceData,
		activeScenario,
		isRecording,
		avgFPS,
		isIdle,
		getPerformanceSummary,
		safeNumber,
	]);

	const ActiveComponent =
		testScenarios.find((s) => s.id === activeScenario)?.component ||
		OriginalCard;

	const getPerformanceStatus = (fps: number) => {
		if (fps >= 58)
			return { status: "Excelente", color: "success", icon: CheckCircle };
		if (fps >= 45)
			return { status: "Bueno", color: "warning", icon: AlertTriangle };
		return { status: "Deficiente", color: "destructive", icon: AlertTriangle };
	};

	const currentStatus = getPerformanceStatus(safeNumber(performanceData.fps));
	const StatusIcon = currentStatus.icon;

	const startRecording = () => {
		setIsRecording(true);
		setStartTime(Date.now());
		setTestResults({});
	};

	const stopRecording = () => {
		setIsRecording(false);
	};

	const resetTests = () => {
		setPerfHistory([]);
		setTestResults({});
		setStartTime(Date.now());
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
			<div className="max-w-7xl mx-auto space-y-6">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					className="text-center space-y-4 py-8"
				>
					<div className="flex items-center justify-center gap-3">
						<Activity className="h-8 w-8 text-primary" />
						<h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
							Performance Lab WebCode
						</h1>
					</div>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Análisis avanzado de rendimiento en tiempo real para componentes
						React
					</p>

					{/* Control Panel */}
					<div className="flex items-center justify-center gap-4 mt-6">
						<Button
							onClick={isRecording ? stopRecording : startRecording}
							variant={isRecording ? "destructive" : "default"}
							size="lg"
							className="gap-2"
							data-testid={isRecording ? "stop-recording" : "start-recording"}
						>
							{isRecording ? (
								<Pause className="h-4 w-4" />
							) : (
								<Play className="h-4 w-4" />
							)}
							{isRecording ? "Detener Grabación" : "Iniciar Grabación"}
						</Button>
						<Button
							onClick={resetTests}
							variant="outline"
							size="lg"
							className="gap-2"
						>
							<RotateCcw className="h-4 w-4" />
							Reset
						</Button>
						<Badge
							variant={isRecording ? "success" : "secondary"}
							className="px-3 py-1"
						>
							<Clock className="h-3 w-3 mr-1" />
							{testDuration}s
						</Badge>
					</div>
				</motion.div>

				{/* Dashboard Principal */}
				<div
					className="grid grid-cols-1 lg:grid-cols-4 gap-6"
					data-testid="performance-metrics"
				>
					{/* Métricas Principales */}
					<div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
						<Card className="relative overflow-hidden">
							<CardHeader className="pb-2">
								<CardTitle className="text-sm font-medium flex items-center gap-2">
									<Monitor className="h-4 w-4" />
									FPS en Tiempo Real
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="flex items-center gap-3">
									<div
										className={`text-3xl font-bold ${
											isIdle ? "text-green-600" : "text-orange-600"
										}`}
										data-testid="fps-value"
									>
										{formatMetric(performanceData.fps)}
									</div>
									<div className="flex flex-col">
										<Badge variant={currentStatus.color} className="gap-1 mb-1">
											<StatusIcon className="h-3 w-3" />
											{currentStatus.status}
										</Badge>
										<span
											className="text-xs text-muted-foreground"
											data-testid="state-indicator"
										>
											{isIdle ? "🟢 REPOSO" : "🟡 ACTIVO"}
										</span>
									</div>
								</div>
								<Progress
									value={Math.min(safeNumber(performanceData.fps), 60)}
									max={60}
									className="mt-3"
								/>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-sm font-medium flex items-center gap-2">
									<MemoryStick className="h-4 w-4" />
									Memoria JS
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="flex items-center gap-3">
									<div
										className="text-3xl font-bold text-blue-600"
										data-testid="memory-value"
									>
										{formatMetric(performanceData.memory)}
									</div>
									<div className="flex flex-col">
										<span className="text-sm text-muted-foreground">MB</span>
										<div className="flex items-center gap-1 text-xs">
											{memoryTrend > 0 ? (
												<TrendingUp className="h-3 w-3 text-red-500" />
											) : memoryTrend < 0 ? (
												<TrendingDown className="h-3 w-3 text-green-500" />
											) : null}
											<span
												className={
													memoryTrend > 0
														? "text-red-500"
														: memoryTrend < 0
															? "text-green-500"
															: ""
												}
											>
												{memoryTrend > 0
													? `+${formatMetric(memoryTrend)}`
													: formatMetric(memoryTrend)}
											</span>
										</div>
									</div>
								</div>
								<Progress
									value={Math.min(safeNumber(performanceData.memory), 100)}
									max={100}
									className="mt-3"
								/>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-sm font-medium flex items-center gap-2">
									<Cpu className="h-4 w-4" />
									Re-renders
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div
									className="text-3xl font-bold text-purple-600"
									data-testid="render-count"
								>
									{formatMetric(performanceData.renderCount)}
								</div>
								<div className="text-xs text-muted-foreground mt-1">
									Promedio FPS: {formatMetric(avgFPS)}
								</div>
								<Progress
									value={Math.min(safeNumber(performanceData.renderCount), 50)}
									max={50}
									className="mt-3"
								/>
							</CardContent>
						</Card>
					</div>

					{/* Panel de Estado */}
					<Card className="lg:col-span-1">
						<CardHeader>
							<CardTitle className="text-sm font-medium flex items-center gap-2">
								<BarChart3 className="h-4 w-4" />
								Estado del Sistema
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<div className="flex justify-between text-xs">
									<span>Escenario Activo</span>
									<Badge
										variant="outline"
										className="text-xs"
										data-testid="active-scenario"
									>
										{testScenarios.find((s) => s.id === activeScenario)?.name}
									</Badge>
								</div>
								<div className="flex justify-between text-xs">
									<span>Muestras</span>
									<span className="font-mono">{perfHistory.length}</span>
								</div>
								<div className="flex justify-between text-xs">
									<span>Tiempo Idle</span>
									<span
										className={`font-mono ${
											isIdle ? "text-green-600" : "text-orange-600"
										}`}
									>
										{isIdle ? "✓" : "✗"}
									</span>
								</div>
							</div>

							{Object.keys(testResults).length > 0 && (
								<div className="border-t pt-4">
									<h4 className="text-xs font-semibold mb-2">
										Resultados de Prueba
									</h4>
									{Object.entries(testResults).map(([scenario, data]) => {
										const typedData = data as Record<string, unknown>;
										return (
											<div key={scenario} className="text-xs space-y-1 mb-3">
												<div className="font-medium">{scenario}</div>
												<div className="flex justify-between">
													<span>FPS Prom:</span>
													<span className="font-mono">
														{formatMetric(typedData.avgFPS as number)}
													</span>
												</div>
												<div className="flex justify-between">
													<span>FPS Min:</span>
													<span className="font-mono">
														{formatMetric(typedData.minFPS as number)}
													</span>
												</div>
											</div>
										);
									})}
								</div>
							)}
						</CardContent>
					</Card>
				</div>

				{/* Selector de Escenarios */}
				<Card className="col-span-full">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Target className="h-5 w-5" />
							Escenarios de Prueba
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							{testScenarios.map((scenario) => (
								<motion.button
									key={scenario.id}
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									onClick={() => setActiveScenario(scenario.id)}
									className={`p-4 rounded-lg border-2 text-left transition-all ${
										activeScenario === scenario.id
											? "border-primary bg-primary/5"
											: "border-border hover:border-primary/50"
									}`}
									data-testid={`scenario-${scenario.id}`}
								>
									<h3 className="font-semibold text-sm">{scenario.name}</h3>
									<p className="text-xs text-muted-foreground mt-1">
										{scenario.description}
									</p>
									{activeScenario === scenario.id && (
										<Badge variant="default" className="mt-2 text-xs">
											Activo
										</Badge>
									)}
								</motion.button>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Grid de Prueba */}
				<Card className="col-span-full">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Zap className="h-5 w-5" />
							Prueba Activa:{" "}
							{testScenarios.find((s) => s.id === activeScenario)?.name}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							{[1, 2, 3, 4].map((index) => (
								<motion.div
									key={`${activeScenario}-${index}`}
									className="h-64"
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: index * 0.1 }}
									data-testid={`test-card-${index}`}
								>
									<ActiveComponent />
								</motion.div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Análisis en Tiempo Real */}
				<div className="col-span-full grid grid-cols-1 lg:grid-cols-2 gap-6">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<BarChart3 className="h-5 w-5" />
								Historial de Rendimiento
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="max-h-64 overflow-y-auto space-y-2">
								<AnimatePresence>
									{perfHistory
										.slice(-8)
										.reverse()
										.map((entry, _index) => (
											<motion.div
												key={entry.timestamp}
												initial={{ opacity: 0, x: -20 }}
												animate={{ opacity: 1, x: 0 }}
												exit={{ opacity: 0, x: 20 }}
												className="text-xs p-3 bg-muted/50 rounded-lg font-mono"
											>
												<div className="flex justify-between items-center">
													<span className="font-semibold">
														[
														{
															(entry.data as Record<string, unknown>)
																.timestamp as number
														}
														]
													</span>
													<Badge
														variant={
															(entry.data as Record<string, unknown>).state ===
															"REPOSO"
																? "success"
																: "warning"
														}
														className="text-xs"
													>
														{
															(entry.data as Record<string, unknown>)
																.state as string
														}
													</Badge>
												</div>
												<div className="flex justify-between mt-1 text-muted-foreground">
													<span>{entry.scenario}</span>
													<span>
														{formatMetric(
															(entry.data as Record<string, unknown>)
																.fps as number,
														)}{" "}
														FPS •{" "}
														{
															(entry.data as Record<string, unknown>)
																.memory as number
														}
													</span>
												</div>
											</motion.div>
										))}
								</AnimatePresence>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<AlertTriangle className="h-5 w-5" />
								Guía de Análisis
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4 text-sm">
								<div className="p-3 bg-green-50 rounded-lg border border-green-200">
									<h4 className="font-semibold text-green-800 mb-2">
										✅ Indicadores Positivos
									</h4>
									<ul className="text-green-700 space-y-1 text-xs">
										<li>• FPS estables en 60 durante reposo</li>
										<li>• Memoria sin incrementos constantes</li>
										<li>• Re-renders solo durante interacciones</li>
									</ul>
								</div>

								<div className="p-3 bg-red-50 rounded-lg border border-red-200">
									<h4 className="font-semibold text-red-800 mb-2">
										🚨 Señales de Alerta
									</h4>
									<ul className="text-red-700 space-y-1 text-xs">
										<li>• FPS &lt; 58 sin interacción del usuario</li>
										<li>• Memoria que crece constantemente</li>
										<li>• Estado &quot;ACTIVO&quot; sin hover real</li>
									</ul>
								</div>

								<div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
									<h4 className="font-semibold text-blue-800 mb-2">
										📊 Cómo Interpretar
									</h4>
									<ul className="text-blue-700 space-y-1 text-xs">
										<li>
											• Compara &quot;Original&quot; vs &quot;Optimizada&quot;
										</li>
										<li>• Usa &quot;Estática&quot; como referencia base</li>
										<li>• Graba por 30s mínimo por escenario</li>
									</ul>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
