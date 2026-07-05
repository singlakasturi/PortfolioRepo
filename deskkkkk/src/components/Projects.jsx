import React, { useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';

// Mock Skills Data representing different files in a Skills folder
const SKILLS_DATA = [
  { name: 'Programming Languages', type: 'Source Code Folder (.code)', size: '3.4 MB', desc: 'Java, C++, Python, JavaScript, SQL' },
  { name: 'Tech Stack', type: 'System Architecture (.sys)', size: '5.1 MB', desc: 'Spring Boot, Microservices, Distributed Systems, Service-Oriented Architecture' },
  { name: 'Databases', type: 'Database Index (.db)', size: '4.2 MB', desc: 'PostgreSQL, MySQL, MongoDB, Relational Databases' },
  { name: 'Cloud & DevOps', type: 'DevOps Configuration (.yaml)', size: '1.8 MB', desc: 'Git, GitHub, Docker, CI/CD, Containerized Applications' },
  { name: 'Testing', type: 'Test Script (.spec)', size: '980 KB', desc: 'JUnit, Unit Testing, Integration Testing' },
  { name: 'CS Fundamentals', type: 'Core Knowledge (.info)', size: '2.7 MB', desc: 'DBMS, OOP, OS, Computer Networks, Agile Methodologies, System Design' }
];

const DEFAULT_PROJECTS = [
  {
    title: "SeatWise – Exam Seating Plan Portal",
    techStack: ["Spring Boot", "Java", "SQL", "Node.js", "React.js"],
    bullets: [
      "Developed and deployed a full-stack exam seating automation platform currently used by my college for real examination workflows.",
      "Architected the system using two independent backend services (core allocation service and export/utility service) to improve scalability, fault isolation, and future extensibility.",
      "Implemented subject-wise and date-wise seat allocation algorithm to prevent clashes and ensure fair room utilization.",
      "Delivered production-ready seating plan outputs adopted by college administration, replacing manual planning and reducing errors."
    ],
    githubLink: "https://github.com/singlakasturi/SeatingPlanGenerator",
    fileName: "SeatWise.project",
    fileType: "Project File",
    location: "C:\\Users\\SinglaKasturi\\Projects\\",
    size: "4.8MB"
  },
  {
    title: "Resemblance – Code Similarity Detection System",
    techStack: ["Spring Boot", "React.js", "Python", "Java", "Flask", "Rest API's"],
    bullets: [
      "Developed a full-stack tool for detecting plagiarism in coding contests with semantic and structural analysis.",
      "Implemented a dual-pane UI to compare code with % similarity and user highlighting.",
      "Integrated custom Python model to detect logical similarity despite variable changes or language switches.",
      "Used API scraping for contest & submission data; added email support through the ’Contact Us’ feature."
    ],
    githubLink: "https://github.com/singlakasturi/Pro",
    fileName: "Resemblance.project",
    fileType: "Project File",
    location: "C:\\Users\\SinglaKasturi\\Projects\\",
    size: "343MB"
  },
  {
    title: "TuneTrace – Real-Time Music Recognition App",
    techStack: ["Spring Boot", "React.js", "PostgreSQL", "Java", "Rest API's", "TarsosDSP"],
    bullets: [
      "Built a full-stack music identification system that recognizes songs through microphone input or MP3 uploads using audio fingerprinting.",
      "We used TarsosDSP in the backend to process and match sound patterns in real time.",
      "Designed a modern, responsive UI for song discovery with details such as artist, album, and match confidence.",
      "Engineered a scalable PostgreSQL schema for storing song fingerprints and metadata.",
      "Designed features to analyze similar submissions, laying the groundwork for a recommendation system."
    ],
    githubLink: "https://github.com/singlakasturi/Shazam",
    fileName: "TuneTrace.project",
    fileType: "Project File",
    location: "C:\\Users\\SinglaKasturi\\Projects\\",
    size: "34MB"
  },
  {
    title: "Football Stats Explorer for UCL Players",
    techStack: ["Spring Boot", "PostgreSQL", "Java", "REST APIs", "OAuth 2.0"],
    bullets: [
      "Developed an intuitive platform for users to explore football player statistics, categorized by teams and nations.",
      "Utilized PostgreSQL and best practices for scalability, ensuring seamless integration.",
      "Planned integration of Google Sign-In, LinkedIn, and GitHub authentication to enhance security and user experience."
    ],
    githubLink: "https://github.com/singlakasturi/PLLeague",
    fileName: "FootballStats.project",
    fileType: "Project File",
    location: "C:\\Users\\SinglaKasturi\\Projects\\",
    size: "310KB"
  },
  {
    title: "Secure Auth System with Email Verification",
    techStack: ["Spring Boot", "Java", "PostgreSQL", "SupaBase"],
    bullets: [
      "Constructed a secure Login and Sign-Up system with Email Verification flow and JWT Token generation.",
      "Implemented authenticated user data retrieval, error handling, and exception logging."
    ],
    githubLink: "https://github.com/singlakasturi/LSF",
    fileName: "SecureAuthSystem.project",
    fileType: "Project File",
    location: "C:\\Users\\SinglaKasturi\\Projects\\",
    size: "571KB"
  }
];

const Projects = ({ onClose, zIndex, onFocus, isMinimized, isMaximized, onMinimize, onMaximize, activeFolder = 'projects' }) => {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [selectedProject, setSelectedProject] = useState(DEFAULT_PROJECTS[0]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [currentFolder, setCurrentFolder] = useState(activeFolder); // 'projects' or 'skills'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Tooltip position state for skills hover
  const [tooltip, setTooltip] = useState({ visible: false, text: '', x: 0, y: 0 });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/projects`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load projects');
        return res.json();
      })
      .then((data) => {
        if (data && data.length > 0) {
          setProjects((prev) => {
            const merged = [...prev];
            data.forEach((remoteProj) => {
              const index = merged.findIndex(
                (p) => p.title.toLowerCase() === remoteProj.title.toLowerCase()
              );
              if (index !== -1) {
                // Update existing project with remote data
                merged[index] = { ...merged[index], ...remoteProj };
              } else {
                // Add new remote project
                merged.push(remoteProj);
              }
            });
            return merged;
          });
        }
      })
      .catch((err) => {
        console.warn("Backend API not reachable. Using fallback projects data. Error:", err.message);
      });
  }, []);

  const handleIconClick = (e, item, isProject) => {
    e.stopPropagation();
    if (isProject) {
      setSelectedProject(item);
      setSelectedSkill(null);
    } else {
      setSelectedSkill(item);
      setSelectedProject(null);
    }
  };

  const handleMouseEnterSkill = (e, desc) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      visible: true,
      text: desc,
      x: rect.left,
      y: rect.bottom + 5
    });
  };

  const handleMouseLeaveSkill = () => {
    setTooltip({ visible: false, text: '', x: 0, y: 0 });
  };

  return (
    <Rnd
      default={{ x: 140, y: 70, width: 850, height: 530 }}
      size={isMaximized ? { width: '100%', height: 'calc(100vh - 30px)' } : undefined}
      position={isMaximized ? { x: 0, y: 0 } : undefined}
      disableDragging={isMaximized}
      enableResizing={!isMaximized}
      minWidth={650}
      minHeight={400}
      bounds="window"
      dragHandleClassName="xp-titlebar"
      style={{ zIndex, display: isMinimized ? 'none' : 'block' }}
    >
      <div className="xp-window w-full h-full flex flex-col select-none" onMouseDown={onFocus}>
        {/* Header */}
        <div className="xp-titlebar">
          <div className="flex items-center">
            <span className="font-bold text-white pl-1">
              {currentFolder === 'projects' ? 'My Projects' : 'Skills'}
            </span>
          </div>
          <div className="flex gap-0.5">
            <button className="xp-btn-min" onClick={(e) => { e.stopPropagation(); onMinimize(); }}>
              <svg className="w-2 h-2 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <button className="xp-btn-max" onClick={(e) => { e.stopPropagation(); onMaximize(); }}>
              <svg className="w-2 h-2 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <rect x="3" y="5" width="18" height="14" />
              </svg>
            </button>
            <button className="xp-btn-close" onClick={onClose}>
              <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </svg>
            </button>
          </div>
        </div>

        {/* Menu Bar */}
        <div className="xp-menu-bar text-black text-xs">
          <span className="xp-menu-item">File</span>
          <span className="xp-menu-item">Edit</span>
          <span className="xp-menu-item">View</span>
          <span className="xp-menu-item">Favorites</span>
          <span className="xp-menu-item">Tools</span>
          <span className="xp-menu-item">Help</span>
        </div>

        {/* Toolbar */}
        <div className="bg-[#ece9d8] border-b border-gray-400 p-1.5 flex items-center justify-between text-xs gap-3">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentFolder('projects')}
              className={`xp-button flex items-center gap-1 ${currentFolder === 'projects' ? 'bg-[#dfdaca]' : ''}`}
            >
              ⬅️ Back
            </button>
            <button
              onClick={() => setCurrentFolder('skills')}
              className={`xp-button flex items-center gap-1 ${currentFolder === 'skills' ? 'bg-[#dfdaca]' : ''}`}
            >
              Skills folder ➡️
            </button>
            <div className="h-6 w-px bg-gray-400 mx-1"></div>
            <button className="xp-button">📁 Folders</button>
          </div>
        </div>

        {/* Address Bar */}
        <div className="bg-[#ece9d8] border-b border-gray-400 p-1 flex items-center text-xs text-black">
          <span className="text-gray-600 px-2">Address</span>
          <div className="flex-1 bg-white border border-gray-400 px-2 py-0.5 select-all overflow-hidden whitespace-nowrap">
            C:\My Documents\{currentFolder === 'projects' ? 'Projects' : 'Skills'}
          </div>
          <button className="xp-button ml-1 py-0 px-2">Go</button>
        </div>

        {/* Main Workspace */}
        <div className="flex flex-1 overflow-hidden bg-white">
          {/* Explorer Left Sidebar Pane */}
          <div className="xp-explorer-pane text-white select-none">
            {/* System Tasks */}
            <div className="xp-explorer-card">
              <div className="xp-explorer-card-header text-xs">
                <span>File and Folder Tasks</span>
                <span>▲</span>
              </div>
              <div className="xp-explorer-card-content text-black space-y-1">
                <a href="#new" className="hover:underline flex items-center gap-1">📁 Make new folder</a>
                <a href="#share" className="hover:underline flex items-center gap-1">🌐 Share this folder</a>
              </div>
            </div>

            {/* Other Places */}
            <div className="xp-explorer-card">
              <div className="xp-explorer-card-header text-xs">
                <span>Other Places</span>
                <span>▲</span>
              </div>
              <div className="xp-explorer-card-content text-black space-y-1">
                <button
                  onClick={() => setCurrentFolder('projects')}
                  className="w-full text-left text-blue-900 hover:underline text-[11px]"
                >
                  📂 My Projects
                </button>
                <button
                  onClick={() => setCurrentFolder('skills')}
                  className="w-full text-left text-blue-900 hover:underline text-[11px]"
                >
                  📂 My Skills
                </button>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="text-blue-900 hover:underline text-[11px]">🌐 GitHub Profile</a>
              </div>
            </div>

            {/* Details Panel */}
            <div className="xp-explorer-card">
              <div className="xp-explorer-card-header text-xs">
                <span>Details</span>
                <span>▲</span>
              </div>
              <div className="xp-explorer-card-content text-black text-[11px] leading-relaxed">
                {currentFolder === 'projects' && selectedProject ? (
                  <>
                    <p className="font-bold">{selectedProject.title}</p>
                    <p>Size: {selectedProject.size || '32 KB'}</p>
                    <p>Created: {selectedProject.created || '2026'}</p>
                  </>
                ) : currentFolder === 'skills' && selectedSkill ? (
                  <>
                    <p className="font-bold">{selectedSkill.name}</p>
                    <p>Type: {selectedSkill.type}</p>
                    <p>Size: {selectedSkill.size}</p>
                  </>
                ) : (
                  <p>Select an item to view its details.</p>
                )}
              </div>
            </div>
          </div>

          {/* File Grid View Right Side */}
          <div className="flex-1 flex overflow-hidden">
            {/* Grid display */}
            <div className="w-1/2 p-4 overflow-y-auto border-r border-gray-300">
              <h3 className="text-xs font-bold text-gray-600 mb-3 uppercase tracking-wide">
                Files in directory ({currentFolder})
              </h3>
              
              {loading && <p className="text-black text-xs">Loading files...</p>}
              {error && <p className="text-red-500 text-xs">Error loading files: {error}</p>}

              {!loading && !error && currentFolder === 'projects' && (
                <div className="grid grid-cols-2 gap-3">
                  {projects.map((proj, idx) => (
                    <div
                      key={idx}
                      onClick={(e) => handleIconClick(e, proj, true)}
                      className={`flex flex-col items-center p-2 rounded cursor-pointer ${
                        selectedProject?.title === proj.title ? 'bg-[#316ac5] text-white' : 'text-black hover:bg-gray-100'
                      }`}
                    >
                      {/* Classic Folder / File icon */}
                      <span className="text-3xl mb-1">📁</span>
                      <span className="text-xs text-center break-all">{proj.title}</span>
                    </div>
                  ))}
                </div>
              )}

              {!loading && !error && currentFolder === 'skills' && (
                <div className="grid grid-cols-2 gap-3">
                  {SKILLS_DATA.map((skill, idx) => (
                    <div
                      key={idx}
                      onClick={(e) => handleIconClick(e, skill, false)}
                      onMouseEnter={(e) => handleMouseEnterSkill(e, skill.desc)}
                      onMouseLeave={handleMouseLeaveSkill}
                      className={`flex flex-col items-center p-2 rounded cursor-pointer relative ${
                        selectedSkill?.name === skill.name ? 'bg-[#316ac5] text-white' : 'text-black hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-3xl mb-1">⚙️</span>
                      <span className="text-xs text-center">{skill.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Document preview right pane details */}
            <div className="w-1/2 p-4 overflow-y-auto bg-gray-50 flex flex-col">
              {currentFolder === 'projects' && selectedProject && (
                <div className="space-y-4 text-xs text-black">
                  <h2 className="text-lg font-bold border-b border-gray-300 pb-1">{selectedProject.title}</h2>
                  
                  <div>
                    <h4 className="font-bold text-gray-700">Project Description:</h4>
                    {selectedProject.bullets?.length > 0 ? (
                      <ul className="list-disc pl-4 space-y-1 mt-1">
                        {selectedProject.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>No description provided.</p>
                    )}
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-700">Technologies:</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedProject.techStack?.map((tech, i) => (
                        <span key={i} className="bg-blue-100 text-blue-900 border border-blue-300 px-1.5 py-0.5 rounded text-[10px]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selectedProject.githubLink && (
                    <div className="pt-2">
                      <a
                        href={selectedProject.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="xp-button inline-block text-center font-bold no-underline text-blue-950"
                      >
                        📂 View on GitHub
                      </a>
                    </div>
                  )}
                </div>
              )}

              {currentFolder === 'skills' && selectedSkill && (
                <div className="space-y-3 text-xs text-black">
                  <h2 className="text-lg font-bold border-b border-gray-300 pb-1">{selectedSkill.name}</h2>
                  <p><strong>File Type:</strong> {selectedSkill.type}</p>
                  <p><strong>Size on disk:</strong> {selectedSkill.size}</p>
                  
                  <div className="bg-yellow-50 border border-yellow-200 p-3 rounded mt-2">
                    <p className="font-semibold text-amber-900">Proficiency Profile:</p>
                    <p className="mt-1 text-gray-700 leading-normal">{selectedSkill.desc}</p>
                  </div>
                </div>
              )}

              {!selectedProject && !selectedSkill && (
                <div className="text-center text-gray-400 my-auto text-xs">
                  Select a file to inspect properties
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Global XP Yellow Tooltip */}
        {tooltip.visible && (
          <div
            className="xp-tooltip fixed z-100 pointer-events-none"
            style={{ left: tooltip.x, top: tooltip.y }}
          >
            {tooltip.text}
          </div>
        )}
      </div>
    </Rnd>
  );
};

export default Projects;
