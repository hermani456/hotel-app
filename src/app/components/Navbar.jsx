"use client";
import React from "react";
import { useRef } from "react";
import logo  from "../../../public/next.svg";
import Image from "next/image";
import Link from "next/link";
import { navItems } from "@/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const ref = useRef(null);
  
  return (
    <nav className="bg-text">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-5">
        <div className="">
          <Image src={logo} alt="logo" width={125} className="m-0 p-0" />
        </div>
        <button
          type="button"
          onClick={toggleMenu}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        {/* <div>YME</div> */}
        <div
          ref={ref}
          className={`w-full md:block md:w-auto mb-5 ${
            isMenuOpen ? "block" : "hidden"
          }`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:border-0">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  className="block py-2 px-3 text-white rounded hover:bg-gray-500 md:hover:bg-transparent md:hover:text-primary md:border-0 md:p-0 "
                  href={item.path}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
