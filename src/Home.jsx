import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#f6881f]/20 via-white to-[#e47716]/20 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full text-center bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-10 md:p-16">
        {/* Logo / Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#f6881f] mb-6">
          Biz Axis UAE
        </h1>

        {/* Tagline */}
        <p className="text-gray-700 text-lg md:text-xl mb-10 leading-relaxed">
          Empowering UAE Businesses with <span className="font-semibold">Smart Solutions</span>. <br />
          Professional accounting, tax, and business consultancy services tailored for UAE businesses to ensure compliance, growth, and success.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link
            to="/insert"
            className="rounded-xl bg-[#f6881f] text-white py-3 px-8 md:py-4 md:px-10 text-sm md:text-base font-semibold hover:bg-[#e47716] hover:scale-105 transition transform"
          >
            Add Post
          </Link>

          <Link
            to="/show"
            className="rounded-xl bg-white border border-[#f6881f] text-[#f6881f] py-3 px-8 md:py-4 md:px-10 text-sm md:text-base font-semibold hover:bg-[#f6881f] hover:text-white hover:scale-105 transition transform"
          >
            Show Posts
          </Link>
        </div>
      </div>
    </div>
  );
}
