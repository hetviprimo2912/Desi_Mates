import { useState, useRef, useEffect } from "react";
import {
    ChevronDown,
    Download,
    Grid3X3,
    CheckCircle2,
    CircleOff,
    Sparkles,
} from "lucide-react";

import Search from "../../Components/Search";
import TableHeader from "../../Components/TableHeader";
import Pagination from "../../Components/Pagination";
import Tags from "../../Components/Tags";
import TogglableSwitch from "../../Components/TogglableSwitch";
import CategoriesDeleteModal from "../../Components/CategoriesDeleteModal";
import Action from "../../Components/Action";
import StatsCard from "../../Components/StatsCard";

interface Category {
    id: number;
    image: string;
    name: string;
    description: string;
    status: boolean;
}

const initialCategories = [
    {
        id: 1,
        image: "https://picsum.photos/80?1",
        name: "Music",
        description: "Music related categories",
        status: true,
    },
    {
        id: 2,
        image: "https://picsum.photos/80?2",
        name: "Podcast",
        description: "Podcast content",
        status: false,
    },
    {
        id: 3,
        image: "https://picsum.photos/80?3",
        name: "Health",
        description: "Health and fitness",
        status: true,
    },
    {
        id: 4,
        image: "https://picsum.photos/80?4",
        name: "Travel",
        description: "Travel experiences",
        status: true,
    },
    {
        id: 5,
        image: "https://picsum.photos/80?5",
        name: "Sports",
        description: "Sports updates",
        status: false,
    },
];
const categoryStats = [
    {
        label: "Total Categories",
        value: "18",
        sub: "Total available categories",
        icon: <Grid3X3 size={24} className="text-blue-600" />,
        bg: "bg-blue-50",
    },
    {
        label: "Active Categories",
        value: "15",
        sub: "Visible to users",
        icon: <CheckCircle2 size={24} className="text-green-600" />,
        bg: "bg-green-50",
    },
    {
        label: "Inactive Categories",
        value: "3",
        sub: "Hidden categories",
        icon: <CircleOff size={24} className="text-red-600" />,
        bg: "bg-red-50",
    },
    {
        label: "Recently Added",
        value: "2",
        sub: "Added this month",
        icon: <Sparkles size={24} className="text-yellow-600" />,
        bg: "bg-yellow-50",
    },
];
export default function AllUsers() {

    const [categories, setCategories] =
        useState<Category[]>(initialCategories);

    const [searchTerm, setSearchTerm] =
        useState("");

    const [rowsPerPage, setRowsPerPage] =
        useState(10);

    const [currentPage, setCurrentPage] =
        useState(1);

    const [selectedCategories, setSelectedCategories] =
        useState<Set<number>>(new Set());

    const [isExportOpen, setIsExportOpen] =
        useState(false);

    const [isDeleteModalOpen, setIsDeleteModalOpen] =
        useState(false);

    const [categoryToDelete, setCategoryToDelete] =
        useState<Category | null>(null);

    const exportRef =
        useRef<HTMLDivElement | null>(null);

    const filteredCategories =
        categories.filter(category =>
            category.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
    const startIndex =
        (currentPage - 1) * rowsPerPage;

    const paginatedCategories =
        filteredCategories.slice(
            startIndex,
            startIndex + rowsPerPage
        );
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

        setCurrentPage(1);

    }, [searchTerm]);
    const handleSelectAll = (
        checked: boolean
    ) => {

        if (checked) {

            setSelectedCategories(
                new Set(
                    paginatedCategories.map((_, index) => index)
                )
            );

        } else {

            setSelectedCategories(
                new Set()
            );

        }

    };

    const handleSelectUser = (
        index: number,
        checked: boolean
    ) => {

        const updated =
            new Set(selectedCategories);

        if (checked) {

            updated.add(index);

        } else {

            updated.delete(index);

        }

        setSelectedCategories(updated);

    };

    const isAllSelected =
        paginatedCategories.length > 0 &&
        filteredCategories.every((_, index) =>
            selectedCategories.has(index)
        );

    const isIndeterminate =
        paginatedCategories.some((_, index) =>
            selectedCategories.has(index)
        ) && !isAllSelected;
    const handleToggleStatus = (id: number) => {

        setCategories(prev =>
            prev.map(category =>
                category.id === id
                    ? {
                        ...category,
                        status: !category.status,
                    }
                    : category
            )
        );

    };
    const handleDelete = () => {

        if (!categoryToDelete) return;

        setCategories(prev =>
            prev.filter(
                category =>
                    category.id !== categoryToDelete.id
            )
        );

        setSelectedCategories(new Set());

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

                            Category List

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

                                            console.table(filteredCategories);

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
                <StatsCard stats={categoryStats} />
                <div className="bg-white border border-gray-200 rounded-[10px] overflow-hidden">
                    <div className="w-full overflow-x-auto">

                        <table className="min-w-[1300px] w-full border-collapse">

                            <TableHeader
                                columns={[
                                    {
                                        label: "Category Image",
                                        width: "180px",
                                    },
                                    {
                                        label: "Category Name",
                                        width: "260px",
                                    },
                                    {
                                        label: "Description",
                                        width: "520px",
                                    },
                                    {
                                        label: "Satus",
                                        width: "180px",
                                        className: "text-center",
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
                                {paginatedCategories.map((category, idx) => (

                                    <tr

                                        className="hover:bg-gray-50 transition-colors"
                                    >

                                        {/* Checkbox */}

                                        <td className="pl-6 px-4 py-4">

                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.has(idx)}
                                                onChange={(e) =>
                                                    handleSelectUser(
                                                        idx,
                                                        e.target.checked
                                                    )
                                                }
                                                className="rounded-md cursor-pointer border-gray-300 text-indigo-600 h-4.5 w-4.5"
                                            />

                                        </td>
                                        <td
                                            className="pl-20 px-6 py-5 whitespace-nowrap"

                                        >

                                            <img
                                                src={category.image}
                                                alt={category.name}
                                                className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                                            />

                                        </td>
                                        <td
                                            className="pl-32 px-6 py-5 whitespace-nowrap"

                                        >

                                            <p className="text-[15px] font-medium text-[#111827]">
                                                {category.name}
                                            </p>

                                        </td>
                                        <td
                                            className="pl-60 px-6 py-5"

                                        >

                                            <p className="text-[14px] text-gray-600 break-words">
                                                {category.description}
                                            </p>

                                        </td>
                                        <td className="px-6 py-5">

                                            <div className="flex items-center justify-center gap-3">

                                                <Tags
                                                    text={category.status ? "Active" : "Inactive"}
                                                    variant={category.status ? "green" : "red"}
                                                />

                                                <TogglableSwitch
                                                    isActive={category.status}
                                                    onToggle={() =>
                                                        handleToggleStatus(category.id)
                                                    }
                                                    showLabel={false}
                                                />

                                            </div>

                                        </td>
                                        {/* Action */}

                                        <td
                                            className="px-4 py-5 text-center whitespace-nowrap"

                                        >

                                            <Action
                                                showView={false}
                                                showEdit={true}
                                                showDelete={true}
                                                onEdit={() =>
                                                    console.log("Edit Category", category)
                                                }
                                                onDelete={() => {

                                                    setCategoryToDelete(category);

                                                    setIsDeleteModalOpen(true);

                                                }}
                                            />

                                        </td>

                                    </tr>

                                ))}

                                {filteredCategories.length === 0 && (

                                    <tr>

                                        <td
                                            colSpan={5}
                                            className="py-10 text-center text-gray-400 italic"
                                        >

                                            No categories found.

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
                    totalPages={Math.max(
                        1,
                        Math.ceil(
                            filteredCategories.length /
                            rowsPerPage
                        )
                    )}
                    rowsPerPage={rowsPerPage}
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