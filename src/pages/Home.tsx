import "./Home.css";
import Hello from "@/components/Hello";
import ProjectGrid from "@/components/ProjectGrid";
import Section from "@/components/Section";

export default function Home() {
  return (
    <>
      <main>
        <Hello />
        <Section
          title="Projects"
          intro="A collection of projects I've worked on."
        >
          <ProjectGrid />
        </Section>
      </main>
    </>
  );
}
