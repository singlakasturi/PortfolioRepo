import React, { useState } from 'react';

export default function GoogleClone() {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
    }
  };

  const handleLucky = () => {
    if (query.trim()) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}&btnI=I`, '_blank');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="w-full h-full bg-white flex flex-col items-center justify-start pt-10 px-4">
      <img
        src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
        alt="Google Logo"
        className="w-40 mb-6"
      />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search Google"
        className="w-full max-w-md border border-gray-300 rounded-full py-2 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="mt-4 flex gap-3">
        <button
          onClick={handleSearch}
          className="bg-gray-100 px-4 py-1.5 rounded hover:bg-gray-200 text-sm transition"
        >
          Google Search
        </button>
        <button
          onClick={handleLucky}
          className="bg-gray-100 px-4 py-1.5 rounded hover:bg-gray-200 text-sm transition"
        >
          I'm Feeling Lucky
        </button>
      </div>
    </div>
  );
}
