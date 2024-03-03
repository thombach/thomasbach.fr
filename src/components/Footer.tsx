import { socials } from "@/components/Socials";
import { Fragment } from "react";

export default function Footer() {
  return (
    <>
      <footer className="mt-32 pt-10 pb-16">
        <div className="flex flex-col items-center gap-y-6">
          <div className="flex flex-row gap-x-4">
            {socials.map(({ name, href, fill, Logo }) => (
              <Fragment key={name}>
                <a href={href}>
                  <Logo
                    className={
                      "w-6 h-6 hover:text-primary" +
                      (fill ? " hover:fill-primary" : "")
                    }
                  />
                </a>
              </Fragment>
            ))}
          </div>
          <div className="flex flex-col items-center">
            <p>Made by Thomas Bach</p>
            <p>© 2023 - 2024</p>
          </div>
        </div>
      </footer>
    </>
  );
}
