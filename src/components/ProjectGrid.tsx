import ProjectCard, { ProjectProps } from "./ProjectCard";

const projects: ProjectProps[] = [];

for (let i = 0; i < 7; i++) {
  projects.push({
    id: i + 1,
    name: "Project " + (i + 1),
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores voluptatem rem nulla quam iste expedita repudiandae sequi",
    tags: ["React", "AWS", "Spring Boot"],
  });
}

export default function ProjectGrid() {
  return (
    <>
      <p>Coming soon...</p>
      {/* <ul className="grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard {...project} key={project.name} />
        ))}
      </ul> */}
    </>
  );
}
