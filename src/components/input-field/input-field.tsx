import type { ChangeEventHandler } from "react";
import "./input-field.css";

type InputFieldProps = {
  type: string;
  name: string;
  placeholder: string;
  icon: string;
  autoComplete?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  minLength?: number;
};

export function InputField({
  type,
  name,
  placeholder,
  icon,
  autoComplete,
  value,
  onChange,
  required = false,
  minLength,
}: InputFieldProps) {
  return (
    <label className="input-field">
      <img className="input-field__icon" src={icon} alt="" />
      <input
        className="input-field__input"
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        required={required}
        minLength={minLength}
      />
    </label>
  );
}
