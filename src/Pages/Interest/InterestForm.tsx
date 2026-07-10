import { useState, useEffect, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../Store/store";
import TogglableSwitch from "../../Components/TogglableSwitch";

import { add_interest } from "../../Store/slices/InterestSlice/add_interest_thunk";
import { edit_interest } from "../../Store/slices/InterestSlice/edit_interest_thunk";
import { get_interest_details } from "../../Store/slices/InterestSlice/get_interest_details_thunk";
import { interest_list } from "../../Store/slices/InterestSlice/interest_list_thunk";

export default function InterestForm() {
    const dispatch = useDispatch<AppDispatch>();
    const { interest, loading } = useSelector((state: RootState) => state.edit_interest);
    const { id } = useParams();
    const navigate = useNavigate();

    const [interestName, setInterestName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [preview, setPreview] = useState("");
    const [fileName, setFileName] = useState("No file chosen");
    const [status, setStatus] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!id) {
            setInterestName("");
            setDescription("");
            setSelectedImage(null);
            setPreview("");
            setFileName("No file chosen");
            setStatus(true);
            return;
        }
        dispatch(get_interest_details({ id }));
    }, [dispatch, id]);

    useEffect(() => {
        if (!id || !interest) return;
        setInterestName(interest.name || "");
        setDescription(interest.description || "");
        setStatus(interest.status === "1");
        setPreview(interest.image || "");
        setFileName("Current Image");
    }, [id, interest]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setSelectedImage(file);
        setFileName(file.name);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async () => {
        if (!id && !selectedImage) return;
        setSaving(true);
        try {
            if (id) {
                await dispatch(edit_interest({
                    id,
                    name: interestName,
                    description,
                    status: status ? "1" : "0",
                    image: selectedImage ?? undefined,
                })).unwrap();
            } else {
                await dispatch(add_interest({
                    name: interestName,
                    description,
                    image: selectedImage!,
                    status: status ? "1" : "0",
                })).unwrap();
            }

            await dispatch(interest_list({ page_no: 1, per_page: 1000, search: "" }));
            navigate("/interest/all-interest");
        } catch (error) {
            console.log(error);
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">Loading...</div>
        );
    }

    return (
        <div className="bg-white border border-gray-200 rounded-[12px] flex flex-col h-full">

            {/* Header */}
            <div className="border-b border-gray-200 px-6 py-5">
                <h2 className="text-[26px] font-semibold text-[#101828]">
                    {id ? "Edit Interest" : "Add New Interest"}
                </h2>
            </div>

            {/* Body */}
            <div className="flex-1 p-6">
                <div className="space-y-7">

                    {/* Interest Name */}
                    <div>
                        <label className="block mb-2 text-[15px] font-semibold text-gray-700">
                            Interest Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={interestName}
                            onChange={(e) => setInterestName(e.target.value)}
                            placeholder="Enter Interest Name"
                            className="w-full h-12 rounded-[10px] border border-gray-300 px-4 outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block mb-2 text-[15px] font-semibold text-gray-700">
                            Interest Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            rows={5}
                            value={description}
                            maxLength={1000}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter Description"
                            className="w-full rounded-[10px] border border-gray-300 px-4 py-3 outline-none resize-none focus:border-blue-500"
                        />
                        <div className="mt-2 flex justify-end">
                            <span className={`text-xs ${description.length >= 1000 ? "text-red-500" : "text-gray-400"}`}>
                                {description.length}/1000
                            </span>
                        </div>
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block mb-2 text-[15px] font-semibold text-gray-700">
                            Interest Image <span className="text-red-500">*</span>
                        </label>
                        <div className="flex border border-gray-300 rounded-[10px] overflow-hidden">
                            <label className="bg-gray-100 px-5 py-3 cursor-pointer font-medium border-r border-gray-300 hover:bg-gray-200">
                                Choose Image
                                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                            </label>
                            <span className="flex items-center px-4 text-gray-500 text-sm">{fileName}</span>
                        </div>
                        {preview && (
                            <div className="mt-4">
                                <img src={preview} alt="Preview" className="w-28 h-28 rounded-lg border object-cover" />
                            </div>
                        )}

                    </div>

                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
                <button
                    onClick={() => navigate("/interest/all-interest")}
                    className="px-5 py-2 rounded-[10px] border border-gray-300 text-gray-700 font-medium hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    disabled={saving}
                    onClick={handleSubmit}
                    className="px-6 py-2 rounded-[10px] bg-[#2563EB] text-white font-medium hover:bg-[#1D4ED8] disabled:opacity-60"
                >
                    {saving
                        ? id ? "Updating..." : "Saving..."
                        : id ? "Update Interest" : "Save Interest"}
                </button>
            </div>

        </div>
    );
}
