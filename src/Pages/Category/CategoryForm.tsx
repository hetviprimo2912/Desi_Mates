import {
    useState,
    useEffect,
    type ChangeEvent,
} from "react";

import {

    useNavigate,

    useParams,


} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type {
    AppDispatch,
} from "../../Store/store";

import { add_category }
    from "../../Store/slices/CategorySlices/add_category_thunk";
import { all_category_list }
    from "../../Store/slices/CategorySlices/all_category_list_thunk";
import TogglableSwitch from "../../Components/TogglableSwitch";

import { edit_category }
    from "../../Store/slices/CategorySlices/edit_category_thunk";
import { get_category_details }
    from "../../Store/slices/CategorySlices/get_category_details_thunk";

import type { RootState }
    from "../../Store/store";
export default function CategoryForm() {
    const dispatch =
        useDispatch<AppDispatch>();
    const {
        category,
        loading,
    } = useSelector(
        (state: RootState) =>
            state.get_category_details
    );
    const { id } = useParams();



    const navigate =
        useNavigate();



    const [categoryName, setCategoryName] =
        useState("");

    const [description, setDescription] =
        useState("");



    const [selectedImage, setSelectedImage] =
        useState<File | null>(null);

    const [preview, setPreview] =
        useState("");

    const [fileName, setFileName] =
        useState("No file chosen");
    const [status, setStatus] =
        useState(true);
    const [saving, setSaving] =
        useState(false);
    useEffect(() => {

        if (!id) return;

        dispatch(
            get_category_details({
                id,
            })
        );

    }, [dispatch, id]);
    useEffect(() => {

        if (!category) return;

        setCategoryName(category.title || "");

        setDescription(category.description || "");

        setStatus(category.status === "1");

        setPreview(category.image || "");

        setFileName("Current Image");

    }, [category]);
    const handleImageChange = (
        e: ChangeEvent<HTMLInputElement>
    ) => {

        const file =
            e.target.files?.[0];

        if (!file) return;

        setSelectedImage(file);

        setFileName(file.name);

        setPreview(
            URL.createObjectURL(file)
        );

    };

    const handleSubmit = async () => {

        if (!id && !selectedImage) return;

        setSaving(true);

        try {

            if (id) {

                await dispatch(

                    edit_category({

                        id,

                        name: categoryName,

                        description,

                        status: status ? "1" : "0",

                        image: selectedImage ?? undefined,

                    })

                ).unwrap();

            } else {

                await dispatch(

                    add_category({

                        name: categoryName,

                        description,

                        image: selectedImage!,

                        status: status ? "1" : "0",

                    })

                ).unwrap();

            }

            await dispatch(

                all_category_list({

                    page_no: 1,

                    per_page: 1000,

                    search: "",

                })

            );

            navigate("/category/all-category");

        } catch (error) {

            console.log(error);

            setSaving(false);

        }

    };
    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                Loading...
            </div>
        );
    }
    return (

        <div className="bg-white border border-gray-200 rounded-[12px] flex flex-col h-full">

            {/* Header */}

            <div className="border-b border-gray-200 px-6 py-5">

                <h2 className="text-[26px] font-semibold text-[#101828]">

                    {id

                        ? "Edit Category"

                        : "Add Main Category"}

                </h2>

            </div>

            {/* Body */}

            <div className="flex-1 p-6">

                <div className="space-y-7">

                    {/* Category Name */}

                    <div>

                        <label className="block mb-2 text-[15px] font-semibold text-gray-700">

                            Category Name
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
                            placeholder="Enter Category Name"
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
                                setDescription(
                                    e.target.value
                                )
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

                    {/* Image */}

                    <div>

                        <label className="block mb-2 text-[15px] font-semibold text-gray-700">

                            Category Image
                            <span className="text-red-500">
                                {" "}*
                            </span>

                        </label>

                        <div className="flex border border-gray-300 rounded-[10px] overflow-hidden">

                            <label className="bg-gray-100 px-5 py-3 cursor-pointer font-medium border-r border-gray-300 hover:bg-gray-200">

                                Choose Image

                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />

                            </label>

                            <span className="flex items-center px-4 text-gray-500 text-sm">

                                {fileName}

                            </span>

                        </div>

                        {preview && (

                            <div className="mt-4">

                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-28 h-28 rounded-lg border object-cover"
                                />

                            </div>

                        )}
                        {/* Status */}

                        <div className="mt-8">

                            <label className="block mb-4 text-[15px] font-semibold text-gray-700">

                                Status

                            </label>

                            <div className="flex items-center gap-4">

                                <TogglableSwitch
                                    isActive={status}
                                    onToggle={() => setStatus(!status)}
                                    showLabel={false}
                                />

                                <span
                                    className={`text-sm font-medium ${status
                                        ? "text-green-600"
                                        : "text-red-600"
                                        }`}
                                >
                                    {status ? "Active" : "Inactive"}
                                </span>

                            </div>

                        </div>
                    </div>


                </div>

            </div>

            {/* Footer */}

            <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">

                <button
                    onClick={() =>
                        navigate("/category/all-category")
                    }
                    className="px-5 py-2 rounded-[10px] border border-gray-300 text-gray-700 font-medium hover:bg-gray-50"
                >
                    Cancel

                </button>

                <button
                    disabled={saving}
                    onClick={handleSubmit}
                    className="px-6 py-2 rounded-[10px] bg-[#2563EB] text-white font-medium hover:bg-[#1D4ED8]"
                >

                    {saving
                        ? id
                            ? "Updating..."
                            : "Saving..."
                        : id
                            ? "Update Category"
                            : "Save Category"}

                </button>

            </div>

        </div>

    );

}

