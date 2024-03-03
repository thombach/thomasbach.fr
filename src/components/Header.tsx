import { Navigation } from "./Navigation";

export default function Header() {
  return (
    <>
      <header className="flex flex-1 justify-center pt-6 z-50 sticky top-0">
        <Navigation />
      </header>
    </>
  );
}
