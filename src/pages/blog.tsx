import Head from 'next/head';
import Image from 'next/image';
import { useVideoAndDarkMode } from '../utils';
import { AiFillGithub, AiFillLinkedin, AiFillTwitterCircle } from 'react-icons/ai';
import { MdCastle } from "react-icons/md";
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
  
  return (
    <div className={`${videoOff ? 'videoOff' : ''} ${darkMode ? 'dark' : ''} `}>      
      <Head>
        <title> alx blog </title>
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
        
          {/*<div className='text-center p-20'>
            <h2 className='text-6xl py-2 bg-gradient-to-r from-black via-gray-600 to-black text-transparent bg-clip-text font-tisa_bold font-bold md:text-8xl '>
            </h2>
             {/*<p className='text-md py-5 leading-8 text-gray-800 max-w-xl mx-auto  md:text-xl dark:text-gray-400'> 
              </p>
          </div>

          {/*<div className='gap-10 lg:flex'>
            <div className='text-center grid place-items-center shadow-lg p-10 rounded-xl my-10'>
              <Image src={sticky_luffy} alt={'Design icon'} width={100} height={100} />
              <h3 className='text-lg font-medium pt-8 pb-2'>Beautiful</h3>
              <p className='py-2'>
                Creating.
              </p>
              <h4 className='py-4 text-blue-400'>
                <p className='text-gray-800 py-1'>Example 1</p>
                <p className='text-gray-800 py-1'>Example 2</p>
                <p className='text-gray-800 py-1'>Example 3 </p>
              </h4>
             </div>
        </div>*/}
            <div className={`text-5xl md:text-7xl text-center font-tisa_bold font-bold dark:text-gray-400 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-10' : 'opacity-0 translate-y-0'}`}>Hi 👋, I'm Alex</div>
            <div className={`inset-0 border-8 border-gray-400 dark:border-white flex items-center relative mx-auto rounded-full w-80 h-80 mt-10 mb-10 overflow-hidden md:h-96 md:w-96 dark:bg-gray-400 bg-black transition-all duration-700 ${loaded ? 'opacity-100 translate-y-10' : 'opacity-0 translate-y-0'}`}>
                <Image src={sticky_luffy} fill objectFit="cover" alt={'Picture'} className='border-lg border-white'/>
            </div>
        
            <div className={`text-5xl md:text-7xl flex justify-center gap-12 md:gap-16 lg:gap-20 py-3 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-10' : 'opacity-0 translate-y-0'}`}>
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

        {/*<section>
          <div>
            <h3 className='text-3xl py-1'>
              Stuff
            </h3>
            <p className='text-md py-2 leading-8 text-gray-900'>
              Lorem ipsum <span className='text-blue-600'>yeyeyeye</span> dolores
            </p>
            <p className='text-md py-2 leading-8 text-gray-900'>
              Lorem ipsum <span className='text-blue-600'>yeyeyeye</span> dolores
            </p>
          </div>

          
        </section>*/}
      </main>
    </div>
  )
}