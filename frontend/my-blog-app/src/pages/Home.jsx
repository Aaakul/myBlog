import React, { useEffect, useState } from "react";
import Logo from "../img/logo.png";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { getText } from "../helpers/getText";

const Home = () => {
  // const testPosts = [
  //     {
  //         id: 0,
  //         title: 'This is the title of test post 1, about 50 characters.',
  //         desc: 'This is the description of test post 1: Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi,laudantium incidunt repellendus aperiam omnis?',
  //         img: {Logo},
  //         uid: 1,
  //         cat: "art",
  //     },
  //     {
  //         id: 1,
  //         title: 'This is the title of test post 2, about 50 characters.',
  //         desc: 'This is the description of test post 2: Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi,laudantium incidunt repellendus aperiam omnis?',
  //         img: {Logo},
  //         uid: 1,
  //         cat: "life",
  //     },
  //     {
  //         id: 2,
  //         title: 'This is the title of test post 3, about 50 characters.',
  //         desc: 'This is the description of post 3: Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi,laudantium incidunt repellendus aperiam omnis?',
  //         img: {Logo},
  //         uid: 1,
  //         cat: "technology",
  //     }
  // ];

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
