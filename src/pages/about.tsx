import Head from 'next/head';
import Image from 'next/image';
import { useVideoAndDarkMode } from '../utils/utils';
import { AiFillGithub, AiFillLinkedin, AiFillTwitterCircle } from 'react-icons/ai';
import { MdCastle } from "react-icons/md";
import sticky_luffy from "../../public/images/sticky_luffy.png";
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
        });
      }
    }, []);

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
        <title> about alx </title>

        <meta name="apple-mobile-web-app-title" content="about alx"></meta>
        <meta name="application-name" content="about alx"></meta>
        <meta name="description" content="About me page of my personal website including social media links."></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta charSet="UTF-8"></meta>
        <meta property="og:title" content="about alx"></meta>
        <meta property="og:description" content="About me page of my personal website including social media links."></meta>
        <meta property="og:image" content="https://alxstai.com/about"></meta>
        <meta property="og:url" content="https://alxstai.com/about"></meta>
        <meta property="og:type" content="website"></meta>
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:title" content="about alx"></meta>
        <meta name="twitter:description" content="About me page of my personal website including social media links."></meta>
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
            <div className='2xl:py-6'>
              <div className={`inset-0 border-8 border-gray-400 dark:border-white flex items-center relative mx-auto rounded-full w-60 h-60 md:w-96 md:h-96 2xl:h-120 2xl:w-120 mt-10 mb-10 overflow-hidden dark:bg-gray-400 bg-black transition-all duration-700 ${loaded ? 'opacity-100 translate-y-10' : 'opacity-0 translate-y-0'}`}>
                  <Image src={sticky_luffy} fill objectFit="cover" alt={'Picture'} className='border-lg border-white'/>
              </div>
          
              <div className={`text-4xl md:text-5xl lg:text-6xl flex justify-center gap-10 md:gap-16 lg:gap-20 py-4 mb-2 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-10' : 'opacity-0 translate-y-0'}`}>
                  <a href="https://github.com/dragmakex" target='_blank' className='text-gray-900 dark:text-gray-400 hover:text-white active:text-white dark:hover:text-white dark:active:text-white duration-300'>
                  <AiFillGithub />
                  </a>
                  <a href="https://linkedin.com/in/astaikov" target='_blank' className='text-gray-900 dark:text-gray-400 hover:text-white active:text-white dark:hover:text-white dark:active:text-white duration-300'>
                  <AiFillLinkedin />
                  </a>
                  <a href="https://warpcast.com/alxstai" target='_blank' className='text-gray-900 dark:text-gray-400 hover:text-white active:text-white dark:hover:text-white dark:active:text-white duration-300'>
                  <MdCastle />
                  </a>
                  <a href="https://twitter.com/dragmakex" target='_blank' className='text-gray-900 dark:text-gray-400 hover:text-white active:text-white dark:hover:text-white dark:active:text-white duration-300'>
                  <AiFillTwitterCircle />
                  </a>
              </div>
            </div>

        </section>
      </main>
    </div>
  )
}