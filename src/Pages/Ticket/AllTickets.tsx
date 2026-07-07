import { useState, useRef, useEffect } from "react";
import { ChevronDown, Download, Ticket, Users, CalendarDays, TrendingUp } from "lucide-react";
import StatsCard from "../../Components/StatsCard";
import Search from "../../Components/Search";
import TableHeader from "../../Components/TableHeader";
import Pagination from "../../Components/Pagination";
import CategoriesDeleteModal from "../../Components/CategoriesDeleteModal";
import Action from "../../Components/Action";

interface TicketItem {
    id: number;
    eventImage: string;
    eventName: string;
    userName: string;
    price: number;
    ticketNum: string;
    noOfTickets: number;
}

const initialTickets: TicketItem[] = [
    { id: 1, eventImage: "https://picsum.photos/80?201", eventName: "Musical Fest (Demo)", userName: "John Doe", price: 49, ticketNum: "TKT-001", noOfTickets: 2 },
    { id: 2, eventImage: "https://picsum.photos/80?202", eventName: "Love Coaching (Demo)", userName: "Emma Watson", price: 125, ticketNum: "TKT-002", noOfTickets: 1 },
    { id: 3, eventImage: "https://picsum.photos/80?203", eventName: "Desi Night Out", userName: "Rahul Sharma", price: 75, ticketNum: "TKT-003", noOfTickets: 3 },
    { id: 4, eventImage: "https://picsum.photos/80?204", eventName: "Bollywood Bash", userName: "Sophia Brown", price: 60, ticketNum: "TKT-004", noOfTickets: 2 },
    { id: 5, eventImage: "https://picsum.photos/80?205", eventName: "Speed Dating", userName: "David Miller", price: 30, ticketNum: "TKT-005", noOfTickets: 1 },
    { id: 6, eventImage: "https://picsum.photos/80?201", eventName: "Musical Fest (Demo)", userName: "Priya Patel", price: 49, ticketNum: "TKT-006", noOfTickets: 4 },
    { id: 7, eventImage: "https://picsum.photos/80?203", eventName: "Desi Night Out", userName: "Arjun Singh", price: 75, ticketNum: "TKT-007", noOfTickets: 2 },
];

const ticketStats = [
    { label: "Total Tickets", value: "7", sub: "All issued tickets", icon: <Ticket size={24} className="text-blue-600" />, bg: "bg-blue-50" },
    { label: "Total Users", value: "7", sub: "Users with tickets", icon: <Users size={24} className="text-green-600" />, bg: "bg-green-50" },
    { label: "Total Events", value: "5", sub: "Events with tickets", icon: <CalendarDays size={24} className="text-purple-600" />, bg: "bg-purple-50" },
    { label: "Total Revenue", value: "₹898", sub: "From ticket sales", icon: <TrendingUp size={24} className="text-orange-600" />, bg: "bg-orange-50" },
];

export default function AllTickets() {
    const [tickets, setTickets] = useState<TicketItem[]>(initialTickets);
    const [searchTerm, setSearchTerm] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTickets, setSelectedTickets] = useState<Set<number>>(new Set());
    const [isExportOpen, setIsExportOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [ticketToDelete, setTicketToDelete] = useState<TicketItem | null>(null);
    const exportRef = useRef<HTMLDivElement | null>(null);

    const filteredTickets = tickets.filter(t =>
        t.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.ticketNum.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedTickets = filteredTickets.slice(startIndex, startIndex + rowsPerPage);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (exportRef.current && !exportRef.current.contains(e.target as Node)) setIsExportOpen(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => { setCurrentPage(1); }, [searchTerm]);

    const handleSelectAll = (checked: boolean) => {
        setSelectedTickets(checked ? new Set(paginatedTickets.map((_, i) => i)) : new Set());
    };

    const handleSelectTicket = (index: number, checked: boolean) => {
        const updated = new Set(selectedTickets);
        checked ? updated.add(index) : updated.delete(index);
        setSelectedTickets(updated);
    };

    const isAllSelected = paginatedTickets.length > 0 && paginatedTickets.every((_, i) => selectedTickets.has(i));
    const isIndeterminate = paginatedTickets.some((_, i) => selectedTickets.has(i)) && !isAllSelected;

    const handleDelete = () => {
        if (!ticketToDelete) return;
        setTickets(prev => prev.filter(t => t.id !== ticketToDelete.id));
        setSelectedTickets(new Set());
        setTicketToDelete(null);
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="w-full min-h-screen text-[#111827]">
            <div className="px-4 sm:px-8 pt-4 pb-12">

                {isDeleteModalOpen && (
                    <CategoriesDeleteModal
                        onClose={() => { setIsDeleteModalOpen(false); setTicketToDelete(null); }}
                        onConfirm={handleDelete}
                    />
                )}

                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-8">
                    <div>
                        <h1 className="text-[28px] font-semibold text-[#101828]">Ticket List</h1>
                    </div>
                    <div className="flex items-center gap-3 w-full lg:w-auto lg:flex-1 lg:max-w-xl lg:justify-end">
                        <div className="flex-1 lg:max-w-sm">
                            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search Ticket..." />
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
                                        onClick={() => { console.table(filteredTickets); setIsExportOpen(false); }}
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
                <StatsCard stats={ticketStats} cols={4} />

                {/* Table */}
                <div className="bg-white border border-gray-200 rounded-[10px] overflow-hidden">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full min-w-[1000px] border-collapse">
                            <TableHeader
                                columns={[
                                    { label: "Event Image", width: "140px" },
                                    { label: "Event Name", width: "200px" },
                                    { label: "User Name", width: "180px" },
                                    { label: "Price", width: "110px" },
                                    { label: "Ticket Num", width: "150px" },
                                    { label: "No. of Tickets", width: "140px" },
                                    { label: "Action", width: "100px", className: "text-center" },
                                ]}
                                isAllSelected={isAllSelected}
                                isIndeterminate={isIndeterminate}
                                onSelectAll={handleSelectAll}
                            />
                            <tbody className="divide-y divide-gray-100">
                                {paginatedTickets.map((ticket, idx) => (
                                    <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="pl-10 px-4 py-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedTickets.has(idx)}
                                                onChange={e => handleSelectTicket(idx, e.target.checked)}
                                                className="rounded-md cursor-pointer border-gray-300 text-indigo-600 h-4.5 w-4.5"
                                            />
                                        </td>
                                        <td className="pl-18 px-4 py-5 whitespace-nowrap">
                                            <img src={ticket.eventImage} alt={ticket.eventName} className="w-12 h-12 rounded-lg object-cover border border-gray-200" />
                                        </td>
                                        <td className="pl-24 px-4 py-5 whitespace-nowrap">
                                            <p className="text-[15px] font-medium text-[#111827]">{ticket.eventName}</p>
                                        </td>
                                        <td className="pl-24 px-4 py-5 whitespace-nowrap">
                                            <p className="text-[14px] text-gray-700">{ticket.userName}</p>
                                        </td>
                                        <td className="pl-16 px-4 py-5 whitespace-nowrap">
                                            <p className="text-[14px] font-medium text-[#111827]">₹{ticket.price}</p>
                                        </td>
                                        <td className="pl-16 px-4 py-5 whitespace-nowrap">
                                            <p className="text-[14px] text-gray-600 font-mono">{ticket.ticketNum}</p>
                                        </td>
                                        <td className="pl-20 px-4 py-5 whitespace-nowrap">
                                            <p className="text-[14px] font-medium text-[#111827]">{ticket.noOfTickets}</p>
                                        </td>
                                        <td className="px-4 py-5 text-center whitespace-nowrap">
                                            <Action
                                                showView={false}
                                                showEdit={false}
                                                showDelete={true}
                                                onDelete={() => { setTicketToDelete(ticket); setIsDeleteModalOpen(true); }}
                                            />
                                        </td>
                                    </tr>
                                ))}
                                {filteredTickets.length === 0 && (
                                    <tr>
                                        <td colSpan={8} className="py-10 text-center text-gray-400 italic">
                                            No tickets found.
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
                    totalPages={Math.max(1, Math.ceil(filteredTickets.length / rowsPerPage))}
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
