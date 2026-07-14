import { useState, useEffect } from "react";
import { CalendarDays } from "lucide-react";
import Search from "../../Components/Search";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../../Store/store";

import { event_list } from "../../Store/slices/EventSlices/event_list_thunk";

export default function EventLeft() {
    const dispatch = useDispatch<AppDispatch>();

    const {
        events,
        loading,
    } = useSelector((state: RootState) => state.event_list);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedEvent, setSelectedEvent] = useState<string>("");
    useEffect(() => {
        dispatch(
            event_list({
                search: searchTerm,
                page_no: 1,
                per_page: 1000,
            })
        );
    }, [dispatch, searchTerm]);
    useEffect(() => {
        if (events.length > 0 && !selectedEvent) {
            setSelectedEvent(events[0].name);
        }
    }, [events, selectedEvent]);
    return (
        <aside className="h-[calc(100vh-220px)] bg-white border border-gray-200 rounded-[12px] flex flex-col overflow-hidden">

            <div className="border-b border-gray-200 p-6">
                <h2 className="text-[24px] font-semibold text-[#101828]">Events</h2>
            </div>

            <div className="p-4 border-b border-gray-100">
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search Event..." />
            </div>

            <div className="flex-1 overflow-y-auto py-2 scrollbar-thin">
                {!loading && events.length > 0 ? (
                    events.map(event => (
                        <button
                            key={event.id}
                            onClick={() => setSelectedEvent(event.name)}
                            className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors cursor-pointer
                                ${selectedEvent === event.name
                                    ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                                    : "hover:bg-gray-50 text-gray-700"
                                }`}
                        >
                            <CalendarDays size={18} />
                            <span className="text-[15px] font-medium">{event.name}</span>
                        </button>
                    ))
                ) : (
                    <div className="py-10 text-center text-gray-400">No Events found.</div>
                )}
            </div>
        </aside>
    );
}
