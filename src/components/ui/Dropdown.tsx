import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const HamburgerIcon = GiHamburgerMenu as unknown as React.ComponentType<{ size?: number; className?: string }>;
import droplist from "../../data/navigation.json"
import Link from "next/link";

function Dropdown() {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative flex flex-col items-center">
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label="Open navigation menu"
                aria-expanded={isOpen}
                className="flex justify-center border-2 border-transparent active:border-white duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300 dark:focus-visible:ring-offset-black rounded"
            >
                {isOpen && (   
                    <div className="md:w-[96px] absolute flex flex-col top-10 items-center rounded-lg p-1.5"> 
                        {droplist.map((item, i) => (
                                <Link
                                    href={item.path}
                                    key={i}
                                    className="font-tisa items-center flex justify-center px-2 py-1 hover:bg-gradient-to-r active:bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-400 active:from-purple-300 active:via-pink-300 active:to-indigo-400 dark:from-purple-400 dark:via-pink-400 dark:to-indigo-500 dark:active:from-purple-400 dark:active:via-pink-400 dark:active:to-indigo-500 cursor-pointer rounded-r-md border-l-transparent hover:border-l-black hover:dark:border-l-gray-400 border-l-4 active:text-white duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300 dark:focus-visible:ring-offset-black"
                                >
                                    <h3>{item.tab}</h3>
                                </Link>
                            )
                        )}
                    </div>
                )}
                <HamburgerIcon size={25} className=" active:text-white active:border-white hover:text-white duration-300" />
            </button> 
        </div>
    )
}

export default Dropdown;