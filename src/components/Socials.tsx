import ItchIoLogo from "@/assets/itch-io-logo.svg?react";
import { Mail, Linkedin, Github } from "lucide-react";

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
