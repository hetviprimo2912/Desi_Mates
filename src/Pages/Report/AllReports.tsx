import { useState, useRef, useEffect } from "react";
import { ChevronDown, Download, Flag, Users, AlertTriangle, TrendingUp } from "lucide-react";
import StatsCard from "../../Components/StatsCard";
import Search from "../../Components/Search";
import TableHeader from "../../Components/TableHeader";
import Pagination from "../../Components/Pagination";
import Action from "../../Components/Action";
import CategoriesDeleteModal from "../../Components/CategoriesDeleteModal";

interface Report {
    id: number;
    fromUserName: string;
    toUserName: string;
    reportText: string;
}

const initialReports: Report[] = [
    { id: 1, fromUserName: "John Doe", toUserName: "Emma Watson", reportText: "Inappropriate behavior" },
    { id: 2, fromUserName: "Rahul Sharma", toUserName: "Priya Patel", reportText: "Spam messages" },
    { id: 3, fromUserName: "David Miller", toUserName: "Sophia Brown", reportText: "Fake profile" },
    { id: 4, fromUserName: "Arjun Singh", toUserName: "Ananya Mehta", reportText: "Harassment" },
    { id: 5, fromUserName: "Karan Kapoor", toUserName: "Neha Gupta", reportText: "Offensive content" },
    { id: 6, fromUserName: "Vikram Nair", toUserName: "Pooja Iyer", reportText: "Scam attempt" },
    { id: 7, fromUserName: "Rohan Verma", toUserName: "Simran Kaur", reportText: "Abusive language" },
];

const reportStats = [
    { label: "Total Reports", value: "7", sub: "All time reports", icon: <Flag size={24} className="text-red-600" />, bg: "bg-red-50" },
    { label: "Total Users", value: "14", sub: "Users involved", icon: <Users size={24} className="text-blue-600" />, bg: "bg-blue-50" },
    { label: "This Month", value: "3", sub: "New reports this month", icon: <AlertTriangle size={24} className="text-yellow-600" />, bg: "bg-yellow-50" },
    { label: "Resolved", value: "68%", sub: "Reports resolved", icon: <TrendingUp size={24} className="text-green-600" />, bg: "bg-green-50" },
];

export default function AllReports() {
    const [reports, setReports] = useState<Report[]>(initialReports);
    const [searchTerm, setSearchTerm] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedReports, setSelectedReports] = useState<Set<number>>(new Set());
    const [isExportOpen, setIsExportOpen] = useState(false);
    const [reportToDelete, setReportToDelete] = useState<number | null>(null);
    const exportRef = useRef<HTMLDivElement | null>(null);

    const filteredReports = reports.filter(r =>
        r.fromUserName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.toUserName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.reportText.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedReports = filteredReports.slice(startIndex, startIndex + rowsPerPage);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (exportRef.current && !exportRef.current.contains(e.target as Node)) setIsExportOpen(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => { setCurrentPage(1); }, [searchTerm]);

    const handleSelectAll = (checked: boolean) => {
        setSelectedReports(checked ? new Set(paginatedReports.map((_, i) => i)) : new Set());
    };

    const handleSelectReport = (index: number, checked: boolean) => {
        const updated = new Set(selectedReports);
        checked ? updated.add(index) : updated.delete(index);
        setSelectedReports(updated);
    };

    const handleDelete = () => {
        if (reportToDelete !== null) {
            setReports(prev => prev.filter(r => r.id !== reportToDelete));
            setReportToDelete(null);
        }
    };

    const isAllSelected = paginatedReports.length > 0 && paginatedReports.every((_, i) => selectedReports.has(i));
    const isIndeterminate = paginatedReports.some((_, i) => selectedReports.has(i)) && !isAllSelected;

    return (
        <div className="w-full min-h-screen text-[#111827]">
            <div className="px-4 sm:px-8 pt-4 pb-12">

                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-8">
                    <div>
                        <h1 className="text-[28px] font-semibold text-[#101828]">All Reports</h1>
                    </div>
                    <div className="flex items-center gap-3 w-full lg:w-auto lg:flex-1 lg:max-w-xl lg:justify-end">
                        <div className="flex-1 lg:max-w-sm">
                            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search Reports..." />
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
                                        onClick={() => { console.table(filteredReports); setIsExportOpen(false); }}
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
                <StatsCard stats={reportStats} cols={4} />

                {/* Table */}
                <div className="bg-white border border-gray-200 rounded-[10px] overflow-hidden">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full min-w-[700px] border-collapse">
                            <TableHeader
                                columns={[
                                    { label: "From User Name", width: "220px" },
                                    { label: "To User Name", width: "220px" },
                                    { label: "Report Text" },
                                    { label: "Action", width: "120px", className: "text-center" },
                                ]}
                                isAllSelected={isAllSelected}
                                isIndeterminate={isIndeterminate}
                                onSelectAll={handleSelectAll}
                            />
                            <tbody className="divide-y divide-gray-100">
                                {paginatedReports.map((report, idx) => (
                                    <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedReports.has(idx)}
                                                onChange={e => handleSelectReport(idx, e.target.checked)}
                                                className="rounded-md cursor-pointer border-gray-300 text-indigo-600 h-4.5 w-4.5"
                                            />
                                        </td>
                                        <td className="pl-18 px-4 py-5 whitespace-nowrap">
                                            <p className="text-[15px] font-medium text-[#111827]">{report.fromUserName}</p>
                                        </td>
                                        <td className="pl-16 px-4 py-5 whitespace-nowrap">
                                            <p className="text-[15px] font-medium text-[#111827]">{report.toUserName}</p>
                                        </td>
                                        <td className="pl-100 px-4 py-5">
                                            <p className="text-[15px] text-[#374151]">{report.reportText}</p>
                                        </td>
                                        <td className="px-4 py-5 text-center whitespace-nowrap">
                                            <Action
                                                showView={false}
                                                showEdit={false}
                                                showDelete={true}
                                                onDelete={() => setReportToDelete(report.id)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                                {filteredReports.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="py-10 text-center text-gray-400 italic">
                                            No reports found.
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
                    totalPages={Math.max(1, Math.ceil(filteredReports.length / rowsPerPage))}
                    rowsPerPage={rowsPerPage}
                    onPageChange={page => setCurrentPage(page)}
                    onRowsPerPageChange={rows => { setRowsPerPage(rows); setCurrentPage(1); }}
                    rowsPerPageOptions={[5, 10, 20, 50]}
                    showRowsPerPage={true}
                    showPageInfo={true}
                    className="mt-6"
                />
            </div>

            {reportToDelete !== null && (
                <CategoriesDeleteModal
                    onClose={() => setReportToDelete(null)}
                    onConfirm={handleDelete}
                />
            )}
        </div>
    );
}
