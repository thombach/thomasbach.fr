import ItchIoLogo from "@/assets/itch-io-logo.svg?react";
import { Mail, Linkedin, Github } from "lucide-react";
import { Fragment } from "react";

export interface SocialProps {
  name: string;
  href: string;
  fill: boolean;
  Logo: any;
}

export const socials: SocialProps[] = [
  {
    name: "mail",
    href: "mailto:thomasbach.contact@gmail.com",
    fill: false,
    Logo: Mail,
  },
  {
    name: "linkedin",
    href: "https://linkedin.com/in/thomasbachpro",
    fill: false,
    Logo: Linkedin,
  },
  {
    name: "github",
    href: "https://github.com/thomasbachdev",
    fill: false,
    Logo: Github,
  },
  {
    name: "itch.io",
    href: "https://thomasbach.itch.io/",
    fill: true,
    Logo: ItchIoLogo,
  },
];

export default function Socials() {
  return (
    <>
      <div className="flex gap-x-4">
        {socials.map(({ name, href, fill, Logo }) => (
          <Fragment key={name}>
            <a href={href}>
              <Logo
                className={
                  "w-6 h-6 hover:text-primary text-slate-600" +
                  (fill ? " hover:fill-primary fill-slate-600" : "")
                }
              />
            </a>
          </Fragment>
        ))}
      </div>
    </>
  );
}
