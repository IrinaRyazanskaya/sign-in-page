import "./error-message.css";

type ErrorMessageProps = {
  message: string;
};

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <p className="error-message" role="alert">
      {message}
    </p>
  );
}
