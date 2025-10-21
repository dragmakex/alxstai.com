import { useState } from 'react';

export const useVideoAndDarkMode = () => {
  const [videoOff, setVideo] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    if (videoOff) {
      setDarkMode(!darkMode);
    } else {
      setDarkMode(false);
    }
  }

  const toggleVideo = () => {
    setVideo(!videoOff);
    setDarkMode(videoOff ? false : true);
  }

  return {
    videoOff,
    darkMode,
    toggleDarkMode,
    toggleVideo,
  }
};