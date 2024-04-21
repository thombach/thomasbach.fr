import { PropsWithChildren, ReactNode } from "react";

interface SectionProps {
  title: string;
  intro?: string;
  id?: string;
  children: ReactNode;
  className?: string;
}

export default function Section(props: PropsWithChildren<SectionProps>) {
  return (
    <>
      <section className={props.className} id={props.id}>
        <h2 className={"text-4xl font-bold text-slate-700 text-balance"}>
          {props.title}
        </h2>
        {props.intro && <p className="mt-6 mb-0">{props.intro}</p>}
        <div className={props.intro ? "mt-12" : "mt-6"}>{props.children}</div>
      </section>
    </>
  );
}
