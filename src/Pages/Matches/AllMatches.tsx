import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import type {
    RootState,
    AppDispatch,
} from "../../Store/store";
import { ChevronDown, Download, Heart, Users, Shuffle, TrendingUp } from "lucide-react";
import StatsCard from "../../Components/StatsCard";
import Search from "../../Components/Search";
import TableHeader from "../../Components/TableHeader";
import Pagination from "../../Components/Pagination";
import { matches_user_list } from "../../Store/slices/MatchesSlices/matches_user_list_thunk";
import { matches_card } from "../../Store/slices/MatchesSlices/matches_card_thunk";

export default function AllMatches() {
    const dispatch = useDispatch<AppDispatch>();

    const {
        matches,
        pagination,
        loading,
    } = useSelector(
        (state: RootState) => state.matches_user_list
    );

    const {
        cards,
    } = useSelector(
        (state: RootState) => state.matches_card
    );
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedMatches, setSelectedMatches] = useState<Set<number>>(new Set());
    const [isExportOpen, setIsExportOpen] = useState(false);
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
            matches_user_list({

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

        dispatch(matches_card());

    }, [dispatch]);

    const handleSelectAll = (checked: boolean) => {

        setSelectedMatches(

            checked
                ? new Set(matches.map(match => match.id))
                : new Set()

        );

    };

    const handleSelectMatch = (id: number, checked: boolean) => {

        const updated = new Set(selectedMatches);

        if (checked) {

            updated.add(id);

        } else {

            updated.delete(id);

        }

        setSelectedMatches(updated);

    };

    const isAllSelected =

        matches.length > 0 &&
        matches.every(match => selectedMatches.has(match.id));

    const isIndeterminate =

        matches.some(match => selectedMatches.has(match.id))
        && !isAllSelected;
    const matchStats = [

        {
            label: "Total Matches",
            value: String(cards?.total_matches ?? 0),
            sub: "All time matches",
            icon: <Heart size={24} className="text-red-600" />,
            bg: "bg-red-50"
        },

        {
            label: "Total Users",
            value: String(cards?.total_users ?? 0),
            sub: "Users in matches",
            icon: <Users size={24} className="text-blue-600" />,
            bg: "bg-blue-50"
        },

        {
            label: "This Month",
            value: String(cards?.this_month ?? 0),
            sub: "New matches this month",
            icon: <Shuffle size={24} className="text-purple-600" />,
            bg: "bg-purple-50"
        },

        {
            label: "Match Rate",
            value: cards?.match_rate ?? "0%",
            sub: "Successful connections",
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
                                        onClick={() => { console.table(matches); setIsExportOpen(false); }}
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
                    <StatsCard stats={matchStats} cols={4} />
                )}

                {/* Table */}
                <div className="bg-white border border-gray-200 rounded-[10px] overflow-hidden">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full min-w-[600px] border-collapse">
                            <TableHeader
                                columns={[
                                    { label: "From User Name", width: "33%" },
                                    { label: "To User Name", width: "33%" },
                                    { label: "Created At", width: "33%" },
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
                                            <td className="px-4 py-5"><div className="h-4 w-28 rounded bg-gray-200" /></td>
                                        </tr>
                                    ))
                                ) : (
                                    <>
                                        {matches.map((match) => (
                                    <tr key={match.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedMatches.has(match.id)}

                                                onChange={(e) => handleSelectMatch(match.id, e.target.checked)}
                                                className="rounded-md cursor-pointer border-gray-300 text-indigo-600 h-4.5 w-4.5"
                                            />
                                        </td>
                                        <td className="pl-54 px-4 py-5 whitespace-nowrap">
                                            <p className="text-[15px] font-medium text-[#111827]">{match.from_user_name}</p>
                                        </td>
                                        <td className="pl-56 px-4 py-5 whitespace-nowrap">
                                            <p className="text-[15px] font-medium text-[#111827]">{match.to_user_name}</p>
                                        </td>
                                        <td className="pl-54 px-4 py-5 whitespace-nowrap">
                                            <p className="text-[14px] text-gray-600">{new Date(match.created_at).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "2-digit",
                                                year: "numeric"
                                            })}</p>
                                        </td>
                                    </tr>
                                ))}
                                        {!loading && matches.length === 0 && (
                                            <tr>
                                                <td colSpan={4} className="py-10 text-center text-gray-400 italic">
                                                    No matches found.
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
        </div>
    );
}
