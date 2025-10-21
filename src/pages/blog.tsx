import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import StickyPost from '../components/StickyPost';
import StickyWebringBanner from '../components/StickyWebring';
import StickyPageHead from '../components/StickyPageHead';
import StickyLayout from '../components/StickyLayout';
import { useVideoAndDarkMode } from '../hooks/useVideoAndDarkMode';

export default function Blog() {
  const { videoOff, darkMode, toggleDarkMode, toggleVideo } = useVideoAndDarkMode();
  const [loaded, setLoaded] = useState(false);
  const { scrollY } = useScroll();

  const blur = useTransform(scrollY, [0, 100], [0, 6]);
  const scale = useTransform(scrollY, [0, 100], [1, 0.98]);
  const opacity = useTransform(scrollY, [0, 100], [1, 0.9]);

  const [posts] = useState([
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
    },
    {
      username: "alex",
      message: "Currently researching AI x Blockchain topics! Everything is very interesting and definitely worth a look. I did a deep-dive into Gensyn.ai, which is a L1 that helps with training models. I joined swissDAO recently and we are trying to build something that combines these two fascinating fields. Let's see where we end up :)",
      timestamp: new Date(2024, 4, 9, 16, 37, 2, 0),
    },
    {
      username: "alex",
      message: "If you are a dev you need to get the dev.daily browser extension! It gives you new articles to check out whenever you open up a new tab and helps you learn. Great way to procrastinate :D",
      timestamp: new Date(2024, 4, 9, 16, 41, 30, 0),
    },
    {
      username: "alex",
      message: "I'm currently at a political consulting conference in Berlin, because a friend asked me to join. He sent me to participate in the workshop of a company he found interesting and so I did. I almost died of boredom! It reminded me of all the stupid brainstorming sessions at school.",
      timestamp: new Date(2024, 4, 16, 15, 53, 32, 0),
    },
    {
      username: "alex",
      message: "Just read a paper called: \"SoK: Decentralized Finance (DeFi) - Fundamentals, Taxonomy and Risks\". It was recommended to me by Krzysztof Gogol and is a great way to start the DeFi journey. I learned a lot!",
      timestamp: new Date(2024, 4, 21, 16, 55, 31, 0),
    },
    {
      username: "alex",
      message: "Just spent the last couple days at Princeton, because a good friend that came to ETH for an exchange was graduating. There were so many different ceremonies that I lost count at one point. I got a bright orange Princeton sweatshirt and a Princeton Parent mug lol. I've never seen such a huge graduation event. Truly the American experience. Would recommend!",
      timestamp: new Date(2024, 4, 29, 16, 2, 22, 0),
    },
    {
      username: "alex",
      message: "June was crazy. First I went to visit my friend at Princeton. Then I went to see my old U.S. friends in Mason and Cincinnati, which is always a lot of fun. A lot has changed in the Midwest, that's for sure. After Cinci we went on a road trip through South Dakota to live the outlaw life. We saw the Badlands, Mt. Rushmore and bison. Truly the cowboy experience! Once I got back from the U.S. I slept one night in Zurich and then went on to Italy with my friends from ETH. We drove to Florence, Nerano, back to Florence and then spent our last night in a cabin in the woods. I finally got to see the Florence cathedral, which had been on my bucket list since 2017 AP Euro. I also finally saw my brother Michelangelo's \"David\"! Michelangelo was called \"The Divine\", so I wonder who made him the dumbest ninja turtle. Anyways, June was crazy.",
      timestamp: new Date(2024, 6, 5, 11, 37, 5, 0),
    },
    {
      username: "alex",
      message: "I started working for a blockchain startup focused on tokenization. So far I love the vibes and it's a loooot of fun. I can't wait to get more projects out!",
      timestamp: new Date(2024, 6, 5, 11, 50, 4, 0),
    },
    {
      username: "alex",
      message: "Lots of stuff happened. Since July I've been working on 3 projects at the same time while also trying to develop some side projects and learn new things. It has been quite exhausting, but definitely worthwhile. Looking back to when I got my bachelor's in February vs. now is such a big change that I can't even believe it myself. If I continue like this at the same pace I wonder where life will take me. To sum up the past few months: I moved to Paris for an exchange and I started using nvim. More updates soon and shoutout to Akari if he still reads my blog (I'm not in danger, will let you know if that changes).",
      timestamp: new Date(2024, 9, 8, 20, 48, 35, 0),
    },
    {
      username: "alex",
      message: "I love Poland! Warsaw was a very fun trip :)",
      timestamp: new Date(2024, 9, 23, 10, 8, 3, 0),
    },
    {
      username: "alex",
      message: "I haven't been very active on here, because I switched to Farcaster and X (you can find my links in my about page). I have been posting and interacting with friends on these platforms for the past months and I must say it has been amazing! I have learned a lot and met some very cool people. I have also been traveling and building in silence. SWIC is going very well and I have also started focusing more on small Farcaster side projects. I went to the DEGEN anniversary event in Wroclaw and to NFT Paris - two very awesome events! I fell in love with AlienQueen's art and the DEGEN party was also very fun :) If you would like to see more updates please follow me on Farcaster and X!",
      timestamp: new Date(2025, 1, 21, 12, 40, 35, 0),
    }
  ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()));

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  
  return (
    <>
      <StickyPageHead
        title="blog"
        description="alex's personal blog - thoughts on web3, blockchain, software development, and life"
        ogUrl="https://alxstai.com/blog"
        canonicalUrl="https://alxstai.com/blog"
        keywords="blog, alex, alxstai, web3, blockchain, software development, thoughts, personal"
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
              style={{
                filter: blur,
                scale: scale,
                opacity: opacity
              }}
            >
              <div className="mt-10 mb-20">
                {posts.map((post, index) => (
                  <StickyPost
                    key={index}
                    username={post.username}
                    message={post.message}
                    timestamp={post.timestamp}
                  />
                ))}
              </div>

              <div className={`flex justify-center mt-4 p-4 mb-20`}>
                <StickyWebringBanner theme={darkMode ? 'solarized' : 'ugly'}></StickyWebringBanner>
              </div>
            </motion.div>
      </StickyLayout>
    </>
  )
}