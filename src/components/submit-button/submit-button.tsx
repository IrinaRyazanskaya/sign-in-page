import "./submit-button.css";

type SubmitButtonProps = {
  label: string;
  disabled?: boolean;
};

export function SubmitButton({ label, disabled = false }: SubmitButtonProps) {
  return (
    <button className="submit-button" type="submit" disabled={disabled}>
      {label}
    </button>
  );
}
