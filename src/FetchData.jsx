import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit, FiTrash2, FiRefreshCw } from "react-icons/fi";

export default function FetchData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://bizzaxis-backend.vercel.app/api/posts");

      // ✅ Backend returns an ARRAY directly
      setData(Array.isArray(response.data) ? response.data : []);

      setError("");
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("FAILED TO FETCH DATA. PLEASE CHECK IF SERVER IS RUNNING.");
    } finally {
      setLoading(false);
    }
  };

  // Placeholder handlers
  const handleDelete = (id) => {
    console.log("DELETE ID:", id);
    // axios.delete(`http://localhost:5000/api/posts/${id}`)
  };

  const handleUpdate = (item) => {
    console.log("UPDATE ITEM:", item);
    // navigate("/update", { state: item })
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-bold tracking-widest">LOADING DATA...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-3xl font-extrabold tracking-wide uppercase">
          Stored Items
        </h1>

        <button
          onClick={fetchData}
          className="flex items-center gap-2 rounded-lg bg-black text-white px-4 py-2 text-sm font-semibold hover:bg-gray-800 transition"
        >
          <FiRefreshCw />
          Refresh
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-8 rounded-lg bg-black text-white px-6 py-4 text-sm text-center font-semibold tracking-wide">
          ⚠️ {error}
        </div>
      )}

      {/* Empty State */}
      {data.length === 0 && !error ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
          <p className="text-sm tracking-wide text-gray-500">
            NO DATA AVAILABLE. USE INSERT PAGE TO ADD NEW ITEMS.
          </p>
        </div>
      ) : (
        /* Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((item) => (
            <div
              key={item._id}
              className="group relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition"
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

              {/* Action Icons */}
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => handleUpdate(item)}
                  className="rounded-full bg-white p-2 text-gray-700 hover:bg-black hover:text-white transition"
                  title="Update"
                >
                  <FiEdit size={16} />
                </button>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="rounded-full bg-white p-2 text-red-600 hover:bg-red-600 hover:text-white transition"
                  title="Delete"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-sm font-bold uppercase tracking-wide mb-2">
                  {item.title}
                </h3>

                <div className="w-8 h-[2px] bg-black mb-4"></div>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>

                {/* Date */}
                <p className="mt-4 text-xs text-gray-400">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
