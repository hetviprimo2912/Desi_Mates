import { useState, type ChangeEvent } from "react";
import TogglableSwitch from "../../Components/TogglableSwitch";

export default function CategoryForm() {

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

    const handleSubmit = () => {

        console.log({
            categoryName,
            description,
            status,
            selectedImage,
        });

    };

    return (

        <div className="bg-white border border-gray-200 rounded-[12px] flex flex-col h-full">

            {/* Header */}

            <div className="border-b border-gray-200 px-6 py-5">

                <h2 className="text-[26px] font-semibold text-[#101828]">

                    Add New Interest

                </h2>

            </div>

            {/* Body */}

            <div className="flex-1 p-6">

                <div className="space-y-7">

                    {/* Category Name */}

                    <div>

                        <label className="block mb-2 text-[15px] font-semibold text-gray-700">

                            Interest Name
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
                            placeholder="Enter Interest Name"
                            className="w-full h-12 rounded-[10px] border border-gray-300 px-4 outline-none focus:border-blue-500"
                        />

                    </div>

                    {/* Description */}

                    <div>

                        <label className="block mb-2 text-[15px] font-semibold text-gray-700">

                            Interest Description
                            <span className="text-red-500">
                                {" "}*
                            </span>

                        </label>

                        <textarea
                            rows={5}
                            value={description}
                            onChange={(e) =>
                                setDescription(
                                    e.target.value
                                )
                            }
                            placeholder="Enter Description"
                            className="w-full rounded-[10px] border border-gray-300 px-4 py-3 outline-none resize-none focus:border-blue-500"
                        />

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

                                Interest Image

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

                    </div>


                </div>

            </div>

            {/* Footer */}

            <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">

                <button
                    className="px-5 py-2 rounded-[10px] border border-gray-300 text-gray-700 font-medium hover:bg-gray-50"
                >

                    Cancel

                </button>

                <button
                    onClick={handleSubmit}
                    className="px-6 py-2 rounded-[10px] bg-[#2563EB] text-white font-medium hover:bg-[#1D4ED8]"
                >

                    Save Interest

                </button>

            </div>

        </div>

    );

}