"use client";

/**
 * Página de Error del Blog
 * Muestra errores de configuración de Notion de manera amigable
 */

import { AlertCircle, ArrowLeft, Database, Key } from "lucide-react";
import Link from "next/link";

interface BlogErrorPageProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function BlogError({ error, reset }: BlogErrorPageProps) {
	const isNotionPermissionError =
		error.message.includes("no está compartida") ||
		error.message.includes("not shared");

	const isAuthError =
		error.message.includes("API Key") || error.message.includes("unauthorized");

	return (
		<div className="container mx-auto px-4 py-16">
			<div className="mx-auto max-w-2xl">
				{/* Header */}
				<div className="mb-8 text-center">
					<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
						<AlertCircle className="h-8 w-8 text-destructive" />
					</div>
					<h1 className="mb-2 text-3xl font-bold">Error al cargar el blog</h1>
					<p className="text-muted-foreground">
						Hubo un problema al conectar con Notion
					</p>
				</div>

				{/* Error específico */}
				<div className="mb-8 rounded-lg border border-destructive/20 bg-destructive/5 p-6">
					{isNotionPermissionError && (
						<>
							<div className="mb-4 flex items-start gap-3">
								<Database className="mt-1 h-5 w-5 text-destructive" />
								<div>
									<h2 className="mb-2 font-semibold text-destructive">
										Base de datos no compartida
									</h2>
									<p className="text-sm text-muted-foreground">
										La base de datos de Notion no está compartida con la
										integración. Esto impide que el blog pueda acceder a los
										artículos.
									</p>
								</div>
							</div>

							<div className="mt-4 rounded-md bg-background p-4">
								<h3 className="mb-2 text-sm font-semibold">
									Cómo solucionarlo:
								</h3>
								<ol className="space-y-2 text-sm text-muted-foreground">
									<li className="flex gap-2">
										<span className="font-semibold">1.</span>
										<span>
											Abre tu base de datos &quot;WebCode Blog&quot; en Notion
										</span>
									</li>
									<li className="flex gap-2">
										<span className="font-semibold">2.</span>
										<span>
											Click en los tres puntos (...) en la esquina superior
											derecha
										</span>
									</li>
									<li className="flex gap-2">
										<span className="font-semibold">3.</span>
										<span>
											Selecciona &quot;Add connections&quot; o &quot;Conectar
											a&quot;
										</span>
									</li>
									<li className="flex gap-2">
										<span className="font-semibold">4.</span>
										<span>Busca y añade tu integración de Notion</span>
									</li>
									<li className="flex gap-2">
										<span className="font-semibold">5.</span>
										<span>Confirma los permisos de lectura</span>
									</li>
								</ol>
							</div>
						</>
					)}

					{isAuthError && (
						<>
							<div className="mb-4 flex items-start gap-3">
								<Key className="mt-1 h-5 w-5 text-destructive" />
								<div>
									<h2 className="mb-2 font-semibold text-destructive">
										API Key inválida
									</h2>
									<p className="text-sm text-muted-foreground">
										La API Key de Notion es inválida o ha expirado.
									</p>
								</div>
							</div>

							<div className="mt-4 rounded-md bg-background p-4">
								<h3 className="mb-2 text-sm font-semibold">
									Cómo solucionarlo:
								</h3>
								<ol className="space-y-2 text-sm text-muted-foreground">
									<li className="flex gap-2">
										<span className="font-semibold">1.</span>
										<span>
											Ve a{" "}
											<a
												href="https://www.notion.so/my-integrations"
												target="_blank"
												rel="noopener noreferrer"
												className="text-primary underline"
											>
												notion.so/my-integrations
											</a>
										</span>
									</li>
									<li className="flex gap-2">
										<span className="font-semibold">2.</span>
										<span>Selecciona tu integración</span>
									</li>
									<li className="flex gap-2">
										<span className="font-semibold">3.</span>
										<span>
											Regenera el &quot;Internal Integration Token&quot;
										</span>
									</li>
									<li className="flex gap-2">
										<span className="font-semibold">4.</span>
										<span>Actualiza NOTION_API_KEY en .env.local</span>
									</li>
									<li className="flex gap-2">
										<span className="font-semibold">5.</span>
										<span>Reinicia el servidor de desarrollo</span>
									</li>
								</ol>
							</div>
						</>
					)}

					{!isNotionPermissionError && !isAuthError && (
						<>
							<h2 className="mb-2 font-semibold text-destructive">
								Error general
							</h2>
							<p className="mb-4 text-sm text-muted-foreground">
								{error.message}
							</p>
							{error.digest && (
								<p className="text-xs text-muted-foreground">
									Código de error: {error.digest}
								</p>
							)}
						</>
					)}
				</div>

				{/* Acciones */}
				<div className="flex flex-col gap-4 sm:flex-row">
					<button
						type="button"
						onClick={reset}
						className="flex-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
					>
						Reintentar
					</button>
					<Link
						href="/"
						className="flex flex-1 items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent"
					>
						<ArrowLeft className="h-4 w-4" />
						Volver al inicio
					</Link>
				</div>

				{/* Ayuda adicional */}
				<div className="mt-8 rounded-lg border bg-muted/50 p-6">
					<h3 className="mb-3 font-semibold">¿Necesitas más ayuda?</h3>
					<ul className="space-y-2 text-sm text-muted-foreground">
						<li>
							📚{" "}
							<Link
								href="/docs/NOTION-INTEGRATION-SETUP-GUIDE.md"
								className="text-primary underline"
							>
								Guía completa de configuración
							</Link>
						</li>
						<li>
							🔧 Ejecuta{" "}
							<code className="rounded bg-muted px-1.5 py-0.5">
								pnpm notion:verify
							</code>{" "}
							para diagnosticar el problema
						</li>
						<li>
							📖{" "}
							<a
								href="https://developers.notion.com/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-primary underline"
							>
								Documentación de Notion API
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
