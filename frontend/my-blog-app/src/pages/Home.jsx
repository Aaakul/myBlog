import React, { useEffect, useState } from "react";
import Logo from "../img/logo.png";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { getText } from "../helpers/getText";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;
  //const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (error) {
        if (error.response.status === 404) {
          //setNotFound(true);
        } else {
          console.log(error);
        }
      }
    };
    fetchData();
  }, [cat]);

  // if (notFound) {
  //   return <p>No post found</p>
  // }

  return (
    <div className="home">
      <div className="posts">
        {posts &&
          posts.map((post) => (
            <div className="post" key={post.id}>
              <Link to={`/post/${post.id}`}>
                <div className="thumb">
                  <img src={post.img ? `uploads/${post.img}` : Logo} alt="" />
                </div>
              </Link>
              <div className="content">
                <Link to={`/post/${post.id}`}>
                  <h1>{post.title}</h1>
                </Link>
                <p>{getText(post.desc, 300)}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
