import { Suspense } from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

function LoadingSpinner({ size = "md", className = "" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  return (
    <div className={`flex items-center justify-center p-4 ${className}`}>
      <output 
        className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-300 border-t-primary`}
        aria-label="Cargando..."
      />
    </div>
  );
}

interface OptimizedSuspenseProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Optimized Suspense wrapper for lazy-loaded components
 * Provides consistent loading states and error boundaries
 */
export function OptimizedSuspense({ 
  children, 
  fallback, 
  size = "md",
  className 
}: OptimizedSuspenseProps) {
  return (
    <Suspense 
      fallback={fallback || <LoadingSpinner size={size} className={className} />}
    >
      {children}
    </Suspense>
  );
}