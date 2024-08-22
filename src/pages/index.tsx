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

  const [hover, setHover] = useState(false);

  const normalStyle = { display: 'inline' };
  const hoverStyle = {
      ...normalStyle,
      background: 'linear-gradient(to right, #3498db, #8e44ad)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
  };

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video autoplay failed:", error);
        toggleVideo();
      });
    }
  }, [toggleVideo]);

  // Set loaded to true after 1000 milliseconds (1 second)
  setTimeout(() => {
      setLoaded(true);
  }, 1000);

  useEffect(() => {
    console.log(darkMode)
    document.body.className = darkMode ? 'bg-black' : 'bg-gray-300';

    return () => {
      document.body.className = '';
    };
  }, [darkMode]);

  return (
    <div className={`${videoOff ? 'videoOff' : ''} ${darkMode ? 'dark' : ''} `}>      
      <Head>
        <title> alxstai </title>

        <meta name="apple-mobile-web-app-title" content="alxstai"></meta>
        <meta name="application-name" content="alxstai"></meta>
        <meta name="description" content="Starting page of my personal website."></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta charSet="UTF-8"></meta>
        <meta property="og:title" content="alxstai"></meta>
        <meta property="og:description" content="Starting page of my personal website."></meta>
        <meta property="og:image" content="https://alxstai.com"></meta>
        <meta property="og:url" content="https://alxstai.com"></meta>
        <meta property="og:type" content="website"></meta>
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:title" content="alxstai"></meta>
        <meta name="twitter:description" content="Starting page of my personal website."></meta>
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

          <div className={`text-5xl md:text-8xl 2xl:text-9xl text-center font-tisa_bold font-bold mt-10 py-40 2xl:py-96 dark:text-gray-400 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-10' : 'opacity-0 translate-y-0'}`}>hi, i'm <Link href="/about"><span className='transition-all duration-300' onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={hover ? hoverStyle : normalStyle}>alex</span></Link></div>
        </section>
      </main>
    </div>
  )
}