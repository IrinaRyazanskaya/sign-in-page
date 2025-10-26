import CompanyLogo from "../company-logo";
import InputField from "../input-field";
import SubmitButton from "../submit-button";
import SignInHeading from "../sign-in-heading";
import userIcon from "../icons/user-icon.svg";
import lockIcon from "../icons/lock-icon.svg";
import "./sign-in-form.css";

const SignInForm = () => (
  <div className="sign-in-card">
    <CompanyLogo name="Company" />
    <SignInHeading />
    <form className="sign-in-form">
      <InputField
        type="email"
        name="email"
        placeholder="Email"
        icon={userIcon}
        autoComplete="email"
      />
      <InputField
        type="password"
        name="password"
        placeholder="Password"
        icon={lockIcon}
        autoComplete="current-password"
      />
      <SubmitButton label="Log in" disabled />
    </form>
  </div>
);

export default SignInForm;
