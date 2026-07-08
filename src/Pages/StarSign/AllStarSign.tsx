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
import { starsign_list } from "../../Store/slices/StarSlices/starsign_list_thunk";
import type { StarSignItem } from "../../Types/StarTypes/starsign_list_types";
import type { RootState, AppDispatch } from "../../Store/store";

const SYMBOLS: Record<string, string> = {
    Aries: "♈", Taurus: "♉", Gemini: "♊", Cancer: "♋",
    Leo: "♌", Virgo: "♍", Libra: "♎", Scorpio: "♏",
    Sagittarius: "♐", Capricorn: "♑", Aquarius: "♒", Pisces: "♓",
};

const starSignStats = [
    {
        label: "Total Star Signs",
        value: "12",
        sub: "Available zodiac signs",
        icon: <Sparkles size={24} className="text-violet-600" />,
        bg: "bg-violet-50",
    },
    {
        label: "Profiles With Star Sign",
        value: "18,240",
        sub: "Users who selected a star sign",
        icon: <Users size={24} className="text-blue-600" />,
        bg: "bg-blue-50",
    },
    {
        label: "Most Popular Sign",
        value: "Leo",
        sub: "Chosen by 2,846 profiles",
        icon: <Star size={24} className="text-yellow-600" />,
        bg: "bg-yellow-50",
    },
    {
        label: "Least Popular Sign",
        value: "Capricorn",
        sub: "Chosen by 632 profiles",
        icon: <ArrowDownCircle size={24} className="text-red-600" />,
        bg: "bg-red-50",
    },
];

export default function AllStarSign() {
    const dispatch = useDispatch<AppDispatch>();
    const {
        starsign,
        pagination,
        loading,
    } = useSelector(
        (state: RootState) => state.starsign_list
    );

    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
    const [isExportOpen, setIsExportOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<StarSignItem | null>(null);

    const exportRef = useRef<HTMLDivElement | null>(null);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            setCurrentPage(1);
        }, 1000);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Fetch from API
    useEffect(() => {
        dispatch(starsign_list({ page_no: currentPage, per_page: rowsPerPage, search: debouncedSearch }));
    }, [dispatch, currentPage, rowsPerPage, debouncedSearch]);

    // Close export dropdown on outside click
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

    const handleDelete = () => {
        setSelectedItems(new Set());
        setItemToDelete(null);
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="w-full min-h-screen text-[#111827]">
            <div className="px-4 sm:px-8 pt-4 pb-12">

                {isDeleteModalOpen && (
                    <CategoriesDeleteModal
                        onClose={() => { setIsDeleteModalOpen(false); setItemToDelete(null); }}
                        onConfirm={handleDelete}
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
                {/* Stats */}

                {loading ? (

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-7 animate-pulse">

                        {[...Array(4)].map((_, index) => (

                            <div
                                key={index}
                                className="bg-white border border-gray-200 rounded-xl p-6"
                            >

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
                        stats={starSignStats}
                    />

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

                                        <tr
                                            key={index}
                                            className="animate-pulse"
                                        >

                                            {/* Checkbox */}

                                            <td className="px-4 py-5">

                                                <div className="h-4 w-4 rounded bg-gray-200" />

                                            </td>

                                            {/* Symbol */}

                                            <td className="px-4 py-5">

                                                <div className="w-12 h-12 rounded-full bg-gray-200" />

                                            </td>

                                            {/* Name */}

                                            <td className="px-4 py-5">

                                                <div className="h-4 w-32 rounded bg-gray-200" />

                                            </td>

                                            {/* Description */}

                                            <td className="px-4 py-5">

                                                <div className="h-4 w-56 rounded bg-gray-200" />

                                            </td>

                                            {/* Action */}

                                            <td className="px-4 py-5">

                                                <div className="flex justify-center">

                                                    <div className="h-8 w-16 rounded bg-gray-200" />

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                ) : starsign.length > 0 ? (

                                    starsign.map((item, idx) => (

                                        <tr
                                            key={item.id}
                                            className="hover:bg-gray-50 transition-colors"
                                        >

                                            {/* Checkbox */}

                                            <td className="pl-8 px-4 py-4">

                                                <input
                                                    type="checkbox"
                                                    checked={selectedItems.has(idx)}
                                                    onChange={(e) =>
                                                        handleSelectItem(
                                                            idx,
                                                            e.target.checked
                                                        )
                                                    }
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

                                                <p className="text-[14px] text-gray-600 break-words">

                                                    {item.description?.trim() || "N/A"}

                                                </p>

                                            </td>

                                            {/* Action */}

                                            <td className="px-4 py-5 text-center whitespace-nowrap">

                                                <Action
                                                    showView={false}
                                                    showEdit={true}
                                                    showDelete={true}
                                                    onEdit={() => console.log("Edit", item)}
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

                                        <td
                                            colSpan={5}
                                            className="py-10 text-center text-gray-400 italic"
                                        >

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
