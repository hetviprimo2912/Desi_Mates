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
import Tags from "../../Components/Tags";
import TogglableSwitch from "../../Components/TogglableSwitch";
import CategoriesDeleteModal from "../../Components/CategoriesDeleteModal";
import Action from "../../Components/Action";

interface Interests {
    id: number;
    image: string;
    name: string;
    description: string;

}

const initialInterests: Interests[] = [
    {
        id: 1,
        image: "https://picsum.photos/80?11",
        name: "Photography",
        description: "Photography lovers",

    },
    {
        id: 2,
        image: "https://picsum.photos/80?12",
        name: "Cooking",
        description: "Cooking enthusiasts",

    },
    {
        id: 3,
        image: "https://picsum.photos/80?13",
        name: "Travel",
        description: "Travel experiences",

    },
    {
        id: 4,
        image: "https://picsum.photos/80?14",
        name: "Reading",
        description: "Books and novels",

    },
    {
        id: 5,
        image: "https://picsum.photos/80?15",
        name: "Gaming",
        description: "Console & PC gaming",

    },
];
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
export default function AllUsers() {

    const [interests, setInterests] =
        useState<Interests[]>(initialInterests);

    const [searchTerm, setSearchTerm] =
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
        useState<Interests | null>(null);

    const exportRef =
        useRef<HTMLDivElement | null>(null);

    const filteredInterests =
        interests.filter(category =>
            category.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
    const startIndex =
        (currentPage - 1) * rowsPerPage;

    const paginatedInterests =
        filteredInterests.slice(
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

            setSelectedInterests(
                new Set(
                    paginatedInterests.map((_, index) => index)
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
        paginatedInterests.length > 0 &&
        filteredInterests.every((_, index) =>
            selectedInterests.has(index)
        );

    const isIndeterminate =
        paginatedInterests.some((_, index) =>
            selectedInterests.has(index)
        ) && !isAllSelected;

    const handleDelete = () => {

        if (!categoryToDelete) return;

        setInterests(prev =>
            prev.filter(
                category =>
                    category.id !== categoryToDelete.id
            )
        );

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

                                            console.table(filteredInterests);

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
                <StatsCard stats={interestStats} />
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
                                {paginatedInterests.map((category, idx) => (

                                    <tr

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
                                            className="pl-70 px-6 py-5"

                                        >

                                            <p className="text-[14px] text-gray-600 break-words">
                                                {category.description}
                                            </p>

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

                                {filteredInterests.length === 0 && (

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
                    totalPages={Math.max(
                        1,
                        Math.ceil(
                            filteredInterests.length /
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