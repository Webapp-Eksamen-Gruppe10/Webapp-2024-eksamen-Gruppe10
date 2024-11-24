"use client";

import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="">
      <header className="bg-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-white text-lg font-bold">
                Gruppe 10
              </Link>
            </div>

            {/* selve nav for pc skjermer */}
            <nav className="hidden md:flex space-x-6 items-center">
              <Link href="/" className="text-white hover:text-gray-200">
                Home
              </Link>
              <Link href="/events" className="text-white hover:text-gray-200">
                Events
              </Link>


              {/* dropdown meny for admin i nav for pc skjermer */}
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="text-white hover:text-gray-200 focus:outline-none"
                >
                  Admin
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg w-48 z-10">
                    <Link
                      href="/admin/events"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                    >
                      Events
                    </Link>
                    <Link
                      href="/admin/statistics"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                    >
                      Statistics
                    </Link>
                  </div>
                )}
              </div>
            </nav>

            {/* hamburger menu for mobil brukere */}
            <div className="md:hidden">
              <button
                type="button"
                className="text-white focus:outline-none"
                onClick={toggleMenu}
              >
                {isMenuOpen ? (
                  <span>&#x2715; {/* lukke icon gjennom heksacode (dette er html og IKKE fra ui biblotek)*/}</span>
                ) : (
                  <span>&#9776; {/* hamburger ikon gjennom heksacode (dette er html og IKKE fra ui biblotek)*/}</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Meny */}
        {isMenuOpen && (
          <div className="md:hidden bg-blue-700">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/"
                className="block px-3 py-2 text-white hover:bg-blue-500 rounded-md"
              >
                Home
              </Link>
              <Link
                href="/events"
                className="block px-3 py-2 text-white hover:bg-blue-500 rounded-md"
              >
                Events
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-white hover:bg-blue-500 rounded-md"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-white hover:bg-blue-500 rounded-md"
              >
                Contact
              </Link>

              {/* Dropdown Meny for Mobil */}
              <div className="mt-2">
                <button
                  onClick={toggleDropdown}
                  className="block w-full text-left px-3 py-2 text-white hover:bg-blue-500 rounded-md"
                >
                  Admin
                </button>
                {isDropdownOpen && (
                  <div className="ml-4 mt-2 space-y-1 bg-white rounded-md shadow-lg">
                    <Link
                      href="/admin/events"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Events
                    </Link>
                    <Link
                      href="/admin/statistics"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Statistics
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;
