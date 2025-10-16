"use client";

import { motion } from "framer-motion";
import { wsConfig } from "@/lib/webcode-motion-config";

interface WSHoverProps {
	children: React.ReactNode;
	effect?: "lift" | "glow" | "fade" | "scale";
	className?: string;
}

export function WSHover({
	children,
	effect = "lift",
	className = "",
}: WSHoverProps) {
	const effects = {
		lift: wsConfig.effects.lift,
		glow: wsConfig.effects.glow,
		fade: wsConfig.effects.fade,
		scale: wsConfig.effects.scale,
	};

	return (
		<motion.div
			className={className}
			whileHover={effects[effect]}
			transition={{
				duration: wsConfig.durations.quick,
				ease: wsConfig.easings.smooth,
			}}
		>
			{children}
		</motion.div>
	);
}
