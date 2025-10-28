import {
  type ChangeEvent,
  type ClipboardEvent,
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import "./two-factor-step.css";
import { CodeInputs } from "../code-inputs";
import { ErrorMessage } from "../error-message";
import { TwoFactorHeader } from "../two-factor-header";
import { TwoFactorHeading } from "../two-factor-heading";
import { TwoFactorStatus } from "../two-factor-status";

type TwoFactorStepProps = {
  onBack: () => void;
  logo: ReactNode;
};

const CODE_LENGTH = 6;
const CODE_EXPIRATION_SECONDS = 30;
const VALID_TWO_FACTOR_CODE = "131311";

const getEmptyCode = () => Array(CODE_LENGTH).fill("");

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export function TwoFactorStep({ onBack, logo }: TwoFactorStepProps) {
  const [code, setCode] = useState<string[]>(getEmptyCode);
  const [timeLeft, setTimeLeft] = useState(CODE_EXPIRATION_SECONDS);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const codeValue = code.join("");
  const isExpired = timeLeft === 0;
  const isCodeComplete = code.every((digit) => digit !== "");
  const isCodeValid = isCodeComplete && codeValue === VALID_TWO_FACTOR_CODE;
  const shouldShowError = isCodeComplete && !isCodeValid;

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const setInputRef = (index: number, element: HTMLInputElement | null) => {
    inputsRef.current[index] = element;
  };

  const focusInput = (index: number) => {
    const input = inputsRef.current[index];
    if (input) {
      input.focus();
      input.select();
    }
  };

  const handleChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = event.target.value.replace(/\D/g, "");
    const nextDigit = sanitizedValue.slice(-1);

    setCode((previous) => {
      const next = [...previous];
      next[index] = nextDigit;
      return next;
    });

    if (nextDigit && index < CODE_LENGTH - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (index: number) => (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !code[index] && index > 0) {
      focusInput(index - 1);
    }

    if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      focusInput(index - 1);
    }

    if (event.key === "ArrowRight" && index < CODE_LENGTH - 1) {
      event.preventDefault();
      focusInput(index + 1);
    }
  };

  useEffect(() => {
    if (timeLeft === 0 || isCodeValid) {
      return;
    }

    const timerId = window.setTimeout(() => {
      setTimeLeft((previous) => Math.max(previous - 1, 0));
    }, 1000);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [timeLeft, isCodeValid]);

  const handlePaste = (index: number) => (event: ClipboardEvent<HTMLInputElement>) => {
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) {
      return;
    }

    event.preventDefault();

    const digits = pasted.slice(0, CODE_LENGTH - index).split("");
    setCode((previous) => {
      const next = [...previous];
      digits.forEach((digit, offset) => {
        next[index + offset] = digit;
      });
      return next;
    });

    const lastFilledIndex = Math.min(index + digits.length - 1, CODE_LENGTH - 1);
    const nextIndex = lastFilledIndex === CODE_LENGTH - 1 ? lastFilledIndex : lastFilledIndex + 1;
    focusInput(nextIndex);
  };

  const handleRequestNewCode = () => {
    setCode(getEmptyCode());
    setTimeLeft(CODE_EXPIRATION_SECONDS);
    focusInput(0);
  };

  const formattedTimeLeft = formatTime(timeLeft);

  return (
    <div className="two-factor">
      <TwoFactorHeader onBack={onBack} logo={logo} />
      <TwoFactorHeading />
      <div className="two-factor__body">
        <div className="two-factor__inputs-group">
          <CodeInputs
            code={code}
            shouldShowError={shouldShowError}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            setInputRef={setInputRef}
          />
          {shouldShowError && (
            <ErrorMessage message="Invalid code" />
          )}
        </div>
        <TwoFactorStatus
          formattedTimeLeft={formattedTimeLeft}
          isCodeComplete={isCodeComplete}
          isCodeValid={isCodeValid}
          isExpired={isExpired}
          onRequestNewCode={handleRequestNewCode}
        />
      </div>
    </div>
  );
}
