import { useEffect, useState } from 'react';
import Navbar from './ui/Navbar';
import StickyVideo from './StickyVideo';

type StickyLayoutProps = {
  children: React.ReactNode;
  videoOff: boolean;
  darkMode: boolean;
  toggleDarkMode: () => void;
  toggleVideo: () => void;
  showVideo?: boolean;
  loaded?: boolean;
}

export default function StickyLayout({
  children,
  videoOff,
  darkMode,
  toggleDarkMode,
  toggleVideo,
  showVideo = true,
  loaded = true
}: StickyLayoutProps) {
  useEffect(() => {
    document.body.className = darkMode ? 'bg-black' : 'bg-gray-300';

    return () => {
      document.body.className = '';
    };
  }, [darkMode]);

  return (
    <div className={`${videoOff ? 'videoOff' : ''} ${darkMode ? 'dark' : ''}`}>
      <main className={`px-10 md:px-20 lg:px-40 dark:bg-black ${videoOff && !darkMode ? 'bg-gray-300' : ''}`}>
        <section className="min-h-screen">
          <Navbar
            videoOff={videoOff}
            darkMode={darkMode}
            toggleVideo={toggleVideo}
            toggleDarkMode={toggleDarkMode}
          />

          {showVideo && !videoOff && (
            <div className="fixed top-0 left-0 w-full h-full z-[-10]">
              <StickyVideo
                src='op_bg.mp4'
                className="w-full h-full object-cover object-center"
              />
            </div>
          )}

          {children}
        </section>
      </main>
    </div>
  );
}