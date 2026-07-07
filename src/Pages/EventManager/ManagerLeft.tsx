import { useMemo, useState } from "react";
import { UserCog } from "lucide-react";
import Search from "../../Components/Search";

const managers = [
    "Amit Sharma",
    "Priya Patel",
    "Rahul Verma",
    "Sneha Iyer",
    "Karan Mehta",
];

export default function ManagerLeft() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selected, setSelected] = useState(managers[0]);

    const filtered = useMemo(() =>
        managers.filter(m => m.toLowerCase().includes(searchTerm.toLowerCase())),
        [searchTerm]
    );

    return (
        <aside className="h-[calc(100vh-220px)] bg-white border border-gray-200 rounded-[12px] flex flex-col overflow-hidden">
            <div className="border-b border-gray-200 p-6">
                <h2 className="text-[24px] font-semibold text-[#101828]">Managers</h2>
            </div>
            <div className="p-4 border-b border-gray-100">
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search Manager..." />
            </div>
            <div className="flex-1 overflow-y-auto py-2 scrollbar-thin">
                {filtered.length > 0 ? filtered.map(manager => (
                    <button
                        key={manager}
                        onClick={() => setSelected(manager)}
                        className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors cursor-pointer
                            ${selected === manager
                                ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                                : "hover:bg-gray-50 text-gray-700"}`}
                    >
                        <UserCog size={18} />
                        <span className="text-[15px] font-medium">{manager}</span>
                    </button>
                )) : (
                    <div className="py-10 text-center text-gray-400">No managers found.</div>
                )}
            </div>
        </aside>
    );
}
