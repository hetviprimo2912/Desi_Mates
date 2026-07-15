import { ArrowDownLeft, ArrowUpRight, Ticket, CircleDollarSign } from "lucide-react";

interface TicketStatsProps {
    title: string;
    value: number;
    percentage: string;
    type: "monthly" | "annual";
    loading?: boolean;
}

export default function TicketStats({ title, value, percentage, type, loading }: TicketStatsProps) {
    const isMonthly = type === "monthly";
    const isPositive = !percentage.startsWith("-");

    const color = isMonthly
        ? { grad: "from-emerald-50/80 to-white", iconBg: "bg-emerald-100", iconRing: "ring-4 ring-emerald-50", iconColor: "text-emerald-700", pctBg: "bg-emerald-50", pctText: "text-emerald-700", watermark: "text-emerald-200" }
        : { grad: "from-orange-50/80 to-white", iconBg: "bg-orange-100", iconRing: "ring-4 ring-orange-50", iconColor: "text-orange-600", pctBg: "bg-orange-50", pctText: "text-orange-600", watermark: "text-orange-200" };

    return (
        <div className={`relative overflow-hidden bg-gradient-to-br ${color.grad} border border-[#E5E7EB] rounded-[18px] shadow-lg hover:shadow-xl transition-all flex flex-col items-center justify-center text-center px-5 py-6 gap-2.5`}>
            <div className={`absolute -right-3 -bottom-3 ${color.watermark}`}>
                {isMonthly ? <Ticket size={72} strokeWidth={1} /> : <CircleDollarSign size={72} strokeWidth={1} />}
            </div>
            <div className={`w-11 h-11 rounded-xl ${color.iconBg} ${color.iconRing} flex items-center justify-center`}>
                {isMonthly ? <Ticket size={20} className={color.iconColor} /> : <CircleDollarSign size={20} className={color.iconColor} />}
            </div>
            {loading ? (
                <div className="h-10 w-16 rounded bg-gray-200 animate-pulse" />
            ) : (
                <p className="text-[36px] font-extrabold text-[#0F172A] leading-none tracking-tight">{value}</p>
            )}
            <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">{title}</p>
            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full ${color.pctBg}`}>
                {isPositive ? <ArrowUpRight size={12} className={color.pctText} /> : <ArrowDownLeft size={12} className={color.pctText} />}
                <span className={`text-[12px] font-bold ${color.pctText}`}>{percentage}</span>
            </div>
        </div>
    );
}
