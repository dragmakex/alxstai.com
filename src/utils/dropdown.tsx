import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import droplist from "./droplist.json"
import Link from "next/link";

function Dropdown() {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative flex flex-col items-center">
            <button onClick={() => setIsOpen((prev) => !prev)}  className="flex justify-center border-2 border-transparent active:border-white duration-500 ">
                {isOpen && (   
                    <div className="md:w-[120px] absolute flex flex-col top-10 items-center rounded-lg p-2"> 
                        {droplist.map((item, i) => (
                                <Link href={item.path} key={i}>
                                    <div className="font-tisa items-center flex w-full justify-center p-1 hover:bg-gradient-to-r from-blue-500 to-purple-500 cursor-pointer rounded-r-md border-l-transparent hover:border-l-black hover:dark:border-l-gray-400 border-l-4 active:text-white duration-200" key={i}>
                                        <h3>{item.tab}</h3>
                                    </div>
                                </Link>
                            )
                        )}
                    </div>
                )}
                <GiHamburgerMenu size={25} className=" active:text-white active:border-white hover:text-white duration-300"></GiHamburgerMenu>
            </button> 
        </div>
    )
}

export default Dropdown;