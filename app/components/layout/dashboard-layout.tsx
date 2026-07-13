import type { ReactNode } from "react";
import Sidebar from "./sidebar";
import Tabbar from "./tabbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F5F2] md:flex-row">
      <Sidebar />

      <main className="flex-1 px-4 pt-6 pb-24 md:px-8 md:pb-6">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
          {children}
        </div>
      </main>

      <Tabbar />
    </div>
  );
}
