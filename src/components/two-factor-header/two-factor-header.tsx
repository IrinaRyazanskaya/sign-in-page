import { type ReactNode } from "react";

import "./two-factor-header.css";
import arrowIcon from "../icons/arrow-left.svg";

type TwoFactorHeaderProps = {
  logo: ReactNode;
  onBack: () => void;
};

export function TwoFactorHeader({ logo, onBack }: TwoFactorHeaderProps) {
  return (
    <div className="two-factor-header">
      <button
        type="button"
        className="two-factor-header__back"
        onClick={onBack}
        aria-label="Back to sign-in form"
      >
        <img
          className="two-factor-header__button-icon"
          src={arrowIcon}
          alt="Back arrow"
        />
      </button>
      {logo}
    </div>
  );
}
