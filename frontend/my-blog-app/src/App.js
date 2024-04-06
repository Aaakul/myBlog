import * as React from "react";
import "./style.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";


import Home from "./pages/Home";
import Login from "./pages/Login";
import Reg from "./pages/Reg";
import Single from "./pages/Single";
import Write from "./pages/Write";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginTrouble from "./pages/LoginTrouble";
import NotFound from "./pages/NotFound";

const Layout = () => {
  return (
    <div>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </div>
  );
}

function App() {
  return (
  <div className="App">
    <div className="Container">
      <Router>
          <Routes>
              <Route path="/" element={<Layout/>} >
                <Route index element={<Home/>} />
                <Route path="Post/:id" element={<Single/>} />
                <Route path="Write" element={<Write/>} />
                <Route path="LoginTrouble" element={<LoginTrouble/>} />
                <Route path="*" element={<NotFound/>} />
              </Route>            
              <Route path="/Login" element={<><Login/><Footer/></>} />
              <Route path="/Reg" element={<><Reg/><Footer/></>} />
          </Routes>
      </Router>
      </div>
  </div>    
  );
}

export default App;
