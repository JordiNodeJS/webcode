"use client";

import { useCallback, useEffect, useState } from "react";

interface BotProtectionConfig {
	honeypotFieldName?: string;
	timeThreshold?: number; // Tiempo mínimo para completar formulario
	maxSubmissions?: number; // Máximo de envíos por IP
	cooldownPeriod?: number; // Tiempo de espera entre envíos
}

interface BotDetectionResult {
	isBot: boolean;
	reasons: string[];
	score: number; // 0-100, donde 100 es definitivamente un bot
}

/**
 * Hook para protección contra bots en formularios
 */
export function useBotProtection(config: BotProtectionConfig = {}) {
	const {
		honeypotFieldName = "website",
		timeThreshold = 3000, // 3 segundos mínimo
		maxSubmissions = 5,
		cooldownPeriod = 60000, // 1 minuto
	} = config;

	const [formStartTime, setFormStartTime] = useState<number>(0);
	const [honeypotValue, setHoneypotValue] = useState<string>("");
	const [submissionCount, setSubmissionCount] = useState<number>(0);
	const [lastSubmission, setLastSubmission] = useState<number>(0);
	const [isBlocked, setIsBlocked] = useState<boolean>(false);

	// Inicializar tiempo de inicio del formulario
	useEffect(() => {
		setFormStartTime(Date.now());
	}, []);

	// Verificar si el usuario está bloqueado
	useEffect(() => {
		if (lastSubmission > 0) {
			const timeSinceLastSubmission = Date.now() - lastSubmission;
			if (timeSinceLastSubmission < cooldownPeriod) {
				setIsBlocked(true);
				const remainingTime = cooldownPeriod - timeSinceLastSubmission;
				setTimeout(() => setIsBlocked(false), remainingTime);
			}
		}
	}, [lastSubmission, cooldownPeriod]);

	// Detectar comportamiento de bot
	const detectBot = useCallback((): BotDetectionResult => {
		const reasons: string[] = [];
		let score = 0;

		// Verificar honeypot
		if (honeypotValue.trim() !== "") {
			reasons.push("Honeypot field filled");
			score += 50;
		}

		// Verificar tiempo de completado
		const formCompletionTime = Date.now() - formStartTime;
		if (formCompletionTime < timeThreshold) {
			reasons.push(`Form completed too quickly (${formCompletionTime}ms)`);
			score += 30;
		}

		// Verificar número de envíos
		if (submissionCount >= maxSubmissions) {
			reasons.push(`Too many submissions (${submissionCount})`);
			score += 40;
		}

		// Verificar si está bloqueado
		if (isBlocked) {
			reasons.push("User is in cooldown period");
			score += 60;
		}

		// Verificar patrones sospechosos en el navegador
		if (typeof window !== "undefined") {
			// Verificar si es un navegador real
			const userAgent = navigator.userAgent;
			if (!userAgent || userAgent.length < 10) {
				reasons.push("Suspicious user agent");
				score += 20;
			}

			// Verificar plugins
			if (navigator.plugins.length === 0) {
				reasons.push("No browser plugins detected");
				score += 10;
			}

			// Verificar resolución de pantalla
			if (screen.width < 200 || screen.height < 200) {
				reasons.push("Suspicious screen resolution");
				score += 15;
			}
		}

		return {
			isBot: score >= 50,
			reasons,
			score,
		};
	}, [
		honeypotValue,
		formStartTime,
		timeThreshold,
		submissionCount,
		maxSubmissions,
		isBlocked,
	]);

	// Registrar envío
	const recordSubmission = useCallback(() => {
		setSubmissionCount((prev) => prev + 1);
		setLastSubmission(Date.now());
	}, []);

	// Resetear contador (para testing o reset manual)
	const resetProtection = useCallback(() => {
		setSubmissionCount(0);
		setLastSubmission(0);
		setIsBlocked(false);
		setFormStartTime(Date.now());
	}, []);

	return {
		honeypotFieldName,
		honeypotValue,
		setHoneypotValue,
		detectBot,
		recordSubmission,
		resetProtection,
		isBlocked,
		submissionCount,
		remainingCooldown: isBlocked
			? Math.max(0, cooldownPeriod - (Date.now() - lastSubmission))
			: 0,
	};
}

/**
 * Hook para rate limiting simple
 */
export function useRateLimit(
	maxRequests: number = 10,
	windowMs: number = 60000,
) {
	const [requests, setRequests] = useState<number[]>([]);

	const isAllowed = useCallback(() => {
		const now = Date.now();
		const windowStart = now - windowMs;

		// Filtrar requests dentro de la ventana de tiempo
		const recentRequests = requests.filter(
			(timestamp) => timestamp > windowStart,
		);

		if (recentRequests.length >= maxRequests) {
			return false;
		}

		// Agregar nueva request
		setRequests([...recentRequests, now]);
		return true;
	}, [requests, maxRequests, windowMs]);

	const reset = useCallback(() => {
		setRequests([]);
	}, []);

	return {
		isAllowed,
		reset,
		currentCount: requests.length,
		remainingRequests: Math.max(0, maxRequests - requests.length),
	};
}

/**
 * Hook para validación de formulario anti-bot
 */
export function useFormBotValidation() {
	const [formData, setFormData] = useState<
		Record<string, string | boolean | string[]>
	>({});
	const [validationErrors, setValidationErrors] = useState<string[]>([]);

	const validateForm = useCallback(
		(data: Record<string, string | boolean | string[]>) => {
			const errors: string[] = [];

			// Verificar campos vacíos sospechosos
			const requiredFields = ["email", "message", "subject"];
			requiredFields.forEach((field) => {
				const value = data[field];
				if (!value || (typeof value === "string" && value.trim() === "")) {
					errors.push(`Field ${field} is required`);
				}
			});

			// Verificar longitud mínima de mensaje
			const message = data.message;
			if (message && typeof message === "string" && message.length < 10) {
				errors.push("Message too short");
			}

			// Verificar patrones de spam en el mensaje
			const spamPatterns = [
				/viagra/i,
				/casino/i,
				/loan/i,
				/bitcoin/i,
				/crypto/i,
				/free money/i,
				/click here/i,
				/urgent/i,
			];

			const messageValue = data.message;
			if (messageValue && typeof messageValue === "string") {
				const hasSpamPattern = spamPatterns.some((pattern) =>
					pattern.test(messageValue),
				);
				if (hasSpamPattern) {
					errors.push("Message contains suspicious content");
				}
			}

			// Verificar email válido
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			const emailValue = data.email;
			if (
				emailValue &&
				typeof emailValue === "string" &&
				!emailRegex.test(emailValue)
			) {
				errors.push("Invalid email format");
			}

			setValidationErrors(errors);
			return errors.length === 0;
		},
		[],
	);

	return {
		formData,
		setFormData,
		validationErrors,
		validateForm,
	};
}
