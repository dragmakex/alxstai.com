import Head from 'next/head';
import Image from 'next/image';
import { useVideoAndDarkMode } from '../utils';
import { AiFillGithub, AiFillLinkedin, AiFillTwitterCircle } from 'react-icons/ai';
import sticky_luffy from "../../public/sticky_luffy.png";
import dragon from "../../public/dragon.png"
import Navbar from '../navbar';
import { useState, useEffect } from 'react';

type HomeProps = {
  videoOff: boolean;
  darkMode: boolean;
  toggleDarkMode: () => void;
  toggleVideo: () => void;
}

export default function Home(props: HomeProps) {
  
  const { videoOff, darkMode, toggleDarkMode, toggleVideo} = useVideoAndDarkMode();

  const [loaded, setLoaded] = useState(false);

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
        </section>
      </main>
    </div>
  )
}
