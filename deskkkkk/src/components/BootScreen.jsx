import React, { useEffect, useState } from 'react';

const BootScreen = ({ onBootComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onBootComplete, 800);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [onBootComplete]);

  return (
    <div className="w-screen h-screen bg-black flex flex-col justify-center items-center select-none text-white">
      <div className="flex flex-col items-center">
        {/* Microsoft Logo & Windows XP title */}
        <div className="text-center mb-12">
          <div className="text-[28px] font-bold tracking-wider flex items-center justify-center gap-1">
            <span className="text-gray-400 font-extralight text-xs block -mt-4">Microsoft</span>
            <span className="italic font-bold text-4xl">Windows</span>
            <span className="text-orange-500 italic font-extrabold text-4xl">xp</span>
          </div>
          <div className="text-xs tracking-widest text-blue-400 mt-2 font-bold uppercase">
            Professional
          </div>
        </div>

        {/* Loading Indicator */}
        <div className="boot-loader-bar rounded-sm mb-20">
          <div className="boot-loader-progress rounded-sm"></div>
        </div>

        <div className="text-[10px] text-gray-500 font-mono">
          Copyright © 1985-2001 Microsoft Corporation
        </div>
      </div>
    </div>
  );
};

export default BootScreen;
