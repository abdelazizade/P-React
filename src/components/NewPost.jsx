/* eslint-disable react/prop-types */
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NewPost({ onPostSuccess }) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [blogTitle, setBlogTitle] = useState({
    blogTitle: "",
  });
  const [blogImage, setBlogImage] = useState({
    blogImg: "",
  });
  const [description, setDescription] = useState({
    description: "",
  });

  const handleNavigate = () => {
    navigate("/Home");
  };

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);

    setBlogTitle({ blogTitle: "" });
    setBlogImage({ blogImg: "" });
    setDescription({ description: "" });
  };

  const handleBlogTitleChange = (event) => {
    setBlogTitle({
      ...blogTitle,
      blogTitle: event.target.value,
    });
  };

  const handleBlogImageChange = (event) => {
    setBlogImage({
      ...blogImage,
      blogImg: event.target.value,
    });
  };

  const handleDescriptionChange = (event) => {
    setDescription({
      ...description,
      description: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!blogTitle.blogTitle) {
      toast.warning("Title is required.");
      return;
    }

    if (!blogImage.blogImg) {
      toast.warning("Image is required.");
      return;
    }

    if (!description.description) {
      toast.warning("Description is required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/posts", {
        title: blogTitle.blogTitle,
        image: blogImage.blogImg,
        description: description.description,
      });

      const blog = response.data;
      // setBlogData(blog);

      const existingPostIds =
        JSON.parse(sessionStorage.getItem("postId")) || [];
      existingPostIds.push(blog.id);
      sessionStorage.setItem("postId", JSON.stringify(existingPostIds));

      toast.success("Post blog successfully");
      handleClose();
      handleNavigate();

      if (onPostSuccess) {
        onPostSuccess(blog);
      }
    } catch (error) {
      console.log(error);
      toast.error("Post blog failed. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="fixed bottom-5 left-0 right-0 top-0">
        <div>
          <form onSubmit={handleSubmit}>
            <div className="p-4">
              <h2>Article Info</h2>
              <label htmlFor="articleTitle">Article Title</label>
              <input
                type="text"
                placeholder="Title"
                name="articleTitle"
                value={blogTitle.blogTitle}
                onChange={handleBlogTitleChange}
                className="input border-b border-blue-950 w-full"
              />
              <label htmlFor="articleImg">Article Image</label>
              <input
                type="text"
                placeholder="URL image"
                name="articleImg"
                value={blogImage.blogImg}
                onChange={handleBlogImageChange}
                className="input border-b border-blue-950 w-full"
              />
              <label htmlFor="articleDescription">Description</label>
              <input
                type="text"
                placeholder="Description"
                name="articleDescription"
                value={description.description}
                onChange={handleDescriptionChange}
                className="input border-b border-blue-950 w-full h-28"
              />
              <input
                className="bg-gray-600 text-white h-10 w-full mt-2 rounded-3xl hover:bg-gray-800 hover:shadow"
                type="submit"
                value="Publish"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
