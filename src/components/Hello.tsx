import { Mail } from "lucide-react";
import { Button } from "./ui/button";
import { socials } from "@/components/Socials";

export default function Hello() {
  return (
    <>
      <div className="flex flex-col justify-center md:gap-x-8 gap-y-8 mt-32">
        <img
          className="w-32 rounded-3xl aspect-square"
          src="profile-photo.jpg"
          alt="Thomas Bach's profile photo"
        />
        <div className="flex flex-col justify-center text-left">
          <h1 className="text-5xl font-bold text-zinc-800">
            Hello, I'm <span className="text-primary">Thomas Bach</span>
          </h1>
          <h2 className="text-2xl text-zinc-500 tracking-tight">
            💻 Software engineer and DevOps enthusiast
          </h2>
          <div className="flex items-center gap-x-4 mt-4">
            <Button asChild>
              <a href="mailto:thomasbach.contact@gmail.com">
                <Mail className="mr-2 h-4 w-4" />
                Get in touch
              </a>
            </Button>
            {socials.map(
              ({ name, href, fill, Logo }) =>
                name !== "mail" && (
                  <a href={href}>
                    <Logo
                      key={name}
                      className={
                        "w-6 h-6 hover:text-primary" +
                        (fill ? " hover:fill-primary" : "")
                      }
                    />
                  </a>
                )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
