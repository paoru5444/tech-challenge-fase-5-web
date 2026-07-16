import { LogOut } from "lucide-react";
import { NavLink } from "react-router";
import { navGeralItems, navItems } from "./nav-items";
import Divider from "../ui/divider";
import Typography from "../ui/typography";

export default function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col justify-between border-r border-[#EAEAEA] bg-white px-4 py-6 contrast:border-black md:flex">
      <div>
        <Typography as="p" variant="h2" className="mb-8 px-3 text-[#1A1918]">
          Senior Ease
        </Typography>

        <Divider size={32} />

        <div className="flex flex-col gap-6">
          <Typography as="p" variant="title" className="text-black">
            Menu
          </Typography>

          <nav className="flex flex-col gap-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium ${
                    isActive
                      ? "bg-[#FBE6DA] text-[#D66F47]"
                      : "text-[#4A4844] contrast:text-black hover:bg-[#F0EDE8]"
                  }`
                }
              >
                <Icon size={20} />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        <Divider size={32} />

        <div className="flex flex-col gap-6">
          <Typography as="p" variant="title" className="text-black">
            Geral
          </Typography>

          <nav className="flex flex-col gap-1">
            {navGeralItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium ${
                    isActive
                      ? "bg-[#FBE6DA] text-[#D66F47]"
                      : "text-[#4A4844] contrast:text-black hover:bg-[#F0EDE8]"
                  }`
                }
              >
                <Icon size={20} />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      <button
        type="button"
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#8B3A42] hover:bg-[#F7EAEC]"
      >
        <LogOut size={20} />
        Sair da conta
      </button>
    </aside>
  );
}
