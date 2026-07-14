import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ChevronDown, Download, Users, UserCheck, Heart, Crown } from "lucide-react";

import StatsCards from "../../Components/StatsCard";
import Search from "../../Components/Search";
import TableHeader from "../../Components/TableHeader";
import Pagination from "../../Components/Pagination";
import Tags from "../../Components/Tags";
//import CategoriesDeleteModal from "../../Components/CategoriesDeleteModal";
import Action from "../../Components/Action";

import { subscriber_user_list } from "../../Store/slices/SubscribesUsersSlice/subscriber_user_list_thunk";
import { subscriber_user_card } from "../../Store/slices/SubscribesUsersSlice/subscriber_user_card_thunk";

import type { RootState, AppDispatch } from "../../Store/store";

export default function SubscribedUsers() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { users, pagination, loading } = useSelector((state: RootState) => state.subscriber_user_list);
    const { cards } = useSelector((state: RootState) => state.subscriber_user_card);

    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUsers, setSelectedUsers] = useState<Set<number>>(new Set());
    const [isExportOpen, setIsExportOpen] = useState(false);
    //const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    //const [userToDelete, setUserToDelete] = useState<number | null>(null);

    const exportRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        dispatch(subscriber_user_card());
    }, [dispatch]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 1000);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => { setCurrentPage(1); }, [searchTerm]);

    useEffect(() => {
        dispatch(subscriber_user_list({ search: debouncedSearch, page_no: currentPage, per_page: rowsPerPage }));
    }, [dispatch, debouncedSearch, currentPage, rowsPerPage]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (exportRef.current && !exportRef.current.contains(event.target as Node)) {
                setIsExportOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const stats = [
        {
            label: "Total Subscribers",
            value: cards?.total_subscriber ?? 0,
            icon: <Users size={24} className="text-blue-600" />,
            bg: "bg-blue-50",
        },
        {
            label: "Active Subscribers",
            value: cards?.active_users ?? 0,
            icon: <UserCheck size={24} className="text-green-600" />,
            bg: "bg-green-50",
        },
        {
            label: "Premium Plans",
            value: cards?.premium_plans ?? 0,
            icon: <Crown size={24} className="text-orange-600" />,
            bg: "bg-orange-50",
        },
        {
            label: "Expired Plans",
            value: cards?.expired_plans ?? 0,
            icon: <Heart size={24} className="text-red-500" />,
            bg: "bg-red-50",
        },
    ];

    const getInitials = (name?: string | null) => {
        if (!name) return "N/A";
        const words = name.trim().split(" ");
        if (words.length === 1) return words[0].charAt(0).toUpperCase();
        return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
    };

    const isAllSelected = users.length > 0 && users.every((u) => selectedUsers.has(u.id));
    const isIndeterminate = users.some((u) => selectedUsers.has(u.id)) && !isAllSelected;

    const handleSelectAll = (checked: boolean) => {
        setSelectedUsers(checked ? new Set(users.map((u) => u.id)) : new Set());
    };

    const handleSelectUser = (id: number, checked: boolean) => {
        const updated = new Set(selectedUsers);
        checked ? updated.add(id) : updated.delete(id);
        setSelectedUsers(updated);
    };

    // const handleDelete = () => {
    //     setUserToDelete(null);
    //     setIsDeleteModalOpen(false);
    // };

    const totalPages = pagination?.last_page ?? 1;

    return (
        <div className="w-full min-h-screen text-[#111827]">
            <div className="px-4 sm:px-8 pt-4 pb-12">

                {/* {isDeleteModalOpen && (
                    <CategoriesDeleteModal
                        onClose={() => { setIsDeleteModalOpen(false); setUserToDelete(null); }}
                        onConfirm={handleDelete}
                    />
                )} */}

                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-8">
                    <h1 className="text-[28px] font-semibold text-[#101828]">Subscribed Users</h1>

                    <div className="flex items-center gap-3 w-full lg:w-auto lg:flex-1 lg:max-w-xl lg:justify-end">
                        <div className="flex-1 lg:max-w-sm">
                            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search User..." />
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
                                        onClick={() => { console.table(users); setIsExportOpen(false); }}
                                        className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50"
                                    >
                                        Export as PDF
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <StatsCards stats={stats} cols={4} />

                <div className="bg-white border border-gray-200 rounded-[10px] overflow-hidden mt-6">
                    <div className="w-full overflow-x-auto">
                        <table className="min-w-[1100px] w-full border-collapse">
                            <TableHeader
                                columns={[
                                    { label: "Profile", width: "90px" },
                                    { label: "User Name", width: "180px" },
                                    { label: "Email", width: "220px" },
                                    { label: "Contact", width: "170px" },
                                    { label: "Country", width: "140px" },
                                    { label: "Looking For", width: "140px" },
                                    { label: "Approved", width: "150px", className: "text-center" },
                                    { label: "Action", width: "120px", className: "text-center" },
                                ]}
                                isAllSelected={isAllSelected}
                                isIndeterminate={isIndeterminate}
                                onSelectAll={handleSelectAll}
                            />

                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    [...Array(5)].map((_, i) => (
                                        <tr key={i} className="animate-pulse">
                                            {[...Array(9)].map((__, j) => (
                                                <td key={j} className="px-4 py-5">
                                                    <div className="h-4 rounded bg-gray-200 w-full" />
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                ) : users.length === 0 ? (
                                    <tr>
                                        <td colSpan={9} className="py-10 text-center text-gray-400 italic">
                                            No subscribed users found.
                                        </td>
                                    </tr>
                                ) : (
                                    users.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50 transition-colors">

                                            {/* Checkbox */}
                                            <td className="px-4 py-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedUsers.has(user.id)}
                                                    onChange={(e) => handleSelectUser(user.id, e.target.checked)}
                                                    className="rounded-md cursor-pointer border-gray-300 text-indigo-600 h-4.5 w-4.5"
                                                />
                                            </td>

                                            {/* Profile */}
                                            <td className="pl-9 px-4 py-5 whitespace-nowrap">
                                                <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold text-sm border border-gray-200">
                                                    {getInitials(user.name)}
                                                </div>
                                            </td>

                                            {/* Username */}
                                            <td className="pl-16 px-4 py-5 whitespace-nowrap">
                                                <p className="text-[15px] font-medium text-[#111827]">{user.name ?? "N/A"}</p>
                                            </td>

                                            {/* Email */}
                                            <td className="pl-20 px-4 py-5 whitespace-nowrap">
                                                <p className="text-[14px] text-gray-600">{user.email ?? "N/A"}</p>
                                            </td>

                                            {/* Contact */}
                                            <td className="pl-10 px-4 py-5 whitespace-nowrap">
                                                <p className="text-[14px] text-gray-600">{user.phone ?? "N/A"}</p>
                                            </td>

                                            {/* Country */}
                                            <td className="pl-16 px-4 py-5 whitespace-nowrap">
                                                <p className="text-[14px] text-gray-700">{user.country ?? "N/A"}</p>
                                            </td>

                                            {/* Looking For */}
                                            <td className="pl-14 px-4 py-5 whitespace-nowrap">
                                                <span className="text-pink-400 font-bold">{user.lookinfor ?? "N/A"}</span>
                                            </td>

                                            {/* Approved */}
                                            <td className="pl-10 px-4 py-5 whitespace-nowrap">
                                                <Tags
                                                    text={user.approved === 1 ? "Approved" : user.approved === 0 ? "Not Approved" : "N/A"}
                                                    variant={user.approved === 1 ? "green" : user.approved === 0 ? "red" : "gray"}
                                                />
                                            </td>

                                            {/* Action */}
                                            <td className="px-4 py-5 whitespace-nowrap">
                                                <Action
                                                    showView={true}
                                                    showEdit={false}
                                                    showDelete={true}
                                                    onView={() => navigate(`/sub-users/view/${user.id}`)}
                                                    //onDelete={() => { setUserToDelete(user.id); setIsDeleteModalOpen(true); }}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
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
