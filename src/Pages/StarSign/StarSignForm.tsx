import { useState } from "react";
import TogglableSwitch from "../../Components/TogglableSwitch";
const starSigns = [
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

    const [selectedSign, setSelectedSign] =
        useState("");

    const [signName, setSignName] =
        useState("");

    const [description, setDescription] =
        useState("");

    const [status, setStatus] =
        useState(true);


    const handleSubmit = () => {

        console.log({
            selectedSign,
            signName,
            description,
            status,
        });

    };

    return (

        <div className="bg-white border border-gray-200 rounded-[12px] flex flex-col h-full">

            {/* Header */}

            <div className="border-b border-gray-200 px-6 py-5">

                <h2 className="text-[26px] font-semibold text-[#101828]">

                    Add New Star Sign

                </h2>

            </div>

            {/* Body */}

            <div className="flex-1 p-6">

                <div className="space-y-7">

                    {/* Category Name */}

                    <div>

                        <label className="block mb-2 text-[15px] font-semibold text-gray-700">

                            Star Sign *
                            <span className="text-red-500">
                                {" "}*
                            </span>

                        </label>

                        <select
                            value={selectedSign}
                            onChange={(e) => {
                                setSelectedSign(e.target.value);
                                setSignName(e.target.value);
                            }}
                            className="w-full h-12 rounded-[10px] border border-gray-300 px-4 outline-none focus:border-blue-500"
                        >
                            <option value="">Select Star Sign</option>

                            {starSigns.map((sign) => (
                                <option
                                    key={sign.name}
                                    value={sign.name}
                                >
                                    {sign.symbol} {sign.name}
                                </option>
                            ))}
                        </select>

                    </div>

                    <label className="block mb-2 text-[15px] font-semibold text-gray-700">

                        Sign Name
                        <span className="text-red-500"> *</span>

                    </label>

                    <input
                        type="text"
                        value={signName}
                        readOnly
                        placeholder="Auto Filled"
                        className="w-full h-12 rounded-[10px] border border-gray-300 px-4 bg-gray-100 outline-none"
                    />

                </div>
                {/* Description */}

                <div className="mt-8">

                    <label className="block mb-2 text-[15px] font-semibold text-gray-700">

                        Sign Description
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
                        placeholder="Enter Sign Description"
                        className="w-full rounded-[10px] border border-gray-300 px-4 py-3 outline-none resize-none focus:border-blue-500"
                    />

                </div>
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
            <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">

                <button
                    className="px-5 py-2 rounded-[10px] border border-gray-300 hover:bg-gray-50"
                >
                    Cancel
                </button>

                <button
                    onClick={handleSubmit}
                    className="px-6 py-2 rounded-[10px] bg-[#2563EB] text-white hover:bg-[#1D4ED8]"
                >
                    Save Star Sign
                </button>

            </div>
        </div>




    );

}