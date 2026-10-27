type InlineErrorProps = {
  id: string;
  message?: string;
};

export function InlineError({ id, message }: InlineErrorProps) {
  if (!message) return null;

  return (
    <p id={id} className="mt-1 text-sm text-red-600" role="alert">
      {message}
    </p>
  );
}
