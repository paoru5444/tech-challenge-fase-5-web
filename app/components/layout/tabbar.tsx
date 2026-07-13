import { NavLink } from "react-router";
import { navItems } from "./nav-items";

export default function Tabbar() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 flex items-center justify-around border-t border-[#EAEAEA] bg-white pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] md:hidden">
      {navItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 px-3 py-1 text-xs font-medium ${
              isActive ? "text-[#D66F47]" : "text-[#8A8783]"
            }`
          }
        >
          <Icon size={22} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
