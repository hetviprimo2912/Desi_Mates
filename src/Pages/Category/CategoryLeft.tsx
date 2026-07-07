import { useMemo, useState } from "react";
import { Folder } from "lucide-react";
import Search from "../../Components/Search";

const categories = [
    "Music",
    "Podcast",
    "Health",
    "Travel",
    "Sports",
    "Movies",
    "Education",
    "Business",
    "Fashion",
    "Gaming",
    "Photography",
    "Technology",
    "Food",
    "Finance",
    "Science",
    "History",
    "Nature",
    "Comedy",
    "News",
    "Politics",
    "Kids",
    "Animation",
    "Books",
    "Fitness",
    "Cars",
    "Lifestyle",
    "Pets",
    "AI",
    "Programming",
    "Space",
];
export default function CategoryLeft() {

    const [searchTerm, setSearchTerm] =
        useState("");

    const [selectedCategory, setSelectedCategory] =
        useState("Music");

    const filteredCategories = useMemo(() => {

        return categories.filter(category =>
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

                    Categories

                </h2>

            </div>

            {/* Search */}

            <div className="p-4 border-b border-gray-100">

                <Search
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    placeholder="Search Category..."
                />

            </div>

            {/* Category List */}

            <div className="flex-1 overflow-y-auto py-2 scrollbar-thin">

                {filteredCategories.length > 0 ? (

                    filteredCategories.map(category => (

                        <button
                            key={category}
                            onClick={() =>
                                setSelectedCategory(category)
                            }
                            className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors cursor-pointer
                                
                                ${selectedCategory === category
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

                        No categories found.

                    </div>

                )}

            </div>

        </aside>

    );

}