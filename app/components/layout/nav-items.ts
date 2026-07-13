import { Home, ListChecks, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { to: "/", label: "Início", icon: Home },
  { to: "/atividades", label: "Atividades", icon: ListChecks },
  { to: "/perfil", label: "Perfil", icon: User },
];
