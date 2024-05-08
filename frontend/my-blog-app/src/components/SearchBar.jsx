import React, { useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const [field, setField] = useState("title");
  const [order, setOrder] = useState("latest");
  const [orderChanged, setOrderChanged] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/?${field}=${keyword}`);
  };

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
    setOrderChanged(true);
  };

  useLayoutEffect(() => {
    if (location.pathname !== "/" || !orderChanged) {
      return;
    } else {
      const currentLocation =
        location.pathname + location.search?.split("&")[0];
      let targetURL = currentLocation;
      if (location.search === "") {
        targetURL = order === "latest" ? "/" : "/?order=oldest";
      } else {
        // Avoid redundant search params
        if (location.search.startsWith("?order")) {
          targetURL = order === "latest" ? "/" : "/?order=oldest";
        } else {
          targetURL =
            order === "latest"
              ? currentLocation
              : currentLocation + "&order=oldest";
        }
      }
      navigate(targetURL);
      setOrderChanged(false);
    }
  }, [location, navigate, order, orderChanged]);

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <i>Search by:</i>
        <div className="field">
          <input
            type="radio"
            checked={field === "author"}
            name="field"
            value="author"
            id="author"
            onChange={(e) => setField(e.target.value)}
          />
          <label htmlFor="author">Author</label>
          <input
            type="radio"
            checked={field === "title"}
            name="field"
            value="title"
            id="title"
            onChange={(e) => setField(e.target.value)}
          />
          <label htmlFor="title">Title</label>
        </div>
        <input type="text" placeholder="Keywords..." onChange={handleChange} />
        <button type="button" onClick={handleSearch} disabled={!keyword}>
          Search
        </button>
      </div>
      <div className="ordering">
        <i>Ordering:</i>
        <div className="order-options">
          <input
            type="radio"
            checked={order === "latest"}
            name="order"
            value="latest"
            id="latest"
            onChange={handleOrderChange}
          />
          <label htmlFor="latest">Latest</label>
          <input
            type="radio"
            checked={order === "oldest"}
            name="order"
            value="oldest"
            id="oldest"
            onChange={handleOrderChange}
          />
          <label htmlFor="oldest">Oldest</label>
        </div>
      </div>
    </div>
  );
};
export default SearchBar;
