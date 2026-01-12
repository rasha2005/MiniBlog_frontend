import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyPosts } from "../api/postApi";

export default function MyPosts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
  
    if (!confirmDelete) return;
  
    const res = await deletePost(id);
  
    if (res.success) {
      setPosts((prev) => prev.filter((post) => post._id !== id));
    } else {
      alert(res.message || "Failed to delete post");
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await getMyPosts();

      if (res.success) {
        setPosts(res.posts);
      } else {
        setError(res.message);
      }

      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-blue-600 text-lg">Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-700">My Posts</h1>
          <button
            onClick={() => navigate("/posts/create")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Post
          </button>
        </div>

        {posts.length === 0 ? (
          <p className="text-gray-500 text-center">
            You haven't created any posts yet.
          </p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white p-4 rounded shadow"
              >
                <h2 className="text-lg font-semibold text-blue-700">
                  {post.title}
                </h2>
                <p className="text-gray-600 mt-2 line-clamp-3">
                  {post.content}
                </p>

                <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                  <span>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                  <div className="space-x-3">
                    <button
                      onClick={() => navigate(`/posts/edit/${post._id}`)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                   
                   <button
                   onClick={() => handleDelete(post._id)}
                   className="text-red-600 hover:underline"
                 >
                   Delete
                 </button>
                 
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
