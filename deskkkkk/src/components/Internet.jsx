import React, { useRef, useState, useEffect } from 'react'
import { Rnd } from 'react-rnd'
import { icons } from '../App'
import GoogleClone from './GoogleClone'

const HEADER_HEIGHT = 24;

const Internet = (props) => {
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
        <div>
            <Rnd
                default={{
                    x: 100,
                    y: 50,
                    width: 800,
                    height: 700,
                }}
                minWidth={600}
                minHeight={500}
                bounds="window"
                dragHandleClassName="app-header"
                className="z-50"
                onResize={handleResize}
                onResizeStop={handleResize}
            >
                <div ref={contentRef} className='w-full h-full flex flex-col rounded-md overflow-hidden border-1 border-black/30'>
                    <div className='app-header bg-black/30 backdrop-blur-md h-[24px] flex flex-row justify-between items-center px-2'>
                        <p className='text-white'>
                            Internet Explorer
                        </p>
                        <div className='flex'>
                            <button className='text-white w-8 h-[24px] border border-black/30'>-</button>
                            <button className='text-white w-8 h-[24px] border border-black/30'>□</button>
                            <button
                                className='bg-red-500 text-white w-8 h-[24px] hover:shadow-[0_0_10px_2px_rgba(239,68,68,0.7)] transition duration-300'
                                onClick={() => {
                                    const newArray = props.openApp.filter(appId => appId !== 2);
                                    props.setOpenApp(newArray);
                                }}
                            >
                                x
                            </button>
                        </div>
                    </div>
                    <div className='bg-white flex-1 overflow-hidden h-full'>
                        <GoogleClone containerHeight={contentHeight + 'px'} />
                    </div>
                </div>
            </Rnd>
        </div>
    )
}

export default Internet