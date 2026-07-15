import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../../Store/store";
import { ChevronDown, Download, Users, UserCheck, UserPlus, TrendingUp, Eye, EyeOff } from "lucide-react";
import StatsCard from "../../Components/StatsCard";
import Search from "../../Components/Search";
import TableHeader from "../../Components/TableHeader";
import Pagination from "../../Components/Pagination";
import Action from "../../Components/Action";
import CategoriesDeleteModal from "../../Components/CategoriesDeleteModal";
import { event_manager_list } from "../../Store/slices/MangerSlices/event_manager_list_thunk";
import { event_manager_card } from "../../Store/slices/MangerSlices/event_manager_card_thunk";
import { delete_event_manager } from "../../Store/slices/MangerSlices/delete_event_manager_thunk";

function PasswordCell({ password }: { password: string }) {
    const [visible, setVisible] = useState(false);
    return (
        <div className="flex items-center gap-2">
            <span className="text-[15px] font-medium text-[#111827] font-mono">
                {visible ? password : "••••••••"}
            </span>
            <button onClick={() => setVisible(v => !v)} className="text-gray-400 hover:text-gray-600">
                {visible ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
        </div>
    );
}

export default function ManagerList() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const {
        event_manager,
        pagination,
        loading,
    } = useSelector(
        (state: RootState) => state.event_manager_list
    );

    const {
        data: cardData,
    } = useSelector(
        (state: RootState) => state.event_manager_card
    );

    const {
        loading: deleteLoading,
    } = useSelector(
        (state: RootState) => state.delete_event_manager
    );
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedManagers, setSelectedManagers] = useState<Set<number>>(new Set());
    const [isExportOpen, setIsExportOpen] = useState(false);
    const [managerToDelete, setManagerToDelete] = useState<string | null>(null);
    const exportRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (exportRef.current && !exportRef.current.contains(e.target as Node)) setIsExportOpen(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => { setCurrentPage(1); }, [searchTerm]);
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 1000);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch]);
    useEffect(() => {
        dispatch(
            event_manager_list({
                search: debouncedSearch,
                page_no: currentPage,
                per_page: rowsPerPage,
            })
        );
    }, [dispatch, debouncedSearch, currentPage, rowsPerPage]);
    useEffect(() => {
        dispatch(event_manager_card());
    }, [dispatch]);
    const handleSelectAll = (checked: boolean) => {
        setSelectedManagers(
            checked
                ? new Set(event_manager.map((_, i) => i))
                : new Set()
        );
    };

    const handleSelectManager = (index: number, checked: boolean) => {
        const updated = new Set(selectedManagers);
        checked ? updated.add(index) : updated.delete(index);
        setSelectedManagers(updated);
    };

    const handleDelete = async () => {
        if (!managerToDelete) return;

        const result = await dispatch(
            delete_event_manager({
                id: managerToDelete,
            })
        );

        if (delete_event_manager.fulfilled.match(result)) {
            setManagerToDelete(null);

            dispatch(
                event_manager_list({
                    search: debouncedSearch,
                    page_no: currentPage,
                    per_page: rowsPerPage,
                })
            );

            dispatch(event_manager_card());
        }
    };
    const isAllSelected =
        event_manager.length > 0 &&
        event_manager.every((_, i) => selectedManagers.has(i));

    const isIndeterminate =
        event_manager.some((_, i) => selectedManagers.has(i)) &&
        !isAllSelected;
    const managerStats = [
        {
            label: "Total Managers",
            value: cardData?.total_managers ?? "0",
            sub: "All managers",
            icon: <Users size={24} className="text-blue-600" />,
            bg: "bg-blue-50",
        },
        {
            label: "Active Managers",
            value: cardData?.active_managers ?? "0",
            sub: "Currently active",
            icon: <UserCheck size={24} className="text-green-600" />,
            bg: "bg-green-50",
        },
        {
            label: "New This Month",
            value: cardData?.new_this_month ?? "0",
            sub: "Added this month",
            icon: <UserPlus size={24} className="text-purple-600" />,
            bg: "bg-purple-50",
        },
        {
            label: "Events Managed",
            value: cardData?.total_events ?? "0",
            sub: "Total events handled",
            icon: <TrendingUp size={24} className="text-yellow-600" />,
            bg: "bg-yellow-50",
        },
    ];
    return (
        <div className="w-full min-h-screen text-[#111827]">
            <div className="px-4 sm:px-8 pt-4 pb-12">

                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-8">
                    <div>
                        <h1 className="text-[28px] font-semibold text-[#101828]">Manager List</h1>
                    </div>
                    <div className="flex items-center gap-3 w-full lg:w-auto lg:flex-1 lg:max-w-xl lg:justify-end">
                        <div className="flex-1 lg:max-w-sm">
                            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search Managers..." />
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
                                        onClick={() => { console.table(event_manager); setIsExportOpen(false); }}
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
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-7 animate-pulse">
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="bg-white border border-gray-200 rounded-xl p-6">
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
                    <StatsCard stats={managerStats} cols={4} />
                )}

                {/* Table */}
                <div className="bg-white border border-gray-200 rounded-[10px] overflow-hidden">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full min-w-[750px] border-collapse">
                            <TableHeader
                                columns={[
                                    { label: "Manager Name", width: "220px" },
                                    { label: "Manager Email", width: "260px" },
                                    { label: "Manager Password", width: "220px" },
                                    { label: "Action", width: "140px", className: "text-center" },
                                ]}
                                isAllSelected={isAllSelected}
                                isIndeterminate={isIndeterminate}
                                onSelectAll={handleSelectAll}
                            />
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    [...Array(rowsPerPage)].map((_, index) => (
                                        <tr key={index} className="animate-pulse">
                                            <td className="px-4 py-5"><div className="h-4 w-4 rounded bg-gray-200" /></td>
                                            <td className="px-4 py-5"><div className="h-4 w-36 rounded bg-gray-200" /></td>
                                            <td className="px-4 py-5"><div className="h-4 w-48 rounded bg-gray-200" /></td>
                                            <td className="px-4 py-5"><div className="h-4 w-28 rounded bg-gray-200" /></td>
                                            <td className="px-4 py-5"><div className="flex justify-center"><div className="h-8 w-16 rounded bg-gray-200" /></div></td>
                                        </tr>
                                    ))
                                ) : (
                                    <>
                                        {event_manager.map((manager, idx) => (
                                    <tr key={manager.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="pl-14 px-4 py-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedManagers.has(idx)}
                                                onChange={e => handleSelectManager(idx, e.target.checked)}
                                                className="rounded-md cursor-pointer border-gray-300 text-indigo-600 h-4.5 w-4.5"
                                            />
                                        </td>
                                        <td className="pl-34 px-4 py-5 whitespace-nowrap">
                                            <p className="text-[15px] font-medium text-[#111827]">{manager.name}</p>
                                        </td>
                                        <td className="pl-44 px-4 py-5 whitespace-nowrap">
                                            <p className="text-[15px] text-[#374151]">{manager.email}</p>
                                        </td>
                                        <td className="pl-34 px-4 py-5 whitespace-nowrap">
                                            <PasswordCell password={manager.password} />
                                        </td>
                                        <td className="px-4 py-5 text-center whitespace-nowrap">
                                            <Action
                                                showView={false}
                                                showEdit={true}
                                                showDelete={true}
                                                onEdit={() => navigate(`/event-manager/edit/${manager.id}`)}
                                                onDelete={() => setManagerToDelete(manager.id)}
                                            />
                                        </td>
                                    </tr>
                                        ))}
                                        {!loading && event_manager.length === 0 && (
                                            <tr>
                                                <td colSpan={5} className="py-10 text-center text-gray-400 italic">
                                                    No managers found.
                                                </td>
                                            </tr>
                                        )}
                                    </>
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
                    onPageChange={page => setCurrentPage(page)}
                    onRowsPerPageChange={rows => { setRowsPerPage(rows); setCurrentPage(1); }}
                    rowsPerPageOptions={[5, 10, 20, 50]}
                    showRowsPerPage={true}
                    showPageInfo={true}
                    className="mt-6"
                />
            </div>

            {managerToDelete !== null && (
                <CategoriesDeleteModal
                    onClose={() => setManagerToDelete(null)}
                    onConfirm={handleDelete}
                    loading={deleteLoading}
                />
            )}
        </div>
    );
}
