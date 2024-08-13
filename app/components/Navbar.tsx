"use client"

import { useState } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar = () => {

    const [menuIcon, setMenuIcon] = useState<boolean>(false);

    const handleDisplayChange = () => {
        setMenuIcon(!menuIcon);
    }

    return (
        <header className="bg-slate-400 text-[#CEFF00] w-full ease-in duration-300 fixed top-0 left-0 z-10">
            <nav className="max-w-[1366px] mx-auto h-[100px] flex justify-between items-center p-4">
                <div>
                    <Link href='/' onClick={handleDisplayChange}>
                        <span className="font-extrabold text-3xl md:text-2xl xl:text-3xl">WELCOME</span>
                    </Link>
                </div>
                
                <ul className="hidden md:flex font-semibold text-xl lg:text-[20px] text-slate-800">
                    <li className="mr-4 lg:mr-8 hover:text-[#CEFF00]">
                        <Link href="/">HOME</Link>
                    </li>
                    <li className="mr-4 lg:mr-8 hover:text-[#CEFF00]">
                        <Link href="/usermgmt">USER MANAGEMENT</Link>
                    </li>
                </ul>
                <div className="hidden md:flex">
                    <div className="flex">
                        <Link href="/signup">
                            <button className="mr-5 bg-[#CEFF00] text-slate-800 hover:bg-slate-800 hover:text-[#CEFF00] rounded-full font-bold px-8 py-2">SIGN UP</button>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar