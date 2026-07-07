import { useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";
import Search from "../../Components/Search";

const events = [
    "Musical Fest (Demo)",
    "Love Coaching (Demo)",
    "Desi Night Out",
    "Bollywood Bash",
    "Speed Dating",
];

export default function EventLeft() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedEvent, setSelectedEvent] = useState(events[0]);

    const filteredEvents = useMemo(() =>
        events.filter(e => e.toLowerCase().includes(searchTerm.toLowerCase())),
        [searchTerm]
    );

    return (
        <aside className="h-[calc(100vh-220px)] bg-white border border-gray-200 rounded-[12px] flex flex-col overflow-hidden">

            <div className="border-b border-gray-200 p-6">
                <h2 className="text-[24px] font-semibold text-[#101828]">Events</h2>
            </div>

            <div className="p-4 border-b border-gray-100">
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search Event..." />
            </div>

            <div className="flex-1 overflow-y-auto py-2 scrollbar-thin">
                {filteredEvents.length > 0 ? (
                    filteredEvents.map(event => (
                        <button
                            key={event}
                            onClick={() => setSelectedEvent(event)}
                            className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors cursor-pointer
                                ${selectedEvent === event
                                    ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                                    : "hover:bg-gray-50 text-gray-700"
                                }`}
                        >
                            <CalendarDays size={18} />
                            <span className="text-[15px] font-medium">{event}</span>
                        </button>
                    ))
                ) : (
                    <div className="py-10 text-center text-gray-400">No Events found.</div>
                )}
            </div>
        </aside>
    );
}
