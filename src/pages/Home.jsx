import { useState } from "react";
import NavBar from "../components/NavBar.jsx";
import Posts from "../components/Posts.jsx";
import NewPost from "../components/NewPost.jsx";
import Footer from "../components/Footer.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [posts, setPosts] = useState([]);

  const handlePostSuccess = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <>
      <ToastContainer />
      <div>
        <div>
          <NavBar />
          <Posts posts={posts} />
          <Footer />
        </div>
        {false && <NewPost onPostSuccess={handlePostSuccess} />}
      </div>
    </>
  );
}
