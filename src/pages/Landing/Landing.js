import { useHistory } from "react-router-dom";

const Landing = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/urls");
  };

  return (
    <>
      <section class="bg-gray-50">
        <div class="max-w-screen-xl px-4 py-32 mx-auto lg:h-screen lg:items-center lg:flex">
          <div class="max-w-xl mx-auto text-center">
            <h1 class="text-3xl font-extrabold sm:text-5xl">
              Shorten Your Links
              <strong class="font-extrabold text-red-700 sm:block">
                {" "}
                with StormURL
              </strong>
            </h1>

            <p class="mt-4 sm:leading-relaxed sm:text-xl">
              StormURL is an open source URL shortener that allows you to create
              a short URL for your long links.
            </p>

            <div class="flex flex-wrap justify-center gap-4 mt-8">
              <a
                class="block w-full px-12 py-3 text-sm font-medium text-white bg-red-600 rounded shadow sm:w-auto active:bg-red-500 hover:bg-red-700 focus:outline-none focus:ring"
                href="/urls"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Landing;
