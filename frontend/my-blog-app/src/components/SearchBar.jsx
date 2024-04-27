import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const [field, setField] = useState("title");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    navigate(`/?${field}=${keyword}`);
  };

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
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
  );
};
export default SearchBar;
