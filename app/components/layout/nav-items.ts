import { Home, ListChecks, User, ClockCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { to: "/", label: "Início", icon: Home },
  { to: "/tasks", label: "Atividades", icon: ClockCheck },
];

export const navGeralItems: NavItem[] = [
  { to: "/profile", label: "Perfil", icon: User },
  { to: "/setup", label: "Configurações", icon: ListChecks },
];

export const tabBarItems: NavItem[] = [...navItems, ...navGeralItems];
