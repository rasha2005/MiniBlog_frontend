import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById, updatePost } from "../service/api";

export default function EditPost() {
  const { id } = useParams();       // post id from URL
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await getPostById(id);
      if (res.success) {
        setTitle(res.post.title);
        setContent(res.post.content);
      } else {
        alert(res.message || "Failed to fetch post");
        navigate("/posts");
      }
      setLoading(false);
    };
    fetchPost();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const res = await updatePost(id, { title, content });

    if (res.success) {
      navigate("/posts"); 
    } else {
      alert(res.message || "Failed to update post");
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-blue-600">
        Loading post...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">
          Edit Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Content</label>
            <textarea
              rows="6"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <button
            type="submit"
            className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${
              saving ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={saving}
          >
            {saving ? "Saving..." : "Update Post"}
          </button>
        </form>
      </div>
    </div>
  );
}
