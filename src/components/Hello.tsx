import { CornerDownRight } from "lucide-react";
import { Button } from "./ui/button";

export default function Hello() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen w-full">
        <div className="flex md:flex-row flex-col justify-center md:gap-x-8 gap-y-8">
          <img
            className="w-64 rounded-3xl aspect-square"
            src="profile-photo.jpg"
            alt="Thomas Bach's profile photo"
          />
          <div className="flex flex-col justify-center text-left">
            <h1 className="text-5xl font-bold text-zinc-800">
              Hello, I'm <span className="text-primary">Thomas Bach</span>
            </h1>
            <h2 className="text-3xl text-zinc-500 tracking-tight">
              Software engineer and DevOps enthusiast
            </h2>
            <div>
              <Button className="mt-4">
                <CornerDownRight className="mr-2 h-4 w-4" />
                Projects
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
