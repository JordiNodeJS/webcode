"use client";

import { useState, useEffect } from "react";
import RocketAnimation from "../../styles/modules/RocketAnimation.module.css";

interface AnimatedRocketIconProps {
  icon: string;
  slug: string;
}

export function AnimatedRocketIcon({ icon, slug }: AnimatedRocketIconProps) {
  const [rocketAnimationState, setRocketAnimationState] = useState("idle");

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (rocketAnimationState === "animate") {
      timeoutId = setTimeout(() => {
        setRocketAnimationState("reset");
        // After reset animation completes, go back to idle
        setTimeout(() => {
          setRocketAnimationState("idle");
        }, 800); // Match the reset transition duration
      }, 15000); // 15 seconds
    }
    return () => clearTimeout(timeoutId);
  }, [rocketAnimationState]);

  const handleRocketHover = () => {
    // Only start animation if we're in idle state
    if (rocketAnimationState === "idle") {
      setRocketAnimationState("animate");
    }
  };

  const handleRocketLeave = () => {
    // Don't reset immediately on mouse leave - let the 15s timer handle it
    // This ensures the animation continues even after mouse leaves
  };

  return (
    <div className="relative">
      {/* Fire placeholder that stays in original position */}
      {slug === "web-development" && (
        <div 
          className={`text-5xl absolute top-0 left-0 z-5 ${
            rocketAnimationState === "animate" 
              ? RocketAnimation.fireVisible 
              : rocketAnimationState === "reset" 
                ? RocketAnimation.fireHidden 
                : RocketAnimation.fireHidden
          }`}
        >
          🔥
        </div>
      )}
      
      {/* Rocket that moves */}
      <div 
        className={`text-5xl ${
          slug === "web-development" 
            ? RocketAnimation.rocketIcon 
            : ""
        } ${
          rocketAnimationState === "animate" 
            ? RocketAnimation.animate 
            : rocketAnimationState === "reset" 
              ? RocketAnimation.reset 
              : ""
        }`}
        onMouseEnter={slug === "web-development" ? handleRocketHover : undefined}
        onMouseLeave={slug === "web-development" ? handleRocketLeave : undefined}
      >
        {icon}
      </div>
    </div>
  );
}
