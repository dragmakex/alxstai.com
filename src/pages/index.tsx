import Head from 'next/head';
import { useVideoAndDarkMode } from '../utils/utils';
import Navbar from '../utils/navbar';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

type HomeProps = {
  videoOff: boolean;
  darkMode: boolean;
  toggleDarkMode: () => void;
  toggleVideo: () => void;
}

export default function Home(props: HomeProps) {
  
  const { videoOff, darkMode, toggleDarkMode, toggleVideo} = useVideoAndDarkMode();

  const [loaded, setLoaded] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video autoplay failed:", error);
        toggleVideo();
      });
    }
  }, [toggleVideo]);

  setTimeout(() => {
      setLoaded(true);
  }, 1000);

  useEffect(() => {
    document.body.className = darkMode ? 'bg-black' : 'bg-gray-300';

    return () => {
      document.body.className = '';
    };
  }, [darkMode]);

  return (
    <div className={`${videoOff ? 'videoOff' : ''} ${darkMode ? 'dark' : ''} `}>      
      <Head>
        <title>◦ alxstai ◦</title>

        <meta name="apple-mobile-web-app-title" content="alxstai 🐉"></meta>
        <meta name="application-name" content="alxstai 🐉"></meta>
        <meta name="description" content="I hereby invite you to click here 🐉"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta charSet="UTF-8"></meta>
        <meta property="og:title" content="alxstai 🐉"></meta>
        <meta property="og:description" content="I hereby invite you to click here 🐉"></meta>
        <meta property="og:image" content="https://alxstai.com"></meta>
        <meta property="og:url" content="https://alxstai.com"></meta>
        <meta property="og:type" content="website"></meta>
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:title" content="alxstai 🐉"></meta>
        <meta name="twitter:description" content="I hereby invite you to click here 🐉"></meta>
        <meta name="twitter:image" content="https://alxstai.com"></meta>
        <meta name="robots" content="index, follow"></meta>

        <link rel="icon" href="/images/favicon.ico"/>
        <link rel="shortcut icon" href="/images/favicon.ico"/>

      </Head>        

      <main className={`px-10 md:px-20 lg:px-40 dark:bg-black ${videoOff && !darkMode ? 'bg-gray-300' : '' }`}>

        <section className="min-h-screen"> 
          
          <Navbar videoOff={videoOff} darkMode={darkMode} toggleVideo={toggleVideo} toggleDarkMode={toggleDarkMode} />
            {!videoOff && (
              <div className="fixed top-0 left-0 w-full h-full z-[-10]">
                <video ref={videoRef} src='op_bg.mp4' autoPlay loop muted playsInline className="w-full h-full object-cover object-center"></video>
              </div>
            )}

          <div className={`text-5xl md:text-8xl 2xl:text-9xl text-center font-tisa_bold font-bold mt-10 py-40 2xl:py-96 dark:text-gray-400 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-10' : 'opacity-0 translate-y-0'}`}>
            hi, i'm <Link href="/about">
              <span className={`hover:text-transparent bg-clip-text hover:bg-gradient-to-r from-blue-400 via-white to-yellow-300 hover:transition-all hover:duration-500`}>
                alex
              </span>

            </Link>
          </div>        
        </section>
      </main>
    </div>
  )
}