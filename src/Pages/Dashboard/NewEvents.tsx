import { useNavigate } from "react-router-dom";
import TableHeader from "../../Components/TableHeader";

interface Event {
    id: number;
    image: string;
    eventName: string;
    price: number;
    organizedBy: string;
    category: string;
    totalJoined: number;
}

const events: Event[] = [
    { id: 1, image: "https://picsum.photos/80?201", eventName: "Musical Fest (Demo)", price: 49, organizedBy: "DesiMates Team", category: "Music", totalJoined: 0 },
    { id: 2, image: "https://picsum.photos/80?202", eventName: "Love Coaching", price: 125, organizedBy: "Love Doctor", category: "Dating", totalJoined: 12 },
    { id: 3, image: "https://picsum.photos/80?203", eventName: "Desi Night Out", price: 75, organizedBy: "DesiMates Team", category: "Networking", totalJoined: 26 },
    { id: 4, image: "https://picsum.photos/80?204", eventName: "Bollywood Bash", price: 60, organizedBy: "Bollywood Club", category: "Music", totalJoined: 45 },
    { id: 5, image: "https://picsum.photos/80?205", eventName: "Speed Dating", price: 30, organizedBy: "DesiMates Team", category: "Dating", totalJoined: 18 },
];

export default function NewEvents() {
    const navigate = useNavigate();

    return (
        <div className="bg-white border border-[#E5E7EB] rounded-[20px] shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden h-full w-full flex flex-col">
            <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100">
                <h2 className="text-[22px] font-bold text-[#101828]">New Events</h2>
                <button
                    onClick={() => navigate("/event/all-event")}
                    className="text-[#2563EB] text-sm font-semibold hover:text-[#1D4ED8]"
                >
                    View All →
                </button>
            </div>

            <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[700px] border-collapse">
                    <TableHeader
                        showCheckbox={false}
                        columns={[
                            { label: "Event", width: "240px" },
                            { label: "Price", width: "90px" },
                            { label: "Organized By", width: "160px" },
                            { label: "Category", width: "130px" },
                            { label: "Joined", width: "80px" },
                        ]}
                        isAllSelected={false}
                        isIndeterminate={false}
                        onSelectAll={() => { }}
                    />
                    <tbody className="divide-y divide-gray-100">
                        {events.map((event) => (
                            <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={event.image}
                                            alt={event.eventName}
                                            className="w-10 h-10 rounded-lg object-cover border border-gray-200 flex-shrink-0"
                                        />
                                        <div className="pl-14 min-w-0">
                                            <p className="text-[14px] font-medium text-[#101828] truncate">{event.eventName}</p>
                                            <p className="text-xs text-[#667085]">Event #{event.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="pl-14 px-4 py-3 whitespace-nowrap">
                                    <span className="text-[14px] font-medium text-[#101828]">${event.price}</span>
                                </td>
                                <td className="pl-16 px-4 py-3 whitespace-nowrap">
                                    <span className="text-[13px] text-[#344054]">{event.organizedBy}</span>
                                </td>
                                <td className="pl-20 px-4 py-3 whitespace-nowrap">
                                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                                        {event.category}
                                    </span>
                                </td>
                                <td className="pl-14 px-4 py-3 whitespace-nowrap">
                                    <span className="text-[14px] font-medium text-[#101828]">{event.totalJoined}</span>
                                </td>
                            </tr>
                        ))}
                        {events.length === 0 && (
                            <tr>
                                <td colSpan={5} className="py-8 text-center text-gray-400 italic">No events found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
