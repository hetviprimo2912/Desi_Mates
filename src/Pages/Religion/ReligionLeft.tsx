import { useMemo, useState } from "react";
import { Folder } from "lucide-react";
import Search from "../../Components/Search";

const religions = [
    "Hindu",
    "Muslim",
    "Christian",
    "Sikh",
    "Jain",
    "Buddhist",
    "Jewish",
    "Catholic",
    "Other",
];
export default function CategoryLeft() {

    const [searchTerm, setSearchTerm] =
        useState("");

    const [selectedReligion, setselectedReligion] =
        useState("Music");

    const filteredReligions = useMemo(() => {

        return religions.filter(category =>
            category
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );

    }, [searchTerm]);

    return (

        <aside className="h-[calc(100vh-220px)] bg-white border border-gray-200 rounded-[12px] flex flex-col overflow-hidden">

            {/* Header */}

            <div className="border-b border-gray-200 p-6">

                <h2 className="text-[24px] font-semibold text-[#101828]">

                    Religions

                </h2>

            </div>

            {/* Search */}

            <div className="p-4 border-b border-gray-100">

                <Search
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    placeholder="Search Religion..."
                />

            </div>

            {/* Category List */}

            <div className="flex-1 overflow-y-auto py-2 scrollbar-thin">

                {filteredReligions.length > 0 ? (

                    filteredReligions.map(category => (

                        <button
                            key={category}
                            onClick={() =>
                                setselectedReligion(category)
                            }
                            className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors cursor-pointer
                                
                                ${selectedReligion === category
                                    ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                                    : "hover:bg-gray-50 text-gray-700"
                                }`}
                        >

                            <Folder size={18} />

                            <span className="text-[15px] font-medium">

                                {category}

                            </span>

                        </button>

                    ))

                ) : (

                    <div className="py-10 text-center text-gray-400">

                        No Religions found.

                    </div>

                )}

            </div>

        </aside>

    );

}