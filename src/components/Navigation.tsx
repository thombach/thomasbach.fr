import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";

export const NavigationItems = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Resume",
    path: "./CV.pdf",
  },
];

const NavItem = ({
  path,
  children,
}: React.PropsWithChildren<{ path: string }>) => {
  const isActive = useLocation().pathname === path;

  return (
    <li>
      <Link
        to={path}
        className={clsx(
          "relative block px-3 py-2 transition",
          isActive ? "text-primary" : "hover:text-primary"
        )}
      >
        {children}
      </Link>
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
            <NavItem key={item.name} path={item.path}>
              {item.name}
            </NavItem>
          );
        })}
      </ul>
    </nav>
  );
};
