import React, { useState } from "react";
import { useVideoAndDarkMode } from '../utils';
import Dropdown from "./dropdown";
import { BsFillMoonStarsFill, BsFillSunFill, BsCameraVideoOffFill, BsCameraVideoFill } from 'react-icons/bs';

type NavbarProps = {
    videoOff: boolean;
    darkMode: boolean;
    toggleDarkMode: () => void;
    toggleVideo: () => void;
  }


function Navbar(props:NavbarProps) {

    const [loaded, setLoaded] = useState(false);

    // Set loaded to true after 1000 milliseconds (1 second)
    setTimeout(() => {
        setLoaded(true);
    }, 300);
    
      
    return (
        <div className="">
            <nav className={`py-10 mb-12 flex justify-between transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}> 
                <a href="/"><h1 className='text-3xl font-tisa font-bold dark:text-gray-400 hover:text-white active:text-white dark:hover:text-white dark:active:text-white duration-300'>alxstai</h1></a>
                <ul className='flex items-center'>
                <li className='flex px-2'>
                    {props.videoOff && (<BsFillMoonStarsFill onClick={props.toggleDarkMode} size={23} className='cursor-pointer text-2xl block dark:hidden active:text-white hover:text-white duration-300'></BsFillMoonStarsFill> )}
                    {props.videoOff && (<BsFillSunFill onClick={props.toggleDarkMode} size={25} className='cursor-pointer text-2xl text-gray-400 hidden dark:block active:text-white hover:text-white duration-300'> </BsFillSunFill> )}
                </li>
                <li className='flex px-2'>
                {!props.videoOff && (<BsCameraVideoOffFill onClick={props.toggleVideo} size={25} className='cursor-pointer text-2xl text-black active:text-white hover:text-white duration-300'> </BsCameraVideoOffFill> )}
                {props.videoOff && (<BsCameraVideoFill onClick={props.toggleVideo} size={25} className='cursor-pointer text-2xl text-black dark:text-gray-400 active:text-white hover:text-white dark:hover:text-white duration-300'> </BsCameraVideoFill> )}
                </li>
                <li>
                    <a className=' flex text-black px-2 ml-5 dark:text-gray-400 '>
                    <Dropdown></Dropdown>
                    </a>
                </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;