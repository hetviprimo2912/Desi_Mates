import { useEffect, useMemo, useState } from "react";
import { Folder } from "lucide-react";
import Search from "../../Components/Search";
import { useDispatch, useSelector } from "react-redux";

import type {
    RootState,
    AppDispatch,
} from "../../Store/store";

import { all_category_list }
    from "../../Store/slices/CategorySlices/all_category_list_thunk";


export default function CategoryLeft() {
    const dispatch =
        useDispatch<AppDispatch>();

    const {
        category,
    } = useSelector(
        (state: RootState) =>
            state.category_list
    );
    const [searchTerm, setSearchTerm] =
        useState("");

    const [selectedCategory, setSelectedCategory] =
        useState("Music");
    useEffect(() => {

        dispatch(
            all_category_list({

                page_no: 1,

                per_page: 1000,

                search: "",

            })
        );

    }, [dispatch]);
    const filteredCategories =
        useMemo(() => {

            return category.filter(item =>

                item.title
                    ?.toLowerCase()
                    .includes(
                        searchTerm.toLowerCase()
                    )

            );

        }, [

            category,

            searchTerm,

        ]);

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

                    filteredCategories.map(cat => (

                        <button
                            key={cat.id}
                            onClick={() =>
                                setSelectedCategory(cat.title)
                            }
                            className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors cursor-pointer
                                
                                ${selectedCategory === cat.title
                                    ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                                    : "hover:bg-gray-50 text-gray-700"
                                }`}
                        >

                            <Folder size={18} />

                            <span className="text-[15px] font-medium">

                                {cat.title}

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