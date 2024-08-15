"use client"

import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Link from "next/link";

const Navbar = () => {

    const [menuIcon, setMenuIcon] = useState<boolean>(false);
    const [scroll, setScroll] = useState<boolean>(false);

    const changeBackground = ()=>{
        if(window.scrollY>=80){
            setScroll(true);
        }
        else{
            setScroll(false);
        }
    }

    window.addEventListener('scroll', changeBackground);

    const handleDisplayChange = () => {
        setMenuIcon(!menuIcon);
    }

    return (
        <header className={`${scroll?"bg-[#03fc56] text-slate-800":"bg-slate-800 text-[#03fc56]"} w-full ease-in duration-300 fixed top-0 left-0 z-10`}>
            <nav className="max-w-[1366px] mx-auto h-[100px] flex justify-between items-center p-4">
                <div>
                    <Link href='/' onClick={handleDisplayChange}>
                        <span className="font-extrabold text-3xl md:text-2xl xl:text-3xl">WELCOME</span>
                    </Link>
                </div>

                <ul className="hidden md:flex font-semibold text-xl lg:text-[20px] text-white">
                    <li className="mr-4 lg:mr-8 hover:text-[#03fc56]">
                        <Link href="/">HOME</Link>
                    </li>
                    <li className="hover:text-[#03fc56]">
                        <Link href="/usermgmt">USER MANAGEMENT</Link>
                    </li>
                </ul>
                <div className="hidden md:flex">
                    <div className="flex">
                        <Link href="/signup">
                            <button className="mr-5 bg-[#03fc56] text-slate-800 hover:bg-slate-800 hover:text-[#03fc56] rounded-full font-bold px-8 py-2">SIGN UP</button>
                        </Link>
                    </div>
                </div>

                <div onClick={handleDisplayChange} className="flex md:hidden">
                    {menuIcon ? 
                    (<AiOutlineClose size={25} className={`${scroll?"text-slate-800":"text-[#03fc56]"} cursor-pointer`} />) : 
                    (<AiOutlineMenu size={25} className={`${scroll?"text-slate-800":"text-[#03fc56]"} cursor-pointer`} />)}
                </div>

                <div className={menuIcon ?
                    "md:hidden absolute top-[100px] right-0 bottom-0 left-0 flex justify-center items-center w-full h-screen bg-slate-800 text-white text-center ease-in duration-300" : 
                    "md:hidden absolute top-[100px] right-0 left-[-100%] flex justify-center items-center w-full h-screen bg-slate-800 text-white text-center ease-out duration-300"
                }>
                    <div className="w-full">
                        <ul className="uppercase font-bold text-2xl">
                            <li onClick={handleDisplayChange} className="py-5 hover:text-[#03fc56] cursor-pointer">
                                <Link href="/">
                                    HOME
                                </Link>
                            </li>
                            <li onClick={handleDisplayChange} className="py-5 hover:text-[#03fc56] cursor-pointer">
                                <Link href="/usermgmt">
                                    USER MANAGEMENT
                                </Link>
                            </li>
                        </ul>
                        <div className="flex justify-center items-center mt-16">
                            <Link href="/signup">
                                <button onClick={handleDisplayChange} className="bg-[#03fc56] text-slate-800 rounded-full font-bold py-3 w-[250px] mb-5">SIGN UP</button>
                            </Link>
                        </div>
                    </div>

                </div>
            </nav>
        </header>
    )
}

export default Navbar