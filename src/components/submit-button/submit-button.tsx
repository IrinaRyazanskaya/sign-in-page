import "./submit-button.css";

type SubmitButtonProps = {
  label: string;
  disabled?: boolean;
};

const SubmitButton = ({ label, disabled = false }: SubmitButtonProps) => (
  <button className="submit-button" type="submit" disabled={disabled}>
    {label}
  </button>
);

export default SubmitButton;
