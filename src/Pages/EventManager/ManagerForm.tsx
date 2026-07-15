import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../../Store/store";
import { add_event_manager } from "../../Store/slices/MangerSlices/add_event_manager_thunk";
import { edit_event_manager } from "../../Store/slices/MangerSlices/edit_event_manager_thunk";
import { resetAddEventManager } from "../../Store/slices/MangerSlices/add_event_manager_slice";
import { event_manager_list } from "../../Store/slices/MangerSlices/event_manager_list_thunk";

export default function ManagerForm() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const { event_manager } = useSelector((state: RootState) => state.event_manager_list);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [saving, setSaving] = useState(false);

    // Pre-fill form in edit mode from the list data
    useEffect(() => {
        if (!id) {
            setName("");
            setEmail("");
            setPassword("");
            dispatch(resetAddEventManager());
            return;
        }
        // Fetch list if not loaded yet so we have the manager data
        if (event_manager.length === 0) {
            dispatch(event_manager_list({ search: "", page_no: 1, per_page: 1000 }));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (!id || event_manager.length === 0) return;
        const manager = event_manager.find(m => m.id === id);
        if (manager) {
            setName(manager.name);
            setEmail(manager.email);
            setPassword(manager.password);
        }
    }, [id, event_manager]);

    const handleSubmit = async () => {
        setSaving(true);
        try {
            if (id) {
                await dispatch(edit_event_manager({ id, name, email, password })).unwrap();
            } else {
                await dispatch(add_event_manager({ name, email, password })).unwrap();
            }
            await dispatch(event_manager_list({ search: "", page_no: 1, per_page: 10 }));
            navigate("/event-manager/manager-list");
        } catch {
            setSaving(false);
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-[12px] flex flex-col h-full">
            {/* Header */}
            <div className="border-b border-gray-200 px-6 py-5">
                <h2 className="text-[26px] font-semibold text-[#101828]">
                    {id ? "Edit Manager" : "Add New Manager"}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                    {id ? "Update the manager details below." : "Fill in the details below to add a new manager."}
                </p>
            </div>

            {/* Body */}
            <div className="flex-1 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block mb-2 text-[15px] font-semibold text-gray-700">
                            Manager Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={name}
                            disabled={saving}
                            onChange={e => setName(e.target.value)}
                            placeholder="Enter Manager Name"
                            className="w-full h-12 rounded-[10px] border border-gray-300 px-4 outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block mb-2 text-[15px] font-semibold text-gray-700">
                            Manager Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            value={email}
                            disabled={saving}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Enter Manager Email"
                            className="w-full h-12 rounded-[10px] border border-gray-300 px-4 outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block mb-2 text-[15px] font-semibold text-gray-700">
                            Manager Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                disabled={saving}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Enter Manager Password"
                                className="w-full h-12 rounded-[10px] border border-gray-300 px-4 pr-12 outline-none focus:border-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(v => !v)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
                <button
                    onClick={() => navigate("/event-manager/manager-list")}
                    className="px-5 py-2 rounded-[10px] border border-gray-300 text-gray-700 font-medium hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={saving}
                    className="px-6 py-2 rounded-[10px] bg-[#2563EB] text-white font-medium hover:bg-[#1D4ED8] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {saving
                        ? id ? "Updating..." : "Saving..."
                        : id ? "Update Manager" : "Save Manager"}
                </button>
            </div>
        </div>
    );
}
