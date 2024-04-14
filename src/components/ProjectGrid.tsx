import { useEffect, useState } from "react";
import ProjectCard, { ProjectCardProps } from "./ProjectCard";
import axios from "axios";
import ProjectCardSkeleton from "./ProjectCardSkeleton";

export default function ProjectGrid() {
  const [projects, setProjects] = useState<ProjectCardProps[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    getAllProjects();
  }, []);

  const getAllProjects = async () => {
    try {
      const response = await axios.get(`${API_URL}/projects`);
      const projects: ProjectCardProps[] = response.data;
      setProjects(projects);
    } catch (error) {
      console.error("Error fetching projects: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ul className="grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {!loading
          ? projects.map((project) => (
              <ProjectCard {...project} key={project.id} />
            ))
          : Array.from(Array(6), (_, index) => (
              <ProjectCardSkeleton key={index} />
            ))}
      </ul>
    </>
  );
}
