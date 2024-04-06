import React, { useContext } from "react";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import ReactQuill from "react-quill";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/AuthContext";
import DOMPurify from "dompurify"; // Filter dangerous html content

const Write = () => {
  const state = useLocation().state; // Indicate in update or writing new post
  const [value, setValue] = useState(state?.desc || ""); // Use original data in update mode
  const [title, setTitle] = useState(state?.title || "");
  const [cat, setCat] = useState(state?.cat || "");
  const [file, setFile] = useState(state?.img || null);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  // Not logged in
  if (!currentUser.username) {
    return <Navigate to="/login" replace={true} />;
  }

  const upload = async () => {
    try {
      const formData = new FormData();
      if (!formData) {
        return state?.img || null;
      }
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data; // Return img URL
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (value) => {
    const sanitizedValue = DOMPurify.sanitize(value);
    setValue(sanitizedValue);
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    const imgURL = await upload();

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            // Update
            title,
            desc: value,
            cat,
            img: file ? imgURL : state?.img || "",
          })
        : await axios.post(`/posts/`, {
            // New post to addPost controller
            title,
            desc: value,
            cat,
            img: file ? imgURL : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
      alert("Published successful");
      return navigate("/");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div className="editPost">
      <div className="content">
        <input
          type="text"
          value={title}
          placeholder="Title max 80 characters"
          maxLength="80"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill theme="snow" value={value} onChange={handleChange} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>{/*Future feature: <b>Visibility: </b> Public*/}</span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload an image
          </label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handlePublish}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "art"}
              name="cat"
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "life"}
              name="cat"
              value="life"
              id="life"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="life">Life</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "technology"}
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "learning"}
              name="cat"
              value="learning"
              id="learning"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="learning">Learning</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "health"}
              name="cat"
              value="health"
              id="health"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="health">Health</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "food"}
              name="cat"
              value="food"
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
