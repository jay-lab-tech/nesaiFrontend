"use client";

import { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

export function FormField({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
  className = "",
}: FormFieldProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-[var(--admin-fg)]"
      >
        {label}
        {required && <span className="text-[var(--admin-danger)] ml-0.5">*</span>}
      </label>
      {children}
      {hint && !error && (
        <p className="text-xs text-[var(--admin-fg-subtle)]">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-[var(--admin-danger)] font-medium">{error}</p>
      )}
    </div>
  );
}
