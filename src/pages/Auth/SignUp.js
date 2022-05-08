import { useState } from "react";
import api from "../../api/api";
import { FetchState } from "../../hooks";
import { BsPersonCircle } from "react-icons/bs";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useHistory } from "react-router-dom";

const SignUp = ({ dispatch }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const history = useHistory();

  const handleSignup = async (e) => {
    console.log("handleSignup");
    e.preventDefault();
    dispatch({ type: FetchState.FETCH_INIT });
    try {
      const user = await api.createAccount(email, password, name);
      await api.createSession(email, password);
      dispatch({ type: FetchState.FETCH_SUCCESS, payload: user });
    } catch (e) {
      dispatch({ type: FetchState.FETCH_FAILURE });
    }
  };

  return (
    <>
      <div class="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-screen">
        <div class="max-w-lg mx-auto text-center">
          <h1 class="text-2xl font-bold sm:text-3xl">Get Started</h1>

          <p class="mt-4 text-gray-500">
            Sign up to get started with StormURL.
          </p>
        </div>

        <form
          class="max-w-md mx-auto mt-8 mb-0 space-y-4"
          onSubmit={handleSignup}
        >
          <div>
            <label for="name" class="sr-only">
              Name
            </label>

            <div class="relative">
              <input
                type="text"
                class="w-[400px] p-4 pr-12 text-sm border-black-300 rounded-lg shadow-sm"
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
              />

              <span class="absolute inset-y-0 inline-flex items-center right-4">
                <BsPersonCircle class="h-6 w-6 text-gray-400" />
              </span>
            </div>
          </div>

          <div>
            <label for="email" class="sr-only">
              Email
            </label>

            <div class="relative">
              <input
                type="email"
                class="w-[400px] p-4 pr-12 text-sm border-black-300 rounded-lg shadow-sm"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <span class="absolute inset-y-0 inline-flex items-center right-4">
                <MdOutlineAlternateEmail class="h-6 w-6 text-gray-400" />
              </span>
            </div>
          </div>

          <div>
            <label for="password" class="sr-only">
              Password
            </label>
            <div class="relative">
              <input
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                class="w-[400px] p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder="Enter password"
              />

              <span class="absolute inset-y-0 inline-flex items-center right-4">
                {showPassword ? (
                  <AiFillEyeInvisible
                    class="h-6 w-6 text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <AiFillEye
                    class="h-6 w-6 text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </span>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <p
              class="text-sm text-gray-500 cursor-pointer"
              onClick={() => history.push("/login")}
            >
              Already have an account?{" "}
              <span class="underline" onClick={() => history.push("/login")}>
                Sign in
              </span>
            </p>

            <button
              type="submit"
              disabled={!name || !email || !password}
              onClick={handleSignup}
              class="font-medium text-white bg-red-600 inline-block px-5 py-3 ml-3 text-sm font-medium text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
