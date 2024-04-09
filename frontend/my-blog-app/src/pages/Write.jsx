import React, { useContext, useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/AuthContext";
import DOMPurify from "dompurify"; // Filter dangerous html content
import Compressor from "compressorjs";

const Write = () => {
  const state = useLocation().state; // Indicate in update or writing new post
  // Use original data in update mode
  const [value, setValue] = useState(
    state?.desc || "Write something...Max 3000 characters"
  );
  const [title, setTitle] = useState(state?.title || "");
  const [cat, setCat] = useState(state?.cat || "");
  const [url, setUrl] = useState(state?.img || "");
  const [uploaded, setUploaded] = useState(false);

  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  // Not logged in
  if (!currentUser.username) {
    return <Navigate to="/login" replace={true} />;
  }

  const upload = async (file) => {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        // Compressor options
        quality: 0.6,
        maxWidth: 1024,
        ConvertSize: 200000, // Convert to JPG when input file > 200 kB
        success(result) {
          const formData = new FormData();
          formData.append("file", result, result.name);
          // Send the compressed image file to server with axios
          axios
            .post("/upload", formData)
            .then((res) => {
              setUploaded(true);
              setUrl(res.data);
              resolve();
            })
            .catch(reject);
        },
        error(err) {
          console.error(err);
          reject(err);
        },
      });
    });
  };

  const handleChange = (value) => {
    const sanitizedValue = DOMPurify.sanitize(value);
    setValue(sanitizedValue);
  };

  const handlePublish = async (e) => {
    e.preventDefault();

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            // Update
            title,
            desc: value,
            cat,
            img: url,
          })
        : await axios.post(`/posts/`, {
            // New post to addPost controller
            title,
            desc: value,
            cat,
            img: url,
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
      alert("Published successful");
      return navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.code === "ER_DATA_TOO_LONG") {
        return alert("You wrote too much or used too many formats");
      }
      alert(error);
    }
  };

  // Disable URL
  const myToolbar = [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ];

  return (
    <div className="edit">
      <div className="content">
        <input
          type="text"
          value={title}
          placeholder="Title max 60 characters"
          maxLength="60"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="ql-container">
          <ReactQuill
            className="ql-editor"
            theme="snow"
            value={value}
            onChange={handleChange}
            modules={{
              toolbar: myToolbar,
            }}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>{/*Future feature: <b>Visibility: </b> Public*/}</span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => {
              upload(e.target.files[0]).catch((err) => {
                alert("Image upload failed");
                console.log(err);
              });
            }}
          />
          <label className="file" htmlFor="file">
            Upload an image
          </label>
          {
            <span>
              <b>Upload status: {uploaded && "Successful"}</b>
            </span>
          }
          <div className="buttons">
            {/*Future feature: <button>Save as a draft</button>*/}
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
