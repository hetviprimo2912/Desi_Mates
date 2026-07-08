import { useState, useRef, useEffect } from "react";
import { ChevronDown, Download, Users, UserCheck, UserPlus, TrendingUp, Eye, EyeOff } from "lucide-react";
import StatsCard from "../../Components/StatsCard";
import Search from "../../Components/Search";
import TableHeader from "../../Components/TableHeader";
import Pagination from "../../Components/Pagination";
import Action from "../../Components/Action";
import CategoriesDeleteModal from "../../Components/CategoriesDeleteModal";

interface Manager {
    id: number;
    name: string;
    email: string;
    password: string;
}

const initialManagers: Manager[] = [
    { id: 1, name: "Amit Sharma", email: "amit@desimates.com", password: "Admin@123" },
    { id: 2, name: "Priya Patel", email: "priya@desimates.com", password: "Priya@456" },
    { id: 3, name: "Rahul Verma", email: "rahul@desimates.com", password: "Rahul@789" },
    { id: 4, name: "Sneha Iyer", email: "sneha@desimates.com", password: "Sneha@321" },
    { id: 5, name: "Karan Mehta", email: "karan@desimates.com", password: "Karan@654" },
];

const managerStats = [
    { label: "Total Managers", value: "5", sub: "All managers", icon: <Users size={24} className="text-blue-600" />, bg: "bg-blue-50" },
    { label: "Active Managers", value: "4", sub: "Currently active", icon: <UserCheck size={24} className="text-green-600" />, bg: "bg-green-50" },
    { label: "New This Month", value: "2", sub: "Added this month", icon: <UserPlus size={24} className="text-purple-600" />, bg: "bg-purple-50" },
    { label: "Events Managed", value: "18", sub: "Total events handled", icon: <TrendingUp size={24} className="text-yellow-600" />, bg: "bg-yellow-50" },
];

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
    const [managers, setManagers] = useState<Manager[]>(initialManagers);
    const [searchTerm, setSearchTerm] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedManagers, setSelectedManagers] = useState<Set<number>>(new Set());
    const [isExportOpen, setIsExportOpen] = useState(false);
    const [managerToDelete, setManagerToDelete] = useState<number | null>(null);
    const exportRef = useRef<HTMLDivElement | null>(null);

    const filteredManagers = managers.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedManagers = filteredManagers.slice(startIndex, startIndex + rowsPerPage);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (exportRef.current && !exportRef.current.contains(e.target as Node)) setIsExportOpen(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => { setCurrentPage(1); }, [searchTerm]);

    const handleSelectAll = (checked: boolean) => {
        setSelectedManagers(checked ? new Set(paginatedManagers.map((_, i) => i)) : new Set());
    };

    const handleSelectManager = (index: number, checked: boolean) => {
        const updated = new Set(selectedManagers);
        checked ? updated.add(index) : updated.delete(index);
        setSelectedManagers(updated);
    };

    const handleDelete = () => {
        if (managerToDelete !== null) {
            setManagers(prev => prev.filter(m => m.id !== managerToDelete));
            setManagerToDelete(null);
        }
    };

    const isAllSelected = paginatedManagers.length > 0 && paginatedManagers.every((_, i) => selectedManagers.has(i));
    const isIndeterminate = paginatedManagers.some((_, i) => selectedManagers.has(i)) && !isAllSelected;

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
                                        onClick={() => { console.table(filteredManagers); setIsExportOpen(false); }}
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
                <StatsCard stats={managerStats} cols={4} />

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
                                {paginatedManagers.map((manager, idx) => (
                                    <tr key={manager.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="pl-14 px-4 py-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedManagers.has(idx)}
                                                onChange={e => handleSelectManager(idx, e.target.checked)}
                                                className="rounded-md cursor-pointer border-gray-300 text-indigo-600 h-4.5 w-4.5"
                                            />
                                        </td>
                                        <td className="pl-40 px-4 py-5 whitespace-nowrap">
                                            <p className="text-[15px] font-medium text-[#111827]">{manager.name}</p>
                                        </td>
                                        <td className="pl-38 px-4 py-5 whitespace-nowrap">
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
                                             
                                                onEdit={() => console.log("Edit Manager", manager)}
                                                onDelete={() => setManagerToDelete(manager.id)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                                {filteredManagers.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="py-10 text-center text-gray-400 italic">
                                            No managers found.
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
                    totalPages={Math.max(1, Math.ceil(filteredManagers.length / rowsPerPage))}
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
                />
            )}
        </div>
    );
}
