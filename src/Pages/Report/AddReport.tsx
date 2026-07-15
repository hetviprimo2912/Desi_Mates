import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Flag, User, Users, FileText, Save, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import type { AppDispatch, RootState } from "../../Store/store";
import { get_username_list } from "../../Store/slices/ReportSlices/username_list_thunk";
import { add_report } from "../../Store/slices/ReportSlices/add_report_thunk";
import { reset_add_report } from "../../Store/slices/ReportSlices/add_report_slice";
import CustomSelect from "../../Components/CustomSelect";

export default function AddReport() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { users, loading: usersLoading } = useSelector((state: RootState) => state.username_list);
    const { loading: saving, success, error } = useSelector((state: RootState) => state.add_report);

    const [userId, setUserId] = useState("");
    const [peerId, setPeerId] = useState("");
    const [isReport, setIsReport] = useState("");
    const [errors, setErrors] = useState<{ user_id?: string; peer_id?: string; is_report?: string }>({});

    useEffect(() => {
        dispatch(get_username_list());
        return () => { dispatch(reset_add_report()); };
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                navigate("/report/all-reports");
            }, 1500);
        }
    }, [success, navigate]);

    const userOptions = users.map((u) => ({ value: String(u.id), label: u.name }));

    const validate = () => {
        const e: typeof errors = {};
        if (!userId) e.user_id = "Please select a user (reported by)";
        if (!peerId) e.peer_id = "Please select a peer (reported user)";
        if (userId && peerId && userId === peerId) e.peer_id = "User and Peer cannot be the same";
        if (!isReport.trim()) e.is_report = "Report reason is required";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSave = () => {
        if (!validate()) return;
        dispatch(add_report({ user_id: userId, peer_id: peerId, is_report: isReport.trim() }));
    };

    return (
        <div className="w-full min-h-screen bg-gray-50">
            <div className="px-4 sm:px-8 pt-6 pb-16">

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-8">
                    <div>
                        <h1 className="text-[28px] font-bold text-[#101828]">Add Report</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            <span
                                className="text-[#2563EB] cursor-pointer hover:underline"
                                onClick={() => navigate("/report/all-reports")}
                            >
                                Reports
                            </span>
                            <span className="mx-1.5 text-gray-300">/</span>
                            <span className="text-gray-500">Add Report</span>
                        </p>
                    </div>
                    <button
                        onClick={() => navigate("/report/all-reports")}
                        className="flex items-center gap-2 px-4 py-2 rounded-[10px] border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-100 transition-colors self-start"
                    >
                        <ArrowLeft size={15} />
                        Back to Reports
                    </button>
                </div>

                {/* Success / Error banners */}
                {success && (
                    <div className="flex items-center gap-3 px-5 py-3.5 mb-6 bg-emerald-50 border border-emerald-200 rounded-[12px] text-emerald-700 text-sm font-medium">
                        <CheckCircle2 size={18} />
                        Report added successfully! Redirecting...
                    </div>
                )}
                {error && (
                    <div className="flex items-center gap-3 px-5 py-3.5 mb-6 bg-red-50 border border-red-200 rounded-[12px] text-red-600 text-sm font-medium">
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                {/* Card */}
                <div className="bg-white rounded-[16px] border border-gray-200 shadow-sm overflow-hidden">

                    {/* Card Header */}
                    <div className="flex items-center gap-4 px-6 py-5 border-b border-gray-100 border-l-4 border-l-red-500">
                        <div className="w-10 h-10 rounded-[10px] bg-red-50 flex items-center justify-center shrink-0">
                            <Flag size={20} className="text-red-500" />
                        </div>
                        <div>
                            <h2 className="text-[16px] font-semibold text-[#101828]">Report Details</h2>
                            <p className="text-[13px] text-gray-500">Fill in the details to file a new report</p>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="p-6 sm:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* User (Reported By) */}
                            <div>
                                <label className="block mb-1.5 text-[13px] font-semibold text-[#374151] uppercase tracking-wide">
                                    User <span className="text-red-500">*</span>
                                </label>
                                <p className="text-[12px] text-gray-400 mb-2">The user who is filing the report</p>
                                <CustomSelect
                                    value={userId}
                                    onChange={(val) => { setUserId(val); setErrors((e) => ({ ...e, user_id: undefined })); }}
                                    options={userOptions}
                                    placeholder="Select reported by user"
                                    icon={<User size={15} />}
                                    loading={usersLoading}
                                    error={!!errors.user_id}
                                />
                                {errors.user_id && (
                                    <p className="mt-1.5 text-[12px] text-red-500 flex items-center gap-1">
                                        <AlertCircle size={12} /> {errors.user_id}
                                    </p>
                                )}
                            </div>

                            {/* Peer (Reported User) */}
                            <div>
                                <label className="block mb-1.5 text-[13px] font-semibold text-[#374151] uppercase tracking-wide">
                                    Peer <span className="text-red-500">*</span>
                                </label>
                                <p className="text-[12px] text-gray-400 mb-2">The user being reported</p>
                                <CustomSelect
                                    value={peerId}
                                    onChange={(val) => { setPeerId(val); setErrors((e) => ({ ...e, peer_id: undefined })); }}
                                    options={userOptions}
                                    placeholder="Select reported user"
                                    icon={<Users size={15} />}
                                    loading={usersLoading}
                                    error={!!errors.peer_id}
                                />
                                {errors.peer_id && (
                                    <p className="mt-1.5 text-[12px] text-red-500 flex items-center gap-1">
                                        <AlertCircle size={12} /> {errors.peer_id}
                                    </p>
                                )}
                            </div>

                            {/* Report Reason */}
                            <div className="md:col-span-2">
                                <label className="block mb-1.5 text-[13px] font-semibold text-[#374151] uppercase tracking-wide">
                                    Report <span className="text-red-500">*</span>
                                </label>
                                <p className="text-[12px] text-gray-400 mb-2">Describe the reason for this report</p>
                                <div className="relative">
                                    <span className="absolute left-3.5 top-3.5 pointer-events-none">
                                        <FileText size={16} className="text-gray-400" />
                                    </span>
                                    <textarea
                                        rows={4}
                                        value={isReport}
                                        onChange={(e) => { setIsReport(e.target.value); setErrors((err) => ({ ...err, is_report: undefined })); }}
                                        placeholder="e.g. Spam, Harassment, Inappropriate content..."
                                        className={`w-full rounded-[10px] border pl-10 pr-4 py-3 text-[13.5px] outline-none transition-all resize-none
                                            ${errors.is_report
                                                ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-50"
                                                : "border-gray-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-50"
                                            } text-[#111827]`}
                                    />
                                </div>
                                {errors.is_report && (
                                    <p className="mt-1.5 text-[12px] text-red-500 flex items-center gap-1">
                                        <AlertCircle size={12} /> {errors.is_report}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Preview strip */}
                        {(userId || peerId || isReport) && (
                            <div className="mt-6 p-4 rounded-[12px] bg-gray-50 border border-gray-200">
                                <p className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide mb-3">Preview</p>
                                <div className="flex flex-wrap gap-4 text-[13px]">
                                    {userId && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500">Reported By:</span>
                                            <span className="font-semibold text-[#101828]">
                                                {userOptions.find(u => u.value === userId)?.label ?? userId}
                                            </span>
                                        </div>
                                    )}
                                    {peerId && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500">Reported User:</span>
                                            <span className="font-semibold text-[#101828]">
                                                {userOptions.find(u => u.value === peerId)?.label ?? peerId}
                                            </span>
                                        </div>
                                    )}
                                    {isReport && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500">Reason:</span>
                                            <span className="font-semibold text-red-500">{isReport}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
                            <button
                                onClick={() => navigate("/report/all-reports")}
                                disabled={saving}
                                className="px-5 py-2.5 rounded-[10px] border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 disabled:opacity-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving || success}
                                className="flex items-center gap-2 px-6 py-2.5 rounded-[10px] bg-[#2563EB] text-white text-sm font-semibold hover:bg-[#1D4ED8] shadow-sm disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                            >
                                <Save size={15} />
                                {saving ? "Saving..." : "Save Report"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
