import { ImageResponse } from "next/og";

export const alt = "WEBCODE - Soluciones Web Profesionales";
export const size = {
	width: 1200,
	height: 630,
};
export const contentType = "image/png";

export default async function Image() {
	return new ImageResponse(
		<div
			style={{
				fontSize: 60,
				background: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				color: "white",
				fontFamily: "Arial, sans-serif",
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					textAlign: "center",
				}}
			>
				<div
					style={{
						fontSize: 80,
						fontWeight: "bold",
						marginBottom: 20,
						background: "linear-gradient(45deg, #ffffff, #e0e0e0)",
						backgroundClip: "text",
						WebkitBackgroundClip: "text",
						color: "transparent",
					}}
				>
					WEBCODE
				</div>
				<div
					style={{
						fontSize: 36,
						color: "#cccccc",
						maxWidth: 800,
						lineHeight: 1.3,
					}}
				>
					Desarrollo Web Profesional en Barcelona
				</div>
				<div
					style={{
						fontSize: 24,
						color: "#999999",
						marginTop: 20,
					}}
				>
					Soluciones Digitales • Next.js • React • TypeScript
				</div>
			</div>
		</div>,
		{
			...size,
		},
	);
}
