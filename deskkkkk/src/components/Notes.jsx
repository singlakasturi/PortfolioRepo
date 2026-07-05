import React, { useState } from 'react';
import { Rnd } from 'react-rnd';

const Notes = ({ onClose, zIndex, onFocus, isMinimized, isMaximized, onMinimize, onMaximize }) => {
  const [text, setText] = useState(
    `ABOUT ME\n========\n\nHello! I am Kasturi Lal Singla, a Full-Stack Software Engineer.\n\nTECHNICAL SKILLS:\n-----------------\n- Backend: Java, Spring Boot, REST APIs\n- Frontend: React, JavaScript, HTML5, CSS3, TailwindCSS\n- Database: PostgreSQL, MySQL\n- Cloud & DevOps: AWS, Git, CI/CD, Docker\n\nCAREER OBJECTIVE:\n-----------------\nI strive to build highly performant web applications, design clean systems, and explore interactive frontend innovations.\n\nFeel free to write your notes here, or check out my projects and resume folders!\n`
  );

  return (
    <Rnd
      default={{ x: 200, y: 100, width: 500, height: 450 }}
      size={isMaximized ? { width: '100%', height: 'calc(100vh - 30px)' } : undefined}
      position={isMaximized ? { x: 0, y: 0 } : undefined}
      disableDragging={isMaximized}
      enableResizing={!isMaximized}
      minWidth={300}
      minHeight={200}
      bounds="window"
      dragHandleClassName="xp-titlebar"
      style={{ zIndex, display: isMinimized ? 'none' : 'block' }}
    >
      <div className="xp-window w-full h-full flex flex-col select-none" onMouseDown={onFocus}>
        {/* Header */}
        <div className="xp-titlebar">
          <div className="flex items-center">
            <span className="font-bold text-white pl-1">AboutMe.txt - Notepad</span>
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

        {/* Notepad Menu Bar */}
        <div className="xp-menu-bar text-black text-xs">
          <span className="xp-menu-item">File</span>
          <span className="xp-menu-item">Edit</span>
          <span className="xp-menu-item">Format</span>
          <span className="xp-menu-item">View</span>
          <span className="xp-menu-item">Help</span>
        </div>

        {/* Text Area */}
        <div className="flex-1 bg-white p-0.5 flex">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="notepad-textarea flex-1 w-full h-full text-black outline-none resize-none border-none"
            spellCheck="false"
          />
        </div>
      </div>
    </Rnd>
  );
};

export default Notes;