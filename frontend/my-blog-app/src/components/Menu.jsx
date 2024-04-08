import React, { useEffect, useState } from "react";
import Logo from "../img/logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { getText } from "../helpers/getText";

const Menu = ({ cat, id }) => {
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

  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {posts.map((post) => {
        if (post.id === id) {
          return null;
        }
        return (
          <div className="post" key={post.id}>
            <Link to={`/post/${post.id}`} style={{ textDecoration: "none" }}>
              <div className="thumb">
                <img src={post.img ? `../uploads/${post.img}` : Logo} alt="" />
              </div>
              <div className="content">
                <div className="title">
                  <h2>{getText(post.title, 30)}</h2>
                </div>
                <p>{getText(post.desc, 100)}</p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
