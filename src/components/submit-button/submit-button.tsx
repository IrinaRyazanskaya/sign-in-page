import { type ButtonHTMLAttributes, type ReactNode } from "react";

import "./submit-button.css";

type SubmitButtonVariant = "primary";

type SubmitButtonProps = {
  children: ReactNode;
  variant?: SubmitButtonVariant;
  fullWidth?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function SubmitButton({
  children,
  variant = "primary",
  className,
  type = "submit",
  ...props
}: SubmitButtonProps) {
  const classNames = ["submit-button", `submit-button_${variant}`];

  if (className) {
    classNames.push(className);
  }

  return (
    <button
      type={type}
      className={classNames.join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
