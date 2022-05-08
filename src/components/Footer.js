import React from "react";
import Logo from "../assets/svg/logo.svg";
import { AiFillGithub, AiFillMail } from "react-icons/ai";

function Footer() {
  return (
    <footer className="shadow-sm body-font">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
          <img src={Logo} alt="logo" className="h-10 w-10" />
          <span className="ml-3 text-xl text-black">StormURL</span>
        </a>
        <p className="text-sm text-gray-600 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">
          © {new Date().getFullYear()}
          <a
            href="https://github.com/theinfosecguy/stormurl"
            className="text-gray-600 ml-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            - @theinfosecguy
          </a>
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <a
            className="ml-3 text-gray-800"
            href="https://github.com/theinfosecguy"
          >
            <AiFillGithub size={28} />
          </a>
          <a
            className="ml-3 text-gray-800"
            href="mailto:hello@theinfosecguy.xyz"
          >
            <AiFillMail size={28} />
          </a>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
