import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AngularLogo from "@/assets/skills/angular.svg?react";
import ReactLogo from "@/assets/skills/react.svg?react";
import TypescriptLogo from "@/assets/skills/typescript.svg?react";
import CssLogo from "@/assets/skills/css.svg?react";
import JavaLogo from "@/assets/skills/java.svg?react";
import SpringBootLogo from "@/assets/skills/spring-boot.svg?react";
import PythonLogo from "@/assets/skills/python.svg?react";
import PostgreSqlLogo from "@/assets/skills/postgresql.svg?react";
import GitLogo from "@/assets/skills/git.svg?react";
import LinuxLogo from "@/assets/skills/linux.svg?react";
import GitlabCiLogo from "@/assets/skills/gitlab-ci.svg?react";
import DockerLogo from "@/assets/skills/docker.svg?react";
import AwsLogo from "@/assets/skills/aws.svg?react";
import TerraformLogo from "@/assets/skills/terraform.svg?react";
import UnityLogo from "@/assets/skills/unity.svg?react";
import { Fragment } from "react";
import { motion } from "framer-motion";

interface SkillProps {
  name: string;
  Logo: any;
}

const skills: SkillProps[] = [
  {
    name: "Angular",
    Logo: AngularLogo,
  },
  {
    name: "React",
    Logo: ReactLogo,
  },
  {
    name: "Typescript",
    Logo: TypescriptLogo,
  },
  {
    name: "CSS",
    Logo: CssLogo,
  },
  {
    name: "Java",
    Logo: JavaLogo,
  },
  {
    name: "Spring Boot",
    Logo: SpringBootLogo,
  },
  {
    name: "Python",
    Logo: PythonLogo,
  },
  {
    name: "PostgreSQL",
    Logo: PostgreSqlLogo,
  },
  {
    name: "Git",
    Logo: GitLogo,
  },
  {
    name: "Linux",
    Logo: LinuxLogo,
  },
  {
    name: "GitLab CI",
    Logo: GitlabCiLogo,
  },
  {
    name: "Docker",
    Logo: DockerLogo,
  },
  {
    name: "AWS",
    Logo: AwsLogo,
  },
  {
    name: "Terraform",
    Logo: TerraformLogo,
  },
  {
    name: "Unity",
    Logo: UnityLogo,
  },
];

export default function SkillGrid() {
  return (
    <>
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-8">
        {skills.map(({ name, Logo }, i) => (
          <Fragment key={name}>
            <motion.div
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: "all" }}
            >
              <motion.div
                variants={{
                  offscreen: {
                    opacity: 0,
                  },
                  onscreen: {
                    opacity: 1,
                    transition: {
                      duration: 0.2,
                      delay: i / skills.length,
                      ease: "easeOut",
                    },
                  },
                }}
              >
                <TooltipProvider delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Logo className="w-16 h-16 hover:scale-105 transition duration-150 cursor-default" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.div>
            </motion.div>
          </Fragment>
        ))}
      </div>
    </>
  );
}
