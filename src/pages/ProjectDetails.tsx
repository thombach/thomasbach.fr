import PageTitle from "@/components/PageTitle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export interface ProjectDetailsProps {
  id: number;
  title: string;
  content: string;
  tags: string[];
}

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState<ProjectDetailsProps>();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    getProjectDetails();
  }, []);

  const getProjectDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/projects/${id}`);
      const project: ProjectDetailsProps = response.data;
      setProject(project);
    } catch (error) {
      console.error("Error fetching project details: ", error);
    }
  };
  return (
    <>
      {project && (
        <div>
          <PageTitle>{project.title}</PageTitle>
          <div className="flex gap-x-2 mt-3">
            {project.tags.map((tag) => (
              <Badge variant={"secondary"} key={tag}>
                {tag}
              </Badge>
            ))}
          </div>
          <motion.img
            className="w-full md:w-[32rem] aspect-video object-cover mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
          />
          <p className="mt-8">{project.content}</p>
          <Button variant={"secondary"} asChild className="mt-8">
            <HashLink smooth to="/#projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to projects
            </HashLink>
          </Button>
        </div>
      )}
    </>
  );
}
