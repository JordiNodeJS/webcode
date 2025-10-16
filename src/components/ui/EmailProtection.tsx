"use client";

interface EmailProtectionProps {
  email: string;
  className?: string;
  showAsLink?: boolean;
}

export function EmailProtection({
  email,
  className = "",
  showAsLink = true
}: EmailProtectionProps) {
  // Para evitar desajustes de hidratación, generamos exactamente el mismo
  // árbol en servidor y cliente sin usar innerHTML.
  if (showAsLink) {
    return (
      <a href={`mailto:${email}`} className={className}>
        {email}
      </a>
    );
  }

  return <span className={className}>{email}</span>;
}
