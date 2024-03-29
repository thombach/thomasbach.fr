import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { motion } from "framer-motion";

export interface ProjectProps {
  id: number;
  name: string;
  description: string;
  tags: string[];
}

const variants = {
  offscreen: {
    y: 500,
  },
  onscreen: {
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export default function ProjectCard(props: ProjectProps) {
  return (
    <>
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.div variants={variants}>
          <Link to={"projects/" + props.id}>
            <Card className="hover:bg-accent hover:cursor-pointer">
              <CardHeader>
                <CardTitle>{props.name}</CardTitle>
                <CardDescription>{props.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Skeleton className="aspect-video" />
              </CardContent>
              <CardFooter className="flex gap-x-2">
                {props.tags.map((tag) => (
                  <Badge variant={"secondary"} key={tag}>
                    {tag}
                  </Badge>
                ))}
              </CardFooter>
            </Card>
          </Link>
        </motion.div>
      </motion.div>
    </>
  );
}
