import { AiFillGithub } from 'react-icons/ai';
import { FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { MdCastle } from "react-icons/md";

const GithubIcon = AiFillGithub as unknown as React.ComponentType<{ className?: string }>;
const FarcasterIcon = MdCastle as unknown as React.ComponentType<{ className?: string }>;
const XIcon = FaXTwitter as unknown as React.ComponentType<{ className?: string }>;
const LinkedinIcon = FaLinkedin as unknown as React.ComponentType<{ className?: string }>;
import sticky_luffy from "../../public/images/sticky_luffy.png";
import StickyImage from '../components/ui/StickyImage';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StickyPageHead from '../components/StickyPageHead';
import StickyLayout from '../components/StickyLayout';
import { useVideoAndDarkMode } from '../hooks/useVideoAndDarkMode';

const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "alex",
  url: "https://alxstai.com/about",
  sameAs: [
    "https://github.com/dragmakex",
    "https://x.com/alxstai",
    "https://warpcast.com/alxstai",
    "https://trajectory-ec.ch/",
    "https://www.linkedin.com/in/alxstai/"
  ],
  jobTitle: "Founder",
  description: "AI x blockchain builder and researcher"
};

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
        description="about alex / sticky"
        ogUrl="https://alxstai.com/about"
        canonicalUrl="https://alxstai.com/about"
        keywords="about alex, AI blockchain developer, web3 builder, ethereum, farcaster, trajectory, autonomous systems, robotics, AI agents"
        structuredData={personStructuredData}
      />
      <StickyLayout
        videoOff={videoOff}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        toggleVideo={toggleVideo}
        showVideo={true}
        loaded={loaded}
      >
        <div data-centered-page className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center'>
              <motion.div
                className={`inset-0 border-4 border-gray-600 dark:border-white flex items-center relative mx-auto rounded-full size-[min(64vw,17rem)] sm:size-[min(18rem,calc(100vh_-_7rem))] md:size-[min(20rem,calc(100vh_-_7rem))] lg:size-96 xl:size-[26rem] 2xl:size-[30rem] overflow-hidden dark:bg-gray-400 bg-black ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
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
                  <StickyImage src={sticky_luffy} alt="alex" fill priority sizes="(max-width: 640px) 64vw, (max-width: 768px) 18rem, (max-width: 1024px) 20rem, (max-width: 1280px) 24rem, (max-width: 1536px) 26rem, 30rem" />
              </motion.div>
          
              <motion.div
            className="flex flex-nowrap items-center justify-center gap-5 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20 mt-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 10 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
                  <a
                    href="https://github.com/dragmakex"
                    target='_blank'
                    rel="noopener noreferrer"
                    aria-label='Visit alex on GitHub'
                    className='text-gray-900 dark:text-gray-400 hover:text-white active:text-white dark:hover:text-white dark:active:text-white duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300 dark:focus-visible:ring-offset-black rounded'
                  >
                    <GithubIcon className='w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16' />
                  </a>
                  <a
                    href="https://warpcast.com/alxstai"
                    target='_blank'
                    rel="noopener noreferrer"
                    aria-label='Visit alex on Farcaster'
                    className='text-gray-900 dark:text-gray-400 hover:text-white active:text-white dark:hover:text-white dark:active:text-white duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300 dark:focus-visible:ring-offset-black rounded'
                  >
                    <FarcasterIcon className='w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16' />
                  </a>
                  <a
                    href="https://twitter.com/alxstai"
                    target='_blank'
                    rel="noopener noreferrer"
                    aria-label='Visit alex on X (Twitter)'
                    className='text-gray-900 dark:text-gray-400 hover:text-white active:text-white dark:hover:text-white dark:active:text-white duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300 dark:focus-visible:ring-offset-black rounded'
                  >
                    <XIcon className='w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16' />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/alxstai/"
                    target='_blank'
                    rel="noopener noreferrer"
                    aria-label='Visit alex on LinkedIn'
                    className='text-gray-900 dark:text-gray-400 hover:text-white active:text-white dark:hover:text-white dark:active:text-white duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300 dark:focus-visible:ring-offset-black rounded'
                  >
                    <LinkedinIcon className='w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16' />
                  </a>
              </motion.div>
        </div>
      </StickyLayout>
    </>
  )
}
