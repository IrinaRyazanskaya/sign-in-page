import {
  type ChangeEvent,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";

import "./code-inputs.css";

type HandlerFactory<Event> = (index: number) => (event: Event) => void;

type CodeInputsProps = {
  code: string[];
  shouldShowError: boolean;
  onChange: HandlerFactory<ChangeEvent<HTMLInputElement>>;
  onKeyDown: HandlerFactory<KeyboardEvent<HTMLInputElement>>;
  onPaste: HandlerFactory<ClipboardEvent<HTMLInputElement>>;
  setInputRef: (index: number, element: HTMLInputElement | null) => void;
};

export function CodeInputs({
  code,
  shouldShowError,
  onChange,
  onKeyDown,
  onPaste,
  setInputRef,
}: CodeInputsProps) {
  return (
    <div className="code-inputs" role="group" aria-label="Verification code">
      {code.map((digit, index) => (
        <input
          key={index}
          ref={(element) => {
            setInputRef(index, element);
          }}
          className={`code-inputs__digit${shouldShowError ? " code-inputs__digit_error" : ""}`}
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={digit}
          onChange={onChange(index)}
          onKeyDown={onKeyDown(index)}
          onPaste={onPaste(index)}
          aria-label={`Digit ${index + 1}`}
        />
      ))}
    </div>
  );
}
