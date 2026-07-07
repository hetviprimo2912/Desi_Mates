import { useState, useRef, useEffect } from "react";
import {
    ChevronDown,
    Download,
} from "lucide-react";

import Search from "../../Components/Search";
import TableHeader from "../../Components/TableHeader";
import Pagination from "../../Components/Pagination";
import Tags from "../../Components/Tags";
import TogglableSwitch from "../../Components/TogglableSwitch";
import CategoriesDeleteModal from "../../Components/CategoriesDeleteModal";
import Action from "../../Components/Action";

interface User {
    id: number;
    profile: string;
    userName: string;
    email: string;
    contact: string;
    country: string;
    receivedLikes: number;
    sentLikes: number;
    mode: string;
    approved: boolean;
}

const initialUsers: User[] = [
    {
        id: 1,
        profile: "https://i.pravatar.cc/150?img=1",
        userName: "John Doe",
        email: "john@gmail.com",
        contact: "+91 9876543210",
        country: "India",
        receivedLikes: 52,
        sentLikes: 33,
        mode: "Premium",
        approved: true,
    },
    {
        id: 2,
        profile: "https://i.pravatar.cc/150?img=2",
        userName: "Emma Watson",
        email: "emma@gmail.com",
        contact: "+44 7856321458",
        country: "United Kingdom",
        receivedLikes: 120,
        sentLikes: 85,
        mode: "Free",
        approved: false,
    },
    {
        id: 3,
        profile: "https://i.pravatar.cc/150?img=3",
        userName: "Rahul Sharma",
        email: "rahul@gmail.com",
        contact: "+91 9999999999",
        country: "India",
        receivedLikes: 65,
        sentLikes: 48,
        mode: "Premium",
        approved: true,
    },
    {
        id: 4,
        profile: "https://i.pravatar.cc/150?img=4",
        userName: "Sophia Brown",
        email: "sophia@gmail.com",
        contact: "+1 234567890",
        country: "USA",
        receivedLikes: 35,
        sentLikes: 19,
        mode: "Free",
        approved: true,
    },
    {
        id: 5,
        profile: "https://i.pravatar.cc/150?img=5",
        userName: "David Miller",
        email: "david@gmail.com",
        contact: "+61 456789123",
        country: "Australia",
        receivedLikes: 95,
        sentLikes: 70,
        mode: "Premium",
        approved: false,
    },
];

export default function AllUsers() {

    const [users, setUsers] =
        useState<User[]>(initialUsers);

    const [searchTerm, setSearchTerm] =
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
        useState<User | null>(null);

    const exportRef =
        useRef<HTMLDivElement | null>(null);

    const filteredUsers = users.filter(
        (user) =>
            user.userName
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            user.email
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
    );
    const startIndex =
        (currentPage - 1) * rowsPerPage;

    const paginatedUsers =
        filteredUsers.slice(
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

            setSelectedUsers(
                new Set(
                    paginatedUsers.map((_, index) => index)
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
        paginatedUsers.length > 0 &&
        filteredUsers.every((_, index) =>
            selectedUsers.has(index)
        );

    const isIndeterminate =
        paginatedUsers.some((_, index) =>
            selectedUsers.has(index)
        ) && !isAllSelected;

    const handleToggleApproval = (
        id: number
    ) => {

        setUsers(prev =>
            prev.map(user =>
                user.id === id
                    ? {
                        ...user,
                        approved: !user.approved,
                    }
                    : user
            )
        );

    };

    const handleDelete = () => {

        if (!userToDelete) return;

        setUsers(prev =>
            prev.filter(
                user =>
                    user.id !== userToDelete.id
            )
        );

        setSelectedUsers(new Set());

        setUserToDelete(null);

        setIsDeleteModalOpen(false);

    };

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

                    <div>

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

                                            console.table(filteredUsers);

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

                <div className="bg-white border border-gray-200 rounded-[10px] overflow-hidden">

                    <div className="overflow-x-auto">

                        <table className="w-full min-w-[1500px] border-collapse">

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
                                        label: "Total Received Like",
                                        width: "180px",
                                    },
                                    {
                                        label: "Total Sent Like",
                                        width: "170px",
                                    },
                                    {
                                        label: "Mode",
                                        width: "130px",
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
                            {paginatedUsers.map((user, idx) => (

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

                                    <td className="px-4 py-5">

                                        <img
                                            src={user.profile}
                                            alt={user.userName}
                                            className="w-11 h-11 rounded-full object-cover border border-gray-200 shadow-sm"
                                        />

                                    </td>

                                    {/* Username */}

                                    <td className="px-4 py-5">

                                        <p className="text-[15px] font-medium text-[#111827]">
                                            {user.userName}
                                        </p>

                                    </td>

                                    {/* Email */}

                                    <td className="px-4 py-5">

                                        <p className="text-[14px] text-gray-600">
                                            {user.email}
                                        </p>

                                    </td>

                                    {/* Contact */}

                                    <td className="px-4 py-5">

                                        <p className="text-[14px] text-gray-600">
                                            {user.contact}
                                        </p>

                                    </td>

                                    {/* Country */}

                                    <td className="px-4 py-5">

                                        <p className="text-[14px] text-gray-700">
                                            {user.country}
                                        </p>

                                    </td>

                                    {/* Total Received Likes */}

                                    <td className="px-4 py-5">

                                        <span className="text-[14px] font-medium text-[#111827]">
                                            {user.receivedLikes}
                                        </span>

                                    </td>

                                    {/* Total Sent Likes */}

                                    <td className="px-4 py-5">

                                        <span className="text-[14px] font-medium text-[#111827]">
                                            {user.sentLikes}
                                        </span>

                                    </td>

                                    {/* Mode */}

                                    <td className="px-4 py-5">

                                        <Tags
                                            text={user.mode}
                                            variant={
                                                user.mode === "Premium"
                                                    ? "green"
                                                    : "gray"
                                            }
                                        />

                                    </td>

                                    {/* Approved */}

                                    <td className="px-4 py-5">

                                        <TogglableSwitch
                                            isActive={user.approved}
                                            onToggle={() =>
                                                handleToggleApproval(user.id)
                                            }
                                            activeLabel="Yes"
                                            inactiveLabel="No"
                                        />

                                    </td>

                                    {/* Action */}

                                    <td className="px-4 py-5">

                                        <Action
                                            showView={true}
                                            showEdit={false}
                                            showDelete={true}
                                            onView={() =>
                                                console.log(
                                                    "View User",
                                                    user
                                                )
                                            }
                                            onDelete={() => {

                                                setUserToDelete(user);

                                                setIsDeleteModalOpen(true);

                                            }}
                                        />

                                    </td>

                                </tr>

                            ))}

                            {filteredUsers.length === 0 && (

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
                totalPages={Math.max(
                    1,
                    Math.ceil(
                        filteredUsers.length /
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