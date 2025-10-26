import "./company-logo.css";
import companyIconSrc from "../icons/company-icon.svg";

type CompanyLogoProps = {
  name: string;
};

const CompanyLogo = ({ name }: CompanyLogoProps) => (
  <div className="company-logo">
    <img className="company-icon" src={companyIconSrc} alt="Blue circle" />
    <span className="company-name">{name}</span>
  </div>
);

export default CompanyLogo;
