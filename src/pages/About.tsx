import Section from "@/components/Section";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";

export default function About() {
  return (
    <>
      <div className="flex flex-row mt-32 gap-x-16">
        <Section title="Hi, I'm Thomas 👋" className="text-base">
          <p>
            I'm a full stack developer based in{" "}
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger>
                  <a className="underline underline-offset-4 hover:text-primary">
                    Lyon, France.
                  </a>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <img
                    src="./src/assets/map.jpg"
                    alt="Map showing Lyon's location"
                    className="w-96 rounded-3xl"
                  />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>{" "}
            I have an engineering degree in computer science from Polytech
            Grenoble. I like programming, making and playing video games, hiking
            and volleyball. I've always enjoyed learning new things, whatever
            the subject as long as it interests me. It helps me see the big
            picture in my projects, which is essential for success.
          </p>
          <p></p>
          <p></p>
        </Section>
        <img
          src="./src/assets/thomas-mountains.jpg"
          alt="Thomas in the mountains"
          className="w-72 h-72 rounded-3xl aspect-square rotate-2"
        />
      </div>
    </>
  );
}
