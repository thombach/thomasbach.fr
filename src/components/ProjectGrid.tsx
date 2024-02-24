import ProjectCard, { ProjectProps } from "./ProjectCard";

const projects: ProjectProps[] = [
  {
    name: "Project 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores voluptatem rem nulla quam iste expedita repudiandae sequi",
    tags: ["React", "AWS", "Spring Boot"],
  },
  {
    name: "Project 2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores voluptatem rem nulla quam iste expedita repudiandae sequi",
    tags: ["React", "AWS", "Spring Boot"],
  },
  {
    name: "Project 3",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores voluptatem rem nulla quam iste expedita repudiandae sequi",
    tags: ["React", "AWS", "Spring Boot"],
  },
  {
    name: "Project 4",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores voluptatem rem nulla quam iste expedita repudiandae sequi",
    tags: ["React", "AWS", "Spring Boot"],
  },
  {
    name: "Project 5",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores voluptatem rem nulla quam iste expedita repudiandae sequi",
    tags: ["React", "AWS", "Spring Boot"],
  },
];

export default function ProjectGrid() {
  return (
    <>
      <ul className="mt-12 grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard {...project} key={project.name} />
        ))}
      </ul>
    </>
  );
}
