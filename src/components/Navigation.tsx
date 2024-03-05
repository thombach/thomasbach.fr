import clsx from "clsx";
import { useLocation } from "react-router-dom";

export const NavigationItems = [
  {
    name: "Home",
    href: "/",
  },
  // {
  //   name: "Projects",
  //   href: "/#projects",
  // },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Resume",
    href: "./CV",
  },
];

const NavItem = ({
  href,
  children,
}: React.PropsWithChildren<{ href: string }>) => {
  const isActive = useLocation().pathname === href;

  return (
    <li>
      <a
        href={href}
        className={clsx(
          "relative block px-3 py-2 transition",
          isActive ? "text-primary" : "hover:text-primary"
        )}
      >
        {children}
      </a>
    </li>
  );
};

export const Navigation = (
  props: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>
) => {
  return (
    <nav {...props}>
      <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-muted-foreground shadow-lg shadow-slate-800/5 ring-1 ring-slate-900/5 backdrop-blur">
        {NavigationItems.map((item) => {
          return (
            <NavItem key={item.name} href={item.href}>
              {item.name}
            </NavItem>
          );
        })}
      </ul>
    </nav>
  );
};
