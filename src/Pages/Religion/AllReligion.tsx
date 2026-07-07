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


interface Religion {
    id: number;
    image: string;
    name: string;
    description: string;
}

const initialReligions: Religion[] = [
    {
        id: 1,
        image: "https://picsum.photos/80?101",
        name: "Hindu",
        description: "Followers of Hinduism",
    },
    {
        id: 2,
        image: "https://picsum.photos/80?102",
        name: "Muslim",
        description: "Followers of Islam",
    },
    {
        id: 3,
        image: "https://picsum.photos/80?103",
        name: "Christian",
        description: "Followers of Christianity",
    },
    {
        id: 4,
        image: "https://picsum.photos/80?104",
        name: "Sikh",
        description: "Followers of Sikhism",
    },
    {
        id: 5,
        image: "https://picsum.photos/80?105",
        name: "Jain",
        description: "Followers of Jainism",
    },
    {
        id: 6,
        image: "https://picsum.photos/80?106",
        name: "Buddhist",
        description: "Followers of Buddhism",
    },
    {
        id: 7,
        image: "https://picsum.photos/80?107",
        name: "Jewish",
        description: "Followers of Judaism",
    },
    {
        id: 8,
        image: "https://picsum.photos/80?108",
        name: "Catholic",
        description: "Catholic denomination",
    },
    {
        id: 9,
        image: "https://picsum.photos/80?109",
        name: "Other",
        description: "Other religions",
    },
];
const religionStats = [
    {
        label: "Total Religions",
        value: "9",
        sub: "Available religions",
        icon: <Heart size={24} className="text-red-600" />,
        bg: "bg-red-50",
    },
    {
        label: "Profiles With Religion",
        value: "17,580",
        sub: "Users who selected a religion",
        icon: <Users size={24} className="text-blue-600" />,
        bg: "bg-blue-50",
    },
    {
        label: "Most Selected",
        value: "Hindu",
        sub: "Chosen by 8,420 users",
        icon: <Star size={24} className="text-yellow-600" />,
        bg: "bg-yellow-50",
    },
    {
        label: "Least Selected",
        value: "Other",
        sub: "Chosen by 280 users",
        icon: <TrendingUp size={24} className="text-green-600" />,
        bg: "bg-green-50",
    },
];
export default function AllUsers() {

    const [religions, setReligions] =
        useState<Religion[]>(initialReligions);

    const [searchTerm, setSearchTerm] =
        useState("");

    const [rowsPerPage, setRowsPerPage] =
        useState(10);

    const [currentPage, setCurrentPage] =
        useState(1);

    const [selectedReligions, setSelectedReligions] =
        useState<Set<number>>(new Set());

    const [isExportOpen, setIsExportOpen] =
        useState(false);

    const [isDeleteModalOpen, setIsDeleteModalOpen] =
        useState(false);

    const [categoryToDelete, setCategoryToDelete] =
        useState<Religion | null>(null);

    const exportRef =
        useRef<HTMLDivElement | null>(null);

    const filteredReligions =
        religions.filter(category =>
            category.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
    const startIndex =
        (currentPage - 1) * rowsPerPage;

    const paginatedReligions =
        filteredReligions.slice(
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

            setSelectedReligions(
                new Set(
                    paginatedReligions.map((_, index) => index)
                )
            );

        } else {

            setSelectedReligions(
                new Set()
            );

        }

    };

    const handleSelectUser = (
        index: number,
        checked: boolean
    ) => {

        const updated =
            new Set(selectedReligions);

        if (checked) {

            updated.add(index);

        } else {

            updated.delete(index);

        }

        setSelectedReligions(updated);

    };

    const isAllSelected =
        paginatedReligions.length > 0 &&
        filteredReligions.every((_, index) =>
            selectedReligions.has(index)
        );

    const isIndeterminate =
        paginatedReligions.some((_, index) =>
            selectedReligions.has(index)
        ) && !isAllSelected;

    const handleDelete = () => {

        if (!categoryToDelete) return;

        setReligions(prev =>
            prev.filter(
                category =>
                    category.id !== categoryToDelete.id
            )
        );

        setSelectedReligions(new Set());

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

                                            console.table(filteredReligions);

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
                <StatsCard stats={religionStats} />
                <div className="bg-white border border-gray-200 rounded-[10px] overflow-hidden">
                    <div className="w-full overflow-x-auto">

                        <table className="min-w-[1300px] w-full border-collapse">

                            <TableHeader
                                columns={[
                                    {
                                        label: "Image",
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
                                {paginatedReligions.map((category, idx) => (

                                    <tr

                                        className="hover:bg-gray-50 transition-colors"
                                    >

                                        {/* Checkbox */}

                                        <td className="pl-8 px-4 py-4">

                                            <input
                                                type="checkbox"
                                                checked={selectedReligions.has(idx)}
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
                                            <img
                                                src={category.image}
                                                alt={category.name}
                                                className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                                            />
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

                                {filteredReligions.length === 0 && (

                                    <tr>

                                        <td
                                            colSpan={5}
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
                    totalPages={Math.max(
                        1,
                        Math.ceil(
                            filteredReligions.length /
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