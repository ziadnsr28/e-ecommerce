type FieldErrorProps = {
  message?: string;
};

// Renders a validation error message for a form field.
export function FieldError({ message }: FieldErrorProps) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-500 animate-in fade-in slide-in-from-top-1 duration-150">{message}</p>;
}