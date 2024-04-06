import React, { useEffect, useState } from "react";
import Logo from "../img/logo.png";
import { Link } from "react-router-dom";
import axios from "axios";

const Menu = ({ cat }) => {
  // const testPosts = [
  //     {
  //         id: 0,
  //         title: 'This is the title of the post1, about 50 characters.',
  //         desc: 'This is the discription of post 1: Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi,laudantium incidunt repellendus aperiam omnis?',
  //         img: {Logo},
  //     },
  //     {
  //         id: 1,
  //         title: 'This is the title of the post2, about 50 characters.',
  //         desc: 'This is the discription of post 2: Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi,laudantium incidunt repellendus aperiam omnis?',
  //         img: {Logo},
  //     },
  //     {
  //         id: 2,
  //         title: 'This is the title of the post3, about 50 characters.',
  //         desc: 'This is the discription of post 3: Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi,laudantium incidunt repellendus aperiam omnis?',
  //         img: {Logo},
  //     }
  // ];

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/?cat=${cat}`);
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="Menu">
      <h1>Other posts you may like</h1>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <div className="thumb">
            <img src={Logo} alt="Thumb" />
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
  );
};

export default Menu;
