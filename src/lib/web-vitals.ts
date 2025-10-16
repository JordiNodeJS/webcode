import { type Metric, onCLS, onFCP, onFID, onLCP, onTTFB } from "web-vitals";

/**
 * Reporta las métricas Web Vitals a la consola
 *
 * @param metric - La métrica Web Vitals
 */
const reportWebVitals = (metric: Metric) => {
	console.log(metric);
};

/**
 * Inicializa el monitoreo de Web Vitals
 */
export const initWebVitals = () => {
	if (typeof window !== "undefined") {
		onCLS(reportWebVitals);
		onFID(reportWebVitals);
		onFCP(reportWebVitals);
		onLCP(reportWebVitals);
		onTTFB(reportWebVitals);
	}
};

export default reportWebVitals;
