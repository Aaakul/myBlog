import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Logo from "../img/logo.png";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Home" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=art">
            <h6>Art</h6>
          </Link>
          <Link className="link" to="/?cat=life">
            <h6>Life</h6>
          </Link>
          <Link className="link" to="/?cat=technology">
            <h6>Technology</h6>
          </Link>
          <Link className="link" to="/?cat=learning">
            <h6>Learning</h6>
          </Link>
          <Link className="link" to="/?cat=health">
            <h6>Health</h6>
          </Link>
          <Link className="link" to="/?cat=food">
            <h6>Food</h6>
          </Link>
          {currentUser ? (
            <>
              <Link to={`/?username=${currentUser.username}`}>
                <span className="name">{currentUser.username}</span>
              </Link>
              <span onClick={logout}>Logout</span>
            </>
          ) : (
            <>
              <Link to="/Login">
                <span>Login</span>
              </Link>
              <Link to="/Reg">
                <span>Register</span>
              </Link>
            </>
          )}
        </div>
        <div className="write">
          <Link to="/Write">
            New
            <br />
            Blog
          </Link>
        </div>
        <div className="search-bar-container">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
