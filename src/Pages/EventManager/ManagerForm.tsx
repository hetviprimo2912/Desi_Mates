import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function ManagerForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = () => {
        console.log({ name, email, password });
    };

    return (
        <div className="bg-white border border-gray-200 rounded-[12px] flex flex-col h-full">
            {/* Header */}
            <div className="border-b border-gray-200 px-6 py-5">
                <h2 className="text-[26px] font-semibold text-[#101828]">Add New Manager</h2>
            </div>

            {/* Body */}
            <div className="flex-1 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Manager Name */}
                    <div className="md:col-span-2">
                        <label className="block mb-2 text-[15px] font-semibold text-gray-700">
                            Manager Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Enter Manager Name"
                            className="w-full h-12 rounded-[10px] border border-gray-300 px-4 outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Manager Email */}
                    <div className="md:col-span-2">
                        <label className="block mb-2 text-[15px] font-semibold text-gray-700">
                            Manager Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Enter Manager Email"
                            className="w-full h-12 rounded-[10px] border border-gray-300 px-4 outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Manager Password */}
                    <div className="md:col-span-2">
                        <label className="block mb-2 text-[15px] font-semibold text-gray-700">
                            Manager Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
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
                <button className="px-5 py-2 rounded-[10px] border border-gray-300 text-gray-700 font-medium hover:bg-gray-50">
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    className="px-6 py-2 rounded-[10px] bg-[#2563EB] text-white font-medium hover:bg-[#1D4ED8]"
                >
                    Save Manager
                </button>
            </div>
        </div>
    );
}
