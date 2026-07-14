import {
    useState,
    useEffect,
    
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    useNavigate,
    useParams,
} from "react-router-dom";
import type { AppDispatch, RootState } from "../../Store/store";

import { add_religion } from "../../Store/slices/ReligionSlices/religion_add_thunk";
import { edit_religion } from "../../Store/slices/ReligionSlices/edit_religion_thunk";

import { get_religion_details } from "../../Store/slices/ReligionSlices/get_religion_details_thunk";

import { religion_list } from "../../Store/slices/ReligionSlices/religion_list_thunk";

export default function CategoryForm() {
    const dispatch = useDispatch<AppDispatch>();

    const navigate = useNavigate();
    const { id } = useParams();

    const [saving, setSaving] =
        useState(false);

    const { loading, religion } = useSelector(
        (state: RootState) =>
            state.edit_religion
    );
    const [categoryName, setCategoryName] =
        useState("");

    const [description, setDescription] =
        useState("");



    // const [selectedImage, setSelectedImage] =
    //     useState<File | null>(null);

    // const [preview, setPreview] =
    //     useState("");

    // const [fileName, setFileName] =
    //     useState("No file chosen");

    // const handleImageChange = (
    //     e: ChangeEvent<HTMLInputElement>
    // ) => {

    //     const file =
    //         e.target.files?.[0];

    //     if (!file) return;

    //     setSelectedImage(file);

    //     setFileName(file.name);

    //     setPreview(
    //         URL.createObjectURL(file)
    //     );

    // };
    const handleSubmit = async () => {

        if (!categoryName.trim()) return;

        if (!description.trim()) return;

        setSaving(true);

        try {

            if (id) {

                await dispatch(
                    edit_religion({
                        id,
                        name: categoryName,
                        description,
                    })
                ).unwrap();

            } else {

                await dispatch(
                    add_religion({
                        name: categoryName,
                        description,
                    })
                ).unwrap();

            }

            await dispatch(
                religion_list({
                    page_no: 1,
                    per_page: 1000,
                    search: "",
                })
            );

            navigate(
                "/religion/all-religion"
            );

        } catch (error) {

            console.log(error);

            setSaving(false);

        }

    };
    useEffect(() => {

        if (!id) {

            setCategoryName("");
            setDescription("");

            return;

        }

        dispatch(
            get_religion_details({
                id,
            })
        );

    }, [dispatch, id]);
    useEffect(() => {

        if (!id || !religion) return;

        setCategoryName(
            religion.name || ""
        );

        setDescription(
            religion.description || ""
        );

    }, [id, religion]);
    if (id && loading) {
        return (
            <div className="bg-white border border-gray-200 rounded-[12px] flex flex-col h-full animate-pulse">

                {/* Header */}
                <div className="border-b border-gray-200 px-6 py-5">
                    <div className="h-8 w-48 rounded bg-gray-200"></div>
                </div>

                {/* Body */}
                <div className="flex-1 p-6 space-y-7">

                    <div>
                        <div className="h-4 w-36 rounded bg-gray-200 mb-3"></div>
                        <div className="h-12 w-full rounded-[10px] bg-gray-200"></div>
                    </div>

                    <div>
                        <div className="h-4 w-28 rounded bg-gray-200 mb-3"></div>
                        <div className="h-40 w-full rounded-[10px] bg-gray-200"></div>
                    </div>

                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">

                    <div className="h-10 w-24 rounded-[10px] bg-gray-200"></div>

                    <div className="h-10 w-36 rounded-[10px] bg-gray-200"></div>

                </div>

            </div>
        );
    }
    return (

        <div className="bg-white border border-gray-200 rounded-[12px] flex flex-col h-full">

            {/* Header */}

            <div className="border-b border-gray-200 px-6 py-5">

                <h2 className="text-[26px] font-semibold text-[#101828]">

                    {id
                        ? "Edit Religion"
                        : "Add New Religion"}
                </h2>

            </div>

            {/* Body */}

            <div className="flex-1 p-6">

                <div className="space-y-7">

                    {/* Religion Name */}

                    <div>

                        <label className="block mb-2 text-[15px] font-semibold text-gray-700">

                            Religion Name
                            <span className="text-red-500">
                                {" "}*
                            </span>

                        </label>

                        <input
                            type="text"
                            value={categoryName}
                            onChange={(e) =>
                                setCategoryName(
                                    e.target.value
                                )
                            }
                            placeholder="Enter Religion Name"
                            className="w-full h-12 rounded-[10px] border border-gray-300 px-4 outline-none focus:border-blue-500"
                        />

                    </div>

                    {/* Description */}

                    <div>

                        <label className="block mb-2 text-[15px] font-semibold text-gray-700">

                            Description
                            <span className="text-red-500">
                                {" "}*
                            </span>

                        </label>

                        <textarea
                            rows={5}
                            value={description}
                            maxLength={1000}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            placeholder="Enter Description"
                            className="w-full rounded-[10px] border border-gray-300 px-4 py-3 outline-none resize-none focus:border-blue-500"
                        />

                        <div className="mt-2 flex justify-end">
                            <span
                                className={`text-xs ${description.length >= 1000
                                    ? "text-red-500"
                                    : "text-gray-400"
                                    }`}
                            >
                                {description.length}/1000
                            </span>
                        </div>

                    </div>


                </div>

            </div>

            {/* Footer */}

            <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">

                <button
                    onClick={() =>
                        navigate("/religion/all-religion")
                    }
                    className="px-5 py-2 rounded-[10px] border border-gray-300 text-gray-700 font-medium hover:bg-gray-50"
                >

                    Cancel

                </button>

                <button
                    onClick={handleSubmit}
                    disabled={saving}
                    className="px-6 py-2 rounded-[10px] bg-[#2563EB] text-white font-medium hover:bg-[#1D4ED8] disabled:opacity-60"
                >

                    {saving
                        ? id
                            ? "Updating..."
                            : "Saving..."
                        : id
                            ? "Update Religion"
                            : "Save Religion"}

                </button>

            </div>

        </div>

    );

}