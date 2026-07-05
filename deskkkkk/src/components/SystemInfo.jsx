import React, { useState } from 'react';
import { Rnd } from 'react-rnd';

const SystemInfo = ({ onClose, zIndex, onFocus, isMinimized, isMaximized, onMinimize, onMaximize }) => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <Rnd
      default={{ x: 220, y: 90, width: 420, height: 440 }}
      size={isMaximized ? { width: '100%', height: 'calc(100vh - 30px)' } : undefined}
      position={isMaximized ? { x: 0, y: 0 } : undefined}
      disableDragging={isMaximized}
      enableResizing={!isMaximized}
      bounds="window"
      dragHandleClassName="xp-titlebar"
      style={{ zIndex, display: isMinimized ? 'none' : 'block' }}
    >
      <div className="xp-window w-full h-full flex flex-col select-none" onMouseDown={onFocus}>
        {/* Header */}
        <div className="xp-titlebar">
          <div className="flex items-center">
            <span className="font-bold text-white pl-1">System Properties</span>
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

        {/* Tab Headers */}
        <div className="flex bg-[#ece9d8] pt-2 px-2 gap-1 border-b border-gray-400">
          <button
            onClick={() => setActiveTab('general')}
            className={`px-3 py-1 text-xs border-t border-x border-gray-400 rounded-t-md ${
              activeTab === 'general' ? 'bg-white font-bold translate-y-px z-10' : 'bg-gray-200'
            }`}
          >
            General
          </button>
          <button
            onClick={() => setActiveTab('developer')}
            className={`px-3 py-1 text-xs border-t border-x border-gray-400 rounded-t-md ${
              activeTab === 'developer' ? 'bg-white font-bold translate-y-px z-10' : 'bg-gray-200'
            }`}
          >
            Developer
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white flex-1 p-4 overflow-y-auto text-xs text-black border-inset border-2 border-gray-300">
          {activeTab === 'general' ? (
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-blue-100 flex items-center justify-center border border-blue-400 font-bold text-blue-600 rounded">
                  💻
                </div>
                <div>
                  <h3 className="font-bold text-sm">System:</h3>
                  <p>Microsoft Windows XP</p>
                  <p>Professional</p>
                  <p>Version 2002</p>
                  <p>Service Pack 3</p>
                </div>
              </div>

              <div className="border-t border-gray-300 pt-3">
                <h3 className="font-bold text-sm">Registered to:</h3>
                <p className="pl-4 font-semibold text-gray-700">Kasturi Portfolio</p>
                <p className="pl-4">Software Developer Portfolio</p>
              </div>

              <div className="border-t border-gray-300 pt-3">
                <h3 className="font-bold text-sm">Computer:</h3>
                <p className="pl-4">Intel(R) Core(TM) i7 CPU @ 2.40GHz</p>
                <p className="pl-4">16.0 GB of RAM</p>
                <p className="pl-4">Physical Address Extension</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <h3 className="font-bold text-sm border-b border-gray-300 pb-1">About the Developer</h3>
              <p><strong>Name:</strong> Kasturi Lal Singla</p>
              <p><strong>Role:</strong> Full-Stack Software Engineer</p>
              <p><strong>Interests:</strong> Web Apps, Retro UI/UX, Backend APIs, Java Spring Boot, React ecosystems.</p>
              
              <div className="bg-blue-50 border border-blue-200 p-3 rounded mt-2">
                <p className="font-semibold text-blue-900 mb-1">Mission Statement:</p>
                <p className="italic text-gray-700 leading-normal">
                  "Building highly reliable systems, engaging frontend designs, and nostalgic interactive simulations. Ready to tackle modern tech challenges with classic craftsmanship."
                </p>
              </div>

              <div className="pt-2 text-center">
                <p className="text-[10px] text-gray-500">Designed with passion in 2026</p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons Footer */}
        <div className="bg-[#ece9d8] p-3 flex justify-end gap-2 border-t border-gray-400">
          <button className="xp-button w-20" onClick={onClose}>OK</button>
          <button className="xp-button w-20" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </Rnd>
  );
};

export default SystemInfo;
