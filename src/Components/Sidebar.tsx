import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    Menu,
    X,
    Minus,
    Plus,
    Grid3X3,
    Heart,
    Sparkles,
    Landmark,
    CalendarDays,
    Wallet,
    Shuffle,
    Ticket,
    Flag,
    UserCog,
    Settings as SettingsIcon,
} from "lucide-react";
import "./_theme.scss";

interface SubMenuItem {
    name: string;
    path: string;
}

interface MenuItem {
    name: string;
    icon: any;
    path?: string;
    children?: SubMenuItem[];
}

interface MenuGroup {
    heading: string;
    items: MenuItem[];
}

interface SideBarProps {
    isSearchOpen: boolean;
}

export default function SideBar({ isSearchOpen }: SideBarProps) {

    const [isOpen, setIsOpen] = useState(false);
    const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
    const location = useLocation();
    const activeItemRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

    const siteName = "DesiMates";

    const menuGroups: MenuGroup[] = [
        {
            heading: "Dashboard",
            items: [
                {
                    name: "Dashboard",
                    icon: LayoutDashboard,
                    path: "/dashboard",
                },
            ],
        },
        {
            heading: "USER MANAGEMENT",
            items: [
                {
                    name: "Users",
                    icon: Users,
                    children: [
                        { name: "All Users", path: "/all-users" },
                        { name: "Subscribed Users", path: "/sub-users" },
                    ],
                },
            ],
        },
        {
            heading: "CONTENT",
            items: [
                {
                    name: "Category",
                    icon: Grid3X3,
                    children: [
                        { name: "All Category", path: "/category/all-category" },
                        { name: "Add Category", path: "/category/add-category" },
                    ],
                },
                {
                    name: "Interest",
                    icon: Heart,
                    children: [
                        { name: "All Interest", path: "/interest/all-interest" },
                        { name: "Add Interest", path: "/interest/add-interest" },
                    ],
                },
                {
                    name: "Star Sign",
                    icon: Sparkles,
                    children: [
                        { name: "All Star Sign", path: "/starsign/all-starsign" },
                        { name: "Add Star Sign", path: "/starsign/add-starsign" },
                    ],
                },
                {
                    name: "Religion",
                    icon: Landmark,
                    children: [
                        { name: "All Religion", path: "/religion/all-religion" },
                        { name: "Add Religion", path: "/religion/add-religion" },
                    ],
                },
            ],
        },
        {
            heading: "EVENTS",
            items: [
                {
                    name: "Event",
                    icon: CalendarDays,
                    children: [
                        { name: "All Event", path: "/event/all-event" },
                        { name: "Add Event", path: "/event/add-event" },
                    ],
                },
                {
                    name: "Event Manager",
                    icon: UserCog,
                    children: [
                        { name: "Manager List", path: "/event-manager/manager-list" },
                        { name: "Add Manager", path: "/event-manager/add-manager" },
                    ],
                },
                {
                    name: "Ticket",
                    icon: Ticket,
                    path: "/ticket/all-tickets",
                },
            ],
        },
        {
            heading: "FINANCE",
            items: [
                {
                    name: "Payment List",
                    icon: Wallet,
                    path: "/payment/payment-list",
                },
            ],
        },
        {
            heading: "ACTIVITY",
            items: [
                {
                    name: "Matches",
                    icon: Shuffle,
                    path: "/matches/all-matches",
                },
                {
                    name: "Report",
                    icon: Flag,
                    children: [
                        { name: "Report List", path: "/report/all-reports" },
                        { name: "Add Report", path: "/report/add-reports" },
                    ],
                },
            ],
        },
        {
            heading: "SYSTEM",
            items: [
                {
                    name: "Settings",
                    icon: SettingsIcon,
                    path: "/settings",
                },
            ],
        },
    ];

    useEffect(() => {
        menuGroups.forEach((group) => {
            group.items.forEach((item) => {
                if (item.children?.some((child) => child.path === location.pathname)) {
                    setExpandedMenu(item.name);
                }
            });
        });
    }, [location.pathname]);

    useEffect(() => {
        if (activeItemRef.current) {
            activeItemRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    }, [location.pathname, expandedMenu]);

    const toggleMenu = (name: string) => {
        setExpandedMenu((prev) => (prev === name ? null : name));
    };

    return (
        <div className="sidebar-container">
            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 3px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
                .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #e5e7eb transparent; }
            `}</style>

            {!isSearchOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="lg:hidden fixed top-4 left-4 z-[50] p-2 bg-white border border-gray-200 rounded-md"
                >
                    <Menu className="w-6 h-6 text-gray-600" />
                </button>
            )}

            <div className={`fixed top-0 left-0 z-[50] w-[280px] h-screen bg-white transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>

                <div className="relative h-full border-r border-gray-100 bg-white flex flex-col">

                    {/* Logo */}
                    <div className="flex items-center justify-between px-6 h-[70px] shrink-0">
                        <div className="flex items-center gap-3">
                            <img src="/logo/logo-icon.png" alt="DesiMates" className="w-10 h-10 object-contain" />
                            <span className="text-[20px] font-bold text-[#111827]">{siteName}</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 text-gray-400 hover:text-gray-600">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Nav */}
                    <div className="mt-4 flex-1 overflow-y-auto custom-scrollbar pb-10">
                        <nav className="flex flex-col gap-6">
                            {menuGroups.map((group) => (
                                <div key={group.heading} className="flex flex-col gap-1">
                                    <div className="ml-6 mb-2 text-left">
                                        <span className="text-[11px] text-[#888888] uppercase tracking-widest font-bold">
                                            {group.heading}
                                        </span>
                                    </div>

                                    {group.items.map((item) => {
                                        const hasChildren = item.children && item.children.length > 0;
                                        const isExpanded = expandedMenu === item.name;
                                        const isParentActive = hasChildren && item.children?.some(child => child.path === location.pathname);
                                        const Icon = item.icon;

                                        if (hasChildren) {
                                            return (
                                                <div key={item.name} className="relative">
                                                    <button
                                                        onClick={() => toggleMenu(item.name)}
                                                        className={`flex items-center justify-between w-full px-5 py-3 transition-all relative group
                                                            ${isParentActive ? "sidebar-active-text sidebar-active-item-bg font-semibold" : "text-[#333333] hover:bg-gray-50"}`}
                                                    >
                                                        {isParentActive && (
                                                            <div className="absolute left-0 top-0 w-1 h-full sidebar-active-line rounded-r-xl" />
                                                        )}
                                                        <div className="flex items-center gap-4">
                                                            <Icon size={20} className={isParentActive ? "sidebar-active-text" : "text-gray-500 group-hover:text-gray-700"} />
                                                            <span className="text-[15px]">{item.name}</span>
                                                        </div>
                                                        <span className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : "rotate-0"}`}>
                                                            {isExpanded ? <Minus size={14} /> : <Plus size={14} />}
                                                        </span>
                                                    </button>

                                                    <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                                                        <div className="overflow-hidden">
                                                            <div className="relative ml-[33px] mt-1 pl-1.5 border-l-2 border-gray-100 pb-2">
                                                                {item.children?.map((child) => (
                                                                    <NavLink
                                                                        key={child.name}
                                                                        to={child.path}
                                                                        onClick={() => { if (window.innerWidth < 1024) setIsOpen(false); }}
                                                                        className={({ isActive }) =>
                                                                            `flex items-center w-full px-4 py-2 text-sm transition-all rounded-md relative
                                                                            ${isActive ? "sidebar-active-text sidebar-active-item-bg font-semibold" : "text-[#333333] hover:bg-[#f1f1f1]"}`
                                                                        }
                                                                    >
                                                                        {({ isActive }) => (
                                                                            <div className="flex items-center">
                                                                                {isActive && (
                                                                                    <div className="absolute -left-[11.75px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 sidebar-active-line rounded-full border-2 border-white" />
                                                                                )}
                                                                                <span>{child.name}</span>
                                                                            </div>
                                                                        )}
                                                                    </NavLink>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }

                                        return (
                                            <NavLink
                                                key={item.name}
                                                to={item.path || "#"}
                                                onClick={() => { if (window.innerWidth < 1024) setIsOpen(false); }}
                                                className={({ isActive }) =>
                                                    `flex items-center justify-between w-full px-6 py-3 transition-all relative group
                                                    ${isActive ? "text-[#2563EB] bg-blue-50 font-semibold" : "text-gray-700 hover:bg-gray-50"}`
                                                }
                                            >
                                                {({ isActive }) => (
                                                    <>
                                                        {isActive && (
                                                            <div className="absolute left-0 top-0 w-1 h-full sidebar-active-line rounded-r-xl" />
                                                        )}
                                                        <div className="flex items-center gap-3">
                                                            <Icon size={20} className={isActive ? "sidebar-active-text" : "text-gray-500 group-hover:text-gray-700"} />
                                                            <span className="text-sm">{item.name}</span>
                                                        </div>
                                                    </>
                                                )}
                                            </NavLink>
                                        );
                                    })}
                                </div>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="fixed inset-0 bg-black/20 z-[45] lg:hidden" onClick={() => setIsOpen(false)} />
            )}
        </div>
    );
}
