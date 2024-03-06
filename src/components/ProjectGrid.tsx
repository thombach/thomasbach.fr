import ProjectCard, { ProjectProps } from "./ProjectCard";

const projects: ProjectProps[] = [
  {
    id: 1,
    name: "Project 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores voluptatem rem nulla quam iste expedita repudiandae sequi",
    tags: ["React", "AWS", "Spring Boot"],
  },
  {
    id: 2,
    name: "Project 2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores voluptatem rem nulla quam iste expedita repudiandae sequi",
    tags: ["React", "AWS", "Spring Boot"],
  },
  {
    id: 3,
    name: "Project 3",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores voluptatem rem nulla quam iste expedita repudiandae sequi",
    tags: ["React", "AWS", "Spring Boot"],
  },
  {
    id: 4,
    name: "Project 4",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores voluptatem rem nulla quam iste expedita repudiandae sequi",
    tags: ["React", "AWS", "Spring Boot"],
  },
  {
    id: 5,
    name: "Project 5",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores voluptatem rem nulla quam iste expedita repudiandae sequi",
    tags: ["React", "AWS", "Spring Boot"],
  },
];

export default function ProjectGrid() {
  return (
    <>
      <ul className="grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard {...project} key={project.name} />
        ))}
      </ul>
    </>
  );
}
