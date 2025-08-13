import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center border rounded-full p-2 border-green-400">
      <Search className="text-gray-500 ml-2" />
      <input
        type="text"
        placeholder="Search for products, brands and more..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-3 outline-none"
      />
    </form>
  );
};

export default SearchBar;
