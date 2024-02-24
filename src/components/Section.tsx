import { PropsWithChildren, ReactNode } from "react";

interface SectionProps {
  title: string;
  intro: string;
  children: ReactNode;
}

export default function Section(props: PropsWithChildren<SectionProps>) {
  return (
    <>
      <h2 className={"text-4xl font-bold text-zinc-800 text-balance"}>
        {props.title}
      </h2>
      <p className="mt-6">{props.intro}</p>
      {props.children}
    </>
  );
}
