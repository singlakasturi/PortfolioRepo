import React, { useRef, useState, useEffect } from 'react'
import { Rnd } from 'react-rnd'
import { icons } from '../App'
import GoogleClone from './GoogleClone'

const HEADER_HEIGHT = 24;

const Internet = ({ onClose, zIndex, onFocus, isMinimized, isMaximized, onMinimize, onMaximize }) => {
    const contentRef = useRef(null);
    const [contentHeight, setContentHeight] = useState(700 - HEADER_HEIGHT);

    // Handler to update height on resize
    const handleResize = (e, direction, ref, delta, position) => {
        setContentHeight(ref.offsetHeight - HEADER_HEIGHT);
    };

    // Initial mount
    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.offsetHeight - HEADER_HEIGHT);
        }
    }, []);

    return (
        <Rnd
            default={{
                x: 100,
                y: 50,
                width: 800,
                height: 700,
            }}
            size={isMaximized ? { width: '100%', height: 'calc(100vh - 30px)' } : undefined}
            position={isMaximized ? { x: 0, y: 0 } : undefined}
            disableDragging={isMaximized}
            enableResizing={!isMaximized}
            minWidth={600}
            minHeight={500}
            bounds="window"
            dragHandleClassName="xp-titlebar"
            onResize={handleResize}
            onResizeStop={handleResize}
            style={{ zIndex, display: isMinimized ? 'none' : 'block' }}
        >
            <div ref={contentRef} className="xp-window w-full h-full flex flex-col select-none" onMouseDown={onFocus}>
                <div className="xp-titlebar">
                    <div className="flex items-center">
                        <span className="font-bold text-white pl-1">Internet Explorer</span>
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
                <div className="bg-white flex-1 overflow-hidden h-full">
                    <GoogleClone containerHeight={contentHeight + 'px'} />
                </div>
            </div>
        </Rnd>
    )
}

export default Internet