import { ShoppingBag, Tag, TrendingUp } from "lucide-react";
import type { TopEvent } from "../../Types/DashboardTypes/dashboard_types";

interface Props {
    topEvent?: TopEvent;
    loading?: boolean;
}

export default function TopTicketSelling({ topEvent, loading }: Props) {
    return (
        <div className="bg-white border border-[#E5E7EB] rounded-[18px] shadow-lg hover:shadow-xl transition-all p-5 flex flex-col justify-center h-full">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-0.5">This Month</p>
                    <h2 className="text-[18px] font-bold text-[#0F172A]">Top Event Ticket Selling</h2>
                </div>
                <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-2.5 py-1 rounded-full">
                    <TrendingUp size={11} />
                    Trending
                </div>
            </div>

            {loading ? (
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-[12px] px-4 py-3 animate-pulse">
                    <div className="w-12 h-12 rounded-[10px] bg-gray-200 flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                        <div className="h-4 w-32 rounded bg-gray-200" />
                        <div className="h-3 w-24 rounded bg-gray-100" />
                    </div>
                </div>
            ) : topEvent ? (
                <div className="flex items-center gap-3 bg-gradient-to-r from-slate-50 to-gray-50 border border-gray-100 rounded-[12px] px-4 py-3">
                    <img
                        src={topEvent.image}
                        alt={topEvent.name}
                        className="w-12 h-12 rounded-[10px] object-cover border border-gray-200 shadow-sm flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                        <h3 className="text-[14px] font-bold text-[#1F6F63] truncate">{topEvent.name}</h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="flex items-center gap-1 text-[11px] text-gray-400">
                                <Tag size={10} />
                                {topEvent.cat_id}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-gray-300" />
                            <span className="text-[11px] text-gray-400">{topEvent.sold_ticket} sold</span>
                        </div>
                        <p className="mt-1 text-[12px] font-medium text-gray-500">Price: ${topEvent.price}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <span className="text-[15px] font-extrabold text-[#0F172A]">${topEvent.price}</span>
                        <button className="w-8 h-8 rounded-[8px] bg-[#1F6F63] hover:bg-[#18594F] active:scale-95 transition-all flex items-center justify-center shadow-sm shadow-emerald-100">
                            <ShoppingBag size={14} className="text-white" />
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-sm text-gray-400 italic">No top event data available.</p>
            )}
        </div>
    );
}
