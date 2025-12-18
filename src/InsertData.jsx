import React, { useState, useRef } from "react";
import axios from "axios";

export default function InsertData() {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setMessage({ text: "PLEASE SELECT AN IMAGE", type: "error" });
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("image", image);

    try {
      setLoading(true);
      setMessage({ text: "", type: "" });

      await axios.post("https://bizzaxis-backend.vercel.app/api/posts", data);

      setMessage({ text: "POST CREATED SUCCESSFULLY", type: "success" });
      setFormData({ title: "", description: "" });
      setImage(null);
      fileInputRef.current.value = "";
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || "SERVER ERROR",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-20">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Insert Post
        </h2>

        {message.text && (
          <div
            className={`mb-6 rounded-lg px-4 py-3 text-center text-sm font-semibold ${
              message.type === "success"
                ? "bg-black text-white"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              required
              className="w-full text-sm file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:bg-black file:text-white
              hover:file:bg-gray-800 cursor-pointer"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-black text-white py-2.5 text-sm font-semibold
            hover:bg-gray-800 transition disabled:opacity-60"
          >
            {loading ? "UPLOADING..." : "SUBMIT"}
          </button>
        </form>
      </div>
    </div>
  );
}
