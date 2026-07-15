import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../Store/store";
import { ChevronDown, Download, Ticket, Users, CalendarDays, TrendingUp } from "lucide-react";
import StatsCard from "../../Components/StatsCard";
import Search from "../../Components/Search";
import TableHeader from "../../Components/TableHeader";
import Pagination from "../../Components/Pagination";
import CategoriesDeleteModal from "../../Components/CategoriesDeleteModal";
import Action from "../../Components/Action";
import { admin_ticket_list } from "../../Store/slices/TicketSlices/admin_ticket_list_thunk";
import { ticket_card } from "../../Store/slices/TicketSlices/ticket_card_thunk";
import { delete_ticket } from "../../Store/slices/TicketSlices/delete_ticket_thunk";
import type { TicketItem } from "../../Types/TicketTypes/admin_ticket_list_types";
export default function AllTickets() {
    const dispatch = useDispatch<AppDispatch>();

    const {
        tickets,
        pagination,
        loading,
    } = useSelector(
        (state: RootState) => state.admin_ticket_list
    );

    const {
        data: cardData,
    } = useSelector(
        (state: RootState) => state.ticket_card
    );

    const {
        loading: deleteLoading,
    } = useSelector(
        (state: RootState) => state.delete_ticket
    );
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTickets, setSelectedTickets] = useState<Set<number>>(new Set());
    const [isExportOpen, setIsExportOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [ticketToDelete, setTicketToDelete] =
        useState<TicketItem | null>(null);
    const exportRef = useRef<HTMLDivElement | null>(null);



    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (exportRef.current && !exportRef.current.contains(e.target as Node)) setIsExportOpen(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 1000);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch]);
    useEffect(() => {
        dispatch(
            admin_ticket_list({
                search: debouncedSearch,
                page_no: currentPage,
                per_page: rowsPerPage,
            })
        );
    }, [dispatch, debouncedSearch, currentPage, rowsPerPage]);
    useEffect(() => {
        dispatch(ticket_card());
    }, [dispatch]);

    const handleSelectAll = (checked: boolean) => {
        setSelectedTickets(
            checked
                ? new Set(tickets.map((_, i) => i))
                : new Set()
        );
    };

    const handleSelectTicket = (index: number, checked: boolean) => {
        const updated = new Set(selectedTickets);
        checked ? updated.add(index) : updated.delete(index);
        setSelectedTickets(updated);
    };
    const isAllSelected =
        tickets.length > 0 &&
        tickets.every((_, i) => selectedTickets.has(i));

    const isIndeterminate =
        tickets.some((_, i) => selectedTickets.has(i)) &&
        !isAllSelected;

    const handleDelete = async () => {
        if (!ticketToDelete) return;

        const result = await dispatch(
            delete_ticket({
                id: ticketToDelete.ticket_id,
            })
        );

        if (delete_ticket.fulfilled.match(result)) {

            setSelectedTickets(new Set());

            setTicketToDelete(null);

            setIsDeleteModalOpen(false);

            dispatch(
                admin_ticket_list({
                    search: debouncedSearch,
                    page_no: currentPage,
                    per_page: rowsPerPage,
                })
            );

            dispatch(ticket_card());
        }
    };
    const ticketStats = [
        {
            label: "Total Tickets",
            value: cardData?.total_tickets?.toString() ?? "0",
            sub: "All issued tickets",
            icon: <Ticket size={24} className="text-blue-600" />,
            bg: "bg-blue-50",
        },
        {
            label: "Total Users",
            value: cardData?.total_users?.toString() ?? "0",
            sub: "Users with tickets",
            icon: <Users size={24} className="text-green-600" />,
            bg: "bg-green-50",
        },
        {
            label: "Total Events",
            value: cardData?.total_events?.toString() ?? "0",
            sub: "Events with tickets",
            icon: <CalendarDays size={24} className="text-purple-600" />,
            bg: "bg-purple-50",
        },
        {
            label: "Total Revenue",
            value: `₹${cardData?.total_price ?? "0"}`,
            sub: "From ticket sales",
            icon: <TrendingUp size={24} className="text-orange-600" />,
            bg: "bg-orange-50",
        },
    ];
    return (
        <div className="w-full min-h-screen text-[#111827]">
            <div className="px-4 sm:px-8 pt-4 pb-12">

                {isDeleteModalOpen && (
                    <CategoriesDeleteModal
                        onClose={() => {
                            setIsDeleteModalOpen(false);
                            setTicketToDelete(null);
                        }}
                        onConfirm={handleDelete}
                        loading={deleteLoading}
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
                                        onClick={() => { console.table(tickets); setIsExportOpen(false); }}
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
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-7 animate-pulse">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-white border border-gray-200 rounded-xl p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-gray-200" />
                                    <div className="flex-1">
                                        <div className="h-4 w-28 rounded bg-gray-200" />
                                        <div className="h-8 w-20 rounded bg-gray-200 mt-3" />
                                        <div className="h-3 w-24 rounded bg-gray-100 mt-3" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <StatsCard stats={ticketStats} cols={4} />
                )}

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
                                {loading ? (
                                    [...Array(rowsPerPage)].map((_, i) => (
                                        <tr key={i} className="animate-pulse">
                                            <td className="px-4 py-5"><div className="h-4 w-4 rounded bg-gray-200" /></td>
                                            <td className="px-4 py-5"><div className="w-12 h-12 rounded-lg bg-gray-200" /></td>
                                            <td className="px-4 py-5"><div className="h-4 w-36 rounded bg-gray-200" /></td>
                                            <td className="px-4 py-5"><div className="h-4 w-28 rounded bg-gray-200" /></td>
                                            <td className="px-4 py-5"><div className="h-4 w-20 rounded bg-gray-200" /></td>
                                            <td className="px-4 py-5"><div className="h-4 w-28 rounded bg-gray-200" /></td>
                                            <td className="px-4 py-5"><div className="h-4 w-12 rounded bg-gray-200" /></td>
                                            <td className="px-4 py-5"><div className="flex justify-center"><div className="h-8 w-16 rounded bg-gray-200" /></div></td>
                                        </tr>
                                    ))
                                ) : (
                                    <>
                                        {tickets.map((ticket, idx) => (
                                    <tr key={ticket.ticket_id} className="hover:bg-gray-50 transition-colors">
                                        <td className="pl-10 px-4 py-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedTickets.has(idx)}
                                                onChange={e => handleSelectTicket(idx, e.target.checked)}
                                                className="rounded-md cursor-pointer border-gray-300 text-indigo-600 h-4.5 w-4.5"
                                            />
                                        </td>
                                        <td className="pl-18 px-4 py-5 whitespace-nowrap">
                                            <img src={ticket.event_image} alt={ticket.event_name} className="w-12 h-12 rounded-lg object-cover border border-gray-200" />
                                        </td>
                                        <td className="pl-24 px-4 py-5 whitespace-nowrap">
                                            <p className="text-[15px] font-medium text-[#111827]">{ticket.event_name}</p>
                                        </td>
                                        <td className="pl-24 px-4 py-5 whitespace-nowrap">
                                            <p className="text-[14px] text-gray-700">{ticket.username}</p>
                                        </td>
                                        <td className="pl-16 px-4 py-5 whitespace-nowrap">
                                            <p className="text-[14px] font-medium text-[#111827]">₹{ticket.price}</p>
                                        </td>
                                        <td className="pl-16 px-4 py-5 whitespace-nowrap">
                                            <p className="text-[14px] text-gray-600 font-mono">{ticket.ticket_number}</p>
                                        </td>
                                        <td className="pl-20 px-4 py-5 whitespace-nowrap">
                                            <p className="text-[14px] font-medium text-[#111827]">{ticket.number_of_ticket}</p>
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
                                        {!loading && tickets.length === 0 && (
                                            <tr>
                                                <td colSpan={8} className="py-10 text-center text-gray-400 italic">
                                                    No tickets found.
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={pagination?.last_page ?? 1}
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
