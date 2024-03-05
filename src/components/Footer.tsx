import Socials from "@/components/Socials";

export default function Footer() {
  const currentYear = new Date(Date.now()).getFullYear();

  return (
    <>
      <footer className="mt-32 pt-10 pb-16">
        <div className="flex flex-col items-center gap-y-6">
          <div className="flex flex-row gap-x-4">
            <Socials />
          </div>
          <div className="flex flex-col items-center">
            <p>Made by Thomas Bach</p>
            <p>© {currentYear}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
