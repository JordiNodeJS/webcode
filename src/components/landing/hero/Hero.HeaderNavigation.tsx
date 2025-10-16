"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Link } from "next-view-transitions";
import { useEffect, useRef, useState } from "react";
import { WSFadeIn } from "@/components/animations/ws-fade-in";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import useScrollPosition from "@/hooks/use-scroll-position";
import { Menu } from "@/lib/icons";
import { ThemeToggle } from "./Hero.ThemeToggle";

interface NavigationItem {
	href: string;
	label: string;
}

const navigationItems: NavigationItem[] = [
	{ href: "/soluciones", label: "Soluciones" },
	{ href: "/proceso", label: "Proceso" },
	{ href: "/blog", label: "Blog" },
	{ href: "https://jordinodejs.github.io/", label: "Portfolio" },
	{ href: "/faqs", label: "FAQ" },
	{ href: "/contacto", label: "Contacto" },
];

const languages = [
	{ code: "es", label: "ES" },
	{ code: "ca", label: "CA" },
	{ code: "en", label: "EN" },
];

/**
 * Navegación principal del header
 *
 * Componente Client Component para manejar la interactividad del menú móvil
 * y el selector de idiomas. Usa el sistema de colores WebCode.
 *
 * Optimizado usando React hooks estándar y Tailwind CSS.
 */
export function HeaderNavigation() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [currentLanguage, setCurrentLanguage] = useState("es");
	const scrollPosition = useScrollPosition();
	const pathname = usePathname();
	const router = useRouter();
	const isScrolled = scrollPosition.y > 10;

	// Active navigation tracking (page or section)
	const [activeHref, setActiveHref] = useState<string | null>(null);
	const observerRef = useRef<IntersectionObserver | null>(null);

	// Update active link when pathname changes (handles page links like '/contacto')
	useEffect(() => {
		// Prefer exact path matches for non-hash, non-external links
		const pathMatch = navigationItems.find((it) => {
			if (it.href.startsWith("#") || it.href.startsWith("http")) return false;
			// treat root hrefs and simple startsWith for subroutes
			return pathname === it.href || pathname.startsWith(`${it.href}/`);
		});

		if (pathMatch) {
			setActiveHref(pathMatch.href);
			return;
		}

		// If no path match, fallback to hash (if present)
		if (typeof window !== "undefined") {
			setActiveHref(window.location.hash || null);
		}
	}, [pathname]);

	// Scroll-spy for hash sections when on the root path
	useEffect(() => {
		if (typeof window === "undefined") return;

		const hashItems = navigationItems.filter((it) => it.href.startsWith("#"));

		// Only enable intersection observer for hash links when we're on the root
		if (pathname !== "/" || hashItems.length === 0) {
			// ensure observer is disconnected
			if (observerRef.current) {
				observerRef.current.disconnect();
				observerRef.current = null;
			}
			return;
		}

		const elements = hashItems
			.map((it) => document.getElementById(it.href.substring(1)))
			.filter(Boolean) as HTMLElement[];

		if (elements.length === 0) return;

		// Use a single observer and update activeHref when a section intersects
		observerRef.current = new IntersectionObserver(
			(entries) => {
				// Pick the entry with highest intersectionRatio
				const visible = entries
					.filter((e) => e.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio);

				if (visible.length > 0) {
					setActiveHref(`#${visible[0].target.id}`);
				}
			},
			{
				root: null,
				rootMargin: "-40% 0px -40% 0px",
				threshold: [0.25, 0.5, 0.75],
			},
		);

		for (const el of elements) {
			observerRef.current?.observe(el);
		}

		return () => {
			observerRef.current?.disconnect();
			observerRef.current = null;
		};
	}, [pathname]);

	// Opacidad dinámica del fondo según scroll (1 en top -> 0 tras fadeEnd px)
	const fadeStart = 0; // px desde el top donde empieza a desvanecerse
	const fadeEnd = 240; // px a partir de los cuales la opacidad llega a 0
	const progress = Math.min(
		1,
		Math.max(
			0,
			(scrollPosition.y - fadeStart) / Math.max(1, fadeEnd - fadeStart),
		),
	);
	const bgOpacity = 1 - progress; // 1 -> 0

	// Función para manejar el smooth scroll con offset para el header responsive
	const handleSmoothScroll = (
		href: string,
		event: React.MouseEvent<HTMLAnchorElement>,
	) => {
		// Always prevent default and control navigation via router or scroll
		event.preventDefault();

		// Si es una URL externa, abrir en nueva pestaña
		if (href.startsWith("http")) {
			window.open(href, "_blank", "noopener,noreferrer");
			return;
		}

		if (href.startsWith("#")) {
			const targetId = href.substring(1);

			// If we're on the root path, try to smooth scroll to the element
			if (pathname === "/") {
				const targetElement = document.getElementById(targetId);

				if (targetElement) {
					// Scroll simple - el título ya tiene scroll-mt-20 para el offset del header
					targetElement.scrollIntoView({
						behavior: "smooth",
						block: "start",
					});
					// mark active immediately for better feedback
					setActiveHref(href);
					return;
				}

				// If element not found on the page (edge-case), update the hash as fallback
				window.location.hash = targetId;
				return;
			}

			// If we're on any other route (e.g. (cookies)), navigate to the root with the hash
			// so the browser will land on the servicios section: /#servicios
			router.push(`/${href}`);
			return;
		}

		// Non-hash links (external sections/pages) - navigate via router
		router.push(href);
	};

	// Maneja el click en el logo: si ya estamos en la página raíz, hacemos
	// un smooth scroll hacia el inicio en lugar de forzar una navegación.
	const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
		// Si estamos ya en la página raíz, evitamos la navegación y hacemos scroll suave
		if (pathname === "/") {
			event.preventDefault();
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
		// Si no estamos en la raíz, dejamos que <Link> navegue normalmente a '/'
	};

	return (
		<header
			className={`fixed top-0 z-50 w-full transition-all duration-300 ease-out ${
				isScrolled
					? "backdrop-blur-lg border-b border-border/40 shadow-xl py-2"
					: "backdrop-blur-md border-b border-border/30 shadow-lg py-4"
			}`}
			// Usamos tokens CSS del tema para que funcione en light/dark: hsl(var(--background)/alpha)
			style={{
				backgroundColor: `hsl(var(--background) / ${bgOpacity.toFixed(3)})`,
			}}
		>
			<nav className="container mx-auto px-4">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<WSFadeIn delay={0.1}>
						<div className="flex items-center">
							<Link
								href="/"
								onClick={handleLogoClick}
								style={{ display: "inline-flex", alignItems: "center" }}
								className={`font-bold text-gradient-webcode transition-all duration-300 whitespace-nowrap ${
									isScrolled ? "text-xl" : "text-2xl"
								}`}
							>
								<span
									className={`inline-flex items-center gap-2`}
									style={{ display: "inline-flex", alignItems: "center" }}
								>
									<Image
										src="/favicon-32x32.png"
										alt="WEBCODE Logo"
										width={32}
										height={32}
										className={`transition-all duration-300 flex-shrink-0 object-contain ${
											isScrolled ? "w-6 h-6" : "w-8 h-8"
										}`}
									/>
									<span className="leading-none">WebCode</span>
								</span>
							</Link>
						</div>
					</WSFadeIn>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-8">
						{navigationItems.map((item, index) => (
							<WSFadeIn key={item.href} delay={0.1 + index * 0.1}>
								{item.href.startsWith("http") ? (
									<a
										href={item.href}
										target="_blank"
										rel="noopener noreferrer"
										className={`relative transition-all duration-300 font-medium cursor-pointer ${
											isScrolled
												? "text-foreground hover:text-primary text-sm"
												: "text-foreground hover:text-primary"
										}`}
									>
										{item.label}
										{/* External links shouldn't receive active state */}
									</a>
								) : item.href.startsWith("#") ? (
									<a
										href={item.href}
										onClick={(e) => handleSmoothScroll(item.href, e)}
										aria-current={activeHref === item.href ? "true" : undefined}
										className={`relative transition-all duration-300 font-medium cursor-pointer ${
											isScrolled
												? "text-foreground hover:text-primary text-sm"
												: "text-foreground hover:text-primary"
										} ${activeHref === item.href ? "text-primary" : ""}`}
									>
										{item.label}
										<span
											className={`absolute left-0 -bottom-1 h-0.5 w-full rounded bg-primary transition-all duration-300 transform ${
												activeHref === item.href ? "scale-x-100" : "scale-x-0"
											} origin-left`}
											aria-hidden
										/>
									</a>
								) : (
									<Link
										href={item.href}
										onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
											handleSmoothScroll(item.href, e)
										}
										aria-current={activeHref === item.href ? "true" : undefined}
										className={`relative transition-all duration-300 font-medium cursor-pointer ${
											isScrolled
												? "text-foreground hover:text-primary text-sm"
												: "text-foreground hover:text-primary"
										} ${activeHref === item.href ? "text-primary" : ""}`}
									>
										{item.label}
										<span
											className={`absolute left-0 -bottom-1 h-0.5 w-full rounded bg-primary transition-all duration-300 transform ${
												activeHref === item.href ? "scale-x-100" : "scale-x-0"
											} origin-left`}
											aria-hidden
										/>
									</Link>
								)}
							</WSFadeIn>
						))}
					</div>

					{/* Language Selector & Theme Toggle & Mobile Menu Button */}
					<div className="flex items-center space-x-2">
						{/* Language Selector */}
						<WSFadeIn delay={0.3}>
							<div
								className={`hidden md:flex items-center space-x-1 bg-muted/40 backdrop-blur-sm transition-all duration-300 ${
									isScrolled ? "rounded-md p-0.5 scale-90" : "rounded-lg p-1"
								}`}
							>
								{languages.map((lang) => (
									<button
										type="button"
										key={lang.code}
										onClick={() => setCurrentLanguage(lang.code)}
										className={`transition-all duration-300 font-medium rounded ${
											isScrolled ? "px-1.5 py-0.5 text-xs" : "px-2 py-1 text-sm"
										} ${
											currentLanguage === lang.code
												? "bg-primary/60 text-primary-foreground/80 backdrop-blur-sm"
												: "text-muted-foreground/50 hover:text-foreground/80 hover:bg-muted/30"
										}`}
									>
										{lang.label}
									</button>
								))}
							</div>
						</WSFadeIn>

						{/* CTA Button removed per user request; keep header minimal (only anchor links). */}

						{/* Theme Toggle */}
						<WSFadeIn delay={0.5}>
							<ThemeToggle />
						</WSFadeIn>

						{/* Mobile Menu Button */}
						<div className="md:hidden flex items-center space-x-2">
							{/* Mobile Language Selector */}
							<WSFadeIn delay={0.3}>
								<div className="flex items-center space-x-1 bg-muted/40 backdrop-blur-sm rounded-md p-0.5">
									{languages.map((lang) => (
										<button
											type="button"
											key={lang.code}
											onClick={() => setCurrentLanguage(lang.code)}
											className={`px-1.5 py-0.5 text-xs font-medium rounded transition-all duration-300 ${
												currentLanguage === lang.code
													? "bg-primary/60 text-primary-foreground/80 backdrop-blur-sm"
													: "text-muted-foreground/50 hover:text-foreground/80 hover:bg-muted/30"
											}`}
										>
											{lang.label}
										</button>
									))}
								</div>
							</WSFadeIn>

							{/* Sheet para menú móvil */}
							<WSFadeIn delay={0.4}>
								<Sheet
									open={isMobileMenuOpen}
									onOpenChange={setIsMobileMenuOpen}
								>
									<SheetTrigger asChild>
										<Button
											variant="ghost"
											size="sm"
											className="md:hidden text-foreground"
											data-testid="mobile-menu-toggle"
											aria-label="Toggle mobile menu"
											aria-expanded={isMobileMenuOpen}
										>
											<Menu size={20} />
										</Button>
									</SheetTrigger>
									{/* Fix: use sensible mobile-first widths (was inverted sm:w) */}
									<SheetContent side="right" className="w-56 sm:w-64">
										{/* Título oculto visualmente para accesibilidad */}
										<SheetTitle className="sr-only">Navegación</SheetTitle>
										<div className="flex flex-col space-y-4 mt-6 ps-4 text-center">
											{navigationItems.map((item) =>
												item.href.startsWith("http") ? (
													<a
														key={item.href}
														href={item.href}
														target="_blank"
														rel="noopener noreferrer"
														className="text-foreground hover:text-primary transition-colors duration-200 font-medium text-lg py-2 cursor-pointer"
														onClick={() => setIsMobileMenuOpen(false)}
													>
														{item.label}
													</a>
												) : item.href.startsWith("#") ? (
													<a
														key={item.href}
														href={item.href}
														aria-current={
															activeHref === item.href ? "true" : undefined
														}
														className={`text-foreground hover:text-primary transition-colors duration-200 font-medium text-lg py-2 cursor-pointer ${
															activeHref === item.href ? "text-primary" : ""
														}`}
														onClick={(e) => {
															handleSmoothScroll(item.href, e);
															setIsMobileMenuOpen(false);
														}}
													>
														{item.label}
														<span
															className={`block h-0.5 w-full rounded bg-primary mt-1 transition-all duration-200 ${
																activeHref === item.href
																	? "opacity-100"
																	: "opacity-0"
															}`}
															aria-hidden
														/>
													</a>
												) : (
													<Link
														key={item.href}
														href={item.href}
														aria-current={
															activeHref === item.href ? "true" : undefined
														}
														className={`text-foreground hover:text-primary transition-colors duration-200 font-medium text-lg py-2 cursor-pointer ${
															activeHref === item.href ? "text-primary" : ""
														}`}
														onClick={(
															e: React.MouseEvent<HTMLAnchorElement>,
														) => {
															handleSmoothScroll(item.href, e);
															setIsMobileMenuOpen(false);
														}}
													>
														{item.label}
														<span
															className={`block h-0.5 w-full rounded bg-primary mt-1 transition-all duration-200 ${
																activeHref === item.href
																	? "opacity-100"
																	: "opacity-0"
															}`}
															aria-hidden
														/>
													</Link>
												),
											)}
										</div>
									</SheetContent>
								</Sheet>
							</WSFadeIn>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
}
