import React, { useState } from 'react';
import { Rnd } from 'react-rnd';

const ChatApp = ({ onClose, zIndex, onFocus, isMinimized, isMaximized, onMinimize, onMaximize }) => {
  const [messages, setMessages] = useState([
    { sender: 'Kasturi', text: 'Hello! Thanks for visiting my portfolio. Leave a message or ask me a question here!' }
  ]);
  const [input, setInput] = useState('');

  const autoReplies = [
    "I am currently looking for full-time backend or full-stack software engineer opportunities!",
    "My tech stack revolves around Java, Spring Boot, React, and SQL database designs.",
    "Be sure to check out the Projects Explorer window to inspect my code source and screenshots!",
    "You can find my email, GitHub, and LinkedIn links in the Explorer sidebar or the Start Menu.",
    "I'd love to chat more! Please reach out to me via email or LinkedIn.",
    "Windows XP Luna theme is my favorite retro UI design. I hope you enjoy the experience!"
  ];

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { sender: 'You', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Simulate retro typing reply
    setTimeout(() => {
      const idx = Math.floor(Math.random() * autoReplies.length);
      const reply = { sender: 'Kasturi', text: autoReplies[idx] };
      setMessages((prev) => [...prev, reply]);
    }, 1200);
  };

  return (
    <Rnd
      default={{ x: 220, y: 80, width: 380, height: 460 }}
      size={isMaximized ? { width: '100%', height: 'calc(100vh - 30px)' } : undefined}
      position={isMaximized ? { x: 0, y: 0 } : undefined}
      disableDragging={isMaximized}
      enableResizing={!isMaximized}
      minWidth={300}
      minHeight={350}
      bounds="window"
      dragHandleClassName="xp-titlebar"
      style={{ zIndex, display: isMinimized ? 'none' : 'block' }}
    >
      <div className="xp-window w-full h-full flex flex-col select-none text-black" onMouseDown={onFocus}>
        {/* Header */}
        <div className="xp-titlebar">
          <div className="flex items-center">
            <span className="font-bold text-white pl-1">Kasturi - Instant Messenger</span>
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
        <div className="xp-menu-bar text-black text-[10px]">
          <span className="xp-menu-item">Actions</span>
          <span className="xp-menu-item">Help</span>
        </div>

        {/* Messaging area */}
        <div className="flex-1 bg-white p-2 overflow-y-auto flex flex-col gap-2 border-2 border-inset border-gray-300">
          {messages.map((m, idx) => (
            <div key={idx} className="text-xs">
              <span className={`font-bold ${m.sender === 'You' ? 'text-blue-700' : 'text-red-700'}`}>
                {m.sender}:
              </span>
              <span className="ml-1 leading-normal text-gray-800">{m.text}</span>
            </div>
          ))}
        </div>

        {/* Input box */}
        <form onSubmit={handleSend} className="bg-[#ece9d8] p-2 flex gap-1.5 border-t border-gray-400">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-2 py-1 text-xs border border-gray-400 bg-white text-black outline-none"
          />
          <button type="submit" className="xp-button font-bold text-xs">Send</button>
        </form>
      </div>
    </Rnd>
  );
};

export default ChatApp;
