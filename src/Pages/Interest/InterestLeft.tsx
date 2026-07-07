import { useMemo, useState } from "react";
import { Folder } from "lucide-react";
import Search from "../../Components/Search";

const interests = [
    "Photography",
    "Cooking",
    "Travel",
    "Reading",
    "Music",
    "Gaming",
    "Movies",
    "Fitness",
    "Dancing",
    "Cricket",
    "Football",
    "Yoga",
    "Painting",
    "Writing",
    "Nature",
];
export default function CategoryLeft() {

    const [searchTerm, setSearchTerm] =
        useState("");

    const [selectedInterest, setselectedInterest] =
        useState("Music");

    const filteredInterest = useMemo(() => {

        return interests.filter(category =>
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

                    Interestes

                </h2>

            </div>

            {/* Search */}

            <div className="p-4 border-b border-gray-100">

                <Search
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    placeholder="Search Interest..."
                />

            </div>

            {/* Category List */}

            <div className="flex-1 overflow-y-auto py-2 scrollbar-thin">

                {filteredInterest.length > 0 ? (

                    filteredInterest.map(category => (

                        <button
                            key={category}
                            onClick={() =>
                                setselectedInterest(category)
                            }
                            className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors cursor-pointer
                                
                                ${selectedInterest === category
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

                        No Interests found.

                    </div>

                )}

            </div>

        </aside>

    );

}