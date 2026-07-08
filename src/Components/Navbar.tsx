import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    SearchCheck,
    X,
    Bell,
    LogOut,
    FileText,
} from "lucide-react";
import Cookies from "js-cookie";
import { useAppDispatch } from "../Hooks/hooks"; // adjust path if needed
import { logout } from "../Store/slices/LoginSlice/loginSlice";

interface NavbarProps {
    isSearchOpen: boolean;
    setIsSearchOpen: (val: boolean) => void;
}

export default function Navbar({ isSearchOpen, setIsSearchOpen }: NavbarProps) {
    const [showNotif, setShowNotif] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isSignOutOpen, setIsSignOutOpen] = useState(false);

    // Moved notifications to state so we can update them

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = {
        firstname: "Admin",
        lastname: "",
        email: "admin@desimates.com",
        profile_pic: "/avatar.webp",
    };

    const notifications: any[] = [];

    const loading = false;

    const hasUnread = false;

    const notifRef = useRef<HTMLDivElement>(null);
    const bellRef = useRef<HTMLButtonElement>(null);
    const avatarRef = useRef<HTMLDivElement>(null);
    const profileMenuRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);

    const menuGroups = [
        {
            heading: "MAIN",
            items: [
                { name: "Dashboard", path: "/dashboard" },
            ],
        },
        {
            heading: "USERS",
            items: [
                { name: "All Users", path: "/all-users" },
                { name: "Subscribed Users", path: "/sub-users" },
            ],
        },
        {
            heading: "CATEGORY",
            items: [
                { name: "All Category", path: "/category/all-category" },
                { name: "Add Category", path: "/category/add-category" },
            ],
        },
        {
            heading: "INTEREST",
            items: [
                { name: "All Interest", path: "/interest/all-interest" },
                { name: "Add Interest", path: "/interest/add-interest" },
            ],
        },
        {
            heading: "STAR SIGN",
            items: [
                { name: "All Star Sign", path: "/starsign/all-starsign" },
                { name: "Add Star Sign", path: "/starsign/add-starsign" },
            ],
        },
        {
            heading: "RELIGION",
            items: [
                { name: "All Religion", path: "/religion/all-religion" },
                { name: "Add Religion", path: "/religion/add-religion" },
            ],
        },
        {
            heading: "EVENT",
            items: [
                { name: "All Event", path: "/event/all-event" },
                { name: "Add Event", path: "/event/add-event" },
            ],
        },
        {
            heading: "PAYMENT",
            items: [
                { name: "Payment List", path: "/payment/payment-list" },
            ],
        },
        {
            heading: "MATCHES",
            items: [
                { name: "All Matches", path: "/matches/all-matches" },
            ],
        },
        {
            heading: "TICKET",
            items: [
                { name: "All Tickets", path: "/ticket/all-tickets" },
            ],
        },
        {
            heading: "REPORT",
            items: [
                { name: "Report List", path: "/report/all-reports" },
            ],
        },
        {
            heading: "EVENT MANAGER",
            items: [
                { name: "Manager List", path: "/event-manager/manager-list" },
                { name: "Add Manager", path: "/event-manager/add-manager" },
            ],
        },
        {
            heading: "SETTINGS",
            items: [
                { name: "Settings", path: "/settings" },
            ],
        },
    ];

    const handlePageClick = (path: string) => {
        navigate(path);
        setIsSearchOpen(false);
        setSearchTerm("");
    };

    const toggleNotif = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowProfile(false);
        if (isSearchOpen) setIsSearchOpen(false);
        setShowNotif(!showNotif);
    };

    const toggleProfile = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowNotif(false);
        if (isSearchOpen) setIsSearchOpen(false);
        setShowProfile(!showProfile);
    };

    const toggleSearch = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowNotif(false);
        setShowProfile(false);
        setIsSearchOpen(!isSearchOpen);
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [setIsSearchOpen]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as Node;
            if (showNotif && notifRef.current && !notifRef.current.contains(target) &&
                bellRef.current && !bellRef.current.contains(target)) {
                setShowNotif(false);
            }
            if (showProfile &&
                avatarRef.current && !avatarRef.current.contains(target) &&
                profileMenuRef.current && !profileMenuRef.current.contains(target)) {
                setShowProfile(false);
            }
            if (isSearchOpen && searchRef.current && !searchRef.current.contains(target)) {
                setIsSearchOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [showNotif, showProfile, isSearchOpen, setIsSearchOpen]);


    return (
        <>
            <header className="theme-container fixed top-0 right-0 z-[45] w-full lg:w-[calc(100%-280px)] lg:ml-[280px] h-[70px] bg-white flex items-center justify-between px-6 shadow-sm font-inter text-left">
                <div className="flex items-center gap-4">
                    <img
                        src="/logo/logo.png"
                        alt="DesiMates"
                        className="h-10 w-auto lg:hidden pl-12 object-contain"
                    />

                    <button onClick={toggleSearch} className="lg:hidden rounded-full hover:bg-gray-100 p-2">
                        <SearchCheck className="w-6 h-6 text-gray-500" />
                    </button>

                    <div className="hidden lg:block">
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onClick={() => setIsSearchOpen(true)}
                            placeholder="Search your page..."
                            className="w-[320px] h-10 rounded-lg border border-gray-200 px-4 text-sm outline-none"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-6 relative">
                    {/* <button ref={bellRef} onClick={toggleNotif} className="relative cursor-pointer bg-white border border-gray-200 rounded-sm p-1.5 hover:bg-gray-50 transition-colors">
                        <Bell className="w-6 h-6 text-gray-600" />
                        {hasUnread && (
                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500 border-2 border-white"></span>
                            </span>
                        )}
                    </button> */}

                    <div className="relative">
                        <div
                            ref={avatarRef}
                            onClick={toggleProfile}
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                        >
                            <div className="w-10 h-10 rounded-full bg-[#2563EB] flex items-center justify-center text-white font-semibold border border-gray-200">
                                A
                            </div>
                        </div>

                        {showProfile && (
                            <div ref={profileMenuRef} className="absolute right-0 top-12 w-64 bg-white shadow-xl rounded-lg border border-gray-200 z-50 overflow-hidden text-left">
                                <div className="p-4 border-b border-gray-200 flex items-center space-x-3">
                                    <div className="w-8 h-8 rounded-full bg-[#2563EB] flex items-center justify-center text-white font-semibold border border-gray-200">
                                        A
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="font-semibold text-sm text-gray-900">
                                            {user
                                                ? `${user.firstname} ${user.lastname}`
                                                : "Loading..."}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {user?.email || ""}
                                        </div>
                                    </div>
                                </div>
                                <nav className="py-2">
                                    <button
                                        onClick={() => {
                                            navigate('/my-profile');
                                            setShowProfile(false);
                                        }}
                                        className="w-full text-left block px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700"
                                    >
                                        My Profile
                                    </button>
                                    <div className="my-1 border-t border-gray-200"></div>
                                    <button
                                        onClick={() => {
                                            dispatch(logout());

                                            Cookies.remove("desimates_admin_token");

                                            setShowProfile(false);

                                            navigate("/login", { replace: true });
                                        }}
                                        className="w-full text-left block px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700 font-semibold"
                                    >
                                        Sign Out
                                    </button>
                                </nav>
                            </div>
                        )}
                    </div>


                </div>

                {isSearchOpen && (
                    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60">
                        <div ref={searchRef} className="relative bg-white rounded-xl shadow-2xl w-full max-w-[480px] overflow-hidden border border-gray-100">


                            <div className="p-6 space-y-6">
                                {/* Search Input */}
                                <div>
                                    <div className="flex items-center justify-between mb-3 -mt-3">
                                        <p className="text-[14px] font-medium text-[#1E293B]">Search your page</p>
                                        <button
                                            onClick={() => setIsSearchOpen(false)}
                                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                                        >
                                            <X size={20} className="text-gray-500" />
                                        </button>
                                    </div>
                                    <input
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Enter keywords..."
                                        className="w-full h-10 rounded-lg border border-gray-200 px-4 text-sm outline-none"
                                    />
                                </div>

                                {/* Search Results */}
                                <div className="max-h-[60vh] overflow-y-auto">
                                    {menuGroups.map((group) => {
                                        const groupMatches = group.items.filter(item =>
                                            item.name.toLowerCase().includes(searchTerm.toLowerCase())
                                        );
                                        if (groupMatches.length === 0) return null;
                                        return (
                                            <div key={group.heading} className="mb-6">
                                                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                                                    {group.heading}
                                                </div>
                                                <div className="space-y-2">
                                                    {groupMatches.map((item) => (
                                                        <button
                                                            key={item.name}
                                                            onClick={() => handlePageClick(item.path)}
                                                            className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 text-left group transition-all border border-transparent hover:border-gray-200"
                                                        >
                                                            <div className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-lg group-hover:bg-white transition-colors">
                                                                <FileText size={20} className="text-gray-400" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <div className="text-[14px] font-semibold text-[#1E293B]">{item.name}</div>
                                                                <div className="text-[12px] text-[#64748B]">{item.path}</div>
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {searchTerm && menuGroups.every(group =>
                                        group.items.every(item =>
                                            !item.name.toLowerCase().includes(searchTerm.toLowerCase())
                                        )
                                    ) && (
                                            <div className="text-center py-8">
                                                <p className="text-[14px] text-[#64748B]">No results found for "{searchTerm}"</p>
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </header>


        </>
    );
}