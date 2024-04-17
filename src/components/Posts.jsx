import { useState, useEffect } from "react";
import axios from "axios";
import Delete from "./Delete";
import Update from "./Update";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Posts() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/NewPost");
  };

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/posts");
      const fetchedPosts = response.data;

      setPosts(fetchedPosts.reverse());

      console.log(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleDelete = (deletedPostId) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.id !== deletedPostId)
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow-md p-6 m-20">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            {post.title}
          </h1>
          <img src={post.image} alt="" className="rounded-xl mb-4" />
          <p className="text-gray-600">{post.description}</p>
          {/* <div className="border-b border-whit my-4"></div> */}
          <div className="flex justify-between items-center mt-20">
            {sessionStorage.getItem("postId")?.includes(post.id) && (
              <>
                <Delete postId={post.id} onDelete={handleDelete} />
                <Update postId={post.id} />
              </>
            )}
          </div>
        </div>
      ))}
      <button
        className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
        onClick={handleNavigate}>
        Fixed Button
      </button>
    </div>
  );
}
