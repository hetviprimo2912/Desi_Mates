import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../Store/store";
import TogglableSwitch from "../../Components/TogglableSwitch";

import { add_starsign } from "../../Store/slices/StarSlices/add_starsign_thunk";
import { edit_starsign } from "../../Store/slices/StarSlices/edit_starsign_thunk";
import { get_starsign_details } from "../../Store/slices/StarSlices/get_starsign_details_thunk";
import { starsign_list } from "../../Store/slices/StarSlices/starsign_list_thunk";

const STAR_SIGNS = [
    { symbol: "♈", name: "Aries" },
    { symbol: "♉", name: "Taurus" },
    { symbol: "♊", name: "Gemini" },
    { symbol: "♋", name: "Cancer" },
    { symbol: "♌", name: "Leo" },
    { symbol: "♍", name: "Virgo" },
    { symbol: "♎", name: "Libra" },
    { symbol: "♏", name: "Scorpio" },
    { symbol: "♐", name: "Sagittarius" },
    { symbol: "♑", name: "Capricorn" },
    { symbol: "♒", name: "Aquarius" },
    { symbol: "♓", name: "Pisces" },
];

export default function StarSignForm() {
    const dispatch = useDispatch<AppDispatch>();
    const { starsign, loading } = useSelector((state: RootState) => state.edit_starsign);
    const { id } = useParams();
    const navigate = useNavigate();

    const [selectedSign, setSelectedSign] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!id) {
            setSelectedSign("");
            setDescription("");
            setStatus(true);
            return;
        }
        dispatch(get_starsign_details({ id }));
    }, [dispatch, id]);

    useEffect(() => {
        if (!id || !starsign) return;
        setSelectedSign(starsign.name || "");
        setDescription(starsign.description || "");
        setStatus(true);
    }, [id, starsign]);

    const handleSubmit = async () => {
        if (!selectedSign) return;
        setSaving(true);
        try {
            if (id) {
                await dispatch(edit_starsign({
                    id,
                    name: selectedSign,
                    description,
                })).unwrap();
            } else {
                await dispatch(add_starsign({
                    name: selectedSign,
                    description,
                })).unwrap();
            }
            await dispatch(starsign_list({ page_no: 1, per_page: 1000, search: "" }));
            navigate("/starsign/all-starsign");
        } catch (error) {
            console.log(error);
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center h-full">Loading...</div>;
    }

    return (
        <div className="bg-white border border-gray-200 rounded-[12px] flex flex-col h-full">

            {/* Header */}
            <div className="border-b border-gray-200 px-6 py-5">
                <h2 className="text-[26px] font-semibold text-[#101828]">
                    {id ? "Edit Star Sign" : "Add New Star Sign"}
                </h2>
            </div>

            {/* Body */}
            <div className="flex-1 p-6">
                <div className="space-y-7">

                    {/* Star Sign Select */}
                    <div>
                        <label className="block mb-2 text-[15px] font-semibold text-gray-700">
                            Star Sign <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={selectedSign}
                            onChange={(e) => setSelectedSign(e.target.value)}
                            className="w-full h-12 rounded-[10px] border border-gray-300 px-4 outline-none focus:border-blue-500"
                        >
                            <option value="">Select Star Sign</option>
                            {STAR_SIGNS.map((sign) => (
                                <option key={sign.name} value={sign.name}>
                                    {sign.symbol} {sign.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Sign Name (read-only) */}
                    <div>
                        <label className="block mb-2 text-[15px] font-semibold text-gray-700">
                            Sign Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={selectedSign}
                            readOnly
                            placeholder="Auto Filled"
                            className="w-full h-12 rounded-[10px] border border-gray-300 px-4 bg-gray-100 outline-none"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block mb-2 text-[15px] font-semibold text-gray-700">
                            Sign Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            rows={5}
                            value={description}
                            maxLength={1000}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter Sign Description"
                            className="w-full rounded-[10px] border border-gray-300 px-4 py-3 outline-none resize-none focus:border-blue-500"
                        />
                        <div className="mt-2 flex justify-end">
                            <span className={`text-xs ${description.length >= 1000 ? "text-red-500" : "text-gray-400"}`}>
                                {description.length}/1000
                            </span>
                        </div>
                    </div>



                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
                <button
                    onClick={() => navigate("/starsign/all-starsign")}
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
                        : id ? "Update Star Sign" : "Save Star Sign"}
                </button>
            </div>

        </div>
    );
}
