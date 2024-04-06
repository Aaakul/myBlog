import React, { useEffect, useState } from "react";
import Logo from "../img/logo.png";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

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

  // Html to pure text
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };


  // if (notFound) {
  //   return <p>No post found</p>
  // }

  return (
    <div className="Home">
      <div className="Posts">
        {posts &&
          posts.map((post) => (
            <div className="post" key={post.id}>
              <div className="thumb">
                <img src={post.img ? `uploads/${post.img}` : Logo} alt="" />
              </div>
              <div className="content">
                <Link to={`/post/${post.id}`}>
                  <div className="title">
                    <h1>{post.title}</h1>
                  </div>
                </Link>
                <p>{getText(post.desc)}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
