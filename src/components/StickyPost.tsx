import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface StickyPostProps {
  username: string;
  message: string;
  timestamp: Date;
}

function StickyPost({ username, message, timestamp }: StickyPostProps) {
    const [loaded, setLoaded] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);
    const safeMessage = message.replace(/target=['"]_blank['"]/g, "target='_blank' rel='noopener noreferrer'");

    // Blurs out as the card scrolls up past the top edge, so posts sink into
    // the background instead of just disappearing behind the navbar.
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
    const filter = useTransform(scrollYProgress, [0, 1], ['blur(0px)', 'blur(6px)']);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoaded(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

  return (
    <motion.div ref={ref} style={{ filter, opacity }}>
      <div className={`bg-white border border-black dark:bg-gray-400 dark:border-white rounded shadow-sm p-4 my-5 mx-5 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-10' : 'opacity-0 translate-y-0'}`}>
        <p className="text-xl font-bold mb-2">{username}</p>
        <p dangerouslySetInnerHTML={{ __html: safeMessage }}></p>
        <p className="text-gray-700 dark:text-gray-900 text-sm">{timestamp.toLocaleString('de', { timeZone: 'UTC' })} UTC</p>
      </div>
    </motion.div>
  );
}

export default StickyPost;
