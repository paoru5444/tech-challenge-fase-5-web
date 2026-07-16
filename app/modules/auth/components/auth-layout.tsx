import type { ReactNode } from "react";
import CredentialsHeader from "./credentials-header";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <CredentialsHeader />

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 md:w-1/2 md:px-16 bg-white">
        <div className="flex w-full max-w-sm flex-col gap-8">{children}</div>
      </div>
    </div>
  );
}
