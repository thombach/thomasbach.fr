export default function PageTitle({ children }: { children: string }) {
  return (
    <h1 className={"text-4xl font-bold text-zinc-800 text-balance"}>
      {children}
    </h1>
  );
}
