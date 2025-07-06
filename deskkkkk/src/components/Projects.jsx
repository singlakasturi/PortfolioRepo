import React, { useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';

const Projects = (props) => {
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/projects`)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setSelected(data[0]);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <Rnd
      default={{ x: 150, y: 80, width: 800, height: 500 }}
      minWidth={600}
      minHeight={400}
      bounds="window"
      dragHandleClassName="app-header"
      className="z-50"
    >
      <div className="flex flex-col w-full h-full rounded-md border border-gray-400 overflow-hidden bg-white shadow-xl">
        {/* Header */}
        <div className="app-header bg-gradient-to-b from-gray-100 to-gray-300 h-[26px] flex justify-between items-center px-2 text-sm font-semibold">
          <span>My Projects</span>
          <div className="flex gap-1">
            <button className="w-6 h-5 border border-gray-500">_</button>
            <button className="w-6 h-5 border border-gray-500">▭</button>
            <button
              className="w-6 h-5 bg-red-600 text-white border border-gray-500"
              onClick={() => {
                const newArray = props.openApp.filter((appId) => appId !== 6);
                props.setOpenApp(newArray);
              }}
            >
              x
            </button>
          </div>
        </div>

        <div className="flex flex-1">
          {/* Sidebar */}
          <div className="w-64 border-r border-gray-300 bg-white">
            <h2 className="text-md font-bold p-3 border-b border-gray-300">Project Explorer</h2>
            <ul>
              {projects.map((proj, idx) => (
                <li
                  key={idx}
                  className={`px-4 py-2 cursor-pointer hover:bg-blue-100 text-sm ${
                    selected?.title === proj.title ? 'bg-blue-200 font-semibold' : ''
                  }`}
                  onClick={() => setSelected(proj)}
                >
                  {proj.title}
                </li>
              ))}
            </ul>
            <div className="px-4 py-2 text-xs text-gray-500 border-t border-gray-300">
              {projects.length} projects
            </div>
          </div>

          {/* Details Panel */}
          <div className="flex-1 p-6 overflow-y-auto text-sm">
            {loading && <p>Loading projects...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {!loading && !error && selected && (
              <>
                <h2 className="text-xl font-bold mb-3">{selected.title}</h2>

                {/* Description from bullets */}
                <div className="mb-4">
                  {selected.bullets?.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1">
                      {selected.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No description provided.</p>
                  )}
                </div>

                {/* Tech Stack */}
                <div className="mb-4">
                  <p className="font-semibold mb-1">Technologies Used:</p>
                  <div className="flex flex-wrap gap-2">
                    {selected.techStack?.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-blue-100 text-sm border border-blue-300 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* GitHub Link */}
                {selected.githubLink && (
                  <div className="mb-4">
                    <a
                      href={selected.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View Source
                    </a>
                  </div>
                )}

                {/* File Info */}
                <div className="text-xs text-gray-600 space-y-1">
                  <p><strong>File name:</strong> {selected.fileName}</p>
                  <p><strong>Size:</strong> {selected.size}</p>
                  <p><strong>Created:</strong> {selected.created || 'Unknown'}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Rnd>
  );
};

export default Projects;
