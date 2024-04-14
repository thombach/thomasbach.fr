import PageTitle from "@/components/PageTitle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
  const [loading, setLoading] = useState<Boolean>(true);
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
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {!loading && project ? (
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
        </div>
      ) : (
        <div>
          <Skeleton className="h-[48px] w-[400px] rounded-xl" />
          <Skeleton className="w-full md:w-[32rem] aspect-video object-cover mt-8 rounded-xl" />
          <div className="flex-col space-y-2 mt-8">
            {Array.from(Array(6), (_, index) => (
              <Skeleton className="h-[16px] w-full" key={index} />
            ))}
            <Skeleton className="h-[16px] w-[200px]" />
          </div>
        </div>
      )}
      <Button variant={"secondary"} asChild className="mt-8">
        <HashLink smooth to="/#projects">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to projects
        </HashLink>
      </Button>
    </>
  );
}
