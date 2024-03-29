import Contact from "@/components/Contact";
import Hello from "@/components/Hello";
import ProjectGrid from "@/components/ProjectGrid";
import Section from "@/components/Section";
import SkillGrid from "@/components/SkillGrid";

export default function Home() {
  return (
    <>
      <Hello />
      <Section
        className="mt-32"
        title="Projects"
        id="projects"
        intro="A collection of projects I've worked on."
      >
        <ProjectGrid />
      </Section>
      <Section
        className="mt-32"
        title="Skills"
        intro="Tools, frameworks and programming languages I use the most in my job and in my personal projects."
      >
        <SkillGrid />
      </Section>
      <Contact className="mt-32" />
    </>
  );
}
