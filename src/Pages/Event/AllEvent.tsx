import { useState, useRef, useEffect } from "react";
import { ChevronDown, Download, CalendarDays, Users, Tag, TrendingUp } from "lucide-react";
import StatsCard from "../../Components/StatsCard";
import Search from "../../Components/Search";
import TableHeader from "../../Components/TableHeader";
import Pagination from "../../Components/Pagination";
import CategoriesDeleteModal from "../../Components/CategoriesDeleteModal";
import Action from "../../Components/Action";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../Store/store";

import { event_list } from "../../Store/slices/EventSlices/event_list_thunk";
import { event_card } from "../../Store/slices/EventSlices/event_card_thunk";
import { delete_event } from "../../Store/slices/EventSlices/delete_event_thunk";
import { resetDeleteEvent } from "../../Store/slices/EventSlices/delete_event_slice";

import type { EventItem } from "../../Types/EventTypes/event_list_types";

export default function AllEvent() {
    const dispatch = useDispatch<AppDispatch>();

    const {
        events,
        pagination,
        loading,
    } = useSelector((state: RootState) => state.event_list);

    const {
        data: cardData,
    } = useSelector((state: RootState) => state.event_card);

    const { loading: deleteLoading } = useSelector((state: RootState) => state.delete_event);
    const [searchTerm, setSearchTerm] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedEvents, setSelectedEvents] = useState<Set<number>>(new Set());
    const [isExportOpen, setIsExportOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [eventToDelete, setEventToDelete] = useState<EventItem | null>(null);
    const exportRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();

    const paginatedEvents = events;

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (exportRef.current && !exportRef.current.contains(e.target as Node)) setIsExportOpen(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    useEffect(() => {
        dispatch(
            event_list({
                search: searchTerm,
                page_no: currentPage,
                per_page: rowsPerPage,
            })
        );

        dispatch(event_card());
    }, [dispatch, searchTerm, currentPage, rowsPerPage]);
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

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

    const handleDelete = async () => {
        if (!eventToDelete) return;
        await dispatch(delete_event({ id: eventToDelete.id }));
        dispatch(resetDeleteEvent());
        dispatch(event_list({ search: searchTerm, page_no: currentPage, per_page: rowsPerPage }));
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
                        loading={deleteLoading}
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
                                        onClick={() => { console.table(events); setIsExportOpen(false); }}
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
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="bg-white border border-gray-200 rounded-xl p-6">
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
                    <StatsCard
                        cols={4}
                        stats={[
                            {
                                label: "Total Events",
                                value: cardData?.total_events || "0",
                                sub: "All listed events",
                                icon: <CalendarDays size={24} className="text-blue-600" />,
                                bg: "bg-blue-50",
                            },
                            {
                                label: "Total Joined",
                                value: cardData?.total_joined || "0",
                                sub: "Across all events",
                                icon: <Users size={24} className="text-green-600" />,
                                bg: "bg-green-50",
                            },
                            {
                                label: "Categories",
                                value: cardData?.total_category || "0",
                                sub: "Unique event categories",
                                icon: <Tag size={24} className="text-purple-600" />,
                                bg: "bg-purple-50",
                            },
                            {
                                label: "Most Popular",
                                value: cardData?.most_popular || "-",
                                sub: "",
                                icon: <TrendingUp size={24} className="text-orange-600" />,
                                bg: "bg-orange-50",
                            },
                        ]}
                    />
                )}

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
                                    { label: "Date", width: "140px" },
                                    { label: "Time", width: "120px" },
                                    { label: "Total Event Join", width: "160px" },
                                    { label: "Action", width: "160px", className: "text-center" },
                                ]}
                                isAllSelected={isAllSelected}
                                isIndeterminate={isIndeterminate}
                                onSelectAll={handleSelectAll}
                            />
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    [...Array(rowsPerPage)].map((_, index) => (
                                        <tr key={index} className="animate-pulse">
                                            <td className="px-4 py-5"><div className="h-4 w-4 rounded bg-gray-200" /></td>
                                            <td className="px-4 py-5"><div className="w-12 h-12 rounded-lg bg-gray-200" /></td>
                                            <td className="px-4 py-5"><div className="h-4 w-36 rounded bg-gray-200" /></td>
                                            <td className="px-4 py-5"><div className="h-4 w-20 rounded bg-gray-200" /></td>
                                            <td className="px-4 py-5"><div className="h-4 w-32 rounded bg-gray-200" /></td>
                                            <td className="px-4 py-5"><div className="h-4 w-24 rounded bg-gray-200" /></td>
                                            <td className="px-4 py-5"><div className="h-4 w-12 rounded bg-gray-200" /></td>
                                            <td className="px-4 py-5"><div className="flex justify-center"><div className="h-8 w-16 rounded bg-gray-200" /></div></td>
                                        </tr>
                                    ))
                                ) : (
                                    <>
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
                                        <td className="pl-10 px-4 py-5 whitespace-nowrap">
                                            <img src={event.image} alt={event.name} className="w-12 h-12 rounded-lg object-cover border border-gray-200" />
                                        </td>
                                        <td className="pl-18 px-4 py-5 whitespace-nowrap">
                                            <p className="text-[15px] font-medium text-[#111827]">{event.name || "N/A"}</p>
                                        </td>
                                        <td className="pl-12 px-4 py-5 whitespace-nowrap">
                                            <p className="text-[14px] text-gray-700">{event.price || "N/A"}</p>
                                        </td>
                                        <td className="pl-16 px-4 py-5 whitespace-nowrap">
                                            <p className="text-[14px] text-gray-600">{event.organized_by || "N/A"}</p>
                                        </td>
                                        <td className="pl-14 px-4 py-5 whitespace-nowrap">
                                            <p className="text-[14px] text-gray-600">{event.cat_id || "N/A"}</p>
                                          
                                        </td>
                                        <td className="pl-10 px-4 py-5 whitespace-nowrap">
                                            <p className="text-[14px] text-gray-600">{event.date || "N/A"}</p>
                                        </td>
                                        <td className="pl-14 px-4 py-5 whitespace-nowrap">
                                            <p className="text-[14px] text-gray-600">{event.time || "N/A"}</p>
                                        </td>
                                        <td className="pl-18 px-4 py-5 whitespace-nowrap">
                                            <p className="text-[14px] font-medium text-[#111827]">{event.count}</p>
                                        </td>
                                        <td className="px-4 py-5 text-center whitespace-nowrap">
                                            <Action
                                                showView={true}
                                                showEdit={true}
                                                showDelete={true}
                                                onView={() => navigate(`/event/view/${event.id}`)}
                                                onEdit={() =>
                                                    navigate(`/event/edit/${event.id}`)
                                                }
                                                onDelete={() => { setEventToDelete(event); setIsDeleteModalOpen(true); }}
                                            />
                                        </td>
                                    </tr>
                                    ))}
                                    {!loading && events.length === 0 && (
                                        <tr>
                                            <td colSpan={10} className="py-10 text-center text-gray-400 italic">
                                                No events found.
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
                    totalPages={pagination?.total_pages || 1}
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
