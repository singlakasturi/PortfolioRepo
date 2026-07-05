import React, { useState } from 'react';
import { Rnd } from 'react-rnd';

const SoundSettings = ({ onClose, zIndex, onFocus, isMinimized, isMaximized, onMinimize, onMaximize }) => {
  const [volume, setVolume] = useState(70);
  const [balance, setBalance] = useState(50);
  const [mute, setMute] = useState(false);

  const playBeep = (freq = 440) => {
    if (mute) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gainNode.gain.setValueAtTime((volume / 100) * 0.1, audioCtx.currentTime);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.1);
    } catch (e) {
      console.log('Audio Context failed to start');
    }
  };

  return (
    <Rnd
      default={{ x: 260, y: 150, width: 320, height: 330 }}
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
            <span className="font-bold text-white pl-1">Volume Control</span>
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
        <div className="flex-1 bg-[#ece9d8] p-4 text-black text-xs flex flex-col gap-4">
          <div className="border border-gray-400 p-3 bg-white/40 flex flex-col gap-4 rounded-sm">
            {/* Balance */}
            <div className="flex flex-col gap-1 items-center">
              <span className="font-bold text-gray-700">Balance</span>
              <div className="flex justify-between w-full text-[10px] text-gray-500 px-2">
                <span>L</span>
                <span>R</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={balance}
                onChange={(e) => {
                  setBalance(Number(e.target.value));
                  playBeep(440 + (balance - 50) * 2);
                }}
                className="w-full cursor-pointer"
              />
            </div>

            {/* Volume */}
            <div className="flex flex-col gap-1 items-center border-t border-gray-300 pt-3">
              <span className="font-bold text-gray-700">Volume</span>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => {
                  setVolume(Number(e.target.value));
                  playBeep(520);
                }}
                className="w-full cursor-pointer h-12"
                style={{ transform: 'rotate(-90deg)', width: '80px', height: '80px', transformOrigin: 'center' }}
              />
              <span className="text-[10px] text-gray-500 mt-1">Level: {volume}%</span>
            </div>
          </div>

          {/* Mute checkbox */}
          <label className="flex items-center gap-2 cursor-pointer font-bold mt-2">
            <input
              type="checkbox"
              checked={mute}
              onChange={(e) => setMute(e.target.checked)}
              className="cursor-pointer"
            />
            Mute all sound effects
          </label>
        </div>

        {/* Footer */}
        <div className="bg-[#ece9d8] p-3 flex justify-end gap-2 border-t border-gray-400">
          <button className="xp-button w-20" onClick={onClose}>OK</button>
        </div>
      </div>
    </Rnd>
  );
};

export default SoundSettings;
