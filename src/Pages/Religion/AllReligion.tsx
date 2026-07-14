import { useState, useRef, useEffect } from "react";
import {
    ChevronDown,
    Download,
    Users,
    Star,
    Heart,
    TrendingUp,

} from "lucide-react";
import StatsCard from "../../Components/StatsCard";
import Search from "../../Components/Search";
import TableHeader from "../../Components/TableHeader";
import Pagination from "../../Components/Pagination";

import CategoriesDeleteModal from "../../Components/CategoriesDeleteModal";
import Action from "../../Components/Action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../Store/store";
import type {
    ReligionItem,
} from "../../Types/ReligionTypes/religion_list_types";

import { religion_list } from "../../Store/slices/ReligionSlices/religion_list_thunk";
import { religion_card } from "../../Store/slices/ReligionSlices/religion_card_thunk";
import { delete_religion } from "../../Store/slices/ReligionSlices/delete_religion_thunk";


export default function AllUsers() {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const {
        religion,
        pagination,
        loading,
    } = useSelector(
        (state: RootState) => state.religion_list
    );
    const {
        loading: deleteLoading,
    } = useSelector(
        (state: RootState) =>
            state.delete_religion
    );
    const {
        cards,
        loading: cardLoading,
    } = useSelector(
        (state: RootState) => state.religion_card
    );
    const [searchTerm, setSearchTerm] =
        useState("");
    const [debouncedSearch, setDebouncedSearch] =
        useState("");
    const [rowsPerPage, setRowsPerPage] =
        useState(10);

    const [currentPage, setCurrentPage] =
        useState(1);

    useEffect(() => {

        const timer = setTimeout(() => {

            setDebouncedSearch(searchTerm);

            setCurrentPage(1);

        }, 1000);

        return () => clearTimeout(timer);

    }, [searchTerm]);
    useEffect(() => {

        dispatch(
            religion_card({})
        );

    }, [dispatch]);
    useEffect(() => {

        dispatch(
            religion_list({
                search: debouncedSearch,
                page_no: currentPage,
                per_page: rowsPerPage,
            })
        );

    }, [
        dispatch,
        debouncedSearch,
        currentPage,
        rowsPerPage,
    ]);


    const [selectedReligions, setSelectedReligions] =
        useState<Set<number>>(new Set());

    const [isExportOpen, setIsExportOpen] =
        useState(false);

    const [isDeleteModalOpen, setIsDeleteModalOpen] =
        useState(false);

    const [categoryToDelete, setCategoryToDelete] =
        useState<ReligionItem | null>(null);
    const [expandedDescriptions, setExpandedDescriptions] =
        useState<Set<string>>(new Set());
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

    const handleSelectAll = (
        checked: boolean
    ) => {

        if (checked) {

            setSelectedReligions(
                new Set(
                    religion.map((item) => Number(item.id))
                )
            );

        } else {

            setSelectedReligions(
                new Set()
            );

        }

    };

    const handleSelectUser = (
        id: number,
        checked: boolean
    ) => {

        const updated = new Set(selectedReligions);

        if (checked) {
            updated.add(id);
        } else {
            updated.delete(id);
        }

        setSelectedReligions(updated);
    };
    const isAllSelected =
        religion.length > 0 &&
        religion.every((item) =>
            selectedReligions.has(Number(item.id))
        );

    const isIndeterminate =
        religion.some((item) =>
            selectedReligions.has(Number(item.id))
        ) && !isAllSelected;
    const toggleDescription = (id: string) => {

        setExpandedDescriptions((prev) => {

            const updated = new Set(prev);

            if (updated.has(id)) {
                updated.delete(id);
            } else {
                updated.add(id);
            }

            return updated;

        });

    };
    const handleDelete = async () => {

        if (
            !categoryToDelete ||
            deleteLoading
        ) return;

        try {

            await dispatch(
                delete_religion({
                    id: categoryToDelete.id,
                })
            ).unwrap();

            await Promise.all([

                dispatch(
                    religion_list({
                        page_no: currentPage,
                        per_page: rowsPerPage,
                        search: debouncedSearch,
                    })
                ),

                dispatch(
                    religion_card({})
                ),

            ]);

            setSelectedReligions(new Set());

            setCategoryToDelete(null);

            setIsDeleteModalOpen(false);

        } catch (error) {

            console.log(error);

        }

    };
    const religionStats = [
        {
            label: "Total Religions",
            value: cards?.total_religions ?? 0,
            sub: "Available religions",
            icon: <Heart size={24} className="text-red-600" />,
            bg: "bg-red-50",
        },
        {
            label: "Profiles With Religion",
            value: cards?.profiles_with_religion ?? 0,
            sub: "Users who selected a religion",
            icon: <Users size={24} className="text-blue-600" />,
            bg: "bg-blue-50",
        },
        {
            label: "Most Selected",
            value: cards?.most_selected || "N/A",
            sub: "Most selected religion",
            icon: <Star size={24} className="text-yellow-600" />,
            bg: "bg-yellow-50",
        },
        {
            label: "Least Selected",
            value: cards?.least_selected || "N/A",
            sub: "Least selected religion",
            icon: <TrendingUp size={24} className="text-green-600" />,
            bg: "bg-green-50",
        },
    ];
    return (

        <div className="w-full min-h-screen text-[#111827]">

            <div className="px-4 sm:px-8 lg:px-8 xl:px-8 pt-4 pb-12">

                {isDeleteModalOpen && (
                    <CategoriesDeleteModal
                        onClose={() => {

                            if (deleteLoading) return;

                            setIsDeleteModalOpen(false);

                            setCategoryToDelete(null);

                        }}
                        onConfirm={() => {

                            if (!deleteLoading) {

                                handleDelete();

                            }

                        }}
                        loading={deleteLoading}
                    />
                )}
                {/* Header */}

                <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-8">

                    <div className="overflow-x-auto scrollbar-thin">
                        <h1 className="text-[28px] font-semibold text-[#101828]">

                            Religions List

                        </h1>

                    </div>

                    <div className="flex items-center gap-3 w-full lg:w-auto lg:flex-1 lg:max-w-xl lg:justify-end">

                        <div className="flex-1 lg:max-w-sm">

                            <Search
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                placeholder="Search User..."
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

                                            console.table(religion);

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

                {cardLoading ? (

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
                        stats={religionStats}
                    />

                )}
                <div className="bg-white border border-gray-200 rounded-[10px] overflow-hidden">
                    <div className="w-full overflow-x-auto">

                        <table className="min-w-[1300px] w-full border-collapse">

                            <TableHeader
                                columns={[
                                    {
                                        label: "Religion Name",
                                        width: "320px",
                                    },
                                    {
                                        label: "Description",
                                        width: "650px",
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

                                            {/* Religion Name */}

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

                                ) : religion.length > 0 ? (

                                    religion.map((item) => (

                                        <tr
                                            key={item.id}
                                            className="hover:bg-gray-50 transition-colors"
                                        >

                                            {/* Checkbox */}

                                            <td className="pl-8 px-4 py-4">

                                                <input
                                                    type="checkbox"
                                                    checked={selectedReligions.has(Number(item.id))}
                                                    onChange={(e) =>
                                                        handleSelectUser(
                                                            Number(item.id),
                                                            e.target.checked
                                                        )
                                                    }
                                                    className="rounded-md cursor-pointer border-gray-300 text-indigo-600 h-4.5 w-4.5"
                                                />

                                            </td>

                                            {/* Religion Name */}

                                            <td className="pl-44 px-6 py-5 whitespace-nowrap">

                                                <p className="text-[15px] font-medium text-[#111827]">

                                                    {item.name || "N/A"}

                                                </p>

                                            </td>

                                            {/* Description */}
                                            <td className="pl-90 px-6 py-5">

                                                {item.description?.trim() ? (

                                                    <div className="max-w-[520px]">

                                                        <p
                                                            className={`text-[14px] text-gray-600 break-words ${expandedDescriptions.has(item.id)
                                                                ? ""
                                                                : "line-clamp-2"
                                                                }`}
                                                        >

                                                            {item.description}

                                                        </p>

                                                        {item.description.length > 120 && (

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    toggleDescription(item.id)
                                                                }
                                                                className="mt-1 text-xs font-semibold text-blue-600 hover:underline"
                                                            >

                                                                {expandedDescriptions.has(item.id)
                                                                    ? "Show Less"
                                                                    : "Show More"}

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
                                                    onEdit={() =>
                                                        navigate(`/religion/edit/${item.id}`)
                                                    }
                                                    onDelete={() => {

                                                        setCategoryToDelete(item);

                                                        setIsDeleteModalOpen(true);

                                                    }}
                                                />

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan={4}
                                            className="py-10 text-center text-gray-400 italic"
                                        >

                                            No Religions found.

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