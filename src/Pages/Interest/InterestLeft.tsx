import { useEffect, useMemo, useState } from "react";
import { Folder } from "lucide-react";
import Search from "../../Components/Search";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../Store/store";
import { interest_list } from "../../Store/slices/InterestSlice/interest_list_thunk";

export default function InterestLeft() {
    const dispatch = useDispatch<AppDispatch>();
    const { interest } = useSelector((state: RootState) => state.interest_list);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedInterest, setSelectedInterest] = useState("");

    useEffect(() => {
        dispatch(interest_list({ page_no: 1, per_page: 1000, search: "" }));
    }, [dispatch]);

    const filteredInterests = useMemo(() =>
        interest.filter(item =>
            item.name?.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        [interest, searchTerm]
    );

    return (
        <aside className="h-[calc(100vh-220px)] bg-white border border-gray-200 rounded-[12px] flex flex-col overflow-hidden">

            {/* Header */}
            <div className="border-b border-gray-200 p-6">
                <h2 className="text-[24px] font-semibold text-[#101828]">Interests</h2>
            </div>

            {/* Search */}
            <div className="p-4 border-b border-gray-100">
                <Search
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    placeholder="Search Interest..."
                />
            </div>

            {/* Interest List */}
            <div className="flex-1 overflow-y-auto py-2 scrollbar-thin">
                {filteredInterests.length > 0 ? (
                    filteredInterests.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setSelectedInterest(item.name)}
                            className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors cursor-pointer
                                ${selectedInterest === item.name
                                    ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                                    : "hover:bg-gray-50 text-gray-700"
                                }`}
                        >
                            <Folder size={18} />
                            <span className="text-[15px] font-medium">{item.name}</span>
                        </button>
                    ))
                ) : (
                    <div className="py-10 text-center text-gray-400">No interests found.</div>
                )}
            </div>

        </aside>
    );
}
