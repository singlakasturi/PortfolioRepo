import React from 'react';
import { Rnd } from 'react-rnd';

const GettingStarted = ({ onClose, zIndex, onFocus, isMinimized, isMaximized, onMinimize, onMaximize }) => {
  return (
    <Rnd
      default={{ x: 180, y: 100, width: 500, height: 400 }}
      size={isMaximized ? { width: '100%', height: 'calc(100vh - 30px)' } : undefined}
      position={isMaximized ? { x: 0, y: 0 } : undefined}
      disableDragging={isMaximized}
      enableResizing={!isMaximized}
      minWidth={400}
      minHeight={300}
      bounds="window"
      dragHandleClassName="xp-titlebar"
      style={{ zIndex, display: isMinimized ? 'none' : 'block' }}
    >
      <div className="xp-window w-full h-full flex flex-col select-none" onMouseDown={onFocus}>
        {/* Header */}
        <div className="xp-titlebar">
          <div className="flex items-center">
            <span className="font-bold text-white pl-1">Welcome to Windows XP</span>
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

        {/* Content Panel */}
        <div className="flex-1 bg-white p-6 overflow-y-auto text-black flex flex-col gap-4 border-2 border-inset border-gray-300">
          <h2 className="text-xl font-bold text-blue-900 border-b border-gray-200 pb-2 flex items-center gap-2">
            🚀 Getting Started
          </h2>
          
          <p className="text-xs leading-relaxed text-gray-700">
            Welcome to the interactive software portfolio of <strong>Kasturi Lal Singla</strong>. This workspace replicates a classic desktop environment from the early 2000s.
          </p>

          <div className="bg-[#f0f4f9] border border-blue-200 p-3 rounded text-xs space-y-2">
            <h4 className="font-bold text-blue-950">Quick Tips:</h4>
            <ul className="list-disc pl-4 space-y-1 text-gray-700">
              <li><strong>Double-click</strong> icons on the desktop to launch applications.</li>
              <li>Use the <strong>Start Button</strong> in the bottom-left corner to access more programs and features.</li>
              <li>Click or drag window title bars to rearrange your workspace.</li>
              <li>Try opening the <strong>Recycle Bin</strong> for a nostalgic system surprise!</li>
            </ul>
          </div>

          <div className="mt-2 text-xs">
            <p><strong>System Specs:</strong> React, Spring Boot, Custom Luna Theme CSS styling.</p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#ece9d8] p-3 flex justify-end gap-2 border-t border-gray-400">
          <button className="xp-button w-20" onClick={onClose}>Close</button>
        </div>
      </div>
    </Rnd>
  );
};

export default GettingStarted;
