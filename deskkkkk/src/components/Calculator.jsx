import React, { useState } from 'react';
import { Rnd } from 'react-rnd';

const Calculator = ({ onClose, zIndex, onFocus, isMinimized, isMaximized, onMinimize, onMaximize }) => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [shouldReset, setShouldReset] = useState(false);

  const handleNum = (num) => {
    if (display === '0' || shouldReset) {
      setDisplay(num);
      setShouldReset(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOp = (op) => {
    setEquation(display + ' ' + op + ' ');
    setShouldReset(true);
  };

  const handleCalc = () => {
    if (!equation) return;
    try {
      const fullEq = equation + display;
      // Using direct simple math solver safely
      const result = Function(`"use strict"; return (${fullEq})`)();
      setDisplay(String(result));
      setEquation('');
      setShouldReset(true);
    } catch (e) {
      setDisplay('Error');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  const buttons = [
    { label: 'MC', type: 'mem' }, { label: 'MR', type: 'mem' }, { label: 'MS', type: 'mem' }, { label: 'M+', type: 'mem' },
    { label: '7', type: 'num' }, { label: '8', type: 'num' }, { label: '9', type: 'num' }, { label: '/', type: 'op' },
    { label: '4', type: 'num' }, { label: '5', type: 'num' }, { label: '6', type: 'num' }, { label: '*', type: 'op' },
    { label: '1', type: 'num' }, { label: '2', type: 'num' }, { label: '3', type: 'num' }, { label: '-', type: 'op' },
    { label: '0', type: 'num' }, { label: '.', type: 'num' }, { label: '=', type: 'calc' }, { label: '+', type: 'op' }
  ];

  return (
    <Rnd
      default={{ x: 300, y: 150, width: 260, height: 320 }}
      size={isMaximized ? { width: '100%', height: 'calc(100vh - 30px)' } : undefined}
      position={isMaximized ? { x: 0, y: 0 } : undefined}
      disableDragging={isMaximized}
      enableResizing={!isMaximized}
      bounds="window"
      dragHandleClassName="xp-titlebar"
      style={{ zIndex, display: isMinimized ? 'none' : 'block' }}
    >
      <div className="xp-window w-full h-full flex flex-col" onMouseDown={onFocus}>
        {/* Header */}
        <div className="xp-titlebar">
          <div className="flex items-center">
            <span className="font-bold text-white pl-1">Calculator</span>
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
          <span className="xp-menu-item">Edit</span>
          <span className="xp-menu-item">View</span>
          <span className="xp-menu-item">Help</span>
        </div>

        {/* Calculator Body */}
        <div className="p-3 flex-1 flex flex-col justify-between bg-[#ece9d8]">
          {/* Display */}
          <div className="bg-white border-2 border-gray-400 p-2 text-right text-lg font-mono mb-3 overflow-hidden text-ellipsis whitespace-nowrap text-black">
            {display}
          </div>

          {/* Action buttons (Back, CE, C) */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            <button className="xp-button text-red-700 font-bold" onClick={() => setDisplay(display.length > 1 ? display.slice(0, -1) : '0')}>Back</button>
            <button className="xp-button text-red-700 font-bold" onClick={() => setDisplay('0')}>CE</button>
            <button className="xp-button text-red-700 font-bold" onClick={handleClear}>C</button>
          </div>

          {/* Keypad */}
          <div className="grid grid-cols-4 gap-2 flex-1">
            {buttons.map((btn, idx) => (
              <button
                key={idx}
                className={`xp-button font-bold ${btn.type === 'num' ? 'text-blue-900' : 'text-red-700'}`}
                onClick={() => {
                  if (btn.type === 'num') handleNum(btn.label);
                  else if (btn.type === 'op') handleOp(btn.label);
                  else if (btn.type === 'calc') handleCalc();
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Rnd>
  );
};

export default Calculator;
