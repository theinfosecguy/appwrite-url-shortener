import { useState } from "react";
import api from "../../api/api";
import { FetchState } from "../../hooks";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import "../../components/index.css";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

const Login = ({ dispatch }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch({ type: FetchState.FETCH_INIT });
      try {
        await api.createSession(email, password);
        const data = await api.getAccount();
        dispatch({ type: FetchState.FETCH_SUCCESS, payload: data });
      } catch (e) {
        dispatch({ type: FetchState.FETCH_FAILURE });
      }
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <>
      <div class="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-screen">
        <div class="max-w-lg mx-auto text-center">
          <h1 class="text-2xl font-bold sm:text-3xl">Welcome Back!</h1>

          <p class="mt-4 text-gray-500">
            Sign in to your account to get started with StormURL.
          </p>
        </div>

        <form
          class="max-w-md mx-auto mt-8 mb-0 space-y-4"
          onSubmit={handleLogin}
        >
          <div className="focus:outline-none">
            <label for="email" class="sr-only">
              Email
            </label>

            <div class="relative">
              <input
                type="email"
                class="focus:outline-none w-[400px] lg:w-[430px] md:w-[430px] sm:w-[420px] p-4 pr-12 text-sm border-black-300 rounded-lg shadow-sm"
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
                class="focus:outline-none w-[400px] lg:w-[430px] md:w-[430px] sm:w-[420px] p-4 pr-12 text-sm rounded-lg shadow-sm"
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
              onClick={() => history.push("/register")}
            >
              No account?{" "}
              <span class="underline" onClick={() => history.push("/register")}>
                Sign up
              </span>
            </p>

            <button
              type="submit"
              disabled={!email || !password}
              onClick={handleLogin}
              class="font-medium text-white bg-orange-custom inline-block px-5 py-3 ml-3 text-sm font-medium text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sign in
            </button>
          </div>
        </form>
        <span
          className="absolute inset-y-0 left-7 top-7 cursor-pointer"
          onClick={() => history.push("/")}
        >
          <BsFillArrowLeftCircleFill
            class="h-6 w-6 text-gray-400"
            fill="#ff7a00"
          />
        </span>
      </div>
    </>
  );
};

export default Login;
