import { OptimizedSuspense } from "@/components/ui/OptimizedSuspense";
import { PerformanceTestLabWrapper } from "./PerformanceTestLabWrapper";

export const metadata = {
	title: "Performance Test Lab - WebCode",
	description:
		"Herramienta de análisis de rendimiento para componentes de tarjetas",
	robots: { index: false, follow: false }, // No indexar esta página de desarrollo
};

export default function PerformanceTestPage() {
	return (
		<main className="min-h-screen bg-background">
			<OptimizedSuspense size="lg" className="min-h-[200px]">
				<PerformanceTestLabWrapper />
			</OptimizedSuspense>
		</main>
	);
}
