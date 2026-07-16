import { useEffect, useState, type ChangeEvent } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import type { AppDispatch, RootState } from "../../Store/store";

import { event_add } from "../../Store/slices/EventSlices/event_add_thunk";
import { edit_event } from "../../Store/slices/EventSlices/edit_event_thunk";
import { resetEventAddState } from "../../Store/slices/EventSlices/event_add_slice";
import { all_category_list } from "../../Store/slices/CategorySlices/all_category_list_thunk";
import { get_event_details } from "../../Store/slices/EventSlices/get_event_details_thunk";
import { event_list } from "../../Store/slices/EventSlices/event_list_thunk";
import CustomSelect from "../../Components/CustomSelect";
export default function EventForm() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { id } = useParams();

    const { loading: editLoading, event } = useSelector((state: RootState) => state.edit_event);
    const {
        category: categories,
        loading: categoryLoading,
    } = useSelector(
        (state: RootState) => state.category_list
    );

    const [eventName, setEventName] = useState("");
    const [price, setPrice] = useState("");
    const [organizedBy, setOrganizedBy] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [description, setDescription] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [status, setStatus] = useState(true);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [preview, setPreview] = useState("");
    const [fileName, setFileName] = useState("No file chosen");
    const [saving, setSaving] = useState(false);

    const categoryOptions = categories.map((item) => ({
        value: item.id,
        label: item.title,
    }));

    // Reset fields when in Add mode
    useEffect(() => {
        if (!id) {
            setEventName("");
            setPrice("");
            setOrganizedBy("");
            setCategoryId("");
            setCategoryName("");
            setDescription("");
            setEventDate("");
            setEventTime("");
            setStatus(true);
            setSelectedImage(null);
            setPreview("");
            setFileName("No file chosen");
            dispatch(resetEventAddState());
        }
    }, [id, dispatch]);
    useEffect(() => {
        dispatch(
            all_category_list({
                search: "",
                page_no: 1,
                per_page: 1000,
            })
        );
    }, [dispatch]);
    useEffect(() => {

        if (!id) return;

        dispatch(
            get_event_details({
                id,
            })
        );

    }, [dispatch, id]);
    useEffect(() => {

        if (!id || !event) return;
        console.log("Event cat_id:", event.cat_id);

        console.log("Categories:", categories);

        setEventName(event.name || "");

        setPrice(event.price || "");

        setOrganizedBy(
            event.organized_by || ""
        );

        setDescription(
            event.description || ""
        );

        setCategoryName(
            event.cat_id || ""
        );

        setEventDate(event.date || "");
        setEventTime(event.time || "");
        const selectedCategory = categories.find((item) => {
            console.log(
                "Comparing:",
                item.title,
                "===",
                event.cat_id
            );

            return (
                item.title.trim().toLowerCase() ===
                event.cat_id.trim().toLowerCase()
            );
        });

        if (selectedCategory) {

            setCategoryId(
                selectedCategory.id
            );

        }

        setStatus(
            event.is_status === "1"
        );

        setPreview(event.image);

        setFileName(
            event.image
                ? event.image.split("/").pop() || ""
                : "No file chosen"
        );

    }, [id, event, categories]);
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setSelectedImage(file);
        setFileName(file.name);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async () => {

        if (!id && !selectedImage) {
            alert("Please select an event image.");
            return;
        }

        setSaving(true);
        try {
            if (id) {
                await dispatch(
                    edit_event({
                        id,
                        name: eventName,
                        description,
                        price,
                        organized_by: organizedBy,
                        cat_name: categoryName,
                        is_status: status ? 1 : 0,
                        image: selectedImage ?? null,
                        date: eventDate,
                        time: eventTime,
                    })
                ).unwrap();
            } else {
                await dispatch(
                    event_add({
                        name: eventName,
                        description,
                        image: selectedImage!,
                        price,
                        organized_by: organizedBy,
                        cat_name: categoryName,
                        status: status ? 1 : 0,
                        date: eventDate,
                        time: eventTime,
                    })
                ).unwrap();
            }

            await dispatch(event_list({ search: "", page_no: 1, per_page: 1000 }));
            navigate("/event/all-event");
        } catch (error) {
            console.log(error);
            setSaving(false);
        }
    };
    if (id && editLoading) {

        return (

            <div className="bg-white border border-gray-200 rounded-[12px] flex flex-col h-full animate-pulse">

                <div className="border-b border-gray-200 px-6 py-5">
                    <div className="h-8 w-44 rounded bg-gray-200"></div>
                </div>

                <div className="flex-1 p-6 space-y-6">

                    <div className="h-11 rounded bg-gray-200"></div>

                    <div className="h-11 rounded bg-gray-200"></div>

                    <div className="h-11 rounded bg-gray-200"></div>

                    <div className="h-32 rounded bg-gray-200"></div>

                </div>

            </div>

        );

    }
    return (
        <div className="bg-white border border-gray-200 rounded-[12px] flex flex-col h-full">

            {/* Header */}
            <div className="border-b border-gray-200 px-6 py-5">
                <h2 className="text-[26px] font-semibold text-[#101828]">
                    {id ? "Edit Event" : "Add Main Event"}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                    {id
                        ? "Update the event details below."
                        : "Fill in the details below to create a new event."}
                </p>
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
                                disabled={saving}
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
                                    disabled={saving}
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

                            <CustomSelect
                                value={categoryId}
                                onChange={(value) => {
                                    setCategoryId(value);
                                    const selectedCategory = categories.find(
                                        (item) => item.id === value
                                    );
                                    setCategoryName(selectedCategory?.title || "");
                                }}
                                options={categoryOptions}
                                placeholder="Select Category"
                                loading={categoryLoading}
                                disabled={saving}
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block mb-2 text-[14px] font-semibold text-gray-700">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            disabled={saving}
                            rows={4}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Enter event description..."
                            className="w-full rounded-[10px] border border-gray-300 px-4 py-3 text-sm outline-none resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                        />
                    </div>

                    {/* Row 3: Date + Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block mb-2 text-[14px] font-semibold text-gray-700">
                                Event Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                disabled={saving}
                                value={eventDate}
                                onChange={e => setEventDate(e.target.value)}
                                className="w-full h-11 rounded-[10px] border border-gray-300 px-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-[14px] font-semibold text-gray-700">
                                Event Time <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="time"
                                disabled={saving}
                                value={eventTime}
                                onChange={e => setEventTime(e.target.value)}
                                className="w-full h-11 rounded-[10px] border border-gray-300 px-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                            />
                        </div>
                    </div>

                    {/* Row 4: Event Image + Status */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block mb-2 text-[14px] font-semibold text-gray-700">
                                Event Image <span className="text-red-500">*</span>
                            </label>
                            <div className="flex border border-gray-300 rounded-[10px] overflow-hidden">
                                <label className="bg-gray-100 px-4 py-2.5 cursor-pointer text-sm font-medium border-r border-gray-300 hover:bg-gray-200 whitespace-nowrap">
                                    Choose Image
                                    <input
                                        type="file"
                                        disabled={saving} accept="image/*" className="hidden" onChange={handleImageChange} />
                                </label>
                                <span className="flex items-center px-4 text-gray-500 text-sm truncate">{fileName}</span>
                            </div>
                            {preview && (
                                <div className="mt-3">
                                    <img src={preview} alt="Preview" className="w-24 h-24 rounded-lg border object-cover shadow-sm" />
                                </div>
                            )}
                        </div>

                    </div>

                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
                <button
                    onClick={() => navigate("/event/all-event")}
                    className="px-5 py-2 rounded-[10px] border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 text-sm"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={saving}
                    className="px-6 py-2 rounded-[10px] bg-[#2563EB] text-white font-medium hover:bg-[#1D4ED8] disabled:opacity-60 disabled:cursor-not-allowed text-sm"
                >
                    {saving
                        ? id
                            ? "Updating..."
                            : "Saving..."
                        : id
                            ? "Update Event"
                            : "Save Event"}
                </button>
            </div>
        </div>
    );
}
