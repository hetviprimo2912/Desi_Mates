import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import type {
    RootState,
    AppDispatch,
} from "../../Store/store";
import { ChevronDown, Download, CreditCard, DollarSign, Users, TrendingUp } from "lucide-react";
import StatsCard from "../../Components/StatsCard";
import Search from "../../Components/Search";
import TableHeader from "../../Components/TableHeader";
import Pagination from "../../Components/Pagination";
import CategoriesDeleteModal from "../../Components/CategoriesDeleteModal";
import Action from "../../Components/Action";
import { payment_user_list } from "../../Store/slices/PaymentSlices/payment_user_list_thunk";
import { payment_card } from "../../Store/slices/PaymentSlices/payment_card_thunk";
import { delete_payment } from "../../Store/slices/PaymentSlices/delete_payment_thunk";

export default function PaymentList() {
    const dispatch = useDispatch<AppDispatch>();

    const {
        users: payments,
        pagination,
        loading,
    } = useSelector(
        (state: RootState) => state.payment_user_list
    );

    const {
        cards,
    } = useSelector(
        (state: RootState) => state.payment_card
    );
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPayments, setSelectedPayments] = useState<Set<number>>(new Set());
    const [isExportOpen, setIsExportOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [paymentToDelete, setPaymentToDelete] =
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
            payment_user_list({
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
    useEffect(() => {

        dispatch(payment_card());

    }, [dispatch]);
    const handleSelectAll = (checked: boolean) => {
        setSelectedPayments(
            checked ? new Set(payments.map((payment) => payment.id)) : new Set()
        );
    };

    const handleSelectPayment = (id: number, checked: boolean) => {
        const updated = new Set(selectedPayments);

        if (checked) {
            updated.add(id);
        } else {
            updated.delete(id);
        }

        setSelectedPayments(updated);
    };

    const isAllSelected =
        payments.length > 0 &&
        payments.every((payment) => selectedPayments.has(payment.id));

    const isIndeterminate =
        payments.some((payment) => selectedPayments.has(payment.id)) &&
        !isAllSelected;

    const handleDelete = async () => {

        if (!paymentToDelete) return;

        const result = await dispatch(
            delete_payment({
                id: paymentToDelete.payment_id,
            })
        );

        if (delete_payment.fulfilled.match(result)) {

            dispatch(
                payment_user_list({
                    search: debouncedSearch,
                    page_no: currentPage,
                    per_page: rowsPerPage,
                })
            );

            dispatch(payment_card());

            setSelectedPayments(new Set());

            setPaymentToDelete(null);

            setIsDeleteModalOpen(false);
        }
    };


    const paymentStats = [
        {
            label: "Total Payments",
            value: String(cards?.total_payment ?? 0),
            sub: "All transactions",
            icon: <CreditCard size={24} className="text-blue-600" />,
            bg: "bg-blue-50",
        },
        {
            label: "Total Revenue",
            value: `₹${cards?.total_revenue ?? 0}`,
            sub: "Across all payments",
            icon: <DollarSign size={24} className="text-green-600" />,
            bg: "bg-green-50",
        },
        {
            label: "Unique Users",
            value: String(cards?.unique_users ?? 0),
            sub: "Users who paid",
            icon: <Users size={24} className="text-purple-600" />,
            bg: "bg-purple-50",
        },
        {
            label: "This Month",
            value: `₹${cards?.this_month_revenue ?? 0}`,
            sub: "Revenue this month",
            icon: <TrendingUp size={24} className="text-orange-600" />,
            bg: "bg-orange-50",
        },
    ];
    return (
        <div className="w-full min-h-screen text-[#111827]">
            <div className="px-4 sm:px-8 pt-4 pb-12">

                {isDeleteModalOpen && (
                    <CategoriesDeleteModal
                        onClose={() => { setIsDeleteModalOpen(false); setPaymentToDelete(null); }}
                        onConfirm={handleDelete}
                    />
                )}

                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-8">
                    <div>
                        <h1 className="text-[28px] font-semibold text-[#101828]">Payment List</h1>
                    </div>
                    <div className="flex items-center gap-3 w-full lg:w-auto lg:flex-1 lg:max-w-xl lg:justify-end">
                        <div className="flex-1 lg:max-w-sm">
                            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search Payment..." />
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
                                        onClick={() => { console.table(payments); setIsExportOpen(false); }}
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
                    <StatsCard stats={paymentStats} cols={4} />
                )}

                {/* Table */}
                <div className="bg-white border border-gray-200 rounded-[10px] overflow-hidden">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full min-w-[900px] border-collapse">
                            <TableHeader
                                columns={[
                                    { label: "User Name", width: "180px" },
                                    { label: "Email", width: "220px" },
                                    { label: "Payment Method", width: "180px" },
                                    { label: "Price", width: "120px" },

                                    { label: "Action", width: "100px", className: "text-center" },
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
                                            <td className="px-4 py-5"><div className="h-4 w-48 rounded bg-gray-200" /></td>
                                            <td className="px-4 py-5"><div className="h-4 w-32 rounded bg-gray-200" /></td>
                                            <td className="px-4 py-5"><div className="h-4 w-20 rounded bg-gray-200" /></td>
                                            <td className="px-4 py-5"><div className="flex justify-center"><div className="h-8 w-16 rounded bg-gray-200" /></div></td>
                                        </tr>
                                    ))
                                ) : (
                                    <>
                                        {payments.map((payment, idx) => (
                                    <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="pl-12 px-4 py-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedPayments.has(idx)}
                                                onChange={e => handleSelectPayment(idx, e.target.checked)}
                                                className="rounded-md cursor-pointer border-gray-300 text-indigo-600 h-4.5 w-4.5"
                                            />
                                        </td>
                                        <td className="pl-26 px-4 py-5 whitespace-nowrap">
                                            <p className="text-[15px] font-medium text-[#111827]">{payment.name}</p>
                                        </td>
                                        <td className="pl-60 px-4 py-5 whitespace-nowrap">
                                            <p className="text-[14px] text-gray-600">{payment.email}</p>
                                        </td>
                                        <td className="pl-22 px-4 py-5 whitespace-nowrap">
                                            <p className="text-[14px] text-gray-700">{payment.payment_method}</p>
                                        </td>
                                        <td className="pl-20 px-4 py-5 whitespace-nowrap">
                                            <p className="text-[14px] font-medium text-[#111827]">{payment.price}</p>
                                        </td>

                                        <td className="px-4 py-5 text-center whitespace-nowrap">
                                            <Action
                                                showView={false}
                                                showEdit={false}
                                                showDelete={true}
                                                onDelete={() => { setPaymentToDelete(payment); setIsDeleteModalOpen(true); }}
                                            />
                                        </td>
                                    </tr>
                                ))}
                                        {!loading && payments.length === 0 && (
                                            <tr>
                                                <td colSpan={7} className="py-10 text-center text-gray-400 italic">
                                                    No payments found.
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
