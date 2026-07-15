import {
    ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";
import type { GraphDataPoint } from "../../Types/DashboardTypes/dashboard_types";

interface Props {
    data?: GraphDataPoint[];
    loading?: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    const usersVal = payload.find((p: any) => p.dataKey === "users")?.value ?? 0;
    const subVal = payload.find((p: any) => p.dataKey === "subscriber_users")?.value ?? 0;
    return (
        <div className="rounded-[12px] border border-gray-100 bg-white shadow-xl overflow-hidden min-w-[180px]">
            <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-100">
                <p className="text-[12px] font-semibold text-gray-500">{label}</p>
            </div>
            <div className="px-4 py-3 space-y-2.5">
                <div className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
                        <span className="text-[13px] text-gray-500">Total Users</span>
                    </div>
                    <span className="text-[13px] font-bold text-[#111827]">{usersVal}</span>
                </div>
                <div className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" />
                        <span className="text-[13px] text-gray-500">Subscribed</span>
                    </div>
                    <span className="text-[13px] font-bold text-[#111827]">{subVal}</span>
                </div>
            </div>
        </div>
    );
};

export default function MonthlyUser({ data, loading }: Props) {
    const chartData = data ?? [];
    const maxY = Math.max(...chartData.map(d => d.users), 2);
    const yMax = Math.ceil(maxY / 2) * 2 + 2;
    const yTicks = Array.from({ length: yMax + 1 }, (_, i) => i).filter(n => n % 2 === 0);

    const formatDate = (date: string) => {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}`;
    };

    return (
        <div className="bg-white border border-[#E5E7EB] rounded-[20px] shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
            <div className="px-6 pt-5 pb-4 flex items-center justify-between border-b border-gray-100">
                <div>
                    <h2 className="text-[22px] font-bold text-[#101828]">Monthly Users</h2>
                    <p className="mt-0.5 text-[13px] text-gray-400">User growth & subscription trends</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                        <div className="w-6 h-[2.5px] rounded-full bg-[#2563EB]" />
                        <span className="text-[12px] text-gray-400">Users</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-6 h-[2.5px] rounded-full bg-[#8B5CF6]" />
                        <span className="text-[12px] text-gray-400">Subscribed</span>
                    </div>
                </div>
            </div>

            <div className="px-2 pt-4 pb-4 overflow-x-auto">
                <div className="h-[260px] sm:h-[320px] lg:h-[380px] min-w-[600px] lg:min-w-0">
                    {loading ? (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                            Loading chart...
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="usersGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#2563EB" stopOpacity={0.15} />
                                        <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="subsGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.15} />
                                        <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} stroke="#F3F4F6" strokeDasharray="4 4" />
                                <XAxis dataKey="date" tickFormatter={formatDate} interval={1} axisLine={false} tickLine={false} tick={{ fill: "#667085", fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} ticks={yTicks} domain={[0, yMax]} tick={{ fill: "#9CA3AF", fontSize: 12 }} dx={-4} />
                                <Tooltip cursor={{ stroke: "#E5E7EB", strokeWidth: 1, strokeDasharray: "4 4" }} content={<CustomTooltip />} />
                                <Area type="linear" dataKey="users" stroke="#2563EB" strokeWidth={2} fill="url(#usersGrad)" activeDot={{ r: 5, fill: "#2563EB", stroke: "#fff", strokeWidth: 2 }} animationDuration={1000} />
                                <Area type="linear" dataKey="subscriber_users" stroke="#8B5CF6" strokeWidth={2} fill="url(#subsGrad)" activeDot={{ r: 5, fill: "#8B5CF6", stroke: "#fff", strokeWidth: 2 }} animationDuration={1000} />
                            </AreaChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>
        </div>
    );
}
