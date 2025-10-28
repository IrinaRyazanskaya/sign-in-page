import { useMutation } from "@tanstack/react-query";
import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";

import {
  signIn,
  SignInApiError,
  type SignInPayload,
  type SignInSuccess,
} from "../../services/mock-auth-api";
import { CompanyLogo } from "../company-logo";
import { InputField } from "../input-field";
import { SubmitButton } from "../submit-button";
import { SignInHeading } from "../sign-in-heading";
import { TwoFactorStep } from "../two-factor-step";

import lockIcon from "../icons/lock-icon.svg";
import userIcon from "../icons/user-icon.svg";
import "./sign-in-form.css";

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<"credentials" | "twoFactor">("credentials");
  const signInMutation = useMutation<SignInSuccess, SignInApiError, SignInPayload>({
    mutationFn: signIn,
  });

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (signInMutation.error || signInMutation.isSuccess) {
      signInMutation.reset();
      setStep("credentials");
    }
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (signInMutation.error || signInMutation.isSuccess) {
      signInMutation.reset();
      setStep("credentials");
    }
  };

  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();
  const isFormValid = EMAIL_PATTERN.test(trimmedEmail) && trimmedPassword.length >= 6;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    signInMutation.mutate({ email: trimmedEmail, password: trimmedPassword });
  };

  useEffect(() => {
    if (signInMutation.isSuccess) {
      setStep("twoFactor");
    }
  }, [signInMutation.isSuccess]);

  const errorMessage = signInMutation.error?.message ?? null;

  const handleBackToCredentials = () => {
    signInMutation.reset();
    setStep("credentials");
  };

  return (
    <div className="sign-in-form">
      {step === "credentials" ? (
        <>
          <CompanyLogo name="Company" />
          <SignInHeading />
          <form className="sign-in-form__form" onSubmit={handleSubmit} noValidate>
            <InputField
              type="email"
              name="email"
              placeholder="Email"
              icon={userIcon}
              autoComplete="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <InputField
              type="password"
              name="password"
              placeholder="Password"
              icon={lockIcon}
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
              required
              minLength={6}
            />
            <SubmitButton
              type="submit"
              disabled={!isFormValid || signInMutation.isPending}
            >
              {signInMutation.isPending ? "Logging in..." : "Log in"}
            </SubmitButton>
            {errorMessage && (
              <p className="sign-in-form__error">
                {errorMessage}
              </p>
            )}
          </form>
        </>
      ) : (
        <TwoFactorStep onBack={handleBackToCredentials} logo={<CompanyLogo name="Company" />} />
      )}
    </div>
  );
}
