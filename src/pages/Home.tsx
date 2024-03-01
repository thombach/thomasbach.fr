import Contact from "@/components/Contact";
import "./Home.css";
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
        intro="Tools, frameworks and languages I use the most in my job or in my personal projects."
      >
        <SkillGrid />
      </Section>
      <Section className="mt-32" title="Get in touch" id="contact">
        <Contact />
      </Section>
    </>
  );
}
