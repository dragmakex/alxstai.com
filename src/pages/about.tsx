import Head from 'next/head';
import Image from 'next/image';
import { useVideoAndDarkMode } from '../utils/utils';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import { FaXTwitter } from "react-icons/fa6";
import { MdCastle } from "react-icons/md";
import sticky_luffy from "../../public/images/sticky_luffy.png";
import swissdao_red from "../../public/images/swissdao_red.png";
import swissdao_blue from "../../public/images/swissdao_blue.png";
import Navbar from '../utils/navbar';
import { useState, useEffect, useRef } from 'react';

type HomeProps = {
  videoOff: boolean;
  darkMode: boolean;
  toggleDarkMode: () => void;
  toggleVideo: () => void;
}

export default function About(props: HomeProps) {
  
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
    <div className={`${videoOff ? 'videoOff' : ''} ${darkMode ? 'dark' : ''}`}>      
      <Head>
        <title>◦ about ◦</title>

        <meta name="apple-mobile-web-app-title" content="about 🐉"></meta>
        <meta name="application-name" content="about 🐉"></meta>
        <meta name="description" content="about 🐉"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta charSet="UTF-8"></meta>
        <meta property="og:title" content="about alx"></meta>
        <meta property="og:description" content="about 🐉"></meta>
        <meta property="og:image" content="https://alxstai.com/about"></meta>
        <meta property="og:url" content="https://alxstai.com/about"></meta>
        <meta property="og:type" content="website"></meta>
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:title" content="about alx"></meta>
        <meta name="twitter:description" content="about 🐉"></meta>
        <meta name="twitter:image" content="https://alxstai.com/about"></meta>
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
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center'>
              <div className={`inset-0 border-4 border-gray-600 dark:border-white flex items-center relative mx-auto rounded-full w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96 overflow-hidden dark:bg-gray-400 bg-black transition-all duration-700 ${loaded ? 'opacity-100 translate-y-10' : 'opacity-0 translate-y-0'}`}>
                  <Image src={sticky_luffy} fill objectFit="cover" alt={'Picture'} className='border-lg border-white'/>
              </div>
          
              <div className={`text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl flex justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20 mt-8 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-10' : 'opacity-0 translate-y-0'}`}>
                  <a href="https://github.com/dragmakex" target='_blank' className='text-gray-900 dark:text-gray-400 hover:text-white active:text-white dark:hover:text-white dark:active:text-white duration-300'>
                  <AiFillGithub />
                  </a>
                  {/*<a href="https://linkedin.com/in/" target='_blank' className='text-gray-900 dark:text-gray-400 hover:text-white active:text-white dark:hover:text-white dark:active:text-white duration-300'>
                  <AiFillLinkedin />
                  </a>*/}
                  <a href="https://warpcast.com/alxstai" target='_blank' className='text-gray-900 dark:text-gray-400 hover:text-white active:text-white dark:hover:text-white dark:active:text-white duration-300'>
                  <MdCastle />
                  </a>
                  <a href="https://twitter.com/alxstai" target='_blank' className='text-gray-900 dark:text-gray-400 hover:text-white active:text-white dark:hover:text-white dark:active:text-white duration-300'>
                  <FaXTwitter />
                  </a>
                  {!darkMode && (
                    <a href="https://www.swissdao.space/" target='_blank' className='text-gray-900 dark:text-gray-400 hover:text-white active:text-white dark:hover:text-white dark:active:text-white duration-300'>
                    <Image src={swissdao_red} alt='swissDAO Logo' className='w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12'/>
                    </a>
                  )}
                  {darkMode && (
                    <a href="https://www.swissdao.space/" target='_blank' className='text-gray-900 dark:text-gray-400 hover:text-white active:text-white dark:hover:text-white dark:active:text-white duration-300'>
                    <Image src={swissdao_blue} alt='swissDAO Logo' className='w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12'/>
                    </a>
                  )}
              </div>
            </div>

        </section>
      </main>
    </div>
  )
}
