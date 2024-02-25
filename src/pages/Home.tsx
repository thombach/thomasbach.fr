import "./Home.css";
import Hello from "@/components/Hello";
import ProjectGrid from "@/components/ProjectGrid";
import Section from "@/components/Section";
import SkillGrid from "@/components/SkillGrid";

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
        <Section
          className="mt-16"
          title="Skills"
          intro="Tools, frameworks and languages I use the most in my job or in my personal projects."
        >
          <SkillGrid />
        </Section>
      </main>
    </>
  );
}
