import { useState, useRef, useEffect } from "react";
import {
    ChevronDown,
    Download,
    Users,
    UserCheck,
    Heart,
    Crown,
} from "lucide-react";
import StatsCards from "../../Components/StatsCard";
import Search from "../../Components/Search";
import TableHeader from "../../Components/TableHeader";
import Pagination from "../../Components/Pagination";
import Tags from "../../Components/Tags";

import CategoriesDeleteModal from "../../Components/CategoriesDeleteModal";
import Action from "../../Components/Action";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "../../lib/axiosConfiguration";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { user_cards } from "../../Store/slices/UsersSlice/user_cards_thunk";
import { users_list } from "../../Store/slices/UsersSlice/users_list_thunk";
import { user_delete } from "../../Store/slices/UsersSlice/user_delete_thunk";
import type { RootState, AppDispatch } from "../../Store/store";


export default function AllUsers() {

    const dispatch = useDispatch<AppDispatch>();
    const {
        users,
        pagination,
        loading,
    } = useSelector(
        (state: RootState) => state.users_list
    );

    const {
        cards,
        loading: cardsLoading,
    } = useSelector(
        (state: RootState) => state.user_cards
    );
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] =
        useState("");
    const [debouncedSearch, setDebouncedSearch] =
        useState("");
    const [rowsPerPage, setRowsPerPage] =
        useState(10);

    const [currentPage, setCurrentPage] =
        useState(1);

    const [selectedUsers, setSelectedUsers] =
        useState<Set<number>>(new Set());

    const [isExportOpen, setIsExportOpen] =
        useState(false);

    const [isDeleteModalOpen, setIsDeleteModalOpen] =
        useState(false);

    const [userToDelete, setUserToDelete] =
        useState<number | null>(null);

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

        setCurrentPage(1);

    }, [searchTerm]);
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 1000);

        return () => clearTimeout(timer);
    }, [searchTerm]);
    useEffect(() => {

        dispatch(
            user_cards()
        );

    }, [dispatch]);
    useEffect(() => {
        dispatch(
            users_list({
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
    const handleSelectAll = (
        checked: boolean
    ) => {

        if (checked) {

            setSelectedUsers(
                new Set(
                    users.map((_, index) => index)
                )
            );

        } else {

            setSelectedUsers(
                new Set()
            );

        }

    };

    const handleSelectUser = (
        index: number,
        checked: boolean
    ) => {

        const updated =
            new Set(selectedUsers);

        if (checked) {

            updated.add(index);

        } else {

            updated.delete(index);

        }

        setSelectedUsers(updated);

    };

    const isAllSelected =
        users.length > 0 &&
        users.every((_, index) =>
            selectedUsers.has(index)
        );

    const isIndeterminate =
        users.some((_, index) =>
            selectedUsers.has(index)
        ) && !isAllSelected;


    const handleDelete = async () => {

        if (!userToDelete) return;

        try {

            await dispatch(
                user_delete({
                    user_id: userToDelete,
                })
            ).unwrap();

            dispatch(
                users_list({
                    search: debouncedSearch,
                    page_no: currentPage,
                    per_page: rowsPerPage,
                })
            );

            dispatch(user_cards());

            setSelectedUsers(new Set());

            setUserToDelete(null);

            setIsDeleteModalOpen(false);

        } catch (error) {
            console.error(error);
        }
    };
    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        });

    const formatTime = (date: string) =>
        new Date(date).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
        });
    const getInitials = (name?: string | null) => {
        if (!name) return "N/A";

        const words = name.trim().split(" ");

        if (words.length === 1) {
            return words[0].charAt(0).toUpperCase();
        }

        return (
            words[0].charAt(0) +
            words[words.length - 1].charAt(0)
        ).toUpperCase();
    };
    const fetchAllUsers = async () => {
        const response = await axios.post("/users_list", {
            search: debouncedSearch,
            page_no: 1,
            per_page: pagination?.total ?? users.length,
        });

        return response.data.data.users;
    };
    const handleExportPDF = async () => {
        const allUsers = await fetchAllUsers();

        const doc = new jsPDF("landscape");

        doc.setFontSize(18);
        doc.text("All Users Report", 14, 18);

        doc.setFontSize(10);
        doc.text(
            `Generated : ${new Date().toLocaleString()}`,
            14,
            26
        );

        autoTable(doc, {
            startY: 34,

            head: [[
                "Name",
                "Email",
                "Phone",
                "Country",
                "Looking For",
                "Created At",
                "Approved",
            ]],

            body: allUsers.map((user: any) => [

                user.name ?? "N/A",

                user.email ?? "N/A",

                user.phone ?? "N/A",

                user.country ?? "N/A",

                user.lookinfor ?? "N/A",

                user.created_at
                    ? new Date(user.created_at).toLocaleString()
                    : "N/A",

                user.approved === 1
                    ? "Approved"
                    : "Not Approved",

            ]),

            headStyles: {
                fillColor: [37, 99, 235],
            },

            styles: {
                fontSize: 9,
                cellPadding: 3,
            },
        });

        doc.save("All_Users_Report.pdf");
    };
    const handleExportCSV = async () => {

        const allUsers = await fetchAllUsers();

        const headers = [
            "Name",
            "Email",
            "Phone",
            "Country",
            "Looking For",
            "Created At",
            "Approved",
        ];

        const rows = allUsers.map((user: any) => [

            user.name ?? "N/A",

            user.email ?? "N/A",

            user.phone ?? "N/A",

            user.country ?? "N/A",

            user.lookinfor ?? "N/A",

            user.created_at
                ? new Date(user.created_at).toLocaleString()
                : "N/A",

            user.approved === 1
                ? "Approved"
                : "Not Approved",

        ]);

        const csvContent = [headers, ...rows]
            .map((row) =>
                row
                    .map((value: string | number) =>
                        `"${String(value).replace(/"/g, '""')}"`
                    )
                    .join(",")
            )
            .join("\n");

        const blob = new Blob(
            [csvContent],
            {
                type: "text/csv;charset=utf-8;",
            }
        );

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;

        link.download = "All_Users_Report.csv";

        link.click();

        window.URL.revokeObjectURL(url);
    };
    const stats = [

        {
            label: "Total Users",
            value: cards?.total_users ?? 0,
            icon: <Users size={24} className="text-blue-600" />,
            bg: "bg-blue-50",
            change: "",
        },

        {
            label: "Approved Users",
            value: cards?.approved_users ?? 0,
            icon: <UserCheck size={24} className="text-green-600" />,
            bg: "bg-green-50",
            change: "",
        },

        {
            label: "Subscribed Users",
            value: cards?.subscriber_users ?? 0,
            icon: <Crown size={24} className="text-orange-600" />,
            bg: "bg-orange-50",
            change: "",
        },

        {
            label: "Online Users",
            value: cards?.online_users ?? 0,
            icon: <Heart size={24} className="text-purple-600" />,
            bg: "bg-purple-50",
            change: "",
        },

    ];
    return (

        <div className="w-full min-h-screen text-[#111827]">

            <div className="px-4 sm:px-8 lg:px-8 xl:px-8 pt-4 pb-12">

                {isDeleteModalOpen && (
                    <CategoriesDeleteModal
                        onClose={() => {

                            setIsDeleteModalOpen(false);

                            setUserToDelete(null);

                        }}
                        onConfirm={handleDelete}
                    />
                )}

                {/* Header */}

                <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-8">

                    <div className="overflow-x-auto scrollbar-thin">
                        <h1 className="text-[28px] font-semibold text-[#101828]">

                            All Users

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
                                            handleExportPDF();
                                            setIsExportOpen(false);
                                        }}
                                        className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50"
                                    >
                                        Export as PDF
                                    </button>

                                    <button
                                        onClick={() => {
                                            handleExportCSV();
                                            setIsExportOpen(false);
                                        }}
                                        className="w-full border-t border-gray-100 px-4 py-3 text-left text-sm hover:bg-gray-50"
                                    >
                                        Export as CSV
                                    </button>

                                </div>

                            )}

                        </div>

                    </div>

                </div>
                {cardsLoading ? (
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

                    <StatsCards
                        stats={stats}
                        cols={4}
                    />

                )}
                <div className="bg-white border border-gray-200 rounded-[10px] overflow-hidden">
                    <div className="w-full overflow-x-auto">

                        <table className="w-full min-w-[1200px] border-collapse">

                            <TableHeader
                                columns={[
                                    {
                                        label: "Profile",
                                        width: "90px",
                                    },
                                    {
                                        label: "User Name",
                                        width: "180px",
                                    },
                                    {
                                        label: "Email",
                                        width: "220px",
                                    },
                                    {
                                        label: "Contact",
                                        width: "170px",
                                    },
                                    {
                                        label: "Country",
                                        width: "140px",
                                    },
                                    {
                                        label: "Looking For",
                                        width: "170px",
                                    },
                                    {
                                        label: "Created At",
                                        width: "180px",
                                    },
                                    {
                                        label: "Approved",
                                        width: "170px",
                                        className: "text-center",
                                    },
                                    {
                                        label: "Action",
                                        width: "120px",
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

                                        <tr key={index} className="animate-pulse">

                                            <td className="px-4 py-5">
                                                <div className="h-4 w-4 rounded bg-gray-200" />
                                            </td>

                                            <td className="px-4 py-5">
                                                <div className="w-11 h-11 rounded-full bg-gray-200" />
                                            </td>

                                            <td className="px-4 py-5">
                                                <div className="h-4 w-32 rounded bg-gray-200" />
                                            </td>

                                            <td className="px-4 py-5">
                                                <div className="h-4 w-44 rounded bg-gray-200" />
                                            </td>

                                            <td className="px-4 py-5">
                                                <div className="h-4 w-32 rounded bg-gray-200" />
                                            </td>

                                            <td className="px-4 py-5">
                                                <div className="h-4 w-24 rounded bg-gray-200" />
                                            </td>

                                            <td className="px-4 py-5">
                                                <div className="h-6 w-20 rounded-full bg-gray-200" />
                                            </td>

                                            <td className="px-4 py-5">
                                                <div className="h-4 w-28 rounded bg-gray-200 mb-2" />
                                                <div className="h-3 w-20 rounded bg-gray-100" />
                                            </td>

                                            <td className="px-4 py-5">
                                                <div className="h-6 w-24 rounded-full bg-gray-200" />
                                            </td>

                                            <td className="px-4 py-5">
                                                <div className="h-8 w-8 rounded bg-gray-200" />
                                            </td>

                                        </tr>

                                    ))

                                ) : users.length > 0 ? (

                                    users.map((user, idx) => (

                                        <tr
                                            key={user.id}
                                            className="hover:bg-gray-50 transition-colors"
                                        >

                                            {/* Checkbox */}

                                            <td className="px-4 py-4">

                                                <input
                                                    type="checkbox"
                                                    checked={selectedUsers.has(idx)}
                                                    onChange={(e) =>
                                                        handleSelectUser(
                                                            idx,
                                                            e.target.checked
                                                        )
                                                    }
                                                    className="rounded-md cursor-pointer border-gray-300 text-indigo-600 h-4.5 w-4.5"
                                                />

                                            </td>

                                            {/* Profile */}

                                            <td className="px-4 py-5 whitespace-nowrap">

                                                {user.profile_pic ? (

                                                    <img
                                                        src={user.profile_pic}
                                                        alt={user.name}
                                                        className="w-11 h-11 rounded-full object-cover border border-gray-200"
                                                    />

                                                ) : (

                                                    <div
                                                        className="
                                                                    w-11
                                                                    h-11
                                                                    rounded-full
                                                                    bg-blue-100
                                                                    text-blue-700
                                                                    flex
                                                                    items-center
                                                                    justify-center
                                                                    font-semibold
                                                                    text-sm
                                                                    border
                                                                    border-gray-200
                                                                "
                                                    >
                                                        {getInitials(user.name)}
                                                    </div>

                                                )}

                                            </td>

                                            {/* Username */}

                                            <td className="pl-16 px-4 py-5 whitespace-nowrap">

                                                <p className="text-[15px] font-medium text-[#111827]">
                                                    {user.name ?? "N/A"}
                                                </p>

                                            </td>

                                            {/* Email */}

                                            <td className="pl-20 px-4 py-5 whitespace-nowrap">

                                                <p className="text-[14px] text-gray-600">
                                                    {user.email ?? "N/A"}
                                                </p>

                                            </td>

                                            {/* Contact */}

                                            <td className="pl-10 px-4 py-5 whitespace-nowrap">

                                                <p className="text-[14px] text-gray-600">
                                                    {user.phone ?? "N/A"}
                                                </p>

                                            </td>

                                            {/* Country */}

                                            <td className="pl-16 px-4 py-5 whitespace-nowrap">

                                                <p className="text-[14px] text-gray-700">
                                                    {user.country ?? "N/A"}
                                                </p>

                                            </td>
                                            {/* Looking For */}
                                            <td className="pl-14 px-4 py-5 whitespace-nowrap">

                                                <span className="text-pink-400 font-bold">
                                                    {user.lookinfor ?? "N/A"}
                                                </span>

                                            </td>
                                            {/* Created At */}

                                            <td className="pl-14 px-4 py-5 whitespace-nowrap">

                                                <div className="flex flex-col">

                                                    <span className="text-[15px] font-medium text-[#111827]">
                                                        {user.created_at ? formatDate(user.created_at) : "N/A"}
                                                    </span>

                                                    <span className="text-[14px] text-gray-500 mt-1">
                                                        {user.created_at ? formatTime(user.created_at) : "N/A"}
                                                    </span>

                                                </div>

                                            </td>

                                            {/* Approved */}

                                            <td className="pl-10 px-4 py-5 whitespace-nowrap">

                                                <Tags
                                                    text={
                                                        user.approved === 1
                                                            ? "Approved"
                                                            : user.approved === 0
                                                                ? "Not Approved"
                                                                : "N/A"
                                                    }
                                                    variant={
                                                        user.approved === 1
                                                            ? "green"
                                                            : user.approved === 0
                                                                ? "red"
                                                                : "gray"
                                                    }
                                                />

                                            </td>

                                            {/* Action */}

                                            <td className="px-4 py-5 whitespace-nowrap">

                                                <Action
                                                    showView={true}
                                                    showEdit={false}
                                                    showDelete={true}
                                                    onView={() => navigate(`/all-users/view/${user.id}`)}
                                                    onDelete={() => {

                                                        setUserToDelete(user.id);

                                                        setIsDeleteModalOpen(true);

                                                    }}
                                                />

                                            </td>

                                        </tr>

                                    ))) : (

                                    <tr>

                                        <td
                                            colSpan={11}
                                            className="py-10 text-center text-gray-400 italic"
                                        >

                                            No users found.

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
                    totalPages={pagination?.last_page ?? 1}
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