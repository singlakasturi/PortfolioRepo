import {useEffect} from 'react'
import shut from '../assets/shutdown.mp4'


const ShutDown = (props) => {
    useEffect(() => {
  const timer = setTimeout(() => {
    props.setShut(false);
  }, 10000);

  return () => clearTimeout(timer); 
}, []);
  return (
    
    <div className='absolute min-h-screen w-screen z-100 bg-black overflow-hidden'>
        <video className="object-cover min-h-full min-w-full" src={shut} autoPlay>

        </video>
    </div>
  )
}

export default ShutDown