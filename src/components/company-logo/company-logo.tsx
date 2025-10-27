import "./company-logo.css";
import companyIconSrc from "../icons/company-icon.svg";

type CompanyLogoProps = {
  name: string;
};

export function CompanyLogo({ name }: CompanyLogoProps) {
  return (
    <div className="company-logo">
      <img className="company-logo__icon" src={companyIconSrc} alt="Blue circle" />
      <span className="company-logo__name">{name}</span>
    </div>
  );
}
