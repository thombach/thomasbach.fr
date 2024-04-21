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

export interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  completionDate: Date;
  tags: string[];
  s3Url: string;
}

export default function ProjectCard(props: ProjectCardProps) {
  return (
    <>
      <Link to={"projects/" + props.id}>
        <Card className="hover:bg-accent hover:cursor-pointer">
          <CardHeader>
            <CardTitle>{props.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{props.description}</CardDescription>
            <img className="aspect-video mt-4" src={props.s3Url} />
          </CardContent>
          <CardFooter className="flex flex-wrap gap-x-2 gap-y-2">
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
