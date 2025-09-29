import { Link } from "next-view-transitions";

const NotFound = () => {
  return (
    <main className="relative">
      <div className="w-screen h-svh flex justify-center items-center z-10">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-medium text-center">404 — Not found</h1>
          <p className="text-neutral-700 max-w-xl text-center mt-4">
            We don't have this page, go to the{" "}
            <Link className="font-semibold hover:font-bold" href="/">
              home page?
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
