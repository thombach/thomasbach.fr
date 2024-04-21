import PageTitle from "@/components/PageTitle";
import ProjectError from "@/components/ProjectError";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export interface ProjectDetailsProps {
  id: number;
  title: string;
  content: string;
  tags: string[];
  s3Url: string;
  videoUrl: string;
  seeMore: string;
}

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState<ProjectDetailsProps>();
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<Boolean>(false);
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
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {!loading && !error && project && (
        <div>
          <PageTitle>{project.title}</PageTitle>
          <div className="flex gap-x-2 mt-3">
            {project.tags.map((tag) => (
              <Badge variant={"secondary"} key={tag}>
                {tag}
              </Badge>
            ))}
          </div>
          {project.videoUrl ? (
            <iframe
              className="w-full lg:w-[48rem] aspect-video object-cover mt-8"
              src={project.videoUrl}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <motion.img
              className="w-full lg:w-[48rem] aspect-video object-cover mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
              src={project.s3Url}
            />
          )}

          <div
            className="mt-8"
            dangerouslySetInnerHTML={{ __html: project.content }}
          ></div>
        </div>
      )}
      {loading && (
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
      {error && <ProjectError />}
      <div className="flex mt-8 gap-x-4">
        <Button variant={"secondary"} asChild>
          <HashLink smooth to="/#projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to projects
          </HashLink>
        </Button>
        {project?.seeMore && (
          <Button>
            <Link to={project?.seeMore} className="flex items-center">
              <ExternalLink className="mr-2 h-4 w-4" />
              See more
            </Link>
          </Button>
        )}
      </div>
    </>
  );
}
