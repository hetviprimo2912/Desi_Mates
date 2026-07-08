import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

const COLORS = {
    events: "#2563EB",
    users: "#06B6D4",
    subscribed: "#7C3AED",
};

const chartData = [
    { month: "Jan", events: 6, users: 28, subscribed: 10 },
    { month: "Feb", events: 8, users: 34, subscribed: 13 },
    { month: "Mar", events: 7, users: 30, subscribed: 12 },
    { month: "Apr", events: 12, users: 42, subscribed: 18 },
    { month: "May", events: 10, users: 36, subscribed: 16 },
    { month: "Jun", events: 15, users: 50, subscribed: 23 },
    { month: "Jul", events: 18, users: 62, subscribed: 30 },
    { month: "Aug", events: 13, users: 54, subscribed: 26 },
    { month: "Sep", events: 11, users: 48, subscribed: 22 },
    { month: "Oct", events: 15, users: 58, subscribed: 27 },
    { month: "Nov", events: 17, users: 66, subscribed: 31 },
    { month: "Dec", events: 20, users: 74, subscribed: 36 },
];

const LEGEND = [
    { key: "events", label: "Events", color: COLORS.events },
    { key: "users", label: "Users", color: COLORS.users },
    { key: "subscribed", label: "Subscribed Users", color: COLORS.subscribed },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-2xl min-w-[170px]">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100 px-4 py-2.5">
                <p className="text-[13px] font-semibold text-[#101828]">{label} 2026</p>
            </div>
            <div className="px-4 py-3 space-y-2.5">
                {payload.map((item: any) => {
                    const meta = LEGEND.find((l) => l.key === item.dataKey);
                    return (
                        <div key={item.dataKey} className="flex items-center justify-between gap-6">
                            <div className="flex items-center gap-2">
                                <span
                                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                    style={{ background: item.color }}
                                />
                                <span className="text-[12px] text-gray-500">{meta?.label}</span>
                            </div>
                            <span className="text-[13px] font-bold text-[#101828]">{item.value}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default function MixedChart() {
    return (
        <div
            className="
                        bg-white
                        border
                        border-[#E5E7EB]
                        rounded-[20px]
                        shadow-xl
                        hover:shadow-2xl
                        transition-all
                        duration-300
                        overflow-hidden
                    "
        >

            {/* Header */}
            <div className="mb-8 px-6 pt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h2 className="text-[20px] font-semibold text-[#101828]">Mixed Statistics</h2>
                    <p className="mt-0.5 text-xs text-gray-500">
                        Monthly overview of Events, Users & Subscribed Users
                    </p>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-5 flex-wrap pr-4">
                    {LEGEND.map((item) => (
                        <div key={item.key} className="flex items-center gap-2">
                            <span
                                className="w-3 h-3 rounded-full flex-shrink-0"
                                style={{ background: item.color }}
                            />
                            <span className="text-[12px] text-gray-500 font-medium">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chart */}
            <div className="overflow-x-auto">
                <div className="h-[300px] min-w-[760px] lg:min-w-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData}
                            margin={{
                                top: 12,
                                right: 24,
                                left: 24,
                                bottom: 12,
                            }}
                            barGap={4}
                            barCategoryGap="30%"
                        >
                            <defs>
                                <linearGradient id="gradEvents" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#3B82F6" />
                                    <stop offset="100%" stopColor="#1D4ED8" />
                                </linearGradient>
                                <linearGradient id="gradUsers" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#22D3EE" />
                                    <stop offset="100%" stopColor="#0891B2" />
                                </linearGradient>
                                <linearGradient id="gradSubscribed" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#A78BFA" />
                                    <stop offset="100%" stopColor="#6D28D9" />
                                </linearGradient>
                            </defs>

                            <CartesianGrid vertical={false} stroke="#F3F4F6" strokeDasharray="4 4" />

                            <XAxis
                                dataKey="month"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                            />

                            <Tooltip
                                cursor={{ fill: "rgba(243,244,246,0.6)", radius: 6 }}
                                content={<CustomTooltip />}
                            />

                            <Bar
                                dataKey="events"
                                name="Events"
                                fill="url(#gradEvents)"
                                radius={[5, 5, 0, 0]}
                                animationDuration={1000}
                            />
                            <Bar
                                dataKey="users"
                                name="Users"
                                fill="url(#gradUsers)"
                                radius={[5, 5, 0, 0]}
                                animationDuration={1000}
                            />
                            <Bar
                                dataKey="subscribed"
                                name="Subscribed Users"
                                fill="url(#gradSubscribed)"
                                radius={[5, 5, 0, 0]}
                                animationDuration={1000}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
