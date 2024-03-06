import PageTitle from "@/components/PageTitle";

export default function About() {
  return (
    <>
      <div className="flex md:flex-row flex-col mt-32 gap-x-12 gap-y-12 items-center justify-center">
        <div>
          <PageTitle>Hi, I'm Thomas 👋</PageTitle>
          <p className="mt-6">
            I'm a full stack developer based in{" "}
            <a
              className="underline underline-offset-4 hover:text-primary"
              href="https://maps.app.goo.gl/PaH5w7rDeEq1XW7r9"
            >
              Lyon, France.
            </a>{" "}
            I have an engineering degree in computer science from Polytech
            Grenoble. I enjoy programming, making and playing video games,
            hiking, and volleyball. When I’m not at home building projects with
            Twitch playing in the background, I'm probably chilling on a
            mountain with a cup of coffee.
          </p>
          <p className="mt-4">
            I started working in full-stack development because it's a field
            that offers diverse projects combining creativity and technical
            skills. I enjoy building tools that will make people's lives easier
            and optimize their work. To tackle this challenge most effectively,
            automation and designing suitable architecture are the keys. That's
            why DevOps and Cloud technologies also interest me greatly.
          </p>
          <p className="mt-4">
            I've always enjoyed learning new things, regardless of the subject,
            as long as it interests me. This habit helps me grasp the big
            picture and fulfill the requirements of my projects.
          </p>
        </div>
        <img
          src="./src/assets/thomas-mountains.jpg"
          alt="Thomas in the mountains"
          className="size-72 object-cover rounded-3xl aspect-square"
        />
      </div>
    </>
  );
}
