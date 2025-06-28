
import './App.css'
import thispc from './assets/computer.webp'
import internet from './assets/internet.webp'
import bin from './assets/bin.webp'
import pdf from './assets/pdf.webp'
import twit from './assets/twitter.png'
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
import { useState, useEffect, useRef } from 'react'
import Internet from './components/Internet'
import Projects from './components/Projects'
import Twitter from './components/Twitter'
import Notes from './components/Notes'
import Video from './components/Video'
import ShutDown from './components/ShutDown'


export const icons = [
  { id: 1, label: 'This PC', icon: thispc },
  { id: 2, label: 'Internet', icon: internet },
  { id: 3, label: 'Recycle Bin', icon: bin },
  { id: 4, label: 'Resume', icon: pdf },
  { id: 5, label: 'X (Twitter)', icon: twit },
  { id: 6, label: 'My Projects', icon: doom },
  { id: 7, label: 'GitHub', icon: git },
  { id: 8, label: 'LinkedIn', icon: lin },
  { id: 9, label: 'Notes', icon: notes },
  { id: 10, label: 'Horror', icon: trt }
];


function App() {
  const [shut, setShut] = useState(false);

  const [openApp, setOpenApp] = useState([])

  const [selectedId, setSelectedId] = useState(null);

  const handleDeselect = () => setSelectedId(null);

  const [showStartMenu, setShowStartMenu] = useState(false);
  const startMenuRef = useRef(null);

  const toggleStart = (e) => {
    e.stopPropagation();
    setShowStartMenu(prev => !prev);
  };

  useEffect(() => {
    if (openApp.includes(8)) {
      window.open('https://www.linkedin.com/in/shubhkarman-singh-2712342b4', '_blank');
      setOpenApp(openApp.filter(appId => appId !== 8));
    }
    if (openApp.includes(7)) {
      window.open('https://github.com/Shubhkarman801', '_blank');
      setOpenApp(openApp.filter(appId => appId !== 7));
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

  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    }
  }, [])



  return (
    <>
      {
        shut && (
          <ShutDown setShut = {setShut}></ShutDown>
        )
      }
      <div
        className="w-screen h-screen bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: "url('/wallpaper.jpeg')" }}
      >
        <div
          className="w-screen h-screen  absolute overflow-hidden p-4"
          onClick={handleDeselect}
        >
          <div className="fixed left-0 grid grid-cols-2 grid-rows-4">
            {icons.map(({ id, label, icon }) => (
              id !== 10 ? (
                <div
                  key={id}
                  className={`w-20 text-white text-sm m-2 flex flex-col items-center cursor-pointer p-1 ${selectedId === id ? 'bg-white/20 rounded border border-blue-400' : ''
                    }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedId(id);
                  }}
                  onDoubleClick={() => { if (!openApp.includes(id)) setOpenApp([...openApp, id]); }}
                >
                  <img src={icon} alt={label} className="w-12 h-12" />
                  <p className="text-center">{label}</p>
                </div>) : null
            ))}
          </div>
        </div>

        {openApp.includes(2) && (
          <Internet openApp={openApp} setOpenApp={setOpenApp}></Internet>
        )}

        {openApp.includes(6) && (
          <Projects openApp={openApp} setOpenApp={setOpenApp}></Projects>
        )}
        {openApp.includes(5) && (
          <Twitter openApp={openApp} setOpenApp={setOpenApp}></Twitter>
        )}
        {openApp.includes(9) && (
          <Notes openApp={openApp} setOpenApp={setOpenApp}></Notes>
        )}
        {openApp.includes(10) && (
          <Video openApp={openApp} setOpenApp={setOpenApp}></Video>
        )}



        <div className='fixed bottom-0 h-14 w-full backdrop-blur-md border-t-1 border-white/20 flex flex-row items-center justify-between'>
          <div className='flex flex-row w-auto h-[48px] items-center justify-center my-1 mx-2'>
            <img src={start} className='w-[48px] hover:cursor-pointer border-1 rounded-4xl border-white/30 hover:border-white hover:shadow-[0_0_10px_2px_rgba(255,255,255,0.5)] transition-all duration-300' onClick={toggleStart}></img>
            {
              openApp.map((id) => {
                const app = icons.find(icon => icon.id === id);
                return (
                  <div key={id} className='w-auto bg-white/30 p-2 mx-2 max-h-[40px] rounded-md flex flex-row items-center'>
                    <img src={app.icon} className='h-[16px] mr-1'></img>
                    {app.label}
                  </div>);

              })
            }
          </div>
          <div className='flex flex-row  items-center justify-center my-1 mx-2 '>
            <p className='text-white text-lg mx-2'>^</p>
            <img src={vol} className='mx-2 hover:border-1 rounded-4xl w-[16px] h-[16px] hover:border-white hover:shadow-[0_0_10px_2px_rgba(255,255,255,0.5)] transition-all duration-300'></img>
            <div className='mx-2 text-white'>
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}<br />
              {time.toLocaleDateString()}
            </div>

          </div>
        </div>

        {showStartMenu && (
          <div
            ref={startMenuRef}
            className='fixed bottom-14 left-0 bg-gradient-to-b from-gray-700/25 to-gray-400/30 backdrop-blur-sm border border-white/30 text-white rounded-t-sm z-40 flex flex-row'
          >
            <div className='bg-white flex flex-col text-black w-48'>

              <ul className='space-y-1 p-1'>
                <li className='hover:bg-blue-300/20 px-1 py-1 rounded cursor-pointer flex flex-row  items-center text-sm'><img src={thispc} className='h-[24px] mr-1'></img>This PC</li>
                <li className='hover:bg-blue-300/20 px-1 py-1 rounded cursor-pointer flex flex-row  items-center text-sm' onDoubleClick={() => { if (!openApp.includes(9)) setOpenApp([...openApp, 9]); }}><img src={notes} className='h-[24px] mr-1'></img>Notes</li>
                <li className='hover:bg-blue-300/20 px-1 py-1 rounded cursor-pointer flex flex-row  items-center text-sm'><img src={panel} className='h-[24px] mr-1'></img>Getting Started</li>
                <li className='hover:bg-blue-300/20 px-1 py-1 rounded cursor-pointer flex flex-row  items-center text-sm'><img src={internet} className='h-[24px] mr-1'></img>Internet Explorer</li>
                <li className='hover:bg-blue-300/20 px-1 py-1 rounded cursor-pointer flex flex-row  items-center text-sm'><img src={sound} className='h-[24px] mr-1'></img>Sound Settings</li>
                <li className='hover:bg-blue-300/20 px-1 py-1 rounded cursor-pointer flex flex-row  items-center text-sm'><img src={pet} className='h-[24px] mr-1'></img>Pet</li>
                <li className='hover:bg-blue-300/20 px-1 py-1 rounded cursor-pointer flex flex-row  items-center text-sm'><img src={wtsp} className='h-[24px] mr-1'></img>Chat</li>
                <li className='hover:bg-blue-300/20 px-1 py-1 rounded cursor-pointer flex flex-row  items-center text-sm' onDoubleClick={() => { if (!openApp.includes(10)) setOpenApp([...openApp, 10]); }}><img src={trt} className='h-[24px] mr-1' ></img>Horror</li>
                <li className='hover:underline px-1 py-1 rounded cursor-pointer flex flex-row  items-center text-sm'><img src={direct} className='h-[10px] mx-2'></img>All Programs</li>


              </ul>
            </div>
            <div className='w-38 flex flex-col justify-between'>
              <div>
                <ul className='space-y-1 flex flex-col justify-center'>
                  <li className='hover:bg-white/20 px-2 py-1 rounded cursor-pointer text-gray-700'>Documents</li>
                  <li className='hover:bg-white/20 px-2 py-1 rounded cursor-pointer text-gray-700'>Downloads</li>
                  <li className='hover:bg-white/20 px-2 py-1 rounded cursor-pointer text-gray-700'>Pictures</li>
                  <li className='hover:bg-white/20 px-2 py-1 rounded cursor-pointer text-gray-700'>Music</li>
                  <li className='hover:bg-white/20 px-2 py-1 rounded cursor-pointer text-gray-700'>Games</li>
                  <li className='hover:bg-white/20 px-2 py-1 rounded cursor-pointer text-gray-700'>Computer</li>
                  <li className='hover:bg-white/20 px-2 py-1 rounded cursor-pointer text-gray-700'>Control Panel</li>
                </ul>
              </div>

              <div className='flex flex-row items-center justify-center mb-2 text-gray-700'>
                <div className="flex items-center justify-center space-x-px border border-white/60 backdrop-blur-md rounded-[2px] bg-gradient-to-b from-gray-400/60 to-white/30 shadow-[inset_0_1px_0_#ffffff]">
                  <button
                    className="px-3 py-1 text-xs font-semibold text-black bg-transparent hover:bg-[#e6f0fc] hover:shadow-[0_0_8px_2px_rgba(0,123,255,0.5)] transition duration-300 rounded-l-[2px]" onClick={()=> setShut(true)}
                  > 
                    Shut down
                  </button>
                  <button
                    className="px-2 py-1 text-sm font-bold text-black bg-transparent border-l border-white/60 hover:bg-[#e6f0fc] hover:shadow-[0_0_8px_2px_rgba(0,123,255,0.5)] transition duration-300 rounded-r-[2px]"
                  >
                    &gt;
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default App