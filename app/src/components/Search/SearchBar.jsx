import React from "react";

const SearchBar = ({ search, setSearch, setShowSearch }) => {
  return (
    <input
      className="search-bar"
      key="search-bar"
      value={search}
      placeholder={"search folders and files"}
      onChange={(e) => setSearch(e.target.value)}
      onFocus={() => setShowSearch(true)}
      onBlur={() => setShowSearch(false)}
    />
  );
};

export default SearchBar;
