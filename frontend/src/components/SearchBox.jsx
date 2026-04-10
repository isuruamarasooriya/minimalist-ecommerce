import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex items-center w-full max-w-md">
      <input
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search premium products..."
        className="w-full px-4 py-2 text-sm bg-white border border-gray-300 rounded-l-lg transition focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
      />
      <button
        type="submit"
        className="bg-black text-white px-6 py-2 rounded-r-lg font-bold text-sm hover:bg-gray-800 transition-all border border-black"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBox;