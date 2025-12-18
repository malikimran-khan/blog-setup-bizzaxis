import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

export default function BlogDetail() {
  const location = useLocation();
  const { postId } = location.state || {};
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (postId) fetchPost(postId);
  }, [postId]);

  const fetchPost = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://bizzaxis-backend.vercel.app/api/posts/${id}`
      );
      setPost(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg font-bold text-black">Loading Blog...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg font-bold text-red-600">Blog not found.</p>
      </div>
    );
  }

  // Split description: first 150 characters as intro, rest as main content
  const introText = post.description.slice(0, 150) + (post.description.length > 150 ? "..." : "");
  const mainText = post.description.slice(150);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-16 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Content */}
        <div className="p-8 sm:p-12">
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#f6881f] mb-4">
            {post.title}
          </h1>

          {/* Intro Text */}
          <p className="text-gray-700 text-lg sm:text-xl leading-relaxed mb-6">
            {introText}
          </p>

          {/* Blog Image */}
          <div className="mb-6 rounded-xl shadow-lg overflow-hidden">
            <img
              src={post.image || "https://via.placeholder.com/1200x600"}
              alt={post.title}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Main Text */}
          {mainText && (
            <p className="text-gray-700 text-lg sm:text-xl leading-relaxed mb-8">
              {mainText}
            </p>
          )}

          {/* Back Link */}
          <Link
            to="/show"
            className="inline-block mt-4 rounded-xl bg-[#f6881f] text-white py-3 px-6 font-semibold hover:bg-[#e47716] transition"
          >
            ← Back to Posts
          </Link>
        </div>
      </div>
    </div>
  );
}
