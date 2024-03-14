import { useState, useEffect } from 'react';

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
    if (videoOff) {
      setVideo(!videoOff)
      setDarkMode(false)
    } else {
      setVideo(!videoOff)
      setDarkMode(true)
    }
  }

  return {
    videoOff,
    darkMode,
    toggleDarkMode,
    toggleVideo,
  }
};