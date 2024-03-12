import PageTitle from "@/components/PageTitle";
import { ProjectProps } from "@/components/ProjectCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { useParams } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export default function ProjectDetails() {
  const { id } = useParams();
  const project: ProjectProps = {
    id: 1,
    name: "Project",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt natus in modi sunt temporibus quasi dolorum, aspernatur, pariatur necessitatibus ad provident ab est amet voluptate. Blanditiis corrupti veritatis odit rem.",
    tags: ["React", "AWS", "Spring Boot"],
  };
  return (
    <>
      <PageTitle>{project.name}</PageTitle>
      <div className="flex gap-x-2 mt-3">
        {project.tags.map((tag) => (
          <Badge variant={"secondary"} key={tag}>
            {tag}
          </Badge>
        ))}
      </div>
      <Skeleton className="w-full md:w-[32rem] aspect-video object-cover mt-8" />
      <p className="mt-8">{project.description}</p>
      <Button variant={"secondary"} asChild className="mt-8">
        <HashLink smooth to="/#projects">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to projects
        </HashLink>
      </Button>
    </>
  );
}
