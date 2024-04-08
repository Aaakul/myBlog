import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Logo from "../img/logo.png";

const Navbar = ()  =>{
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
          <span>{currentUser?.username }</span>
          {currentUser ? 
            (<span onClick={logout}>Logout</span>) :
            (<><Link className="link" to="/Login">Login</Link>
            <Link className="link" to="/Reg">Register</Link></>)}         
          <div className="write">
          <Link className="link" to="/Write">New<br/>Blog</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;