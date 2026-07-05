import React, { useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';

const ResumeViewer = ({ onClose, zIndex, onFocus, isMinimized, isMaximized, onMinimize, onMaximize }) => {
  const [resumeUrl, setResumeUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/resume/url`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch URL');
        return res.json();
      })
      .then((data) => {
        // Force the embeddable Google Drive preview URL format
        let url = data.url;
        if (url && url.includes('/view')) {
          url = url.replace(/\/view.*/, '/preview');
        }
        setResumeUrl(url);
        setLoading(false);
      })
      .catch(() => {
        // Fallback directly to the redirect endpoint or hardcoded URL
        setResumeUrl('https://drive.google.com/file/d/1I6_Df9dshsBqhoeGRQ2MJl_po9ZIgmSz/preview');
        setLoading(false);
      });
  }, []);

  const downloadUrl = `${import.meta.env.VITE_API_URL}/api/resume`;

  return (
    <Rnd
      default={{ x: 120, y: 60, width: 750, height: 580 }}
      size={isMaximized ? { width: '100%', height: 'calc(100vh - 30px)' } : undefined}
      position={isMaximized ? { x: 0, y: 0 } : undefined}
      disableDragging={isMaximized}
      enableResizing={!isMaximized}
      minWidth={500}
      minHeight={400}
      bounds="window"
      dragHandleClassName="xp-titlebar"
      style={{ zIndex, display: isMinimized ? 'none' : 'block' }}
    >
      <div className="xp-window w-full h-full flex flex-col select-none" onMouseDown={onFocus}>
        {/* Header */}
        <div className="xp-titlebar">
          <div className="flex items-center">
            <span className="font-bold text-white pl-1">Resume.pdf - Windows Picture and Fax Viewer</span>
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

        {/* Toolbar resembling Fax Viewer */}
        <div className="bg-[#ece9d8] border-b border-gray-400 p-2 flex items-center justify-between text-xs text-black">
          <div className="flex items-center gap-2">
            <a
              href={downloadUrl}
              target="_blank"
              rel="noreferrer"
              download="Kasturi_Lal_Singla_Resume.pdf"
              className="xp-button font-bold text-blue-900 no-underline"
            >
              💾 Save / Download Resume
            </a>
          </div>
          <span className="text-gray-600 pr-2">Windows Viewer</span>
        </div>

        {/* PDF / Document Viewer Frame */}
        <div className="flex-1 bg-gray-600 p-2 overflow-hidden flex justify-center items-center relative">
          {loading ? (
            <div className="text-white text-xs">Loading Resume...</div>
          ) : (
            <iframe
              src={resumeUrl}
              title="Resume Viewer"
              className="w-full h-full bg-white border border-gray-400"
              allow="autoplay"
            />
          )}
        </div>
      </div>
    </Rnd>
  );
};

export default ResumeViewer;
