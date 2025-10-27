import { QueryClientProvider } from "@tanstack/react-query";

import { SignInForm } from "./components/sign-in-form";
import { queryClient } from "./queries";

import "./app.css";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <SignInForm />
      </div>
    </QueryClientProvider>
  );
}
