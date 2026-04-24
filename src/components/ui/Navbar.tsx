import { useState, useEffect } from "react";
import Link from "next/link";
import Dropdown from "./Dropdown";
import { BsFillMoonStarsFill, BsFillSunFill, BsCameraVideoOffFill, BsCameraVideoFill } from 'react-icons/bs';

const SunIcon = BsFillSunFill as unknown as React.ComponentType<{ size?: number; className?: string }>;
const MoonIcon = BsFillMoonStarsFill as unknown as React.ComponentType<{ size?: number; className?: string }>;
const VideoOffIcon = BsCameraVideoOffFill as unknown as React.ComponentType<{ size?: number; className?: string }>;
const VideoOnIcon = BsCameraVideoFill as unknown as React.ComponentType<{ size?: number; className?: string }>;

interface NavbarProps {
    videoOff: boolean;
    darkMode: boolean;
    toggleDarkMode: () => void;
    toggleVideo: () => void;
}

function Navbar(props: NavbarProps) {

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoaded(true);
        }, 300);
        return () => clearTimeout(timer);
    }, []);
    
      
    return (
        <div className="">
            <nav className={`py-6 mb-8 md:py-10 md:mb-2 2xl:mb-10 2xl:py-18 flex justify-between transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}> 
                <Link href="/" className='text-3xl font-tisa font-bold dark:text-gray-400 hover:text-white active:text-white dark:hover:text-white dark:active:text-white duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300 dark:focus-visible:ring-offset-black rounded'>
                    alxstai
                </Link>
                <ul className='flex items-center'>
                    <li className='flex px-2'>
                        {props.videoOff && props.darkMode && (
                            <button
                                onClick={props.toggleDarkMode}
                                aria-label="Switch to light mode"
                                className='cursor-pointer text-2xl text-gray-400 hidden dark:block active:text-white hover:text-white duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300 dark:focus-visible:ring-offset-black rounded'
                            >
                                <SunIcon size={25} />
                            </button>
                        )}
                        {props.videoOff && !props.darkMode && (
                            <button
                                onClick={props.toggleDarkMode}
                                aria-label="Switch to dark mode"
                                className='cursor-pointer text-2xl block dark:hidden active:text-white hover:text-white duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300 dark:focus-visible:ring-offset-black rounded'
                            >
                                <MoonIcon size={23} />
                            </button>
                        )}
                    </li>
                    <li className='flex px-2'>
                        <button
                            onClick={props.toggleVideo}
                            aria-label={props.videoOff ? 'Enable background video' : 'Disable background video'}
                            className='cursor-pointer text-2xl 2xl:text-4xl text-black dark:text-gray-400 active:text-white hover:text-white dark:hover:text-white duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300 dark:focus-visible:ring-offset-black rounded'
                        >
                            {props.videoOff ? <VideoOnIcon size={25} /> : <VideoOffIcon size={25} />}
                        </button>
                    </li>
                    <li>
                        <div className='flex text-black px-2 ml-5 dark:text-gray-400'>
                            <Dropdown></Dropdown>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;
