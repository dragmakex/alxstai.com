import { useId, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import droplist from "../../data/navigation.json";
import Link from "next/link";

const HamburgerIcon = GiHamburgerMenu as unknown as React.ComponentType<{ size?: number; className?: string }>;

function Dropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const menuId = useId();

    return (
        <div
            className="relative flex w-[29px] flex-col items-center"
            onKeyDown={event => {
                if (event.key === "Escape") {
                    setIsOpen(false);
                    event.currentTarget.querySelector("button")?.focus();
                }
            }}
        >
            <button
                type="button"
                onClick={() => setIsOpen(prev => !prev)}
                aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isOpen}
                aria-controls={isOpen ? menuId : undefined}
                className="flex justify-center border-2 border-transparent active:border-white duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300 dark:focus-visible:ring-offset-black rounded"
            >
                <HamburgerIcon size={25} className="active:text-white active:border-white hover:text-white duration-300" />
            </button>
            {isOpen && (
                <div
                    id={menuId}
                    role="navigation"
                    aria-label="Pages"
                    className="mt-2 flex w-max flex-col self-end items-center rounded-lg p-1.5 lg:absolute lg:left-1/2 lg:top-10 lg:mt-0 lg:w-[96px] lg:-translate-x-1/2 lg:self-auto"
                >
                    {droplist.map(item => (
                        <Link
                            href={item.path}
                            key={item.path}
                            onClick={() => setIsOpen(false)}
                            className="font-tisa items-center flex min-h-11 justify-center w-full px-3 py-1 my-0.5 lg:min-h-0 hover:bg-gradient-to-r active:bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-400 active:from-purple-300 active:via-pink-300 active:to-indigo-400 dark:from-purple-400 dark:via-pink-400 dark:to-indigo-500 dark:active:from-purple-400 dark:active:via-pink-400 dark:active:to-indigo-500 cursor-pointer rounded-full active:text-white duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300 dark:focus-visible:ring-offset-black"
                        >
                            <h3>{item.tab}</h3>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Dropdown;
