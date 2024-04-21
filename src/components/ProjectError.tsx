import PageTitle from "@/components/PageTitle";

export default function ProjectError() {
  return (
    <>
      <div className="flex flex-col pt-16 pb-12">
        <div className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8">
          <div className="py-16">
            <div className="text-center">
              <h1 className="text-4xl font-semibold text-primary">Oops</h1>
              <PageTitle>Project error</PageTitle>
              <p className="mt-2 text-base">
                Sorry, an error occurred when fetching the project.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
