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

export interface ProjectProps {
  id: number;
  name: string;
  description: string;
  tags: string[];
}

export default function ProjectCard(props: ProjectProps) {
  return (
    <>
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
    </>
  );
}
