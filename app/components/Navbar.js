"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const shownav = ["/", "/generate","/login","/signup","/password"].includes(pathname);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {shownav && (
        <nav className="bg-white p-4 flex justify-between fixed text-black w-[90vw] lg:w-[80vw] right-[5vw] lg:right-[10vw] rounded-full mx-auto shadow-lg z-50">
          {/* Logo and Main Links */}
          <div className="flex items-center gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="text-xl lg:text-2xl font-bold">LinkTree</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-6 lg:h-8 ml-2"
              >
                <path d="M13.511 5.853l4.005-4.117 2.325 2.381-4.201 4.005h5.909v3.305h-5.937l4.229 4.108-2.325 2.334-5.741-5.769-5.741 5.769-2.325-2.325 4.229-4.108H2V8.122h5.909L3.708 4.117l2.325-2.381 4.005 4.117V0h3.473v5.853zM10.038 16.16h3.473v7.842h-3.473V16.16z"></path>
              </svg>
            </Link>

            {/* Navigation Links - Hidden on Small Screens */}
            <ul className="hidden lg:flex mx-4 gap-4 items-center">
              <li>
                <Link href="/templates">Templates</Link>
              </li>
              <li>
                <Link href="/marketplace">Marketplace</Link>
              </li>
              <li>
                <Link href="/discover">Discover</Link>
              </li>
              <li>
                <Link href="/pricing">Pricing</Link>
              </li>
              <li>
                <Link href="/learn">Learn</Link>
              </li>
            </ul>
          </div>

          {/* Log In and Sign Up Buttons */}
          <div className="hidden lg:flex gap-2 font-bold items-center">
            <Link href="/login">
              <button className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300">
                Log In
              </button>
            </Link>
            <Link href="/signup">
              <button className="bg-gray-900 rounded-3xl px-4 py-2 text-white hover:bg-gray-800">
                Sign Up
              </button>
            </Link>
          </div>

          {/* Hamburger Menu - Visible on Small Screens */}
          <div
            className="lg:hidden flex items-center cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="space-y-1">
              <div className="w-6 h-0.5 bg-black"></div>
              <div className="w-6 h-0.5 bg-black"></div>
              <div className="w-6 h-0.5 bg-black"></div>
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="absolute top-[70px] right-4 bg-white rounded-lg shadow-md p-4 flex flex-col gap-2 w-[80vw] sm:w-[60vw] text-center lg:hidden z-40">
              <ul className="flex flex-col gap-2">
                <li>
                  <Link href="/templates" onClick={() => setMenuOpen(false)}>
                    Templates
                  </Link>
                </li>
                <li>
                  <Link href="/marketplace" onClick={() => setMenuOpen(false)}>
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link href="/discover" onClick={() => setMenuOpen(false)}>
                    Discover
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" onClick={() => setMenuOpen(false)}>
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/learn" onClick={() => setMenuOpen(false)}>
                    Learn
                  </Link>
                </li>
              </ul>
              <div className="flex flex-col gap-2 mt-4">
                <button className="bg-gray-200 px-4 py-2 rounded-lg">
                  Log In
                </button>
                <button className="bg-gray-900 rounded-lg px-4 py-2 text-white">
                  Sign Up
                </button>
              </div>
            </div>
          )}
        </nav>
      )}
    </>
  );
};

export default Navbar;
