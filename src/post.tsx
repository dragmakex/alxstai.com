import React from "react";
import { useState, useEffect } from 'react';

function Post(props: { username: any; message: any; timestamp: any; }) {

    const { username, message, timestamp } = props;
    const [loaded, setLoaded] = useState(false);

    // Set loaded to true after 1000 milliseconds (1 second)
    setTimeout(() => {
        setLoaded(true);
    }, 1000);

  return (
    <div className={`bg-white border border-black dark:bg-gray-400 dark:border-white rounded shadow-sm p-4 my-5 mx-5 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-10' : 'opacity-0 translate-y-0'}`}>
      <p className="text-xl font-bold mb-2">{username}</p>
      <p className="mb-4">{message}</p>
      <p className="text-gray-400 dark:text-gray-600 text-sm">{timestamp.toLocaleString('de', { timeZone: 'UTC' })} UTC</p>
    </div>
  );
}

export default Post;