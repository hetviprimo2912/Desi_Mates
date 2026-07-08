import { useState, useRef, useEffect } from "react";
import { ChevronDown, Download, CalendarDays, Users, Tag, TrendingUp } from "lucide-react";
import StatsCard from "../../Components/StatsCard";
import Search from "../../Components/Search";
import TableHeader from "../../Components/TableHeader";
import Pagination from "../../Components/Pagination";
import CategoriesDeleteModal from "../../Components/CategoriesDeleteModal";
import Action from "../../Components/Action";
import { useNavigate } from "react-router-dom";

interface Event {
    id: number;
    image: string;
    eventName: string;
    price: number;
    organizedBy: string;
    category: string;
    totalJoined: number;
}

const initialEvents: Event[] = [
    { id: 1, image: "https://picsum.photos/80?201", eventName: "Musical Fest (Demo)", price: 49, organizedBy: "DesiMatesTeam", category: "Musical Night", totalJoined: 0 },
    { id: 2, image: "https://picsum.photos/80?202", eventName: "Love Coaching (Demo)", price: 125, organizedBy: "LoveDoctor", category: "Dance", totalJoined: 3 },
    { id: 3, image: "https://picsum.photos/80?203", eventName: "Desi Night Out", price: 75, organizedBy: "DesiMatesTeam", category: "Networking", totalJoined: 12 },
    { id: 4, image: "https://picsum.photos/80?204", eventName: "Bollywood Bash", price: 60, organizedBy: "BollywoodClub", category: "Music", totalJoined: 45 },
    { id: 5, image: "https://picsum.photos/80?205", eventName: "Speed Dating", price: 30, organizedBy: "DesiMatesTeam", category: "Dating", totalJoined: 20 },
];

const eventStats = [
    { label: "Total Events", value: "5", sub: "All listed events", icon: <CalendarDays size={24} className="text-blue-600" />, bg: "bg-blue-50" },
    { label: "Total Joined", value: "80", sub: "Across all events", icon: <Users size={24} className="text-green-600" />, bg: "bg-green-50" },
    { label: "Categories", value: "5", sub: "Unique event categories", icon: <Tag size={24} className="text-purple-600" />, bg: "bg-purple-50" },
    { label: "Most Popular", value: "Bollywood Bash", sub: "45 joined", icon: <TrendingUp size={24} className="text-orange-600" />, bg: "bg-orange-50" },
];

export default function AllEvent() {
    const [events, setEvents] = useState<Event[]>(initialEvents);
    const [searchTerm, setSearchTerm] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedEvents, setSelectedEvents] = useState<Set<number>>(new Set());
    const [isExportOpen, setIsExportOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [eventToDelete, setEventToDelete] = useState<Event | null>(null);
    const exportRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();
    const filteredEvents = events.filter(event =>
        event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.organizedBy.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedEvents = filteredEvents.slice(startIndex, startIndex + rowsPerPage);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (exportRef.current && !exportRef.current.contains(e.target as Node)) setIsExportOpen(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => { setCurrentPage(1); }, [searchTerm]);

    const handleSelectAll = (checked: boolean) => {
        setSelectedEvents(checked ? new Set(paginatedEvents.map((_, i) => i)) : new Set());
    };

    const handleSelectEvent = (index: number, checked: boolean) => {
        const updated = new Set(selectedEvents);
        checked ? updated.add(index) : updated.delete(index);
        setSelectedEvents(updated);
    };

    const isAllSelected = paginatedEvents.length > 0 && paginatedEvents.every((_, i) => selectedEvents.has(i));
    const isIndeterminate = paginatedEvents.some((_, i) => selectedEvents.has(i)) && !isAllSelected;

    const handleDelete = () => {
        if (!eventToDelete) return;
        setEvents(prev => prev.filter(e => e.id !== eventToDelete.id));
        setSelectedEvents(new Set());
        setEventToDelete(null);
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="w-full min-h-screen text-[#111827]">
            <div className="px-4 sm:px-8 pt-4 pb-12">

                {isDeleteModalOpen && (
                    <CategoriesDeleteModal
                        onClose={() => { setIsDeleteModalOpen(false); setEventToDelete(null); }}
                        onConfirm={handleDelete}
                    />
                )}

                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-8">
                    <div>
                        <h1 className="text-[28px] font-semibold text-[#101828]">Event List</h1>
                    </div>
                    <div className="flex items-center gap-3 w-full lg:w-auto lg:flex-1 lg:max-w-xl lg:justify-end">
                        <div className="flex-1 lg:max-w-sm">
                            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search Event..." />
                        </div>
                        <div ref={exportRef} className="relative shrink-0">
                            <button
                                onClick={() => setIsExportOpen(!isExportOpen)}
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-[10px] text-sm font-semibold text-gray-700 hover:bg-gray-50"
                            >
                                <Download size={18} />
                                Export
                                <ChevronDown size={16} className={`transition-transform ${isExportOpen ? "rotate-180" : ""}`} />
                            </button>
                            {isExportOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-20">
                                    <button
                                        onClick={() => { console.table(filteredEvents); setIsExportOpen(false); }}
                                        className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50"
                                    >
                                        Export as PDF
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <StatsCard stats={eventStats} cols={4} />

                {/* Table */}
                <div className="bg-white border border-gray-200 rounded-[10px] overflow-hidden">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full min-w-[1100px] border-collapse">
                            <TableHeader
                                columns={[
                                    { label: "Event Image", width: "140px" },
                                    { label: "Event Name", width: "200px" },
                                    { label: "Price", width: "100px" },
                                    { label: "Organized By", width: "180px" },
                                    { label: "Category", width: "160px" },
                                    { label: "Total Event Join", width: "160px" },
                                    { label: "Action", width: "160px", className: "text-center" },
                                ]}
                                isAllSelected={isAllSelected}
                                isIndeterminate={isIndeterminate}
                                onSelectAll={handleSelectAll}
                            />
                            <tbody className="divide-y divide-gray-100">
                                {paginatedEvents.map((event, idx) => (
                                    <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="pl-8 px-4 py-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedEvents.has(idx)}
                                                onChange={e => handleSelectEvent(idx, e.target.checked)}
                                                className="rounded-md cursor-pointer border-gray-300 text-indigo-600 h-4.5 w-4.5"
                                            />
                                        </td>
                                        <td className="pl-18 px-4 py-5 whitespace-nowrap">
                                            <img src={event.image} alt={event.eventName} className="w-12 h-12 rounded-lg object-cover border border-gray-200" />
                                        </td>
                                        <td className="pl-24 px-4 py-5 whitespace-nowrap">
                                            <p className="text-[15px] font-medium text-[#111827]">{event.eventName}</p>
                                        </td>
                                        <td className="pl-14 px-4 py-5 whitespace-nowrap">
                                            <p className="text-[14px] text-gray-700">{event.price}</p>
                                        </td>
                                        <td className="pl-20 px-4 py-5 whitespace-nowrap">
                                            <p className="text-[14px] text-gray-600">{event.organizedBy}</p>
                                        </td>
                                        <td className="pl-20 px-4 py-5 whitespace-nowrap">
                                            <p className="text-[14px] text-gray-600">{event.category}</p>
                                        </td>
                                        <td className="pl-24 px-4 py-5 whitespace-nowrap">
                                            <p className="text-[14px] font-medium text-[#111827]">{event.totalJoined}</p>
                                        </td>
                                        <td className="px-4 py-5 text-center whitespace-nowrap">
                                            <Action
                                                showView={true}
                                                showEdit={true}
                                                showDelete={true}
                                                onView={() => navigate(`/event/view/${event.id}`)}
                                                onEdit={() => console.log("Edit Event", event)}
                                                onDelete={() => { setEventToDelete(event); setIsDeleteModalOpen(true); }}
                                            />
                                        </td>
                                    </tr>
                                ))}
                                {filteredEvents.length === 0 && (
                                    <tr>
                                        <td colSpan={8} className="py-10 text-center text-gray-400 italic">
                                            No events found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.max(1, Math.ceil(filteredEvents.length / rowsPerPage))}
                    rowsPerPage={rowsPerPage}
                    onPageChange={page => setCurrentPage(page)}
                    onRowsPerPageChange={rows => { setRowsPerPage(rows); setCurrentPage(1); }}
                    rowsPerPageOptions={[5, 10, 20, 50]}
                    showRowsPerPage={true}
                    showPageInfo={true}
                    className="mt-6"
                />
            </div>
        </div>
    );
}
