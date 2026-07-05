import React, { useRef, useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';

const Paint = ({ onClose, zIndex, onFocus, isMinimized, isMaximized, onMinimize, onMaximize }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(4);
  const [tool, setTool] = useState('brush'); // 'brush', 'eraser'

  const colors = [
    '#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080', '#808040', '#004040', '#0080ff', '#004080', '#4000ff', '#804000',
    '#ffffff', '#c0c0c0', '#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff', '#ffff80', '#00ff80', '#80ffff', '#8080ff', '#ff8000', '#ff8080'
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <Rnd
      default={{ x: 180, y: 120, width: 550, height: 420 }}
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
      <div className="xp-window w-full h-full flex flex-col" onMouseDown={onFocus}>
        {/* Header */}
        <div className="xp-titlebar">
          <div className="flex items-center">
            <span className="font-bold text-white pl-1">untitled - Paint</span>
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
          <span className="xp-menu-item" onClick={clearCanvas}>Clear Image</span>
          <span className="xp-menu-item">Edit</span>
          <span className="xp-menu-item">View</span>
          <span className="xp-menu-item">Help</span>
        </div>

        {/* Paint Interface */}
        <div className="flex flex-1 overflow-hidden bg-[#808080] p-1 gap-1">
          {/* Toolbar Left */}
          <div className="w-12 bg-[#ece9d8] border border-gray-400 p-1 flex flex-col gap-1 items-center justify-start">
            <button
              onClick={() => setTool('brush')}
              className={`p-1 w-full border ${tool === 'brush' ? 'bg-[#d6d2c4] border-inset' : 'bg-transparent border-transparent'} hover:bg-gray-200`}
              title="Brush"
            >
              🖌️
            </button>
            <button
              onClick={() => setTool('eraser')}
              className={`p-1 w-full border ${tool === 'eraser' ? 'bg-[#d6d2c4] border-inset' : 'bg-transparent border-transparent'} hover:bg-gray-200`}
              title="Eraser"
            >
              🧽
            </button>
            <div className="border-t border-gray-400 w-full my-2"></div>
            <span className="text-[9px] font-bold text-gray-700">Size</span>
            <input
              type="range"
              min="2"
              max="20"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-full cursor-pointer"
            />
          </div>

          {/* Canvas Wrapper */}
          <div className="flex-1 bg-gray-500 overflow-auto p-2 flex justify-center items-center">
            <canvas
              ref={canvasRef}
              width={600}
              height={400}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className="bg-white shadow-md cursor-crosshair"
            />
          </div>
        </div>

        {/* Color Palette Bottom */}
        <div className="bg-[#ece9d8] border-t border-gray-400 p-2 flex items-center gap-2">
          <div className="w-8 h-8 border-2 border-gray-400 flex justify-center items-center bg-white" style={{ backgroundColor: color }}>
            <div className="w-4 h-4 border border-black" style={{ backgroundColor: color }} />
          </div>
          <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(14, minmax(0, 1fr))' }}>
            {colors.map((c, idx) => (
              <div
                key={idx}
                onClick={() => setColor(c)}
                className="w-4 h-4 border border-gray-500 cursor-pointer hover:scale-110"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
      </div>
    </Rnd>
  );
};

export default Paint;
