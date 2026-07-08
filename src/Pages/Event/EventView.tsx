import { useNavigate } from "react-router-dom";
import {
    ArrowLeft, CalendarDays, Clock, MapPin, Tag,
    Users, IndianRupee, User, Info,
} from "lucide-react";
import Tags from "../../Components/Tags";

interface EventDetails {
    image: string;
    eventName: string;
    description: string;
    location: string;
    price: number;
    organizedBy: string;
    category: string;
    eventDate: string;
    eventTime: string;
    totalJoined: number;
}

const event: EventDetails = {
    image: "https://picsum.photos/600/400?random=11",
    eventName: "April Done",
    description: "All done of them",
    location: "Akhbar Nagar, Nava Vadaj, Ahmedabad, Gujarat, India",
    price: 300,
    organizedBy: "DesiMatesTeam",
    category: "Music",
    eventDate: "2025-01-30",
    eventTime: "07:00",
    totalJoined: 0,
};

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
        weekday: "long", year: "numeric", month: "long", day: "numeric",
    });
}

interface FieldProps {
    icon: React.ReactNode;
    label: string;
    value: React.ReactNode;
}

function Field({ icon, label, value }: FieldProps) {
    return (
        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-[12px] border border-gray-100">
            <div className="w-9 h-9 rounded-[9px] bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-sm">
                {icon}
            </div>
            <div className="min-w-0">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{label}</p>
                <p className="text-[14px] font-semibold text-[#111827] break-words">{value || "—"}</p>
            </div>
        </div>
    );
}

export default function EventView() {
    const navigate = useNavigate();

    return (
        <div className="w-full min-h-screen bg-gray-50 text-[#111827]">
            <div className="px-4 sm:px-8 pt-6 pb-16 space-y-6">

                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-[28px] font-bold text-[#101828]">Event Details</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            <span onClick={() => navigate("/event/all-event")} className="text-[#2563EB] cursor-pointer hover:underline">
                                All Events
                            </span>
                            <span className="mx-1.5 text-gray-300">/</span>
                            <span>View Event</span>
                        </p>
                    </div>
                    <button
                        onClick={() => navigate("/event/all-event")}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-[#2563EB] text-white text-sm font-semibold hover:bg-[#1D4ED8] transition shadow-sm"
                    >
                        <ArrowLeft size={16} />
                        Back to List
                    </button>
                </div>

                {/* Hero Card */}
                <div className="bg-white rounded-[16px] border border-gray-200 shadow-sm overflow-hidden">

                    {/* Two-column hero */}
                    <div className="flex flex-col md:flex-row">

                        {/* Left — image */}
                        <div className="relative md:w-72 lg:w-80 shrink-0 h-56 md:h-auto overflow-hidden">
                            <img
                                src={event.image}
                                alt={event.eventName}
                                className="w-full h-full object-cover"
                            />
                            {/* subtle dark vignette on image edges */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-transparent" />
                            {/* Category pill on image */}
                            <div className="absolute top-3 left-3">
                                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold bg-black/40 backdrop-blur-sm text-white border border-white/20">
                                    <Tag size={11} />
                                    {event.category}
                                </span>
                            </div>
                        </div>

                        {/* Right — info panel */}
                        <div className="flex-1 flex flex-col justify-between p-6 gap-5">

                            {/* Top: title + badges */}
                            <div>
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <Tags text={event.category} variant="blue" />
                                    <Tags text={event.totalJoined > 0 ? "Active" : "Upcoming"} variant={event.totalJoined > 0 ? "green" : "purple"} />
                                    <Tags text="Paid" variant="orange" />
                                </div>
                                <h2 className="text-[24px] font-bold text-[#101828] leading-tight">{event.eventName}</h2>
                                <p className="mt-2 text-[13.5px] text-gray-500 leading-relaxed">{event.description || "No description provided."}</p>
                            </div>

                            {/* Middle: key meta */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="flex items-center gap-2.5 text-[13.5px] text-gray-600">
                                    <div className="w-8 h-8 rounded-[8px] bg-blue-50 flex items-center justify-center shrink-0">
                                        <CalendarDays size={15} className="text-blue-500" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Date</p>
                                        <p className="font-semibold text-[#111827]">{formatDate(event.eventDate)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2.5 text-[13.5px] text-gray-600">
                                    <div className="w-8 h-8 rounded-[8px] bg-indigo-50 flex items-center justify-center shrink-0">
                                        <Clock size={15} className="text-indigo-500" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Time</p>
                                        <p className="font-semibold text-[#111827]">{event.eventTime}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2.5 text-[13.5px] text-gray-600 sm:col-span-2">
                                    <div className="w-8 h-8 rounded-[8px] bg-rose-50 flex items-center justify-center shrink-0">
                                        <MapPin size={15} className="text-rose-500" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Location</p>
                                        <p className="font-semibold text-[#111827]">{event.location}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom: price + organizer + joined */}
                            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-100">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-[8px] bg-emerald-50 flex items-center justify-center">
                                        <IndianRupee size={15} className="text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Price</p>
                                        <p className="text-[15px] font-bold text-emerald-600">₹{event.price}</p>
                                    </div>
                                </div>
                                <div className="w-px h-8 bg-gray-200" />
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-[8px] bg-amber-50 flex items-center justify-center">
                                        <User size={15} className="text-amber-500" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Organizer</p>
                                        <p className="text-[13px] font-semibold text-[#111827]">{event.organizedBy}</p>
                                    </div>
                                </div>
                                <div className="w-px h-8 bg-gray-200" />
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-[8px] bg-blue-50 flex items-center justify-center">
                                        <Users size={15} className="text-blue-500" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Joined</p>
                                        <p className="text-[13px] font-semibold text-[#111827]">{event.totalJoined}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Detail fields grid */}
                    <div className="border-t border-gray-100 p-6">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Full Event Information</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                            <Field icon={<CalendarDays size={16} className="text-blue-500" />} label="Event Date" value={formatDate(event.eventDate)} />
                            <Field icon={<Clock size={16} className="text-indigo-500" />} label="Event Time" value={event.eventTime} />
                            <Field icon={<MapPin size={16} className="text-rose-500" />} label="Location" value={event.location} />
                            <Field icon={<User size={16} className="text-amber-500" />} label="Organized By" value={event.organizedBy} />
                            <Field icon={<Tag size={16} className="text-purple-500" />} label="Category" value={event.category} />
                            <Field icon={<Users size={16} className="text-emerald-500" />} label="Total Joined" value={event.totalJoined} />
                            <Field icon={<IndianRupee size={16} className="text-blue-500" />} label="Ticket Price" value={`₹${event.price}`} />
                            <Field icon={<Info size={16} className="text-gray-400" />} label="Event Name" value={event.eventName} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
