import { parseCookies, setCookie } from 'nookies';
import { useState } from 'react';

export const useVideoAndDarkMode = () => {

  const cookies = parseCookies();
  const initialVideoOff = cookies.videoOff === 'false';
  const initialDarkMode = cookies.darkMode === 'true'; 

  const [videoOff, setVideo] = useState(initialVideoOff);
  
  const [darkMode, setDarkMode] = useState(initialDarkMode);

  //const [videoOff, setVideo] = useState(false);
  //const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const newDarkMode = videoOff ? !darkMode : false;
    setDarkMode(newDarkMode);
    setCookie(null, 'darkMode', String(newDarkMode), {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
  }

  const toggleVideo = () => {
    const newVideoOff = !videoOff;
    const newDarkMode = newVideoOff ? false : true;
    setVideo(newVideoOff);
    setDarkMode(newDarkMode);
    setCookie(null, 'videoOff', String(newVideoOff), {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
    setCookie(null, 'darkMode', String(newDarkMode), {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
  }

  return {
    videoOff,
    darkMode,
    toggleDarkMode,
    toggleVideo,
  }
};