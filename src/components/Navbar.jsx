import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated, logout } = useAuth();

    const toggleMenu = () => setIsOpen(!isOpen);

    const links = [
        { name: "Home", path: "/" },
        { name: "Add", path: "/insert" },
        { name: "Show", path: "/show" },
        { name: "BizAxis", path: "https://bizaxis.net", external: true },
    ];

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

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {links.map((link) =>
                        link.external ? (
                            <a
                                key={link.name}
                                href={link.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative text-gray-800 font-semibold text-lg hover:text-[#f6881f] transition duration-300 
                after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#f6881f] 
                after:transition-all after:duration-300 hover:after:w-full"
                            >
                                {link.name}
                            </a>
                        ) : (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="relative text-gray-800 font-semibold text-lg hover:text-[#f6881f] transition duration-300 
                after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#f6881f] 
                after:transition-all after:duration-300 hover:after:w-full"
                            >
                                {link.name}
                            </Link>
                        )
                    )}
                    {isAuthenticated && (
                        <button
                            onClick={logout}
                            className="bg-[#f6881f] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#e47716] transition"
                        >
                            Logout
                        </button>
                    )}
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden flex items-center gap-4">
                    {isAuthenticated && (
                        <button
                            onClick={logout}
                            className="bg-[#f6881f] text-white px-3 py-1 text-sm rounded-lg font-semibold hover:bg-[#e47716] transition"
                        >
                            Logout
                        </button>
                    )}
                    <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
                        {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white px-6 pb-4">
                    {links.map((link) =>
                        link.external ? (
                            <a
                                key={link.name}
                                href={link.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block py-2 text-gray-800 font-semibold text-lg hover:text-[#f6881f] transition duration-300"
                            >
                                {link.name}
                            </a>
                        ) : (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className="block py-2 text-gray-800 font-semibold text-lg hover:text-[#f6881f] transition duration-300"
                            >
                                {link.name}
                            </Link>
                        )
                    )}
                </div>
            )}
        </nav>
    );
}
