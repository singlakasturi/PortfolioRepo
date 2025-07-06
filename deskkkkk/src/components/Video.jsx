
import { Rnd } from 'react-rnd'

import horror from '../assets/horror.mp4'

const Video = (props) => {
    return (
        <div>
            <Rnd
                default={{
                    x: 200,
                    y: 100,
                    width: 500,
                    height: 300,
                }}
                minWidth={300}
                minHeight={200}
                bounds="window"
                dragHandleClassName="app-header"
                className="z-50"
            >
                <div className='w-full h-full flex flex-col rounded-md overflow-hidden border-1 border-black/30'>
                    <div className='app-header bg-black/30 backdrop-blur-md h-[24px] flex flex-row justify-between items-center px-2'>
                        <p className='text-white'>
                            Horror
                        </p>
                        <div className='flex'>
                            <button className='text-white w-8 h-[24px] border border-black/30'>-</button>
                            <button className='text-white w-8 h-[24px] border border-black/30'>□</button>
                            <button
                                className='bg-red-500 text-white w-8 h-[24px] hover:shadow-[0_0_10px_2px_rgba(239,68,68,0.7)] transition duration-300'
                                onClick={() => {
                                    const newArray = props.openApp.filter(appId => appId !== 10);
                                    props.setOpenApp(newArray);
                                }}
                            >
                                x
                            </button>
                        </div>
                    </div>

                    <div className='bg-black/30 backdrop-blur-md flex-1 '>
                        <video src={horror} autoPlay loop
                        ></video>
                    </div>
                </div>
            </Rnd>
        </div>
    )
}

export default Video