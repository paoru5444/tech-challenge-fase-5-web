import { Home, ListChecks, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";
export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { to: "/", label: "Início", icon: Home },
  { to: "/historico", label: "Histórico", icon: ListChecks },
];

export const navGeralItems: NavItem[] = [
  { to: "/preferences", label: "Preferências", icon: Home },
  { to: "/setup", label: "Configurações", icon: ListChecks },
];

export const tabBarItems: NavItem[] = [...navItems, ...navGeralItems];
