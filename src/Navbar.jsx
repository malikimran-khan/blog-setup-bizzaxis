import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo + Text */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/vite.png" // Replace with your BizAxis logo path
            alt="BizAxis Logo"
            className="h-10 w-auto"
          />
          <span className="text-2xl font-bold text-[#f6881f] hover:text-[#e47716] transition duration-300">
            BizAxis
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="relative text-gray-800 font-semibold text-lg hover:text-[#f6881f] transition duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#f6881f] after:transition-all after:duration-300 hover:after:w-full"
          >
            Home
          </Link>

          <Link
            to="/insert"
            className="relative text-gray-800 font-semibold text-lg hover:text-[#f6881f] transition duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#f6881f] after:transition-all after:duration-300 hover:after:w-full"
          >
            Add
          </Link>

          <Link
            to="/show"
            className="relative text-gray-800 font-semibold text-lg hover:text-[#f6881f] transition duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#f6881f] after:transition-all after:duration-300 hover:after:w-full"
          >
            Show
          </Link>

          <a
            href="https://bizaxis.net"
            target="_blank"
            rel="noopener noreferrer"
            className="relative text-gray-800 font-semibold text-lg hover:text-[#f6881f] transition duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#f6881f] after:transition-all after:duration-300 hover:after:w-full"
          >
            BizAxis
          </a>
        </div>
      </div>
    </nav>
  );
}
