import React, { useEffect, useState } from "react";
import Logo from "../img/logo.png";
import { Link, useLocation, Navigate } from "react-router-dom";
import { getText } from "../helpers/getText";
import getPosts from "../helpers/getPosts";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const search = useLocation().search;
  const field = search ? search.split("?")[1].split("=")[0] : "";
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPosts(search);
        if (data === "") {
          setNotFound(true);
          return;
        }
        setNotFound(false);
        setPosts(data);
      } catch (error) {
        setNotFound(true);
        console.log(error);
      }
    };
    fetchData();
  }, [search]);

  // Check search word
  if (field && !["cat", "username", "title"].includes(field)) {
    return <Navigate to="/NotFound" replace={true} />;
  }

  return (
    <div className="home">
      <div className="posts">
        {notFound ? (
          <h2>No result</h2>
        ) : (
          posts &&
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
                <Link to={`/?author=${post.username}`}>
                  <span className="author">{`Author: ${post.username}`}</span>
                </Link>
                <p>{getText(post.desc, 300)}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
