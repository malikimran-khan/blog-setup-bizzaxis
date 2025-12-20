import React, { useState, useRef } from "react";
import axios from "axios";
import API_CONFIG from "../config/apiConfig";

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
            setMessage({ text: "Please select an image for the post.", type: "error" });
            return;
        }

        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("image", image);

        try {
            setLoading(true);
            setMessage({ text: "", type: "" });

            await axios.post(`${API_CONFIG.BASE_URL}/posts`, data);

            setMessage({ text: "Post published successfully!", type: "success" });
            setFormData({ title: "", description: "" });
            setImage(null);
            fileInputRef.current.value = "";
        } catch (error) {
            setMessage({
                text: error.response?.data?.message || "Server error. Please try again.",
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10 md:py-20">
            <div className="w-full max-w-2xl bg-white rounded-3xl p-8 md:p-12 shadow-md md:shadow-lg">
                {/* Header */}
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">
                    Create New Post
                </h2>

                {/* Success/Error Message */}
                {message.text && (
                    <div
                        className={`mb-6 px-5 py-3 rounded-lg text-center text-sm md:text-base font-semibold transition ${message.type === "success"
                                ? "bg-green-600 text-white"
                                : "bg-red-100 text-red-700"
                            }`}
                    >
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Post Title */}
                    <div>
                        <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                            Post Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter a descriptive title"
                            required
                            className="w-full rounded-xl border border-gray-300 px-4 md:px-5 py-2.5 md:py-3 text-sm md:text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#f6881f] focus:border-[#f6881f] transition"
                        />
                    </div>

                    {/* Post Details */}
                    <div>
                        <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                            Post Details
                        </label>
                        <textarea
                            name="description"
                            rows="5"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Write your post content here..."
                            required
                            className="w-full rounded-xl border border-gray-300 px-4 md:px-5 py-2.5 md:py-3 text-sm md:text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#f6881f] focus:border-[#f6881f] transition resize-none"
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                            Upload Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            ref={fileInputRef}
                            required
                            className="w-full text-sm md:text-base file:mr-4 file:py-2 file:px-4
                file:rounded-xl file:border-0
                file:bg-[#f6881f] file:text-white
                hover:file:bg-[#e47716] cursor-pointer transition"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-[#f6881f] text-white py-3 text-sm md:text-base font-semibold hover:bg-[#e47716] transition disabled:opacity-60"
                    >
                        {loading ? "Publishing..." : "Publish Post"}
                    </button>
                </form>
            </div>
        </div>
    );
}
