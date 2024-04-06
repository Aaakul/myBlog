import React, { useState, useEffect, useContext } from "react";
import Logo from "../img/logo.png";
import Delete from "../img/delete.png";
import Edit from "../img/edit.png";
import { Link, Navigate, useLocation } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/AuthContext";

const Single = () => {
  const [post, setPost] = useState([{}]);
  const [notFound, setNotFound] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        if (res.status === 404 || res === "") {
          setNotFound(true);
          return;
        }
        setPost(res.data);
      } catch (error) {
        console.log(error);
        setNotFound(true);
        return;
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      setDeleted(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (notFound) {
    return <Navigate to="/NotFound" replace />;
  }

  if (deleted) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="Single">
      <div className="Content">
        <img src={post.img ? `../uploads/${post.img}` : Logo} alt="" />
        <div className="Profile">
          <img src={Logo} alt="User profile" />
        </div>
        <div className="Info">
          <span>{post.username}</span>
          <p>Posted {moment(post.date).fromNow()}</p>
        </div>
        {currentUser.username === post.username && (
          <div className="Edit">
            <Link to={`/Write?Edit=${postId}`} state={post}>
              <img src={Edit} alt="Edit" />
            </Link>
            <img src={Delete} alt="Delete" onClick={handleDelete} />
          </div>
        )}
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.desc }} />
      </div>
      <Menu cat={post.cat} />
    </div>
  );
};

export default Single;
