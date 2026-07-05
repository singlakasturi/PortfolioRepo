import React, { useState, useEffect } from 'react';

const Clippy = ({ launchApp }) => {
  const [bubbleVisible, setBubbleVisible] = useState(true);
  const [speech, setSpeech] = useState("It looks like you're looking for a software engineer. Would you like help navigating my portfolio?");

  const speeches = [
    "It looks like you're looking for a software engineer. Would you like help navigating my portfolio?",
    "Need help finding my projects? Just double-click on 'My Projects' folder!",
    "Double-click on 'Resume' to preview or download my latest professional CV.",
    "Did you know? You can play Minesweeper or draw on Paint from the Desktop!",
    "Try opening 'Notepad' or 'My Computer' to see more about my background.",
    "I am here to assist you. Don't hesitate to reach out via the 'Contact' shortcuts."
  ];

  const jokes = [
    "Why do Java programmers wear glasses? Because they don't C#!",
    "There are 10 types of people in the world: those who understand binary, and those who don't.",
    "What is a programmer's favorite hangout place? Foo Bar!",
    "Why did the computer go to the doctor? Because it had a virus!",
    "Why do programmers hate nature? It has too many bugs.",
    "How many programmers does it take to change a light bulb? None, that's a hardware problem!",
    "What's a programmer's favorite music genre? Algorhythm!"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (bubbleVisible) {
        const idx = Math.floor(Math.random() * speeches.length);
        setSpeech(speeches[idx]);
      }
    }, 25000); // changes tip every 25 seconds if bubble is open

    return () => clearInterval(timer);
  }, [bubbleVisible]);

  const handleTellJoke = () => {
    const idx = Math.floor(Math.random() * jokes.length);
    setSpeech(jokes[idx]);
  };

  return (
    <div className="fixed bottom-20 right-8 z-99 flex flex-col items-end select-none max-w-xs animate-fade-in pointer-events-auto">
      {/* Speech Bubble */}
      {bubbleVisible && (
        <div className="clippy-bubble mb-2 text-black text-xs p-3">
          <p className="mb-2 leading-relaxed">{speech}</p>
          
          {/* Interactive Menu Options */}
          <div className="border-t border-gray-300 pt-2 mt-2 flex flex-col gap-1">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Quick Tasks:</p>
            <div className="grid grid-cols-2 gap-1.5 mt-1 text-[11px]">
              <button
                onClick={() => { launchApp && launchApp(6); setSpeech("Opening My Projects explorer folder!"); }}
                className="text-left text-blue-800 hover:underline cursor-pointer flex items-center gap-1 font-semibold"
              >
                📁 Projects
              </button>
              <button
                onClick={() => { launchApp && launchApp(4); setSpeech("Opening Resume Viewer!"); }}
                className="text-left text-blue-800 hover:underline cursor-pointer flex items-center gap-1 font-semibold"
              >
                📄 Resume
              </button>
              <button
                onClick={() => { launchApp && launchApp(13); setSpeech("Starting Minesweeper game!"); }}
                className="text-left text-blue-800 hover:underline cursor-pointer flex items-center gap-1 font-semibold"
              >
                💣 Minesweeper
              </button>
              <button
                onClick={() => { launchApp && launchApp(12); setSpeech("Launching MS Paint!"); }}
                className="text-left text-blue-800 hover:underline cursor-pointer flex items-center gap-1 font-semibold"
              >
                🎨 MS Paint
              </button>
              <button
                onClick={() => { launchApp && launchApp(5); setSpeech("Opening Instant Messenger chat!"); }}
                className="text-left text-blue-800 hover:underline cursor-pointer flex items-center gap-1 font-semibold"
              >
                💬 Chat app
              </button>
              <button
                onClick={handleTellJoke}
                className="text-left text-purple-800 hover:underline cursor-pointer flex items-center gap-1 font-semibold"
              >
                🃏 Tell a Joke
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-gray-200 mt-2 pt-1.5">
            <button
              onClick={() => setBubbleVisible(false)}
              className="text-[10px] text-gray-500 hover:text-black font-semibold hover:underline cursor-pointer"
            >
              Hide Bubble
            </button>
          </div>
        </div>
      )}

      {/* Clippy Image Icon Representation */}
      <div 
        onClick={() => {
          if (!bubbleVisible) {
            setSpeech("Hello! How can I help you navigate Kasturi's portfolio today?");
          }
          setBubbleVisible(!bubbleVisible);
        }}
        className="mr-6 flex flex-col items-center cursor-pointer hover:scale-105 active:scale-95 transition-transform"
        title="Click to talk to Clippy!"
      >
        {/* SVG Clippy representation */}
        <div className="w-12 h-16 bg-[#e1e1e1] rounded-full border-2 border-gray-600 relative shadow-md flex items-center justify-center">
          {/* Eyes */}
          <div className="absolute top-4 left-3 w-2.5 h-2.5 bg-white rounded-full border border-black flex items-center justify-center">
            <div className="w-1 h-1 bg-black rounded-full" />
          </div>
          <div className="absolute top-4 right-3 w-2.5 h-2.5 bg-white rounded-full border border-black flex items-center justify-center">
            <div className="w-1 h-1 bg-black rounded-full" />
          </div>
          {/* Eyebrows */}
          <div className="absolute top-2.5 left-2 w-3.5 h-0.5 bg-black rotate-12" />
          <div className="absolute top-2.5 right-2 w-3.5 h-0.5 bg-black -rotate-12" />
          {/* Paperclip curve accent */}
          <div className="w-8 h-10 border-2 border-black rounded-full absolute bottom-2" />
        </div>
        <span className="text-[10px] text-white bg-black/60 px-1.5 py-0.5 rounded mt-1">Clippy</span>
      </div>
    </div>
  );
};

export default Clippy;
