import { ReactNode } from "react";

interface FieldProps {
    label: string;
    hint?: string;
    children: ReactNode;
    required?: boolean;
    hintClassName?: string;
}

// Renders a form field container with label, optional required asterisk, input slot, and helper hint.
export function Field({ label, hint, children, required, hintClassName }: FieldProps) {
    return (
        <div className="mb-4">
            <label className="mb-1.5 block text-[13px] font-semibold text-gray-900">
                {label}
                {required && <span className="ml-0.5 text-red-500">*</span>}
            </label>
            {children}
            {hint && <div className={hintClassName ?? "mt-1 text-xs text-gray-500"}>{hint}</div>}
        </div>
    );
}