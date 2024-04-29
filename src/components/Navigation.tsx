import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";

export const NavigationItems = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
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
    <nav {...props} className="flex flex-row">
      <a href="/" className="hidden sm:block left-0 absolute">
        <Avatar className="size-9">
          <AvatarImage src="profile-photo.jpg" />
        </Avatar>
      </a>

      <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-slate-700 shadow-lg shadow-slate-800/5 ring-1 ring-slate-900/5 backdrop-blur">
        {NavigationItems.map((item) => {
          return (
            <NavItem key={item.name} path={item.path}>
              {item.name}
            </NavItem>
          );
        })}
        <a
          href="CV-BACH.pdf"
          className={"relative block px-3 py-2 transition hover:text-primary"}
        >
          Resume
        </a>
      </ul>
    </nav>
  );
};
