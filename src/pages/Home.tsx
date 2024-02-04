import { Button } from "@/components/ui/button";
import "./Home.css";
import { CornerDownRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className="flex flex-row justify-center gap-x-8">
        <img
          className="w-48 sm:w-48 rounded-3xl aspect-square"
          src="profile-photo.jpg"
          alt="Thomas Bach's profile photo"
        />
        <div className="flex flex-col justify-center text-left">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 text-balance">
            Hello, I'm Thomas Bach
          </h1>
          <h2 className="text-2xl tracking-tight text-zinc-500 text-balance">
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
    </>
  );
}
