import Head from 'next/head';
import Image from 'next/image';
import { useVideoAndDarkMode } from '../utils';
import { AiFillGithub, AiFillLinkedin, AiFillTwitterCircle } from 'react-icons/ai';
import { MdCastle } from "react-icons/md";
import sticky_luffy from "../../public/sticky_luffy.png";
import Navbar from '../navbar';
import { useState, useEffect } from 'react';

type HomeProps = {
  videoOff: boolean;
  darkMode: boolean;
  toggleDarkMode: () => void;
  toggleVideo: () => void;
}

export default function About(props: HomeProps) {
  
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
        <meta name="" content=""></meta>
        <link rel="icon" href="/favicon.png"/>
      </Head>        

      <main className={`px-10 md:px-20 lg:px-40 dark:bg-black ${videoOff && !darkMode ? 'bg-gray-300' : '' }`}>

        <section className="min-h-screen"> 
          
          <Navbar videoOff={videoOff} darkMode={darkMode} toggleVideo={toggleVideo} toggleDarkMode={toggleDarkMode} />
          <canvas id='blur' className='fixed top-0 left-0 w-full h-full z-[-9]'>
          </canvas>
            {!videoOff && (
            <div className="fixed top-0 left-0 w-full h-full z-[-10]">
              <video src='op_bg.mp4' autoPlay loop muted className="w-full h-full object-cover object-center"></video>
            </div>
            )}

            <div className={`text-4xl md:text-6xl text-center font-tisa_bold font-bold md:mt-0 mt-8 dark:text-gray-400 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-10' : 'opacity-0 translate-y-0'}`}>Hi 👋, I'm <span onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={hover ? hoverStyle : normalStyle}>Alex</span></div>
            <div className={`inset-0 border-8 border-gray-400 dark:border-white flex items-center relative mx-auto rounded-full w-60 h-60 md:h-96 md:w-96 mt-10 mb-10 overflow-hidden dark:bg-gray-400 bg-black transition-all duration-700 ${loaded ? 'opacity-100 translate-y-10' : 'opacity-0 translate-y-0'}`}>
                <Image src={sticky_luffy} fill objectFit="cover" alt={'Picture'} className='border-lg border-white'/>
            </div>
        
            <div className={`text-4xl md:text-5xl lg:text-6xl flex justify-center gap-10 md:gap-16 lg:gap-20 py-3 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-10' : 'opacity-0 translate-y-0'}`}>
                <a href="https://github.com/dragmakex" target='_blank' className='text-gray-900 dark:text-gray-400 hover:text-white active:text-white dark:hover:text-white dark:active:text-white duration-300'>
                <AiFillGithub />
                </a>
                <a href="https://linkedin.com/in/astaikov" target='_blank' className='text-gray-900 dark:text-gray-400 hover:text-white active:text-white dark:hover:text-white dark:active:text-white duration-300'>
                <AiFillLinkedin />
                </a>
                <a href="https://far.quest/alxstai" target='_blank' className='text-gray-900 dark:text-gray-400 hover:text-white active:text-white dark:hover:text-white dark:active:text-white duration-300'>
                <MdCastle />
                </a>
                <a href="https://twitter.com/dragmakex" target='_blank' className='text-gray-900 dark:text-gray-400 hover:text-white active:text-white dark:hover:text-white dark:active:text-white duration-300'>
                <AiFillTwitterCircle />
                </a>
            </div>
          
        </section>
      </main>
    </div>
  )
}