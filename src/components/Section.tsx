import { PropsWithChildren, ReactNode } from "react";

interface SectionProps {
  title: string;
  intro: string;
  children: ReactNode;
  className?: string;
}

export default function Section(props: PropsWithChildren<SectionProps>) {
  return (
    <>
      <div className={props.className}>
        <h2 className={"text-4xl font-bold text-zinc-800 text-balance"}>
          {props.title}
        </h2>
        <p className="mt-6">{props.intro}</p>
        <div className="mt-12">{props.children}</div>
      </div>
    </>
  );
}
