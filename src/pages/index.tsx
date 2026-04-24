import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import StickyPageHead from '../components/StickyPageHead';
import StickyLayout from '../components/StickyLayout';
import { useVideoAndDarkMode } from '../hooks/useVideoAndDarkMode';

const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Alex",
  url: "https://alxstai.com",
  sameAs: [
    "https://github.com/dragmakex",
    "https://x.com/alxstai",
    "https://warpcast.com/alxstai",
    "https://zurich3.space/"
  ],
  jobTitle: "Software Developer",
  knowsAbout: ["AI", "Blockchain", "Web3", "TypeScript", "Solidity"]
};

const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "alxstai",
  url: "https://alxstai.com",
  description: "Personal website of Alex, building at the intersection of AI and blockchain."
};

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
        description="Alex builds AI x blockchain products, ships web3 software, and documents experiments in public."
        ogUrl="https://alxstai.com"
        canonicalUrl="https://alxstai.com"
        keywords="alex, alxstai, AI blockchain developer, web3 engineer, ethereum, farcaster, projects"
        structuredData={[personStructuredData, websiteStructuredData]}
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
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl 2xl:text-8xl text-center font-tisa_bold font-bold absolute top-1/2 left-1/2 dark:text-gray-400"
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
          hi, i'm{' '}
          <Link href="/about" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300 dark:focus-visible:ring-offset-black rounded">
            <span className="hover:text-transparent hover:bg-clip-text active:text-transparent active:bg-clip-text hover:bg-gradient-to-r active:bg-gradient-to-r hover:from-purple-300 hover:via-pink-300 hover:to-indigo-400 active:from-purple-300 active:via-pink-300 active:to-indigo-400 dark:hover:from-purple-400 dark:hover:via-pink-400 dark:hover:to-indigo-500 dark:active:from-purple-400 dark:active:via-pink-400 dark:active:to-indigo-500 transition-all duration-500">alex</span>
          </Link>
        </motion.div>
      </StickyLayout>
    </>
  )
}
