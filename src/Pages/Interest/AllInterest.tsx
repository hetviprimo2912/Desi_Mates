import { useState, useRef, useEffect } from "react";
import {
    ChevronDown,
    Download,
    Users,
    Heart,
    Star,
    TrendingUp,
} from "lucide-react";
import StatsCard from "../../Components/StatsCard";
import Search from "../../Components/Search";
import TableHeader from "../../Components/TableHeader";
import Pagination from "../../Components/Pagination";
import CategoriesDeleteModal from "../../Components/CategoriesDeleteModal";
import Action from "../../Components/Action";
import { useDispatch, useSelector } from "react-redux";

import { interest_list } from "../../Store/slices/InterestSlice/interest_list_thunk";

import type {
    InterestItem,
} from "../../Types/InterestTypes/interest_list_types";

import type {
    RootState,
    AppDispatch,
} from "../../Store/store";

const interestStats = [
    {
        label: "Total Interests",
        value: "145",
        sub: "Total interests available",
        icon: <Heart size={24} className="text-red-600" />,
        bg: "bg-red-50",
    },
    {
        label: "Users with Interests",
        value: "4,582",
        sub: "Users selected at least one interest",
        icon: <Users size={24} className="text-blue-600" />,
        bg: "bg-blue-50",
    },
    {
        label: "Most Popular Interest",
        value: "Photography",
        sub: "Selected by 1,286 users",
        icon: <Star size={24} className="text-yellow-600" />,
        bg: "bg-yellow-50",
    },
    {
        label: "New This Month",
        value: "12",
        sub: "Added this month",
        icon: <TrendingUp size={24} className="text-green-600" />,
        bg: "bg-green-50",
    },
];
export default function AllInterest() {

    const dispatch = useDispatch<AppDispatch>();
    const {
        interest,
        pagination,
        loading,
    } = useSelector(
        (state: RootState) => state.interest_list
    );

    const [searchTerm, setSearchTerm] =
        useState("");

    const [debouncedSearch, setDebouncedSearch] =
        useState("");

    const [rowsPerPage, setRowsPerPage] =
        useState(10);

    const [currentPage, setCurrentPage] =
        useState(1);

    const [selectedInterests, setSelectedInterests] =
        useState<Set<number>>(new Set());

    const [isExportOpen, setIsExportOpen] =
        useState(false);

    const [isDeleteModalOpen, setIsDeleteModalOpen] =
        useState(false);

    const [categoryToDelete, setCategoryToDelete] =
        useState<InterestItem | null>(null);

    const exportRef =
        useRef<HTMLDivElement | null>(null);


    useEffect(() => {

        function handleClickOutside(
            event: MouseEvent
        ) {

            if (
                exportRef.current &&
                !exportRef.current.contains(
                    event.target as Node
                )
            ) {
                setIsExportOpen(false);
            }

        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

    }, []);
    useEffect(() => {

        const timer = setTimeout(() => {

            setDebouncedSearch(searchTerm);

            setCurrentPage(1);

        }, 1000);

        return () => clearTimeout(timer);

    }, [searchTerm]);
    useEffect(() => {

        dispatch(
            interest_list({

                page_no: currentPage,

                per_page: rowsPerPage,

                search: debouncedSearch,

            })
        );

    }, [
        dispatch,
        currentPage,
        rowsPerPage,
        debouncedSearch,
    ]);
    const handleSelectAll = (
        checked: boolean
    ) => {

        if (checked) {

            setSelectedInterests(
                new Set(
                    interest.map((_, index) => index)
                )
            );

        } else {

            setSelectedInterests(
                new Set()
            );

        }

    };

    const handleSelectUser = (
        index: number,
        checked: boolean
    ) => {

        const updated =
            new Set(selectedInterests);

        if (checked) {

            updated.add(index);

        } else {

            updated.delete(index);

        }

        setSelectedInterests(updated);

    };

    const isAllSelected =
        interest.length > 0 &&
        interest.every((_, index) =>
            selectedInterests.has(index)
        );

    const isIndeterminate =
        interest.some((_, index) =>
            selectedInterests.has(index)
        ) && !isAllSelected;

    const handleDelete = () => {

        if (!categoryToDelete) return;

        setSelectedInterests(new Set());

        setCategoryToDelete(null);

        setIsDeleteModalOpen(false);

    };
    return (

        <div className="w-full min-h-screen text-[#111827]">

            <div className="px-4 sm:px-8 lg:px-8 xl:px-8 pt-4 pb-12">

                {isDeleteModalOpen && (
                    <CategoriesDeleteModal
                        onClose={() => {

                            setIsDeleteModalOpen(false);

                            setCategoryToDelete(null);

                        }}
                        onConfirm={handleDelete}
                    />
                )}

                {/* Header */}

                <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-8">

                    <div className="overflow-x-auto scrollbar-thin">
                        <h1 className="text-[28px] font-semibold text-[#101828]">

                            Interest List

                        </h1>

                    </div>

                    <div className="flex items-center gap-3 w-full lg:w-auto lg:flex-1 lg:max-w-xl lg:justify-end">

                        <div className="flex-1 lg:max-w-sm">

                            <Search
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                placeholder="Search Interest..."
                            />

                        </div>

                        <div
                            ref={exportRef}
                            className="relative shrink-0"
                        >

                            <button
                                onClick={() =>
                                    setIsExportOpen(
                                        !isExportOpen
                                    )
                                }
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-[10px] text-sm font-semibold text-gray-700 hover:bg-gray-50"
                            >

                                <Download
                                    size={18}
                                />

                                Export

                                <ChevronDown
                                    size={16}
                                    className={`transition-transform ${isExportOpen
                                        ? "rotate-180"
                                        : ""
                                        }`}
                                />

                            </button>

                            {isExportOpen && (

                                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-20">

                                    <button
                                        onClick={() => {

                                            console.table(interest);

                                            setIsExportOpen(false);

                                        }}
                                        className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50"
                                    >

                                        Export as PDF

                                    </button>

                                </div>

                            )}

                        </div>

                    </div>

                </div>
                {/* Stats Cards */}
                {/* Stats Cards */}

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
                        stats={interestStats}
                    />

                )}
                <div className="bg-white border border-gray-200 rounded-[10px] overflow-hidden">
                    <div className="w-full overflow-x-auto">

                        <table className="min-w-[1300px] w-full border-collapse">

                            <TableHeader
                                columns={[
                                    {
                                        label: "Interest Image",
                                        width: "180px",
                                    },
                                    {
                                        label: "Interest Name",
                                        width: "260px",
                                    },
                                    {
                                        label: "Description",
                                        width: "520px",
                                    },

                                    {
                                        label: "Action",
                                        width: "180px",
                                        className: "text-center",
                                    },
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

                                            {/* Image */}

                                            <td className="px-4 py-5">

                                                <div className="w-12 h-12 rounded-lg bg-gray-200" />

                                            </td>

                                            {/* Interest Name */}

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

                                ) : interest.length > 0 ? (

                                    interest.map((category, idx) => (

                                        <tr
                                            key={category.id}
                                            className="hover:bg-gray-50 transition-colors"
                                        >

                                            {/* Checkbox */}

                                            <td className="pl-6 px-4 py-4">

                                                <input
                                                    type="checkbox"
                                                    checked={selectedInterests.has(idx)}
                                                    onChange={(e) =>
                                                        handleSelectUser(
                                                            idx,
                                                            e.target.checked
                                                        )
                                                    }
                                                    className="rounded-md cursor-pointer border-gray-300 text-indigo-600 h-4.5 w-4.5"
                                                />

                                            </td>

                                            {/* Image */}

                                            <td className="pl-20 px-6 py-5 whitespace-nowrap">

                                                {category.image ? (

                                                    <img
                                                        src={category.image}
                                                        alt={category.name || "Interest"}
                                                        className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                                                    />

                                                ) : (

                                                    <div className="w-12 h-12 rounded-lg border border-gray-200 bg-gray-100 flex items-center justify-center text-xs text-gray-500">

                                                        N/A

                                                    </div>

                                                )}

                                            </td>

                                            {/* Name */}

                                            <td className="pl-32 px-6 py-5 whitespace-nowrap">

                                                <p className="text-[15px] font-medium text-[#111827]">

                                                    {category.name?.trim() || "N/A"}

                                                </p>

                                            </td>

                                            {/* Description */}

                                            <td className="pl-70 px-6 py-5">

                                                <p className="text-[14px] text-gray-600 break-words">

                                                    {category.description?.trim() || "N/A"}

                                                </p>

                                            </td>

                                            {/* Action */}

                                            <td className="px-4 py-5 text-center whitespace-nowrap">

                                                <Action
                                                    showView={false}
                                                    showEdit={true}
                                                    showDelete={true}
                                                    onEdit={() =>
                                                        console.log("Edit Interest", category)
                                                    }
                                                    onDelete={() => {

                                                        setCategoryToDelete(category);

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

                                            No Interests found.

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
                    totalPages={pagination?.total_pages || 1}
                    rowsPerPage={pagination?.per_page || rowsPerPage}
                    onPageChange={(page) =>
                        setCurrentPage(page)
                    }
                    onRowsPerPageChange={(rows) => {
                        setRowsPerPage(rows);
                        setCurrentPage(1);
                    }}
                    rowsPerPageOptions={[
                        5,
                        10,
                        20,
                        50,
                    ]}
                    showRowsPerPage={true}
                    showPageInfo={true}
                    className="mt-6"
                />

            </div>

        </div>
    );
}