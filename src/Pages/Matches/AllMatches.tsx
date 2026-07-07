import { useState, useRef, useEffect } from "react";
import { ChevronDown, Download, Heart, Users, Shuffle, TrendingUp } from "lucide-react";
import StatsCard from "../../Components/StatsCard";
import Search from "../../Components/Search";
import TableHeader from "../../Components/TableHeader";
import Pagination from "../../Components/Pagination";
import Action from "../../Components/Action";

interface Match {
    id: number;
    fromUserName: string;
    toUserName: string;
}

const initialMatches: Match[] = [
    { id: 1, fromUserName: "John Doe", toUserName: "Emma Watson" },
    { id: 2, fromUserName: "Rahul Sharma", toUserName: "Priya Patel" },
    { id: 3, fromUserName: "David Miller", toUserName: "Sophia Brown" },
    { id: 4, fromUserName: "Arjun Singh", toUserName: "Ananya Mehta" },
    { id: 5, fromUserName: "Karan Kapoor", toUserName: "Neha Gupta" },
    { id: 6, fromUserName: "Vikram Nair", toUserName: "Pooja Iyer" },
    { id: 7, fromUserName: "Rohan Verma", toUserName: "Simran Kaur" },
];

const matchStats = [
    { label: "Total Matches", value: "7", sub: "All time matches", icon: <Heart size={24} className="text-red-600" />, bg: "bg-red-50" },
    { label: "Total Users", value: "14", sub: "Users in matches", icon: <Users size={24} className="text-blue-600" />, bg: "bg-blue-50" },
    { label: "This Month", value: "3", sub: "New matches this month", icon: <Shuffle size={24} className="text-purple-600" />, bg: "bg-purple-50" },
    { label: "Match Rate", value: "68%", sub: "Successful connections", icon: <TrendingUp size={24} className="text-green-600" />, bg: "bg-green-50" },
];

export default function AllMatches() {
    const [matches] = useState<Match[]>(initialMatches);
    const [searchTerm, setSearchTerm] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedMatches, setSelectedMatches] = useState<Set<number>>(new Set());
    const [isExportOpen, setIsExportOpen] = useState(false);
    const exportRef = useRef<HTMLDivElement | null>(null);

    const filteredMatches = matches.filter(m =>
        m.fromUserName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.toUserName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedMatches = filteredMatches.slice(startIndex, startIndex + rowsPerPage);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (exportRef.current && !exportRef.current.contains(e.target as Node)) setIsExportOpen(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => { setCurrentPage(1); }, [searchTerm]);

    const handleSelectAll = (checked: boolean) => {
        setSelectedMatches(checked ? new Set(paginatedMatches.map((_, i) => i)) : new Set());
    };

    const handleSelectMatch = (index: number, checked: boolean) => {
        const updated = new Set(selectedMatches);
        checked ? updated.add(index) : updated.delete(index);
        setSelectedMatches(updated);
    };

    const isAllSelected = paginatedMatches.length > 0 && paginatedMatches.every((_, i) => selectedMatches.has(i));
    const isIndeterminate = paginatedMatches.some((_, i) => selectedMatches.has(i)) && !isAllSelected;

    return (
        <div className="w-full min-h-screen text-[#111827]">
            <div className="px-4 sm:px-8 pt-4 pb-12">

                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-8">
                    <div>
                        <h1 className="text-[28px] font-semibold text-[#101828]">All Matches</h1>
                    </div>
                    <div className="flex items-center gap-3 w-full lg:w-auto lg:flex-1 lg:max-w-xl lg:justify-end">
                        <div className="flex-1 lg:max-w-sm">
                            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search Matches..." />
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
                                        onClick={() => { console.table(filteredMatches); setIsExportOpen(false); }}
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
                <StatsCard stats={matchStats} cols={4} />

                {/* Table */}
                <div className="bg-white border border-gray-200 rounded-[10px] overflow-hidden">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full min-w-[600px] border-collapse">
                            <TableHeader
                                columns={[
                                    { label: "From User Name", width: "300px" },
                                    { label: "To User Name", width: "300px" },
                                    { label: "Action", width: "120px", className: "text-center" },
                                ]}
                                isAllSelected={isAllSelected}
                                isIndeterminate={isIndeterminate}
                                onSelectAll={handleSelectAll}
                            />
                            <tbody className="divide-y divide-gray-100">
                                {paginatedMatches.map((match, idx) => (
                                    <tr key={match.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedMatches.has(idx)}
                                                onChange={e => handleSelectMatch(idx, e.target.checked)}
                                                className="rounded-md cursor-pointer border-gray-300 text-indigo-600 h-4.5 w-4.5"
                                            />
                                        </td>
                                        <td className="pl-80 px-4 py-5 whitespace-nowrap">
                                            <p className="text-[15px] font-medium text-[#111827]">{match.fromUserName}</p>
                                        </td>
                                        <td className="pl-60 px-4 py-5 whitespace-nowrap">
                                            <p className="text-[15px] font-medium text-[#111827]">{match.toUserName}</p>
                                        </td>
                                        <td className="px-4 py-5 text-center whitespace-nowrap">
                                            <Action
                                                showView={true}
                                                showEdit={false}
                                                showDelete={false}
                                                onView={() => console.log("View Match", match)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                                {filteredMatches.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="py-10 text-center text-gray-400 italic">
                                            No matches found.
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
                    totalPages={Math.max(1, Math.ceil(filteredMatches.length / rowsPerPage))}
                    rowsPerPage={rowsPerPage}
                    onPageChange={page => setCurrentPage(page)}
                    onRowsPerPageChange={rows => { setRowsPerPage(rows); setCurrentPage(1); }}
                    rowsPerPageOptions={[5, 10, 20, 50]}
                    showRowsPerPage={true}
                    showPageInfo={true}
                    className="mt-6"
                />
            </div>
        </div>
    );
}
