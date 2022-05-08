import React from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { useGetUser } from "../hooks/index";
import { useHistory } from "react-router-dom";
import Logo from "../assets/svg/logo.svg";

function Navbar({ handleLogout }) {
  const [{ user, isLoading, isError }, dispatch] = useGetUser();
  const history = useHistory();

  return (
    <header class="shadow-sm">
      <div class="max-w-screen-xl p-4 mx-auto">
        <div class="flex items-center justify-between space-x-4 lg:space-x-10">
          <div class="flex lg:w-0 lg:flex-1">
            <img src={Logo} alt="logo" className="h-10 w-10" />
          </div>

          <nav class="hidden space-x-8 text-sm font-medium md:flex">
            <a class="text-gray-500" href="">
              About
            </a>
            <a class="text-gray-500" href="">
              Blog
            </a>
            <a class="text-gray-500" href="">
              Projects
            </a>
            <a class="text-gray-500" href="">
              Contact
            </a>
          </nav>

          <div class="items-center justify-end flex-1 hidden space-x-4 sm:flex">
            {!user ? (
              <>
                <button
                  class="px-5 py-2 text-sm font-medium text-gray-500 bg-gray-100 rounded-lg"
                  onClick={() => history.push("/login")}
                >
                  Log in
                </button>

                <a
                  class="px-5 py-2 text-sm font-medium text-white bg-red-600 rounded-lg"
                  onClick={() => history.push("/register")}
                >
                  Sign up
                </a>
              </>
            ) : (
              <button
                class="px-5 py-2 text-sm font-medium text-white bg-red-600 rounded-lg cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>

          <div class="lg:hidden">
            <button
              class="p-2 text-gray-600 bg-gray-100 rounded-lg"
              type="button"
            >
              <span class="sr-only">Open menu</span>
              <HiMenuAlt3 className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
