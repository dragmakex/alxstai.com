import Head from 'next/head';
import { useVideoAndDarkMode } from '../utils/utils';
import Navbar from '../utils/navbar';
import { useState, useEffect, useRef } from 'react';
import React from 'react';
import Post from '../utils/post';
import WebringBanner from '@/utils/webring';

type HomeProps = {
  videoOff: boolean;
  darkMode: boolean;
  toggleDarkMode: () => void;
  toggleVideo: () => void;
}

export default function Blog(props: HomeProps) {
  
  const { videoOff, darkMode, toggleDarkMode, toggleVideo} = useVideoAndDarkMode();

  const [loaded, setLoaded] = useState(false);

  const [posts, setPosts] = useState([
    {
      username: "alex",
      message: "Hello world! You can expect tweet-like posts coming soon :)",
      timestamp: new Date(2024, 2, 13, 16, 3, 38, 0),
    },
    {
      username: "alex",
      message: "Happy π-day! That's all.",
      timestamp: new Date(2024, 2, 14, 15, 40, 34, 0),
    },
    {
      username: "alex",
      message: "Last weekend I went to the EthereumZuri.ch conference. It was a lot of fun and I got to meet some really ambitious and innovative people! I will definitely volunteer next year again. You can check out my post here: <a href='https://x.com/alxstai/status/1778838697238032669' target='_blank'>Click me!</a>",
      timestamp: new Date(2024, 3, 15, 14, 0, 44, 0),
    }      
  ]);

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
        <title> blog alx </title>

        <meta name="apple-mobile-web-app-title" content="blog alx"></meta>
        <meta name="application-name" content="blog alx"></meta>
        <meta name="description" content="Blog page of my personal website including blog posts and a webring component for Polyring."></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta charSet="UTF-8"></meta>
        <meta property="og:title" content="blog alx"></meta>
        <meta property="og:description" content="Blog page of my personal website including blog posts and a webring component for Polyring."></meta>
        <meta property="og:image" content="https://alxstai.com/blog"></meta>
        <meta property="og:url" content="https://alxstai.com/blog"></meta>
        <meta property="og:type" content="website"></meta>
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:title" content="blog alx"></meta>
        <meta name="twitter:description" content="Blog page of my personal website including blog posts and a webring component for Polyring."></meta>
        <meta name="twitter:image" content="https://alxstai.com/blog"></meta>
        <meta name="robots" content="index, follow"></meta>

        <link rel="icon" href="/images/favicon.ico"/>
        <link rel="shortcut icon" href="/images/favicon.ico"/>

      </Head>        

      <main className={`px-10 md:px-20 lg:px-40 dark:bg-black ${videoOff && !darkMode ? 'bg-gray-300' : '' }`}>

        <section className="min-h-screen"> 
          <Navbar videoOff={videoOff} darkMode={darkMode} toggleVideo={toggleVideo} toggleDarkMode={toggleDarkMode} />
            {!videoOff && (
            <div className="fixed top-0 left-0 w-full h-full z-[-10]">
              <video src='op_bg.mp4' autoPlay loop muted playsInline className="w-full h-full object-cover object-center"></video>
            </div>
            )}
          <div>
            
            <div className="mt-10">
              {posts.map((post, index) => (
                <Post
                  key={index}
                  username={post.username}
                  message={post.message}
                  timestamp={post.timestamp}
                />
              ))}
            </div>

            <div className={`flex justify-center mt-4 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-10' : 'opacity-0 translate-y-0'}`}>
                <WebringBanner theme={darkMode ? 'solarized' : 'ugly'}></WebringBanner>
            </div>
            
          </div>

          
        </section>
      </main>
    </div>
  )
}