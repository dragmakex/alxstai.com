import { useState, useEffect } from 'react';

interface StickyPostProps {
  username: string;
  message: string;
  timestamp: Date;
}

function StickyPost({ username, message, timestamp }: StickyPostProps) {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoaded(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

  return (
    <div className={`bg-white border border-black dark:bg-gray-400 dark:border-white rounded shadow-sm p-4 my-5 mx-5 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-10' : 'opacity-0 translate-y-0'}`}>
      <p className="text-xl font-bold mb-2">{username}</p>
      <p dangerouslySetInnerHTML={{ __html: message }}></p>
      <p className="text-gray-400 dark:text-gray-600 text-sm">{timestamp.toLocaleString('de', { timeZone: 'UTC' })} UTC</p>
    </div>
  );
}

export default StickyPost;