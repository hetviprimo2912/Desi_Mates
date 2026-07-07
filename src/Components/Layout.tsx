import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Navbar from "../Components/Navbar";


import Sidebar from "../Components/Sidebar";

export default function Layout() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <div className="flex h-screen w-full">

            <div className="relative">
                <Sidebar isSearchOpen={isSearchOpen} />

                {isSearchOpen && (
                    <div className="hidden lg:block fixed left-0 top-0 w-[280px] h-screen bg-black/60 z-[60]" />
                )}
            </div>

            {/* ✅ Sidebar Space Maintain */}
            <div className="hidden lg:block w-[280px] shrink-0"></div>

            <div className="flex flex-col flex-1 overflow-hidden">

                {/* ✅ Navbar */}
                <div className="h-[70px] shrink-0">
                    <Navbar
                        isSearchOpen={isSearchOpen}
                        setIsSearchOpen={setIsSearchOpen}
                    />
                </div>

                {/* ✅ Main Content */}
                <div className="flex-1 overflow-y-auto  lg:pl-[0px]">
                    <Outlet />
                </div>

            </div>
        </div>
    );
}