import { useMemo, useState } from "react";
import { Folder } from "lucide-react";
import Search from "../../Components/Search";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../../Store/store";

import { religion_list } from "../../Store/slices/ReligionSlices/religion_list_thunk";

import { useEffect } from "react";

export default function CategoryLeft() {
    const dispatch = useDispatch<AppDispatch>();

    const { religion } = useSelector(
        (state: RootState) => state.religion_list
    );

    const [searchTerm, setSearchTerm] =
        useState("");

    const [selectedReligion, setselectedReligion] =
        useState("Music");

    const filteredReligions = useMemo(() => {

        return religion.filter(item =>
            item.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );

    }, [religion, searchTerm]);
    useEffect(() => {

        dispatch(
            religion_list({
                search: "",
                page_no: 1,
                per_page: 1000,
            })
        );

    }, [dispatch]);
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
                            key={category.id}
                            onClick={() =>
                                setselectedReligion(category.name)
                            }
                            className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors cursor-pointer
                                
                                ${selectedReligion === category.name
                                    ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                                    : "hover:bg-gray-50 text-gray-700"
                                }`}
                        >

                            <Folder size={18} />

                            <span className="text-[15px] font-medium">

                                {category.name}

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