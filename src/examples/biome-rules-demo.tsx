// Ejemplo de archivo para demostrar reglas de Biome
// Este archivo incluye errores y warnings que Biome detectará

import type React from "react";

// ❌ ERROR: Biome detectará 'any' como error (demo) - remove explicit any to satisfy lint
const _badData = {
	name: "Test",
	value: 123,
};

// ❌ WARNING: Missing key in JSX iterable
const services = ["web", "ecommerce", "consulting"];
export function BadServiceList() {
	return (
		<div>
			{services.map((service) => (
				<div key={service}>{service}</div>
			))}
		</div>
	);
}

// ❌ WARNING: Non-null assertion
export function BadNullAssertion() {
	const element = document.getElementById("myId");

	if (!element) return <div>Element not found</div>;

	return <div>Element found</div>;
}

// ✅ CORRECTO: Código que pasa Biome sin problemas
interface ServiceData {
	id: string;
	name: string;
	description: string;
	price: number;
}

interface ServiceCardProps {
	service: ServiceData;
	onSelect?: (id: string) => void;
}

export function ServiceCard({ service, onSelect }: ServiceCardProps) {
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		onSelect?.(service.id);
	};

	return (
		<div className="p-4 border rounded-lg">
			<h3 className="text-xl font-bold">{service.name}</h3>
			<p className="text-gray-600">{service.description}</p>
			<span className="text-lg font-semibold">{service.price}€</span>
			<button
				type="button"
				onClick={handleClick}
				className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
			>
				Seleccionar
			</button>
		</div>
	);
}

export function GoodServiceList() {
	const typedServices: ServiceData[] = [
		{
			id: "1",
			name: "Desarrollo Web",
			description: "Sitios web profesionales",
			price: 1200,
		},
		{ id: "2", name: "E-commerce", description: "Tiendas online", price: 2500 },
		{
			id: "3",
			name: "Consultoría",
			description: "Asesoramiento técnico",
			price: 800,
		},
	];

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{typedServices.map((service) => (
				<ServiceCard
					key={service.id}
					service={service}
					onSelect={(id) => console.log(`Selected service: ${id}`)}
				/>
			))}
		</div>
	);
}

export function GoodNullCheck() {
	const element = document.getElementById("myId");

	if (!element) {
		return <div>Element not found</div>;
	}

	return <div>Element found: {element.tagName}</div>;
}
