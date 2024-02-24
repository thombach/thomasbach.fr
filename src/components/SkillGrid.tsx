import Skill, { SkillProps } from "./Skill";

const skills: SkillProps[] = [
  {
    name: "aws",
    src: "",
  },
  {
    name: "react",
    src: "",
  },
  {
    name: "angular",
    src: "",
  },
  {
    name: "unity",
    src: "",
  },
  {
    name: "spring boot",
    src: "",
  },
  {
    name: "postgresql",
    src: "",
  },
  {
    name: "linux",
    src: "",
  },
];

export default function SkillGrid() {
  return (
    <>
      <ul className="flex flex-wrap justify-center gap-x-4 gap-y-4">
        {skills.map((skill) => (
          <Skill {...skill} key={skill.name} />
        ))}
      </ul>
    </>
  );
}
