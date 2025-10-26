import "./input-field.css";

type InputFieldProps = {
  type: string;
  name: string;
  placeholder: string;
  icon: string;
  autoComplete?: string;
};

const InputField = ({ type, name, placeholder, icon, autoComplete }: InputFieldProps) => (
  <label className="input-label">
    <img className="input-icon" src={icon} alt="" />
    <input
      className="input-field"
      type={type}
      name={name}
      placeholder={placeholder}
      autoComplete={autoComplete}
    />
  </label>
);

export default InputField;
