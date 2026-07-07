import { useState, useRef, useEffect } from "react";
import {
    ChevronDown,
    Download,
    Users,
    Star,
    Heart,
    TrendingUp,
    ArrowDownCircle,
    Sparkles,
} from "lucide-react";
import StatsCard from "../../Components/StatsCard";
import Search from "../../Components/Search";
import TableHeader from "../../Components/TableHeader";
import Pagination from "../../Components/Pagination";
import Tags from "../../Components/Tags";
import TogglableSwitch from "../../Components/TogglableSwitch";
import CategoriesDeleteModal from "../../Components/CategoriesDeleteModal";
import Action from "../../Components/Action";

interface StarSign {
    id: number;
    symbol: string;
    name: string;
    description: string;
}

interface StarSign {
    id: number;
    symbol: string;
    name: string;
    description: string;
}

const initialStarSigns: StarSign[] = [
    {
        id: 1,
        symbol: "♈",
        name: "Aries",
        description: "Confident, courageous and energetic."
    },
    {
        id: 2,
        symbol: "♉",
        name: "Taurus",
        description: "Reliable, patient and practical."
    },
    {
        id: 3,
        symbol: "♊",
        name: "Gemini",
        description: "Curious, adaptable and expressive."
    },
    {
        id: 4,
        symbol: "♋",
        name: "Cancer",
        description: "Emotional, caring and protective."
    },
    {
        id: 5,
        symbol: "♌",
        name: "Leo",
        description: "Confident, generous and natural leader."
    },
    {
        id: 6,
        symbol: "♍",
        name: "Virgo",
        description: "Practical, analytical and detail-oriented."
    },
    {
        id: 7,
        symbol: "♎",
        name: "Libra",
        description: "Balanced, diplomatic and charming."
    },
    {
        id: 8,
        symbol: "♏",
        name: "Scorpio",
        description: "Passionate, determined and loyal."
    },
    {
        id: 9,
        symbol: "♐",
        name: "Sagittarius",
        description: "Optimistic, adventurous and independent."
    },
    {
        id: 10,
        symbol: "♑",
        name: "Capricorn",
        description: "Disciplined, ambitious and responsible."
    },
    {
        id: 11,
        symbol: "♒",
        name: "Aquarius",
        description: "Innovative, independent and visionary."
    },
    {
        id: 12,
        symbol: "♓",
        name: "Pisces",
        description: "Compassionate, intuitive and artistic."
    },
];
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
export default function AllUsers() {

    const [starSigns, setStarSigns] =
        useState<StarSign[]>(initialStarSigns);

    const [searchTerm, setSearchTerm] =
        useState("");

    const [rowsPerPage, setRowsPerPage] =
        useState(10);

    const [currentPage, setCurrentPage] =
        useState(1);

    const [selectedstarSigns, setSelectedstarSigns] =
        useState<Set<number>>(new Set());

    const [isExportOpen, setIsExportOpen] =
        useState(false);

    const [isDeleteModalOpen, setIsDeleteModalOpen] =
        useState(false);

    const [categoryToDelete, setCategoryToDelete] =
        useState<StarSign | null>(null);

    const exportRef =
        useRef<HTMLDivElement | null>(null);

    const filteredstarSigns =
        starSigns.filter(category =>
            category.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
    const startIndex =
        (currentPage - 1) * rowsPerPage;

    const paginatedstarSigns =
        filteredstarSigns.slice(
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

            setSelectedstarSigns(
                new Set(
                    paginatedstarSigns.map((_, index) => index)
                )
            );

        } else {

            setSelectedstarSigns(
                new Set()
            );

        }

    };

    const handleSelectUser = (
        index: number,
        checked: boolean
    ) => {

        const updated =
            new Set(selectedstarSigns);

        if (checked) {

            updated.add(index);

        } else {

            updated.delete(index);

        }

        setSelectedstarSigns(updated);

    };

    const isAllSelected =
        paginatedstarSigns.length > 0 &&
        filteredstarSigns.every((_, index) =>
            selectedstarSigns.has(index)
        );

    const isIndeterminate =
        paginatedstarSigns.some((_, index) =>
            selectedstarSigns.has(index)
        ) && !isAllSelected;

    const handleDelete = () => {

        if (!categoryToDelete) return;

        setStarSigns(prev =>
            prev.filter(
                category =>
                    category.id !== categoryToDelete.id
            )
        );

        setSelectedstarSigns(new Set());

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

                            Star Sign List

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

                                            console.table(filteredstarSigns);

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
                <StatsCard stats={starSignStats} />
                <div className="bg-white border border-gray-200 rounded-[10px] overflow-hidden">
                    <div className="w-full overflow-x-auto">

                        <table className="min-w-[1300px] w-full border-collapse">

                            <TableHeader
                                columns={[
                                    {
                                        label: "Star Sign",
                                        width: "180px",
                                    },
                                    {
                                        label: "Sign Name",
                                        width: "260px",
                                    },
                                    {
                                        label: "Sign Description",
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
                                {paginatedstarSigns.map((category, idx) => (

                                    <tr

                                        className="hover:bg-gray-50 transition-colors"
                                    >

                                        {/* Checkbox */}

                                        <td className="pl-8 px-4 py-4">

                                            <input
                                                type="checkbox"
                                                checked={selectedstarSigns.has(idx)}
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
                                            className="pl-22 px-6 py-5 whitespace-nowrap"

                                        >

                                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50 text-3xl">
                                                {category.symbol}
                                            </div>

                                        </td>
                                        <td
                                            className="pl-36 px-6 py-5 whitespace-nowrap"

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

                                {filteredstarSigns.length === 0 && (

                                    <tr>

                                        <td
                                            colSpan={5}
                                            className="py-10 text-center text-gray-400 italic"
                                        >

                                            No starSigns found.

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
                            filteredstarSigns.length /
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