import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export interface SkillProps {
  name: string;
  src: string;
}

export default function Skill(props: SkillProps) {
  return (
    <>
      <Avatar className="w-24 h-24">
        <AvatarImage src={props.src} />
        <AvatarFallback>{props.name}</AvatarFallback>
      </Avatar>
    </>
  );
}
