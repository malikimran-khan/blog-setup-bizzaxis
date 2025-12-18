import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function BlogDetail() {
  const location = useLocation();
  const { postId } = location.state || {};
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (postId) {
      fetchPost(postId);
    }
  }, [postId]);

  const fetchPost = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://bizzaxis-backend.vercel.app/api/posts/${id}`);
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

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold text-[#f6881f] mb-6">{post.title}</h1>
      <img
        src={post.image || "https://via.placeholder.com/800x400"}
        alt={post.title}
        className="w-full h-96 object-cover rounded-xl mb-6"
      />
      <p className="text-gray-700 text-lg leading-relaxed">{post.description}</p>
    </div>
  );
}
