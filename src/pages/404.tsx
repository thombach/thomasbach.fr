import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <div className="flex flex-col pt-16 pb-12">
        <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8">
          <div className="py-16">
            <div className="text-center">
              <h1 className="text-4xl font-semibold text-primary">404</h1>
              <PageTitle>Page not found</PageTitle>
              <p className="mt-2 text-base">
                Sorry, the page you are looking for doesn't exist.
              </p>
              <Button variant={"secondary"} className="mt-6" asChild>
                <Link to="/">
                  <HomeIcon className="mr-2 h-4 w-4" />
                  Go back home
                </Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
