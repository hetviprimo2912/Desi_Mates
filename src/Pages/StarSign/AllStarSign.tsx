import { useState, useRef, useEffect } from "react";
import {
    ChevronDown,
    Download,
    Users,
    Star,
    ArrowDownCircle,
    Sparkles,
} from "lucide-react";
import StatsCard from "../../Components/StatsCard";
import Search from "../../Components/Search";
import TableHeader from "../../Components/TableHeader";
import Pagination from "../../Components/Pagination";
import CategoriesDeleteModal from "../../Components/CategoriesDeleteModal";
import Action from "../../Components/Action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { starsign_list } from "../../Store/slices/StarSlices/starsign_list_thunk";
import { delete_starsign } from "../../Store/slices/StarSlices/delete_starsign_thunk";
import { starsign_card } from "../../Store/slices/StarSlices/starsign_card_thunk";

import type { StarSignItem } from "../../Types/StarTypes/starsign_list_types";
import type { RootState, AppDispatch } from "../../Store/store";

const SYMBOLS: Record<string, string> = {
    Aries: "♈", Taurus: "♉", Gemini: "♊", Cancer: "♋",
    Leo: "♌", Virgo: "♍", Libra: "♎", Scorpio: "♏",
    Sagittarius: "♐", Capricorn: "♑", Aquarius: "♒", Pisces: "♓",
};

export default function AllStarSign() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { starsign, pagination, loading } = useSelector((state: RootState) => state.starsign_list);
    const { data: cardData } = useSelector((state: RootState) => state.starsign_card);
    const { loading: deleteLoading } = useSelector((state: RootState) => state.delete_starsign);

    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
    const [isExportOpen, setIsExportOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<StarSignItem | null>(null);
    const [expandedDescriptions, setExpandedDescriptions] = useState<Set<string>>(new Set());

    const exportRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            setCurrentPage(1);
        }, 1000);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        dispatch(starsign_list({ page_no: currentPage, per_page: rowsPerPage, search: debouncedSearch }));
        dispatch(starsign_card());
    }, [dispatch, currentPage, rowsPerPage, debouncedSearch]);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (exportRef.current && !exportRef.current.contains(e.target as Node)) {
                setIsExportOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelectAll = (checked: boolean) => {
        setSelectedItems(checked ? new Set(starsign.map((_, i) => i)) : new Set());
    };

    const handleSelectItem = (index: number, checked: boolean) => {
        const updated = new Set(selectedItems);
        checked ? updated.add(index) : updated.delete(index);
        setSelectedItems(updated);
    };

    const isAllSelected = starsign.length > 0 && starsign.every((_, i) => selectedItems.has(i));
    const isIndeterminate = starsign.some((_, i) => selectedItems.has(i)) && !isAllSelected;

    const toggleDescription = (id: string) => {
        setExpandedDescriptions((prev) => {
            const updated = new Set(prev);
            updated.has(id) ? updated.delete(id) : updated.add(id);
            return updated;
        });
    };

    const handleDelete = async () => {
        if (!itemToDelete || deleteLoading) return;
        try {
            await dispatch(delete_starsign({ id: itemToDelete.id })).unwrap();
            await Promise.all([
                dispatch(starsign_list({ page_no: currentPage, per_page: rowsPerPage, search: debouncedSearch })),
                dispatch(starsign_card()),
            ]);
            setSelectedItems(new Set());
            setItemToDelete(null);
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.log(error);
        }
    };

    const starSignStats = [
        {
            label: "Total Star Signs",
            value: cardData?.total_star_signs ?? "—",
            sub: "Available zodiac signs",
            icon: <Sparkles size={24} className="text-violet-600" />,
            bg: "bg-violet-50",
        },
        {
            label: "Profiles With Star Sign",
            value: cardData?.profiles_with_star_sign ?? "—",
            sub: "Users who selected a star sign",
            icon: <Users size={24} className="text-blue-600" />,
            bg: "bg-blue-50",
        },
        {
            label: "Most Popular Sign",
            value: cardData?.most_popular_sign ?? "—",
            sub: "Most chosen sign",
            icon: <Star size={24} className="text-yellow-600" />,
            bg: "bg-yellow-50",
        },
        {
            label: "Least Popular Sign",
            value: cardData?.least_popular_sign ?? "—",
            sub: "Least chosen sign",
            icon: <ArrowDownCircle size={24} className="text-red-600" />,
            bg: "bg-red-50",
        },
    ];

    return (
        <div className="w-full min-h-screen text-[#111827]">
            <div className="px-4 sm:px-8 pt-4 pb-12">

                {isDeleteModalOpen && (
                    <CategoriesDeleteModal
                        onClose={() => {
                            if (deleteLoading) return;
                            setIsDeleteModalOpen(false);
                            setItemToDelete(null);
                        }}
                        onConfirm={() => {
                            if (!deleteLoading) handleDelete();
                        }}
                        loading={deleteLoading}
                    />
                )}

                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-8">
                    <h1 className="text-[28px] font-semibold text-[#101828]">Star Sign List</h1>

                    <div className="flex items-center gap-3 w-full lg:w-auto lg:flex-1 lg:max-w-xl lg:justify-end">
                        <div className="flex-1 lg:max-w-sm">
                            <Search
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                placeholder="Search Star Sign..."
                            />
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
                                        onClick={() => { console.table(starsign); setIsExportOpen(false); }}
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
                    <StatsCard stats={starSignStats} />
                )}

                {/* Table */}
                <div className="bg-white border border-gray-200 rounded-[10px] overflow-hidden">
                    <div className="w-full overflow-x-auto">
                        <table className="min-w-[1000px] w-full border-collapse">
                            <TableHeader
                                columns={[
                                    { label: "Star Sign", width: "180px" },
                                    { label: "Sign Name", width: "260px" },
                                    { label: "Sign Description", width: "520px" },
                                    { label: "Action", width: "180px", className: "text-center" },
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
                                            <td className="px-4 py-5"><div className="w-12 h-12 rounded-full bg-gray-200" /></td>
                                            <td className="px-4 py-5"><div className="h-4 w-32 rounded bg-gray-200" /></td>
                                            <td className="px-4 py-5"><div className="h-4 w-56 rounded bg-gray-200" /></td>
                                            <td className="px-4 py-5"><div className="flex justify-center"><div className="h-8 w-16 rounded bg-gray-200" /></div></td>
                                        </tr>
                                    ))
                                ) : starsign.length > 0 ? (
                                    starsign.map((item, idx) => (
                                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">

                                            {/* Checkbox */}
                                            <td className="pl-8 px-4 py-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedItems.has(idx)}
                                                    onChange={(e) => handleSelectItem(idx, e.target.checked)}
                                                    className="rounded-md cursor-pointer border-gray-300 text-indigo-600 h-4.5 w-4.5"
                                                />
                                            </td>

                                            {/* Symbol */}
                                            <td className="pl-22 px-6 py-5 whitespace-nowrap">
                                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50 text-3xl">
                                                    {SYMBOLS[item.name] ?? "✦"}
                                                </div>
                                            </td>

                                            {/* Name */}
                                            <td className="pl-36 px-6 py-5 whitespace-nowrap">
                                                <p className="text-[15px] font-medium text-[#111827]">
                                                    {item.name?.trim() || "N/A"}
                                                </p>
                                            </td>

                                            {/* Description */}
                                            <td className="pl-70 px-6 py-5">
                                                {item.description ? (
                                                    <div className="max-w-[460px]">
                                                        <p className="text-[14px] text-gray-600 whitespace-pre-wrap break-words">
                                                            {expandedDescriptions.has(item.id)
                                                                ? item.description
                                                                : item.description.length > 120
                                                                    ? `${item.description.slice(0, 120)}...`
                                                                    : item.description}
                                                        </p>
                                                        {item.description.length > 120 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => toggleDescription(item.id)}
                                                                className="mt-1 text-xs font-semibold text-blue-600 hover:underline"
                                                            >
                                                                {expandedDescriptions.has(item.id) ? "Show Less" : "Show More"}
                                                            </button>
                                                        )}
                                                    </div>
                                                ) : (
                                                    "N/A"
                                                )}
                                            </td>

                                            {/* Action */}
                                            <td className="px-4 py-5 text-center whitespace-nowrap">
                                                <Action
                                                    showView={false}
                                                    showEdit={true}
                                                    showDelete={true}
                                                    onEdit={() => navigate(`/starsign/edit/${item.id}`)}
                                                    onDelete={() => {
                                                        setItemToDelete(item);
                                                        setIsDeleteModalOpen(true);
                                                    }}
                                                />
                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="py-10 text-center text-gray-400 italic">
                                            No star signs found.
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
                    totalPages={pagination?.total_pages ?? 1}
                    rowsPerPage={rowsPerPage}
                    onPageChange={(page) => setCurrentPage(page)}
                    onRowsPerPageChange={(rows) => { setRowsPerPage(rows); setCurrentPage(1); }}
                    rowsPerPageOptions={[5, 10, 20, 50]}
                    showRowsPerPage={true}
                    showPageInfo={true}
                    className="mt-6"
                />
            </div>
        </div>
    );
}
