import { useState, useRef, useEffect } from "react";
import { ChevronDown, Download, CreditCard, DollarSign, Users, TrendingUp } from "lucide-react";
import StatsCard from "../../Components/StatsCard";
import Search from "../../Components/Search";
import TableHeader from "../../Components/TableHeader";
import Pagination from "../../Components/Pagination";
import CategoriesDeleteModal from "../../Components/CategoriesDeleteModal";
import Action from "../../Components/Action";

interface Payment {
    id: number;
    userName: string;
    email: string;
    paymentMethod: string;
    price: number;
    date: string;
}

const initialPayments: Payment[] = [
    { id: 1, userName: "John Doe", email: "john@gmail.com", paymentMethod: "Credit Card", price: 49, date: "2026-07-06T19:22:00" },
    { id: 2, userName: "Emma Watson", email: "emma@gmail.com", paymentMethod: "UPI", price: 125, date: "2026-07-05T14:10:00" },
    { id: 3, userName: "Rahul Sharma", email: "rahul@gmail.com", paymentMethod: "Net Banking", price: 75, date: "2026-07-04T11:30:00" },
    { id: 4, userName: "Sophia Brown", email: "sophia@gmail.com", paymentMethod: "Debit Card", price: 60, date: "2026-07-03T09:15:00" },
    { id: 5, userName: "David Miller", email: "david@gmail.com", paymentMethod: "PayPal", price: 30, date: "2026-07-02T16:45:00" },
    { id: 6, userName: "Priya Patel", email: "priya@gmail.com", paymentMethod: "UPI", price: 49, date: "2026-07-01T10:00:00" },
    { id: 7, userName: "Arjun Singh", email: "arjun@gmail.com", paymentMethod: "Credit Card", price: 125, date: "2026-06-30T13:20:00" },
];

const paymentStats = [
    { label: "Total Payments", value: "7", sub: "All transactions", icon: <CreditCard size={24} className="text-blue-600" />, bg: "bg-blue-50" },
    { label: "Total Revenue", value: "₹513", sub: "Across all payments", icon: <DollarSign size={24} className="text-green-600" />, bg: "bg-green-50" },
    { label: "Unique Users", value: "7", sub: "Users who paid", icon: <Users size={24} className="text-purple-600" />, bg: "bg-purple-50" },
    { label: "This Month", value: "₹388", sub: "Revenue this month", icon: <TrendingUp size={24} className="text-orange-600" />, bg: "bg-orange-50" },
];

export default function PaymentList() {
    const [payments, setPayments] = useState<Payment[]>(initialPayments);
    const [searchTerm, setSearchTerm] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPayments, setSelectedPayments] = useState<Set<number>>(new Set());
    const [isExportOpen, setIsExportOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [paymentToDelete, setPaymentToDelete] = useState<Payment | null>(null);
    const exportRef = useRef<HTMLDivElement | null>(null);

    const filteredPayments = payments.filter(p =>
        p.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedPayments = filteredPayments.slice(startIndex, startIndex + rowsPerPage);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (exportRef.current && !exportRef.current.contains(e.target as Node)) setIsExportOpen(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => { setCurrentPage(1); }, [searchTerm]);

    const handleSelectAll = (checked: boolean) => {
        setSelectedPayments(checked ? new Set(paginatedPayments.map((_, i) => i)) : new Set());
    };

    const handleSelectPayment = (index: number, checked: boolean) => {
        const updated = new Set(selectedPayments);
        checked ? updated.add(index) : updated.delete(index);
        setSelectedPayments(updated);
    };

    const isAllSelected = paginatedPayments.length > 0 && paginatedPayments.every((_, i) => selectedPayments.has(i));
    const isIndeterminate = paginatedPayments.some((_, i) => selectedPayments.has(i)) && !isAllSelected;

    const handleDelete = () => {
        if (!paymentToDelete) return;
        setPayments(prev => prev.filter(p => p.id !== paymentToDelete.id));
        setSelectedPayments(new Set());
        setPaymentToDelete(null);
        setIsDeleteModalOpen(false);
    };

    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });

    const formatTime = (date: string) =>
        new Date(date).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

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
                                        onClick={() => { console.table(filteredPayments); setIsExportOpen(false); }}
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
                <StatsCard stats={paymentStats} cols={4} />

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
                                    { label: "Date", width: "180px" },
                                    { label: "Action", width: "100px", className: "text-center" },
                                ]}
                                isAllSelected={isAllSelected}
                                isIndeterminate={isIndeterminate}
                                onSelectAll={handleSelectAll}
                            />
                            <tbody className="divide-y divide-gray-100">
                                {paginatedPayments.map((payment, idx) => (
                                    <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="pl-12 px-4 py-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedPayments.has(idx)}
                                                onChange={e => handleSelectPayment(idx, e.target.checked)}
                                                className="rounded-md cursor-pointer border-gray-300 text-indigo-600 h-4.5 w-4.5"
                                            />
                                        </td>
                                        <td className="pl-14 px-4 py-5 whitespace-nowrap">
                                            <p className="text-[15px] font-medium text-[#111827]">{payment.userName}</p>
                                        </td>
                                        <td className="pl-26 px-4 py-5 whitespace-nowrap">
                                            <p className="text-[14px] text-gray-600">{payment.email}</p>
                                        </td>
                                        <td className="pl-22 px-4 py-5 whitespace-nowrap">
                                            <p className="text-[14px] text-gray-700">{payment.paymentMethod}</p>
                                        </td>
                                        <td className="pl-20 px-4 py-5 whitespace-nowrap">
                                            <p className="text-[14px] font-medium text-[#111827]">₹{payment.price}</p>
                                        </td>
                                        <td className="pl-20 px-4 py-5 whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <span className="text-[15px] font-medium text-[#111827]">{formatDate(payment.date)}</span>
                                                <span className="text-[14px] text-gray-500 mt-1">{formatTime(payment.date)}</span>
                                            </div>
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
                                {filteredPayments.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="py-10 text-center text-gray-400 italic">
                                            No payments found.
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
                    totalPages={Math.max(1, Math.ceil(filteredPayments.length / rowsPerPage))}
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
