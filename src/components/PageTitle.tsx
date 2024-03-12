import { ReactNode } from "react";

export default function PageTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className={"text-4xl font-bold text-slate-700 text-balance"}>
      {children}
    </h1>
  );
}
