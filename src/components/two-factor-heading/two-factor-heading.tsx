import "./two-factor-heading.css";

export function TwoFactorHeading() {
  return (
    <div className="two-factor-heading">
      <h2 className="two-factor-heading__title">Two-Factor Authentication</h2>
      <p className="two-factor-heading__subtitle">
        Enter the 6-digit code from the Google Authenticator app
      </p>
    </div>
  );
}
