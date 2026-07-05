import './App.css'
import thispc from './assets/computer.webp'
import internet from './assets/internet.webp'
import bin from './assets/bin.webp'
import pdf from './assets/pdf.png'
import leet from './assets/twitter.png'
import lin from './assets/lin.png'
import git from './assets/git.png'
import doom from './assets/doom.webp'
import start from './assets/start.png'
import vol from './assets/vol.png'
import notes from './assets/notes.webp'
import panel from './assets/panel.webp'
import sound from './assets/sound.webp'
import trt from './assets/trt.png'
import pet from './assets/pet.webp'
import wtsp from './assets/wtsp.webp'
import direct from './assets/direct.png'
import calcIcon from './assets/calc_icon.png'
import paintIcon from './assets/paint_icon.png'
import minesIcon from './assets/mines_icon.png'
import { useState, useEffect, useRef } from 'react'

import Internet from './components/Internet'
import Projects from './components/Projects'
import Notes from './components/Notes'
import Video from './components/Video'
import ShutDown from './components/ShutDown'

// New components
import BootScreen from './components/BootScreen'
import Calculator from './components/Calculator'
import Paint from './components/Paint'
import Minesweeper from './components/Minesweeper'
import SystemInfo from './components/SystemInfo'
import ResumeViewer from './components/ResumeViewer'
import GettingStarted from './components/GettingStarted'
import SoundSettings from './components/SoundSettings'
import Pet from './components/Pet'
import ChatApp from './components/ChatApp'
import Clippy from './components/Clippy'

export const icons = [
  { id: 1, label: 'My Computer', icon: thispc },
  { id: 2, label: 'Internet Explorer', icon: internet },
  { id: 3, label: 'Recycle Bin', icon: bin },
  { id: 4, label: 'Resume', icon: pdf },
  { id: 17, label: 'LeetCode', icon: leet },
  { id: 6, label: 'My Projects', icon: doom },
  { id: 7, label: 'GitHub', icon: git },
  { id: 8, label: 'LinkedIn', icon: lin },
  { id: 9, label: 'Notepad', icon: notes },
  { id: 10, label: 'Horror Video', icon: trt },
  { id: 11, label: 'Calculator', icon: calcIcon },
  { id: 12, label: 'MS Paint', icon: paintIcon },
  { id: 13, label: 'Minesweeper', icon: minesIcon },
  { id: 14, label: 'Getting Started', icon: panel },
  { id: 15, label: 'Sound Settings', icon: sound },
  { id: 16, label: 'Virtual Pet', icon: pet },
  { id: 5, label: 'Instant Chat', icon: wtsp }
];

function App() {
  const [booting, setBooting] = useState(true);
  const [bsod, setBsod] = useState(false);
  const [shut, setShut] = useState(false);

  const [openApp, setOpenApp] = useState([]);
  const [minimizedApps, setMinimizedApps] = useState([]);
  const [maximizedApps, setMaximizedApps] = useState([]);
  const [windowOrder, setWindowOrder] = useState([]); // tracks active window ordering (depth/z-index)
  const [selectedId, setSelectedId] = useState(null);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const startMenuRef = useRef(null);

  const toggleStart = (e) => {
    e.stopPropagation();
    setShowStartMenu(prev => !prev);
  };

  const handleDeselect = () => setSelectedId(null);

  // Z-Index depth helper
  const bringToFront = (appId) => {
    setWindowOrder(prev => {
      const filtered = prev.filter(id => id !== appId);
      return [...filtered, appId];
    });
  };

  const launchApp = (appId) => {
    if (!openApp.includes(appId)) {
      setOpenApp([...openApp, appId]);
    }
    setMinimizedApps(prev => prev.filter(id => id !== appId));
    bringToFront(appId);
  };

  const closeApp = (appId) => {
    setOpenApp(openApp.filter(id => id !== appId));
    setWindowOrder(windowOrder.filter(id => id !== appId));
    setMinimizedApps(prev => prev.filter(id => id !== appId));
    setMaximizedApps(prev => prev.filter(id => id !== appId));
  };

  const toggleMinimize = (appId) => {
    if (minimizedApps.includes(appId)) {
      setMinimizedApps(prev => prev.filter(id => id !== appId));
      bringToFront(appId);
    } else {
      setMinimizedApps(prev => [...prev, appId]);
    }
  };

  const toggleMaximize = (appId) => {
    if (maximizedApps.includes(appId)) {
      setMaximizedApps(prev => prev.filter(id => id !== appId));
    } else {
      setMaximizedApps(prev => [...prev, appId]);
    }
  };

  useEffect(() => {
    // External link apps
    if (openApp.includes(8)) {
      window.open(`${import.meta.env.VITE_API_URL}/api/linkedin`, '_blank');
      closeApp(8);
    }
    if (openApp.includes(7)) {
      window.open(`${import.meta.env.VITE_API_URL}/api/github`, '_blank');
      closeApp(7);
    }
    if (openApp.includes(17)) {
      window.open(`${import.meta.env.VITE_API_URL}/api/leetcode`, '_blank');
      closeApp(17);
    }
  }, [openApp]);

  // Close start menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (startMenuRef.current && !startMenuRef.current.contains(e.target)) {
        setShowStartMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (booting) {
    return <BootScreen onBootComplete={() => setBooting(false)} />;
  }

  if (bsod) {
    return (
      <div
        className="bsod-screen w-screen h-screen cursor-pointer flex flex-col justify-between"
        onClick={() => setBsod(false)}
      >
        <div>
          <p className="mb-4 text-center bg-white text-[#0000aa] px-2 inline-block">A problem has been detected and Windows has been shut down to prevent damage to your computer.</p>
          <p className="mb-4">KASTURI_PORTFOLIO_SUCCESSFUL_REDESIGN</p>
          <p className="mb-4">If this is the first time you've seen this Stop error screen, restart your computer. If this screen appears again, follow these steps:</p>
          <p className="mb-4">Check to make sure any new hardware or software is properly installed. If this is a new installation, ask your hardware or software manufacturer for any Windows updates you might need.</p>
          <p className="mb-4">Technical information:</p>
          <p className="font-mono">*** STOP: 0x000000D1 (0x0000000C, 0x00000002, 0x00000000, 0xF86B5A8F)</p>
        </div>
        <p className="text-center animate-pulse">Click anywhere to reboot back to the desktop...</p>
      </div>
    );
  }

  return (
    <>
      {shut && <ShutDown setShut={setShut} />}

      <div
        className="w-screen h-screen bg-cover bg-no-repeat bg-center relative select-none font-sans"
        style={{ backgroundImage: "url('/wallpaper.jpeg')" }}
        onClick={handleDeselect}
      >
        {/* Desktop Icons */}
        <div className="absolute top-0 left-0 p-4 grid grid-flow-col grid-rows-6 gap-y-4 gap-x-2 text-white text-xs select-none">
          {icons.map(({ id, label, icon }) => (
            <div
              key={id}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedId(id);
              }}
              onDoubleClick={() => {
                if (id === 3) {
                  setBsod(true); // Recycle bin easter egg triggers BSOD!
                } else if (id === 7) {
                  window.open(`${import.meta.env.VITE_API_URL}/api/github`, '_blank');
                } else if (id === 8) {
                  window.open(`${import.meta.env.VITE_API_URL}/api/linkedin`, '_blank');
                } else if (id === 17) {
                  window.open(`${import.meta.env.VITE_API_URL}/api/leetcode`, '_blank');
                } else {
                  launchApp(id);
                }
              }}
              className={`w-20 h-24 flex flex-col items-center justify-center text-center cursor-pointer p-1 transition-all duration-75 ${
                selectedId === id ? 'xp-selected-icon' : ''
              }`}
            >
              <img src={icon} alt={label} className="w-10 h-10 mb-1 drop-shadow-md image-rendering-pixelated" />
              <p className={`xp-icon-shadow px-1 rounded-sm line-clamp-2 ${selectedId === id ? 'xp-selected-label' : ''}`}>
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Windows Rendering */}
        {openApp.includes(1) && (
          <SystemInfo
            onClose={() => closeApp(1)}
            isMinimized={minimizedApps.includes(1)}
            isMaximized={maximizedApps.includes(1)}
            onMinimize={() => toggleMinimize(1)}
            onMaximize={() => toggleMaximize(1)}
            zIndex={windowOrder.indexOf(1) + 10}
            onFocus={() => bringToFront(1)}
          />
        )}

        {openApp.includes(2) && (
          <Internet
            onClose={() => closeApp(2)}
            isMinimized={minimizedApps.includes(2)}
            isMaximized={maximizedApps.includes(2)}
            onMinimize={() => toggleMinimize(2)}
            onMaximize={() => toggleMaximize(2)}
            zIndex={windowOrder.indexOf(2) + 10}
            onFocus={() => bringToFront(2)}
          />
        )}

        {openApp.includes(4) && (
          <ResumeViewer
            onClose={() => closeApp(4)}
            isMinimized={minimizedApps.includes(4)}
            isMaximized={maximizedApps.includes(4)}
            onMinimize={() => toggleMinimize(4)}
            onMaximize={() => toggleMaximize(4)}
            zIndex={windowOrder.indexOf(4) + 10}
            onFocus={() => bringToFront(4)}
          />
        )}

        {openApp.includes(6) && (
          <Projects
            onClose={() => closeApp(6)}
            isMinimized={minimizedApps.includes(6)}
            isMaximized={maximizedApps.includes(6)}
            onMinimize={() => toggleMinimize(6)}
            onMaximize={() => toggleMaximize(6)}
            zIndex={windowOrder.indexOf(6) + 10}
            onFocus={() => bringToFront(6)}
          />
        )}

        {openApp.includes(9) && (
          <Notes
            onClose={() => closeApp(9)}
            isMinimized={minimizedApps.includes(9)}
            isMaximized={maximizedApps.includes(9)}
            onMinimize={() => toggleMinimize(9)}
            onMaximize={() => toggleMaximize(9)}
            zIndex={windowOrder.indexOf(9) + 10}
            onFocus={() => bringToFront(9)}
          />
        )}

        {openApp.includes(10) && (
          <Video
            onClose={() => closeApp(10)}
            isMinimized={minimizedApps.includes(10)}
            isMaximized={maximizedApps.includes(10)}
            onMinimize={() => toggleMinimize(10)}
            onMaximize={() => toggleMaximize(10)}
            zIndex={windowOrder.indexOf(10) + 10}
            onFocus={() => bringToFront(10)}
          />
        )}

        {openApp.includes(11) && (
          <Calculator
            onClose={() => closeApp(11)}
            isMinimized={minimizedApps.includes(11)}
            isMaximized={maximizedApps.includes(11)}
            onMinimize={() => toggleMinimize(11)}
            onMaximize={() => toggleMaximize(11)}
            zIndex={windowOrder.indexOf(11) + 10}
            onFocus={() => bringToFront(11)}
          />
        )}

        {openApp.includes(12) && (
          <Paint
            onClose={() => closeApp(12)}
            isMinimized={minimizedApps.includes(12)}
            isMaximized={maximizedApps.includes(12)}
            onMinimize={() => toggleMinimize(12)}
            onMaximize={() => toggleMaximize(12)}
            zIndex={windowOrder.indexOf(12) + 10}
            onFocus={() => bringToFront(12)}
          />
        )}

        {openApp.includes(13) && (
          <Minesweeper
            onClose={() => closeApp(13)}
            isMinimized={minimizedApps.includes(13)}
            isMaximized={maximizedApps.includes(13)}
            onMinimize={() => toggleMinimize(13)}
            onMaximize={() => toggleMaximize(13)}
            zIndex={windowOrder.indexOf(13) + 10}
            onFocus={() => bringToFront(13)}
          />
        )}

        {openApp.includes(14) && (
          <GettingStarted
            onClose={() => closeApp(14)}
            isMinimized={minimizedApps.includes(14)}
            isMaximized={maximizedApps.includes(14)}
            onMinimize={() => toggleMinimize(14)}
            onMaximize={() => toggleMaximize(14)}
            zIndex={windowOrder.indexOf(14) + 10}
            onFocus={() => bringToFront(14)}
          />
        )}

        {openApp.includes(15) && (
          <SoundSettings
            onClose={() => closeApp(15)}
            isMinimized={minimizedApps.includes(15)}
            isMaximized={maximizedApps.includes(15)}
            onMinimize={() => toggleMinimize(15)}
            onMaximize={() => toggleMaximize(15)}
            zIndex={windowOrder.indexOf(15) + 10}
            onFocus={() => bringToFront(15)}
          />
        )}

        {openApp.includes(16) && (
          <Pet
            onClose={() => closeApp(16)}
            isMinimized={minimizedApps.includes(16)}
            isMaximized={maximizedApps.includes(16)}
            onMinimize={() => toggleMinimize(16)}
            onMaximize={() => toggleMaximize(16)}
            zIndex={windowOrder.indexOf(16) + 10}
            onFocus={() => bringToFront(16)}
          />
        )}

        {openApp.includes(5) && (
          <ChatApp
            onClose={() => closeApp(5)}
            isMinimized={minimizedApps.includes(5)}
            isMaximized={maximizedApps.includes(5)}
            onMinimize={() => toggleMinimize(5)}
            onMaximize={() => toggleMaximize(5)}
            zIndex={windowOrder.indexOf(5) + 10}
            onFocus={() => bringToFront(5)}
          />
        )}

        {/* Taskbar bottom */}
        <div
          className="fixed bottom-0 w-full z-100 xp-taskbar flex flex-row items-center justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Start Button & Active Tasks */}
          <div className="flex flex-row h-full items-center">
            {/* Start Button */}
            {/* Circular Start Button */}
            <div
              onClick={toggleStart}
              className="vista-start-button-classic"
            >
              <svg className="w-5 h-5 filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]" viewBox="0 0 24 24">
                <path d="M2.5 5.5 C 5.5 5.5, 7.5 4.5, 11 4.5 L 11 11.5 C 7.5 11.5, 5.5 12.5, 2.5 12.5 Z" fill="#f34822" />
                <path d="M2.5 12.5 C 5.5 12.5, 7.5 11.5, 11 11.5 L 11 18.5 C 7.5 18.5, 5.5 19.5, 2.5 19.5 Z" fill="#00a1f1" />
                <path d="M12 4.3 C 15 4.3, 17 5.3, 20.5 5.3 L 20.5 11.8 C 17 11.8, 15 10.8, 12 10.8 Z" fill="#7fba00" />
                <path d="M12 10.8 C 15 10.8, 17 11.8, 20.5 11.8 L 20.5 18.3 C 17 18.3, 15 17.3, 12 17.3 Z" fill="#ffb900" />
              </svg>
            </div>

            {/* Active window tabs */}
            <div className="flex flex-row items-center gap-1.5 px-3">
              {openApp.map((id) => {
                const app = icons.find(icon => icon.id === id);
                if (!app) return null;
                const isFocused = windowOrder[windowOrder.length - 1] === id && !minimizedApps.includes(id);
                return (
                  <button
                    key={id}
                    onClick={() => {
                      if (isFocused) {
                        toggleMinimize(id);
                      } else {
                        if (minimizedApps.includes(id)) {
                          toggleMinimize(id);
                        } else {
                          bringToFront(id);
                        }
                      }
                    }}
                    className={`xp-task-button ${isFocused ? 'active' : ''}`}
                  >
                    <img src={app.icon} className="h-3.5 w-3.5 image-rendering-pixelated" alt="" />
                    <span className="truncate">{app.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* System Tray (clock, vol, network) */}
          <div className="xp-system-tray text-[11px] flex flex-row items-center gap-2">
            <img src={vol} className="w-3.5 h-3.5" alt="Volume" />
            <div className="font-mono text-white text-right">
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>

        {/* Vista-styled Start Menu Popup */}
        {showStartMenu && (
          <div
            ref={startMenuRef}
            className="vista-start-menu-classic"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Column (White) */}
            <div className="vista-left-classic">
              {/* This PC */}
              <div
                onClick={() => { launchApp(1); setShowStartMenu(false); }}
                className="vista-classic-item-left"
              >
                <img src={thispc} alt="" />
                <span className="font-semibold text-black">This PC</span>
              </div>

              {/* Notes */}
              <div
                onClick={() => { launchApp(9); setShowStartMenu(false); }}
                className="vista-classic-item-left"
              >
                <img src={notes} alt="" />
                <span className="font-semibold text-black">Notes</span>
              </div>

              {/* Getting Started */}
              <div
                onClick={() => { launchApp(14); setShowStartMenu(false); }}
                className="vista-classic-item-left"
              >
                <img src={panel} alt="" />
                <span className="font-semibold text-black">Getting Started</span>
              </div>

              {/* Internet Explorer */}
              <div
                onClick={() => { launchApp(2); setShowStartMenu(false); }}
                className="vista-classic-item-left"
              >
                <img src={internet} alt="" />
                <span className="font-semibold text-black">Internet Explorer</span>
              </div>

              {/* Sound Settings */}
              <div
                onClick={() => { launchApp(15); setShowStartMenu(false); }}
                className="vista-classic-item-left"
              >
                <img src={sound} alt="" />
                <span className="font-semibold text-black">Sound Settings</span>
              </div>

              {/* Pet */}
              <div
                onClick={() => { launchApp(16); setShowStartMenu(false); }}
                className="vista-classic-item-left"
              >
                <img src={pet} alt="" />
                <span className="font-semibold text-black">Pet</span>
              </div>

              {/* Chat */}
              <div
                onClick={() => { launchApp(5); setShowStartMenu(false); }}
                className="vista-classic-item-left"
              >
                <img src={wtsp} alt="" />
                <span className="font-semibold text-black">Chat</span>
              </div>

              {/* Horror */}
              <div
                onClick={() => { launchApp(10); setShowStartMenu(false); }}
                className="vista-classic-item-left"
              >
                <img src={trt} alt="" />
                <span className="font-semibold text-black">Horror</span>
              </div>

              <div className="vista-classic-divider-left mt-auto"></div>

              {/* All Programs */}
              <div className="vista-classic-item-left font-semibold text-black justify-between hover:bg-gray-100 py-1.5 px-2">
                <span className="flex items-center gap-1.5">
                  <span className="text-black font-semibold text-sm">▶</span>
                  All Programs
                </span>
              </div>
            </div>

            {/* Right Column (Light Blue gradient) */}
            <div className="vista-right-classic">
              <div className="vista-classic-right-list">
                <div className="vista-classic-item-right" onClick={() => setShowStartMenu(false)}>Documents</div>
                <div className="vista-classic-item-right" onClick={() => setShowStartMenu(false)}>Downloads</div>
                <div className="vista-classic-item-right" onClick={() => setShowStartMenu(false)}>Pictures</div>
                <div className="vista-classic-item-right" onClick={() => setShowStartMenu(false)}>Music</div>
                <div className="vista-classic-item-right" onClick={() => { launchApp(13); setShowStartMenu(false); }}>Games</div>
                <div className="vista-classic-item-right" onClick={() => { launchApp(1); setShowStartMenu(false); }}>Computer</div>
                <div className="vista-classic-item-right" onClick={() => setShowStartMenu(false)}>Control Panel</div>
              </div>

              {/* Split Shutdown Container */}
              <div className="vista-shutdown-container">
                <button
                  onClick={() => { setShut(true); setShowStartMenu(false); }}
                  className="vista-shutdown-btn"
                >
                  Shut down
                </button>
                <button
                  onClick={() => { setShut(true); setShowStartMenu(false); }}
                  className="vista-shutdown-arrow"
                >
                  ▶
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Clippy Assistant */}
        <Clippy launchApp={launchApp} />
      </div>
    </>
  );
}

export default App;