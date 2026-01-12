import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../service/api";

export default function CreatePost() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setError("Title and content are required");
      return;
    }

    setLoading(true);
    setError("");

    const res = await createPost({ title, content });

    if (res.success) {
      navigate("/posts");
    } else {
      setError(res.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Create Post
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200"
              placeholder="Post title"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200"
              placeholder="Write your post..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Creating..." : "Create Post"}
          </button>
        </form>
      </div>
    </div>
  );
}
