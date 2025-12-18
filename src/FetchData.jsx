import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiTrash2, FiRefreshCw } from "react-icons/fi";

export default function FetchData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedPosts, setExpandedPosts] = useState({}); // track read more/less

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch posts from API
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://bizzaxis-backend.vercel.app/api/posts"
      );
      setData(Array.isArray(response.data) ? response.data : []);
      setError("");
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Failed to fetch data. Please check if the server is running.");
    } finally {
      setLoading(false);
    }
  };

  // Delete post
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this post?");
    if (!confirm) return;

    try {
      await axios.delete(`https://bizzaxis-backend.vercel.app/api/posts/${id}`);
      fetchData(); // refresh data after deletion
    } catch (err) {
      console.error("Delete Error:", err);
      alert("Failed to delete post");
    }
  };

  // Toggle Read More / Read Less
  const toggleReadMore = (id) => {
    setExpandedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg font-bold tracking-widest text-black">
          LOADING DATA...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
     

      {/* Error Message */}
      {error && (
        <div className="mb-8 rounded-lg bg-red-100 text-red-700 px-6 py-4 text-sm text-center font-semibold tracking-wide">
          ⚠️ {error}
        </div>
      )}

      {/* Empty State */}
      {data.length === 0 && !error ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
          <p className="text-sm tracking-wide text-gray-500">
            No posts available. Use the "Create New Post" page to add items.
          </p>
        </div>
      ) : (
        /* Posts Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((item) => {
            const isExpanded = expandedPosts[item._id] || false;
            const shouldTruncate = item.description.length > 200;

            return (
              <div
                key={item._id}
                className="group relative rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
              >
                {/* Image */}
                <div className="h-64 overflow-hidden bg-gray-100">
                  <img
                    src={
                      item.image ||
                      "https://via.placeholder.com/600x400/000000/FFFFFF?text=NO+IMAGE"
                    }
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Delete Icon */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="rounded-full bg-red-600 p-2 text-white hover:bg-black hover:text-red-600 transition shadow-md"
                    title="Delete Post"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-lg font-bold text-black mb-2 break-words">
                    {item.title}
                  </h3>

                  <div className="w-12 h-[2px] bg-[#f6881f] mb-4"></div>

                  {/* Description with Read More / Read Less */}
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {shouldTruncate && !isExpanded
                      ? item.description.slice(0, 200) + "..."
                      : item.description}
                    {shouldTruncate && (
                      <button
                        onClick={() => toggleReadMore(item._id)}
                        className="ml-2 text-[#f6881f] font-semibold hover:underline"
                      >
                        {isExpanded ? "Read Less" : "Read More"}
                      </button>
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
