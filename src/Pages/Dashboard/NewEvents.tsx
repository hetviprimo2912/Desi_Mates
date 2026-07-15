import { useNavigate } from "react-router-dom";
import TableHeader from "../../Components/TableHeader";
import type { NewEvent } from "../../Types/DashboardTypes/dashboard_types";

interface Props {
    events?: NewEvent[];
    loading?: boolean;
}

export default function NewEvents({ events = [], loading }: Props) {
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
                        {loading ? (
                            [...Array(5)].map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    <td className="px-4 py-3"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-gray-200 flex-shrink-0" /><div className="h-4 w-32 rounded bg-gray-200" /></div></td>
                                    <td className="px-4 py-3"><div className="h-4 w-12 rounded bg-gray-200" /></td>
                                    <td className="px-4 py-3"><div className="h-4 w-24 rounded bg-gray-200" /></td>
                                    <td className="px-4 py-3"><div className="h-5 w-16 rounded-full bg-gray-200" /></td>
                                    <td className="px-4 py-3"><div className="h-4 w-8 rounded bg-gray-200" /></td>
                                </tr>
                            ))
                        ) : events.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="py-8 text-center text-gray-400 italic">No events found.</td>
                            </tr>
                        ) : (
                            events.map((event) => (
                                <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={event.image}
                                                alt={event.name}
                                                className="w-10 h-10 rounded-lg object-cover border border-gray-200 flex-shrink-0"
                                            />
                                            <div className="pl-14 min-w-0">
                                                <p className="text-[14px] font-medium text-[#101828] truncate">{event.name}</p>
                                                <p className="text-xs text-[#667085]">Event #{event.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="pl-14 px-4 py-3 whitespace-nowrap">
                                        <span className="text-[14px] font-medium text-[#101828]">${event.price}</span>
                                    </td>
                                    <td className="pl-16 px-4 py-3 whitespace-nowrap">
                                        <span className="text-[13px] text-[#344054]">{event.organized_by}</span>
                                    </td>
                                    <td className="pl-20 px-4 py-3 whitespace-nowrap">
                                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                                            {event.cat_id}
                                        </span>
                                    </td>
                                    <td className="pl-14 px-4 py-3 whitespace-nowrap">
                                        <span className="text-[14px] font-medium text-[#101828]">{event.count}</span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
