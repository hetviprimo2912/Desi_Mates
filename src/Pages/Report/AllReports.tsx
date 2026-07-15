import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import type {
    RootState,
    AppDispatch,
} from "../../Store/store";
import { ChevronDown, Download, Flag, Users, AlertTriangle, TrendingUp } from "lucide-react";
import StatsCard from "../../Components/StatsCard";
import Search from "../../Components/Search";
import TableHeader from "../../Components/TableHeader";
import Pagination from "../../Components/Pagination";
import Action from "../../Components/Action";
import CategoriesDeleteModal from "../../Components/CategoriesDeleteModal";
import { report_list } from "../../Store/slices/ReportSlices/report_list_thunk";
import { report_card } from "../../Store/slices/ReportSlices/report_card_thunk";
import { delete_report } from "../../Store/slices/ReportSlices/delete_report_thunk";

export default function AllReports() {
    const dispatch = useDispatch<AppDispatch>();

    const {
        reports,
        pagination,
        loading,
    } = useSelector(
        (state: RootState) => state.report_list
    );

    const {
        cards,
    } = useSelector(
        (state: RootState) => state.report_card
    );
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedReports, setSelectedReports] = useState<Set<number>>(new Set());
    const [isExportOpen, setIsExportOpen] = useState(false);
    const [reportToDelete, setReportToDelete] =
        useState<any>(null);
    const exportRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (exportRef.current && !exportRef.current.contains(e.target as Node)) setIsExportOpen(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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
            report_list({

                search: debouncedSearch,

                page_no: currentPage,

                per_page: rowsPerPage

            })
        );

    }, [
        dispatch,
        debouncedSearch,
        currentPage,
        rowsPerPage
    ]);
    useEffect(() => {

        dispatch(report_card());

    }, [dispatch]);

    const handleSelectAll = (checked: boolean) => {

        setSelectedReports(

            checked
                ? new Set(reports.map(report => report.id))
                : new Set()

        );

    };

    const handleSelectReport = (id: number, checked: boolean) => {

        const updated = new Set(selectedReports);

        if (checked) {

            updated.add(id);

        } else {

            updated.delete(id);

        }

        setSelectedReports(updated);

    };
    const handleDelete = async () => {

        if (!reportToDelete) return;

        const result = await dispatch(
            delete_report({
                id: reportToDelete.id,
            })
        );

        if (delete_report.fulfilled.match(result)) {

            dispatch(
                report_list({
                    search: debouncedSearch,
                    page_no: currentPage,
                    per_page: rowsPerPage,
                })
            );

            dispatch(report_card());

            setSelectedReports(new Set());

            setReportToDelete(null);
        }
    };
    const isAllSelected =

        reports.length > 0 &&
        reports.every(report => selectedReports.has(report.id));

    const isIndeterminate =

        reports.some(report => selectedReports.has(report.id))
        && !isAllSelected;
    const reportStats = [

        {
            label: "Total Reports",
            value: String(cards?.total_reports ?? 0),
            sub: "All time reports",
            icon: <Flag size={24} className="text-red-600" />,
            bg: "bg-red-50"
        },

        {
            label: "Total Users",
            value: String(cards?.total_users ?? 0),
            sub: "Users involved",
            icon: <Users size={24} className="text-blue-600" />,
            bg: "bg-blue-50"
        },

        {
            label: "This Month",
            value: String(cards?.this_month ?? 0),
            sub: "New reports this month",
            icon: <AlertTriangle size={24} className="text-yellow-600" />,
            bg: "bg-yellow-50"
        },

        {
            label: "Resolved",
            value: String(cards?.resolved ?? 0),
            sub: "Reports resolved",
            icon: <TrendingUp size={24} className="text-green-600" />,
            bg: "bg-green-50"
        }

    ];
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
                                        onClick={() => { console.table(reports); setIsExportOpen(false); }}
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
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-white border border-gray-200 rounded-xl p-6">
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
                    <StatsCard stats={reportStats} cols={4} />
                )}

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
                                {loading ? (
                                    [...Array(rowsPerPage)].map((_, i) => (
                                        <tr key={i} className="animate-pulse">
                                            <td className="px-4 py-5"><div className="h-4 w-4 rounded bg-gray-200" /></td>
                                            <td className="px-4 py-5"><div className="h-4 w-36 rounded bg-gray-200" /></td>
                                            <td className="px-4 py-5"><div className="h-4 w-36 rounded bg-gray-200" /></td>
                                            <td className="px-4 py-5"><div className="h-4 w-56 rounded bg-gray-200" /></td>
                                            <td className="px-4 py-5"><div className="flex justify-center"><div className="h-8 w-16 rounded bg-gray-200" /></div></td>
                                        </tr>
                                    ))
                                ) : (
                                    <>
                                        {reports.map((report) => (
                                    <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedReports.has(report.id)}

                                                onChange={(e) => handleSelectReport(report.id, e.target.checked)}
                                                className="rounded-md cursor-pointer border-gray-300 text-indigo-600 h-4.5 w-4.5"
                                            />
                                        </td>
                                        <td className="pl-18 px-4 py-5 whitespace-nowrap">
                                            <p className="text-[15px] font-medium text-[#111827]">{report.from_user_name}</p>
                                        </td>
                                        <td className="pl-16 px-4 py-5 whitespace-nowrap">
                                            <p className="text-[15px] font-medium text-[#111827]">{report.to_user_name}</p>
                                        </td>
                                        <td className="pl-100 px-4 py-5">
                                            <p className="text-[15px] text-[#374151]">{report.report_reason}</p>
                                        </td>
                                        <td className="px-4 py-5 text-center whitespace-nowrap">
                                            <Action
                                                showView={false}
                                                showEdit={false}
                                                showDelete={true}
                                                onDelete={() => setReportToDelete(report)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                                        {!loading && reports.length === 0 && (
                                            <tr>
                                                <td colSpan={5} className="py-10 text-center text-gray-400 italic">
                                                    No reports found.
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
                    totalPages={pagination?.last_page ?? 1}
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
