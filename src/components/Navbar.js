import React from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { useGetUser } from "../hooks/index";
import { useHistory } from "react-router-dom";
import Logo from "../assets/svg/logo.svg";

function Navbar({ handleLogout }) {
  const [{ user, isLoading, isError }, dispatch] = useGetUser();
  const history = useHistory();

  return (
    <header className="shadow-sm">
      <div className="max-w-screen-xl p-4 mx-auto">
        <div className="flex items-center justify-between space-x-4 lg:space-x-10">
          <div className="flex lg:w-0 lg:flex-1">
            <a href="/">
              <img src={Logo} alt="logo" classNameName="h-10 w-10" />
            </a>
          </div>

          <nav className="hidden space-x-8 text-sm font-medium md:flex">
            <a
              className="text-gray-500"
              href="https://theinfosecguy.xyz"
              target="_blank"
              rel="noopener noreferrer"
            >
              About
            </a>
            <a
              className="text-gray-500"
              href="https://github.com/theinfosecguy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Projects
            </a>
            <a className="text-gray-500" href="mailto:hello@theinfosecguy.xyz">
              Contact
            </a>
          </nav>

          <div className="items-center justify-end flex-1 hidden space-x-4 sm:flex">
            {!user ? (
              <>
                <button
                  className="px-5 py-2 text-sm font-medium text-gray-500 bg-gray-100 rounded-lg"
                  onClick={() => history.push("/login")}
                >
                  Log in
                </button>

                <a
                  className="px-5 py-2 text-sm font-medium text-white bg-orange-custom rounded-lg"
                  onClick={() => history.push("/register")}
                >
                  Sign up
                </a>
              </>
            ) : (
              <button
                className="px-5 py-2 text-sm font-medium text-white bg-red-600 rounded-lg cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>

          <div className="lg:hidden">
            <button
              className="p-2 text-gray-600 bg-gray-100 rounded-lg"
              type="button"
            >
              <span className="sr-only">Open menu</span>
              <HiMenuAlt3 classNameName="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
