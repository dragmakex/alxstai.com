import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import { FaXTwitter } from "react-icons/fa6";
import { MdCastle } from "react-icons/md";
import sticky_luffy from "../../public/images/sticky_luffy.png";
import swissdao_red from "../../public/images/swissdao_red.png";
import swissdao_blue from "../../public/images/swissdao_blue.png";
import StickyImage from '../components/ui/StickyImage';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StickyPageHead from '../components/StickyPageHead';
import StickyLayout from '../components/StickyLayout';
import { useVideoAndDarkMode } from '../hooks/useVideoAndDarkMode';

export default function About() {
  const { videoOff, darkMode, toggleDarkMode, toggleVideo } = useVideoAndDarkMode();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <StickyPageHead
        title="about"
        description="about alex - software developer, blockchain enthusiast, web3 builder"
        ogUrl="https://alxstai.com/about"
        canonicalUrl="https://alxstai.com/about"
        keywords="about, alex, alxstai, software developer, blockchain, web3, ethereum, defi"
      />
      <StickyLayout
        videoOff={videoOff}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        toggleVideo={toggleVideo}
        showVideo={true}
        loaded={loaded}
      >
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center'>
              <motion.div
                className={`inset-0 border-4 border-gray-600 dark:border-white flex items-center relative mx-auto rounded-full w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96 overflow-hidden dark:bg-gray-400 bg-black ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                initial={{ opacity: 0 }}
                animate={loaded ? {
                  opacity: 1,
                  y: [0, -15, 3, -15, 0]
                } : { opacity: 0 }}
                transition={{
                  opacity: { duration: 0.8, delay: 0.2 },
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut", type: "tween" }
                }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 10,
                  rotateX: -5
                }}
                whileTap={{
                  scale: 1.05,
                  rotateY: 10,
                  rotateX: -5
                }}
              >
                  <StickyImage src={sticky_luffy} alt="alex" fill priority />
              </motion.div>
          
              <motion.div
            className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl flex justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20 mt-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 10 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
                  <a
                    href="https://github.com/dragmakex"
                    target='_blank'
                    className='text-gray-900 dark:text-gray-400 hover:text-white active:text-white dark:hover:text-white dark:active:text-white duration-300'
                  >
                    <AiFillGithub />
                  </a>
                  <a
                    href="https://warpcast.com/alxstai"
                    target='_blank'
                    className='text-gray-900 dark:text-gray-400 hover:text-white active:text-white dark:hover:text-white dark:active:text-white duration-300'
                  >
                    <MdCastle />
                  </a>
                  <a
                    href="https://twitter.com/alxstai"
                    target='_blank'
                    className='text-gray-900 dark:text-gray-400 hover:text-white active:text-white dark:hover:text-white dark:active:text-white duration-300'
                  >
                    <FaXTwitter />
                  </a>
                  <a
                    href="https://www.swissdao.space/"
                    target='_blank'
                    className='text-gray-900 dark:text-gray-400 hover:text-white active:text-white dark:hover:text-white dark:active:text-white duration-300'
                  >
                    {darkMode ? (
                      <StickyImage src={swissdao_blue} alt='swissDAO Logo' className='w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12'/>
                    ) : (
                      <StickyImage src={swissdao_red} alt='swissDAO Logo' className='w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12'/>
                    )}
                  </a>
              </motion.div>
        </div>
      </StickyLayout>
    </>
  )
}
