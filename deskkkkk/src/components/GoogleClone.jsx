import React, { useState } from 'react';

function getDomain(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return '';
  }
}

function getPath(url) {
  try {
    const u = new URL(url);
    return u.pathname.length > 1 ? u.pathname : '';
  } catch {
    return '';
  }
}

export default function GoogleClone({ containerHeight = '540px' }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreResults, setHasMoreResults] = useState(true);
  const [activeTab, setActiveTab] = useState('All'); // 'All', 'Images', 'Videos'

  const handleSearch = (page = 1) => {
    if (query.trim()) {
      setLoading(true);
      setError(null);
      const start = (page - 1) * 10 + 1;

      // Fixed the type mapping - ensure correct API parameter values
      let type = 'web'; // default
      if (activeTab === 'Images') {
        type = 'images'; // Changed from 'image' to 'images'
      } else if (activeTab === 'Videos') {
        type = 'videos'; // Changed from 'video' to 'videos'
      }

      console.log('Search params:', { query, activeTab, type, start }); // Debug log


      fetch(`${import.meta.env.VITE_API_URL}/api/search?q=${encodeURIComponent(query)}&start=${start}&type=${type}`)
        .then(res => {
          if (!res.ok) throw new Error('Network response was not ok');
          return res.json();
        })
        .then(data => {
          console.log('API response:', data); // Debug log
          if (page === 1) {
            setResults(data);
          } else {
            setResults(prev => [...prev, ...data]);
          }
          setCurrentPage(page);
          setHasMoreResults(data.length === 10);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMoreResults) {
      handleSearch(currentPage + 1);
    }
  };

  const handleLucky = () => {
    if (results.length > 0) {
      window.open(results[0].link, '_blank');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setCurrentPage(1);
      setResults([]);
      handleSearch(1);
    }
  };

  const handleNewSearch = () => {
    setCurrentPage(1);
    setResults([]);
    setHasMoreResults(true);
    handleSearch(1);
  };

  const handleTabChange = (tab) => {
    console.log('Tab changed to:', tab); // Debug log
    setActiveTab(tab);
    setCurrentPage(1);
    setResults([]);
    setHasMoreResults(true);
    // Only search if we have a query
    if (query.trim()) {
      handleSearch(1);
    }
  };

  return (
    <div
      className="w-full h-full bg-white flex flex-col items-center justify-start pt-10 px-4"
      style={{ height: containerHeight, maxHeight: containerHeight }}
    >
      <img
        src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
        alt="Google Logo"
        className="w-40 mb-4"
      />

      {/* Tabs */}
      <div className="flex gap-6 mb-4 text-sm text-gray-700 font-medium">
        {['All', 'Images', 'Videos'].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`px-2 pb-1 border-b-2 transition ${
              activeTab === tab
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent hover:text-black'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={`Search Google ${activeTab}`}
        className="w-full max-w-md border border-gray-300 bg-white text-black rounded-full py-2 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Buttons */}
      <div className="mt-4 flex gap-3">
        <button
          onClick={handleNewSearch}
          className="bg-gray-100 text-black px-4 py-1.5 rounded hover:bg-gray-200 text-sm transition border border-gray-300"
        >
          Google Search
        </button>
        <button
          onClick={handleLucky}
          className="bg-gray-100 text-black px-4 py-1.5 rounded hover:bg-gray-200 text-sm transition border border-gray-300"
          disabled={results.length === 0}
        >
          I'm Feeling Lucky
        </button>
      </div>

      {/* Results */}
      <div
        className="mt-6 w-full max-w-4xl flex-1 overflow-hidden flex flex-col"
        style={{
          height: `calc(${containerHeight} - 200px)`,
          maxHeight: `calc(${containerHeight} - 200px)`,
        }}
      >
        {loading && currentPage === 1 && (
          <p className="text-center text-black">Loading...</p>
        )}
        {error && <p className="text-red-500 text-center">Error: {error}</p>}

        {!loading && !error && results.length > 0 && (
          <div style={{ height: '100%', maxHeight: '100%', overflowY: 'auto' }}>
            <ul className="space-y-6">
              {results.map((item, idx) => (
                <li
                  key={idx}
                  className="flex flex-row items-start bg-white rounded-xl shadow border border-gray-200 p-4 relative"
                >
                  {/* Left Side */}
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <img
                        src={`https://www.google.com/s2/favicons?domain=${getDomain(item.link)}`}
                        alt="favicon"
                        className="w-5 h-5 rounded"
                        onError={(e) => (e.target.style.display = 'none')}
                      />
                      <span className="text-xs text-gray-500 truncate">
                        {getDomain(item.link)}
                        <span className="text-gray-400">{getPath(item.link)}</span>
                      </span>
                    </div>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 font-semibold text-lg hover:underline block truncate"
                    >
                      {item.title}
                    </a>
                    <p className="text-gray-700 text-sm mt-1 leading-relaxed">
                      {item.snippet}
                    </p>
                    {item.relatedLinks && item.relatedLinks.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {item.relatedLinks.map((rl, i) => (
                          <a
                            key={i}
                            href={rl.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-100 text-blue-700 px-3 py-1 rounded-full text-xs hover:bg-blue-100 border border-blue-200 transition"
                          >
                            {rl.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Thumbnail */}
                  {activeTab === 'Videos' && item.videoUrl ? (
  <video
    src={item.videoUrl}
    controls
    className="w-24 h-24 object-cover rounded-lg ml-2 flex-shrink-0 border border-gray-200"
    onError={(e) => (e.target.style.display = 'none')}
  />
) : item.image ? (
  <img
    src={item.image}
    alt="result"
    className="w-24 h-24 object-cover rounded-lg ml-2 flex-shrink-0 border border-gray-200"
    onError={(e) => (e.target.style.display = 'none')}
  />
) : null}
                </li>
              ))}
            </ul>

            {hasMoreResults && (
              <div className="text-center mt-6">
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {loading ? 'Loading...' : 'Load More Results'}
                </button>
              </div>
            )}
            {!hasMoreResults && results.length > 0 && (
              <div className="text-center mt-6 text-gray-500">
                No more results available
              </div>
            )}
          </div>
        )}

        {!loading && !error && results.length === 0 && query && (
          <div className="text-center text-gray-500">
            No results found for "{query}"
          </div>
        )}
      </div>
    </div>
  );
}