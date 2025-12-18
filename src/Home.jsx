import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full text-center bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-10">
        {/* Logo */}
        <h1 className="text-4xl font-bold text-[#f6881f] mb-4">
          Biz Axis UAE
        </h1>

        {/* Tagline */}
        <p className="text-gray-700 text-lg mb-8">
          Empowering UAE Businesses with Smart Solutions. <br />
          Professional accounting, tax, and business consultancy services tailored for UAE businesses.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/insert"
            className="rounded-xl bg-[#f6881f] text-white py-3 px-8 text-sm font-semibold hover:bg-[#e47716] transition"
          >
            Add Post
          </Link>
          <Link
            to="/show"
            className="rounded-xl bg-white border border-[#f6881f] text-[#f6881f] py-3 px-8 text-sm font-semibold hover:bg-[#f6881f] hover:text-white transition"
          >
            Show Posts
          </Link>
        </div>
      </div>
    </div>
  );
}
