import React, { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';

const Pet = ({ onClose, zIndex, onFocus, isMinimized, isMaximized, onMinimize, onMaximize }) => {
  const [petState, setPetState] = useState('idle'); // 'idle', 'eating', 'sleeping', 'playing'
  const [hunger, setHunger] = useState(50);
  const [happiness, setHappiness] = useState(50);

  // Simple ASCII frame animations
  const frames = {
    idle: ['( ^..^)', '( -..-)', '( ^..^)'],
    eating: ['( ^oo^ ) *nom*', '( ^..^ ) *crunch*', '( ^oo^ ) *nom*'],
    sleeping: ['( -..- ) zZZ', '( -..- ) Zzz', '( -..- ) zzz'],
    playing: ['\\( ^..^)/ *yay*', '( ^..^ ) *jump*', '\\( ^..^)/ *yay*']
  };

  const [frameIdx, setFrameIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFrameIdx((prev) => (prev + 1) % frames[petState].length);
    }, 800);
    return () => clearInterval(timer);
  }, [petState]);

  // Pet hunger increase over time
  useEffect(() => {
    const hungerTimer = setInterval(() => {
      setHunger((prev) => Math.max(0, prev - 5));
      setHappiness((prev) => Math.max(0, prev - 3));
    }, 8000);
    return () => clearInterval(hungerTimer);
  }, []);

  const handleFeed = () => {
    setPetState('eating');
    setHunger((prev) => Math.min(100, prev + 25));
    setTimeout(() => setPetState('idle'), 2500);
  };

  const handlePlay = () => {
    setPetState('playing');
    setHappiness((prev) => Math.min(100, prev + 20));
    setHunger((prev) => Math.max(0, prev - 10));
    setTimeout(() => setPetState('idle'), 2500);
  };

  const handleSleep = () => {
    setPetState('sleeping');
    setTimeout(() => setPetState('idle'), 4000);
  };

  return (
    <Rnd
      default={{ x: 280, y: 120, width: 330, height: 280 }}
      size={isMaximized ? { width: '100%', height: 'calc(100vh - 30px)' } : undefined}
      position={isMaximized ? { x: 0, y: 0 } : undefined}
      disableDragging={isMaximized}
      enableResizing={!isMaximized}
      bounds="window"
      dragHandleClassName="xp-titlebar"
      style={{ zIndex, display: isMinimized ? 'none' : 'block' }}
    >
      <div className="xp-window w-full h-full flex flex-col select-none text-black" onMouseDown={onFocus}>
        {/* Header */}
        <div className="xp-titlebar">
          <div className="flex items-center">
            <span className="font-bold text-white pl-1">Virtual Desktop Pet</span>
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

        {/* Content */}
        <div className="flex-1 bg-[#ece9d8] p-4 flex flex-col items-center justify-between">
          {/* Animated ASCII representation */}
          <div className="bg-white border-2 border-inset border-gray-400 w-full h-24 flex items-center justify-center font-mono text-xl rounded-sm">
            {frames[petState][frameIdx]}
          </div>

          {/* Status Bars */}
          <div className="w-full text-xs space-y-1.5 font-bold text-gray-700">
            <div className="flex justify-between items-center">
              <span>Energy: {hunger}%</span>
              <div className="w-32 bg-gray-300 h-2 border border-gray-500 rounded-sm">
                <div className="bg-green-600 h-full" style={{ width: `${hunger}%` }}></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Love/Joy: {happiness}%</span>
              <div className="w-32 bg-gray-300 h-2 border border-gray-500 rounded-sm">
                <div className="bg-blue-600 h-full" style={{ width: `${happiness}%` }}></div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-2 w-full justify-center">
            <button className="xp-button text-xs font-bold w-18" onClick={handleFeed}>🍕 Feed</button>
            <button className="xp-button text-xs font-bold w-18" onClick={handlePlay}>🎾 Play</button>
            <button className="xp-button text-xs font-bold w-18" onClick={handleSleep}>💤 Sleep</button>
          </div>
        </div>
      </div>
    </Rnd>
  );
};

export default Pet;
