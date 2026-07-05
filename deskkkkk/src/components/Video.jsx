
import { Rnd } from 'react-rnd'

import horror from '../assets/horror.mp4'

const Video = ({ onClose, zIndex, onFocus, isMinimized, isMaximized, onMinimize, onMaximize }) => {
    return (
        <Rnd
            default={{
                x: 200,
                y: 100,
                width: 500,
                height: 300,
            }}
            size={isMaximized ? { width: '100%', height: 'calc(100vh - 30px)' } : undefined}
            position={isMaximized ? { x: 0, y: 0 } : undefined}
            disableDragging={isMaximized}
            enableResizing={!isMaximized}
            minWidth={300}
            minHeight={200}
            bounds="window"
            dragHandleClassName="xp-titlebar"
            style={{ zIndex, display: isMinimized ? 'none' : 'block' }}
        >
            <div className="xp-window w-full h-full flex flex-col select-none" onMouseDown={onFocus}>
                <div className="xp-titlebar">
                    <div className="flex items-center">
                        <span className="font-bold text-white pl-1">Horror Video</span>
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

                <div className="bg-black flex-1 flex items-center justify-center overflow-hidden">
                    <video src={horror} autoPlay loop className="w-full h-full object-contain"></video>
                </div>
            </div>
        </Rnd>
    )
}

export default Video