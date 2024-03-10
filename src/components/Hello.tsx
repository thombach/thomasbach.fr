import { Mail } from "lucide-react";
import { Button } from "./ui/button";
import Socials from "@/components/Socials";
import Visitors from "./Visitors";

export default function Hello() {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-y-8 gap-x-10 mt-32">
        <div className="relative">
          <img
            className="size-48 object-cover rounded-2xl aspect-square"
            src="profile-photo.jpg"
            alt="Thomas Bach's profile photo"
          />
          <Visitors className="absolute -top-3 -right-3" />
        </div>
        <div className="flex flex-col justify-center text-left">
          <h1 className="sm:text-5xl text-4xl font-bold text-slate-700">
            Hello, I'm <span className="text-primary">Thomas Bach</span>
          </h1>
          <h2 className="sm:text-2xl text-xl text-muted-foreground tracking-tight mt-2">
            Full-stack engineer and DevOps enthusiast
          </h2>
          <div className="flex sm:flex-row flex-col-reverse sm:items-center items-start gap-x-4 gap-y-4 mt-4">
            <Button asChild>
              <a href="mailto:thomasbach.contact@gmail.com">
                <Mail className="mr-2 h-4 w-4" />
                Get in touch
              </a>
            </Button>
            <Socials />
          </div>
        </div>
      </div>
    </>
  );
}
