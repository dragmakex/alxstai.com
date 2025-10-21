import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import StickyPageHead from '../components/StickyPageHead';
import StickyLayout from '../components/StickyLayout';
import { useVideoAndDarkMode } from '../hooks/useVideoAndDarkMode';

export default function Home() {
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
        title="alxstai"
        description="I hereby invite you to click here 🐉"
        ogUrl="https://alxstai.com"
        canonicalUrl="https://alxstai.com"
        keywords="alex, alxstai, portfolio, software engineer, web3 developer, blockchain, eth zurich, sticky"
      />
      <StickyLayout
        videoOff={videoOff}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        toggleVideo={toggleVideo}
        showVideo={true}
        loaded={loaded}
      >
        <motion.div
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl 2xl:text-8xl text-center whitespace-nowrap font-tisa_bold font-bold absolute top-1/2 left-1/2 dark:text-gray-400"
            initial={{ opacity: 0, x: "-50%", y: "-50%", translateY: -25 }}
            animate={{
              opacity: loaded ? 1 : 0,
              x: "-50%",
              y: loaded ? "-50%" : "-50%",
              translateY: loaded ? [0, -15, 3, -15, 0] : -20
            }}
            transition={{
              opacity: { duration: 0.7 },
              translateY: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            hi, i'm <Link href="/about">
              <span className="hover:text-transparent hover:bg-clip-text active:text-transparent active:bg-clip-text hover:bg-gradient-to-r active:bg-gradient-to-r hover:from-purple-300 hover:via-pink-300 hover:to-indigo-400 active:from-purple-300 active:via-pink-300 active:to-indigo-400 dark:hover:from-purple-400 dark:hover:via-pink-400 dark:hover:to-indigo-500 dark:active:from-purple-400 dark:active:via-pink-400 dark:active:to-indigo-500 transition-all duration-500">
              alex
            </span>

            </Link>
        </motion.div>
      </StickyLayout>
    </>
  )
}
