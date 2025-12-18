import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-extrabold tracking-wide">
          BIZAXIS
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-semibold transition ${
                isActive
                  ? "text-black border-b-2 border-black pb-1"
                  : "text-gray-600 hover:text-black"
              }`
            }
          >
            Insert
          </NavLink>

          <NavLink
            to="/show"
            className={({ isActive }) =>
              `text-sm font-semibold transition ${
                isActive
                  ? "text-black border-b-2 border-black pb-1"
                  : "text-gray-600 hover:text-black"
              }`
            }
          >
            Show
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
