import { useState, type ChangeEvent } from "react";
import TogglableSwitch from "../../Components/TogglableSwitch";

export default function EventForm() {
    const [eventName, setEventName] = useState("");
    const [price, setPrice] = useState("");
    const [organizedBy, setOrganizedBy] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(true);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [preview, setPreview] = useState("");
    const [fileName, setFileName] = useState("No file chosen");

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setSelectedImage(file);
        setFileName(file.name);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = () => {
        console.log({ eventName, price, organizedBy, category, description, status, selectedImage });
    };

    return (
        <div className="bg-white border border-gray-200 rounded-[12px] flex flex-col h-full">

            {/* Header */}
            <div className="border-b border-gray-200 px-6 py-5">
                <h2 className="text-[26px] font-semibold text-[#101828]">Add Main Event</h2>
                <p className="text-sm text-gray-500 mt-1">Fill in the details below to create a new event.</p>
            </div>

            {/* Body */}
            <div className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-6">

                    {/* Row 1: Event Name + Price */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block mb-2 text-[14px] font-semibold text-gray-700">
                                Event Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={eventName}
                                onChange={e => setEventName(e.target.value)}
                                placeholder="Enter Event Name"
                                className="w-full h-11 rounded-[10px] border border-gray-300 px-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-[14px] font-semibold text-gray-700">
                                Price <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">₹</span>
                                <input
                                    type="number"
                                    min={0}
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                    placeholder="0.00"
                                    className="w-full h-11 rounded-[10px] border border-gray-300 pl-8 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Row 2: Organized By + Category */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block mb-2 text-[14px] font-semibold text-gray-700">
                                Organized By <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={organizedBy}
                                onChange={e => setOrganizedBy(e.target.value)}
                                placeholder="Enter Organizer Name"
                                className="w-full h-11 rounded-[10px] border border-gray-300 px-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-[14px] font-semibold text-gray-700">
                                Category <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                                placeholder="Enter Category"
                                className="w-full h-11 rounded-[10px] border border-gray-300 px-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block mb-2 text-[14px] font-semibold text-gray-700">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            rows={4}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Enter event description..."
                            className="w-full rounded-[10px] border border-gray-300 px-4 py-3 text-sm outline-none resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                        />
                    </div>

                    {/* Row 3: Event Image + Status */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block mb-2 text-[14px] font-semibold text-gray-700">
                                Event Image <span className="text-red-500">*</span>
                            </label>
                            <div className="flex border border-gray-300 rounded-[10px] overflow-hidden">
                                <label className="bg-gray-100 px-4 py-2.5 cursor-pointer text-sm font-medium border-r border-gray-300 hover:bg-gray-200 whitespace-nowrap">
                                    Choose Image
                                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                                </label>
                                <span className="flex items-center px-4 text-gray-500 text-sm truncate">{fileName}</span>
                            </div>
                            {preview && (
                                <div className="mt-3">
                                    <img src={preview} alt="Preview" className="w-24 h-24 rounded-lg border object-cover shadow-sm" />
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block mb-2 text-[14px] font-semibold text-gray-700">Status</label>
                            <div className="flex items-center gap-3 mt-1">
                                <TogglableSwitch isActive={status} onToggle={() => setStatus(!status)} showLabel={false} />
                                <span className={`text-sm font-medium ${status ? "text-green-600" : "text-red-500"}`}>
                                    {status ? "Active" : "Inactive"}
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
                <button className="px-5 py-2 rounded-[10px] border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 text-sm">
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    className="px-6 py-2 rounded-[10px] bg-[#2563EB] text-white font-medium hover:bg-[#1D4ED8] text-sm"
                >
                    Save Event
                </button>
            </div>
        </div>
    );
}
