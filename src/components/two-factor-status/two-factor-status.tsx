import { SubmitButton } from "../submit-button";

import "./two-factor-status.css";

type TwoFactorStatusProps = {
  formattedTimeLeft: string;
  isCodeComplete: boolean;
  isCodeValid: boolean;
  isExpired: boolean;
  onRequestNewCode: () => void;
};

export function TwoFactorStatus({
  formattedTimeLeft,
  isCodeComplete,
  isCodeValid,
  isExpired,
  onRequestNewCode,
}: TwoFactorStatusProps) {
  return (
    <div className="two-factor__status">
      {isCodeComplete ? (
        <SubmitButton type="button" disabled={!isCodeValid}>
          Continue
        </SubmitButton>
      ) : isExpired ? (
        <SubmitButton type="button" onClick={onRequestNewCode}>
          Get new
        </SubmitButton>
      ) : (
        <p className="two-factor__timer" role="status" aria-live="polite">
          Code expires in {formattedTimeLeft}
        </p>
      )}
    </div>
  );
}
